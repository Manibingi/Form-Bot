import React from "react";
import style from "./platform.module.css";
import email from "./platform_imgs/email.png";
import monkey from "./platform_imgs/monkey.png";
import notion from "./platform_imgs/notion.png";
import wix from "./platform_imgs/wix.png";
import wordpress from "./platform_imgs/wordpress.png";
import calender from "./platform_imgs/calender.png";
import chain from "./platform_imgs/chain.png";
import drive from "./platform_imgs/drive.png";
import mintra from "./platform_imgs/mintra.png";
import shopify from "./platform_imgs/shopify.png";
import cube from "./platform_imgs/cube.png";
import XL from "./platform_imgs/XL.png";
import zapier from "./platform_imgs/zapier.png";
import CC from "./platform_imgs/CC.png";
import salesforce from "./platform_imgs/salesforce.png";

function Platform() {
  return (
    <>
      <div className={style.container}>
        <div className={style.section1}>
          <div className={style.img}>
            <img src={email} alt="email" />
          </div>
          <div className={style.img}>
            <img src={monkey} alt="monkey" />
          </div>
          <div className={style.img}>
            <img src={notion} alt="notion" />
          </div>
          <div className={style.img}>
            <img src={wix} alt="wix" />
          </div>
          <div className={style.img}>
            <img src={wordpress} alt="wordpress" />
          </div>
          <div className={style.img}>
            <img src={calender} alt="calender" />
          </div>
          <div className={style.img}>
            <img src={chain} alt="chain" />
          </div>
          <div className={style.img}>
            <img src={drive} alt="drive" />
          </div>
        </div>
        <div className={style.section2}>
          <div className={style.img}>
            <img src={mintra} alt="mintra" />
          </div>
          <div className={style.img}>
            <img src={shopify} alt="shopify" />
          </div>
          <div className={style.img}>
            <img src={cube} alt="cube" />
          </div>
          <div className={style.img}>
            <img src={XL} alt="xl" />
          </div>
          <div className={style.img}>
            <img src={zapier} alt="zapier" />
          </div>
          <div className={style.img}>
            <img src={CC} alt="CC" />
          </div>
          <div className={style.img}>
            <img src={salesforce} alt="salesforce" />
          </div>
        </div>

        <div className={style.section3}>
          <div className={style.title}>Integrate with any platform</div>
          <div className={style.detail}>
            Typebot offers several native integrations blocks as well as
            instructions on how to embed typebot on particular platforms
          </div>
        </div>
      </div>
    </>
  );
}

export default Platform;
