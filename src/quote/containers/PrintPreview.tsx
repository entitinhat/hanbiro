import React, { useMemo, useRef, useState } from 'react';

//third-party
import ReactToPrint from 'react-to-print';
import _ from 'lodash';

//material
import { FormControl, Checkbox, FormControlLabel, FormGroup, Button, Stack, Grid } from '@mui/material';

//project
import Timeline from '@base/containers/TimeLine';
import Notes from '@base/containers/Notes';
import MainCard from '@base/components/App/MainCard';
import MiModal from '@base/components/@hanbiro/MiModal';
import ViewFields from '@base/components/@hanbiro/ViewPage/ViewFields';
import { PageLayoutData } from '@base/types/pagelayout';

//menu
import * as keyNames from '@quote/config/keyNames';
import OrderItems from '@base/containers/OrderItems';

interface PrintPreviewProps {
  layoutData: PageLayoutData;
  isOpen: boolean;
  onClose?: () => void;
}

const PRINT_OPTIONS = [
  { label: 'Summary', value: 'summary' },
  { label: 'Details', value: 'detail' },
  { label: 'Product Details', value: 'product' },
  { label: 'Timeline', value: 'timeline' },
  { label: 'Notes', value: 'note' }
];

const PrintPreview = (props: PrintPreviewProps) => {
  const { layoutData, isOpen, onClose } = props;
  const printRef = useRef<any>(null);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(['summary', 'detail']);
  //console.log('print data', data);
  const basicFields = layoutData?.layout?.data?.[0]?.children || [];
  const detailFields = layoutData?.layout?.data?.[1]?.children || [];
  const { menuSource, menuSourceId } = layoutData;

  //option change
  const handleOptionChange = (option: any) => {
    const newOptions = _.cloneDeep(selectedOptions);
    const iOption = newOptions.indexOf(option);
    if (iOption > -1) {
      const iOption = newOptions.indexOf(option);
      newOptions.splice(iOption, 1);
    } else {
      newOptions.push(option);
    }
    setSelectedOptions(newOptions);
  };

  //print options
  const renderPrintOptions = () => {
    return (
      <MainCard title="Print Options" sx={{ mb: 2 }}>
        <FormControl>
          <FormGroup row aria-label="position">
            {PRINT_OPTIONS.map((item, idx) => {
              return (
                <FormControlLabel
                  key={idx}
                  value={item.value}
                  control={<Checkbox sx={{ '& .icon.MuiBox-root': { borderRadius: '.25rem' } }} />}
                  label={item.label}
                  checked={selectedOptions.includes(item.value)}
                  onChange={() => handleOptionChange(item.value)}
                />
              );
            })}
          </FormGroup>
        </FormControl>
      </MainCard>
    );
  };

  //summary
  const renderSummary = () => {
    const onlyViewBasicFields = basicFields.map((_ele: any) => ({ ..._ele, userPermission: { ..._ele.userPermission, isEdit: false } }));
    //hide fields
    const hiddenFields: string[] = [
      keyNames.KEY_NAME_QUOTE_STATUS,
      keyNames.KEY_NAME_QUOTE_SUBJECT,
      keyNames.KEY_NAME_QUOTE_SALES_REP,
      keyNames.KEY_NAME_QUOTE_ACCOUNT,
      keyNames.KEY_NAME_QUOTE_CONTACT,
      keyNames.KEY_NAME_QUOTE_DESCRIPTION,
      keyNames.KEY_NAME_QUOTE_BILL_TO,
      keyNames.KEY_NAME_QUOTE_SHIP_TO,
      keyNames.KEY_NAME_QUOTE_ITEMS
    ];

    return (
      <MainCard title="Summary">
        <ViewFields fields={onlyViewBasicFields} ignoreFields={hiddenFields} column={2} />
      </MainCard>
    );
  };

  //details
  const renderDetail = () => {
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
    const moreFields1 = basicFields
      .filter((_ele: any) => detailKeys.includes(_ele.keyName))
      .map((_ele: any) => ({ ..._ele, userPermission: { ..._ele.userPermission, isEdit: false } }));
    const moreFields2 = detailFields
      .filter((_ele: any) => detailKeys.includes(_ele.keyName))
      .map((_ele: any) => ({ ..._ele, userPermission: { ..._ele.userPermission, isEdit: false } }));

    return (
      <MainCard title="Detail">
        <ViewFields fields={[...moreFields1, ...moreFields2]} ignoreFields={[]} column={2} />
      </MainCard>
    );
  };

  //timeline
  const renderProductDetail = () => {
    //build items prop
    let productDetail = layoutData.data?.onetime;
    let productItems: any[] = [];
    if (productDetail) {
      productDetail?.items?.map((_item: any) => {
        const newItem = {
          ..._item.productItem,
          quoteItemId: _item.id,
          prod: _item.product,
          currency: productDetail.currency,
          orderedAmount: _item.itemAmount,
          orderedQty: _item.itemQty,
          orderedPrice: _item.itemPrice
        };
        productItems.push(newItem);
      });
    }

    return (
      <MainCard title="Product Details">
        <OrderItems value={productItems} mode="p" menuSource={menuSource} menuSourceId={menuSourceId as string} />
      </MainCard>
    );
  };

  //timeline
  const renderTimeline = () => {
    return (
      <MainCard title="Timeline">
        <Timeline menuSource={menuSource} menuSourceId={menuSourceId as string} />
      </MainCard>
    );
  };

  //ticket
  const renderNotes = () => {
    return (
      <MainCard title="Notes">
        <Notes menuSource={menuSource} menuSourceId={menuSourceId as string} />
      </MainCard>
    );
  };

  // content
  const BodyRender = useMemo(() => {
    const isShowSummary = selectedOptions.includes('summary');
    const isShowDetail = selectedOptions.includes('detail');
    const isShowProduct = selectedOptions.includes('product');
    const isShowTimeline = selectedOptions.includes('timeline');
    const isShowNote = selectedOptions.includes('note');

    return (
      <MainCard content border={false}>
        {renderPrintOptions()}
        <MainCard title="Content Preview" contentSX={{ padding: '0px' }}>
          <Stack spacing={2} ref={printRef} sx={{ m: 2 }}>
            {isShowSummary && renderSummary()}
            {isShowDetail && renderDetail()}
            {isShowProduct && renderProductDetail()}
            {isShowTimeline && renderTimeline()}
            {isShowNote && renderNotes()}
          </Stack>
        </MainCard>
      </MainCard>
    );
  }, [layoutData, selectedOptions]);

  // render footer
  const FooterRender = useMemo(() => {
    return (
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item></Grid>
        <Grid item>
          <Stack direction="row" spacing={2} alignItems="center">
            <Button size="small" color="secondary" variant="outlined" onClick={onClose}>
              Close
            </Button>
            <ReactToPrint
              trigger={() => (
                <Button size="small" variant="contained" color="primary">
                  Print
                </Button>
              )}
              content={() => printRef.current}
              //onBeforeGetContent={() => setIsLoading(true)}
              //onBeforePrint={() => setIsLoading(false)}
              bodyClass="pd-t-30"
            />
          </Stack>
        </Grid>
      </Grid>
    );
  }, []);

  return (
    <MiModal
      title={'Print Preview'}
      isOpen={isOpen}
      size="md"
      fullScreen={false}
      onClose={() => onClose && onClose()}
      footer={FooterRender}
    >
      {BodyRender}
    </MiModal>
  );
};

export default PrintPreview;
