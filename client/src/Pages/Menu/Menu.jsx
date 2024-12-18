import { useGSAP } from "@gsap/react";

import gsap from "gsap";
import React, { useRef } from "react";

const Menu = () => {
  const menu = useRef(null);
  const downloadLinkRef = useRef(null);
  useGSAP(() => {
    gsap.from(menu.current, {
      y: 450,
      duration: 1.5,
      ease: "power2.out",
      opacity: 0,
    });
  });

  const handleDownload = () => {
    // Set the href and download attribute on the hidden link
    downloadLinkRef.current.href = "./Menu/Menu.png";
    downloadLinkRef.current.download = "Menu.png";
    downloadLinkRef.current.click(); // Trigger the click
  };
  return (
    <div className="bg-[#1E2021] w-screen min-h-screen flex justify-center mt-16">
      <div
        className="max-sm:w-10/12 sm:w-3/4 md:w-7/12 lg:w-5/12 h-full flex flex-col gap-4 mt-5"
        ref={menu}
      >
        <button
          onClick={handleDownload}
          className="border h-12 border-orange-500 text-orange-500 font-semibold hover:bg-orange-500 hover:text-white hover:border-slate-600 transition-all ease-in duration-200"
        >
          Download Menu
          <a ref={downloadLinkRef} className="hidden"></a>
        </button>
        <img src="./Menu/Menu.png" alt="" className="w-full h-full" />
      </div>
    </div>
  );
};

export default Menu;
