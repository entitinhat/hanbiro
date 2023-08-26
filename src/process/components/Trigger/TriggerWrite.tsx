import _ from 'lodash';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRecoilState } from 'recoil';

import SelectBox from '@base/components/@hanbiro/SelectBox';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import { OptionValue } from '@base/types/common';
import { Divider, Grid, InputLabel, Stack, Typography, useTheme } from '@mui/material';
import { MODULE_OPTIONS, PROCESS_STATUS_PROPERTIES, PROCESS_TYPE_OPTIONS, TRIGGER_TYPE_OPTIONS } from '@process/config/constants';
import { useDefinedFields, useGetProcessSteps } from '@process/hooks/useProcess';
import { useGetModuleProcesses } from '@process/hooks/useModule';
import { triggerFormAtom } from '@process/store/atoms/process';
import { DefinedField, ModuleType, TriggerForm } from '@process/types/process';

interface TriggerWriteProps {
  value?: TriggerForm;
}

function TriggerWrite(props: TriggerWriteProps) {
  const theme = useTheme();
  const { value } = props;

  const [triggerForm, setTriggerForm] = useRecoilState(triggerFormAtom);
  const [processOptions, setProcessOptions] = useState<OptionValue[]>([]);
  const [stepOptions, setStepOptions] = useState<OptionValue[]>([]);

  const { data: definedFields } = useDefinedFields();
  const { data: processData } = useGetModuleProcesses({ module: triggerForm.module?.keyName as ModuleType });
  const { data: stepData } = useGetProcessSteps(triggerForm.process?.keyName);

  useEffect(() => {
    if (value) {
      if (JSON.stringify(value) !== JSON.stringify(triggerForm)) {
        setTriggerForm(value);
      }
    }
  }, [value]);

  const moduleFields = useMemo(() => {
    let items: { [index: string]: DefinedField[] } = {};
    if (definedFields?.results) {
      for (const item of definedFields.results) {
        if (!items[item.module]) {
          items[item.module] = [];
        }
        items[item.module].push(item);
      }
    }
    return items;
  }, [definedFields]);

  const fieldOptions = useMemo(() => {
    if (moduleFields[triggerForm.module?.keyName]) {
      return moduleFields[triggerForm.module.keyName].map((field) => {
        return {
          keyName: field.fieldName,
          languageKey: field.fieldName,
          extra: field.fieldType
        };
      });
    }
    return [];
  }, [moduleFields, triggerForm.module]);

  const onTypeChange = useCallback((newVal: OptionValue) => {
    setTriggerForm((old) => {
      return { ...old, trigger: newVal };
    });
  }, []);

  const onModuleChange = useCallback((newVal: OptionValue) => {
    setTriggerForm((old) => {
      return { ...old, module: newVal };
    });
  }, []);

  const onFieldChange = useCallback((newVal: OptionValue) => {
    setTriggerForm((old) => {
      return { ...old, field: newVal };
    });
  }, []);

  const onProcessTypeChange = useCallback((newVal: OptionValue) => {
    setTriggerForm((old) => {
      return { ...old, ptype: newVal };
    });
  }, []);

  const onProcessNameChange = useCallback((newVal: OptionValue) => {
    setTriggerForm((old) => {
      return { ...old, process: newVal };
    });
  }, []);

  const onStepNameChange = useCallback((newVal: OptionValue) => {
    setTriggerForm((old) => {
      return { ...old, step: newVal };
    });
  }, []);

  const onStepPropertyChange = useCallback((newVal: OptionValue) => {
    setTriggerForm((old) => {
      return { ...old, property: newVal };
    });
  }, []);

  useEffect(() => {
    if (processData?.results) {
      const options = processData.results.map((process) => {
        return {
          keyName: process.id,
          languageKey: process.name
        };
      });
      setProcessOptions(options);
    }
  }, [processData]);

  useEffect(() => {
    if (stepData?.results) {
      const options = stepData.results.map((step) => {
        return {
          keyName: step.id,
          languageKey: step.name
        };
      });
      setStepOptions(options);
    }
  }, [stepData]);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Stack spacing={0.5}>
          <InputLabel sx={{ display: 'flex' }}>
            <SpanLang sx={{ fontWeight: theme.typography.fontWeightMedium }} keyLang={'Type'} />
          </InputLabel>
          <SelectBox options={TRIGGER_TYPE_OPTIONS} value={triggerForm.trigger} onChange={(newVal) => onTypeChange(newVal)} />
        </Stack>
      </Grid>
      {(triggerForm.trigger.keyName == 'TRIGGER_TYPE_RECORD_CREATED' ||
        triggerForm.trigger.keyName == 'TRIGGER_TYPE_RECORD_UPDATED' ||
        triggerForm.trigger.keyName == 'TRIGGER_TYPE_RECORD_CREATED_UPDATED' ||
        triggerForm.trigger.keyName == 'TRIGGER_TYPE_RECORD_DELETED') && (
        <Grid item xs={12}>
          <Stack spacing={1}>
            <InputLabel sx={{ display: 'flex' }}>
              <SpanLang sx={{ fontWeight: theme.typography.fontWeightMedium }} keyLang={'Record'} />
            </InputLabel>
            <Divider />
            <Stack>
              <Typography>Module</Typography>
              <SelectBox options={MODULE_OPTIONS} value={triggerForm.module!!} onChange={(newVal) => onModuleChange(newVal)} />{' '}
            </Stack>
          </Stack>
        </Grid>
      )}
      {triggerForm.trigger.keyName == 'TRIGGER_TYPE_FIELD_UPDATED' && (
        <Grid item xs={12}>
          <Stack spacing={0.5}>
            <InputLabel sx={{ display: 'flex' }}>
              <SpanLang sx={{ fontWeight: theme.typography.fontWeightMedium }} keyLang={'Field'} />
            </InputLabel>
            <Divider />
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Typography>Module</Typography>
                <SelectBox options={MODULE_OPTIONS} value={triggerForm.module!!} onChange={(newVal) => onModuleChange(newVal)} />
              </Grid>
              <Grid item xs={6}>
                <Typography>Field</Typography>
                <SelectBox options={fieldOptions} value={triggerForm.field!!} onChange={(newVal) => onFieldChange(newVal)} />
              </Grid>
            </Grid>
          </Stack>
        </Grid>
      )}
      {triggerForm.trigger.keyName == 'TRIGGER_TYPE_PROCESS_PROPERTY_UPDATED' && (
        <Grid item xs={12}>
          <Stack spacing={0.5}>
            <InputLabel sx={{ display: 'flex' }}>
              <SpanLang sx={{ fontWeight: theme.typography.fontWeightMedium }} keyLang={'Process'} />
            </InputLabel>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Typography>Type</Typography>
                <SelectBox options={PROCESS_TYPE_OPTIONS} value={triggerForm.ptype!!} onChange={(newVal) => onProcessTypeChange(newVal)} />
              </Grid>
              <Grid item xs={6}>
                <Typography>Module</Typography>
                <SelectBox options={MODULE_OPTIONS} value={triggerForm.module!!} onChange={(newVal) => onModuleChange(newVal)} />
              </Grid>
              <Grid item xs={4}>
                <Typography>Process Name</Typography>
                <SelectBox
                  options={processOptions ?? []}
                  value={triggerForm.process!!}
                  onChange={(newVal) => onProcessNameChange(newVal)}
                />
              </Grid>
              <Grid item xs={4}>
                <Typography>Step Name</Typography>
                <SelectBox options={stepOptions ?? []} value={triggerForm.step!!} onChange={(newVal) => onStepNameChange(newVal)} />
              </Grid>
              <Grid item xs={4}>
                <Typography>Step Property</Typography>
                <SelectBox
                  options={PROCESS_STATUS_PROPERTIES}
                  value={triggerForm.property!!}
                  onChange={(newVal) => onStepPropertyChange(newVal)}
                />
              </Grid>
            </Grid>
          </Stack>
        </Grid>
      )}
    </Grid>
  );
}

export default TriggerWrite;
