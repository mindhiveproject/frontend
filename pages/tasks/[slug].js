import { useRouter } from 'next/router';
import TaskParticipantPage from '../../components/Task/PublicPage/index';
import Page from '../../components/Page/index';

const TaskReviewParticipantPage = props => {
  const router = useRouter();
  if (!router.query.slug) return <Page></Page>;
  return (
    <Page>
      <TaskParticipantPage slug={router.query.slug} />
    </Page>
  );
};

export default TaskReviewParticipantPage;
