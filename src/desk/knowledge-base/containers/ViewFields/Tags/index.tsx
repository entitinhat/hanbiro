import React, { lazy, useEffect, useState } from 'react';
import { CommonViewFieldProps } from '@base/containers/ViewField/Common/interface';
import useDeskTicketTagMutation from '@desk/ticket/hooks/useTicketTagMutation';
import View from './View';
import Edit from './Edit';
import _ from 'lodash';
import { IdName } from '@base/types/common';
import { Box } from '@mui/material';
import { queryKeys } from '@desk/ticket/config/queryKeys';
import { useQueryClient } from '@tanstack/react-query';
import { Ticket } from '@desk/ticket/types/ticket';
import { SET_TIMEOUT } from '@base/config/constant';

interface LookUpProps extends CommonViewFieldProps {
  value: any;
  handleDelete: (val: IdName[], idx: number) => void;
  setOpen: () => void;
}

enum ModeType {
  VIEW,
  EDIT
}

const TagsViewField = (props: LookUpProps) => {
  const { value, config, menuSource, menuSourceId } = props;
  const [mode, setMode] = useState<ModeType>(ModeType.VIEW);
  let viewProps = _.cloneDeep(config?.componentProps);
  let newConfig = _.cloneDeep(config);
  if (newConfig) {
    newConfig.viewProps = viewProps;
  }
  const queryClient = useQueryClient();

  const { mUpdate } = useDeskTicketTagMutation();
  const [items, setItems] = useState<IdName[]>([]);

  const onSuccess = (keyName: string, isSuccess: boolean, value: any) => {
    //console.log('...Activity > View > handleOnSave ', keyName, isSuccess, value);

    // optimisticQueryKey
    const cohesionFields: string[] = []; //this field value change will be impact on other fields;
    if (isSuccess && cohesionFields.indexOf(keyName) >= 0) {
      queryClient.setQueryData([queryKeys.viewTicket], (old: Ticket | undefined) => {
        return { ...old, ...value };
      });
    }

    setTimeout(() => {
      queryClient.refetchQueries([queryKeys.viewTicket, menuSourceId]);
    }, SET_TIMEOUT);
  };

  // KEY_TICKET_TAG

  const handleOnSave = () => {
    // setItems([...items]);
    setMode(ModeType.VIEW);
    const params = {
      tags: items,
      id: menuSourceId
    };
    mUpdate.mutate(
      { ticket: params },
      {
        onSuccess: (data: any) => onSuccess('tags', true, data)
      }
    );
  };

  const handleOnChange = (nVal: IdName[]) => {
    setItems(nVal);
  };

  useEffect(() => {
    if (value && value?.length > 0) {
      if (!_.isEqual(value, items)) {
        setItems(value);
      }
    } else {
      setItems([]);
    }
  }, [value]);

  const handleOnClose = () => {
    setMode(ModeType.VIEW);
  };

  return (
    <Box>
      {mode === ModeType.EDIT && (
        <Edit
          value={items}
          onChange={handleOnChange}
          onSave={handleOnSave}
          onClose={handleOnClose}
          componentProps={config?.componentProps}
        />
      )}
      {mode === ModeType.VIEW && <View value={value || []} onAdd={() => setMode(ModeType.EDIT)} componentProps={config?.componentProps} />}
    </Box>
  );
};

export default TagsViewField;
