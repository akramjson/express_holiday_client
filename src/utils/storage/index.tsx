import { PersistStorage } from "zustand/middleware";

export default function createSessionStorage<State>(): PersistStorage<State> {
  return {
    getItem: (name) => {
      const value = sessionStorage.getItem(name);
      return value ? JSON.parse(value) : null;
    },
    setItem: (name, value) => {
      sessionStorage.setItem(name, JSON.stringify(value));
    },
    removeItem: (name) => {
      sessionStorage.removeItem(name);
    },
  };
}
