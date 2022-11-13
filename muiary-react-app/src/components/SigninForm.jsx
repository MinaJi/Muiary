import { async } from "@firebase/util";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

function SigninForm() {
  const navi = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { signIn } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signIn(email, password);
      navi("/");
    } catch (error) {
      setError(true);
    }
  };

  return (
    <>
      <p>Login</p>
      <form onSubmit={handleSubmit}>
        이메일
        <input type="email" onChange={(e) => setEmail(e.target.value)} />
        패스워드
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">로그인</button>
        {error && <span>이메일이나 비번이 틀렸습니다.</span>}
      </form>
    </>
  );
}

export default SigninForm;
