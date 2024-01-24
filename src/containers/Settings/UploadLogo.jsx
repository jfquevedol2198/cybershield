import { PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

import Button from "../../components/Button";
import NormalButton from "../../components/NormalButton";
import { ButtonVariant } from "../../utils";

const UploadLogo = () => {
  const [uploadMode, setUploadMode] = useState(false);
  const [logo, setLogo] = useState(null);
  const [tempLogo, setTempLogo] = useState(null);

  const onFileAdd = (e) => {
    setTempLogo(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div>
      <div className="mb-2 text-[1.625rem] font-bold">Organization Logo</div>
      <div className="mb-5 text-base font-normal">
        The logo will be updated in the top right of the screen and the login
        page.
      </div>
      {!uploadMode && logo && (
        <div className="flex items-start gap-x-4">
          <div className="flex h-[66px] w-[212px] flex-row items-center justify-center border border-dashed border-link"></div>
          <NormalButton
            variant={ButtonVariant.text}
            onClick={() => {
              setUploadMode(true);
            }}
            className="text-link"
          >
            Edit
          </NormalButton>
        </div>
      )}
      {(uploadMode || !logo) && (
        <div className="flex h-[66px] w-[212px] flex-row items-center justify-center border border-dashed border-link">
          {!tempLogo ? (
            <>
              <input
                type="file"
                className="h-0 w-0"
                id="logo"
                accept="image/png, image/jpeg"
                onChange={onFileAdd}
              />
              <label
                htmlFor="logo"
                className="flex h-full w-full items-center justify-center gap-x-2 text-link"
              >
                <PlusIcon className="h-6 w-6" /> Upload Logo
              </label>
            </>
          ) : (
            <img src={tempLogo} alt="" className="h-full" />
          )}
        </div>
      )}
      <div className="mb-8 mt-5 text-base font-light">
        <span className="font-bold">Recommended size:</span>{" "}
        <span className="font-light">150x50 px</span>
      </div>
      {(uploadMode || !logo) && (
        <div>
          <div className="flex items-center">
            <Button
              variant={ButtonVariant.filled}
              onClick={() => setLogo("")}
              isDisabled={!tempLogo}
              className="w-[212px]"
            >
              UPDATE
            </Button>
            {tempLogo && (
              <NormalButton
                variant={ButtonVariant.text}
                onClick={() => {
                  setUploadMode(false);
                  setTempLogo(null);
                }}
                className="p-5 text-link"
              >
                CANCEL
              </NormalButton>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadLogo;
