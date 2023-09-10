import { useState } from "react";
import { useSelector } from "react-redux"

const Login = () => {
   const [id, setId] = useState("");
   const [password, setPassword] = useState("");

   const onIdHandler = (event) => {
      setId(event.currentTarget.value);
   }
   const onPasswordHandler = (event) => {
      setPassword(event.currentTarget.value);
   }

   let a = useSelector((state) => { return state })
   console.log(a)


   return (
      <>
         <h2>로그인</h2>
         <form>
            <label htmlFor="userId">아이디</label>
            <input type="text" id="userId" name="userId" onChange={onIdHandler} />
            <label htmlFor="userPassword">비밀번호</label>
            <input type="password" id="userPassword" name="userPassword" onChange={onPasswordHandler}></input>
            <button>로그인</button>
         </form>
      </>
   )

}

export default Login;