import Sidebar from "./Sidebar";
import StartQuestionaire from "./StartQuestionaire";

const Nist80082 = () => {
  return (
    <div className="-my-8 -ml-5 flex h-full flex-row">
      <Sidebar />
      <div className="flex h-full flex-auto flex-row justify-center bg-white py-8 pl-10 pr-5">
        <StartQuestionaire />
      </div>
    </div>
  );
};

export default Nist80082;
