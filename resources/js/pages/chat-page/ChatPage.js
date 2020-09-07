import * as React from "react";
import Phone from "../../components/phone/Phone";
import Chatting from "../../components/chatting/Chatting";

import "./chat-page.scss";
import LayoutTwo from "../../components/layout-two/LayoutTwo";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";

export function ChatPage(props) {
  const user = useSelector(state => state.authReducer.user);

  useEffect(() => {
    if (user && user.picked) {
      props.history.push("/");
    }
  }, [user]);
  return (
    <LayoutTwo hidePhone={true}>
      <div className="chat-page">
        <Phone>
          <Chatting />
        </Phone>
      </div>
    </LayoutTwo>
  );
}

export default withRouter(ChatPage);
