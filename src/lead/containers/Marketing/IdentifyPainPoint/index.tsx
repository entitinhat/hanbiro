import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Box, Button, Checkbox,  Stack, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import SpanLang from '@base/components/@hanbiro/SpanLang';
import MainCard from '@base/components/App/MainCard';
import { MENU_SALES } from '@base/config/menus';
import { IdName } from '@base/types/common';
import { WRITE_TYPE_PAIN_POINT } from '@settings/preferences/config/lead/constants';
import { useMenuSetting } from '@settings/general/hooks/useMenuSetting';

import { useLeadMutation } from '@lead/hooks/useLeadMutation';
import * as keyNames from '@lead/config/keyNames';

import WritePage from './Write';

interface IdentifyPainPointProps {
  menuSourceId: string;
  value: any;
}
const IdentifyPainPoint = (props: IdentifyPainPointProps) => {
  const { menuSourceId, value } = props;
  const [isOpenWrite, setIsOpenWrite] = useState<boolean>(false);
  const [data, setData] = useState<any[]>(value || []);
  const [identifyList, setIdentifyList] = useState<any[]>();
  const { t } = useTranslation();
  const { mUpdateLead } = useLeadMutation();

  const { data: postData, refetch, isFetching } = useMenuSetting({ key: WRITE_TYPE_PAIN_POINT, menu: MENU_SALES });
  useEffect(() => {
    if(postData && postData?.value.length > 0){
      setIdentifyList(JSON.parse(postData?.value))
    }
  },[postData])

  const handleOnChecked = (event: React.ChangeEvent<HTMLInputElement>, item: any) => {
    let nData = [...data]
    if(event.target.checked){
      nData.push(item)
      setData(nData)
    }else {
      nData.splice(data.findIndex((_item: any) => _item.id == item.id), 1)
      setData(nData)
    }

    mUpdateLead.mutate({ 
      lead: { 
        [keyNames.KEY_LEAD_PAIN_POINT]: nData.length > 0 ? nData : null ,
        id: menuSourceId
    }});
  }

  const IndentifyList = useMemo(() => {
    return <Stack direction="column" spacing={0} sx={{ width: '60%', p: 1, pl: 2 }}>
          {identifyList?.map((item: any, indx: number) => {
            return <Stack key={indx} direction="row" spacing={1} alignItems="center">
                    <Checkbox checked={data?.findIndex((_ele: any) => _ele?.id == item?.id) != -1 } onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleOnChecked(event, item)}  />
                    <Typography>{item?.name}</Typography>
                  </Stack>
            })
          }
        </Stack>
  },[identifyList, data])

  return (
    <MainCard
      contentSX={{ p: 0, pb: '0px !important' }}
      border={false}
      headerSX={{ p: '8px 16px', height: '50px' }}
      title={<SpanLang keyLang={'ncrm_common_identify_pain_point'} textOnly />}
      secondary={
        <Box sx={{ ml: 'auto', mr: 0.5 }}>
          <Stack direction="row" spacing={1}>
            <Button
              variant="contained"
              size={'small'}
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => {
                setIsOpenWrite(true);
              }}
            >
              <SpanLang keyLang={'ncrm_common_btn_add'} textOnly />
            </Button>
          </Stack>
        </Box>
      }
    >
      {IndentifyList}
      {isOpenWrite && (
        <WritePage
          id={menuSourceId}
          listIndentify={identifyList}
          value={data}
          isOpen={isOpenWrite}
          onClose={(formData: { value: IdName; isActive: boolean }) => {
            if (formData.isActive) {
              setData([...data, formData?.value]);
            }
            setIdentifyList((prev: any) => prev.concat(formData?.value))
            setIsOpenWrite(false);
          }}
        />
      )}
    </MainCard>
  );
};
export default IdentifyPainPoint;
