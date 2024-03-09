import React from "react";
import { DefaultPlayer as Video } from "react-html5video";
import "react-html5video/dist/styles.css";
import "./Video.css";


function Videoplay({ videodata }) {
  return (
    <div className="vid-body">
      {videodata.map((item) => {
        return (
          <div className="every-vid">
            <div className="video-container">
              <Video
                style={{ width: "20rem", height: "20rem" }}
                controls={["PlayPause", "Seek", "Time", "Volume", "Fullscreen"]}
                poster={item.image}
              >
                <source
                  src={item.video}
                  type="video/webm"
                  className="main-vi"
                />
              </Video>

              <div className="side">

                <div className="dpAndtitleBox">
                  <div className="dpBox">
                    <img src={item.userId.profileImage} id="dp" alt="err" />
                  </div>
                  <div className="likedivvv">
                    <p>{item.title}</p>
                  </div>
                </div>


                <div className="likediv">
                  <div className="like"><i class="fa-regular fa-thumbs-up"></i>{Math.ceil(Math.random() * 10)}k</div>
                  <div className="view">
                    {Math.ceil(Math.random() * 100)}k viewes
                  </div>

                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Videoplay;
