import { FormIcon } from '@base/components/@hanbiro/FormIcon';
import LoadingCircular from '@base/components/@hanbiro/LoadingCircular';
import { getCurrentLang } from '@base/services/i18n';
import { IconType } from '@base/types/app';
import { DeleteOutline } from '@mui/icons-material';
import { CircularProgress, IconButton, Tooltip, Typography } from '@mui/material';
import { Grid, useTheme } from '@mui/material';
import { Selection } from '@settings/general/types/selection';
import classNames from 'classnames';
import React, { forwardRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './styles.scss';
interface GroupProps {
  // node expand or not
  expand?: boolean;
  // group id
  id: string;
  // classname
  className?: string;
  // group loading children or not
  isLoading?: boolean;
  isLoaded?: boolean;
  // Add Group item
  onStartAddItem?: (params: any) => void;
  // Delete Group Item
  onDeleteItem?: (params: any) => void;
  onStartEditItem?: (params: any) => void;
  // group level
  level?: number;
  // children
  subGroups?: Selection[];
  isActive?: boolean;
  icon?: string;
  iconType?: IconType;
  // group name
  label: string;
  isBadge?: boolean;
  badge?: number;
  isEdit?: boolean;
  onEdit?: () => void;
  isDelete?: boolean;
  onDelete?: () => void;
  onClick?: () => void;
  isAdd?: boolean;
  onAdd?: (params: any) => void;
  onExpand?: (params: any) => void;
  onExpandGroup?: (params: any) => void;
}
// const Group = (props: GroupProps, ref: any) => {
const Group: React.FC<GroupProps> = (props: GroupProps) => {
  const {
    expand = false,
    id = '',
    className = '',
    isLoading = false,
    isLoaded = false,
    onStartAddItem = () => {},
    onDeleteItem = () => {},
    onStartEditItem = () => {},
    level = 0,
    subGroups = [],
    isActive = false,
    icon = 'Folder',
    iconType = 'feather',
    label = '',
    isBadge = '',
    badge = '',
    isEdit = false,
    onEdit = () => {},
    isDelete = false,
    onDelete = () => {},
    onClick = () => {},
    isAdd = false,
    onAdd = () => {},
    onExpand = () => {},
    onExpandGroup = () => {},
    ...attrs
  } = props;
  const [loading, setLoading] = useState(false);
  const userLang = getCurrentLang();
  const { t } = useTranslation();
  const theme = useTheme();
  const iconColor = {
    sx: {
      color: theme.palette.primary.main
    }
  };
  const loadData = (isExpand: boolean) => {
    if (loading) {
      return;
    }

    onExpandGroup({
      loadData: loadData,
      setLoading: setLoading,
      isExpand: isExpand
    });
  };

  if (isLoading) {
    return (
      <a
        className={classNames(`nav-link ${className} navata-placeholder`)}
        style={{
          paddingLeft: level == 0 ? 10 : level * 20 + 10,
          height: 33
        }}
      />
    );
  }
  useEffect(() => {
    if (loading) {
      setLoading(false);
    }
  }, [isLoaded]);
  return (
    <>
      <Grid
        sx={{
          margin: '10px',
          alignItems: 'center',
          display: 'flex',
          '&:hover': { backgroundColor: theme.palette.grey[200], cursor: 'pointer' },
          backgroundColor: 'transparent',
          paddingLeft: level == 0 ? '10 px' : level * 20 + 10 + 'px'
        }}
        // ref={ref}

        onClick={(e) => onClick()}
        // style={{ height: 33 }}
        {...attrs}
      >
        {loading ? (
          <CircularProgress size={16} sx={{ mr: '5px' }} />
        ) : (
          <IconButton className="icon-expand" onClick={() => loadData(!expand)}>
            <FormIcon icon={expand ? 'ChevronDown' : 'ChevronRight'} iconType="feather" />
          </IconButton>
        )}
        <FormIcon icon={icon} iconType={iconType} />
        <Typography sx={{ ml: '10px' }}>{label}</Typography>
        {isBadge && badge}
        <Grid sx={{ ml: 'auto', mr: '10px' }}>
          {isAdd && (
            <Tooltip title={t('ncrm_generalsetting_tooltip_title_add_new')} placement="left">
              <IconButton
                onClick={(e) => {
                  e.preventDefault();
                  onAdd({
                    loadData: loadData,
                    setLoading: setLoading
                  });
                }}
              >
                <FormIcon icon="CreateNewFolder" iconType="material" fontSize="small" attrs={iconColor} />
              </IconButton>
            </Tooltip>
          )}
          {isEdit && (
            <Tooltip title={t('ncrm_generalsetting_tooltip_title_edit')} placement="left">
              <IconButton
                onClick={(e) => {
                  e.preventDefault();
                  onEdit();
                }}
              >
                <FormIcon icon="BorderColor" iconType="material" fontSize="small" attrs={iconColor} />
              </IconButton>
            </Tooltip>
          )}
          {isDelete && (
            <Tooltip title={t('ncrm_generalsetting_tooltip_title_remove')} placement="right">
              <IconButton
                onClick={(e) => {
                  e.preventDefault();
                  onDelete();
                }}
              >
                <DeleteOutline color="error" fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </Grid>
      </Grid>

      {expand &&
        subGroups?.map((group: any) => {
          let subRef = React.createRef();
          return (
            <Group
              // ref={subRef}
              onDeleteItem={onDeleteItem}
              onStartEditItem={onStartEditItem}
              onStartAddItem={onStartAddItem}
              onExpand={onExpand}
              expand={group.expand}
              id={group.id}
              key={group.id}
              level={level + 1}
              label={group?.language?.[userLang] ?? ''}
              icon={'Folder'}
              iconType={'feather'}
              onClick={() => {}}
              subGroups={group.children}
              isEdit={group.isBase == '1' ? false : true}
              onEdit={() => onStartEditItem({ item: group })}
              isDelete={group.isBase == '1' ? false : true}
              onDelete={() => onDeleteItem({ item: group })}
              isAdd={group.isBase == '1' ? false : true}
              onAdd={({ loadData, setLoading, setIsExpand }: any) =>
                onStartAddItem({
                  item: group,
                  loadData: loadData,
                  setLoading: setLoading,
                  setIsExpand: setIsExpand
                })
              }
              onExpandGroup={({ loadData, setLoading, setIsExpand, isExpand }: any) =>
                onExpand({
                  item: group,
                  loadData: loadData,
                  setLoading: setLoading,
                  setIsExpand: setIsExpand,
                  isExpand: isExpand
                })
              }
              isLoading={group.isLoading}
              isLoaded={group.isLoaded}
            />
          );
        })}
    </>
  );
};

export default Group;
