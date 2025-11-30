import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { getProfile } from "@/shared/api/auth/getProfile";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    async function loadUser() {
      const profile = await getProfile();
      setUser(profile.user);
      setLoading(false);
    }

    loadUser();
  }, []);

  // if (loading) {
  //   return <div>Загрузка...</div>;
  // }

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
