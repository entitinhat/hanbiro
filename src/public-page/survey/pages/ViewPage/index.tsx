import { Box } from '@mui/material';
import Survey from '@public-page/survey/containers/Survey';
import { extractUrlParams } from '@public-page/survey/utils';

interface ViewPageProps {
  param?: string;
}
const ViewPage = (props: ViewPageProps) => {
  const { param } = props;
  const publicParams = extractUrlParams(param);
  //publicParams.id
  //Example:TK=RD0yNTY3OWI2MS1iNjEzLTQ4Y2UtYTVkZC0zY2I2NDBmZDIzYzUmUD0mUz0mQz0mVT0mVD0mTz0=
  return (
    <Box>
      <Survey token={publicParams.tk} readonly={publicParams.readOnly == 'readOnly'} id={publicParams.id} />
    </Box>
  );
};

export default ViewPage;
