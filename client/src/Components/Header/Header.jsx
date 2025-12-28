import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef, useState } from "react";
import { IoMenu } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineShoppingBag } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const [toggle, setToggle] = useState(false);
  const headerLinks = useRef(null);
  const items = useSelector((state) => state.bag.items);
  const user = useSelector((store) => store.user.user);

  useGSAP(() => {
    if (!toggle) return;
    gsap.from(headerLinks.current.children, {
      x: -150,
      duration: 2,
      ease: "power4.out",
      stagger: 0.1,
    });
  }, [toggle]);

  const toggleMenu = () => {
    setToggle(!toggle);
  };

  return (
    <>
      <header className="w-full h-16 mx-auto flex flex-col justify-between items-center  px-1 border-b bg-[#1E2021] border-slate-700 fixed z-50 top-0">
        <div className="w-full h-full flex justify-between items-center ">
          <div className="flex gap-x-3 ml-5 items-center ">
            <span>
              <img
                src="/Brand Logo/HasanBites.png"
                alt="Hasan Bites"
                width={67}
                height={67}
              />
            </span>
            <h1 className="text-2xl font-bold mt-1 max-md:text-xl  text-white transition-all duration-150 ease-linear">
              Hasan Bites
            </h1>
          </div>
          <nav className="mr-5 max-sm:hidden">
            {user?.role === "admin" ? (
              <ul className="flex gap-x-12 font-semibold pt-2 max-lg:gap-x-10 text-[1rem] mr-2  ">
                <li className="hover:text-orange-400 hover:border-b border-orange-400 text-white transition-all duration-200 ease-linear">
                  <Link to="/">Home</Link>
                </li>
                <li className="hover:text-orange-400 hover:border-b border-orange-400  text-white transition-all duration-200 ease-linear">
                  <Link to="/menu">Menu</Link>
                </li>
                <li className="hover:text-orange-400 hover:border-b border-orange-400 text-white transition-all duration-200 ease-linear">
                  <Link to="/profile">Profile</Link>
                </li>
                <li className="hover:text-orange-400 hover:border-b border-orange-400 text-white transition-all duration-200 ease-linear">
                  <Link to="/Dashboard">Dashboard</Link>
                </li>
                <li className="relative hover:text-orange-400 text-white transition-all duration-200 ease-linear">
                  <Link to="/cart">
                    <MdOutlineShoppingBag className="sm:text-3xl lg:text-3xl pb-1" />
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {items.length}
                    </div>
                  </Link>
                </li>
              </ul>
            ) : (
              <ul className="flex gap-x-12 font-semibold pt-2 max-lg:gap-x-10 text-[1rem] mr-2  ">
                <li className="hover:text-orange-400 hover:border-b border-orange-400 text-white transition-all duration-200 ease-linear">
                  <Link to="/">Home</Link>
                </li>
                <li className="hover:text-orange-400 hover:border-b border-orange-400  text-white transition-all duration-200 ease-linear">
                  <Link to="/menu">Menu</Link>
                </li>
                <li className="hover:text-orange-400 hover:border-b border-orange-400 text-white transition-all duration-200 ease-linear">
                  <Link to="/profile">Profile</Link>
                </li>
                <li className="relative hover:text-orange-400 text-white transition-all duration-200 ease-linear">
                  <Link to="/cart">
                    <MdOutlineShoppingBag className="sm:text-3xl lg:text-3xl pb-1" />
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {items.length}
                    </div>
                  </Link>
                </li>
              </ul>
            )}
          </nav>
          <div className="sm:hidden">
            {!toggle ? (
              <IoMenu
                className="text-[35px] mr-5 text-white"
                onClick={toggleMenu}
              />
            ) : (
              <RxCross2
                className="text-[35px] mr-5 rotate-360 text-white"
                onClick={toggleMenu}
              />
            )}
          </div>
        </div>
      </header>

      {/* Conditionally Rendered Div */}
      {toggle && (
        <div className="w-full bg-[#2C2F2F] flex flex-col transition-all duration-1000 ease-in-out sm:hidden mt-14 fixed top-0 z-40">
          <nav>
            {user.role === "admin" ? (
              <ul
                className="flex flex-col gap-y-2 font-bold py-3 text-white flex-1"
                ref={headerLinks}
              >
                <li className="hover:text-orange-500 border-b-2 px-7 py-3 w-full hover:bg-[#1E2021]">
                  <Link
                    to="/"
                    onClick={toggleMenu}
                    className="w-full h-full block"
                  >
                    Home
                  </Link>
                </li>
                <li className="hover:text-orange-500 border-b-2 px-7 py-3">
                  <Link
                    to="/menu"
                    onClick={toggleMenu}
                    className="w-full h-full block"
                  >
                    Menu
                  </Link>
                </li>
                <li className="hover:text-orange-500 border-b-2  px-7 py-3">
                  <Link
                    to="/profile"
                    onClick={toggleMenu}
                    className="w-full h-full block"
                  >
                    Profile
                  </Link>
                </li>
                <li className="hover:text-orange-500 border-b-2  px-7 py-3">
                  <Link
                    to="/dashboard"
                    onClick={toggleMenu}
                    className="w-full h-full block"
                  >
                    Dashboard
                  </Link>
                </li>
                <li className="hover:text-orange-500  px-7 py-3">
                  <Link
                    to="/cart"
                    onClick={toggleMenu}
                    className="w-full h-full block"
                  >
                    Cart
                  </Link>
                </li>
              </ul>
            ) : (
              <ul
                className="flex flex-col gap-y-2 font-bold py-3 text-white "
                ref={headerLinks}
              >
                <li className="hover:text-orange-500 border-b-2 px-7 py-3">
                  <Link
                    to="/"
                    onClick={toggleMenu}
                    className="w-full h-full block"
                  >
                    Home
                  </Link>
                </li>
                <li className="hover:text-orange-500 border-b-2 px-7 py-3">
                  <Link
                    to="/menu"
                    onClick={toggleMenu}
                    className="w-full h-full block"
                  >
                    Menu
                  </Link>
                </li>
                <li className="hover:text-orange-500 border-b-2  px-7 py-3">
                  <Link
                    to="/profile"
                    onClick={toggleMenu}
                    className="w-full h-full block"
                  >
                    Profile
                  </Link>
                </li>
                <li className="hover:text-orange-500  px-7 py-3">
                  <Link
                    to="/cart"
                    onClick={toggleMenu}
                    className="w-full h-full block"
                  >
                    Cart
                  </Link>
                </li>
              </ul>
            )}
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;
