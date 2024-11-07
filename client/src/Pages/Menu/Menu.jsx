import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef } from "react";

const Menu = () => {
  const menu = useRef(null);
  useGSAP(() => {
    gsap.from(menu.current, {
      y: 450,
      duration: 1.5,
      ease: "power2.out",
      opacity: 0,
    });
  });
  return (
    <div className="bg-slate-800 w-screen min-h-screen flex justify-center">
      <div className="w-1/2 h-full" ref={menu}>
        <img src="./Menu/Menu.png" alt="" className="w-full h-full" />
      </div>
    </div>
  );
};

export default Menu;
