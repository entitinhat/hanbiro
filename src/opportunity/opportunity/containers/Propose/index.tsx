import { useEffect, useState } from 'react';

//third-party
import { AddOutlined } from '@mui/icons-material';
import { Button, Divider, Stack, TextField, Typography } from '@mui/material';

//project base
import MainCard from '@base/components/App/MainCard';
import { MENU_SALES_QUOTE } from '@base/config/menus';

//quote menu
import WritePage from '@quote/pages/WritePage';
import DigitalContentTable from '@quote/containers/DigitalContentTable';

//menu
import { useOpportunityFileCreate, useOpportunityFileDelete, useOpportunityFiles } from '@opportunity/hooks/useOpportunityFile';
import { useOpportunityQuoteRevisions } from '@opportunity/hooks/useOpportunityQuote';
import { QUOTE_CATEGORY_ORIGINAL, QUOTE_CATEGORY_REVISION } from '@quote/config/constants';

//local
import Quotes from './Quotes';

interface ProposalProps {
  menuSourceId: string;
  menuSourceName?: string;
}

const Proposal = (props: ProposalProps) => {
  const { menuSourceId, menuSourceName } = props;
  //const [quoteItems, setQuoteItems] = useState<Quote[]>([]);
  const [fileItems, setFileItems] = useState<any>([]);
  const [tmpFiles, setTmpFiles] = useState<any>([]);
  const [isOpenWriteQuote, setIsOpenWriteQuote] = useState(false);

  //get list
  const { data: quoteData, refetch: quoteRefetch } = useOpportunityQuoteRevisions(menuSourceId);
  const { data: fileData, refetch: fileRefetch } = useOpportunityFiles(menuSourceId);
  const mFileCreate = useOpportunityFileCreate(menuSourceId);
  const mFileDelete = useOpportunityFileDelete(menuSourceId);
  //console.log('fileItems', fileItems);
  //console.log('quoteData', quoteData);

  //init file data
  useEffect(() => {
    if (fileData?.data) {
      setFileItems(fileData.data);
    } else {
      setFileItems([]);
    }
  }, [fileData]);

  //save file success
  useEffect(() => {
    if (mFileCreate.isSuccess) {
      setFileItems(tmpFiles);
      setTmpFiles([]);
    }
  }, [mFileCreate.isSuccess]);

  //TODO:
  const handleApprovalSumit = () => {
    // if (fileItems.length > 0) {
    //   const params = {
    //     id: menuSourceId,
    //     files: fileItems.map((_ele: any) => ({
    //       type: _ele.type,
    //       file: { id: _ele.file.id, name: _ele.file.name }
    //     }))
    //   };
    //   mFileCreate.mutate(params);
    // }
  };

  //delete a file
  const handleDeleteFile = (fileIds: string[]) => {
    const params = {
      id: menuSourceId,
      fileIds
    };
    mFileDelete.mutate(params);
  };

  //save then set state
  const handleFileChange = (newFiles: any) => {
    //(newVal: any) => setFileItems(newVal)
    if (newFiles.length > 0) {
      setTmpFiles(newFiles);
      //save first to db
      const params = {
        id: menuSourceId,
        files: newFiles.map((_ele: any) => ({
          type: _ele.type,
          file: { id: _ele.file.id, name: _ele.file.name }
        }))
      };
      mFileCreate.mutate(params);
    }
  };

  //get original quote
  const originalQuote = quoteData?.data && quoteData?.data.length > 0 ? quoteData.data[0].quote : null;
  //console.log('originalQuote', originalQuote);

  return (
    <MainCard
      title={
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
          <Typography variant="subtitle1">Proposal</Typography>
          {Number(quoteData?.data?.length) > 0 && (
            <Button variant="contained" size="small" color="primary" startIcon={<AddOutlined />} onClick={() => setIsOpenWriteQuote(true)}>
              Revise
            </Button>
          )}
        </Stack>
      }
      sx={{
        height: 1,
        '& .MuiCardContent-root': { p: 0 }
      }}
    >
      <Stack>
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} sx={{ p: 1.5 }}>
          <Typography>Quote</Typography>
          {(!quoteData?.data || Number(quoteData?.data?.length) === 0) && (
            <Button variant="contained" size="small" color="primary" startIcon={<AddOutlined />} onClick={() => setIsOpenWriteQuote(true)}>
              Add
            </Button>
          )}
          {Number(quoteData?.data?.length) > 0 && (
            <Stack direction="row" spacing={0.5}>
              <Button variant="outlined" size="small" color="secondary">
                Send
              </Button>
              <Button variant="outlined" size="small" color="secondary">
                Preview
              </Button>
              <Button variant="outlined" size="small" color="secondary">
                View Site
              </Button>
            </Stack>
          )}
        </Stack>
        <Quotes data={quoteData?.data || []} menuSourceId={menuSourceId} onReload={quoteRefetch} />
        {isOpenWriteQuote && (
          <WritePage
            fullScreen={false}
            isOpen={isOpenWriteQuote}
            onClose={() => setIsOpenWriteQuote(false)}
            menuApi={MENU_SALES_QUOTE}
            category={Number(quoteData?.data?.length) > 0 ? QUOTE_CATEGORY_REVISION : QUOTE_CATEGORY_ORIGINAL}
            quoteId={originalQuote?.id}
            opportunity={{ id: menuSourceId, title: menuSourceName }}
            onReload={quoteRefetch}
          />
        )}
      </Stack>
      <Stack>
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} sx={{ p: 1.5 }}>
          <Typography>Files Proposed</Typography>
          <Button variant="outlined" size="small" color="primary">
            View Site
          </Button>
        </Stack>
        <DigitalContentTable isMulti={true} value={fileItems} onChange={handleFileChange} onDelete={handleDeleteFile} />
        <Stack direction={'row'} justifyContent={'end'} sx={{ p: 1 }}>
          <Button variant="outlined" size="small" color="primary" onClick={handleApprovalSumit}>
            Submit for Approval
          </Button>
        </Stack>
      </Stack>
      <Stack>
        <Divider />
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} sx={{ p: 2 }}>
          <Typography>Feedback</Typography>
        </Stack>
        <Divider />
        <Stack sx={{ p: 1 }}>
          <TextField multiline rows={3} />
        </Stack>
        <Stack direction={'row'} justifyContent={'end'} alignItems={'center'} spacing={1} sx={{ p: 1 }}>
          <Button variant="outlined" size="small" color="primary">
            Won
          </Button>
          <Button variant="outlined" size="small" color="primary">
            Lost
          </Button>
          <Button variant="outlined" size="small" color="primary">
            Negotiation
          </Button>
          <Button variant="outlined" size="small" color="primary">
            Review
          </Button>
          <Button variant="outlined" size="small" color="primary">
            Reply
          </Button>
        </Stack>
      </Stack>
    </MainCard>
  );
};

export default Proposal;
