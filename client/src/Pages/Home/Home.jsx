import React, { useEffect } from "react";
import LeftPortion from "./LeftPortion";
import Rightportion from "./Rightportion";
import ExploreMenu from "./ExploreMenu";
import { useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1)); // Remove the '#' from the hash
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <main className="w-screen min-h-screen bg-[#1E2021]  ">
      <section className="w-screen sm:h-[85vh] md:h-screen bg-[#1E2021] border-b-2 border-slate-600">
        <LeftPortion />
        <Rightportion />
      </section>
      <section
        id="explore-section"
        className="w-screen max-sm:min-h-[80vh] min-h-96 bg-[#1E2021] p-5 pt-10"
      >
        <ExploreMenu />
      </section>
    </main>
  );
};

export default Home;
