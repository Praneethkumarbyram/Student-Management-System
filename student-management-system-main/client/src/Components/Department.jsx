import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import contest from "../assets/contest.jpg";
import community from "../assets/community.jpg";
import courses from "../assets/cources.jpg";
import profile from '../assets/profille.png';
const Departments = () => {
  const departmentsArray = [
    {
      name: "Contests",
      imageUrl:contest,
    },
    {
      name: "community",
      imageUrl:community,
    },
    {
      name: "Cources",
      imageUrl:courses,
    },
    {
      name: "Profile Tracker",
      imageUrl:profile,
    }
  ];

  const responsive = {
    extraLarge: {
      breakpoint: { max: 3000, min: 1324 },
      items: 4,
      slidesToSlide: 1, // optional, default to 1.
    },
    large: {
      breakpoint: { max: 1324, min: 1005 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    medium: {
      breakpoint: { max: 1005, min: 700 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    small: {
      breakpoint: { max: 700, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <>
      <div className="container departments">
        <h2>Key Features of the Student Hub</h2>
        <Carousel
          responsive={responsive}
          removeArrowOnDeviceType={[
            // "superLargeDesktop",
            // "desktop",
            "tablet",
            "mobile",
          ]}
        >
          {departmentsArray.map((depart, index) => {
            return (
              <div key={index} className="card">
            
                <img src={depart.imageUrl} alt="image" />
                <div className="depart-name">{depart.name}</div>
              </div>
            );
          })}
        </Carousel>
      </div>
    </>
  );
};

export default Departments;