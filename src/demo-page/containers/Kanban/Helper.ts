import { ChipProps } from '@mui/material';
import { Theme } from '@mui/material/styles';

import { ICategory } from './Interface';

const getCategoryBackgroundColor = (theme: Theme, value: ICategory): ChipProps['color'] => {
  switch (value) {
    case ICategory.BUG:
      return 'error';

    case ICategory.FEATURE:
      return 'info';

    case ICategory.INFRA:
      return 'success';

    case ICategory.REFACTOR:
      return 'secondary';

    case ICategory.DEPLOY:
      return 'warning';

    default:
      return 'primary';
  }
};

export const getCategoryBorderColor = (theme: Theme, value: ICategory) => {
  switch (value) {
    case ICategory.BUG:
      return theme.palette.error.main;

    case ICategory.FEATURE:
      return theme.palette.info.main;

    case ICategory.INFRA:
      return theme.palette.success.main;

    case ICategory.REFACTOR:
      return theme.palette.secondary.main;

    case ICategory.DEPLOY:
      return theme.palette.warning.main;

    default:
      return theme.palette.primary.main;
  }
};

export default getCategoryBackgroundColor;
