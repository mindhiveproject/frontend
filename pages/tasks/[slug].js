import { useRouter } from 'next/router';
import TaskParticipantPage from '../../components/Task/ParticipantPage/index';
import Page from '../../components/Page/index';

const TaskReviewParticipantPage = props => {
  const router = useRouter();
  if (!router.query.slug)
    return (
      <Page>
        <p>Loading</p>
      </Page>
    );
  return (
    <Page>
      <TaskParticipantPage slug={router.query.slug} />
    </Page>
  );
};

export default TaskReviewParticipantPage;
