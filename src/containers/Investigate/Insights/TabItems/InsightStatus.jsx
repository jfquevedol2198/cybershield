import Tag, { TagVariant } from "../../../../components/Tag";

const InsightStatusTab = () => {
  return <div>Insight status</div>;
};

const InsightStatusTabPanel = () => {
  return (
    <div className="w-full">
      <div className="bg-white p-5">
        <div className="mb-3 flex flex-row gap-2">
          <span className="text-base font-bold text-black">Insight status</span>
          <Tag variant={TagVariant.content} label="Open" />
        </div>
        <div className="mb-3">
          <span className="text-base font-bold text-black">
            Insight history
          </span>
        </div>
        <div className="mb-3">
          <div className="text-base font-normal text-gray-4">
            New Insight was modified.
          </div>
          <div className="text-base font-normal text-gray-4">
            10 Oct 2023 | 10:30
          </div>
        </div>
        <div>
          <div className="text-base font-normal text-gray-4">
            New Insight was created.
          </div>
          <div className="text-base font-normal text-gray-4">
            04 Oct 2023 | 02:10
          </div>
        </div>
      </div>
    </div>
  );
};

export { InsightStatusTab, InsightStatusTabPanel };
