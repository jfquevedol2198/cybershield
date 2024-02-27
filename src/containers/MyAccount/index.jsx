import { Outlet } from "react-router-dom";

import MyAccountSidebar from "../../components/MyAccountSidebar";

const MyAccount = () => {
  return (
    <div className="-my-8 -ml-5 flex h-full flex-row">
      <MyAccountSidebar />
      <div className="flex-auto py-8 pl-10 pr-5">
        <Outlet />
      </div>
    </div>
  );
};

export default MyAccount;
