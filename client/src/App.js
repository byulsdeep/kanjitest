import { BrowserRouter, Routes, Route } from "react-router-dom"
import Main from "./views/Main"
import KanjiTest from "./views/KanjiTest"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main/>} />
          <Route path="/kanjitest" element={<KanjiTest/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App