import { Box, Button, Checkbox, Grid, IconButton, Stack, TextField, Typography, useTheme } from '@mui/material';
import useDevice from '@base/hooks/useDevice';
import { ReactTable8 } from '@base/components/@hanbiro/ReactTable8';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import { ColumnDef } from '@tanstack/react-table';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RuleEntry } from '@settings/assignment-rule/rule/types/rule';
import { defaultRuleEntryValue } from '../../RuleCriteriaSelect';
import RenderCriteria from './RenderCriteria';
import { IdName } from '@base/types/common';
import { CloseOutlined, EditOutlined } from '@mui/icons-material';
import { useAssignRuleEntryDelete } from '@settings/assignment-rule/rule/hooks/useAssignRuleEntryDelete';
import _ from 'lodash';

interface RuleEntryTableProps {
  data: RuleEntry[];
  onSelectEdit?: (val: RuleEntry[], order: number) => void;
}
const RuleEntryTable = (props: RuleEntryTableProps) => {
  const { data, onSelectEdit } = props;
  const theme = useTheme();
  const { t } = useTranslation();
  //mutations
  const { mutationDelete, isSuccess } = useAssignRuleEntryDelete();

  //state
  const [items, setItems] = useState<RuleEntry[]>([defaultRuleEntryValue]);
  useEffect(() => {
    if (data) {
      //Parse condition

      let ParseItem = _.cloneDeep(data);
      ParseItem = ParseItem.map((entry) => {
        entry.criteria = entry.criteria.map((val: { key: string; condition: any }) => {
          return {
            key: val.key,
            condition: val.condition ? (typeof val.condition === 'string' ? JSON.parse(val.condition) : val.condition) : ''
          };
        });

        return {
          ...entry
        };
      });
      setItems(ParseItem);
    }
  }, [data]);

  const onDelete = (id: string) => {
    if (id) mutationDelete({ id: id });
  };
  const handleSelectEdit = (data: any, order: number) => {
    if (data) {
      onSelectEdit && onSelectEdit([data], order);
    }
  };
  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: 'select',
        width: '45px',
        header: ({ table }) => (
          <Checkbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler()
            }}
          />
        ),
        cell: ({ row }) => (
          <div className="pd-x-1">
            <Checkbox
              {...{
                checked: row.getIsSelected(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler()
              }}
            />
          </div>
        )
      },
      {
        id: 'order',
        width: '150px',
        header: () => <SpanLang keyLang={'ncrm_generalsetting_assignment_rule_field_basic_sort_order'} />,
        accessorKey: 'order',
        enableColumnFilter: false,
        enableSorting: false,
        cell: ({ row }) => {
          return <Typography>{row?.original?.order}</Typography>;
        }
      },
      {
        id: 'criteria',
        width: 'auto',
        header: () => <SpanLang keyLang={'ncrm_setting_assignment_rule_criteria'} />,
        accessorKey: 'unit',
        enableColumnFilter: false,
        enableSorting: false,
        cell: ({ row }) => {
          const criteria = row?.original?.criteria.length > 0 ? row?.original?.criteria : null;
          const CriteriaKey = row?.original?.criteriaType;
          const notEmptyCriteria = criteria?.find((i: any) => i.condition !== '') ?? null;
          return criteria ? (
            <>
              <RenderCriteria critKey={CriteriaKey} condition={notEmptyCriteria?.condition ? notEmptyCriteria?.condition : null} />
            </>
          ) : (
            <Typography>{t('ncrm_generalsetting_assignment_rule_none')}</Typography>
          );
        }
      },
      {
        id: 'assignTo',
        width: 'auto',
        header: () => <SpanLang keyLang={'ncrm_generalsetting_assignment_rule_assign_to'} />,
        // accessorKey: 'attrValues',
        enableColumnFilter: false,
        enableSorting: false,
        cell: ({ row }) => {
          const itemId = row?.original?.id;
          const AssignTo = row?.original?.assignTo?.assignsTo;
          const mode = row?.original?.assignTo?.mode;
          let AssignToNameArray: string[] = [];
          if (AssignTo) {
            if (mode == 'AR_ASSGIN_TO_MODE_USER') {
              AssignTo.map((item: { user: IdName; group: IdName }) => {
                if (item?.user) AssignToNameArray.push(item.user.name);
              });
            } else {
              AssignTo.map((item: { user: IdName; group: IdName }) => {
                if (item?.group) AssignToNameArray.push(item.group.name);
              });
            }
          }
          const renderString = AssignToNameArray.length > 0 ? AssignToNameArray.join(' ,') : '(none)';
          return (
            <Stack spacing={2} alignItems="center" direction="row" justifyContent="space-between">
              <Typography>{renderString}</Typography>
              <Stack spacing={0.3} direction="row">
                <IconButton
                  size="small"
                  color="secondary"
                  sx={{ '& svg': { visibility: 'hidden' } }}
                  onClick={() => {
                    let ParseItem = row?.original;

                    handleSelectEdit(ParseItem, row?.original?.order);
                  }}
                >
                  <EditOutlined fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  color="error"
                  sx={{ '& svg': { visibility: 'hidden' } }}
                  onClick={() => {
                    onDelete(itemId);
                  }}
                >
                  <CloseOutlined fontSize="small" />
                </IconButton>
              </Stack>
            </Stack>
          );
        }
      }
    ],
    [data]
  );

  console.log('items', items);
  return (
    <Grid sx={{ width: 'auto' }}>
      <ReactTable8 columns={columns} data={[...items]} />
    </Grid>
  );
};
export default RuleEntryTable;
