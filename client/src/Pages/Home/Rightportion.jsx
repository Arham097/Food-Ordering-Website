import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef } from "react";

const Rightportion = () => {
  const right = useRef(null);
  const avatars = [
    { id: 1, src: "./Customers/person1.jpg", alt: "User 1" },
    { id: 2, src: "./Customers/person2.JPG", alt: "User 2" },
    { id: 3, src: "./Customers/person3.JPG", alt: "User 3" },
    { id: 4, src: "./Customers/person4.JPG", alt: "User 4" },
  ];
  useGSAP(() => {
    const children = gsap.utils.toArray(right.current.children);
    gsap.from(children[0], {
      opacity: 0,
      // stagger: 0.3,
      duration: 2,
      y: 250,
      ease: "power4.out",
    });
    gsap.from(children[1], {
      opacity: 0,
      // stagger: 0.3,
      duration: 2,
      x: 250,
      ease: "power4.out",
    });
    gsap.from(children[2], {
      opacity: 0,
      // stagger: 0.3,
      duration: 2,
      x: -250,
      ease: "power4.out",
    });
  });
  return (
    <div
      className="md:w-96 md:h-96 md:absolute md:right-[4%] md:z-10 md:top-[20%] lg:w-[39rem] lg:h-[29rem] lg:right-[5%] sm:hidden md:block max-sm:hidden"
      ref={right}
    >
      <img
        src="./Home Right Section/Burger.png"
        alt=""
        className="lg:absolute z-20 lg:w-8/12 "
      />
      <img
        src="./Home Right Section/logo.png"
        alt=""
        className="lg:absolute lg:w-2/5 right-0 -top-6 sm:hidden lg:block"
      />
      <div className="lg:absolute lg:bottom-2 lg:w-4/6 lg:h-3/6 bg-orange-600 lg:z-10 lg:right-0 md:hidden lg:block">
        <div className="lg:absolute lg:right-0 lg:p-2 text-white lg:w-52 flex flex-col gap-2">
          <span className="text-sm">Customer Rating 4.5+</span>

          <div className="flex items-center ">
            {avatars.map((avatar, index) => (
              <div
                key={avatar.id}
                className={`relative w-10 h-10 rounded-full overflow-hidden border border-white `}
              >
                <img
                  src={avatar.src}
                  alt={avatar.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
            <div className="w-10 h-10 flex items-center justify-center bg-orange-600 border text-white text-sm rounded-full">
              30+
            </div>
          </div>
          <div className="right-0 text-sm">
            Used by 100K + users around the Pakistan
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rightportion;
