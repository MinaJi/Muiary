import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

function SignupForm() {
  const navi = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { createUser } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await createUser(email, password);
      navi("/");
    } catch (error) {
      setError(error.message);
      console.log(error.message);
    }
  };

  return (
    <>
      <p>SignupForm</p>
      <div>
        <form onSubmit={handleSubmit}>
          <p>이메일</p>
          <input type="email" onChange={(e) => setEmail(e.target.value)} />
          <p>패스워드</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">가입하기</button>
        </form>
      </div>
    </>
  );
}

export default SignupForm;
