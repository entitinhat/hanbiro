import _ from 'lodash';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';

import Icon from '@base/assets/icons/svg-icons';
import SidebarHeader from '@base/components/@hanbiro/Sidebar/Header';
import { LAYOUT_PROCESS_STEP } from '@base/config/menus';
import { sideBarSizeAtom } from '@base/store/atoms/app';
import { WriteParseFields } from '@base/utils/helpers/noLayoutUtils';
import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Step,
  StepButton,
  Stepper,
  useTheme
} from '@mui/material';
import { initStatusForm, sample } from '@process/components/Diagram/Status/StatusWrite';
import { STATUS_BASIC_DATA, STEP_TYPES } from '@process/config/constants';
import { KEY_NAME_STEP_ACTION, KEY_NAME_STEP_DO } from '@process/config/keyNames';
import useDefinedItem from '@process/hooks/useDefinedItem';
import useStepMutation from '@process/hooks/useStepMutation';
import { nodeEdgesAtom, stageAtom, stepDoAtom, stepSettingAtom } from '@process/store/atoms/diagram';
import { stepSiteAtom } from '@process/store/atoms/process';
import statusAtom from '@process/store/atoms/status';
import stepTypeAtom, { stepOpenAtom } from '@process/store/atoms/step';
import { StatusForm } from '@process/types/process';
import { checkSequence, getAxisStep, getStepStatuses } from '@process/utils/helper';
import { getCtaFromHTML } from '@process/utils/site';
import { SITE_GROUP_OPTION } from '@settings/sites/config/constants';
import { useTranslation } from 'react-i18next';

import { getModalSize } from './';
import WriteFields from './WriteFields';

const steps = ['ncrm_process_step_type', 'ncrm_process_step_settings'];
export const stepDoCustom = { keyName: 'manual', languageKey: 'ncrm_process_action_method_manual' };

interface StepWrapperProps {
  children?: ReactNode;
  index: number;
  value: number;
}

