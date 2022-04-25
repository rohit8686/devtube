import React from "react";
import { ToastContainer } from "react-toastify";
import { Hero } from "../../components/Hero/Hero";
import { Trending } from "../../components/Trending/Trending";

export const Home = () => {
  return (
    <>
      <Hero />
      <Trending />
      <ToastContainer />
    </>
  );
};
