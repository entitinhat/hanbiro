import IconAvatar from '@base/components/@hanbiro/IconAvatar';
import MiModal from '@base/components/@hanbiro/MiModal';
import { STORAGE_BUCKET } from '@base/config/graphql';
import { HandshakeOutlined } from '@mui/icons-material';
import { Button, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack } from '@mui/material';
import { useCtaAll } from '@settings/digital/cta/hooks/useCtas';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface CTAListProps {
  isOpen: boolean;
  onClose: () => void;
  onChange?: (value: any) => void;
}

const selectList = {
  '&.Mui-selected': {
    bgcolor: 'transparent',
    color: 'primary.main',
    '& .MuiListItemIcon-root': { color: 'primary.main' }
  }
};

const CTAList = (props: CTAListProps) => {
  const { isOpen, onClose, onChange } = props;
  const { t } = useTranslation();
  const [selectedCta, setSelectedCta] = useState<any>(null);

  //get all
  const { results: postData, status } = useCtaAll({
    filter: {
      paging: {
        size: 99,
        page: 1
      }
      //query: 'groupBy=' + groupBy
    }
  });
  //console.log('postData', postData);

  //select item
  const handleSelect = (selected: any) => {
    setSelectedCta(selected);
    //callback
    onChange && onChange(selected);
    onClose();
  };

  //item list
  const renderItems = () => {
    return (
      <List sx={{}}>
        {postData?.data.map((_item: any, index: number) => (
          <ListItem disablePadding divider key={index}>
            <ListItemButton selected={_item.id === selectedCta?.id} onClick={() => handleSelect(_item)} sx={selectList}>
              <Stack direction={'row'} spacing={1}>
                <ListItemIcon>
                  <IconAvatar id={''} url={STORAGE_BUCKET} alt={_item.name} />
                </ListItemIcon>
                <ListItemText primary={_item.name} secondary={_item.linkUrl} />
              </Stack>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    );
  };

  // render footer
  const FooterRender = useMemo(() => {
    return (
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item></Grid>
        <Grid item>
          <Stack direction="row" spacing={2} alignItems="center">
            <Button size="small" color="secondary" variant="outlined" onClick={onClose}>
              {t('Close')}
            </Button>
            {/* <Button color="error" onClick={onClose}>
              {t('')}
            </Button> */}
          </Stack>
        </Grid>
      </Grid>
    );
  }, []);

  return (
    <MiModal
      title={'CTA List'}
      isOpen={isOpen}
      size="sm"
      fullScreen={false}
      onClose={() => {
        onClose && onClose();
      }}
      footer={FooterRender}
    >
      {isOpen && renderItems()}
    </MiModal>
  );
};

export default CTAList;
