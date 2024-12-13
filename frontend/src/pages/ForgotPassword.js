import React from "react";

const ForgotPassword = () => {
  return (
    <div>
      <h1 className="text-3xl bg-slate-500 font-bold ml-2 pt-0 text-center hover:text-white  ">
        Title 1 is a sample of text wrap and discription
      </h1>
      <h1 className="text-2xl underline underline-offset-2 decoration-slate-900  decoration-dotted">
        Title 2
      </h1>
      <h1 className="text-xl border-hidden">Title 3</h1>
      <p className="text-base">A regular peragraph</p>
      <p className="text-sm">A discription paragraph</p>
      <p className="note text-xs">A text note</p>

      <div className="flex mt-2 space-x-2">
        <div className="ml-2  w-1/4 h-16 bg-red-700 "></div>
        <div className="w-1/3 h-16 bg-green-700"></div>
      </div>
    </div>
  );
};

export default ForgotPassword;
