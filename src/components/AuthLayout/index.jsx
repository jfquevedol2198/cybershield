import { ChildrenType } from "../../utils/types";

const AuthLayout = ({ children }) => (
  <div className="grid min-h-screen grid-flow-row grid-cols-1 lg:grid-cols-2">
    <div className="relative hidden bg-auth-background bg-cover bg-center lg:block">
      <div className="absolute bottom-12 left-12 text-white">
        <div className="mb-3 max-w-[20rem] text-3xl font-bold">
          Get started with CyberShield
        </div>
        <div className="text-[1.25rem] font-normal">
          Track all your systems in one place.
        </div>
      </div>
    </div>
    <div className="mb-2 flex flex-col justify-center bg-background px-16 py-20 xl:px-24 2xl:px-44">
      <div className="mb-4">
        <p className="mb-2 text-center text-[3.125rem] font-bold text-secondary-3">
          CyberShield
        </p>
        <p className="mb-10 text-center text-base font-normal text-gray-4">
          Monitor your cybersecurity systems
        </p>
      </div>
      {children}
    </div>
  </div>
);

AuthLayout.propTypes = {
  children: ChildrenType.isRequired,
};

export default AuthLayout;
