import { BrowserRouter, Routes, Route } from "react-router-dom"
import Main from "./views/Main"
import KanjiTest from "./views/KanjiTest"
import Admin from "./views/Admin"
import Login from "./views/Login"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/kanjitest" element={<KanjiTest />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App