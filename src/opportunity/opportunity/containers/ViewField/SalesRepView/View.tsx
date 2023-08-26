import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';
import { CommonViewProps } from '@base/containers/ViewField/Common/interface';

import * as keyName from '@opportunity/config/keyNames';
import RouteName from '@base/components/@hanbiro/RouteName';
import { SALES_REP_TYPE_TEAM, SALES_REP_TYPE_USER } from '@opportunity/config/constants';
import TeamTableView from './SalesTeamView';
import SalesUserView from './SalesUserView';
interface ViewProps extends CommonViewProps {
  value?: any | null;
  componentProps?: {
    [x: string]: any;
  };
}

const View = (props: ViewProps) => {
  const { t } = useTranslation();

  const { value, componentProps } = props;

  if (value?.[keyName.KEY_NAME_OPPORTUNITY_SALES_REP_TYPE] === SALES_REP_TYPE_USER) {
    const newData = value?.[keyName.KEY_NAME_OPPORTUNITY_SALES_REP]?.user;

    return <SalesUserView value={newData} componentProps={componentProps} />;
  }

  if (value?.[keyName.KEY_NAME_OPPORTUNITY_SALES_REP_TYPE] === SALES_REP_TYPE_TEAM) {
    const newData = value?.[keyName.KEY_NAME_OPPORTUNITY_SALES_REP]?.team.reduce((acc: any, v: any) => {
      return acc.concat(v?.members);
    }, []);

    return <TeamTableView value={newData} componentProps={componentProps} />;
  }

  return <></>;
};

export default View;
