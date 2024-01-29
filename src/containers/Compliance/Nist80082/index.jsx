import { useSearchParams } from "react-router-dom";

import Questionnaire from "./Questionnaire";
import Sidebar from "./Sidebar";
import StartQuestionnaire from "./StartQuestionnaire";

const Nist80082 = () => {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status") || "start";
  console.log(status);
  return (
    <div className="flex h-full flex-row">
      <Sidebar />
      <div className="flex h-full flex-auto flex-row justify-center bg-white">
        {status === "start" && <StartQuestionnaire />}
        {status === "questionnaire" && <Questionnaire />}
      </div>
    </div>
  );
};

export default Nist80082;
