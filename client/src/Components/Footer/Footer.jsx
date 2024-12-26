import React from "react";

const Footer = () => {
  return (
    <footer className="w-full relative bottom-0 h-fit flex flex-col  ">
      <div className="w-full h-4/5 bg-[#EA580C] flex justify-center items-center gap-x-5 max-sm:h-fit">
        <div className="h-full w-fit flex items-center mt-1 max-sm:w-full">
          <img
            src="/Brand Logo/HasanBites.png"
            alt="Hasan Bites"
            width={200}
            height={200}
          />
        </div>
        <div className="max-sm:flex-col max-md:flex-col flex gap-x-4">
          <div className="flex flex-col gap-2 h-full w-72 lg:mt-5 max-sm:mt-2  max-sm:w-[55vw] max-sm:mr-5 sm:mt-3">
            <h1 className="max-sm:text-xl font-bold text-white border-b-2 w-fit sm:text-xl lg:text-2xl">
              Hasan Bites
            </h1>
            <p className="text-white text-justify italic max-sm:text-sm">
              Hasan Bites is a food delivery service that delivers food at your
              doorstep. We provide a variety of food items to our customers.
            </p>
          </div>
          <div className="h-full flex flex-col lg:ml-5 lg:mt-5 max-sm:mt-2 max-sm:mb-2 max-sm:mr-5 sm:mb-3 max-lg:ml-5 max-md:ml-0  sm:mt-2">
            <h1 className="text-white lg:text-2xl font-bold w-fit max-sm:text-xl border-b-2 sm:text-xl ">
              Contact Us
            </h1>
            <p className="text-white max-sm:text-sm max-sm: mt-1 ">
              Phone: <span className="italic">0310-2647209</span>
            </p>
            <p className="text-white max-sm:text-sm">
              Email: <span className="italic">arhamhasan70@gmail.com</span>{" "}
            </p>
          </div>
        </div>
      </div>
      <div className="w-full h-1/5 text-white bg-[#2f2c2c] max-sm:h-fit">
        <p className="text-center py-3 max-sm:text-xs px-3">
          Copyright &copy; {new Date().getFullYear()} Hasan Bites. All Rights
          Reserved. Developed by{" "}
          <span className="text-orange-300 underline italic">
            <a href="https://github.com/Arham097">Syed Arham Hasan</a>
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
