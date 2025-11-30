import { getUsers } from "@/shared/api/chat/getUsers";
import { useEffect, useState } from "react";

export const ModalUsersList = ({ search, ItemComponent }) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timeout = setTimeout(async () => {
      const response = await getUsers(search);
      setUsers(response.users || []);
      setIsLoading(false);
    }, 400);

    return () => clearTimeout(timeout);
  }, [search]);

  if (isLoading) {
    return <p className="modal__loading">Загрузка...</p>;
  }

  return (
    <ul className="modal__users-list">
      {users.map((user) => (
        <li className="modal__user" key={user.id}>
          <ItemComponent user={user} />
        </li>
      ))}
    </ul>
  );
};
