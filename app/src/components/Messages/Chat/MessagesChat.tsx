import React, {useEffect, FC, useState, Fragment} from 'react';
import Message from "./../Message/Message";
import MessageForm from "./../Message/MessageForm";
import {MessagesType, ProfileType} from "../../../redux/reducers/types";
import Preloader from "../../Preloader/Preloader";
import ChatHeader from "./ChatHeader";
import {makeStyles} from "@material-ui/core";

type PropsType = {
    messages: Array<MessagesType>
    lastUserActivityDate: string | null
    deletedMessages: Array<string>
    spamedMessages: Array<string>
    friendId: number,
    selectedFriend: ProfileType | null
    currentUserInfo: ProfileType,
    messagesLoading: boolean,
    sendMessage: (userId: number, message: string) => void
    getMessages: (userId: number) => void
    deleteMessage: (messageId: string) => void
    spamMessage: (messageId: string) => void
    restoreMessage: (messageId: string) => void
}

type FilteredMessagesType = {
    date: string,
    messages: Array<MessagesType>
};

const useStyles = makeStyles(theme => ({
    chat: {
        position: "relative",
        paddingTop: "68px",
        display: "flex",
        flexDirection: "column",
        height: "100%"
    },

    chatWrapper: {
        position: "relative",

        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        flexGrow: 1,
        overflowY: "auto",
        padding: "0 10px 20px"
    },
    date: {
        color: theme.palette.grey[400],
        margin: "5px auto",
        [theme.breakpoints.up('sm')]: {
            margin: "15px auto",
        },
    }
}));

const MessagesChat: FC<PropsType> = ({
                                         friendId,
                                         messages,
                                         deleteMessage,
                                         spamMessage,
                                         lastUserActivityDate,
                                         restoreMessage,
                                         getMessages,
                                         sendMessage,
                                         deletedMessages,
                                         spamedMessages,
                                         selectedFriend,
                                         currentUserInfo,
                                         messagesLoading
                                     }) => {
    const classes = useStyles();
    const [filteredMessages, setFilteredMessages] = useState<[] | Array<FilteredMessagesType>>([]);
    const filterByDate = () => {
        let newArr: any = {};
        messages.map((message: MessagesType) => {
            const date = new Date(message.addedAt).toLocaleDateString();
            if (!newArr[date]) {
                newArr[date] = [message];
            } else {
                newArr[date] = [...newArr[date], message];
            }
        });
        let ordered: FilteredMessagesType[] = [];
        Object.entries(newArr).map((item: Array<any>) => {
            ordered = [
                ...ordered,
                {
                    date: item[0],
                    messages: item[1],
                }
            ];
        });
        setFilteredMessages(ordered);
    };

    const updateMessages = () => {
        if (friendId !== undefined) {
            getMessages(friendId);
        }
    };

    useEffect(() => {
        if (friendId) {
            updateMessages();
        }
    }, [friendId]);

    useEffect(() => {
        filterByDate();
    }, [messages]);

    useEffect(() => {
        if (!messagesLoading) {
            scrollChatToBottom();
        }
    }, [messagesLoading, filteredMessages]);

    const scrollChatToBottom = () => {
        const wrapper = document.getElementById("wrapper");
        if (wrapper) {
            wrapper.scroll(0, wrapper.scrollHeight - wrapper.clientHeight);
        }
    };

    const onAddMessage = ({message}: { message: string }) => {
        sendMessage(friendId, message);
    };

    return (
        <>
            <div className={classes.chat}>
                {selectedFriend &&
                <ChatHeader lastUserActivityDate={lastUserActivityDate} selectedFriend={selectedFriend} messagesLoading={messagesLoading}/>
                }
                <div className={classes.chatWrapper} id="wrapper">
                    {messagesLoading ?
                        <Preloader showPreloader={true}/> :
                        (filteredMessages as FilteredMessagesType[]).map(({date, messages}) =>
                            <Fragment key={date}>
                                <div className={classes.date}>
                                    {date}
                                </div>
                                {messages.map((message) =>
                                    <Message
                                        key={message.id}
                                        message={message}
                                        deleteMessage={deleteMessage}
                                        spamMessage={spamMessage}
                                        restoreMessage={restoreMessage}
                                        deletedMessages={deletedMessages}
                                        spamedMessages={spamedMessages}
                                        selectedFriend={selectedFriend}
                                        currentUserInfo={currentUserInfo}
                                    />
                                )}
                            </Fragment>
                        )
                    }
                </div>
                <MessageForm onSubmit={onAddMessage}/>
            </div>
        </>
    )
};

export default MessagesChat;
