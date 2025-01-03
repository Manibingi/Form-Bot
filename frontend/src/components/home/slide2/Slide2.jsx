import React from "react";
import style from "./slide2.module.css";
import block from "../../../assets/block.png";
import container from "../../../assets/Container.png";

function Slide2() {
  return (
    <>
      <div className={style.slide2}>
        <div className={style.section1}>
          <div className={style.image1}>
            <img src={block} alt="img" />
          </div>
          <div className={style.content1}>
            <div className={style.head1}>Easy building experience</div>
            <div className={style.para1}>
              All you have to do is drag and drop blocks to create your app.
              Even if you have custom needs, you can always add custom code.
            </div>
          </div>
        </div>

        <div className={style.section1}>
          <div className={style.content2}>
            <div className={style.head1}>Embed it in a click</div>
            <div className={style.para1}>
              Embedding your typebot in your applications is a walk in the park.
              Typebot gives you several step-by-step platform- specific
              instructions. Your typebot will always feel "native".
            </div>
          </div>
          <div className={style.image2}>
            <img src={container} alt="img" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Slide2;
