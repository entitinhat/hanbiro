import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { Add } from '@mui/icons-material';
import { Box, Button, Divider, Grid, Stack, Typography, useTheme } from '@mui/material';

//menu
import { useOpportunityAnalysisDevelops } from '@opportunity/hooks/useOpportunityAnalysisDevelops';
import useOpportunityAnalysisDevelopsMutation from '@opportunity/hooks/useOpportunityAnalysisDevelopsMutation';
import { useOpportunityProductDevelops } from '@opportunity/hooks/useOpportunityProductDevelops';
import useOpportunityProductDevelopsMutation from '@opportunity/hooks/useOpportunityProductDevelopsMutation';
import AnalysisItem from './AnalysisItem';
import ProductItems from './ProductItems';
import NoData from '@base/components/@hanbiro/NoData';

interface DevelopProps {
  menuSource: string;
  menuSourceId: string;
}

export enum modeType {
  MODE_ADD = 'MODE_ADD', // default mode show add button
  MODE_CREATE = 'MODE_CREATE' // mopde when creating new item
}

const Develope = (props: DevelopProps) => {
  const { menuSource, menuSourceId } = props;
  // const [showAddButton, setShowAddButton] = useState<boolean>(true);
  const [productItems, setProductItems] = useState<any[]>([]);
  const [productMode, setProductMode] = useState<modeType>(modeType.MODE_ADD);
  const theme = useTheme();

  // ==================== Handle Product get Data ==================
  const { data: productData } = useOpportunityProductDevelops(menuSourceId);
  const { mCreate, mUpdate, mDelete } = useOpportunityProductDevelopsMutation();

  useEffect(() => {
    if (productData?.results && productData?.results?.length > 0) {
      if (!_.isEqual(productData?.results, productItems)) {
        setProductItems(productData?.results);
      }
    } else {
      setProductItems([]);
    }
  }, [productData]);

  const handleAddProduct = () => {
    setProductMode(modeType.MODE_CREATE);
    const newItem = {
      product: undefined,
      customerNeedAnalysis: '',
      valueProposition: '',
      objections: '',
      isAddItem: true
    };
    setProductItems([newItem, ...productItems]);
  };

  const handleOnNewProductChange = (nVal: any, rowIndex: number) => {
    const newItems = [...productItems];
    newItems[rowIndex] = nVal;
    setProductItems(newItems);
  };

  const handleCreateProduct = () => {
    const itemAdd = productItems[0];

    if (itemAdd?.isAddItem) {
      const params = {
        id: menuSourceId,
        productDevelop: {
          product: {
            id: itemAdd?.product?.id,
            name: itemAdd?.product?.name
          },
          customerNeedAnalysis: itemAdd?.customerNeedAnalysis,
          valueProposition: itemAdd?.valueProposition,
          objections: itemAdd?.objections
        }
      };

      mCreate.mutate(params);
    }
    setProductMode(modeType.MODE_ADD);
  };

  const handleProductCancel = () => {
    if (productItems?.[0]?.isAddItem) {
      const newItem = [...productItems];
      newItem.splice(0, 1);
      setProductItems(newItem);
    }
    setProductMode(modeType.MODE_ADD);
  };

  const handeUpdateProduct = (value: any, i: number) => {
    const params = {
      id: menuSourceId,
      productDevelop: {
        id: value?.id,
        customerNeedAnalysis: value?.customerNeedAnalysis,
        valueProposition: value?.valueProposition,
        objections: value?.objections
      }
    };

    mUpdate.mutate(params);
  };

  const handeDeleteProduct = (id: string) => {
    const params = {
      id: menuSourceId,
      productDevelopIds: [id]
    };

    mDelete.mutate(params);
  };

  // ---------------

  const onCancel = (rowIndex: number) => {
    setProductMode(modeType.MODE_ADD);
    const newItems = [...productItems];
    newItems[rowIndex] = productData?.results?.[rowIndex];
    setProductItems(newItems);
  };

  // ==================== Handle Perception Analysis ==================

  const [analysisItems, setAnalysisItems] = useState<any[]>([]);

  const { data: analysisData } = useOpportunityAnalysisDevelops(menuSourceId);
  const { mCreate: mAnalysisCreate, mDelete: mAnalysisDelete } = useOpportunityAnalysisDevelopsMutation();
  const [analysisMode, setAnalysisMode] = useState<modeType>(modeType.MODE_ADD);

  useEffect(() => {
    if (analysisData?.results && analysisData?.results?.length > 0) {
      if (!_.isEqual(analysisData?.results, analysisItems)) {
        setAnalysisItems(analysisData?.results);
      }
    } else {
      setAnalysisItems([]);
    }
  }, [analysisData]);

  const handleAddAnalysis = () => {
    setAnalysisMode(modeType.MODE_CREATE);
    const newItem = {
      type: undefined,
      reviewer: undefined,
      valueProposition: '',
      content: '',
      isAddItem: true
    };
    setAnalysisItems([newItem, ...analysisItems]);
  };

  const handleOnNewAnalysisChange = (nVal: any, rowIndex: number) => {
    const newItems = [...analysisItems];
    newItems[rowIndex] = nVal;
    setAnalysisItems(newItems);
  };

  const handleCreateAnalysis = () => {
    const itemAdd = analysisItems[0];

    const params = {
      id: menuSourceId,
      perceptionAnalysis: {
        type: itemAdd?.type,
        reviewer: {
          id: itemAdd?.reviewer?.id,
          name: itemAdd?.reviewer?.name
        }
      }
    };

    mAnalysisCreate.mutate(params);
    setAnalysisMode(modeType.MODE_ADD);
  };

  const handleAnalysisCancel = () => {
    if (analysisItems?.[0]?.isAddItem) {
      const newItem = [...analysisItems];
      newItem.splice(0, 1);
      setAnalysisItems(newItem);
    }
    setAnalysisMode(modeType.MODE_ADD);
  };

  const handeDeleteAnalysis = (id: string) => {
    const params = {
      id: menuSourceId,
      perceptionAnalysisIds: [id]
    };

    mAnalysisDelete.mutate(params);
  };

  return (
    <Box>
      {/* =========== Product ============ */}
      <Stack direction={'row'} justifyContent="space-between" alignItems={'center'} mb={1}>
        <Typography fontWeight={500}>Product</Typography>
        {productMode === modeType.MODE_ADD && (
          <Button variant="contained" startIcon={<Add />} size="small" onClick={handleAddProduct}>
            Add
          </Button>
        )}
        {productMode === modeType.MODE_CREATE && (
          <Stack direction={'row'} spacing={1}>
            <Button variant="outlined" color="secondary" size="small" onClick={handleProductCancel}>
              Cancel
            </Button>
            <Button variant="contained" size="small" onClick={handleCreateProduct} disabled={!productItems?.[0]?.product}>
              Save
            </Button>
          </Stack>
        )}
      </Stack>
      <Divider sx={{ marginLeft: -2, marginRight: -2 }} />

      {productItems?.length > 0 ? (
        productItems.map((v: any, i: number) => {
          return (
            <Box key={i}>
              <ProductItems
                value={v}
                onChange={(nVal) => handleOnNewProductChange(nVal, i)}
                disabled={productMode === modeType.MODE_CREATE && i !== 0}
                mode={productMode}
                setMode={(mode: modeType) => setProductMode(mode)}
                onDelete={handeDeleteProduct}
                onCancel={() => onCancel(i)}
                onSave={(nValue: any) => handeUpdateProduct(nValue, i)}
              />
            </Box>
          );
        })
      ) : (
        <NoData />
      )}
      {/* ============= Analysis ========= */}
      <Stack direction={'row'} justifyContent="space-between" alignItems={'center'} mt={2} mb={1}>
        <Typography fontWeight={500}>Perception Analysis</Typography>
        {analysisMode === modeType.MODE_ADD && (
          <Button variant="contained" startIcon={<Add />} size="small" onClick={handleAddAnalysis}>
            Add
          </Button>
        )}
        {analysisMode === modeType.MODE_CREATE && (
          <Stack direction={'row'} spacing={1}>
            <Button variant="outlined" color="secondary" size="small" onClick={handleAnalysisCancel}>
              Cancel
            </Button>
            <Button variant="contained" size="small" onClick={handleCreateAnalysis}>
              Save
            </Button>
          </Stack>
        )}
      </Stack>
      <Divider sx={{ marginLeft: -2, marginRight: -2 }} />
      <Stack spacing={2} mt={2}>
        {analysisItems?.length > 0 ? (
          analysisItems.map((v: any, i: number) => (
            <Box key={i}>
              <AnalysisItem value={v} onChange={(nVal: any) => handleOnNewAnalysisChange(nVal, i)} onDelete={handeDeleteAnalysis} />
              {i !== analysisItems?.length - 1 && <Divider sx={{ marginLeft: -2, marginRight: -2, marginTop: 2 }} />}
            </Box>
          ))
        ) : (
          <NoData />
        )}
      </Stack>
    </Box>
  );
};

export default Develope;
