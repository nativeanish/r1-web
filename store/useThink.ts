import { create } from "zustand"

interface State {
    text: string
}
const useThink = create<State>(() => ({
    text: ""
}))
export default useThink