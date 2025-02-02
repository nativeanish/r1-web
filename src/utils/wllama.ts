import { Wllama } from '@wllama/wllama';
import { Model } from './models';
import useThink from '../../store/useThink';
import { uuidv7 } from 'uuidv7';
import useField from '../../store/useField';
import useHistory from '../../store/useHistory';
const CONFIG_PATHS = {
    'single-thread/wllama.wasm': 'https://cdn.jsdelivr.net/npm/@wllama/wllama@2.1.4/src/multi-thread/wllama.wasm',
    'multi-thread/wllama.wasm': 'https://cdn.jsdelivr.net/npm/@wllama/wllama@2.1.4/src/multi-thread/wllama.wasm',
};


export const wllama = new Wllama(CONFIG_PATHS, {
    parallelDownloads: 5,
    logger: {
        debug: (...args) => console.debug('🔧', ...args),
        log: (...args) => console.log('ℹ️', ...args),
        warn: (...args) => console.warn('⚠️', ...args),
        error: (...args) => console.error('☠️', ...args),
    },

})
export const loadModel = async (e: Model, setLoading: React.Dispatch<React.SetStateAction<string>>) => {
    setLoading("Loading Model")
    const threads = useField.getState().n_core
    const progressCallback = ({ loaded, total }: { loaded: number, total: number }) => {
        // Calculate the progress as a percentage
        const progressPercentage = Math.round((loaded / total) * 100);
        // Log the progress in a user-friendly format
        setLoading(`Downloading... ${progressPercentage}%`);
        if (loaded / total * 100 === 100) {
            setLoading("")
        }
    };

    await wllama.loadModelFromUrl(e.url, {
        progressCallback: progressCallback,
        n_threads: threads
    })
    setLoading("")
}

export const runLLM = async () => {
    const context = useField.getState().context
    const temp = useField.getState().temperature
    const cache = useField.getState().cache
    useThink.setState({ text: "Thinking ..." })
    const current = useHistory.getState().current
    const chat = useHistory.getState().history.find((e) => e.id === current)?.chat
    if (chat) {
        const data = await wllama.createChatCompletion(chat, {
            nPredict: context,
            sampling: {
                temp: temp,
                top_k: 40,
                top_p: 0.9,
            },
            onNewToken: ((_, __, t) => { useThink.setState({ text: t }) }),
            useCache: cache
        })
        console.log(data)
        useThink.setState({ text: "" })
        useHistory.getState().insertChat(current, { role: "assistant", content: data, id: uuidv7() })
    } else {
        alert("Something went wrong")
    }

}