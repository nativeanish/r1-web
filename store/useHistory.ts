import { create } from "zustand"

interface State {
    history: Array<{ id: string, title: string, chat: Array<{ role: 'user' | 'assistant', content: string, id: string }> }>,
    setHistory: (e?: { id: string, title: string, chat: Array<{ role: 'user' | 'assistant', content: string, id: string }> }) => void
    current: string;
    setCurrent: (e: string) => void;
    insertChat: (id: string, chat: { role: 'user' | 'assistant', content: string, id: string }) => void;
    getFromStorage: () => void;
    deleteFromStorage: (id: string) => void;
}
const useHistory = create<State>((set, get) => ({
    history: [],
    setHistory(e) {
        if (e) {
            set({ history: [...get().history, e] })
        }
    },
    current: "",
    setCurrent(e) {
        set({ current: e })
    },
    insertChat(id, chat) {
        set((state) => {
            const newHistory = state.history.map((item) => {
                if (item.id === id) {
                    return {
                        ...item,
                        chat: [...item.chat, chat]
                    }
                }
                return item
            });
            localStorage.setItem('chat-history', JSON.stringify(newHistory));
            return { history: newHistory };
        });
    },
    getFromStorage() {
        const stored = localStorage.getItem('chat-history');
        if (stored) {
            set({ history: JSON.parse(stored) });
        }
    }
    ,
    deleteFromStorage(id: string) {
        set((state) => {
            const newHistory = state.history.filter(item => item.id !== id);
            localStorage.setItem('chat-history', JSON.stringify(newHistory));
            return { history: newHistory };
        });
    }
}))

export default useHistory