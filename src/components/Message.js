import React, { forwardRef } from "react";
// forwardref ma referencje do orginalnego
import { CardContent, Card, Typography } from "@material-ui/core";
import "../style/message.css";

const Message = forwardRef(({ message, username }, ref) => {
  const isUser = username === message.username;

  return (
    <div ref={ref} className={`message ${isUser && "message__user"}`}>
      {/* user dostaje inny style w cssesie */}
      <Card className={isUser ? "message__userCard" : "message__questCard"}>
        <CardContent>
          <Typography color="white" variant="h5" component="h2">
            {!isUser && `${message.username} mowi > `}
            {message.message}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
});
export default Message;
