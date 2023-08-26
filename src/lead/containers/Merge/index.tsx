import React, { useEffect, useMemo, useState } from 'react';
//import { useTranslation } from 'react-i18next';

//project
//import useMutationPost from '@base/hooks/useMutationPost';
import LoadingButton from '@base/components/@extended/LoadingButton';
import MiModal from '@base/components/@hanbiro/MiModal';
import MuiRadioGroup from '@base/components/@hanbiro/RadioGroup';
//import { BaseMutationResponse } from '@base/types/response';
//import MainCard from '@base/components/App/MainCard';
//import ScrollX from '@base/components/App/ScrollX';

//menu
import { KEY_NAME_CUSTOMER_CREATED_AT } from '@customer/config/keyNames';
import { CUSTOMER_CATEGORY_ACCOUNT, CUSTOMER_CATEGORY_ENUM } from '@customer/config/constants';
//import { UPDATE_CUSTOMER } from '@customer/services/graphql';
import useCustomerDuplicates from '@customer/hooks/useCustomerDuplicates';
import useCustomersByField from '@customer/hooks/useCustomersByField';
import useCustomerUpdate from '@customer/hooks/useCustomerUpdate';

//material
import { ArrowBack, ArrowForward, SearchOutlined } from '@mui/icons-material';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Step,
  StepLabel,
  Stepper
} from '@mui/material';

//local
import DuplicateTable from './DuplicateTable';
import { getParams } from './Helper';
import MergeTable from './MergeTable';

const MERGE_OPTIONS = [
  { value: 'account', title: 'Account', label: 'Merge Account', icon: 'm_customer_account', iconType: 'icon' },
  { value: 'contact', title: 'Contact', label: 'Merge Contact', icon: 'contacts', iconType: 'icon' }
];

const STEPS = ['Find Duplicates', 'Select the Master'];

interface LeadMergeModalProps {
  category: string;
  customer?: any; //for view case: finding duplicates with viewing customer
  defaultItems?: any[];
  isOpen: boolean;
  onClose: () => void;
  onReload?: () => void;
}

