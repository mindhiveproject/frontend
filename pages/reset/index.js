import { useRouter } from 'next/router';
import Reset from '../../components/Reset/index';
import Page from '../../components/Page/index';

// const ResetPage = ({ query }) => (
//   <Page>
//     <Reset resetToken={query.resetToken} />
//   </Page>
// );

const ResetPage = () => {
  const router = useRouter();
  if (!router.query.resetToken)
    return (
      <Page>
        <p>Loading</p>
      </Page>
    );
  return (
    <Page>
      <Reset resetToken={router.query.resetToken} />
    </Page>
  );
};

export default ResetPage;
