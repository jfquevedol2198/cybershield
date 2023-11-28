import { Outlet } from "react-router-dom";

const Template = () => {
  return (
    <div className="flex flex-row items-center justify-center">
      Coming soon...
      <Outlet />
    </div>
  );
};

export default Template;
