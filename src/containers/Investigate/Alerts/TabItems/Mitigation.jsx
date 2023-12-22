const MitigationTab = () => {
  return <div>Mitigation</div>;
};

const mitigations = [
  {
    title: "Identify Vulnerabilities",
    description:
      "Conduct a comprehensive security audit to identify vulnerabilities in your internal communication systems. This includes email, messaging platforms, intranet, and any other tools used for communication.",
  },

  {
    title: "Encryption",
    description:
      "Implement end-to-end encryption for sensitive communications. This ensures that only the intended recipients can decrypt and read the messages.",
  },
  {
    title: "Secure Email",
    description:
      "Use secure email protocols like S/MIME or PGP to encrypt email messages. These technologies provide a way to secure the content and the sender's identity.",
  },
  {
    title: "VPN Usage",
    description:
      "Encourage or require the use of Virtual Private Networks (VPNs) when accessing company resources from outside the office. This adds an extra layer of security to data in transit.",
  },
  {
    title: "Secure Messaging Tools",
    description:
      "Implement secure messaging tools with strong encryption. Consider tools like Signal or WhatsApp for mobile communications, or use secure business messaging platforms that offer end-to-end encryption.",
  },
  {
    title: "Access Control",
    description:
      "Enforce strict access control policies to limit who can access internal communication systems. This includes role-based access control (RBAC) and strong password policies.",
  },
  {
    title: "Employee Training",
    description:
      "Educate employees on the importance of secure communication practices, including recognizing phishing attempts and social engineering tactics.",
  },
  {
    title: "Two-Factor Authentication (2FA)",
    description:
      "Require 2FA for accessing communication tools. This adds an additional layer of security to protect against unauthorized access.",
  },
];

const MitigationTabPanel = () => {
  return (
    <div key="overview" className="">
      <div className="bg-white px-4 py-2">
        <div className="mb-2 text-base font-bold">Description</div>
        <div className="mb-5 text-base font-normal text-gray-4">
          Mitigating insecure internal communication is crucial for maintaining
          the confidentiality, integrity, and availability of sensitive
          information within an organization. Here are steps to improve the
          security of internal communications:
        </div>
        <div className="max-h-[25rem] overflow-auto">
          {mitigations.map((m, index) => (
            <div key={m.title.replace(" ", "_")}>
              <div className="text-base font-bold text-black">
                {index + 1}. {m.title}:
              </div>
              <div className="mb-1 pl-4 text-base font-normal text-gray-4">
                {m.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { MitigationTab, MitigationTabPanel };
