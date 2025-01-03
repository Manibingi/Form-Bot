import React from "react";
import style from "./slide1.module.css";
import wrong from "../../../assets/wrong.png";
import right from "../../../assets/right.png";
import welcome from "../../../assets/welcome.gif";

function Slide1() {
  return (
    <>
      <div className={style.slide1}>
        <div className={style.replace}>
          <p>Replace your old school forms with</p>
          <p>chatbots</p>
        </div>
        <div className={style.para}>
          Typebot is a better way to ask for information. It leads to an
          increase in customer satisfaction and retention and multiply by 3
          <p>your conversion rate compared to classical forms.</p>
        </div>
      </div>

      <div className={style.section}>
        <div className={style.formSection}>
          <div className={style.wrong}>
            <img src={wrong} alt="wrong" />
          </div>

          <form className={style.inputField}>
            <div className={style.forms}>
              <label htmlFor="fullName">
                Full Name<span>*</span>
              </label>
              <br />
              <input type="text" placeholder="Full Name" />
            </div>
            <div className={style.forms}>
              <label htmlFor="email">
                Email<span>*</span>
              </label>{" "}
              <br />
              <input type="email" placeholder="Email" />
            </div>
            <div className={style.CheckBoxes}>
              <h2>
                What services are you interested in? <span>*</span>
              </h2>
              <div className={style.checkbox}>
                <input
                  type="checkbox"
                  id="webdev"
                  className={style.check}
                  required
                />
                <label htmlFor="webdev">Website Dev</label>
              </div>
              <div className={style.checkbox}>
                <input type="checkbox" required className={style.check} />
                <label>Content Marketing</label>
              </div>
              <div className={style.checkbox}>
                <input type="checkbox" required className={style.check} />
                <label>Social Media</label>
              </div>
              <div className={style.checkbox}>
                <input type="checkbox" required className={style.check} />
                <label>UX/UI Design</label>
              </div>
            </div>
            <div className={style.forms}>
              <label htmlFor="info">
                Additional Information<span>*</span>
              </label>
              <br />
              <textarea placeholder="Additional Information"></textarea>
            </div>
            <div className={style.submit}>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>

        <div className={style.nextSection}>
          <div className={style.right}>
            <img src={right} alt="right" />
          </div>
          <div className={style.welcomeSection}>
            <div className={style.welcome}>
              Welcome to <span>AA</span> (Awesome Agency)
            </div>
            <div className={style.gif}>
              <img src={welcome} alt="welcome" />
            </div>
            <div className={style.hi}>
              <button>Hi!</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Slide1;
