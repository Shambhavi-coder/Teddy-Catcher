import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './styles/global.css';
import './styles/game.css';
createRoot(document.getElementById("root")!).render(<App />);
