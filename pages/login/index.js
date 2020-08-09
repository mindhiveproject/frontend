import Login from '../../components/Login/index';
import Page from '../../components/Page/index';

const LoginPage = props => (
  <Page>
    <Login task={props.query.task} />
  </Page>
);

export default LoginPage;