function StepWrapper({ children, value, index, ...other }: StepWrapperProps) {
  return (
    <div
      className="scroll-box"
      role="tabpanel"
      hidden={value !== index}
      id={`step-write-tabpanel-${index}`}
      aria-labelledby={`step-write-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
}

interface StepWriteProps {
  processId: string;
  onClose?: () => void;
}

function StepWrite(props: StepWriteProps) {
  const theme = useTheme();
  const { processId, onClose } = props;
  const { fields, getParams, defaultValues } = useMemo(() => WriteParseFields(LAYOUT_PROCESS_STEP), []);

  const setSidebarSize = useSetRecoilState(sideBarSizeAtom);
  const sourceStep = useRecoilValue(stepOpenAtom);
  const [stepSetting, setStepSetting] = useRecoilState(stepSettingAtom);
  const stepSettingReset = useResetRecoilState(stepSettingAtom);
  const [stepType, setStepType] = useRecoilState(stepTypeAtom);
  const [stepDo, setStepDo] = useRecoilState(stepDoAtom);
  const [statusesValue, setStatusesValue] = useRecoilState(statusAtom);
  const stages = useRecoilValue(stageAtom);
  const nodeEdgesValue = useRecoilValue(nodeEdgesAtom);
  const stepSite = useRecoilValue(stepSiteAtom); // for site
  const [activeStep, setActiveStep] = useState(0);

  const [definedData, definedOptions] = useDefinedItem({
    stepType: stepType.value,
    direction: sourceStep.direction!!
  });

  const {
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: defaultValues,
    criteriaMode: 'firstError',
    mode: 'onChange'
  });

  const selectedDo = watch(KEY_NAME_STEP_DO);
  const selectedAction = watch(KEY_NAME_STEP_ACTION);

  const { t } = useTranslation();

  useEffect(() => {
    setStepDo(selectedDo?.keyName);
  }, [selectedDo]);

  useEffect(() => {
    if (stepDo) {
      if (definedData) {
        const selectedDefine = definedData[stepType.value]?.find((define) => define.id == stepDo);
        if (selectedDefine && selectedDefine.setting) {
          setStepSetting(selectedDefine.setting);
        }
      }
    } else {
      stepSettingReset();
    }
  }, [definedData, stepDo, stepType.value]);

  const handleClose = () => {
    setActiveStep(0);
    reset();
    setStatusesValue([]);
    onClose && onClose();
  };

  const {
    mAddStep: { mutate: mutationAdd, isLoading }
  } = useStepMutation(processId, handleClose);

  const onSubmit = (formData: any) => {
    // console.log('formData', formData);
    if (stepType.value != 'TYPE_WAIT') {
      delete formData.wait;
    }
    if (stepType.value != 'TYPE_ACTION') {
      delete formData.action;
    }
    if (stepType.value != 'TYPE_SITE') {
      delete formData.site;
    }
    if (!stepSetting.auto) {
      delete formData.automation;
    }

    delete formData.criteria;
    delete formData.checklist;
    delete formData.statuses;

    let newParams = getParams(formData);
    let checkTodoClose = false;
    let allSequence: string[] = [];
    let splitCount = 0;
    let addY = 0;
    const statuses = statusesValue.map((status) => {
      if (stepType.value == 'TYPE_ACTION') {
        if (status.property.keyName == 'PROPERTY_TODO_CLOSE') {
          checkTodoClose = true;
        }
        allSequence = _.concat(allSequence, status.sequence);
      }
      if (status.multiple == 'MULTIPLE_CHOICE' || status.multiple == 'MULTIPLE_PARALLEL') {
        if (splitCount > 0) {
          addY += 250;
        }
        splitCount += 1;
      }

      let options = '';
      if (stepType.value == 'TYPE_CHECKLIST') {
        options = JSON.stringify(status.checklist);
      } else if (stepType.value == 'TYPE_CRITERIA') {
        options = JSON.stringify(status.criteria);
      }

      return {
        id: status.id,
        definedId: status.definedId,
        button: status.button,
        name: status.name,
        direction: status.direction.keyName,
        property: status.property.keyName,
        view: status.view.keyName,
        event: status.event.keyName,
        sequence: status.sequence,
        nextStep:
          status.nextStep.keyName != ''
            ? {
                id: status.nextStep.keyName,
                name: status.nextStep.languageKey
              }
            : null,
        multiple: status.multiple,
        // primary: status.primary,
        options: options,
        ctaId: status.ctaId ?? '',
        flag: status.flag ?? 'FLAG_NONE'
      } as Record<string, any>;
    });

    if (stepType.value == 'TYPE_ACTION') {
      if (!checkSequence(_.sortBy(_.uniq(allSequence)))) {
        alert('Sequence Number has to be order');
        return;
      }

      if (!checkTodoClose) {
        alert('You have to add one todo close at least in property');
        return;
      }
    }

    const axisStep = getAxisStep(
      nodeEdgesValue.others,
      {
        id: sourceStep.sourceId,
        type: sourceStep.sourceType!!,
        direction: sourceStep.direction!!,
        multiple: sourceStep.multiple ?? 'MULTIPLE_NONE',
        primary: sourceStep.primary ?? false,
        position: sourceStep.position!!,
        shape: sourceStep.shape!!
      },
      stepType.value
    );

    let addData = {
      id: processId,
      step: {
        ...newParams,
        meta: {
          axis: axisStep
        },
        shape: sourceStep.shape,
        type: stepType.value,
        property: 'PROPERTY_LINK',
        statuses: statuses
      },
      link: {
        step: sourceStep.sourceId,
        status: sourceStep.directionId,
        direction: sourceStep.direction,
        multiple: sourceStep.multiple ?? 'MULTIPLE_NONE',
        // updateY: saveStep.meta.axis.y,
        updateY: stepType.value == 'TYPE_CRITERIA' && addY > 0 ? axisStep.y + 21 : axisStep.y,
        addY: addY
      }
    } as Record<string, any>;

    const checkStage = stages.find((stage) => stage.axisX > axisStep.x);
    if (checkStage) {
      addData.step.stage = {
        id: checkStage.id,
        name: checkStage.name
      };
    }

    if (stepType.value == 'TYPE_SITE') {
      addData.step.site = {
        category: stepSite.category.value,
        type: SITE_GROUP_OPTION[stepSite.type.keyName],
        template: stepSite.template.keyName
        // html: stepSite.html
      };
    }

    if (stepType.value == 'TYPE_ACTION') {
      addData.step.setting = stepSetting;
    }

    // console.log('step addData', addData);
    mutationAdd(addData);
  };

  const onError = (errors: any, e: any) => {
    console.log('error', errors, e);
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  useEffect(() => {
    if (sourceStep.sourceType == 'TYPE_SIMPLE_ACTION' && sourceStep.direction == 'DIRECTION_FORWARD_OUTGOING_BOTTOM') {
      setActiveStep(1);
      setStepType(STEP_TYPES[4]);
    }
  }, [sourceStep]);

  useEffect(() => {
    let statusForms: StatusForm[] = [];
    if (stepType.value == 'TYPE_ACTION') {
      if (stepDo == 'manual') {
        statusForms = initStatusForm().slice(0, 2);
      } else {
        if (definedData && definedData.TYPE_ACTION) {
          const find = definedData.TYPE_ACTION.find((el) => el.id == stepDo);
          statusForms = getStepStatuses(stepType.value, find?.statuses);
        }
      }
    } else if (stepType.value == 'TYPE_SIMPLE_ACTION') {
      statusForms = initStatusForm();
    } else if (stepType.value == 'TYPE_CHECKLIST') {
      statusForms = [...initStatusForm().slice(0, 2), { ...initStatusForm()[2], checklist: [] }];
    } else if (stepType.value == 'TYPE_WAIT') {
      statusForms = initStatusForm();
    } else if (stepType.value == 'TYPE_SITE') {
    } else if (stepType.value == 'TYPE_CRITERIA') {
      if (definedData && definedData.TYPE_CRITERIA) {
        const find = definedData.TYPE_CRITERIA.find((el) => el.id == stepDo);
        statusForms = getStepStatuses(stepType.value, find?.statuses);
      }
    }
    // console.log('statusForm', statusForms);
    setStatusesValue(statusForms);
  }, [stepDo, stepType.value, sourceStep]);

  useEffect(() => {
    // get template
    if (stepSetting.cta && selectedAction?.template) {
      const ctaList = getCtaFromHTML(sample);
      const statusForms: StatusForm[] = ctaList.map((cta) => {
        return STATUS_BASIC_DATA({
          id: uuidv4(),
          ctaId: cta.id,
          button: cta.button,
          name: cta.title,
          event: 'EVENT_CLICK',
          direction: 'DIRECTION_FORWARD_OUTGOING_RIGHT',
          sequence: ['0'],
          definedId: uuidv4(),
          multiple: 'MULTIPLE_ANY'
        });
      });
      setStatusesValue((old) => {
        return [...old, ...statusForms];
      });
    }
  }, [stepSetting.cta, selectedAction?.template]);

  useEffect(() => {
    setSidebarSize(getModalSize(stepType.value));
  }, [stepType.value]);

  const Footer = useMemo(() => {
    return (
      <Stack
        spacing={0}
        sx={{ bgcolor: theme.palette.background.paper, width: '100%', position: 'absolute', bottom: 0, left: 0, right: 0 }}
      >
        <Divider />
        <Stack direction="row" spacing={2} alignItems="center" justifyContent={'space-between'} sx={{ px: 2, py: 1 }}>
          <Button size="small" variant="contained" color="secondary" onClick={handleClose}>
            {t('ncrm_common_btn_close')}
          </Button>
          <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
            {activeStep === steps.length - 1 && (
              <Button size="small" variant="outlined" onClick={handleBack}>
                {t('ncrm_common_btn_back')}
              </Button>
            )}
            {activeStep < steps.length - 1 && (
              <Button size="small" onClick={handleNext} variant="contained" color="primary">
                {t('ncrm_common_btn_next')}
              </Button>
            )}
            {activeStep === steps.length - 1 && (
              <Button
                size="small"
                variant="contained"
                color="primary"
                onClick={() => {
                  handleSubmit((data) => onSubmit(data), onError)();
                }}
                disabled={isLoading || !isValid}
              >
                {t('ncrm_common_btn_save')}
              </Button>
            )}
          </Stack>
        </Stack>
      </Stack>
    );
  }, [isLoading, isValid, activeStep, statusesValue]);

  return (
    <Stack spacing={2} sx={{ width: '100%', position: 'relative', height: `calc(100vh - 50px)` }}>
      {SidebarHeader({ title: 'ncrm_process_step_create_step', onClose: handleClose })}
      <Stepper sx={{ px: 1 }} activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {t(label)}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <StepWrapper value={activeStep} index={0}>
        <List sx={{ p: 0 }} className="step-list-group">
          {STEP_TYPES.map((v) => (
            <ListItem disablePadding divider key={v.key}>
              <ListItemButton
                selected={v.key === stepType.key}
                className={`list-group-item list-group-item-action step-${v.key}`}
                onClick={() => {
                  setStepType(v);
                }}
              >
                <ListItemIcon className="step-type-icon">{Icon(`diagram_${v.key}`)}</ListItemIcon>
                <ListItemText primary={t(v.label)} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </StepWrapper>
      <StepWrapper value={activeStep} index={1}>
        <form style={{ margin: 0, height: `calc(100vh - 200px)`, overflowY: 'auto' }}>
          <WriteFields
            definedData={definedData}
            definedOptions={definedOptions}
            processId={processId}
            watch={watch}
            control={control}
            errors={errors}
            fields={fields}
          />
        </form>
      </StepWrapper>
      {Footer}
    </Stack>
  );
}

export default StepWrite;
