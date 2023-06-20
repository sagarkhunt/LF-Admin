import React, { useEffect, useState } from "react";
import { ErrorMessage, FieldArray, Form, Formik } from "formik";
import * as Yup from "yup";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Input,
  Label,
  Row,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import DragAndDropImage from "../../commonComponent/DragAndDropImage";
import {
  announcementDetailList,
  createAnnouncement,
  updateAnnouncement,
} from "../../redux/announcement/slice";

const Announcement = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [thumbnailLink, setThumbnailLink] = useState("");
  const { search } = useLocation();
  const announcementId = new URLSearchParams(search).get("announcementId");
  const { isLoading, announcementDetailData } = useSelector((store) => ({
    isLoading: store?.annoucement?.isLoading,
    announcementDetailData: store?.annoucement?.announcementDetailData,
  }));
  useEffect(() => {
    if (announcementId) {
      dispatch(announcementDetailList(announcementId));
    }
  }, [announcementId]);
  return (
    <Formik
      enableReinitialize
      initialValues={{
        title: announcementDetailData?.title || "",
        description: announcementDetailData?.description || "",
        announcement_image: announcementDetailData?.announcement_image || "",
      }}
      validationSchema={Yup.object().shape({
        title: Yup.string().required("Please enter title"),
        description: Yup.string().required("Please enter title"),
        announcement_image: Yup.string().required("Please upload image"),
      })}
      onSubmit={(values) => {
        const formData = new FormData();
        if (typeof values?.announcement_image !== "string") {
          formData.append("announcement_image", values?.announcement_image);
        }
        formData.append("title", values?.title);
        formData.append("description", values?.description);
        if (announcementId) {
          dispatch(updateAnnouncement({ announcementId, formData, history }));
        } else {
          dispatch(createAnnouncement({ formData, history }));
        }
      }}
    >
      {({ values, handleSubmit, setFieldValue, handleChange, handleBlur }) => (
        <Form onSubmit={handleSubmit}>
          <Card>
            <Row>
              <Col xs={6}>
                <CardHeader>
                  <CardTitle tag="h4">Announcement</CardTitle>
                </CardHeader>
                <CardBody>
                  <div>
                    <Label>Title</Label>
                    <Input
                      type="text"
                      rows={4}
                      placeholder="Enter title"
                      name="title"
                      value={values?.title}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <ErrorMessage
                      name="title"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Input
                      type="textarea"
                      rows={4}
                      placeholder="Enter description"
                      name="description"
                      value={values?.description}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </CardBody>
              </Col>
              <Col>
                <div className="d-flex gap-2 mt-3">
                  <div>
                    <Label>Announcement Image</Label>
                    <div style={{ height: "200px", width: "200px" }}>
                      <DragAndDropImage
                        name="announcement_image"
                        setFieldValue={setFieldValue}
                        setThumbnailLink={setThumbnailLink}
                      />
                    </div>
                    <ErrorMessage
                      name="announcement_image"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  {values?.announcement_image && (
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
                        {typeof values?.announcement_image === "string" && (
                          <img
                            src={values?.announcement_image}
                            crossOrigin="anonymous"
                            className="h-100 w-100"
                            style={{ objectFit: "contain" }}
                          />
                        )}
                        {typeof values?.announcement_image === "object" && (
                          <img
                            src={URL.createObjectURL(
                              values?.announcement_image
                            )}
                            className="h-100 w-100"
                            style={{ objectFit: "contain" }}
                          />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </Col>

              <CardFooter className="d-flex justify-content-end gap-1">
                <Button type="submit" color="primary ml-2 ">
                  {announcementId ? "Update" : "Add"}
                </Button>
                <Button
                  type="button"
                  color="primary"
                  onClick={() => {
                    history.push(`/announcement`);
                  }}
                >
                  Cancel
                </Button>
              </CardFooter>
            </Row>
          </Card>
        </Form>
      )}
    </Formik>
  );
};

export default Announcement;
