import Chat from '../../components/Dashboard/Chat/index';
import AuthorizedPage from '../../components/Page/userpage';

const ChatPage = props => (
  <AuthorizedPage>
    <Chat />
  </AuthorizedPage>
);

export default ChatPage;
