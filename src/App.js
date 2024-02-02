import Header from "./pages/common/Header";
import Main from "./pages/home/Main";
import Footer from "./pages/common/Footer";
import Login from "./pages/login";
import Join from "./pages/join";
import "./css/common.css";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route exact path="/" Component={Main} />
        <Route path="/product" element={<>프로덕트 페이지</>} />
        <Route path="/community" element={<>COMMUNITY 페이지</>} />
        <Route path="/qna" element={<>QnA 페이지</>} />
        <Route path="/notice" element={<>NOTICE 페이지</>} />
        <Route path="/auth/login" Component={Login} />
        <Route path="/join" Component={Join} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
