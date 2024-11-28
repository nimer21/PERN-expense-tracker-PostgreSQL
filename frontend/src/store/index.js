    import { create } from 'zustand';
const useStore = create((set) => ({
    theme: localStorage.getItem('theme') ?? 'light',
    //toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
    user: JSON.parse(localStorage.getItem('user')) ?? null,

    setTheme: (value) => set({ theme: value }),
    setCredentials: (user) => set({ user }),
    signOut: () => set({ user:null }),
}));
export default useStore;