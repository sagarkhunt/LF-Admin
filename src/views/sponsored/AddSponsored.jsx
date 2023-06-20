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
  sponsoredDetailList,
  updateSponsored,
} from "../../redux/sponsored/slice";
import Flatpickr from "react-flatpickr";
import moment from "moment";

const SponsoredEdit = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [thumbnailLink, setThumbnailLink] = useState("");
  const { search } = useLocation();
  const sponsoredId = new URLSearchParams(search).get("sponsoredId");
  const { isLoading, sponsoredDetailData } = useSelector((store) => ({
    isLoading: store?.sponsored?.isLoading,
    sponsoredDetailData: store?.sponsored?.sponsoredDetailData,
  }));

  const [picker, setPicker] = useState("");
  const [fromData, setFromData] = useState(
    new Date(moment(sponsoredDetailData?.from_date).format("YYYY-MM-DD"))
  );
  const [toDate, setToDate] = useState(
    new Date(moment(sponsoredDetailData?.to_date).format("YYYY-MM-DD"))
  );

  useEffect(() => {
    if (picker?.length === 2) {
      setFromData(moment(picker[0]).format("YYYY-MM-DD"));
      setToDate(moment(picker[1]).format("YYYY-MM-DD"));
    }
  }, [picker]);

  useEffect(() => {
    if (sponsoredId) {
      dispatch(sponsoredDetailList(sponsoredId));
    }
  }, [sponsoredId]);
  return (
    <Formik
      enableReinitialize
      initialValues={{
        title: sponsoredDetailData?.title || "",
        description: sponsoredDetailData?.description || "",
        banner_image: sponsoredDetailData?.banner_image || "",
        from_date: fromData || "",
        to_date: toDate || "",
      }}
      validationSchema={Yup.object().shape({
        title: Yup.string().required("Please enter title"),
        description: Yup.string().required("Please enter title"),
        banner_image: Yup.string().required("Please upload image"),
      })}
      onSubmit={(values) => {
        const formData = new FormData();
        if (typeof values?.banner_image !== "string") {
          formData.append("banner_image", values?.banner_image);
        }
        formData.append("title", values?.title);
        formData.append("from_date", values?.from_date);
        formData.append("to_date", values?.to_date);
        formData.append("description", values?.description);
        if (sponsoredId) {
          dispatch(updateSponsored({ sponsoredId, formData, history }));
        }
      }}
    >
      {({ values, handleSubmit, setFieldValue, handleChange, handleBlur }) => (
        <Form onSubmit={handleSubmit}>
          <Card>
            <Row>
              <Col xs={6}>
                <CardHeader>
                  <CardTitle tag="h4">Sponsored</CardTitle>
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
                  <div>
                    <Label>Select Date</Label>
                    <Flatpickr
                      name="dateRange"
                      placeholder={
                        sponsoredDetailData?.from_date &&
                        sponsoredDetailData?.to_date
                          ? `${moment(sponsoredDetailData?.from_date).format(
                              "YYYY-MM-DD"
                            )} to ${moment(sponsoredDetailData?.to_date).format(
                              "YYYY-MM-DD"
                            )}`
                          : "Select date range"
                      }
                      className="form-control"
                      value={picker}
                      onChange={(date) => setPicker(date)}
                      options={{
                        mode: "range",
                        dateFormat: "d-m-Y",
                      }}
                    />
                  </div>
                </CardBody>
              </Col>
              <Col>
                <div className="d-flex gap-2 mt-3">
                  <div>
                    <Label>Banner Image</Label>
                    <div style={{ height: "200px", width: "200px" }}>
                      <DragAndDropImage
                        name="banner_image"
                        setFieldValue={setFieldValue}
                        setThumbnailLink={setThumbnailLink}
                      />
                    </div>
                    <ErrorMessage
                      name="banner_image"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  {values?.banner_image && (
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
                        {typeof values?.banner_image === "string" && (
                          <img
                            src={values?.banner_image}
                            crossOrigin="anonymous"
                            className="h-100 w-100"
                            style={{ objectFit: "contain" }}
                          />
                        )}
                        {typeof values?.banner_image === "object" && (
                          <img
                            src={URL.createObjectURL(values?.banner_image)}
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
                  {sponsoredId ? "Update" : "Add"}
                </Button>
                <Button
                  type="button"
                  color="primary"
                  onClick={() => {
                    history.push(`announcement`);
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

export default SponsoredEdit;
