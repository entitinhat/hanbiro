import { Button, ButtonGroup, SxProps } from '@mui/material';
import LoadingButton from '@base/components/@extended/LoadingButton';
import { Check, Close } from '@mui/icons-material';

interface HanButtonGroupProps {
  disabled?: boolean;
  isSaving?: boolean;
  onSave?: (keyName: string) => void;
  onClose: (keyName: string) => void;
  isHorizontal: boolean;
  sx?: SxProps;
}

const HanButtonGroup = (props: any) => {
  const { onClose, disabled, isSaving, onSave, isHorizontal, sx } = props;

  return (
    <ButtonGroup
      variant="outlined"
      sx={{
        ...sx,
        boxShadow: 'none',
        marginTop: isHorizontal ? 0 : '3px !important',
        marginLeft: isHorizontal ? '3px !important' : 0
      }}
      size="small"
    >
      {onSave && (
        <LoadingButton
          loading={isSaving}
          disabled={disabled}
          variant="contained"
          color="success"
          onClick={() => onSave()}
          sx={{ width: 32, height: 32 }}
          children={<Check fontSize="small" />}
        />
      )}
      <LoadingButton
        loading={false}
        disabled={false}
        variant="contained"
        color="secondary"
        onClick={onClose}
        sx={{ width: 32, height: 32 }}
        children={<Close fontSize="small" />}
      />
    </ButtonGroup>
  );
};

export default HanButtonGroup;
