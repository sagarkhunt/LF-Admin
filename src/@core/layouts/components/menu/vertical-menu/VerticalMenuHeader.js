// ** React Imports
import { useEffect } from "react";
import { Circle, X } from "react-feather";
import { NavLink } from "react-router-dom";
import { LootFatLogo } from "../../../../../assets/images";
import "../../../../../assets/scss/custom.scss";

const VerticalMenuHeader = (props) => {
  const {
    menuCollapsed,
    setMenuCollapsed,
    setMenuVisibility,
    setGroupOpen,
    menuHover,
  } = props;

  // ** Reset open group
  useEffect(() => {
    if (!menuHover && menuCollapsed) setGroupOpen([]);
  }, [menuHover, menuCollapsed]);

  // ** Menu toggler component
  const Toggler = () => {
    if (!menuCollapsed) {
      return (
        <>
          {/* <Disc
            size={20}
            data-tour="toggle-icon"
            className="text-primary toggle-icon d-none d-xl-block"
            onClick={() => setMenuCollapsed(true)}
          /> */}
        </>
      );
    } else {
      return (
        <Circle
          size={20}
          data-tour="toggle-icon"
          className="text-primary toggle-icon d-none d-xl-block"
          onClick={() => setMenuCollapsed(false)}
        />
      );
    }
  };

  return (
    <div className="navbar-header">
      <ul className="nav navbar-nav flex-row">
        <li className="nav-item mx-auto">
          <NavLink to="/dashboard" className="navbar-brand">
            <img src={LootFatLogo} height="45px" />
          </NavLink>
        </li>
        <li className="nav-item nav-toggle">
          <div className="nav-link modern-nav-toggle cursor-pointer">
            <Toggler />
            <X
              onClick={() => setMenuVisibility(false)}
              className="toggle-icon icon-x d-block d-xl-none"
              size={20}
            />
          </div>
        </li>
      </ul>
    </div>
  );
};

export default VerticalMenuHeader;
