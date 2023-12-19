import Accordion from "../../../components/Accordion";
import Collapsible from "../../../components/Collapsible";
import DataRow from "../../../components/DataRow";

const NetworkingTab = () => {
  return <div>Networking</div>;
};

const NetworkingTabPanel = () => {
  return (
    <div className="w-full">
      <Accordion title="Open ports" headerClassName="pt-1">
        <div className="mt-2 bg-white p-5">
          <div className="w-1/2">
            <Collapsible showCount={2}>
              <DataRow property="Port number" value="UDP/161" />
              <DataRow property="Name" value="snmp" />
              <DataRow property="Catalog" value="6ES7 511-1FK01-0AB0" />
              <DataRow property="Model" value="cpu 1511f-1 pn" />
              <DataRow property="Version" value="2.8.3" />
            </Collapsible>
          </div>
        </div>
      </Accordion>
      <div className="mt-1 bg-white p-5">
        <div className="w-1/2">
          <Collapsible showCount={2}>
            <DataRow property="Port number" value="TCP/102" />
            <DataRow property="Name" value="ISO-tsap" />
            <DataRow property="Catalog" value="6ES7 511-1FK01-0AB0" />
            <DataRow property="Model" value="cpu 1511f-1 pn" />
            <DataRow property="Version" value="2.8.3" />
          </Collapsible>
        </div>
      </div>
    </div>
  );
};

export { NetworkingTab, NetworkingTabPanel };
