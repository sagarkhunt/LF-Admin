import Avatar from "@components/avatar";
import { Power, User } from "react-feather";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const UserDropdown = () => {
  const history = useHistory();
  const MySwal = withReactContent(Swal);

  const { adminDetailData } = useSelector((store) => ({
    adminDetailData: store?.profile?.adminDetailData,
  }));

  const logout = async () => {
    return MySwal.fire({
      text: "Are you sure, you want to logout ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-outline-primary ms-1",
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        history.push("./login");
      }
    });
  };

  return (
    <>
      <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
        <DropdownToggle
          href="/"
          tag="a"
          className="nav-link dropdown-user-link"
          onClick={(e) => e.preventDefault()}
        >
          <div className="user-nav d-sm-flex d-none">
            <span className="user-name fw-bold">
              {`${adminDetailData?.first_name || ""} ${
                adminDetailData?.last_name || ""
              }`}
            </span>
          </div>

          <img
            src={adminDetailData?.user_image}
            crossOrigin="anonymous"
            style={{
              height: "40px",
              width: "40px",
              objectFit: "cover",
              borderRadius: "100%",
            }}
          />
        </DropdownToggle>
        <DropdownMenu end>
          <DropdownItem
            className="w-100"
            onClick={() => history.push("/profile")}
          >
            <User size={14} className="me-75" />
            <span className="align-middle">Profile</span>
          </DropdownItem>

          <DropdownItem className="w-100" onClick={() => logout()}>
            <Power size={14} className="me-75" />
            <span className="align-middle">Logout</span>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </>
  );
};

export default UserDropdown;
