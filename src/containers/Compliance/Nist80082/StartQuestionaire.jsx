import ClockSvg from "../../../assets/images/clock.svg";
import Button from "../../../components/Button";
import { ButtonVariant } from "../../../utils";

const StartQuestionaire = () => {
  return (
    <div className="flex h-full max-w-[56.25rem] flex-col justify-center">
      <div className="mb-8 text-[2rem] font-bold text-black">
        NIST 800-82 Compliance Questionnaire
      </div>
      <div className="mb-8 flex flex-row items-center gap-2 text-base text-gray-4">
        <img src={ClockSvg} alt="" /> Est. time to complete: 1 hour 30 minutes
      </div>
      <div className="mb-16 text-base text-gray-4">
        In an era where cybersecurity is not just an option but a necessity,
        ensuring your organization&amp;s compliance with NIST 800-82 is more
        crucial than ever. This specialized questionnaire is your gateway to
        understanding and implementing the vital security controls and best
        practices essential for protecting your industrial control systems. By
        engaging with this questionnaire, you&amp;re taking a proactive step
        towards safeguarding your operations against cyber threats, managing
        risks more effectively, and aligning with regulatory standards.
        Don&amp;t wait for a security breach to expose vulnerabilities in your
        system. Act now, start filling out the NIST 800-82 compliance
        questionnaire, and position your organization at the forefront of
        cybersecurity preparedness. Secure your systems, protect your
        reputation, and ensure operational continuity.
      </div>
      <div className="flex flex-row items-center gap-2">
        <Button variant={ButtonVariant.filled} isSubmit>
          Open Questionnaire
        </Button>
        <Button variant={ButtonVariant.outline}>
          Reset Compliance Questionnaire
        </Button>
      </div>
    </div>
  );
};

export default StartQuestionaire;
