import React from "react";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className="">
      Home page
      {/* Message component */}
      <section>
        <Outlet />
      </section>
    </div>
  );
};

export default Home;
