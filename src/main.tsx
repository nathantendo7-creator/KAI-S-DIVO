import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import Lenis from '@studio-freight/lenis'

const lenis = new Lenis()

function raf(time: number) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

createRoot(document.getElementById("root")!).render(<App />);

