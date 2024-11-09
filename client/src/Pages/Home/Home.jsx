import React from "react";
import LeftPortion from "./LeftPortion";
import Rightportion from "./Rightportion";
import ExploreMenu from "./ExploreMenu";

const Home = () => {
  return (
    <main className="w-screen min-h-screen bg-[#1E2021]  ">
      <section className="w-screen sm:h-[85vh] md:h-screen bg-[#1E2021] border-b-2 border-slate-600">
        <LeftPortion />
        <Rightportion />
      </section>
      <section className="w-screen max-sm:min-h-[80vh] min-h-96 bg-[#1E2021] p-5 pt-10">
        <ExploreMenu />
      </section>
    </main>
  );
};

export default Home;
