import { create} from "zustand";

interface UserStore {
    userId: string;
    setUserId: (userId: string) => void;
}

const userStore = create<UserStore>((set) => ({
    userId: "",
    setUserId: (userId: string) => set(() => ({ userId: userId })),
}));


export default userStore;