import "@styles/base/pages/page-misc.scss";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { LootFatLogo } from "../assets/images";

const NotAuthorized = () => {
  return (
    <div className="misc-wrapper">
      <Link className="brand-logo" to="/">
        <img src={LootFatLogo} className="error-text" />
      </Link>
      <div className="misc-inner p-2 p-sm-3">
        <div className="w-100 text-center">
          <h2 className="mb-1">You are not authorized! 🔐</h2>
          <p className="mb-2">
            The Webtrends Marketing Lab website in IIS uses the default IUSR
            account credentials to access the web pages it serves.
          </p>
          <Button
            tag={Link}
            to="/"
            color="primary"
            className="btn-sm-block mb-1"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};
export default NotAuthorized;
