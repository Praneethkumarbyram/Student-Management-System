import React from "react";
import graph from "../assets/graph (1).png";


function Hero({title,dec,imageUrl}) {
  return (
    <>
      <div className="hero container">
        <div className="banner">
          <h1><p className="titl">{title}</p>
          <p className="dec">{dec}</p>
          </h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci
            quod molestias vero repellendus corporis labore. Labore impedit
            tempore voluptatum quod saepe beatae sequi, eligendi obcaecati
            dolore similique vel error illum!
          </p>
          <div className="btngroup">
          <button className="readmore">Read More</button>
          <button className="started">Get Started</button>
          </div>
        </div>
        <div className="banner">
          <img src={imageUrl} alt="hero" className="animated-image"/>
          <span>
            <img src={graph} alt="" />
          </span>
        </div>
      </div>
    </>
  );
}

export default Hero;
