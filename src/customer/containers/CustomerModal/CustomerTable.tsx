import { useMemo } from 'react';

//menu
import {
  CUSTOMER_CATEGORY_ACCOUNT,
  CUSTOMER_CATEGORY_ALL,
  CUSTOMER_CATEGORY_CONTACT,
  CUSTOMER_CATEGORY_MARKETING_LIST
} from '@customer/config/constants';
import TableTab from './TableTab';
import { useTranslation } from 'react-i18next';
import { TabProps } from '@base/components/@hanbiro/ViewTabs/interface';
import ViewTabs from '@base/components/@hanbiro/ViewTabs';

interface CustomerTableProps {
  defaultSelectedIds: string[];
  onChange?: (selected: any) => void;
  isMarketingModal?: boolean;
}

const CustomerTable = (props: CustomerTableProps) => {
  const { defaultSelectedIds = [], onChange, isMarketingModal = false } = props;
  const { t } = useTranslation();

  const tabs: TabProps[] = useMemo(() => {
    return isMarketingModal
      ? [
          {
            default: false,
            label: t('Account'),
            path: 'members',
            order: 1,
            // icon: <History fontSize="small" />,
            // iconPosition: 'start',
            tabComponent: <TableTab defaultSelectedIds={defaultSelectedIds} category={CUSTOMER_CATEGORY_ACCOUNT} onChange={onChange} />
          },
          {
            default: false,
            label: t('Contact'),
            path: 'timeline',
            order: 2,
            // icon: <History fontSize="small" />,
            // iconPosition: 'start',
            tabComponent: <TableTab defaultSelectedIds={defaultSelectedIds} category={CUSTOMER_CATEGORY_CONTACT} onChange={onChange} />
          },
          {
            default: false,
            label: t('All'),
            path: 'note',
            order: 3,
            // icon: <NoteAltOutlined fontSize="small" />,
            // iconPosition: 'start',
            tabComponent: <TableTab defaultSelectedIds={defaultSelectedIds} category={CUSTOMER_CATEGORY_ALL} onChange={onChange} />
          }
        ]
      : [
          {
            default: false,
            label: t('Account'),
            path: 'members',
            order: 1,
            // icon: <History fontSize="small" />,
            // iconPosition: 'start',
            tabComponent: <TableTab defaultSelectedIds={defaultSelectedIds} category={CUSTOMER_CATEGORY_ACCOUNT} onChange={onChange} />
          },
          {
            default: false,
            label: t('Contact'),
            path: 'timeline',
            order: 2,
            // icon: <History fontSize="small" />,
            // iconPosition: 'start',
            tabComponent: <TableTab defaultSelectedIds={defaultSelectedIds} category={CUSTOMER_CATEGORY_CONTACT} onChange={onChange} />
          },
          {
            default: false,
            label: t('Marketing List'),
            path: 'note',
            order: 3,
            // icon: <NoteAltOutlined fontSize="small" />,
            // iconPosition: 'start',
            tabComponent: (
              <TableTab defaultSelectedIds={defaultSelectedIds} category={CUSTOMER_CATEGORY_MARKETING_LIST} onChange={onChange} />
            )
          }
        ];
  }, [defaultSelectedIds, isMarketingModal]);

  const viewTabsProps = { menuSource: '', menuSourceId: '', tabs };

  const tabsMemo = useMemo(() => {
    return <ViewTabs {...viewTabsProps} />;
  }, []);

  return <>{tabsMemo}</>;
};

export default CustomerTable;
