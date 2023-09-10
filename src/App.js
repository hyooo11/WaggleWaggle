import Header from './pages/common/Header';
import Main from './pages/home/Main';
import Footer from './pages/common/Footer';
import "./css/common.css";
import { Routes, Route } from 'react-router-dom';

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
        <Route path="/login" element={<>로그인 페이지</>} />
        <Route path="/join" element={<>회원가입 페이지</>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
