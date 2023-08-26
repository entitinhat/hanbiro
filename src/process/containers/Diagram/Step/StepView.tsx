import _ from 'lodash';
import React, { useEffect, useMemo } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import LoadingCircular from '@base/components/@hanbiro/LoadingCircular';
import SidebarHeader from '@base/components/@hanbiro/Sidebar/Header';
import ViewFields from '@base/components/@hanbiro/ViewPage/ViewFields';
import { LAYOUT_PROCESS_STEP } from '@base/config/menus';
import { ViewFieldParse } from '@base/utils/helpers/noLayoutUtils';
import { Box, Stack } from '@mui/material';
import { PROCESS_STATUS_DIRECTIONS_SORT, STEP_TYPES } from '@process/config/constants';
import { KEY_NAME_STEP_AUTOMATION, KEY_NAME_STEP_CHECKLIST, KEY_NAME_STEP_CRITERIA } from '@process/config/keyNames';
import { queryKeys } from '@process/config/queryKeys';
import { StepViewField } from '@process/config/view-field/step';
import { useStep } from '@process/hooks/useStep';
import { stepDoAtom, stepSettingAtom } from '@process/store/atoms/diagram';
import statusAtom from '@process/store/atoms/status';
import stepTypeAtom from '@process/store/atoms/step';
import { StatusForm } from '@process/types/process';

type StepView = {
  processId: string;
  stepId: string;
  onClose?: () => void;
};

const StepView = (props: StepView) => {
  const { processId, stepId, onClose } = props;
  const setStatusesValue = useSetRecoilState(statusAtom);
  const [stepType, setStepType] = useRecoilState(stepTypeAtom);
  const setStepSetting = useSetRecoilState(stepSettingAtom);
  // const setStepDo = useSetRecoilState(stepDoAtom);

  const { step, isLoading } = useStep(
    {
      id: processId,
      stepId: stepId
    },
    {
      staleTime: 0
    }
  );

  const statuses = useMemo(() => {
    let statusForms: StatusForm[] = [];
    if (step?.statuses) {
      for (const status of step.statuses) {
        let newStatus: StatusForm = {
          id: status.id,
          name: status.name,
          button: status.button,
          view: { keyName: status.view, languageKey: status.view },
          event: { keyName: status.event, languageKey: status.event },
          property: { keyName: status.property, languageKey: status.property },
          direction: { keyName: status.direction, languageKey: status.direction },
          nextStep: { keyName: status.nextStep?.id, languageKey: status.nextStep?.name },
          sequence: status.sequence ?? [],
          new: false,
          reset: true,
          order: PROCESS_STATUS_DIRECTIONS_SORT[status.direction],
          multiple: status.multiple,
          // primary: status.primary,
          ctaId: status.ctaId ?? ''
        };

        if (status.options) {
          if (step.type == 'TYPE_CHECKLIST') {
            newStatus.checklist = JSON.parse(status.options);
          } else if (step.type == 'TYPE_CRITERIA') {
            newStatus.criteria = JSON.parse(status.options);
          }
        }
        statusForms.push(newStatus);
      }
    }
    return statusForms;
  }, [step]);

  const viewFields = useMemo(() => {
    let newFields: any = {};
    if (step?.id) {
      for (const [key, value] of Object.entries(StepViewField)) {
        let componentProps: any = value?.componentProps;
        if (componentProps?.steptype) {
          if (_.isArray(componentProps.steptype)) {
            if (!_.includes(componentProps.steptype, stepType?.key)) {
              continue;
            }
          } else {
            if (stepType?.key !== componentProps.steptype) {
              continue;
            }
          }
        }

        if (key == KEY_NAME_STEP_AUTOMATION && !step.setting?.auto) {
          continue;
        }
        if (key == KEY_NAME_STEP_CRITERIA || key == KEY_NAME_STEP_CHECKLIST) {
          componentProps.statuses = statuses;
        }
        newFields[key] = { ...value, componentProps: componentProps };
      }
    }
    return newFields;
  }, [step, stepType, statuses]);

  const fields = useMemo(() => {
    return ViewFieldParse(step, viewFields, true, [queryKeys.listProcess]);
  }, [step, viewFields]);

  useEffect(() => {
    if (step) {
      const stepType = STEP_TYPES.find((type) => type.value == step.type)!!;
      // setStepDo(step.definedId);
      setStepType(stepType);
      if (step.setting) {
        setStepSetting(step.setting);
      }
    }
  }, [step]);

  useEffect(() => {
    // let statusForms: StatusForm[] = [];
    // if (step?.statuses) {
    //   for (const status of step.statuses) {
    //     let newStatus: StatusForm = {
    //       id: status.id,
    //       name: status.name,
    //       button: status.button,
    //       view: { keyName: status.view, languageKey: status.view },
    //       event: { keyName: status.event, languageKey: status.event },
    //       property: { keyName: status.property, languageKey: status.property },
    //       direction: { keyName: status.direction, languageKey: status.direction },
    //       nextStep: { keyName: status.nextStep?.id, languageKey: status.nextStep?.name },
    //       sequence: status.sequence ?? [],
    //       new: false,
    //       reset: true,
    //       order: PROCESS_STATUS_DIRECTIONS_SORT[status.direction],
    //       multiple: status.multiple,
    //       primary: status.primary,
    //       ctaId: status.ctaId ?? ''
    //     };

    //     if (status.options) {
    //       if (step.type == 'TYPE_CHECKLIST') {
    //         newStatus.checklist = JSON.parse(status.options);
    //       } else if (step.type == 'TYPE_CRITERIA') {
    //         newStatus.criteria = JSON.parse(status.options);
    //       }
    //     }
    //     statusForms.push(newStatus);
    //   }
    // }
    if (statuses) {
      setStatusesValue(statuses);
    }
  }, [statuses]);

  const ignoreFields: string[] = [];

  return (
    <Stack spacing={0} sx={{ width: '100%', position: 'relative', overflow: 'hidden', height: `calc(100vh - 50px)` }}>
      {SidebarHeader({ title: 'ncrm_process_view_step', onClose })}
      <Box sx={{ p: 2, m: 0, height: `calc(100vh - 45px)`, overflowY: 'auto' }}>
        {isLoading ? (
          <LoadingCircular loading={isLoading} />
        ) : (
          <ViewFields
            fields={fields}
            ignoreFields={ignoreFields}
            menuSource={LAYOUT_PROCESS_STEP}
            menuSourceId={processId}
            metadata={{
              processId: processId,
              stepId: stepId,
              method: step?.action?.method
            }}
          />
        )}
      </Box>
    </Stack>
  );
};

export default StepView;
