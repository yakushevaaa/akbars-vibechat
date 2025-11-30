import { createElement } from "../utils.js";
import { formatDate } from "../utils.js";
import {
  handleCreateGroup,
  handleCreatePrivateChat,
  handleAddUserToGroup,
  handleSearchUser,
} from "../handlers.js";
import { root } from "../state.js";
import { debounce } from "../api.js";

export const modalContainer = (content, onClose) =>
  createElement("div", {
    className: "modal-container",
    onClick: (e) => {
      if (e.target === e.currentTarget) onClose();
    },
    children: [content],
  });

export const createChatModal = (onClose, users = [], loading = false) =>
  createElement("div", {
    className: "modal",
    children: [
      createElement("div", {
        className: "modal__header",
        children: [
          createElement("h1", {
            className: "modal__title",
            text: "Новый чат",
          }),
          createElement("button", {
            className: "modal__close-btn",
            onClick: onClose,
            children: [
              createElement("img", {
                attrs: { src: "/assets/icons/close.svg", alt: "Закрыть" },
              }),
            ],
          }),
        ],
      }),

      createElement("p", {
        className: "modal__text",
        text: "Выберите участника для начала переписки",
      }),

      createElement("input", {
        className: "modal__input",
        onInput: debounce((event) => {
          const search = event.target.value.trim();
          if (search) {
            handleSearchUser(search);
          }
        }, 500),
        attrs: {
          type: "text",
          placeholder: "Поиск пользователей",
        },
      }),

      createElement("ul", {
        className: "modal__users-list",
        children: loading
          ? [
              createElement("li", {
                className: "modal__user-loading",
                text: "Загрузка пользователей...",
              }),
            ]
          : users.map((item) =>
              createUserItem(item, false, (user) =>
                handleCreatePrivateChat(user.id)
              )
            ),
      }),
    ],
  });

export const createGroupModal = (
  onClose,
  users = [],
  selectedUsersIds,
  loading = false
) => {
  return createElement("div", {
    className: "modal",
    children: [
      createElement("div", {
        className: "modal__header",
        children: [
          createElement("h1", {
            className: "modal__title",
            text: "Новая группа",
          }),
          createElement("button", {
            className: "modal__close-btn",
            onClick: onClose,
            children: [
              createElement("img", {
                attrs: { src: "/assets/icons/close.svg", alt: "Закрыть" },
              }),
            ],
          }),
        ],
      }),

      createElement("input", {
        id: "modalGroupName",
        className: "modal__input",
        attrs: {
          type: "text",
          placeholder: "Название группы",
        },
      }),

      createElement("h2", {
        className: "modal__subtitle",
        text: "Выберите участников группы",
      }),

      createElement("input", {
        className: "modal__input",
        onInput: debounce((event) => {
          const search = event.target.value.trim();
          if (search) {
            handleSearchUser(search);
          }
        }, 500),
        attrs: {
          type: "text",
          placeholder: "Поиск пользователей",
        },
      }),

      createElement("ul", {
        className: "modal__users-list",
        children: loading
          ? [
              createElement("li", {
                className: "modal__user-loading",
                text: "Загрузка пользователей...",
              }),
            ]
          : users.map((user) =>
              createUserItem(user, true, () =>
                handleAddUserToGroup(user.id, selectedUsersIds)
              )
            ),
      }),

      createElement("div", {
        className: "modal__buttons-container",
        children: [
          createElement("button", {
            className: "modal__button",
            text: "Отмена",
            onClick: onClose,
          }),
          createElement("button", {
            className: "modal__button modal__button--accent",
            text: "Создать группу",
            onClick: async () => {
              const groupName = root
                .querySelector("#modalGroupName")
                .value.trim();
              await handleCreateGroup(groupName, Array.from(selectedUsersIds));
            },
          }),
        ],
      }),
    ],
  });
};

export function createUserItem(user, withCheckbox = false, onClick) {
  const children = [
    createElement("div", {
      className: "modal__user-info-container",
      children: [
        createElement("h3", {
          className: "modal__user-nickname",
          text: user.nickname,
        }),
        createElement("p", {
          className: "modal__user-info",
          text: user.email,
        }),
        createElement("p", {
          className: "modal__user-info",
          text: user.full_name,
        }),
        createElement("p", {
          className: "modal__user-info",
          text: `Зарегистрирован: ${formatDate(user.created_at)}`,
        }),
      ],
    }),
  ];

  const checkbox = withCheckbox
    ? createElement("input", {
        className: "modal__user-checkbox",
        attrs: { type: "checkbox" },
      })
    : null;

  if (checkbox) children.push(checkbox);

  const element = createElement("li", {
    className: "modal__user",
    children,
    onClick: () => {
      if (checkbox) {
        checkbox.checked = !checkbox.checked;
      }

      if (onClick) {
        onClick(user);
      }
    },
  });

  return element;
}

export const showModal = (type, onClose, users = [], loading = false) => {
  let modalContent;

  switch (type) {
    case "createChat":
      modalContent = createChatModal(onClose, users, loading);
      break;
    case "createGroup":
      modalContent = createGroupModal(onClose, users, loading);
      break;
    default:
      return;
  }

  const modal = modalContainer(modalContent, onClose);
  root.appendChild(modal);
};

export const hideModal = () => {
  const modal = root.querySelector(".modal-container");
  if (modal) modal.remove();
};
