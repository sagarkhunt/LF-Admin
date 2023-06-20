import React from "react";
import { useDispatch } from "react-redux";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { deleteQuestion } from "../../redux/questions/slice";

const DeleteQuestion = ({
  questionId,
  deleteQuestionModal,
  setDeleteQuestionModal,
}) => {
  const dispatch = useDispatch();

  const handleDeleteQuestion = () => {
    if (questionId) {
      dispatch(deleteQuestion({ questionId, setDeleteQuestionModal }));
    }
  };

  return (
    <>
      <Modal
        isOpen={deleteQuestionModal}
        toggle={() => setDeleteQuestionModal(!deleteQuestionModal)}
        className="modal-dialog-centered"
        modalClassName="modal-primary"
      >
        <ModalHeader
          toggle={() => setDeleteQuestionModal(!deleteQuestionModal)}
        >
          Delete Question
        </ModalHeader>
        <ModalBody>Are you sure, You want to delete this Question ?</ModalBody>
        <ModalFooter>
          <Button
            outline
            type="button"
            color="primary"
            onClick={() => setDeleteQuestionModal(false)}
          >
            Cancel
          </Button>
          <Button color="primary" onClick={() => handleDeleteQuestion()}>
            Delete
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default DeleteQuestion;
