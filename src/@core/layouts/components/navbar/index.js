import { Fragment, useEffect } from "react";
import { Sun, Moon } from "react-feather";
import { NavItem, NavLink } from "reactstrap";
import NavbarUser from "./NavbarUser";
import NavbarBookmarks from "./NavbarBookmarks";

const ThemeNavbar = (props) => {
  const ThemeToggler = () => {
    if (skin === "dark") {
      return <Sun className="ficon" onClick={() => setSkin("light")} />;
    } else {
      return <Moon className="ficon" onClick={() => setSkin("dark")} />;
    }
  };
  // ** Props
  const { skin, setSkin, setMenuVisibility } = props;

  return (
    <Fragment>
      <div className="bookmark-wrapper d-flex align-items-center">
        <NavbarBookmarks setMenuVisibility={setMenuVisibility} />
        <div className="bookmark-wrapper d-flex align-items-center">
          <NavItem className="d-block">
            {/* <NavLink className="nav-link-style">
              <ThemeToggler />
            </NavLink> */}
          </NavItem>
        </div>
      </div>
      <NavbarUser skin={skin} setSkin={setSkin} />
    </Fragment>
  );
};

export default ThemeNavbar;
