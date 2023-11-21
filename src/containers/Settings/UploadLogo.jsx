import { PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

import Button from "../../components/Button";
import NormalButton from "../../components/NormalButton";
import { ButtonVariant } from "../../utils";

const UploadLogo = () => {
  const [uploadMode, setUploadMode] = useState(false);
  const [logo, setLogo] = useState(null);
  const [tempLogo] = useState(null);
  return (
    <div>
      <div className="mb-2 text-[1.625rem] font-bold">Organization Logo</div>
      <div className="mb-5 text-base font-normal">
        The logo will be updated in the top right of the screen and the login
        page.
      </div>
      {!uploadMode && (
        <div className="flex h-[66px] w-[212px] flex-row items-center justify-center gap-2 border-[1px] border-dashed border-link">
          <NormalButton
            variant={ButtonVariant.text}
            onClick={() => {
              setUploadMode(true);
            }}
            className="text-link"
          >
            <PlusIcon className="h-6 w-6" /> Upload Logo
          </NormalButton>
        </div>
      )}
      <div className="mb-8 mt-5 text-base font-light">
        <span className="font-bold">Recommended size:</span>{" "}
        <span className="font-light">150x50 px</span>
      </div>
      <div className="w-[13rem]">
        {(uploadMode || !logo) && (
          <Button
            variant={ButtonVariant.filled}
            onClick={() => setLogo("")}
            isDisabled={!tempLogo}
          >
            UPDATE
          </Button>
        )}
      </div>
    </div>
  );
};

export default UploadLogo;
