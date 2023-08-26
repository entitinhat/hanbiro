import ChipDraft from '@base/components/@hanbiro/ChipDraft';
import ChipPublished from '@base/components/@hanbiro/ChipDraft/Published';
import { Box } from '@mui/material';

interface PublishedViewProps {
  value: boolean;
}
const PublishedView = (props: PublishedViewProps) => {
  const { value } = props;
  return <Box sx={{ p: 1 }}>{value ? <ChipPublished /> : <ChipDraft />}</Box>;
};
export default PublishedView;
