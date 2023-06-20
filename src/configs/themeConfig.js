import { LootFatLogo } from "../assets/images";
import "../assets/scss/custom.scss";

const themeConfig = {
  app: {
    appName: <img src={LootFatLogo} />,
    appLogoImage: <img src={LootFatLogo} />,
  },
  layout: {
    isRTL: false,
    skin: JSON.parse(localStorage.getItem("skin")),
    routerTransition: "fadeIn",
    type: "vertical",
    contentWidth: "boxed",
    menu: {
      isHidden: false,
      isCollapsed: false,
    },
    navbar: {
      type: "floating",
      backgroundColor: "white",
    },
    footer: {
      type: "static",
    },
    customizer: false,
    scrollTop: true,
  },
};

export default themeConfig;
