import { ErrorMessage, FieldArray, Form, Formik } from "formik";
import React, { useEffect } from "react";
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
import { useHistory } from "react-router-dom";
import {
  createQuestion,
  questionDetailList,
  updateQuestion,
} from "../../redux/questions/slice";
import { useLocation } from "react-router-dom";
import CustomSpinner from "../../@core/components/customSpinner";

const ActionQuestion = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { search } = useLocation();
  const questionId = new URLSearchParams(search).get("questionId");

  const { isLoading, questionDetailData } = useSelector((store) => ({
    isLoading: store?.question?.isLoading,
    questionDetailData: store?.question?.questionDetailData,
  }));

  useEffect(() => {
    if (questionId) {
      dispatch(questionDetailList(questionId));
    }
  }, [questionId]);

  return (
    <>
      {isLoading && <CustomSpinner />}

      <Formik
        enableReinitialize
        initialValues={{
          question: questionDetailData?.question || "",
          options: questionDetailData?.options || [],
        }}
        validationSchema={Yup.object().shape({
          question: Yup.string().required("Please enter question"),
          options: Yup.array().of(
            Yup.object().shape({
              option: Yup.string().required("Please enter option"),
            })
          ),
        })}
        onSubmit={(values) => {
          const data = {
            question: values?.question,
            options: values?.options,
          };
          if (questionId) {
            dispatch(updateQuestion({ questionId, data, history }));
          } else {
            dispatch(createQuestion({ data, history }));
          }
        }}
      >
        {({ values, handleSubmit, handleChange, handleBlur }) => (
          <Form onSubmit={handleSubmit}>
            <Card>
              <Row>
                <Col xs={6}>
                  <CardHeader>
                    <CardTitle tag="h4">Question</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <div>
                      <Label>Question</Label>
                      <Input
                        type="textarea"
                        rows={4}
                        placeholder="Write question here"
                        name="question"
                        value={values?.question}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      <ErrorMessage
                        name="question"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  </CardBody>
                </Col>

                <Col xs={6}>
                  <CardHeader>
                    <CardTitle tag="h4">Options</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <FieldArray name="options">
                      {({ remove, push }) => (
                        <>
                          {values?.options &&
                            values?.options?.length > 0 &&
                            (values?.options || [])?.map((item, index) => (
                              <div key={index} className="mb-1">
                                <Label>Option</Label>
                                <div className="d-flex gap-1 align-content-center">
                                  <Input
                                    type="text"
                                    name={`options.${index}.option`}
                                    value={item?.option}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  />
                                  <Button
                                    type="button"
                                    color="danger"
                                    onClick={() => remove(index)}
                                  >
                                    X
                                  </Button>
                                </div>
                                <ErrorMessage
                                  name={`options.${index}.option`}
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                            ))}
                          <div className="d-flex justify-content-end">
                            <Button
                              type="button"
                              color="success"
                              onClick={() => push({ option: "" })}
                            >
                              Add Option
                            </Button>
                          </div>
                        </>
                      )}
                    </FieldArray>
                  </CardBody>
                </Col>

                <CardFooter className="d-flex justify-content-end">
                  <Button type="submit" color="primary">
                    {questionId ? "Update" : "Add"}
                  </Button>
                </CardFooter>
              </Row>
            </Card>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ActionQuestion;
