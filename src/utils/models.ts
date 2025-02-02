export interface Model {
    id: string;
    name: string;
    installed: boolean;
    size: string;
    url: string;
    date?: string,
    data?: Blob
};

const models: Model[] = [
    {
        id: "DeepSeek-R1-Distill-Qwen-1.5B-Q2_K",
        name: "DeepSeek 1.5B Q2_K (753MB) ",
        installed: false,
        size: "752880000",
        url: "https://huggingface.co/unsloth/DeepSeek-R1-Distill-Qwen-1.5B-GGUF/resolve/main/DeepSeek-R1-Distill-Qwen-1.5B-Q2_K.gguf",
    },
    {
        id: "DeepSeek-R1-Distill-Qwen-1.5B-Q2_K_L",
        name: "DeepSeek 1.5B Q2_K_L (808MB)",
        installed: false,
        size: "807576960",
        url: "https://huggingface.co/unsloth/DeepSeek-R1-Distill-Qwen-1.5B-GGUF/resolve/main/DeepSeek-R1-Distill-Qwen-1.5B-Q2_K_L.gguf",
    },
    {
        id: "DeepSeek-R1-Distill-Qwen-1.5B-Q3_K_M",
        name: "DeepSeek 1.5B Q3_K_M (924MB)",
        installed: false,
        size: "924455808",
        url: "https://huggingface.co/unsloth/DeepSeek-R1-Distill-Qwen-1.5B-GGUF/resolve/main/DeepSeek-R1-Distill-Qwen-1.5B-Q3_K_M.gguf",
    },
    {
        id: "DeepSeek-R1-Distill-Qwen-1.5B-Q4_K_M",
        name: "DeepSeek 1.5B Q4_K_M (1.12GB)",
        installed: false,
        size: "1117320576",
        url: "https://huggingface.co/unsloth/DeepSeek-R1-Distill-Qwen-1.5B-GGUF/resolve/main/DeepSeek-R1-Distill-Qwen-1.5B-Q4_K_M.gguf",
    },
    {
        id: "DeepSeek-R1-Distill-Qwen-1.5B-Q5_K_M",
        name: "DeepSeek 1.5B Q5_K_M (1.29GB)",
        installed: false,
        size: "1285494144",
        url: "https://huggingface.co/unsloth/DeepSeek-R1-Distill-Qwen-1.5B-GGUF/resolve/main/DeepSeek-R1-Distill-Qwen-1.5B-Q5_K_M.gguf",
    },
    {
        id: "DeepSeek-R1-Distill-Qwen-1.5B-Q6_K",
        name: "DeepSeek 1.5B Q6_K (1.46GB)",
        installed: false,
        size: "1464178560",
        url: "https://huggingface.co/unsloth/DeepSeek-R1-Distill-Qwen-1.5B-GGUF/resolve/main/DeepSeek-R1-Distill-Qwen-1.5B-Q6_K.gguf",
    },
    {
        id: "DeepSeek-R1-Distill-Qwen-1.5B-Q8_0",
        name: "DeepSeek 1.5B Q8_0 (1.89GB)",
        installed: false,
        size: "1894531968",
        url: "https://huggingface.co/unsloth/DeepSeek-R1-Distill-Qwen-1.5B-GGUF/resolve/main/DeepSeek-R1-Distill-Qwen-1.5B-Q8_0.gguf",
    },
];

export default models