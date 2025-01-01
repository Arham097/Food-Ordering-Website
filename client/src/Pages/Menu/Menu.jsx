import { useGSAP } from "@gsap/react";

import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import axiosInstance from "../../Config/axios";
import toast from "react-hot-toast";

const Menu = () => {
  const menu = useRef(null);
  const downloadLinkRef = useRef(null);
  const [menuUrl, setMenuUrl] = useState("");
  useGSAP(() => {
    gsap.from(menu.current, {
      y: 450,
      duration: 1.5,
      ease: "power2.out",
      opacity: 0,
    });
  });

  useEffect(() => {
    fetchMenu();
  }, [menuUrl]);

  const fetchMenu = async () => {
    try {
      const response = await axiosInstance.get("/menu/getMenu");
      const menuUrl = response.data.data.menu[0].url;
      setMenuUrl(menuUrl);
      if (menu.current) {
        menu.current.src = menuUrl;
      }
    } catch (error) {
      console.error("Failed to fetch menu:", error);
    }
  };

  const handleDownload = async () => {
    if (menuUrl) {
      try {
        // Create a blob URL
        const response = await fetch(menuUrl);
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);

        // Create a temporary link and trigger the download
        const tempLink = document.createElement("a");
        tempLink.href = blobUrl;
        tempLink.download = "Menu.png";
        tempLink.click();

        // Revoke the blob URL to free memory
        URL.revokeObjectURL(blobUrl);
      } catch (error) {
        toast.error("Failed to download menu");
      }
    } else {
      toast.error("Menu URL is not available");
    }
  };

  return (
    <div className="bg-[#1E2021] w-screen min-h-screen flex justify-center mt-16 pb-10">
      <div className="max-sm:w-10/12 sm:w-3/4 md:sw-7/12 lg:w-5/12 h-full flex flex-col gap-4 mt-5">
        <button
          onClick={handleDownload}
          className="border h-12 border-orange-500 text-orange-500 font-semibold hover:bg-orange-500 hover:text-white hover:border-slate-600 transition-all ease-in duration-200"
        >
          Download Menu
          <a ref={downloadLinkRef} className="hidden"></a>
        </button>
        <img
          ref={menu}
          src="./Menu/Menu.png"
          alt=""
          className="w-full h-full"
        />
      </div>
    </div>
  );
};

export default Menu;
