import {
  sendMessage,
  getChats,
  getMessages,
  deleteChat,
} from "../service/chat.api";
import { initializeSocketConnection } from "../service/chat.socket";
import { useDispatch } from "react-redux";
import {
  addNewMessage,
  setChats,
  setCurrentChatId,
  setError,
  setLoading,
  createNewChat,
  addMessages,
} from "../chat.slice";

export const useChat = () => {
  const dispatch = useDispatch();

  async function handleSendMessage({ message, chatId }) {
    dispatch(setLoading(true));

    try {
      const data = await sendMessage({ message, chatId });
      const { chat, aiMessage } = data;
      if (!chatId)
        dispatch(
          createNewChat({
            chatId: chat._id,
            title: chat.title,
          }),
        );
      dispatch(
        addNewMessage({
          chatId: chatId || chat._id,
          id: `user-${Date.now()}`,
          content: message,
          role: "user",
          timestamp: new Date().toISOString(),
        }),
      );
      dispatch(
        addNewMessage({
          chatId: chatId || chat._id,
          id: aiMessage._id || `ai-${Date.now()}`,
          content: aiMessage.content,
          role: aiMessage.role,
          timestamp: aiMessage.createdAt || new Date().toISOString(),
        }),
      );
      dispatch(setCurrentChatId(chat._id));
    } catch (error) {
      dispatch(setError(error.message || "Failed to send message."));
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleOpenChat(chatId, chats) {

    if (chats[chatId].messages.length === 0) {
      const data = await getMessages(chatId);
      const { messages } = data;

      const formattedMessages = messages.map((msg) => ({
        id: msg._id || msg.id,
        content: msg.content,
        role: msg.role,
        timestamp: msg.createdAt || msg.updatedAt || new Date().toISOString(),
      }));

      dispatch(
        addMessages({
          chatId,
          messages: formattedMessages,
        }),
      );
    }

    dispatch(setCurrentChatId(chatId));
  }

  async function handleGetChats() {
    dispatch(setLoading(true));
    const data = await getChats();
    const { chats } = data;
    dispatch(
      setChats(
        chats.reduce((acc, chat) => {
          acc[chat._id] = {
            id: chat._id,
            title: chat.title,
            messages: [],
            lastUpdated: chat.updatedAt,
          };
          return acc;
        }, {}),
      ),
    );
    dispatch(setLoading(false));
  }
  return {
    initializeSocketConnection,
    handleSendMessage,
    handleOpenChat,
    handleGetChats,
  };
};
