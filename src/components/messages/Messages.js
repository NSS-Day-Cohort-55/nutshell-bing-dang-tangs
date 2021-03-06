import { MessageList } from "./MessageList"
import { NewMessage } from "./NewMessage"
import { useState, useEffect } from "react"
import { DeleteMessage, GetAllMessages } from "../../modules/MessageManager";
import "./Messages.css"

export const Messages = () => {
    let user = JSON.parse(sessionStorage.getItem("nutshell_user"));
    const [messages, setMessages] = useState([]);

    const getMessages = () => {
        return GetAllMessages()
            .then(m => {
                setMessages(m);
            })
    }

    // Delete message by id then reload the messages
    const handleDelete = (messageId) => {
        return DeleteMessage(messageId)
            .then(() => {
                getMessages()
            })
    }

    useEffect(() => {
        const interval = setInterval(() => {
            getMessages();
        }, 5000);
        getMessages();
    }, [])

    return (
        <>
            <div className="messages-wrapper">
                <NewMessage user={user} getMessages={getMessages} />
                <br></br>
                <MessageList user={user} handleDelete={handleDelete} messages={messages} />
            </div>
        </>
    )
}