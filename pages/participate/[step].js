import { useRouter } from 'next/router';
import ParticipateFlow from '../../components/Participate/index';
import Page from '../../components/Page/index';

const ParticipatePage = () => {
  const router = useRouter();
  if (!router.query.step)
    return (
      <Page>
        <h1>Loading ...</h1>
      </Page>
    );
  if (!router.query.id)
    return (
      <Page>
        <h1>The information about the study is missing</h1>
      </Page>
    );
  return (
    <Page>
      <ParticipateFlow query={router.query} />
    </Page>
  );
};

export default ParticipatePage;
