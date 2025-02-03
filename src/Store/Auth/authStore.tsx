import { create } from "zustand";
import { persist } from "zustand/middleware";
import { userSchemaType } from "../../types/User/schema";
import createSessionStorage from "../../utils/storage";

type State = {
  access_token: string;
  refresh_token: string;
  user: userSchemaType;
};

type Action = {
  store_access_token: (store_access_token: State["access_token"]) => void;
  store_refresh_token: (store_refresh_token: State["refresh_token"]) => void;
  store_user: (store_user: State["user"]) => void;
  clearSession: () => void;
};

export const useAuthStore = create<State & Action>()(
  persist(
    (set) => ({
      access_token: "",
      refresh_token: "",
      user: {},
      store_access_token: (access_token) =>
        set(() => ({ access_token: access_token })),
      store_refresh_token: (refresh_token) =>
        set(() => ({ refresh_token: refresh_token })),
      store_user: (user) => set(() => ({ user: user })),
      clearSession: () => {
        sessionStorage.removeItem("auth");
        set(() => ({
          access_token: "",
          refresh_token: "",
          user: {},
        }));
      },
    }),
    {
      name: "auth",
      storage: createSessionStorage(),
    }
  )
);
