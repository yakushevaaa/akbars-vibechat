import { state, root } from "../state.js";
import {
  handleCreateChat,
  handleCreateGroupModal,
  handleLogout,
  handleSendMessage,
  handleSelectChat,
} from "../handlers.js";
import { createElement } from "../utils.js";
import { handleUserTyping } from "../handlers-socket.js";

export function getCurrentUserName() {
  return state.user?.full_name || "Пользователь";
}

export function getChatName(chat) {
  if (chat.name) return chat.name;

  if (chat.type === "private" && chat.members) {
    const curUserId = state.user.id;
    const friend = chat.members.find((user) => user.id !== curUserId);
    return friend?.nickname || friend?.full_name || `Чат ${chat.id}`;
  }

  return `Чат ${chat.id}`;
}

function togglePopup() {
  const popUp = root.querySelector(".add-popUp");
  if (popUp) {
    popUp.remove();
  } else {
    const container = root.querySelector(".chat-list__add-container");
    if (!container) return;

    const newPopup = createAddPopup();
    container.appendChild(newPopup);
  }
}

const createHeader = () => {
  const userName = getCurrentUserName();
  return createElement("header", {
    className: "header",
    children: [
      createElement("img", {
        className: "logo",
        attrs: { src: "assets/icons/logo.svg", alt: "Логотип" },
      }),
      createElement("div", {
        className: "header__greet",
        children: [
          createElement("p", {
            className: "header__user-name",
            children: [`Привет, ${userName}`],
          }),
          createElement("button", {
            id: "leaveButton",
            className: "header__leave-button",
            onClick: () => handleLogout(),
            children: [
              createElement("img", {
                attrs: { src: "assets/icons/leave.svg", alt: "Выход" },
              }),
            ],
          }),
        ],
      }),
    ],
  });
};

const createAddPopup = () => {
  return createElement("div", {
    className: "add-popUp",
    children: [
      createElement("ul", {
        className: "add-popUp__options-list",
        children: [
          createElement("li", {
            className: "add-popUp__option",
            children: [
              createElement("button", {
                className: "add-popUp__button",
                text: "Создать чат",
                onClick: handleCreateChat(),
              }),
            ],
          }),
          createElement("li", {
            className: "add-popUp__option",
            children: [
              createElement("button", {
                className: "add-popUp__button",
                text: "Создать группу",
                onClick: handleCreateGroupModal(),
              }),
            ],
          }),
        ],
      }),
    ],
  });
};

export const createEmptyChats = () =>
  createElement("div", {
    className: "empty-list",
    children: [
      createElement("img", {
        attrs: { src: "assets/icons/empty-state.svg", alt: "" },
      }),
      createElement("h1", {
        className: "empty-list__text",
        text: "У вас еще нет\nактивных чатов",
      }),
      createElement("div", {
        className: "empty-list__buttons-container",
        children: [
          createElement("button", {
            className: "empty-list__add-button",
            text: "Создать чат",
            onClick: handleCreateChat(),
          }),
          createElement("button", {
            className: "empty-list__add-button",
            text: "Создать группу",
            onClick: handleCreateGroupModal(),
          }),
        ],
      }),
    ],
  });

function createChatHeader() {
  if (!state.activeChat) return null;

  if (state.activeChat.type === "private") {
    const friend = state.activeChat.members.find(
      (member) => member.id !== state.user.id
    );

    const isOnline = state.onlineUsers[friend.id] === 1;
    return createElement("header", {
      className: "chat__header",
      children: [
        createElement("div", {
          className: "chat__header-title-container",
          children: [
            createElement("h2", {
              className: "chat__header-title",
              text: getChatName(state.activeChat),
            }),
            createElement("span", {
              className: "chat__header-online",
              id: "onlineStatus",
              text: isOnline ? "онлайн" : "оффлайн",
            }),
          ],
        }),
        createElement("p", {
          className: "chat__header-typing",
          id: "typingStatus",
          text: "",
        }),
      ],
    });
  } else if (state.activeChat.type === "group") {
    return createElement("header", {
      className: "chat__header",
      children: [
        createElement("div", {
          className: "chat__header-title-container",
          children: [
            createElement("h2", {
              className: "chat__header-title",
              text: getChatName(state.activeChat),
            }),
            createElement("span", {
              className: "chat__header-members",
              text: `${state.activeChat.members.length} участников`,
            }),
          ],
        }),
      ],
    });
  }

  return null;
}

