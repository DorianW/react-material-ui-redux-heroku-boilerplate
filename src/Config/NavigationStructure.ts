export const NavigationStructure = {
  home: {
    url: "/",
    display: "Room Overview",
  },
  configuration: {
    url: "/settings",
    display: "Settings",
  },
  trinkwasser: {
    url: "/konfiguration/drinkwater",
    display: "Drinkwater",
  },
  urlaub: {
    url: "/konfiguration/vacation",
    display: "Vacation Mode",
  },
  urlaubAdd: {
    url: "/konfiguration/vacation/create",
    display: "Vacation Mode",
  },
  urlaubEdit: {
    url: "/konfiguration/vacation/:settingId",
    display: "Vacation Mode",
  },
  roomSettings: {
    urlWithParams: "/room/:roomId",
    display: "Room settings",
    url: "/room",
  },
};
