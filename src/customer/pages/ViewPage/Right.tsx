import { useTranslation } from 'react-i18next';

// project
import ViewRight, { CardProps } from '@base/components/@hanbiro/ViewRight';
import ViewAsideContainer from '@base/components/@hanbiro/ViewPage/ViewAsideContainer';
import { PageLayoutData } from '@base/types/pagelayout';
import Timeline from '@base/containers/TimeLine';
import Activities from '@base/containers/Activities';
import Note from '@base/containers/Notes';
import AttachmentsRecent from '@base/containers/AttachmentsRecent';

// menu
import * as keyNames from '@customer/config/keyNames';
import { CUSTOMER_CATEGORY_ACCOUNT, CUSTOMER_CATEGORY_CONTACT } from '@customer/config/constants';
import CustomerTicket from '@customer/containers/CustomerTicket';

interface RightProps {
  menuSource: string;
  menuCategory: string;
  menuSourceId: string;
  layoutData: PageLayoutData;
}

const Right = (props: RightProps) => {
  const { menuSource, menuCategory, menuSourceId, layoutData } = props;
  const { t } = useTranslation();

  //get account info if contact type is employee
  const basicFields = layoutData?.layout?.data?.[0]?.children || [];
  const acountField = basicFields?.find((_field: any) => _field?.keyName === keyNames.KEY_NAME_CUSTOMER_ACCOUNT);
  const contactTypeField = basicFields?.find((_field: any) => _field?.keyName === keyNames.KEY_NAME_CUSTOMER_CONTACT_TYPE);
  let isEmployee = menuCategory === CUSTOMER_CATEGORY_CONTACT && contactTypeField?.data?.keyName === 'CONTACT_TYPE_EMPLOYEE' ? true : false;
  const cards: CardProps[] = [];
  //console.log('acountField', acountField);

  // company info show condition: Contact && contact type Employee.
  // if (isEmployee) {
  //   cards.push({
  //     title: t('common_section_company_info'),
  //     component: <CompanyInfo data={acountField?.data} />
  //   });
  // }
  // if (menuCategory === CUSTOMER_CATEGORY_ACCOUNT) {
  //   cards.push({
  //     title: t('common_section_contact'),
  //     component: (
  //       <AssignCustomer
  //         menuSource={menuSource}
  //         menuSourceId={menuSourceId}
  //         menuCategory={menuCategory}
  //         menuSourceName={layoutData?.data?.name || ''}
  //       />
  //     )
  //   });
  // }
  //general
  cards.push({
    title: t('Recent Timeline'),
    component: <Timeline menuSource={menuSource} menuSourceId={menuSourceId} isRecent />,
    isExpandable: true
  });
  cards.push({
    title: t('Recent Activities'),
    component: <Activities menuSource={menuSource} menuSourceId={menuSourceId} isRecent />,
    isExpandable: true
  });

  cards.push({
    title: t('Recent Tickets'),
    component: <CustomerTicket menuSource={menuSource} menuSourceId={menuSourceId} isRecent />, //<RecentTickets menuSourceId={menuSourceId as string} />,
    isExpandable: true
  });
  cards.push({
    title: t('Recent Notes'),
    component: <Note menuSource={menuSource} menuSourceId={menuSourceId as string} isRecent />,
    isExpandable: true
  });

  // cards.push({
  //   title: t('common_section_assigned_rep'),
  //   component: <AssignRep menuSourceId={menuSourceId} />
  // });

  // if (contactTypeField?.data?.keyName != 'CONTACT_TYPE_EMPLOYEE') {
  //   cards.push({
  //     title: t('ncrm_common_section_related_product'),
  //     component: <RelatedProduct menuSource={menuSource} menuSourceId={menuSourceId} />
  //   });
  // }
  cards.push({
    title: t('common_section_attachment'),
    component: <AttachmentsRecent menuSource={menuSource} menuSourceId={menuSourceId} />
  });

  //render
  return (
    <>
      <ViewAsideContainer>
        <ViewRight cards={cards} />
      </ViewAsideContainer>
    </>
  );
};

export default Right;
