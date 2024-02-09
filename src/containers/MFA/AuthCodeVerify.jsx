import {
  EnvelopeIcon,
  InformationCircleIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Auth } from "aws-amplify";

// import api from "../../api8000";
import AuthLayout from "../../components/AuthLayout";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import NormalButton from "../../components/NormalButton";
import { ButtonVariant } from "../../utils";
import snack from "../../utils/snack";
import { delay } from "../../utils";
import useAuth from "../../hooks/useAuth";

const schema = z.object({
  value1: z.string().min(1),
  value2: z.string().min(1),
  value3: z.string().min(1),
  value4: z.string().min(1),
  value5: z.string().min(1),
  value6: z.string().min(1),
});

const VerifyMode = {
  AUTH_APP: "AUTH_APP",
  SMS: "SMS",
  EMAIL: "EMAIL",
};

const AuthCodeVerify = () => {
  const navigate = useNavigate();
  const { tempUser, setUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [verifyMode, setVerifyMode] = useState(VerifyMode.AUTH_APP);

  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);
  const inputRef4 = useRef(null);
  const inputRef5 = useRef(null);
  const inputRef6 = useRef(null);
  const inputRefs = [
    inputRef1,
    inputRef2,
    inputRef3,
    inputRef4,
    inputRef5,
    inputRef6,
  ];

  const form = useForm({
    resolver: zodResolver(schema),
  });

  const onChangeVerifyMode = (mode) => {
    setVerifyMode(mode);
    setIsModalOpen(false);
  };

  const onChangeCode = (e, index) => {
    const { value } = e.target;
    if (value.trim() !== "") {
      selectInput(index + 1);
    }
  };

  const onKeyDown = (key, index) => {
    if (key === 37 || key === 39 || key === 8) {
      setTimeout(() => {
        selectInput(
          index + (key === 37 || key === 8 ? -1 : key === 39 ? 1 : 0)
        );
      }, 10);
    }
  };
  const selectInput = (index) => {
    if (index < 6 && index > -1) {
      const input = inputRefs[index].current.querySelector("input");
      input.focus();
      input.setSelectionRange(0, 1);
    }
  };

  const onPasteCapture = async (e) => {
    e.preventDefault();
    const text = (await navigator.clipboard.readText()) || "";
    text.split("").map((number, index) => {
      if (index < 6) {
        form.setValue(`value${index + 1}`, number);
      }
    });
  };

  const onSubmit = async (e) => {
    const code = `${e.value1}${e.value2}${e.value3}${e.value4}${e.value5}${e.value6}`;
    try {
      setIsLoading(true);
      const user = tempUser;
      console.log("tempUser in verify", user);
      
      const data = await Auth.verifyTotpToken(user, code);
    
      // this method returns SUCCESS
      await Auth.setPreferredMFA(user, 'TOTP');
      
      const token = data?.accessToken?.jwtToken;
      if (!token) {
        snack.error("Something went wrong, please try again");
        navigate("/login");
        return;
      }
      setUser(data);
      // todo: updateUserInfo for th auth hook
      // updateUserInfo(userInfo);
      snack.success("Successfully logged in!");

      await delay(1000);
      navigate("/dashboard");

      snack.success("Verified!");
    } catch (error) {
      console.error("error", error);
      snack.error('error', error.message);
      navigate("/login");
    } finally {
      setIsLoading(false);
    }
  };

  const onGetCode = async () => {};

  const onHandleSubmit = form.handleSubmit(onSubmit);

  return (
    <AuthLayout>
      <p className="mb-4 text-[1.625rem] font-bold not-italic text-gray-4">
        Security Verification
      </p>
      <p className="mb-4 text-base font-normal not-italic text-gray-4">
        Enter the 6-digit authentication code generated by your app:
      </p>
      <form onSubmit={onHandleSubmit}>
        <div className="bg-gray-1 px-10 py-20">
          <div className="codeInput mb-4 flex items-center justify-center">
            {Array.from({ length: 6 }).map((value, index) => {
              const { onChange, ...rest } = form.register(`value${index + 1}`);
              return (
                <div key={`value${index + 1}`} ref={inputRefs[index]}>
                  <input
                    id={`value${index + 1}`}
                    className="relative mx-[1px] my-[2px] h-12 w-12 text-center text-[1.625rem] shadow-input"
                    onPasteCapture={onPasteCapture}
                    onKeyDown={(e) => onKeyDown(e.keyCode, index)}
                    maxLength={1}
                    onChange={(e) => {
                      onChange(e);
                      onChangeCode(e, index);
                    }}
                    placeholder="0"
                    {...rest}
                  />
                </div>
              );
            })}
          </div>
          {verifyMode !== VerifyMode.AUTH_APP && (
            <NormalButton
              className="justify-center text-gray-4 active:opacity-50"
              onClick={onGetCode}
            >
              <InformationCircleIcon className="h-6 w-6 text-primary-3" />
              <span className="text-base text-primary-3 underline">
                Get code
              </span>
            </NormalButton>
          )}
        </div>
        <Button
          isSubmit
          isLoading={isLoading}
          className="mb-4 mt-8"
          variant={ButtonVariant.primary}
          isDisabled={!form.formState.isValid}
        >
          VERIFY
        </Button>
        {/* <NormalButton
          className="mb-4 justify-center text-primary-3 underline active:opacity-50"
          onClick={() => setIsModalOpen(true)}
        >
          Change to other verification method
        </NormalButton> */}
      </form>

      <Modal
        isOpen={isModalOpen}
        title="Choose an authentication method"
        closeModal={() => setIsModalOpen(false)}
      >
        <NormalButton
          className="mb-4 w-[34rem] bg-background p-5 text-gray-4"
          onClick={() => onChangeVerifyMode(VerifyMode.EMAIL)}
        >
          <EnvelopeIcon className="h-6 w-6" />
          Mail
        </NormalButton>
        <NormalButton
          className="w-[34rem] bg-background p-5 text-gray-4"
          onClick={() => onChangeVerifyMode(VerifyMode.SMS)}
        >
          <PhoneIcon className="h-6 w-6" />
          Phone SMS message
        </NormalButton>
      </Modal>
    </AuthLayout>
  );
};

export default AuthCodeVerify;
