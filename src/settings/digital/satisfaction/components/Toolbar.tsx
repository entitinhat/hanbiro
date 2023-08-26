import IconButton from '@base/components/@extended/IconButton';
import { AddCircleOutline } from '@mui/icons-material';
import { Stack, styled, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';

const ToolbarContainer = styled('div')(({ top }: { top: number }) => ({
  top: top === 0 ? '8px' : top,
  right: '-70px',
  position: 'absolute',
  //'-webkit-transition': 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
}));

const ToolbarBox = styled('div')(({ theme }) => ({
  boxShadow: '0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.141), 0 1px 3px 0 rgba(0, 0, 0, 0.122)',
  transition: 'box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1)',
  backgroundColor: '#fff',
  border: '1px solid #dadce0',
  //'-webkit-border-radius': '8px',
  borderRadius: '8px',
  //'-webkit-box-align': 'center',
  boxAlign: 'center',
  //'-webkit-align-items': 'center',
  alignItems: 'center',
  justifyContent: 'center',
  display: 'flex',
  //'-webkit-flex-direction': 'column',
  flexDirection: 'column',
  width: '52px'
}));

interface ToolbarProps {
  focusS: number;
  focusQ: number;
  scrollTop?: number;
  onAddNewOptionRow: (e: any) => void;
}

const Toolbar = (props: ToolbarProps) => {
  const { focusS, focusQ, scrollTop = 0, onAddNewOptionRow } = props;
  const { t } = useTranslation();

  const addNormalQEleId = 'q-addnormal-' + focusS + '-' + focusQ;

  return (
    <ToolbarContainer top={scrollTop}>
      <ToolbarBox>
        <Stack spacing={1} sx={{ my: 1 }}>
          <Tooltip title="Add option" placement="left">
            <IconButton id={addNormalQEleId} color="secondary" onClick={onAddNewOptionRow}>
              <AddCircleOutline color="inherit" />
            </IconButton>
          </Tooltip>
        </Stack>
      </ToolbarBox>
    </ToolbarContainer>
  );
};

export default Toolbar;
