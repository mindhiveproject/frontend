import { useRouter } from "next/router";

import Chat from "../../../components/Dashboard/Chat/index";
import AuthorizedPage from "../../../components/Page/userpage";

const ChatPage = () => {
  const router = useRouter();
  if (!router.query.id)
    return (
      <AuthorizedPage>
        <Chat />
      </AuthorizedPage>
    );
  return (
    <AuthorizedPage>
      <Chat chatId={router.query.id} />
    </AuthorizedPage>
  );
};

export default ChatPage;
