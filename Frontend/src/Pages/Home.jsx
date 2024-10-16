import React from "react";
import Hero from "../Component/Hero";
import LatestCollection from "../Component/LatestCollection";
import BestSellers from "../Component/BestSellers";
import OurPolicy from "../Component/OurPolicy";
import NewsLetter from "../Component/NewsLetter";

function Home() {
  return (
    <div>
      <Hero />
      <LatestCollection />
      <BestSellers />
      <OurPolicy />
      <NewsLetter />
    </div>
  );
}

export default Home;
