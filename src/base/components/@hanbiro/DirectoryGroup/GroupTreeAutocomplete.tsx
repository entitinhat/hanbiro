import React, { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import { TextField, Autocomplete, Box, ClickAwayListener, CircularProgress, ComponentsProps, Chip } from '@mui/material';
import GroupTree from './GroupTree';
import { Group } from '@base/types/user';
import { debounce, differenceBy } from 'lodash';
import { generateUUID } from '@base/utils/helpers';
import { SxProps } from '@mui/system';
import { useTranslation } from 'react-i18next';
import { useGroups } from '@settings/users-groups/groups/hooks/useGroups';
import { ListGroupsRequest } from '@settings/users-groups/groups/types/group';
import { useOrg } from '@base/hooks/iam/useOrg';
import { LIST_TABLE_PAGE_SIZE } from '@base/config/constant';

interface GroupTreeAutocomplete {
  value?: Group[];
  fixedValue?: Group[];
  onChange?: (v: Group[]) => void;
  sx?: SxProps;
}

const isDifference = (a: Group[], b: Group[]) => {
  const diffs = differenceBy(a, b, 'id');
  return !!diffs?.length;
};

const GroupTreeAutocomplete = (props: GroupTreeAutocomplete) => {
  const { value = [], fixedValue, onChange, sx } = props;
  const { t } = useTranslation();
  const fixedIds: string[] = !!fixedValue ? fixedValue.map((v) => v.id) : [];
  const { id: orgId } = useOrg();
  const [isOpen, setIsOpen] = useState(false);
  const [treeExpanded, setTreeExpanded] = useState<string[]>([]);
  const [selectedValues, setSelectedValues] = useState<Group[]>(value);
  const [inputText, setInputText] = useState<string>('');
  const [searchText, setSearchText] = useState<string>('');
  const setSearchTextDebounced = useRef(debounce((t: string) => setSearchText(t), 1000)).current;
  const maxResults = LIST_TABLE_PAGE_SIZE * 2;
  useEffect(() => {
    if (value && isDifference(value, selectedValues)) {
      setSelectedValues(value ?? []);
    }
  }, [value]);

  useEffect(() => {
    if (isDifference(value, selectedValues)) {
      onChange && onChange(selectedValues);
    }
  }, [selectedValues]);
  const groupsReq: ListGroupsRequest = {
    orgId,
    maxResults
  };
  const { results: sourceData, isLoading } = useGroups(groupsReq);

  const { items: groups = [] } = sourceData ?? {};

  const data: Group[] =
    groups && groups?.length
      ? groups.map((v) => {
          return {
            id: v.id,
            name: v.displayName ?? '',
            children: [
              {
                id: generateUUID(),
                name: v.displayName,
                children:
                  groups && groups?.length
                    ? groups.map((v) => {
                        return {
                          id: generateUUID(),
                          name: v.displayName,
                          children: [
                            {
                              id: generateUUID(),
                              name: v.displayName
                            }
                          ]
                        };
                      })
                    : []
              }
            ]
          };
        })
      : [];

  const handleDelete = (g?: Group) => {
    if (!!g) {
      const newSelectedValues = selectedValues.filter(({ id }) => id != g.id);
      setSelectedValues(newSelectedValues);
    }
  };

  const handleOnTreeChange = (v: Group[]) => {
    setSelectedValues(v);
  };

  const handleInputChange = (event: React.SyntheticEvent, value: string) => {
    setInputText(value);
    setSearchTextDebounced(value);
  };

  const ListboxComponent = useMemo(
    () =>
      forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLElement>>((props, ref) => {
        return (
          <ClickAwayListener onClickAway={() => setIsOpen(false)}>
            <Box ref={ref}>
              <GroupTree
                {...props}
                value={selectedValues}
                dataSource={data}
                onChange={handleOnTreeChange}
                expanded={treeExpanded}
                onExpandChanged={(v) => setTreeExpanded(v)}
              />
            </Box>
          </ClickAwayListener>
        );
      }),
    [data, selectedValues, treeExpanded]
  );

  return (
    <Autocomplete
      open={isOpen}
      onOpen={() => setIsOpen(true)}
      multiple
      // limitTags={2}
      id="group-tags-outlined"
      size="small"
      options={data ?? []}
      getOptionLabel={(option) => option.name}
      value={selectedValues}
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => (
          <Chip size="small" label={option.name} {...getTagProps({ index })} disabled={fixedIds.indexOf(option.id) !== -1} />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          InputProps={{
            ...params.InputProps,
            readOnly: true,
            endAdornment: (
              <>
                {isLoading ? <CircularProgress size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            )
          }}
          placeholder={t('ncrm_common_group_tree_auto_placeholder') as string}
        />
      )}
      sx={{
        '& .MuiOutlinedInput-root': {
          p: 1
        },
        '& .MuiAutocomplete-tag': {
          bgcolor: 'primary.lighter',
          border: '1px solid',
          borderColor: 'primary.light',
          '& .MuiSvgIcon-root': {
            color: 'primary.main',
            '&:hover': {
              color: 'primary.dark'
            }
          }
        },
        ...sx
      }}
      ListboxComponent={ListboxComponent}
      onChange={(event, value, reason, details) => {
        if (reason === 'removeOption') {
          handleDelete(details?.option);
        } else if (reason === 'clear') {
          setSelectedValues([...selectedValues.filter((v) => fixedIds.includes(v.id))]);
        }
      }}
      disableCloseOnSelect
      inputValue={inputText}
      onInputChange={handleInputChange}
      clearOnBlur={false}
    />
  );
};

export default GroupTreeAutocomplete;
