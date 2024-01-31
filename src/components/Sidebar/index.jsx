import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import _ from "lodash";
import { Fragment, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import apiClient from "../../api8000";
import useCommon from "../../hooks/useCommon";
import { SIDEBAR_ITEMS } from "../../router";
import ActivityIndicator from "../ActivityIndicator";
import NormalButton from "../NormalButton";

const Sidebar = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const { sites, setSites } = useCommon();

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const { data } = await apiClient.getSites();
        setSites(_.filter(data, (site) => site.name_ !== "not assigned"));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return (
    <div className="sidebar">
      {loading && <ActivityIndicator />}
      {!loading &&
        SIDEBAR_ITEMS.map((menu) => {
          const Icon = menu.Icon;
          const isActive =
            location.pathname.indexOf(`/dashboard/${menu.path}`) === 0;
          if (menu.children && menu.children.length > 0) {
            if (menu.isSite) {
              return (
                <Fragment key={menu.path}>
                  {sites.map((site) => {
                    const isActive =
                      location.pathname.indexOf(
                        `/dashboard/site/${site.id}`
                      ) === 0;
                    return (
                      <Disclosure key={menu.path.replace(":siteId", site.id)}>
                        {({ open }) => (
                          <>
                            <Disclosure.Button
                              className={clsx(
                                "flex w-full justify-between px-5 py-2 text-left text-base font-medium text-gray-1",
                                isActive ? "bg-background text-gray-4" : ""
                              )}
                            >
                              <div className="flex flex-row items-center gap-2">
                                {Icon && <Icon />}
                                {site.name_}
                              </div>
                              <ChevronUpIcon
                                className={clsx(
                                  "h-5 w-5",
                                  open ? "rotate-180 transform" : "",
                                  isActive ? "text-primary-3" : "text-gray-1"
                                )}
                              />
                            </Disclosure.Button>
                            <Disclosure.Panel>
                              {menu.children.map((subMenu) => (
                                <NormalButton
                                  key={subMenu.path}
                                  href={`/dashboard/site/${site.id}/${subMenu.path}`}
                                >
                                  <div className="flex w-full justify-between px-5 py-2 text-left text-base font-medium text-gray-1">
                                    <div className="flex flex-row items-center gap-2">
                                      <div className="flex h-6 w-6 items-center justify-center">
                                        {isActive &&
                                          location.pathname.indexOf(
                                            `/${subMenu.path}`
                                          ) > -1 && (
                                            <span className="h-2 w-2 rounded-full bg-background" />
                                          )}
                                      </div>
                                      {subMenu.title}
                                    </div>
                                  </div>
                                </NormalButton>
                              ))}
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    );
                  })}
                </Fragment>
              );
            }
            return (
              <Fragment key={menu.path}>
                <Disclosure>
                  {({ open }) => (
                    <>
                      <Disclosure.Button
                        className={clsx(
                          "flex w-full justify-between px-5 py-2 text-left text-base font-medium text-gray-1",
                          isActive ? "bg-background text-gray-4" : ""
                        )}
                      >
                        <div className="flex flex-row items-center gap-2">
                          {Icon && <Icon />}
                          {menu.title}
                        </div>
                        <ChevronUpIcon
                          className={clsx(
                            "h-5 w-5",
                            open ? "rotate-180 transform" : "",
                            isActive ? "text-primary-3" : "text-gray-1"
                          )}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel>
                        {menu.children.map((subMenu) => (
                          <NormalButton
                            key={subMenu.path}
                            href={`/dashboard/${menu.path}/${subMenu.path}`}
                          >
                            <div className="flex w-full justify-between px-5 py-2 text-left text-base font-medium text-gray-1">
                              <div className="flex flex-row items-center gap-2">
                                <div className="flex h-6 w-6 items-center justify-center">
                                  {isActive &&
                                    location.pathname.indexOf(
                                      `/${subMenu.path}`
                                    ) > -1 && (
                                      <span className="h-2 w-2 rounded-full bg-background" />
                                    )}
                                </div>
                                {subMenu.title}
                              </div>
                            </div>
                          </NormalButton>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </Fragment>
            );
          }
          return (
            <NormalButton key={menu.path} href={`/dashboard/${menu.path}`}>
              <div
                className={clsx(
                  "flex w-full justify-between px-5 py-2 text-left text-base font-medium text-gray-1",
                  isActive ? "bg-background text-gray-4" : ""
                )}
              >
                <div className="flex flex-row items-center gap-2">
                  {Icon && <Icon />}
                  {menu.title}
                </div>
              </div>
            </NormalButton>
          );
        })}
    </div>
  );
};

export default Sidebar;
