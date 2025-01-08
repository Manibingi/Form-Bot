import React, { useEffect, useState } from "react";
import style from "./login.module.css";
import { toast } from "react-toastify";
import google from "../../assets/Google Icon.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import { login } from "../../services/user.service";

export const Login = () => {
  const apiUrl = import.meta.env.VITE_API_URI;
  const navigate = useNavigate();
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData({ ...loginFormData, [name]: value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the form data to the backend
      const response = await axios.post(
        `${apiUrl}/api/auth/login`,
        loginFormData
      );
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        toast.success("Login Successful", {
          duration: 4000,
          position: "top-right",
        });
        navigate("/folder");
        toast.success(response.data.message, {
          duration: 4000,
          position: "top-right",
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Login failed!");
    }
  };

  // if user already logged in, then automatically it open the home page
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      toast.success("User Already logged in", {
        duration: 4000,
        position: "top-right",
      });
      navigate("/folder");
    }
  }, []);

  return (
    <>
      <div className={style.loginContainer}>
        <div className={style.backBtn}>
          <button type="button" onClick={() => navigate(-1)}>
            <i class="fa-solid fa-arrow-left"></i>
          </button>
        </div>
        <form className={style.loginForms} onSubmit={handleLoginSubmit}>
          <div className={style.inputField}>
            <label htmlFor="email">Email</label>
            <br />
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={loginFormData.email}
              onChange={handleChange}
              className={style.loginInput}
            />
          </div>
          <div className={style.inputField}>
            <label htmlFor="password">Password</label>
            <br />
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={loginFormData.password}
              onChange={handleChange}
              className={style.loginInput}
            />
          </div>
          <button type="submit" className={style.signinBtn}>
            Sign In
          </button>
        </form>

        <div className={style.or}>
          OR
          <button type="submit" className={style.signinGoogle}>
            <img src={google} alt="img" />
            Sign In With Google
          </button>
        </div>

        <div className={style.dont}>
          <p>
            Don't have an account ? <Link to="/register">Register Now</Link>
          </p>
        </div>
        <div className={style.semicircle}></div>
        <div className={style.semicircle2}></div>
        <div className={style.tri1}></div>
        <div className={style.tri2}></div>
      </div>
    </>
  );
};
