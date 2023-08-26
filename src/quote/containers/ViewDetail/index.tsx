import React, { useMemo } from 'react';

//material
import { useRecoilValue } from 'recoil';

//material
import { Box, Button, Stack } from '@mui/material';

//project
import ViewFields from '@base/components/@hanbiro/ViewPage/ViewFields';
import { PageLayoutData } from '@base/types/pagelayout';
import { defaultCurrencySelector } from '@base/store/selectors/app';
import { queryClient } from '@base/config/queryClient';
import { SET_TIMEOUT } from '@base/config/constant';

//menu
import * as keyNames from '@quote/config/keyNames';
import { queryKeys } from '@quote/config/queryKeys';
import { useQuoteFileMutation } from '@quote/hooks/useQuoteFileMutation';
import useQuoteUpdate from '@quote/hooks/useQuoteUpdate';
import QuoteItems from '../QuoteItems';
import DigitalContentTable from '../DigitalContentTable';
import { parseProductItemValueInput } from '../QuoteItems/Helper';

interface ViewDetailProps {
  menuSource?: string;
  menuCategory: string;
  menuSourceId: string;
  column?: number;
  layoutData: PageLayoutData;
  ignoreFields?: string[];
}

const ViewDetail = (props: ViewDetailProps) => {
  const { menuSource, menuCategory, menuSourceId, ignoreFields = [], column = 2, layoutData } = props;
  const { data } = layoutData;
  //console.log('🚀 ~ file: index.tsx:28 ~ data:', data);
  //console.log('🚀 ~ file: index.tsx:25 ~ layoutData:', layoutData);
  const defaultCurrency = useRecoilValue(defaultCurrencySelector);

  //get data view
  const detailKeys = [
    keyNames.KEY_NAME_QUOTE_ACCOUNT,
    keyNames.KEY_NAME_QUOTE_CONTACT,
    keyNames.KEY_NAME_QUOTE_BILL_TO,
    keyNames.KEY_NAME_QUOTE_SHIP_TO,
    keyNames.KEY_NAME_QUOTE_DESCRIPTION,
    keyNames.KEY_NAME_QUOTE_CUSTOMER_NOTE,
    keyNames.KEY_NAME_QUOTE_TERM_CONDITION
  ];

  //get fields
  const basicFields: any[] = layoutData?.layout?.data?.[0]?.children || [];
  const moreFields: any[] = layoutData?.layout?.data?.[1]?.children || [];
  //console.log('basicFields', basicFields);
  const detailFields = basicFields.filter((_ele: any) => detailKeys.includes(_ele.keyName));
  const detailMoreFields = moreFields.filter((_ele: any) => detailKeys.includes(_ele.keyName));

  //QuoteItems edit: get items data + summary
  // let curItems: any = [];
  // let totalNetAmount = 0;
  // let totalQty = 0;
  // layoutData.data.items?.map((_ele: any) => {
  //   const newItem = {
  //     id: _ele.id,
  //     type: _ele.type,
  //     item: _ele.productItem,
  //     image: { photo: '', name: '' }, //TODO
  //     unit: _ele.productItem.unit,
  //     attrValues: _ele.productItem.attrValues,
  //     priceUnit: { amount: _ele.price, currency: layoutData.data.currency },
  //     orderedQty: _ele.qty,
  //     orderedAmount: { amount: _ele.amount, currency: layoutData.data.currency }
  //   };
  //   totalNetAmount += _ele.amount;
  //   totalQty += _ele.qty;
  //   curItems.push(newItem);
  // });
  // let curSummary = {
  //   currency: defaultCurrency,
  //   totalItems: totalQty,
  //   netAmount: totalNetAmount,
  //   totalDiscount: layoutData.data.totalDiscount,
  //   totalLoyalty: 0,
  //   loyalty: {
  //     point: 0,
  //     isPointUseMax: true,
  //     coupon: 0,
  //     stamp: 0,
  //     isStampNotUse: true
  //   },
  //   subTotal: layoutData.data.subTotalAmount,
  //   shippingCharge: {
  //     amount: 0,
  //     isApplyTax: false
  //   },
  //   totalShippingCharge: layoutData.data.shipCharge,
  //   totalTax: layoutData.data.taxAmount,
  //   taxUnit: layoutData.data.tax, //%
  //   roundOff: layoutData.data.roundOff,
  //   totalAmount: layoutData.data.totalAmount
  // };
  const { items, summary } = parseProductItemValueInput(layoutData.data, defaultCurrency);

  //hidden fields
  let moreIgnoreFields: string[] = [];

  const bottomFields = [keyNames.KEY_NAME_QUOTE_TERM_CONDITION, keyNames.KEY_NAME_QUOTE_CUSTOMER_NOTE];

  const mUpdate = useQuoteUpdate({});
  const { mCreate, mDelete } = useQuoteFileMutation();

  const handleOnSave = () => {};
  const handleOnClose = () => {};
  const handleAddFile = (newData: any) => {
    if (newData.length > 0) {
      const params = {
        id: menuSourceId,
        [keyNames.KEY_NAME_QUOTE_FILES]: newData.map((v: any) => {
          return {
            type: v.type,
            file: {
              id: v.file?.id,
              name: v.file?.name
            }
          };
        })
      };
      mCreate.mutate(params, {
        onSuccess: () => {
          setTimeout(() => {
            queryClient.refetchQueries([queryKeys.viewQuote, menuSourceId]);
          }, SET_TIMEOUT);
        }
      });
    }
  };

  const handleDeleteFile = (fileIds: string[]) => {
    const params = {
      id: menuSourceId,
      fileIds: fileIds
    };
    mDelete.mutate(params, {
      onSuccess: () => {
        setTimeout(() => {
          queryClient.refetchQueries([queryKeys.viewQuote, menuSourceId]);
        }, SET_TIMEOUT);
      }
    });
  };

  const BottomFieldsMemo = useMemo(() => {
    return (
      <>
        {moreFields.length ? (
          <ViewFields
            fields={[...moreFields.filter((v: any) => bottomFields.includes(v.keyName))]}
            ignoreFields={[]}
            menuSource={menuSource}
            menuSourceId={menuSourceId || ''}
            data={data}
            onSave={handleOnSave}
            onClose={handleOnClose}
            column={1}
          />
        ) : null}
      </>
    );
  }, [moreFields, ignoreFields, menuSource, menuSourceId, data]);

  console.log('fields bottom: ', [...moreFields.filter((v: any) => bottomFields.includes(v.keyName))]);

  return (
    <React.Suspense fallback={<></>}>
      <Stack spacing={1}>
        <Stack direction="row" width="100%" justifyContent="flex-end" spacing={1}>
          <Button variant="outlined" color="primary" size="small">
            Preview
          </Button>
          <Button variant="outlined" color="primary" size="small">
            Edit
          </Button>
          <Button variant="outlined" color="primary" size="small">
            View Site
          </Button>
        </Stack>

        <QuoteItems mode="v" value={{ data: items, summary }} menuSourceId={menuSourceId} />
        {BottomFieldsMemo}
        <DigitalContentTable
          value={data?.[keyNames.KEY_NAME_QUOTE_FILES]}
          onChange={handleAddFile}
          isMulti={false}
          onDelete={handleDeleteFile}
        />
      </Stack>
    </React.Suspense>
  );
};

export default ViewDetail;
