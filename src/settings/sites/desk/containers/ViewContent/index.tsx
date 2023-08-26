import { PageLayoutData } from '@base/types/pagelayout';
import { Grid } from '@mui/material';
import Feedback from '@settings/sites/desk/components/Feedback';
import MainCard from '@base/components/App/MainCard';

interface ViewContentProps {
  menuSource?: string;
  menuSourceId: string;
  column?: number;
  layoutData?: PageLayoutData;
  ignoreFields?: string[];
}

type FeedbackType = {
  id: string;
  review: string;
  date: string;
  profile: {
    avatar: string;
    name: string;
    status: boolean;
  };
};

const ViewContent = (props: ViewContentProps) => {
  //props
  const { menuSource, menuSourceId, layoutData, ignoreFields } = props;

  const feedbacks: FeedbackType[] = [
    {
      id: '1',
      review: 'Ticket No, Status, Customer, Category, Assigned Rep',
      date: '2022-08-10 16:30:05',
      profile: {
        avatar: '',
        name: 'MSR',
        status: true
      }
    },
    {
      id: '2',
      review: 'Ticket No, Status, Customer, Category, Assigned Rep',
      date: '2022-08-10 16:30:05',
      profile: {
        avatar: '',
        name: 'Feedback from Contact',
        status: true
      }
    },
    {
      id: '3',
      review: 'Ticket No, Status, Customer, Category, Assigned Rep',
      date: '2022-08-10 16:30:05',
      profile: {
        avatar: '',
        name: 'MSR 2',
        status: true
      }
    }
  ];

  return (
    <>
      {feedbacks &&
        feedbacks.map((feedback, index) => (
          <Grid item xs={12} key={index} sx={{ marginTop: '10px' }}>
            <MainCard>
              <Feedback avatar={''} date={feedback.date} name={feedback.profile.name} review={feedback.review} />
            </MainCard>
          </Grid>
        ))}
    </>
  );
};

export default ViewContent;
