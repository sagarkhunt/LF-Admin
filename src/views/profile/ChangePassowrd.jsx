import { ErrorMessage, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import InputPasswordToggle from "@components/input-password-toggle";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Form,
  Input,
  Label,
} from "reactstrap";
import * as Yup from "yup";
import { changePassword } from "../../redux/profile/slice";
// import { changePasswordApi } from "../../redux/profile/slice";

const ChangePassowrd = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <>
      <Card>
        <Formik
          enableReinitialize
          initialValues={{
            current_password: "",
            new_password: "",
            confirm_password: "",
          }}
          validationSchema={Yup.object().shape({
            current_password: Yup.string().required(
              "Please enter current password"
            ),
            new_password: Yup.string().required("Please enter new passowrd"),
            confirm_password: Yup.string()
              .oneOf([Yup.ref("new_password"), null], "Password not matched")
              .required("Please confirm password"),
          })}
          onSubmit={(values) => {
            const body = {
              current_password: values?.current_password,
              new_password: values?.new_password,
            };
            dispatch(changePassword({ body, history }));
          }}
        >
          {({
            dirty,
            isValid,
            values,
            handleSubmit,
            handleChange,
            handleBlur,
          }) => (
            <Form onSubmit={handleSubmit}>
              <CardBody>
                <div>
                  <Label>Current Password</Label>
                  <Input
                    type="password"
                    placeholder="Enter current password"
                    name="current_password"
                    value={values?.current_password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <ErrorMessage
                    name="current_password"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="mt-1">
                  <Label>New Password</Label>
                  <InputPasswordToggle
                    placeholder="Enter new passowrd"
                    name="new_password"
                    value={values?.new_password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <ErrorMessage
                    name="new_password"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="mt-1">
                  <Label>Confirm New Password</Label>
                  <InputPasswordToggle
                    placeholder="Enter confirm password"
                    name="confirm_password"
                    value={values?.confirm_password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <ErrorMessage
                    name="confirm_password"
                    component="div"
                    className="text-danger"
                  />
                </div>
              </CardBody>
              <CardFooter>
                <div className="d-flex justify-content-end">
                  <Button
                    type="submit"
                    color="primary"
                    disabled={!(dirty && isValid)}
                  >
                    Change
                  </Button>
                </div>
              </CardFooter>
            </Form>
          )}
        </Formik>
      </Card>
    </>
  );
};

export default ChangePassowrd;
