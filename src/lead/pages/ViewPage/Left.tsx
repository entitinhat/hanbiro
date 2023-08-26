import { useMemo } from 'react';
import { useQueryClient } from '@tanstack/react-query';

// types import
import { PageLayoutData, PageLayoutSectionField } from '@base/types/pagelayout';

// project import
import * as keyNames from '@lead/config/keyNames';
import ViewFields from '@base/components/@hanbiro/ViewPage/ViewFields';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import { companyGroup, contactGroup } from '@lead/config/view-field';
import ViewLeft, { LeftItem } from '@base/components/@hanbiro/ViewLeft';
import { useLeadMutation } from '@lead/hooks/useLeadMutation';

interface LeftProps {
  layoutData: PageLayoutData;
  ignoreFields?: string[];
  onRefetch?: () => void;
}

const Left = (props: LeftProps) => {
  const { layoutData, ignoreFields, onRefetch } = props;
  const { menuSource, menuSourceId, data } = layoutData;
  const { mUpdateLead } = useLeadMutation();

  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const basicFields = layoutData?.layout?.data?.[0]?.children ?? [];
  const moreFields = layoutData?.layout?.data?.[1]?.children ?? [];

  console.log('layoutData?.layout?.data', layoutData?.layout?.data);
  const handleOnSave = (keyName: string, isSuccess: boolean, value: any) => {
    onRefetch && onRefetch();
  };

  const handleOnClose = (keyName: string, value: any) => {};

  const handleOnProductChange = (value: any) => {
    mUpdateLead.mutate({ lead: { [keyNames.KEY_LEAD_PRODUCT]: value?.length > 0 ? value.map((item: any) => {
      return {
        id: item?.id,
        name: item?.name
      }
    }) : null, id: menuSourceId } });
  }

  const RestFieldsMemo = useMemo(() => {
    const restFields = basicFields.filter(
      (field: PageLayoutSectionField) => !(companyGroup.includes(field.keyName) || contactGroup.includes(field.keyName))
    );
    return (
      <>
        {restFields.length ? (
          <ViewFields
            fields={[...restFields, ...moreFields]}
            ignoreFields={[
              keyNames.KEY_LEAD_TITLE,
              keyNames.KEY_LEAD_COLLECTION_METHOD,
              keyNames.KEY_LEAD_DESCRIPTION,
              keyNames.KEY_LEAD_PRODUCT
            ]}
            menuSource={menuSource}
            menuSourceId={menuSourceId ?? ''}
            data={data}
            onSave={handleOnSave}
            onClose={handleOnClose}
            column={1}
            readOnly={true}
            divider={true}
          />
        ) : null}
      </>
    );
  }, [basicFields, ignoreFields, menuSource, menuSourceId]);

  const ProductFieldMemo = useMemo(() => {
    const ProductFields = basicFields.filter((field: PageLayoutSectionField) => field.keyName === keyNames.KEY_LEAD_PRODUCT);
    console.log('ProductFields', ProductFields);
    return (
      <>
        {ProductFields.length ? (
          <ViewFields
            fields={[...ProductFields]}
            ignoreFields={[keyNames.KEY_LEAD_TITLE, keyNames.KEY_LEAD_COLLECTION_METHOD, keyNames.KEY_LEAD_DESCRIPTION]}
            menuSource={menuSource}
            menuSourceId={menuSourceId ?? ''}
            data={data}
            onSave={handleOnSave}
            onClose={handleOnClose}
            onChange={handleOnProductChange}
            column={1}
            readOnly={true}
          />
        ) : null}
      </>
    );
  }, [basicFields, ignoreFields, menuSource, menuSourceId]);

  const CompanyMemo = useMemo(() => {
    const companyFields = basicFields.filter((field: PageLayoutSectionField) => companyGroup.includes(field.keyName));
    return (
      <>
        {companyFields.length ? (
          <ViewFields
            fields={companyFields}
            ignoreFields={[]}
            menuSource={menuSource}
            menuSourceId={menuSourceId ?? ''}
            data={data}
            onSave={handleOnSave}
            onClose={handleOnClose}
            column={1}
            // readOnly={true}
          />
        ) : null}
      </>
    );
  }, [basicFields, ignoreFields, menuSource, menuSourceId]);

  const ContactMemo = useMemo(() => {
    const contactFields = basicFields.filter((field: PageLayoutSectionField) => contactGroup.includes(field.keyName));
    return (
      <>
        {contactFields.length ? (
          <ViewFields
            fields={contactFields}
            ignoreFields={[]}
            menuSource={menuSource}
            menuSourceId={menuSourceId ?? ''}
            data={data}
            onSave={handleOnSave}
            onClose={handleOnClose}
            column={1}
            // readOnly={true}
          />
        ) : null}
      </>
    );
  }, [basicFields, ignoreFields, menuSource, menuSourceId]);

  //render
  const leftItems: LeftItem[] = [
    {
      title: t('ncrm_common_summary'),
      sections: [
        {
          title: t('Company'),
          component: CompanyMemo
        },
        {
          title: t('Contact'),
          component: ContactMemo
        },
        {
          component: ProductFieldMemo
        },
        {
          component: RestFieldsMemo
        }
      ]
    }
  ];

  return (<ViewLeft items={leftItems} />);
};

export default Left;
