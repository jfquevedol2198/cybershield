import { Menu } from "@headlessui/react";
import {
  Cog8ToothIcon,
  EnvelopeIcon,
  PhoneIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Link, useLocation } from "react-router-dom";

import { ReactComponent as ChatSupportSvg } from "../../assets/images/chatsupport.svg";
import { ReactComponent as KnowledgeSvg } from "../../assets/images/knowledge.svg";
import { ReactComponent as LogoutSvg } from "../../assets/images/logout.svg";
import { ReactComponent as MyAccountSvg } from "../../assets/images/myaccount.svg";
import useAuth from "../../hooks/useAuth";
import useCommon from "../../hooks/useCommon";
import { ButtonVariant } from "../../utils";
import Avatar from "../Avatar";
import DropdownButton from "../DropdownButton";
import NormalButton from "../NormalButton";

const Header = () => {
  const location = useLocation();
  const { userInfo } = useAuth();

  const isSetting = location.pathname.indexOf("/settings") > -1;
  const { setShowSignoutModal } = useCommon();

  return (
    <div className="header">
      <div className="left">
        <Link to="/" className="text-2xl font-bold">
          CyberShield
        </Link>
      </div>
      <div className="right h-full">
        <div className="flex h-full flex-row items-center">
          <div className={clsx("h-full", isSetting && "bg-secondary-4")}>
            <NormalButton
              variant={ButtonVariant.icon}
              className="h-full px-3"
              href="/dashboard/settings"
            >
              <Cog8ToothIcon className="h-6 w-6" />
            </NormalButton>
          </div>
          <div className="mr-4 h-full">
            <DropdownButton
              buttonContent={
                <NormalButton variant={ButtonVariant.icon} className="h-full">
                  <QuestionMarkCircleIcon className="h-6 w-6" />
                </NormalButton>
              }
              dropdownContent={
                <div className="w-80">
                  <div className="border-b-[1px] border-gray-1  pb-2 text-xs text-gray-1">
                    PLATFORM SUPPORT
                  </div>
                  <Menu.Items>
                    <Menu.Item
                      className="px-2 py-3 text-gray-1"
                      as={NormalButton}
                      disabled
                    >
                      <KnowledgeSvg className="h-7 w-6 text-gray-1" />
                      Knowledge base
                    </Menu.Item>
                    <Menu.Item
                      className="px-2 py-3 text-gray-1"
                      as={NormalButton}
                      disabled
                    >
                      <ChatSupportSvg className="h-7 w-6 text-gray-1" />
                      Chat Support
                    </Menu.Item>
                    <Menu.Item
                      className="px-2 py-3 text-gray-1"
                      as={NormalButton}
                      disabled
                    >
                      <PhoneIcon className="h-7 w-6" />
                      <div className="text-gray-1">
                        <div className="text-xs">AGENT SUPPORT:</div>
                        <div className="text-base font-bold">
                          +1(234) 453 3356
                        </div>
                      </div>
                    </Menu.Item>
                    <Menu.Item
                      className="px-2 py-3 text-gray-1"
                      as={NormalButton}
                      disabled
                    >
                      <EnvelopeIcon className="h-7 w-6" />
                      <div className="text-gray-1">
                        <div className="text-xs font-light">MAIL TO:</div>
                        <div className="text-base font-bold">
                          SekurionTest@w-industries.com
                        </div>
                      </div>
                    </Menu.Item>
                  </Menu.Items>
                </div>
              }
            />
          </div>
          <div className="right h-full">
            <DropdownButton
              buttonContent={
                <NormalButton variant={ButtonVariant.icon} className="h-full">
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-light">{userInfo?.name}</span>
                    <span className="text-xs">W INDUSTRIES</span>
                  </div>
                  <Avatar />
                </NormalButton>
              }
              dropdownContent={
                <Menu.Items className="w-56">
                  <Menu.Item
                    className="px-2 py-3 text-gray-4"
                    as={NormalButton}
                    href="/dashboard/my-account"
                  >
                    <MyAccountSvg className="h-7 w-6" />
                    My Account
                  </Menu.Item>
                  <Menu.Item
                    className="px-2 py-3 text-gray-4"
                    as={NormalButton}
                    onClick={() => setShowSignoutModal(true)}
                  >
                    <LogoutSvg className="h-7 w-6" />
                    Log out
                  </Menu.Item>
                </Menu.Items>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
