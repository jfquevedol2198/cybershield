import Accordion from "../../../../../components/Accordion";
import DataRow from "../../../../../components/DataRow";

const AdditionalInfoTab = () => {
  return <div>Additional info</div>;
};

const AdditionalInfoTabPanel = () => {
  return (
    <div className="w-full">
      <Accordion title="Modules" headerClassName="pt-1">
        <div className="mt-2 bg-white p-5">
          <div className="w-1/2">
            <DataRow property="Slot" value="0" />
            <DataRow property="Name" value="S7-1500Left" />
            <DataRow property="Catalog" value="6ES7 511-1FK01-0AB0" />
            <DataRow property="Model" value="cpu 1511f-1 pn" />
            <DataRow isLast property="Version" value="2.8.3" />
          </div>
        </div>
      </Accordion>
    </div>
  );
};

export { AdditionalInfoTab, AdditionalInfoTabPanel };
