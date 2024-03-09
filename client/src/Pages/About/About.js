import React, { useState } from "react";
import Typewriter from "typewriter-effect";
import Chat from "../../Components/Chat/Chat";
import "./About.css"
import Navbar from "../../Components/Navbar/Navbar";

function About() {
  const [state] = useState({
    title: "Hello everyone",
    titleTwo: "Contact us for"
  });

  return (


    <>
      <Navbar />
      <Chat />

      <div className="home">

        <div className="home-intro" id="content-div">
          <h2>
            <div className="title">{state.title}</div>
          </h2>
          <h2>
            <div className="titleTwo ">{state.titleTwo}</div>
          </h2>

          <div className="text">
            <Typewriter
              options={{
                autoStart: true,
                loop: true,
                delay: 40,
                strings: [
                  "Web App Development",
                  "UX/UI Design",
                  "Full-stack Development",
                  "Your DREAM project"
                ],
              }}
            />
          </div>
        </div>

        <div className="pic-part">
          <div>
            <img src="Deeptirtha.jpeg" alt="" className="pro-img" />
            <h3 className="tex deep">Deeptirtha Mukherjee</h3>
            <div className="ico">
              <a href="https://mail.google.com/mail/u/0/?tab=rm#inbox"><i class="fa-regular fa-envelope"></i></a>
              <a href="https://www.linkedin.com/in/deeptirtha-mukherjee-7b5040249/"><i className="fa-brands fa-linkedin-in ic-chnage" /></a>
              <a href="https://www.instagram.com/dee_tirtha/"><i className="fa-brands fa-instagram  ic-chnage" /></a>
              <a href="https://chat.whatsapp.com/JIZN0tnffpKCFBMfQ2QScU"><i class="fa-brands fa-whatsapp"></i></a>
             
            </div>

          </div>

          <div>
            <img src="aman.png" alt="" className="pro-img" />
            <h3 className="tex aman">Aman Prajapat</h3>
            <div className="ico">
              <a href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#sent?compose=GTvVlcSBmlxrdltbdcsgPXTFglmhWDMwSjzMjsfNvhLpCmNgMBbLFzxgCwzDKxffvdPRvlrLLLvbW"><i class="fa-regular fa-envelope"></i></a>
              <a href="https://www.linkedin.com/in/aman-prajapat-249a53225"><i className="fa-brands fa-linkedin-in ic-chnage" /></a>
              <a href="https://instagram.com/amanprajapat08278?igshid=ZDdkNTZiNTM="><i className="fa-brands fa-instagram  ic-chnage" /></a>
              <a href="https://chat.whatsapp.com/JIZN0tnffpKCFBMfQ2QScU"><i class="fa-brands fa-whatsapp"></i></a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
