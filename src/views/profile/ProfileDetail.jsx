import { ErrorMessage, Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Col,
  Input,
  Label,
  Row,
} from "reactstrap";
import * as Yup from "yup";
import CustomSpinner from "../../@core/components/customSpinner";
import DragAndDropImage from "../../commonComponent/DragAndDropImage";
import { updateProfile } from "../../redux/profile/slice";

const ProfileDetail = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [thumbnailLink, setThumbnailLink] = useState("");

  const { isLoading, adminDetailData } = useSelector((store) => ({
    isLoading: store?.profile?.isLoading,
    adminDetailData: store?.profile?.adminDetailData,
  }));

  return (
    <>
      {isLoading && <CustomSpinner />}
      <Card>
        <Formik
          enableReinitialize
          initialValues={{
            user_image: adminDetailData?.user_image || "",
            first_name: adminDetailData?.first_name || "",
            last_name: adminDetailData?.last_name || "",
          }}
          validationSchema={Yup.object().shape({
            user_image: Yup.string().required("Please upload image"),
            first_name: Yup.string().trim().required("Please enter first name"),
            last_name: Yup.string().trim().required("Please enter last name"),
          })}
          onSubmit={(values) => {
            const formData = new FormData();
            if (typeof values?.user_image !== "string") {
              formData.append("user_image", values?.user_image);
            }
            formData.append("first_name", values?.first_name);
            formData.append("last_name", values?.last_name);
            dispatch(updateProfile({ formData, history }));
          }}
        >
          {({
            dirty,
            isValid,
            values,
            setFieldValue,
            handleSubmit,
            handleChange,
            handleBlur,
          }) => (
            <Form onSubmit={handleSubmit}>
              <CardBody>
                <Col>
                  <div className="d-flex gap-2">
                    <div>
                      <Label>Profile Picture</Label>
                      <div style={{ height: "200px", width: "200px" }}>
                        <DragAndDropImage
                          name="user_image"
                          setFieldValue={setFieldValue}
                          setThumbnailLink={setThumbnailLink}
                        />
                      </div>
                      <ErrorMessage
                        name="user_image"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    {values?.user_image && (
                      <div>
                        <Label>Preview</Label>
                        <div
                          className="dark-layout dropzone"
                          style={{
                            height: "200px",
                            width: "200px",
                            border: "1px dashed #FC7901",
                            borderRadius: "0.357rem",
                            cursor: "default",
                          }}
                        >
                          {typeof values?.user_image === "string" && (
                            <img
                              src={adminDetailData?.user_image}
                              className="h-100 w-100"
                              crossOrigin="anonymous"
                              style={{ objectFit: "contain" }}
                            />
                          )}
                          {typeof values?.user_image === "object" && (
                            <img
                              src={URL.createObjectURL(values?.user_image)}
                              className="h-100 w-100"
                              crossOrigin="anonymous"
                              style={{ objectFit: "contain" }}
                            />
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </Col>

                <Col xs={12}>
                  <Row>
                    <Col xs={6} className="mt-1">
                      <Label>First Name</Label>
                      <Input
                        name="first_name"
                        placeholder="Enter first name"
                        value={values?.first_name}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      <ErrorMessage
                        name="first_name"
                        component="div"
                        className="text-danger"
                      />
                    </Col>
                    <Col xs={6} className="mt-1">
                      <Label>Last Name</Label>
                      <Input
                        name="last_name"
                        placeholder="Enter Last name"
                        value={values?.last_name}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      <ErrorMessage
                        name="last_name"
                        component="div"
                        className="text-danger"
                      />
                    </Col>
                  </Row>
                </Col>
              </CardBody>
              <CardFooter>
                <div className="d-flex justify-content-end">
                  <Button
                    type="submit"
                    color="primary"
                    disabled={!(dirty && isValid)}
                  >
                    Update
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

export default ProfileDetail;
