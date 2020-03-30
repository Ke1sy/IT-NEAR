import React, {useEffect, FC, useState, Fragment} from 'react';
import styles from './messages.module.scss';
import Message from "./Message/Message";
import MessageForm from "./Message/MessageForm";
import {MessagesType, ProfileType} from "../../redux/reducers/types";
import {Avatar, Link, MenuItem, Typography} from "@material-ui/core";
import userPlaceholder from "../../assets/images/user-placeholder.png";
import Preloader from "../Preloader/Preloader";
import {NavLink} from "react-router-dom";

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
        if(!messagesLoading) {
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

    if (messagesLoading) {
        return <Preloader showPreloader={true}/>
    }

    return (
        <>
            <div className={styles.messages}>
                {selectedFriend &&
                <div className={styles.messages__head}>
                    <Link component={NavLink} to={`/profile/${selectedFriend.userId}`}>
                        <Avatar src={selectedFriend.photos.small || userPlaceholder} component="span" alt='avatar'
                                sizes="40"/>
                    </Link>
                    <div className={styles.messages__headInfo}>
                        <Link component={NavLink} to={`/profile/${selectedFriend.userId}`} underline="none"
                              className={styles.messages__headLink}>
                            <Typography variant="subtitle1" component="h6">
                                {selectedFriend.fullName}
                            </Typography>
                        </Link>
                        {lastUserActivityDate &&
                        <div className={styles.messages__headDate}>
                            Was here: {new Date(lastUserActivityDate).toLocaleString()}
                        </div>
                        }
                    </div>
                </div>
                }
                <div className={styles.messages__wrapper} id="wrapper">
                    {(filteredMessages as FilteredMessagesType[]).map(({date, messages}) =>
                        <Fragment key={date}>
                            <div className={styles.messages__date}>
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
                    )}
                </div>
                <MessageForm onSubmit={onAddMessage}/>
            </div>
        </>
    )
};

export default MessagesChat;
