import MainCard from '@base/components/App/MainCard';
import { CardContent, CardMedia, Typography, useTheme } from '@mui/material';

interface IntroContentProps {
  image: string;
  content: string;
}
const IntroContent = (props: IntroContentProps) => {
  const { image, content } = props;
  const theme = useTheme();
  return (
    <>
      <MainCard sx={{ backgroundColor: theme.palette.background.paper }} border={false}>
        <CardContent style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
          <CardMedia alt='This is image intro' component="img" height="170px" width="auto" style={{ maxWidth: '100%' }} image={image} />
          <Typography>{content}</Typography>
        </CardContent>
      </MainCard>
    </>
  );
};

export default IntroContent;
