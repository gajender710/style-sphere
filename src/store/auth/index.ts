import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
    userDetail:any;
    authToken:string | null;
    isLoggedIn:boolean;
}

interface AuthActions {
    reset:()=>void;
}

const initialState = {
    userDetail:null,
    authToken: null,
    isLoggedIn:false,
}

const useAuthStore = create<AuthState & AuthActions>()(
    persist(
      (set) => ({
       ...initialState,
        reset: () => {
          set(initialState);
        },
      }),
      {
        name: 'auth-storage',
        // storage: createJSONStorage(() => storage),
      }
    )
  );


export default useAuthStore;
