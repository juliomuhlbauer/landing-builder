import { supabase } from "@/lib/supabase";
import { User } from "@supabase/gotrue-js";
import { useEffect, useState } from "react";

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

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);

  supabase.auth.onAuthStateChange((event, session) => {
    if (event && session) {
      setUser(session.user);
    } else {
      setUser(null);
    }
  });

  useEffect(() => {
    const user = supabase.auth.user();
    if (user) {
      setUser(user);
    } else setUser(null);
  }, []);

  return {
    user,
    userId: user?.id,
  };
};
