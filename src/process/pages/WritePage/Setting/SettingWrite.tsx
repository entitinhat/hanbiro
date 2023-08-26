import _ from 'lodash';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilValue, useResetRecoilState } from 'recoil';

import NoteAndError from '@base/components/@hanbiro/NoteAndError';
import SidebarFooter from '@base/components/@hanbiro/Sidebar/Footer';
import SidebarHeader from '@base/components/@hanbiro/Sidebar/Header';
import { LAYOUT_PROCESS_ACTION, LAYOUT_PROCESS_CRITERIA, LAYOUT_PROCESS_TRIGGER } from '@base/config/menus';
import { WriteParseFields } from '@base/utils/helpers/noLayoutUtils';
import { Box, Stack } from '@mui/material';
import useDefinedItemMutate from '@process/hooks/useDefinedItemMutation';
import { SettingTabs } from '@process/pages/ListPage/Setting/Helper';
import { triggerFormAtom } from '@process/store/atoms/process';
import statusAtom from '@process/store/atoms/status';
import { ShapeType } from '@process/types/diagram';
import { SettingType } from '@process/types/settings';
import { checkSequence } from '@process/utils/helper';

import WriteFields from './WriteFields';

interface SettingWriteProps {
  onClose: () => void;
  selectedTab: SettingType;
}

function SettingWrite(props: SettingWriteProps) {
  const { selectedTab, onClose } = props;
  console.log('selectedTab', selectedTab);
  const statusesValue = useRecoilValue(statusAtom);
  const triggerForm = useRecoilValue(triggerFormAtom);
  const resetStatusesValue = useResetRecoilState(statusAtom);

  const writeParse = useMemo(() => {
    switch (selectedTab) {
      case 'action':
        return LAYOUT_PROCESS_ACTION;
      case 'criteria':
        return LAYOUT_PROCESS_CRITERIA;
      case 'trigger':
        return LAYOUT_PROCESS_TRIGGER;
      default:
        return LAYOUT_PROCESS_ACTION;
    }
  }, [selectedTab]);

  const title = useMemo(() => {
    switch (selectedTab) {
      case 'action':
        return 'ncrm_process_create_action';
      case 'criteria':
        return 'ncrm_process_create_criteria';
      case 'trigger':
        return 'ncrm_process_create_trigger';
      default:
        return 'ncrm_process_create_action';
    }
  }, [selectedTab]);

  const { fields, getParams, defaultValues } = useMemo(() => WriteParseFields(writeParse), [writeParse]);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: defaultValues,
    criteriaMode: 'firstError',
    mode: 'onChange'
  });

  useEffect(() => {
    resetStatusesValue();
    reset(defaultValues);
  }, [defaultValues]);

  const {
    mAddDefinedItem: { mutate: mutationAdd, isLoading }
  } = useDefinedItemMutate(selectedTab, onClose);

  const onSubmit = (formData: any) => {
    const params = getParams(formData);
    let data = '';
    let shape: ShapeType = 'SHAPE_NONE';
    if (selectedTab == 'trigger') {
      data = JSON.stringify({
        trigger: triggerForm.trigger.keyName,
        module: triggerForm.module.keyName,
        field: triggerForm.field.keyName,
        ftype: triggerForm.field.extra,
        ptype: triggerForm.ptype.keyName,
        process: triggerForm.process.keyName,
        step: triggerForm.step.keyName,
        property: triggerForm.property.keyName
      });
    } else {
      shape = 'SHAPE_FORWARD';
      let allSequence: string[] = [];
      let statuses = [];
      // So it has to set multiple : true
      // if forward is over 2 in criteria, That is multiple choice.
      const statusCount = statusesValue.length;
      for (const idx in statusesValue) {
        const st = statusesValue[idx];
        let options = '';
        let multiple = _.clone(st.multiple);
        // let primary = _.clone(st.primary);
        let sequence = _.clone(st.sequence);
        if (selectedTab == 'action') {
          if (st.sequence.length > 0) {
            allSequence = _.concat(allSequence, st.sequence);
          }
        } else if (selectedTab == 'criteria') {
          const index = Number(idx);
          if (statusCount > 2 && statusCount - 1 > index) {
            multiple = 'MULTIPLE_CHOICE';
            if (index == 0) {
              // primary = true;
            }
          }
          sequence = [String(index + 1)];
          options = st.criteria ? JSON.stringify(st.criteria) : '';
        }
        statuses.push({
          id: st.id,
          button: st.button,
          name: st.name,
          direction: st.direction.keyName,
          property: st.property.keyName,
          view: st.view.keyName,
          event: st.event.keyName,
          sequence: sequence,
          multiple: multiple,
          // primary: primary,
          options: options
        });
      }
      if (allSequence.length > 0 && !checkSequence(_.sortBy(_.uniq(allSequence)))) {
        alert('Sequence Number has to be order');
        return;
      }
      data = JSON.stringify(statuses);
    }

    const stepType = SettingTabs.find((tab) => tab.value == selectedTab)!!;
    const addData: Record<string, any> = {
      name: params.name,
      description: params.description,
      type: stepType.type,
      shape: shape,
      data: data
    };

    if (stepType.type == 'TYPE_ACTION') {
      addData.setting = {
        method: 'ACTION_METHOD_MANUAL',
        template: false,
        cta: false,
        auto: false,
        email: true,
        due: true,
        assign: true
      };
    }

    console.log('addData', addData);
    mutationAdd({ definedItem: addData });
  };

  const onError = (errors: any, e: any) => {
    console.log('error', errors, e);
  };

  const formSubmit = () => {
    handleSubmit((data) => onSubmit(data), onError)();
  };

  return (
    // <Stack spacing={0} sx={{ width: '100%', position: 'relative', height: `calc(100vh - 50px)` }}>
    <Stack spacing={0} sx={{ width: '100%', position: 'relative', overflow: 'hidden' }}>
      {SidebarHeader({ title, onClose })}
      <Box component="form" sx={{ margin: 0, height: `calc(100vh - 145px)`, overflowY: 'auto' }}>
        <NoteAndError errors={errors} />
        <WriteFields selectedTab={selectedTab} control={control} errors={errors} fields={fields} />
      </Box>
      {SidebarFooter({ onSubmit: formSubmit, isLoading, isValid, onClose })}
    </Stack>
  );
}

export default SettingWrite;
