import React from "react";

const Form = () => {
  return (
    <div className="formWrapper">
      <img
        className="homePageLogo"
        src="./code-wise-logo.png"
        alt="code-wise-logo"
      ></img>
      <h4 className="mainLabel">Enter Details To Join ROOM</h4>
      <input className="homeInput" placeholder="ROOM ID"></input>
      <input className="homeInput" placeholder="USERNAME"></input>
      <button className="btn joinBtn">JOIN</button>
      <span className="createRoomInfo">Want to create a new ROOM? </span>
      <a href="" className="createNewRoomBtn">
        Click Here
      </a>
    </div>
  );
};

export default Form;