function createChatFooter() {
  if (!state.activeChat) return null;

  return createElement("footer", {
    className: "chat__footer",
    children: [
      createElement("div", {
        className: "chat__send-container",
        children: [
          createElement("textarea", {
            id: "sendInput",
            onInput: () => handleUserTyping(),
            onKeyDown: (e) => {
              if (e.key === "Enter") {
                if (e.shiftKey) return;
                e.preventDefault();
                handleSendMessage();
              }
            },
            className: "chat__send-input",
            attrs: { placeholder: "Написать сообщение" },
          }),
          createElement("button", {
            id: "sendBtn",
            onClick: () => handleSendMessage(),
            className: "chat__send-button",
            children: [
              createElement("img", {
                className: "chat__send-icon",
                attrs: { src: "assets/icons/send.svg" },
              }),
              "Отправить",
            ],
          }),
        ],
      }),
    ],
  });
}

const createChatMain = () => {
  const header = createChatHeader();
  const footer = createChatFooter();

  return createElement("main", {
    className: "chat",
    children: [
      header,
      createElement("div", { id: "dialog", className: "dialog", children: [] }),
      footer,
    ],
  });
};

export const createChatItem = (chat) => {
  const lastMessage = chat.lastMessage || {};
  const friendName = getChatName(chat);

  const isActive = state.activeChat && state.activeChat.id === chat.id;

  return createElement("div", {
    className: `chat-item ${isActive ? "chat-item--focused" : ""}`,
    onClick: () => handleSelectChat(chat),
    children: [
      createElement("p", {
        className: "chat-item__category",
        text: chat.type === "group" ? "групповой чат" : "приватный чат",
      }),
      createElement("div", {
        className: "chat-item__info",
        children: [
          createElement("h3", {
            className: "chat-item__username",
            text: friendName,
          }),
          ...(chat.unreadCount > 0
            ? [
                createElement("span", {
                  className: "chat-item__new-message-count",
                  text: chat.unreadCount,
                }),
              ]
            : []),
        ],
      }),
      createElement("div", {
        className: "chat-item__message",
        children: [
          createElement("p", {
            className: "chat-item__message-text",
            text: lastMessage.content || "Чат пуст",
          }),
          createElement("p", {
            className: "chat-item__time",
            text: lastMessage.created_at
              ? new Date(lastMessage.created_at).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "",
          }),
        ],
      }),
    ],
  });
};

export const createChatList = () => {
  if (!state.chats || state.chats.length === 0) return null;

  return createElement("div", {
    className: "chat-list__container",
    children: [
      createElement("header", {
        className: "chat-list__header",
        children: [
          createElement("h2", {
            className: "chat-list__title",
            text: "Чаты",
          }),
          createElement("div", {
            className: "chat-list__add-container",
            children: [
              createElement("button", {
                className: "chat-list__add-button",
                onClick: () => {
                  togglePopup();
                },
                children: [
                  createElement("img", {
                    attrs: { src: "/assets/icons/add-chat.svg", alt: "" },
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      createElement("div", {
        id: "chatsContainer",
        className: "chats",
        children: state.chats.map((chat) => createChatItem(chat)),
      }),
    ],
  });
};

export function createMessageElement(msg) {
  const isMine = msg.user_id === state.user.id;

  return createElement("div", {
    className: "dialog__message-parent",
    children: [
      createElement("div", {
        className: `message ${isMine ? "my-message" : ""}`,
        children: [
          createElement("p", {
            className: "message__text",
            text: msg.content,
          }),
          createElement("p", {
            className: "message__time",
            text: new Date(msg.created_at).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          }),
        ],
      }),
    ],
  });
}

export const chatPage = () => {
  const chatsContainer =
    state.chats && state.chats.length > 0
      ? createChatList()
      : createEmptyChats();

  return createElement("div", {
    id: "chat-page",
    className: "page active",
    children: [
      createElement("div", {
        className: "layout",
        children: [
          createHeader(),
          createElement("aside", {
            className: "chat-list",
            children: [chatsContainer],
          }),
          createChatMain(),
        ],
      }),
    ],
  });
};