const LeadMergeModal = (props: LeadMergeModalProps) => {
  const {
    isOpen,
    onClose,
    category, //'all', 'account', 'contact'
    customer, //default master
    defaultItems = [],
    onReload
  } = props;
  //const { t, i18n } = useTranslation();

  //state
  const [searchCriteria, setSearchCriteria] = useState<any>(null);
  const [dupFilter, setDupFilter] = useState<any>({
    filter: {
      query: '',
      paging: {
        page: 1,
        size: 100 //all
      }
    }
  });
  const [cusFilter, setCusFilter] = useState<any>({
    filter: {
      query: '',
      paging: {
        page: 1,
        size: 100 //all
      },
      sort: { field: KEY_NAME_CUSTOMER_CREATED_AT, orderBy: 1 } //ASC
    }
  });
  const [isMergeAll, setIsMergeAll] = useState<boolean>(false);
  const [mergeMaster, setMergeMaster] = useState<any>(null);
  const [mergeItems, setMergeItems] = useState<any>([]);
  const [mergeIds, setMergeIds] = useState<any>([]);
  const [dupOptions, setDupOptions] = useState<any>([]);
  const [dupItems, setDupItems] = useState<any>([]);
  const [selectedDup, setSelectedDup] = useState<any>(null);
  const [activeCate, setActiveCate] = useState<any>(category === 'all' ? 'account' : category); //
  const [criteriaOptions, setCriteriaOptions] = useState<any>([]);
  const [formStep, setFormStep] = useState(0);

  //init creiteria option
  useEffect(() => {
    if (activeCate === 'account') {
      let newOptions = [
        { value: 'CRITERIA_NAME', label: 'Account Name' }, //same value to catch erro
        { value: 'CRITERIA_NAME', label: 'Account Email' },
        { value: 'CRITERIA_NAME', label: 'Account Phone' }
      ];
      setCriteriaOptions(newOptions);
    }
    if (activeCate === 'contact') {
      let newOptions = [
        { value: 'CRITERIA_NAME', label: 'Contact Name' },
        { value: 'CRITERIA_EMAIL', label: 'Contact Email' },
        { value: 'CRITERIA_PHONE', label: 'Contact Phone' },
        { value: 'CRITERIA_MOBILE', label: 'Contact Mobile' }
      ];
      setCriteriaOptions(newOptions);
    }
  }, [activeCate]);

  //init array
  useEffect(() => {
    if (defaultItems?.length > 0) {
      if (JSON.stringify(defaultItems) !== JSON.stringify(mergeItems)) {
        //const newItems = items.map((_ele: any) => ({ ..._ele, mergeFields: [] }));
        setMergeItems(defaultItems);
        setMergeMaster(defaultItems[0]);
        //go to merge step
        setFormStep(1);
      }
    }
  }, [defaultItems]);

  //get duplicates
  const { data: duplicatePost, isFetching: isDupFetching } = useCustomerDuplicates(dupFilter);
  //get duplicated accounts/contacts
  const { data: customerPost, isFetching: isCusFetching } = useCustomersByField(cusFilter);
  //update
  const mMerge = useCustomerUpdate();

  //check success
  useEffect(() => {
    //// console.log('<<< completed useEffect >>>', mutationAdd);
    if (mMerge.isSuccess) {
      // refecth data
      setTimeout(() => {
        onReload && onReload();
      }, 1000);
      onClose();
    }
  }, [mMerge.isSuccess]);

  //set duplicate options
  useEffect(() => {
    //console.log('duplicatePost', duplicatePost);
    if (duplicatePost?.data) {
      setDupOptions(duplicatePost.data);
    } else {
      setDupOptions([]);
    }
  }, [duplicatePost]);

  //set duplicate items
  useEffect(() => {
    if (customerPost?.data) {
      setDupItems(customerPost.data);
    } else {
      setDupItems([]);
    }
  }, [customerPost]);

  //duplicate selected change --> reset items
  useEffect(() => {
    if (selectedDup) {
      //set filter for select duplicate items
      const newFilter = { ...cusFilter };
      let query = `category=${CUSTOMER_CATEGORY_ENUM[CUSTOMER_CATEGORY_ACCOUNT]}`;
      switch (searchCriteria.value) {
        case 'CRITERIA_NAME':
          query += ` originName=\"${selectedDup.name}\"`;
          break;
        case 'CRITERIA_EMAIL':
          query += ` email=\"${selectedDup.name}\"`;
          break;
        case 'CRITERIA_PHONE':
          query += ` phone=\"${selectedDup.name}\"`;
          break;
        case 'CRITERIA_MOBILE':
          query += ` mobile=\"${selectedDup.name}\"`;
          break;
      }
      newFilter.filter.query = query;
      setCusFilter(newFilter);

      //set duplicate items in cache
      if (customerPost?.data) {
        setDupItems(customerPost.data);
      }
    }
  }, [selectedDup]);

  //get merge items from merge ids
  useEffect(() => {
    if (defaultItems.length === 0) {
      if (mergeIds.length > 0) {
        const newMergeItems: any[] = [];
        dupItems.map((_ele: any) => {
          if (mergeIds.includes(_ele.id)) {
            newMergeItems.push(_ele);
          }
        });
        setMergeItems(newMergeItems);
        setMergeMaster(newMergeItems[0]);
      } else {
        setMergeItems([]);
      }
    }
  }, [mergeIds]);

  //reset state
  const reset = () => {
    setSelectedDup(null);
    setDupOptions([]);
    setDupItems([]);
    setMergeIds([]);
    setMergeMaster(null);
  };

  //go next
  const handleGoNext = () => {
    setFormStep((cur) => cur + 1);
  };

  //set filter for search
  const handleSearch = () => {
    if (searchCriteria) {
      const newFilter = { ...dupFilter };
      let query = `category=${CUSTOMER_CATEGORY_ENUM[CUSTOMER_CATEGORY_ACCOUNT]}`;
      query += ` criteria="${searchCriteria.value}"`;
      if (customer) {
        const primaryEmail = customer?.emails?.find((_ele: any) => _ele.label.label === 'LABEL_PRIMARY');
        const primaryPhone = customer?.phones?.find((_ele: any) => _ele.label.label === 'LABEL_PRIMARY');
        const primaryMobile = customer?.mobiles?.find((_ele: any) => _ele.label.label === 'LABEL_PRIMARY');
        //merge from a specific customer, find duplicates
        switch (searchCriteria.value) {
          case 'CRITERIA_NAME':
            query += ` originName=\"${customer.name}\"`;
            break;
          case 'CRITERIA_EMAIL':
            query += ` email=\"${primaryEmail?.email || ''}\"`;
            break;
          case 'CRITERIA_PHONE':
            query += ` phone=\"${primaryPhone?.phoneNumber || ''}\"`;
            break;
          case 'CRITERIA_MOBILE':
            query += ` mobile=\"${primaryMobile?.mobile || ''}\"`;
            break;
        }
      }
      newFilter.filter.query = query;
      setDupFilter(newFilter);
    }
  };

  //start merge
  const handleMerge = () => {
    const params: any = getParams(mergeMaster, mergeItems, isMergeAll);
    mMerge.mutate({ customer: params });
  };

  //render steps
  const renderFindStep = () => {
    return (
      <Stack spacing={1.25} sx={{ p: 2, display: formStep + 1 !== 1 ? 'none' : 'block' }}>
        <Stack spacing={2}>
          <MuiRadioGroup
            disabled={customer !== undefined}
            options={MERGE_OPTIONS}
            value={MERGE_OPTIONS.find((_ele: any) => _ele.value === activeCate)}
            onChange={(newValue: any) => {
              setActiveCate(newValue.value);
              setSearchCriteria(null);
              reset();
            }}
          />
        </Stack>
        <Stack spacing={1.25}>
          <InputLabel>Select Criteria</InputLabel>
          <Stack direction={'row'} spacing={1.25}>
            <Select
              fullWidth
              displayEmpty
              inputProps={{ 'aria-label': 'criteria select' }}
              value={searchCriteria?.value || ''}
              onChange={(e: SelectChangeEvent) => {
                const selectedId = e.target.value as string;
                const newOption = criteriaOptions.find((_ele: any) => _ele.value === selectedId) || null;
                setSearchCriteria(newOption);
                reset();
              }}
            >
              <MenuItem value="" disabled>
                <em>Select...</em>
              </MenuItem>
              {criteriaOptions.map((_option: any) => {
                return (
                  <MenuItem key={_option.value} value={_option.value}>
                    {_option.label}
                  </MenuItem>
                );
              })}
            </Select>
            <LoadingButton
              variant="contained"
              color="primary"
              onClick={handleSearch}
              loading={isDupFetching}
              startIcon={<SearchOutlined />}
            >
              Search
            </LoadingButton>
          </Stack>
        </Stack>
        <Stack spacing={1.25}>
          <InputLabel>Duplicates</InputLabel>
          <Select
            fullWidth
            displayEmpty
            inputProps={{ 'aria-label': 'duplicates select' }}
            value={selectedDup?.name || ''}
            onChange={(e: SelectChangeEvent) => {
              const selectedName = e.target.value as string;
              const newOption = dupOptions.find((_ele: any) => _ele.name === selectedName) || null;
              setSelectedDup(newOption);
            }}
          >
            <MenuItem value="" disabled>
              <em>Select...</em>
            </MenuItem>
            {dupOptions.map((_option: any) => {
              return (
                <MenuItem key={_option.name} value={_option.name}>
                  {`${_option.name} (${_option.count})`}
                </MenuItem>
              );
            })}
          </Select>
        </Stack>
        <Stack spacing={1.25}>
          <InputLabel>Select the duplicates to merge</InputLabel>
          <DuplicateTable
            category={activeCate}
            isLoading={isCusFetching}
            items={dupItems}
            selectedIds={mergeIds}
            setSelectedIds={setMergeIds}
          />
        </Stack>
      </Stack>
    );
  };

  //merge step
  const renderMasterStep = () => {
    return (
      <Stack spacing={1.25} sx={{ p: 2 }}>
        <InputLabel>Select Master {activeCate === 'account' ? 'Account' : 'Contact'}</InputLabel>
        <FormGroup aria-label="position" row>
          <FormControlLabel
            value="mergeAll"
            control={<Checkbox color="secondary" checked={isMergeAll} onChange={() => setIsMergeAll(!isMergeAll)} />}
            label="Merge all of following"
            labelPlacement="end"
          />
        </FormGroup>
        <MergeTable
          category={activeCate}
          isMergeAll={isMergeAll}
          value={mergeItems}
          master={mergeMaster}
          onMasterChange={(item: any) => setMergeMaster(item)}
          onChange={(items: any) => setMergeItems(items)}
        />
      </Stack>
    );
  };

  //step tabs
  const renderFormSteps = () => {
    return (
      <Grid container>
        <Grid item xs={2} lg={2}></Grid>
        <Grid item xs={8} lg={8}>
          <Stepper activeStep={formStep} sx={{ mt: 2 }}>
            {STEPS.map((label, index) => {
              const stepProps: { completed?: boolean } = {};
              const labelProps: {
                optional?: React.ReactNode;
              } = {};
              // if (isStepOptional(index)) {
              //   labelProps.optional = <Typography variant="caption">Optional</Typography>;
              // }
              // if (isStepSkipped(index)) {
              //   stepProps.completed = false;
              // }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </Grid>
        <Grid item xs={2} lg={2}></Grid>
      </Grid>
    );
  };

  //render footer
  const Footer = useMemo(() => {
    return (
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Button size="small" color="secondary" variant="outlined" onClick={onClose}>
            Skip
          </Button>
        </Grid>
        <Grid item>
          <Stack direction="row" spacing={2} alignItems="center">
            {formStep + 1 > 1 && defaultItems.length === 0 && (
              <Button
                size="small"
                variant="contained"
                color="warning"
                startIcon={<ArrowBack />}
                onClick={() => setFormStep((cur) => cur - 1)}
              >
                Previous
              </Button>
            )}
            {formStep + 1 < 2 && (
              <Button
                size="small"
                variant="contained"
                color="warning"
                disabled={mergeIds.length < 2}
                endIcon={<ArrowForward />}
                onClick={handleGoNext}
              >
                Next
              </Button>
            )}
            {formStep + 1 === 2 && (
              <LoadingButton
                variant="contained"
                color="success"
                onClick={handleMerge}
                loading={mMerge.isLoading}
                disabled={mMerge.isLoading || mergeItems.length <= 1}
              >
                Merge
              </LoadingButton>
            )}
          </Stack>
        </Grid>
      </Grid>
    );
  }, [mMerge.isLoading, formStep, mergeItems]);

  // console.log('mergeIds', mergeIds);
  // console.log('mergeItems', mergeItems);
  // console.log('formStep', formStep);

  return (
    <MiModal title={'Merge Lead'} isOpen={isOpen} size="sm" fullScreen={false} onClose={onClose} footer={Footer}>
      <Box sx={{ border: 'none', maxHeight: 'calc(100vh - 310px)', overflowY: 'auto' }}>
        {defaultItems.length === 0 && renderFormSteps()}
        {formStep + 1 >= 1 && defaultItems.length === 0 && renderFindStep()}
        {formStep + 1 === 2 && renderMasterStep()}
      </Box>
    </MiModal>
  );
};

export default LeadMergeModal;
