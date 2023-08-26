import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

//material
import { Box, Button, Grid, Stack, Typography } from '@mui/material';

//project
import LoadingButton from '@base/components/@extended/LoadingButton';
import MiModal from '@base/components/@hanbiro/MiModal';

//menu
import { Customer } from '@customer/types/interface';
import { useCampaignTargetMemberCreate } from '@campaign/hooks/useCampaignTargetMember';
import { CUSTOMER_CATEGORY_MARKETING_LIST, MARKETING_CUSTOMER_SOURCE_ENUM } from '@customer/config/constants';
import CustomerTable from './CustomerTable';
import { useMemberCreate } from '@marketing-list/hooks/useMemberCreate';

interface CustomerModalProps {
  campaignId?: string;
  isOpen: boolean;
  onClose: () => void;
  onChange?: (selected: Customer[]) => void;
  onReload?: () => void;
  isMarketingModal?: boolean;
}

const CustomerModal = (props: CustomerModalProps) => {
  const { campaignId = '', isOpen, onClose, onChange, onReload, isMarketingModal = false } = props;
  const { t } = useTranslation();

  //state
  const [selectedItems, setSelectedItems] = useState<Customer[]>([]);
  const [selectedSource, setSelectedSource] = useState<string>('');
  const [selectedMarketingList, setSelectedMarketingList] = useState<any>(null);
  const mTargetCreate = useCampaignTargetMemberCreate();
  const mMembersCreate = useMemberCreate();

  //save success
  useEffect(() => {
    if (mTargetCreate) {
      setSelectedItems([]);
      onClose();
      setTimeout(() => {
        onReload && onReload();
      }, 1000);
    }
  }, [mTargetCreate.isSuccess]);

  //save or just select
  const handleSave = () => {
    if (campaignId) {
      //mutation save as target member
      if (isMarketingModal) {
        const accountField = selectedItems
          .filter((v: any) => v.category === 'CATEGORY_ACCOUNT')
          .map((v: any) => ({ customer: { id: v.id, name: v.name } }));
        const contactField = selectedItems
          .filter((v: any) => v.category === 'CATEGORY_CONTACT')
          .map((v: any) => ({ customer: { id: v.id, name: v.name } }));
        const accountParams = {
          id: campaignId,
          source: 'MARKETING_MEMBER_SOURCE_ACCOUNT',
          members: accountField
        };
        const contactParams = {
          id: campaignId,
          source: 'MARKETING_MEMBER_SOURCE_CONTACT',
          members: contactField
        };
        if (accountField.length > 0) {
          mMembersCreate.mutate(accountParams, {
            onSuccess: () => {
              setSelectedItems([]);
              onClose();
              setTimeout(() => {
                onReload && onReload();
              }, 1000);
            }
          });
        }
        if (contactField.length > 0) {
          mMembersCreate.mutate(contactParams, {
            onSuccess: () => {
              setSelectedItems([]);
              onClose();
              setTimeout(() => {
                onReload && onReload();
              }, 1000);
            }
          });
        }
      } else {
        const params: any = {
          id: campaignId,
          members: selectedItems.map((_item) => ({
            customer: {
              id: _item.id,
              name: _item.name
            }
          })),
          source: MARKETING_CUSTOMER_SOURCE_ENUM[selectedSource]
        };
        if (selectedSource === CUSTOMER_CATEGORY_MARKETING_LIST) {
          params.marketingList = {
            id: selectedMarketingList.id,
            name: selectedMarketingList.name
          };
        }
        mTargetCreate.mutate(params);
      }
    } else {
      //working as select box
      onChange && onChange(selectedItems);
      //setSelectedItems([]);
      onClose();
    }
  };

  //render footer
  const Footer = useMemo(() => {
    return (
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography>{selectedItems.length} selected</Typography>
        </Grid>
        <Grid item>
          <Stack direction="row" spacing={2} alignItems="center">
            <Button size="small" color="secondary" variant="outlined" onClick={onClose}>
              Cancel
            </Button>
            <LoadingButton variant="contained" color="success" loading={mTargetCreate.isLoading} onClick={handleSave}>
              Save
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    );
  }, [selectedItems, mTargetCreate]);

  return (
    <MiModal title={t('Add members') as string} isOpen={isOpen} size="md" fullScreen={false} onClose={onClose} footer={Footer}>
      <Box sx={{ height: 800, border: 'none' }}>
        {isOpen && (
          <CustomerTable
            defaultSelectedIds={selectedItems.map((_ele) => _ele.id)}
            onChange={({ customers, category, marketingList }) => {
              setSelectedItems(customers);
              setSelectedSource(category);
              setSelectedMarketingList(marketingList);
            }}
            isMarketingModal={isMarketingModal}
          />
        )}
      </Box>
    </MiModal>
  );
};

export default CustomerModal;
