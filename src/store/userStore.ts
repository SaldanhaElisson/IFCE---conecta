import { create} from "zustand";

interface UserStore {
    userId: string;
    typeUser: string;
    setUserId: (userId: string) => void;
    setTypeUser: (typeUser: string) => void;
}

const userStore = create<UserStore>((set) => ({
    userId: "",
    typeUser: "",
    setUserId: (userId: string) => set(() => ({ userId: userId })),
    setTypeUser: (typeUser: string) => set(() => ({ typeUser })),
}));

export default userStore;