import { Auth } from "aws-amplify";
import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthLayout from "../../components/AuthLayout";
import Button from "../../components/Button";
import useAuth from "../../hooks/useAuth";
import { ButtonVariant } from "../../utils/constants";
import snack from "../../utils/snack";

const authenticatorApps = [
  {
    name: "Google Authenticator",
    href: "https://apps.apple.com/us/app/google-authenticator/id388497605",
  },
  {
    name: "Microsoft Authenticator",
    href: "https://apps.apple.com/us/app/microsoft-authenticator/id983156458",
  },
];

const Scan = () => {
  const navigate = useNavigate();
  const { tempUser } = useAuth();
  const [qrCode, setQRCode] = useState(null);

  useEffect(() => {
    setupTOTP();
  }, []);

  const setupTOTP = async () => {
    try {
      const user = tempUser;
      console.log("user", user);
      const secretKey = await Auth.setupTOTP(user);
      const qrCodeData = `otpauth://totp/AWSCognito:${user.username}?secret=${secretKey}&issuer=YourApp`;
      setQRCode(qrCodeData);
    } catch (error) {
      console.error("Error setting up TOTP", error);
      snack.error("Error setting up TOTP. Please try again later.");
      // errors are ussually due to user session being expired so redirect to login
      navigate("/login");
    }
  };

  const handleNextButtonClick = () => {
    navigate("/mfa/auth-code-verify");
  };

  return (
    <AuthLayout>
      <p className="mb-4 text-[1.625rem] font-bold not-italic text-gray-4">
        Configure multi-factor authentication (MFA)
      </p>
      <div className="mb-4 text-base font-normal not-italic text-gray-4">
        Scan the QR code with an authenticator app like:
        <ul>
          {authenticatorApps.map((item) => (
            <li className="list-inside list-disc" key={item.name}>
              <a
                className="underline"
                href={item.href}
                target="_blank"
                rel="noreferrer"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center justify-center bg-white px-10 py-20">
        <QRCodeCanvas size={350} value={qrCode} />
      </div>
      <div className="flex items-center justify-center py-10">
        <Button variant={ButtonVariant.filled} onClick={handleNextButtonClick}>
          NEXT
        </Button>
      </div>
    </AuthLayout>
  );
};

export default Scan;
