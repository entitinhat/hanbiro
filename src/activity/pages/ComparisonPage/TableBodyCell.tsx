import { FormIcon } from '@base/components/@hanbiro/FormIcon';
import { footCellData } from '@activity/pages/ComparisonPage/Helper';
import { Button, Chip, Stack, Typography, useTheme } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
interface TableBodyCellProps {
  data: any;
  keyName: string;
  viewValue?: string;
  showCurrentValue?: boolean;
  isFindPercent?: boolean;
}

const TableBodyCell = (props: TableBodyCellProps) => {
  const {
    data: { total = {}, lastTotal = {} },
    keyName,
    viewValue,
    showCurrentValue = true,
    isFindPercent = false
  } = props;
  const theme = useTheme();
  const { isUp, isDown, value, valuingDifference } = footCellData(total, lastTotal, keyName, isFindPercent);
  const compConfig: any = {
    ['up']: {
      styles: {
        color: `${theme.palette.success.main}!important`,
        backgroundColor: theme.palette.success.lighter,
        '&:hover': { backgroundColor: theme.palette.success.lighter }
      },
      icon: ArrowDropUpIcon
    },
    ['down']: {
      styles: {
        color: `${theme.palette.error.main}!important`,
        backgroundColor: theme.palette.error.lighter,
        '&:hover': { backgroundColor: theme.palette.error.lighter }
      },
      icon: ArrowDropDownIcon
    },
    ['equal']: {
      styles: {
        color: `${theme.palette.primary.main}!important`,
        backgroundColor: theme.palette.primary.lighter,
        '&:hover': { backgroundColor: theme.palette.primary.lighter }
      },
      icon: HorizontalRuleIcon
    }
  };
  const getComponent = () => {
    let type = 'up';
    if (isUp) type = 'up';
    else if (isDown) type = 'down';
    else type = 'equal';
    const Icon = compConfig[type].icon;
    return (
      <>
        {!valuingDifference  ? (
          <Button
            size="small"
            sx={{ ...compConfig[type].styles, minWidth: 'fit-content', padding: '0px 5px 0px 5px' }}
            variant="contained"
            disableRipple
            disableElevation
            disableFocusRipple
          >
            <Icon fontSize="small" sx={{ color: compConfig[type].styles.color }} />
          </Button>
        ) : (
          <Button
            size="small"
            sx={{ ...compConfig[type].styles, minWidth: 'fit-content', padding: '0px 5px 0px 5px' }}
            startIcon={<Icon fontSize="small" sx={{ color: compConfig[type].styles.color }} />}
            variant="contained"
            disableRipple
            disableElevation
            disableFocusRipple
          >
            {valuingDifference}
          </Button>
        )}
      </>
    );
  };
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      {showCurrentValue && <Typography>{viewValue ?? value}</Typography>}

      {getComponent()}
    </Stack>
  );
};

export default TableBodyCell;
