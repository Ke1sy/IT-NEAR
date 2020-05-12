import React, {useEffect, FC, useState, Fragment, useRef} from 'react';
import Message from "./../Message/Message";
import MessageForm from "./../Message/MessageForm";
import {GetMessageType, MessagesType, ProfileType} from "../../../redux/reducers/types";
import Preloader from "../../Preloader/Preloader";
import ChatHeader from "./ChatHeader";
import {WithStyles} from "@material-ui/core";
import withMessagesChatStyles from "./messagesChatStyles";
import {emitWatchMessages, socket} from "../../../utils/socket";

type PropsType = {
    messages: Array<MessagesType>
    lastUserActivityDate: string | null
    deletedMessages: Array<string>
    spamedMessages: Array<string>
    friendId: number,
    selectedFriend: ProfileType | null
    currentUserInfo: ProfileType,
    messagesLoading: boolean,
    sendMessage: (reciever: number, sender: {id: number, name: string}, message: string) => void
    getMessages: (userId: number) => void
    deleteMessage: (messageId: string) => void
    spamMessage: (messageId: string) => void
    restoreMessage: (messageId: string) => void
    requestNewMessagesCount: () => void
    getDialogs: () => void
}

type FilteredMessagesType = {
    date: string,
    messages: Array<MessagesType>
};

const MessagesChat: FC<PropsType & WithStyles> = ({
                                                      classes,
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
                                                      messagesLoading,
                                                      requestNewMessagesCount,
                                                      getDialogs
                                                  }) => {
    const [filteredMessages, setFilteredMessages] = useState<[] | Array<FilteredMessagesType>>([]);
    const wrapperRef = useRef<any>(null);

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
        if (friendId) {
            getMessages(friendId);
        }
    };

    // Watch for new messages
    const subscribeToNewMessages = (msg: GetMessageType) => {
        if(msg.sender.id === friendId) {
            updateMessages();
        }
    };

    // Watch for messages view status
    const subscribeToVieWMessages = (watcher: number) => {
        if(watcher === friendId) {
            // If friend have viewed our messages, we need to know
            updateMessages();
        } else if (watcher === currentUserInfo.userId) {
            // If we have viewed new messages, we need to update new messages count
            requestNewMessagesCount();
            getDialogs()
        }
    };

    useEffect(() => {
        if (friendId) {
            updateMessages();
            socket.on('get_new_message', subscribeToNewMessages);
            socket.on('need_update_messages', subscribeToVieWMessages);
            return () => {
                socket.off('get_new_message', subscribeToNewMessages);
                socket.off('need_update_messages', subscribeToVieWMessages);
            }
        }
    }, [friendId]);

    //group messages by date and emit view status of messages
    useEffect(() => {
        filterByDate();
        const unreadMess = messages.filter(item => !item.viewed && item.recipientId === currentUserInfo.userId);
        if (unreadMess.length) {
            emitWatchMessages({reciever: friendId, sender: currentUserInfo.userId});
        }
    }, [messages]);

    useEffect(() => {
        if (!messagesLoading ) {
           const wrapper = wrapperRef.current;
            wrapper.scroll(0, wrapper.scrollHeight - wrapper.clientHeight)
        }
    }, [messagesLoading, filteredMessages]);

    const onAddMessage = ({message}: { message: string }) => {
        sendMessage(friendId, {id: currentUserInfo.userId, name: currentUserInfo.fullName}, message);
    };

    return (
        <>
            <div className={classes.chat}>
                {selectedFriend &&
                <ChatHeader lastUserActivityDate={lastUserActivityDate} selectedFriend={selectedFriend}
                            messagesLoading={messagesLoading}/>
                }
                <div className={classes.chatWrapper} ref={wrapperRef}>
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

export default withMessagesChatStyles(MessagesChat);
