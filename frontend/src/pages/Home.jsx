import React from "react";
import Hero from "../components/Hero";
import Departments from "../components/Departments";
import MessageForm from "../components/MessageForm";
import Biography from "../components/Biography";

const Home = () => {
  return (
    <>
      <Hero
        title={
          "Welcome to Swasthya Sanjeevani | Your trusted health care provider"
        }
        imageUrl={"/hero.png"}
      />
      <Biography imageUrl={"/about.png"} alt="about" />
      <Departments />
      <MessageForm />
    </>
  );
};

export default Home;
