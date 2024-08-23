import React from "react";

function Bio({ imageUrl }) {
  return (
    <div className="container biography">
      <div className="banner">
        <img src={imageUrl} alt="AboutUs" />
      </div>
      <div className="banner">
        <p className="aboutus">About Us</p>
        <p>Who We Are</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
          officiis beatae numquam doloremque facilis in laudantium, odit
          mollitia id quas delectus culpa unde vel hic? Repellendus assumenda
          porro itaque sit inventore, saepe voluptas nesciunt recusandae hic
          mollitia laboriosam beatae pariatur ducimus reiciendis suscipit culpa,
          provident omnis soluta. Blanditiis, vero commodi.
        </p>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
        <p>Lorem ipsum dolor sit amet.</p>
      
      </div>
    </div>
  );
}

export default Bio;
