import React, { useState } from "react";
import ItemsManagement from "./Items Management/ItemsManagement";
import MenuManagement from "./Menu Management/MenuManagement";

const Dashboard = () => {
  const [items, setItems] = useState(true);
  const [menu, setMenu] = useState(false);
  return (
    <div className="w-full md:h-auto pt-16 bg-[#1e2021] flex max-lg:flex-col relative">
      <div className="lg:w-1/3 max-sm:w-full sm:w-full  max-lg:h-16 bg-[#2c2f2f] flex text-white font-semibold lg:flex-col lg:justify-start lg:h-auto lg:min-h-[97vh] ">
        <div
          onClick={() => {
            setItems(true);
            setMenu(false);
          }}
          className={`w-1/2 h-full flex items-center justify-center max-sm:border-r-2 border-black lg:w-full lg:h-20 lg:text-xl cursor-pointer ${
            items ? "bg-orange-500" : "bg-[#2c2f2f] "
          }`}
        >
          Items Management
        </div>
        <div
          onClick={() => {
            setItems(false);
            setMenu(true);
          }}
          className={`w-1/2 h-full flex items-center justify-center lg:w-full lg:h-20 border-b border-black lg:text-xl cursor-pointer ${
            menu ? "bg-orange-500" : "bg-[#2c2f2f] "
          }`}
        >
          Menu Management
        </div>
      </div>
      <div className="w-2/3 h-full  max-sm:w-full  max-sm:min-h-screen sm:w-full sm:min-h-full">
        {items && <ItemsManagement />}
        {menu && <MenuManagement />}
      </div>
    </div>
  );
};

export default Dashboard;
