import ReactDOM from 'react-dom/client'
import App from './app/App.tsx'
import './index.css'
import { WebsocketProvider } from './providers/WebsocketProvider/WebsocketProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <WebsocketProvider>
    <App />
  </WebsocketProvider>
)
