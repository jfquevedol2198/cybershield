import React from "react";
import { RotatingLines } from "react-loader-spinner";

const ActivityIndicator = () => {
  return (
    <div className="absolute left-0 top-0 z-[1000] flex h-full w-full items-center justify-center bg-slate-100/50">
      <RotatingLines
        visible={true}
        height="96"
        width="96"
        color="grey"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default ActivityIndicator;
