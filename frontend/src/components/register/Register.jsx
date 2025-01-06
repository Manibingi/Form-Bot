import React, { useState } from "react";
import style from "./register.module.css";
import { toast } from "react-toastify";
import google from "../../assets/Google Icon.png";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../services/user.service";

export const Register = () => {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // targetin the multiple input field using name
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  // controling the submit form and connecting the backend services
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const res = await register(registerData);
    if (res.status === 200) {
      setRegisterData({
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      toast("registration Successful");
      navigate("/login");
    } else {
      toast("error");
    }
  };

  return (
    <>
      <div className={style.registerContainer}>
        <div className={style.backBtn}>
          <button type="button" onClick={() => navigate(-1)}>
            <i class="fa-solid fa-arrow-left"></i>
          </button>
        </div>
        <form className={style.registerForms} onSubmit={handleFormSubmit}>
          <div className={style.inputField}>
            <label htmlFor="userName">Username</label>
            <br />
            <input
              type="text"
              name="userName"
              placeholder="Enter Username"
              value={registerData.userName}
              onChange={handleChange}
              className={style.registerInput}
            />
          </div>
          <div className={style.inputField}>
            <label htmlFor="email">Email</label>
            <br />
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={registerData.email}
              onChange={handleChange}
              className={style.registerInput}
            />
          </div>
          <div className={style.inputField}>
            <label htmlFor="password">Password</label>
            <br />
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={registerData.password}
              onChange={handleChange}
              className={style.registerInput}
            />
          </div>
          {registerData.password !== registerData.confirmPassword ? (
            <div className={style.error}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <br />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Enter Password"
                value={registerData.confirmPassword}
                onChange={handleChange}
                className={style.registerInput}
              />
              <p>Password do not match</p>
            </div>
          ) : (
            <div className={style.inputField}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <br />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Enter Password"
                value={registerData.confirmPassword}
                onChange={handleChange}
                className={style.registerInput}
              />
              <div style={{ height: "30px" }}></div>
            </div>
          )}
          <button type="submit" className={style.signupBtn}>
            Sign Up
          </button>
        </form>

        <div className={style.or}>
          OR
          <button type="submit" className={style.signupGoogle}>
            <img src={google} alt="img" />
            Sign Up With Google
          </button>
        </div>

        <div className={style.already}>
          <p>
            Already have an account ? <Link to="/login">Login</Link>
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
