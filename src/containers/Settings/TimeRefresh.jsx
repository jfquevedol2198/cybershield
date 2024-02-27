import { useEffect, useState } from "react";

import Button from "../../components/Button";
import DropdownSelect from "../../components/DropdownSelect";
import useAuth from "../../hooks/useAuth";
import { ButtonVariant } from "../../utils";

const Period = [
  {
    label: "10 Minutes",
    value: "10",
  },
  {
    label: "15 Minutes",
    value: "15",
  },
  {
    label: "20 Minutes",
    value: "20",
  },
  {
    label: "25 Minutes",
    value: "25",
  },
  {
    label: "30 Minutes",
    value: "30",
  },
];

const TimeRefresh = () => {
  const [editMode, setEditMode] = useState(false);
  const [timeRefresh, setTimeRefresh] = useState(null);
  const [tempValue, setTempValue] = useState(null);
  const { configuration, updateConfiguration } = useAuth();

  const onUpdate = () => {
    setTimeRefresh(tempValue);
    setEditMode(false);
    updateConfiguration({
      time_refresh_interval: parseInt(tempValue.value),
    });
  };

  useEffect(() => {
    if (configuration) {
      setTimeRefresh(
        Period.find(
          (p) => p.value === `${configuration?.time_refresh_interval}`
        )
      );
    }
  }, [configuration]);

  return (
    <div>
      <div className="mb-2 text-[1.625rem] font-bold">Time Refresh</div>
      <div className="mb-5 text-base font-normal">
        Time interval to retrieve information from the central system.
      </div>
      {!editMode && timeRefresh && (
        <div className="flex flex-row gap-2">
          <div className="flex h-[45px] w-[13rem] items-center justify-center rounded-md border border-focus bg-gray-1">
            {timeRefresh.label}
          </div>
          <Button
            variant={ButtonVariant.text}
            onClick={() => {
              setEditMode(true);
              setTempValue(timeRefresh);
            }}
          >
            Edit
          </Button>
        </div>
      )}
      <div className="w-[13rem]">
        {(editMode || !timeRefresh) && (
          <>
            <div className="mb-4">
              <DropdownSelect
                data={Period}
                defaultValue={Period.find(
                  (p) => p.value === `${configuration?.time_refresh_interval}`
                )}
                onSelect={(v) => setTempValue(v)}
                className="w-full rounded-md border border-focus bg-white"
              />
            </div>
            <Button
              variant={ButtonVariant.filled}
              onClick={onUpdate}
              isDisabled={!tempValue}
            >
              UPDATE
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default TimeRefresh;
