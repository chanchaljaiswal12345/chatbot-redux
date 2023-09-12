To see the messages use:

const messages = useSelector((state: RootState) => state.chat.messages);

######################################################

To send the message as user:

 dispatch(addMessage({ text: message, sender: "user" }));


 To send the message as receiver:

 dispatch(addMessage({ text: "message", sender: "ai" }));


 
