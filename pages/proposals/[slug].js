import { useRouter } from 'next/router';
import Proposal from '../../components/Proposal/public';
import Page from '../../components/Page/index';

const ProposalPage = () => {
  const router = useRouter();
  if (!router.query.slug)
    return (
      <Page>
        <h1>Loading ...</h1>
      </Page>
    );
  return (
    <Page>
      <Proposal {...router.query} />
    </Page>
  );
};

export default ProposalPage;
