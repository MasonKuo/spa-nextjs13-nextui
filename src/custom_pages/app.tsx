import {
  BrowserRouter,
  Link,
  useLocation,
  matchRoutes,
  useNavigate,
} from "react-router-dom";
import { Router } from "../../routes/index";
import { AliveScope } from "react-activation";
import {
  Button,
  Link as UILink,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Tabs,
  Tab,
  ButtonGroup,
  Chip,
} from "@nextui-org/react";

import React, { useEffect, useMemo, useState } from "react";
// import { NextUIProvider } from "@nextui-org/system";

export const AcmeLogo = () => (
  <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
    <path
      clipRule="evenodd"
      d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
      fill="currentColor"
      fillRule="evenodd"
      strokeLinecap="round"
    />
  </svg>
);

export const navList = [
  {
    key: "index",
    title: "Index",
    path: "/",
    static: true,
  },
  {
    key: "features",
    title: "Features",
    path: "/features",
    color: "foreground",
    refresh: false,
  },
  {
    key: "portal",
    title: "Portal",
    path: "/portal",
    color: "foreground",
    refresh: false,
  },
  {
    key: "integrations",
    title: "Integrations",
    path: "/integrations",
    refresh: false,
  },
];

const NavContainer = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();
  const matchKey = useMemo(() => {
    const matchs = matchRoutes(navList, location);
    if (!matchs) return null;
    const [{ route }] = matchs ?? [];

    return route.key;
  }, [location]);

  return (
    <Navbar isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit">Vercel Spa</p>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {navList.map((i) => (
          <NavbarItem key={i.key} isActive={i.key === matchKey}>
            <Link color={i.color} to={i.path}>
              {i.title}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="lg:flex">
          <UILink href="login">Login</UILink>
        </NavbarItem>
        <NavbarItem>
          <Button as={UILink} color="primary" href="/signin" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {navList.map((item, index) => (
          <NavbarMenuItem key={`${item.key}-${index}`}>
            {!item.refresh ? (
              <Link
                color={item.color}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.title}
              </Link>
            ) : (
              <UILink
                // color={
                //   index === 2
                //     ? "primary"
                //     : index === navList.length - 1
                //     ? "danger"
                //     : "foreground"
                // }
                className="w-full"
                href={item.path}
                size="lg"
              >
                {item.title}
              </UILink>
            )}
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

// let tabs = [
//   {
//     id: "photos",
//     label: "Photos",
//     content:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
//   },
//   {
//     id: "music",
//     label: "Music",
//     content:
//       "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
//   },
//   {
//     id: "videos",
//     label: "Videos",
//     content:
//       "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//   },
// ];
export const CloseIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-3 h-3"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
};

const TabsContainer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState<string>();
  const [activeTabs, setActiveTabs] = useState<any[]>(navList);
  const TabHeader = ({
    label,
    onClick,
    children,
  }: {
    label: string;
    onClick?: any;
    children: any;
  }) => {
    return (
      <ButtonGroup variant="flat" onClick={onClick}>
        <span>{label}</span>
        {children}
      </ButtonGroup>
    );
  };

  const handleDelete = (item: any) => {
    const delIndex = activeTabs.findIndex((tab) => tab.key === item.key);
    const delTab = activeTabs.find((tab) => tab.key === item.key);
    const preTab = activeTabs.find((_, index) => index === delIndex - 1);

    selectedKey === delTab.key && navigate(preTab.path);
    setActiveTabs((tabs) => tabs.filter((_, index) => index !== delIndex));
  };

  useEffect(() => {
    const matchNavs = matchRoutes(navList, location);
    const navRoute = matchNavs?.[0];
    const matchs = matchRoutes(activeTabs, location);
    const route = matchs?.[0]?.route;
    route && setSelectedKey(route.key);
    if (!route && navRoute) {
      setActiveTabs((routes) => [...routes, navRoute.route]);
      setSelectedKey(() => navRoute.route.key);
    }

    // !route && setActiveTabs((routes) => [...routes, navRoute.route]);
  }, [location, activeTabs]);

  return (
    <>
      <div className="flex w-full flex-col px-2">
        <Tabs
          aria-label="Dynamic tabs"
          // items={activeTabs}
          selectedKey={selectedKey}
          // onSelectionChange={(e) => {
          //   const nav = navList.find((i) => i.key === e);
          //   nav && navigate(nav.path);
          // }}
        >
          {activeTabs.map((item) => (
            <Tab
              key={item.key}
              title={
                <TabHeader
                  label={item.title}
                  onClick={() => {
                    const nav = navList.find((i) => i.key === item.key);
                    nav && navigate(nav.path);
                  }}
                >
                  {!item.static && (
                    <Chip
                      size="sm"
                      variant="light"
                      className="group-hover:flex sm:hidden"
                      color="danger"
                      onClose={(e) => {
                        // e.stopPropagation();
                        handleDelete(item);
                      }}
                      // onClick={(e) => {
                      //   e.stopPropagation();
                      //   handleDelete(item);
                      // }}
                      // onPointerDown={(e) => {
                      //   e.stopPropagation();
                      // }}
                    >
                      {/* <CloseIcon /> */}
                    </Chip>
                  )}
                </TabHeader>
              }
            >
              {/* <Card>
                <CardBody>{item.content}</CardBody>
                </Card> */}
            </Tab>
          ))}
        </Tabs>
      </div>
    </>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <div className="h-screen flex flex-col">
        <NavContainer />
        <div className="flex-1 flex flex-col overflow-auto">
          <TabsContainer />
          <div className="m-2 overflow-auto flex-1">
            <AliveScope>
              <Router />
            </AliveScope>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}
