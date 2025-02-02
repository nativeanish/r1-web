# R1-Web: Run DeepSeek R1 in Your Browser

Run DeepSeek R1 locally in your browser - no downloads, no servers, no GPU required. Pure browser-based inference that works anywhere.

🔗 [Try it now](https://r1-web-test.vercel.app)

## Features

- 🚀 **100% Browser-Based**: Runs entirely in your web browser
- 💻 **No Installation**: No downloads or setup required
- 🔒 **Privacy-First**: All processing happens locally
- 🌐 **Universal Access**: Works on any modern browser
- 💾 **Multiple Models**: Choose from various quantized models:
  - DeepSeek 1.5B Q2_K (753MB)
  - DeepSeek 1.5B Q2_K_L (808MB)
  - DeepSeek 1.5B Q3_K_M (924MB)
  - DeepSeek 1.5B Q4_K_M (1.12GB)
  - DeepSeek 1.5B Q5_K_M (1.29GB)
  - DeepSeek 1.5B Q6_K (1.46GB)
  - DeepSeek 1.5B Q8_0 (1.89GB)

## How It Works

R1-Web uses WebAssembly to run the DeepSeek R1 language model directly in your browser. The application:

1. Downloads the selected model
2. Processes everything locally using your CPU
3. Maintains chat history in browser storage
4. Requires no backend servers or GPU acceleration

## Configuration Options

- **CPU Threads**: Adjust the number of processing threads
- **Context Length**: Configure the context window size
- **Temperature**: Control response randomness
- **Cache**: Enable/disable response caching
- **Chat History**: Save and manage conversation history

## Technical Stack

- React + TypeScript
- Vite
- TailwindCSS
- WebAssembly (via wllama)
- Zustand for state management

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Browser Requirements

- Modern browser with WebAssembly support
- Sufficient RAM (recommended: 4GB+)
- Active internet connection (for initial model download)

## Privacy

All processing happens locally in your browser. No data is sent to external servers, ensuring complete privacy of your conversations.

## License

MIT License

## Acknowledgments

- DeepSeek for the original R1 model
- The wllama project for WebAssembly integration
- All contributors and supporters

---

Made with ❤️ for the open-source AI community
