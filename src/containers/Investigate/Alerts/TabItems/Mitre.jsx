import NoDataSvg from "../../../../assets/images/nodata.svg";

const MitreTab = () => {
  return <div>Mitre</div>;
};

const MitreTabPanel = () => {
  return (
    <div key="overview" className="">
      <div className="mb-1 flex flex-col items-center justify-center bg-white px-4 py-10">
        <img src={NoDataSvg} className="mb-3 w-[12.5rem]" alt="" />
        <span className="text-base font-normal text-gray-4">
          There is no data here
        </span>
      </div>
    </div>
  );
};

export { MitreTab, MitreTabPanel };
