import { supabase } from "@/lib/supabase";
import { User } from "@supabase/gotrue-js";
import { createContext, FC, useContext, useEffect, useState } from "react";

export const signIn = async () => {
  const { user, session, error } = await supabase.auth.signIn({
    provider: "google",
  });
  return { user, session, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

interface UserContextProps {
  user: User | null;
}

export const UserContext = createContext<UserContextProps>({ user: null });

export const UserContextProvider: FC = (props) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const user = supabase.auth.user();

    supabase.auth.onAuthStateChange((event, session) => {
      if (event && session) {
        setUser(session.user);
      } else {
        setUser(null);
      }
    });

    if (user) {
      setUser(user);
    } else setUser(null);
  }, []);

  return <UserContext.Provider value={{ user }} {...props} />;
};

export const useUser = () => {
  const { user } = useContext(UserContext);
  if (user === undefined) {
    throw new Error(`useUser must be used within a UserContextProvider.`);
  }
  return {
    user,
    userId: user?.id,
  };
};
