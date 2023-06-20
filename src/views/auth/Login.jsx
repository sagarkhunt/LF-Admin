import InputPasswordToggle from "@components/input-password-toggle";
import "@styles/react/pages/page-authentication.scss";
import { ErrorMessage, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Form,
  Input,
  Label,
} from "reactstrap";
import * as Yup from "yup";
import "../../@core/components/customSpinner/loader.scss";
import { LootFatLogo } from "../../assets/images";
import "../../assets/scss/custom.scss";
import { adminLogin } from "../../redux/auth/slice";

const LoginCover = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { loading } = useSelector((store) => store?.auth);

  return (
    <>
      <div className="auth-wrapper auth-basic">
        <div className="auth-inner my-2">
          <Card className="mb-0">
            <CardBody>
              <div className="brand-logo align-items-center d-flex justify-content-center mt-1 mb-2">
                <img src={LootFatLogo} height="50px" />
              </div>
              <CardTitle tag="h4" className="mb-1">
                Welcome to Lootfat! 👋
              </CardTitle>
              <CardText className="mb-2">
                Please sign-in to your account and start the adventure
              </CardText>
              <Formik
                enableReinitialize
                initialValues={{
                  first_name: "",
                  password: "",
                }}
                validationSchema={Yup.object().shape({
                  first_name: Yup.string().required("Please enter name"),
                  password: Yup.string().required("Please enter your password"),
                })}
                onSubmit={(values) => {
                  const data = {
                    first_name: values?.first_name,
                    password: values?.password,
                  };
                  dispatch(adminLogin({ data, history }));
                }}
              >
                {({ values, handleChange, handleBlur, handleSubmit }) => (
                  <Form
                    className="auth-login-form mt-2"
                    onSubmit={handleSubmit}
                  >
                    <div className="mb-1">
                      <Label className="form-label">Name</Label>
                      <Input
                        type="text"
                        name="first_name"
                        placeholder="Enter your name"
                        value={values?.first_name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <ErrorMessage
                        name="first_name"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="mb-1">
                      <InputPasswordToggle
                        name="password"
                        label="Password"
                        htmlFor="basic-default-password"
                        value={values?.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="position-relative">
                      <Button
                        block
                        type="submit"
                        color="primary"
                        className={loading ? "LoadingContainer1" : ""}
                      >
                        Log in
                      </Button>
                      {loading && (
                        <div className="LoadingBox1">
                          <span className="Loading1"></span>
                        </div>
                      )}
                    </div>
                  </Form>
                )}
              </Formik>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
};

export default LoginCover;
