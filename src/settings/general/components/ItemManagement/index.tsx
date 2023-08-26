import { forwardRef } from 'react';
import classNames from 'classnames';
import { IconType } from '@base/types/app';
import { FormIcon } from '@base/components/@hanbiro/FormIcon';
import { Grid, IconButton, Tooltip, Typography, useTheme } from '@mui/material';
import { DeleteOutline, EditOutlined } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

interface ItemManagementProps {
  className?: string;
  isLoading: boolean;
  isActive?: boolean;
  icon?: string;
  iconType?: IconType;
  label: string;
  isBadge?: boolean;
  badge?: string;
  isEdit?: boolean;
  onEdit?: () => void;
  isDelete?: boolean;
  onDelete?: () => void;
  onClick?: () => void;
  background?: boolean;
}

const ItemManagement = (props: ItemManagementProps, ref: any) => {
  const {
    className = '',
    isLoading = false,
    isActive = false,
    icon = '',
    iconType = undefined,
    label = '',
    isBadge = '',
    badge = '',
    isEdit = false,
    onEdit = () => {},
    isDelete = false,
    onDelete = () => {},
    onClick = () => {},
    background = false,
    ...attrs
  } = props;

  const { t } = useTranslation();

  if (isLoading) {
    return <a className={classNames(`nav-link ${className} navata-placeholder`)} style={{ height: 33 }} />;
  }

  const theme = useTheme();
  const iconColor = {
    sx: {
      color: theme.palette.primary.main
    }
  };
  return (
    <Grid
      sx={{
        margin: '10px',
        alignItems: 'center',
        display: 'flex',
        '&:hover': { backgroundColor: theme.palette.grey[200], cursor: 'pointer' },
        backgroundColor: isActive ? theme.palette.grey[200] : background ? theme.palette.background.default : 'transparent'
      }}
      // ref={ref}

      onClick={(e) => onClick()}
      // style={{ height: 33 }}
      {...attrs}
    >
      <Grid sx={{ display: 'flex', margin: '5px', alignItems: 'center' }}>
        <FormIcon icon={icon} iconType={iconType} />
        <Typography sx={{ ml: '5px', fontWeight: isActive ? 500 : 400 }}>{label}</Typography>
      </Grid>

      {isBadge && badge}
      <Grid sx={{ ml: 'auto', mr: '10px' }}>
        {isEdit && (
          <Tooltip title={t('ncrm_generalsetting_tooltip_title_edit')} placement="left">
            <IconButton
              onClick={(e) => {
                e.preventDefault();
                onEdit();
              }}
            >
              <EditOutlined fontSize="small" color="primary" />
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
  );
};

export default forwardRef(ItemManagement);
