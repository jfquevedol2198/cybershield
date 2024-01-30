import { PlusIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useState } from "react";

import Button from "../../components/Button";
import NormalButton from "../../components/NormalButton";
import config from "../../config";
import useAuth from "../../hooks/useAuth";
import { ButtonVariant, setCookieValue } from "../../utils";
import snack from "../../utils/snack";

const UploadLogo = () => {
  const { configuration, updateConfiguration } = useAuth();
  const [uploadMode, setUploadMode] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [tempLogo, setTempLogo] = useState(null);
  const [logoToUpload, setLogoToUpload] = useState(null);

  const onFileAdd = async (e) => {
    try {
      setUploading(true);
      setTempLogo(URL.createObjectURL(e.target.files[0]));
      const url = `https://api.imgbb.com/1/upload?expiration=15552000&key=${config.imgbbApiKey}`;
      const form = new FormData();
      form.set("image", e.target.files[0]);
      const {
        data: {
          data: { url: imageUrl },
        },
      } = await axios.post(url, form);
      setLogoToUpload(imageUrl);
    } catch (error) {
      console.log(error);
      snack.error("Organization logo upload failed");
    }
    setUploading(false);
  };

  const onUpdate = () => {
    updateConfiguration({
      linklogo: logoToUpload,
    });
    setLogoToUpload(null);
    setUploadMode(false);
    setTempLogo(null);
  };
  return (
    <div>
      <div className="mb-2 text-[1.625rem] font-bold">Organization Logo</div>
      <div className="mb-5 text-base font-normal">
        The logo will be updated in the top right of the screen and the login
        page.
      </div>
      {!uploadMode && configuration?.linklogo && (
        <div className="flex items-start gap-x-4">
          <div className="flex h-[66px] w-[212px] flex-row items-center justify-center border border-dashed border-link">
            <img src={configuration.linklogo} alt="" className="h-full" />
          </div>
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
      {(uploadMode || !configuration?.linklogo) && (
        <div className="flex h-[66px] w-[212px] flex-row items-center justify-center border border-dashed border-link">
          {tempLogo ? (
            <img src={tempLogo} alt="" className="h-full" />
          ) : (
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
          )}
        </div>
      )}
      <div className="mb-8 mt-5 text-base font-light">
        <span className="font-bold">Recommended size:</span>{" "}
        <span className="font-light">150x50 px</span>
      </div>
      {(uploadMode || !configuration.linklogo) && (
        <div>
          <div className="flex items-center">
            <Button
              variant={ButtonVariant.filled}
              isDisabled={!tempLogo || uploading || !logoToUpload}
              className="w-[212px]"
              onClick={onUpdate}
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
