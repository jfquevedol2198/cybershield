import { zodResolver } from "@hookform/resolvers/zod";
import { Auth } from "aws-amplify";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { z } from "zod";

import AuthLayout from "../../components/AuthLayout";
import Button from "../../components/Button";
import { ButtonVariant } from "../../utils/constants";
import snack from "../../utils/snack";

const schema = z.object({
  value1: z.string().min(1),
  value2: z.string().min(1),
  value3: z.string().min(1),
  value4: z.string().min(1),
  value5: z.string().min(1),
  value6: z.string().min(1),
});

const ConfirmSignup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchParam] = useSearchParams();
  const username = searchParam.get("username") || "";
  const navigate = useNavigate();

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

  const getDefaultValues = () => {
    return {
      code: "",
    };
  };
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: getDefaultValues(),
  });

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
    try {
      if (!username) {
        snack.error("Username is invalid");
        return;
      }
      setIsLoading(true);
      const code = `${e.value1}${e.value2}${e.value3}${e.value4}${e.value5}${e.value6}`;
      await Auth.confirmSignUp(username, code);
      snack.success("Account is confirmed successfully");
      navigate(`/complete-profile?email=${username}`);
    } catch (error) {
      const { response } = error;
      if (response) {
        snack.error(response.data.message);
      } else {
        snack.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };
  const onHandleSubmit = form.handleSubmit(onSubmit);

  return (
    <AuthLayout>
      <p className="mb-4 text-[1.625rem] font-bold not-italic text-gray-4">
        Confirm Account
      </p>
      <p className="mb-4 text-base font-normal not-italic text-gray-4">
        Please check your email for verification code
      </p>
      <form onSubmit={onHandleSubmit} className="mb-4">
        <div className="mb-8 bg-gray-1 px-10 py-20">
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
        </div>
        <Button
          isSubmit
          isLoading={isLoading}
          className="mb-4 mt-4"
          variant={ButtonVariant.primary}
        >
          CONFIRM ACCOUNT
        </Button>
      </form>
    </AuthLayout>
  );
};

export default ConfirmSignup;
