import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row, UncontrolledTooltip } from "reactstrap";
import CustomSpinner from "../../@core/components/customSpinner";
import CustomTable from "../../@core/components/table/CustomTable";
import BreadCrumbs from "../../@core/components/breadcrumbs";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Edit, Eye, Trash2 } from "react-feather";
import { questionList } from "../../redux/questions/slice";
import moment from "moment";
import DeleteQuestion from "./DeleteQuestion";

const QuestionsList = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [questionId, setQuestionId] = useState(null);
  const [deleteQuestionModal, setDeleteQuestionModal] = useState(false);

  const { isLoading, counts, questionListData, deleteQuestionData } =
    useSelector((store) => ({
      isLoading: store?.question?.isLoading,
      counts: store?.question?.questionListData,
      questionListData: store?.question?.questionListData?.results,
      deleteQuestionData: store?.question?.deleteQuestionData,
    }));

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handlePerPageChange = (limit) => {
    setLimit(limit);
  };

  useEffect(() => {
    dispatch(questionList());
  }, [deleteQuestionData]);

  const ColumnHeaders = () => (
    <>
      <th className="text-center">No.</th>
      <th className="">Question</th>
      <th className="text-center">Create Date</th>
      <th className="text-center">Action</th>
    </>
  );

  const DataRows = () => (
    <>
      {(questionListData || [])?.map((row, index) => (
        <tr key={index}>
          <td className="text-center">
            {(counts?.page - 1) * counts?.limit + index}
          </td>
          <td className="">{row?.question || ""}</td>
          <td className="text-center">
            {moment(row?.createdAt).format("DD-MM-YYYY")}
          </td>
          <td>
            <div className="d-flex justify-content-center align-items-center gap-1">
              <Eye
                id={`view-${row?._id}`}
                color="gray"
                size={15}
                className="cursor-pointer"
              />
              <UncontrolledTooltip placement="top" target={`view-${row?._id}`}>
                View Question
              </UncontrolledTooltip>
              <Edit
                id={`edit-${row?._id}`}
                color="gray"
                size={15}
                className="cursor-pointer"
                onClick={() =>
                  history.push(
                    `questions/action-questions?questionId=${row?._id}`
                  )
                }
              />
              <UncontrolledTooltip placement="top" target={`edit-${row?._id}`}>
                Edit Question
              </UncontrolledTooltip>
              <Trash2
                id={`delete-${row?._id}`}
                color="gray"
                size={15}
                className="cursor-pointer"
                onClick={() => {
                  setQuestionId(row?._id);
                  setDeleteQuestionModal(true);
                }}
              />
              <UncontrolledTooltip
                placement="top"
                target={`delete-${row?._id}`}
              >
                Delete Question
              </UncontrolledTooltip>
            </div>
          </td>
        </tr>
      ))}
    </>
  );

  return (
    <>
      {isLoading && <CustomSpinner />}

      <Row>
        <Col xs={6}>
          <BreadCrumbs
            breadCrumbTitle="Question"
            breadCrumbActive="Question List"
          />
        </Col>
        <Col xs={6} className="d-flex justify-content-end">
          <Button
            color="primary"
            onClick={() => history.push(`/questions/action-questions`)}
          >
            Add Question
          </Button>
        </Col>
      </Row>

      <Card className="mt-1">
        <CustomTable
          columnHeaders={<ColumnHeaders />}
          dataRows={<DataRows />}
          totalCount={counts?.totalResults || 0}
          pageNumber={page}
          perPage={limit}
          getSearchValue={setSearch}
          isPerPageChange={true}
          handlePageChange={handlePageChange}
          handlePerPageChangeValue={handlePerPageChange}
        />
      </Card>

      {deleteQuestionModal && (
        <DeleteQuestion
          questionId={questionId}
          deleteQuestionModal={deleteQuestionModal}
          setDeleteQuestionModal={setDeleteQuestionModal}
        />
      )}
    </>
  );
};

export default QuestionsList;
