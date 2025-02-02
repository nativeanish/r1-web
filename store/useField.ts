import { create } from "zustand";

interface State {
    avilable_n_core: number;
    n_core: number;
    set_n_core: (e: number) => void;
    context: number;
    set_context: (e: number) => void;
    temperature: number;
    set_temperature: (e: number) => void;
    cache: boolean;
    set_cache: (e: boolean) => void;
}
const useField = create<State>((set, get) => ({
    avilable_n_core: navigator.hardwareConcurrency || 1,
    n_core: navigator.hardwareConcurrency || 1,
    set_n_core(e) {
        if (e > get().avilable_n_core) {
            set({ n_core: get().avilable_n_core })
        } else {

            set(({ n_core: e }))
        }
    },
    context: 2048,
    set_context(e) {
        if (e > 128000) {
            set({ context: 2048 })
        } else {
            set({ context: e })
        }
    },
    temperature: 0.1,
    set_temperature(e) {
        if (e > 1) {
            set({ temperature: 0.1 })
        } else {
            set({ temperature: e })
        }
    },
    cache: false,
    set_cache(e) {
        set({ cache: e })
    },
}))
export default useField