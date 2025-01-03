import React from "react";
import style from "./header.module.css";
import logo from "../../../assets/image copy.png";
import { useNavigate } from "react-router-dom";
import formImg from "../../../assets/home1.png";
import Slide1 from "../slide1/Slide1";
import Slide2 from "../slide2/Slide2";
import Platform from "../platform/Platform";
import Footer from "../footer/Footer";

export const Header = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className={style.homeContainer}>
        <div className={style.header}>
          <div className={style.logo}>
            <img src={logo} alt="logo" />
          </div>
          <div className={style.headerBtns}>
            <div className={style.signin}>
              <button onClick={() => navigate("/login")}>Sign In</button>
            </div>
            <div className={style.create}>
              <button onClick={() => navigate("/login")}>
                Create a FormBot
              </button>
            </div>
          </div>
        </div>

        <div className={style.body}>
          <div className={style.heading}>Build advanced chatbots visually</div>
          <div className={style.para}>
            Typebot gives you powerful blocks to create unique chat experiences.
            Embed them anywhere on your web/mobiles apps and start collecting
            results like magic.
          </div>
          <div className={style.createFree}>
            <button onClick={() => navigate("/login")}>
              Create a FormBot for free
            </button>
          </div>
        </div>
        <div className={style.formImg}>
          <img src={formImg} />
        </div>

        <div className={style.slide1Container}>
          <Slide1 />
        </div>

        <div className={style.slide2Container}>
          <Slide2 />
        </div>

        <div className={style.platform}>
          <Platform />
        </div>

        <div className={style.footer}>
          <Footer />
        </div>
      </div>
    </>
  );
};
