import { MENU_SALES } from '@base/config/menus';
import { IdName } from '@base/types/common';
import { ClickAwayListener, MenuItem, Select, SelectChangeEvent, styled, Typography, useTheme } from '@mui/material';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem, { TreeItemContentProps, TreeItemProps, useTreeItem } from '@mui/lab/TreeItem';
import { useMenuSetting } from '@settings/general/hooks/useMenuSetting';
import { forwardRef, SyntheticEvent, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

interface LeadSettingSelectProps {
  settingKey: string;
  value: IdName;
  onChange: (params: IdName) => void;
  placeholder?: string;
}
const CustomContentRoot = styled('div')(({ theme }) => ({
  dipslay: 'flex',
  alignItems: 'center',
  width: '100%',
  height: '35px',
  overflow: 'hidden',
  '&:hover .tree-btn-actions': {
    display: 'block'
  },
  padding: 0,
  marginBottom: '3px',
  WebkitTapHighlightColor: 'transparent',
  '&:hover, &.Mui-disabled, &.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused, &.Mui-selected:hover': {
    backgroundColor: 'transparent'
  },
  [`& .MuiTreeItem-contentBar`]: {
    position: 'absolute',
    width: '100%',
    height: 24,
    left: 0,
    '&:hover &': {
      backgroundColor: theme.palette.action.hover,
      '@media (hover: none)': {
        backgroundColor: 'transparent'
      }
    },
    '&.Mui-disabled &': {
      opacity: theme.palette.action.disabledOpacity,
      backgroundColor: 'transparent'
    },
    '&.Mui-focused &': {
      backgroundColor: theme.palette.primary.lighter
    },
    '&.Mui-selected &': {
      backgroundColor: theme.palette.primary.lighter
    },
    '&.Mui-selected:hover &': {
      backgroundColor: theme.palette.primary.lighter,
      '@media (hover: none)': {
        backgroundColor: theme.palette.primary.lighter
      }
    },
    '&.Mui-selected.Mui-focused &': {
      backgroundColor: theme.palette.primary.lighter
    }
  },
  '& .MuiTreeItem-iconContainer': {
    '& .MuiSvgIcon-root': { fontSize: '18px' }
  }
}));

const LeadSettingSelect = (props: LeadSettingSelectProps) => {
  const { value, onChange, settingKey, placeholder = 'Please Select' } = props;
  const [selected, setSelected] = useState<IdName>({ id: '', name: '' });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [options, setOptions] = useState<IdName[]>([]);
  const { t } = useTranslation();
  const theme = useTheme();
  const inputRef = useRef(null);

  //get data

  const { data: postData, refetch, isFetching } = useMenuSetting({ key: settingKey, menu: MENU_SALES });
  console.log('settingSelect postData', options);

  useEffect(() => {
    if (postData?.value) setOptions(JSON.parse(postData.value));
  }, [postData]);

  useEffect(() => {
    if (value) {
      setSelected(value);
      // if(typeof value == 'string'){
      //   console.log('setSelected', options, value);

      //   setSelected(options.find((item: IdName) => item.id == value) ||
      //   options?.find((item: any) => item?.children?.find((_item: IdName) => _item?.id == value ))?.children?.find((_item: IdName) => _item?.id == value ) ||
      //   { id: value, name: '' })
      // }
      // else{
      //   setSelected(value);
      // }
    } else {
      setSelected({ id: '', name: '' });
    }
  }, [value, options]);

  const handleChange = (nodeId: string, label: string, canSelect: boolean = true) => {
    const parentNode = options.find((_ele: any) => {
      if(_ele?.children?.find((item: any) => item?.id == nodeId)){
        return _ele
      }
    })

    const newValue = parentNode ? { id: nodeId, name: label, parent : { id: parentNode?.id, name: parentNode?.name } } : { id: nodeId, name: label };
    if (canSelect) {
      setSelected(newValue);
      setIsOpen(false);
      onChange && onChange(newValue);
    }
    console.log('isOpen', isOpen);
  };

  console.log('isOpen', isOpen);
  //Custom treeItem
  const CustomContent = forwardRef(function CustomContent(props: TreeItemContentProps, ref) {
    const { classes, className, label, nodeId, icon: iconProp, expansionIcon, displayIcon } = props;

    const { disabled, expanded, selected, focused, handleExpansion, handleSelection, preventSelection } = useTreeItem(nodeId);

    const icon = iconProp || expansionIcon || displayIcon;

    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      event.stopPropagation();
      preventSelection(event);
    };

    const handleExpansionClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      event.stopPropagation();
      handleExpansion(event);
    };

    const handleSelectionClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, label: any) => {
      event.stopPropagation();
      handleSelection(event);

      handleChange(nodeId, label?.props ? label?.props?.children : label as string, icon === undefined ? true : false);
    };
    console.log('icon', icon);

    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <CustomContentRoot
        className={clsx(className, classes.root, {
          [classes.expanded]: expanded,
          [classes.selected]: selected,
          [classes.focused]: focused,
          [classes.disabled]: disabled
        })}
        onMouseDown={handleMouseDown}
        ref={ref as React.Ref<HTMLDivElement>}
      >
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
        <div onClick={handleExpansionClick} className={classes.iconContainer}>
          {icon}
        </div>
        <Typography onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => handleSelectionClick(event, label)} component="div" className={classes.label}>
          {label}
        </Typography>
      </CustomContentRoot>
    );
  });

  function CustomTreeItem(props: TreeItemProps) {
    return <TreeItem ContentComponent={CustomContent} {...props} />;
  }
  console.log('selected', selected);
  return (
    <Select
      value={selected?.id}
      defaultValue=''
      // onChange={handleChange}
      open={isOpen}
      inputProps={{ placeholder: placeholder }}
      displayEmpty
      renderValue={(value: string): React.ReactNode => {
        console.log('render value', value);
        if (value === '') {
          return <Typography sx={{ color: theme.palette.secondary.main }}>Please Select</Typography>;
        }
        return selected?.name ?? '';
      }}
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
      sx={{ width: '100%' }}
    >
      <TreeView
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{ width: '100%' }}
        selected={selected?.id}
        ref={inputRef}
      >
        {options?.map((option: any, index: number) => (
          <CustomTreeItem key={option.id} nodeId={option.id} label={option.name}>
            {Array.isArray(option.children) ? (
              <>
                {option.children.map((child: IdName, indx: number) => (
                  <CustomTreeItem key={indx} nodeId={child.id} label={<Typography color="secondary">{t(child.name)}</Typography>} />
                ))}
              </>
            ) : null}
          </CustomTreeItem>
        ))}
      </TreeView>
    </Select>
  );
};
export default LeadSettingSelect;
