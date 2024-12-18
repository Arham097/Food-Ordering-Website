import { useGSAP } from "@gsap/react";
import { Button } from "@mui/material";
import gsap from "gsap";
import React, { useRef } from "react";
import { Link } from "react-router-dom";

const LeftPortion = () => {
  const left = useRef(null);
  useGSAP(() => {
    const children = gsap.utils.toArray(left.current.children);
    gsap.from(children, {
      opacity: 0,
      stagger: 0.3,
      duration: 1.2,
      y: 100,
      ease: "power4.out",
    });
  }, []);
  return (
    <div
      className=" max-sm:w-screen max-sm:h-screen sm:h-screen md:h-[80vh]  sm:w-screen md:w-[32rem] h-96 max-sm:p-12 sm:p-12 flex flex-col  gap-6 text-white md:absolute md:left-[3%] md:top-[25%] md:p-4 md:z-20"
      ref={left}
    >
      <div className="max-sm:text-6xl font-semibold  sm:text-6xl md:text-[3.4rem] max-lg:text-[3.8rem]">
        Drink, Food & Enjoy with Your family.
      </div>
      <div className="font-semibold sm:text-xl md:text-sm w-2/3">
        We have a proper passion for cooking. Love is the secret ingredient that
        makes all oir meals taste better and magical.
      </div>
      <Link to="/menu">
        <Button
          variant="contained"
          size="large"
          sx={{
            backgroundColor: "orangered",
            fontWeight: "bold",
            fontFamily: "Poppins",
            position: "relative",
            width: "fit-content",
          }}
        >
          Discover Menu
        </Button>
      </Link>
    </div>
  );
};

export default LeftPortion;
