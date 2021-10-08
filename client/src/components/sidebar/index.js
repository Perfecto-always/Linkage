import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//PAGE
import SideBar from "./SideBar";
import Chat from "../../pages/Chats/Chat";
import MusicAuth from "../../pages/Music/MusicAuth";
import Setting from "../../pages/Settings/Setting";

const sidebarRoutes = [
  {
    id: "1",
    path: "/chat",
    main: () => <Chat />,
  },
  {
    id: "2",
    path: "/music",
    main: () => <MusicAuth />,
  },
  {
    id: "3",
    path: "/settings",
    main: () => <Setting />,
  },
];

const Sidebar = () => {
  return (
    <>
      <Router>
        <div className='contianer flex bg-gray-900'>
          <div className='side-bar'>
            <SideBar />
            <Switch>
              {sidebarRoutes.map((sidebarRoute) => (
                <Route
                  key={sidebarRoute.id}
                  path={sidebarRoute.path}
                  exact={sidebarRoute.exact}
                />
              ))}
            </Switch>
          </div>
          <div className='main-content text-white'>
            <Switch>
              {sidebarRoutes.map((sidebarRoute) => (
                <Route
                  key={sidebarRoute.id}
                  path={sidebarRoute.path}
                  children={sidebarRoute.main}
                />
              ))}
            </Switch>
          </div>
        </div>
      </Router>
    </>
  );
};

export default Sidebar;
