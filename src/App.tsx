import React, { useEffect, useRef, useState } from "react";
import {
  Send,
  Trash2,
  Brain,
  PlusCircle,
  Settings2,
  User,
  Bot,
  Github,
} from "lucide-react";
import models, { Model } from "./utils/models";
import { loadModel, runLLM, wllama } from "./utils/wllama";
import { Modal } from "./Modal";
import { uuidv7 } from "uuidv7";
import useThink from "../store/useThink";
import useField from "../store/useField";
import useHistory from "../store/useHistory";

export default function App() {
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [loading, setLoading] = useState("");
  const [text, setText] = useState("");
  const thinking = useThink((state) => state.text);
  const cpuCores = useField((state) => state.n_core);
  const setCores = useField((state) => state.set_n_core);
  const context = useField((state) => state.context);
  const setContext = useField((state) => state.set_context);
  const temperature = useField((state) => state.temperature);
  const set_temperature = useField((state) => state.set_temperature);
  const [uuid, setUuid] = useState(uuidv7());
  const setHistory = useHistory((state) => state.setHistory);
  const setCurrent = useHistory((state) => state.setCurrent);
  const history = useHistory((state) => state.history);
  const insertChat = useHistory((state) => state.insertChat);
  const current = useHistory((state) => state.current);
  const set_cache = useField((state) => state.set_cache);
  const getfromLocal = useHistory((state) => state.getFromStorage);
  const deleteFrom = useHistory((state) => state.deleteFromStorage);
  const [tooltip, setTooltip] = useState<string | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatContainerRef]);
  const newChat = (e?: string) => {
    if (e) {
      const data = history.find((f) => f.id === e);
      if (data) {
        setUuid(data.id);
        setCurrent(data.id);
        set_chat([]);
        set_chat(data.chat);
      }
    } else {
      setUuid(uuidv7());
      set_chat([]);
    }
  };
  const [chat, set_chat] = useState<
    {
      role: "user" | "assistant";
      content: string;
      id: string;
    }[]
  >([]);
  useEffect(() => {
    const data = history.find((e) => e.id == current);
    if (data) {
      set_chat(data.chat);
    }
  }, [history, current]);
  useEffect(() => {
    async function loaded(model: Model) {
      await loadModel(model, setLoading);
    }
    if (selectedModel.length > 0) {
      const _model = models.find((e) => e.id === selectedModel);
      if (_model) {
        loaded(_model);
      }
    }
  }, [selectedModel]);
  useEffect(() => {
    setCurrent(uuid);
  });
  useEffect(() => {
    getfromLocal();
  }, []);
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!wllama.isModelLoaded() && !selectedModel.length) {
      alert("Model not Loaded, Select the Model to interact");
      return;
    }
    if (!wllama.isModelLoaded() && selectedModel.length) {
      alert("Wait for 10 Second to load the Model");
      return;
    }
    const his = history.find((e) => e.id === uuid);
    if (!his) {
      setHistory({ id: uuid, title: text, chat: [] });
    }
    insertChat(current, { role: "user", content: text, id: uuidv7() });
    runLLM().then(console.log).catch(console.error);
    setText("");
  };
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100 ">
      <Modal isOpen={loading.length > 0} content={loading} />
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 ">
        <div className="container mx-auto flex h-14 items-center px-4 lg:px-8">
          <div className="flex items-center space-x-2">
            <Brain className="text-blue-400" />
            <span className="font-semibold text-slate-800 ">r1-web</span>
          </div>
          {/* Right side content */}
          <div className="ml-auto flex items-center gap-3 px-4 py-2.5 bg-black/80 backdrop-blur-sm border border-gray-800 rounded-lg shadow-lg">
            <a
              href="https://github.com/nativeanish/r1-web"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-white hover:text-gray-200 transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>r1-web</span>
            </a>
          </div>
        </div>
      </header>

      <div className="flex-1 container mx-auto py-6 px-4 lg:px-8 flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full lg:w-64 flex flex-col gap-4">
          <button
            className="w-full flex items-center justify-start gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
            onClick={() => newChat()}
            disabled={thinking.length ? true : false}
          >
            <PlusCircle className="h-4 w-4" />
            New Chat
          </button>
          {history.length > 0 &&
            history.map((e, i) => (
              <div key={i}>
                <div className="bg-white rounded-lg shadow-sm p-3">
                  <div className="flex items-center justify-between group cursor-pointer hover:bg-slate-100 rounded p-2 transition-colors w-full">
                    <span
                      className="text-sm truncate text-slate-800 flex-1"
                      onClick={() => newChat(e.id)}
                      onMouseEnter={() => setTooltip(e.title)}
                      onMouseLeave={() => setTooltip(null)}
                    >
                      {e.title}
                      {tooltip === e.title && (
                        <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded shadow-lg">
                          {e.title}
                        </div>
                      )}
                    </span>
                    <div className="relative">
                      <Trash2
                        className="h-4 w-4 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity ml-2"
                        onClick={() => {
                          if (history.length === 1) {
                            set_chat([]);
                          }
                          deleteFrom(e.id);
                        }}
                        aria-disabled={thinking.length ? true : false}
                        onMouseEnter={() => setTooltip(`delete-${e.id}`)}
                        onMouseLeave={() => setTooltip(null)}
                      />
                      {tooltip === `delete-${e.id}` && (
                        <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded shadow-lg">
                          Delete Chat
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2">
                <Settings2 className="h-4 w-4 text-slate-500" />
                <select
                  className="bg-white border border-slate-300 rounded px-2 py-1 text-sm text-slate-800"
                  onChange={(e) => console.log(e)}
                  disabled={selectedModel.length > 0}
                >
                  <option>Select model</option>
                  {models.map((model) => (
                    <option
                      key={model.id}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center justify-between"
                      onClick={() => {
                        setSelectedModel(model.id);
                      }}
                    >
                      {model.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-700">Threads: </span>
                <input
                  type="number"
                  className="w-20 bg-white border border-slate-300 rounded px-2 py-1 text-sm text-slate-800"
                  value={cpuCores}
                  onChange={(e) => setCores(Number(e.target.value))}
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-700 whitespace-nowrap">
                  Temp:{" "}
                </span>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.1"
                    value={temperature}
                    onChange={(e) => set_temperature(Number(e.target.value))}
                    className="w-32 accent-blue-500"
                  />
                  <span className="text-sm w-12 text-right text-slate-800">
                    {temperature.toFixed(1)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-700">Context: </span>
                <input
                  type="number"
                  className="w-20 bg-white border border-slate-300 rounded px-2 py-1 text-sm text-slate-800"
                  value={context}
                  onChange={(e) => setContext(Number(e.target.value))}
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-700">Enable Cache</span>
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-blue-500"
                  onChange={(e) => set_cache(e.target.checked)}
                />
              </div>
            </div>
          </div>
          <div
            ref={chatContainerRef}
            className="flex-1 rounded-lg bg-white/50 backdrop-blur-sm border border-slate-200 p-4 overflow-y-auto"
            style={{ maxHeight: "calc(100vh - 300px)" }}
          >
            <div className="space-y-4">
              {chat.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex items-start gap-2 max-w-[80%] ${
                      message.role === "user" ? "flex-row-reverse" : ""
                    }`}
                  >
                    <div
                      className={`rounded-full p-2 ${
                        message.role === "user" ? "bg-blue-500" : "bg-slate-200"
                      }`}
                    >
                      {message.role === "user" ? (
                        <User className="h-4 w-4 text-white" />
                      ) : (
                        <Bot className="h-4 w-4 text-slate-600" />
                      )}
                    </div>
                    <div
                      className={`rounded-lg p-3 ${
                        message.role === "user"
                          ? "bg-blue-500 text-white"
                          : "bg-slate-200 text-slate-800"
                      }`}
                    >
                      {message.role === "user" &&
                        message.content.split("\n").map((line, i) => (
                          <React.Fragment key={i}>
                            {line
                              .split(/(<think>[\s\S]*?<\/think>)/g)
                              .map((part, j) =>
                                part.startsWith("<think>") &&
                                part.endsWith("</think>") ? (
                                  <span key={j} className="text-yellow-400">
                                    {part.replace(/<\/?think>/g, "").trim()}
                                  </span>
                                ) : (
                                  <React.Fragment key={j}>
                                    {part.trim()}
                                  </React.Fragment>
                                )
                              )}
                            {i !== message.content.split("\n").length - 1 && (
                              <br />
                            )}
                          </React.Fragment>
                        ))}
                      {message.role === "assistant" && (
                        <Split message={message.content} />
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {thinking && thinking.length > 0 && (
                <div className="flex justify-start">
                  <div className="flex items-start gap-2 max-w-[80%]">
                    <div className="rounded-full p-2 bg-slate-200 flex flex-col space-x-2">
                      <Bot className="h-4 w-4 text-slate-600" />
                      {thinking}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <form onSubmit={submit} className="relative">
            <input
              type="text"
              placeholder="Type your message..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2 pr-10 text-slate-800 placeholder-slate-400"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-1.5 transition-colors"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function Split({ message }: { message: string }) {
  const match = message.match(/<think>(.*?)<\/think>\s*(.*)/s);
  const thinkPart = match ? match[1].trim() : ""; // Content inside <think>
  const secondPart = match ? match[2].trim() : ""; // Content after </think>
  return (
    <div className="bg-white text-black p-2">
      {thinkPart.length && thinkPart && (
        <div className="bg-blue-400 text-white p-4 italic">{thinkPart}</div>
      )}
      {secondPart}
    </div>
  );
}
