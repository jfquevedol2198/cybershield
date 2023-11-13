import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import QrcodePng from "../../assets/images/qrcode.png";
import AuthLayout from "../../components/AuthLayout";

const Scan = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/mfa/auth-code-verify");
    }, 2000);
  }, []);

  return (
    <AuthLayout>
      <p className="mb-4 text-[1.625rem] font-bold not-italic text-gray-4">
        Configure multi-factor authentication (MFA)
      </p>
      <div className="mb-4 text-base font-normal not-italic text-gray-4">
        Scan the QR code with an authenticator app like:
        <ul>
          <li className="list-inside list-disc">
            <a
              className="underline"
              href="https://apps.apple.com/us/app/google-authenticator/id388497605"
              target="_blank"
              rel="noreferrer"
            >
              Google Authenticator
            </a>{" "}
            or
          </li>
          <li className="list-inside list-disc">
            <a
              className="underline"
              href="https://apps.apple.com/us/app/microsoft-authenticator/id983156458"
              target="_blank"
              rel="noreferrer"
            >
              Microsoft Authenticator
            </a>
            .
          </li>
        </ul>
      </div>
      <div className="flex items-center justify-center bg-white px-10 py-20">
        <img src={QrcodePng} className="h-64 w-64" alt="" aria-hidden="true" />
      </div>
    </AuthLayout>
  );
};

export default Scan;
