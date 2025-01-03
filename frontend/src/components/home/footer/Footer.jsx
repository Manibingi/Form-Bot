import React from "react";
import style from "./footer.module.css";
import { Link } from "react-router-dom";
import teams from "../../../assets/teams.png";
import tri3 from "../../../assets/tri3.png";
import UU from "../../../assets/UU.png";
import profile from "../../../assets/profile.png";

function Footer() {
  return (
    <>
      <div className={style.chatContainer}>
        <div className={style.resultsSection}>
          <h1>Collect results in real-time</h1>
          <p>
            One of the main advantage of a chat application is that you collect
            the user's responses on each question.
            <p className={style.highLight}>You won't lose any valuable data.</p>
          </p>
          <div className={style.chatBot}>
            <div className={style.box}>
              <div className={style.image}>
                <img src={profile} alt="profile" />
              </div>
              <div className={style.chat}>
                <p>
                  As you answer this chat, you'll see your result in the real
                  Airtable spreadsheet
                </p>
                <p>You can think of it as a guestbook 😂</p>
                <p>Ready?</p>
              </div>
            </div>
            <div className={style.yeahBtn}>
              <button>Yeah!</button>
            </div>
          </div>
        </div>
      </div>
      <div className={style.moreFeatures}>
        <div className={style.featureHead}>
          <h1>And many more features</h1>
          <p>
            Typebot makes form building easy and comes with powerful features
          </p>
        </div>

        <div className={style.features}>
          <div className={style.one}>
            <div className={style.feature}>
              <button className={style.iconBtn}>
                <i className="fa-solid fa-child-reaching"></i>
              </button>

              <div className={style.textIcon}>
                <h3>Hidden fields</h3>
                <p>
                  Include data in your form URL to segment your user and use its
                  data directly in your form.
                </p>
              </div>
            </div>
            <div className={style.feature}>
              <button className={style.iconBtn}>
                <i className="fa-solid fa-user-plus"></i>
              </button>

              <div className={style.textIcon}>
                <h3>Team collaboration</h3>
                <p>Invite your teammates to work on your typebots with you</p>
              </div>
            </div>
            <div className={style.feature}>
              <button className={style.iconBtn}>
                <i className="fa-solid fa-code-branch"></i>
              </button>

              <div className={style.textIcon}>
                <h3>Link to sub typebots</h3>
                <p>Reuse your typebots in different parent bots.</p>
              </div>
            </div>
          </div>
          <div className={style.two}>
            <div className={style.feature}>
              <button className={style.iconBtn}>
                <i className="fa-solid fa-calculator"></i>
              </button>

              <div className={style.textIcon}>
                <h3>Custom code</h3>
                <p>Customize everything with your own Javascript & CSS code</p>
              </div>
            </div>
            <div className={style.feature}>
              <button className={style.iconBtn}>
                <i className="fa-solid fa-share-nodes"></i>
              </button>

              <div className={style.textIcon}>
                <h3>Custom domain</h3>
                <p>Connect your typebot to the custom URL of your choice</p>
              </div>
            </div>
            <div className={style.feature}>
              <button className={style.iconBtn}>
                <i className="fa-solid fa-folder-open"></i>
              </button>

              <div className={style.textIcon}>
                <h3>Folder management</h3>
                <p>
                  Organize your typebots in specific folders to keep it clean
                  and work with multiple clients
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={style.teams}>
        <h3>Loved by teams and creators from all around the world</h3>
        <img src={teams} alt="teams" />
      </div>
      <div className={style.createFormBot}>
        <div className={style.imageTri}>
          <img src={tri3} alt="" />
        </div>
        <div className={style.textContent}>
          <h2>Improve conversion and user engagement with FormBots </h2>
          <button>Create a FormBot</button>
          <p>
            No trial. Generous <b>free</b> plan.
          </p>
        </div>
        <div className={style.imageCircle}>
          <img src={UU} alt="" />
        </div>
      </div>
      <div className={style.footer}>
        <div className={style.one}>
          <p>
            {" "}
            Made with ❤️ by <br />
            <Link to="#">@cuvette</Link>
          </p>
        </div>
        <div className={style.two}>
          <ul>
            <li>
              <Link>
                Status<i className="fa">&#xf08e;</i>
              </Link>
            </li>
            <li>
              <Link>
                Documentation<i className="fa">&#xf08e;</i>
              </Link>
            </li>
            <li>
              <Link>
                Roadmap<i className="fa">&#xf08e;</i>
              </Link>
            </li>
            <li>
              <Link>
                Pricing<i className="fa">&#xf08e;</i>
              </Link>
            </li>
          </ul>
        </div>
        <div className={style.three}>
          <ul>
            <li>
              <Link>
                Discord<i className="fa">&#xf08e;</i>
              </Link>
            </li>
            <li>
              <Link>
                GitHub repository<i className="fa">&#xf08e;</i>
              </Link>
            </li>
            <li>
              <Link>
                Twitter<i className="fa">&#xf08e;</i>
              </Link>
            </li>
            <li>
              <Link>
                LinkedIn<i className="fa">&#xf08e;</i>
              </Link>
            </li>
            <li>
              <Link>
                OSS Friends<i className="fa">&#xf08e;</i>
              </Link>
            </li>
          </ul>
        </div>
        <div className={style.four}>
          <ul>
            <li>
              <Link>About</Link>
            </li>
            <li>
              <Link>Contact</Link>
            </li>
            <li>
              <Link>Terms of Service</Link>
            </li>
            <li>
              <Link>Privacy Policy</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Footer;
