import React from "react";
import { useDispatch } from "react-redux";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { deleteAnnouncementApi } from "../../redux/announcement/slice";

const DeleteQuestion = ({
  announcementId,
  deleteAnnouncementModal,
  setDeleteAnnouncementModal,
}) => {
  const dispatch = useDispatch();

  const handleDeleteAnnouncement = () => {
    if (announcementId) {
      dispatch(
        deleteAnnouncementApi({ announcementId, setDeleteAnnouncementModal })
      );
    }
  };

  return (
    <>
      <Modal
        isOpen={deleteAnnouncementModal}
        toggle={() => setDeleteAnnouncementModal(!deleteAnnouncementModal)}
        className="modal-dialog-centered"
        modalClassName="modal-primary"
      >
        <ModalHeader
          toggle={() => setDeleteAnnouncementModal(!deleteAnnouncementModal)}
        >
          Delete Announcement
        </ModalHeader>
        <ModalBody>
          Are you sure, You want to delete this Announcement ?
        </ModalBody>
        <ModalFooter>
          <Button
            outline
            type="button"
            color="primary"
            onClick={() => setDeleteAnnouncementModal(false)}
          >
            Cancel
          </Button>
          <Button color="primary" onClick={() => handleDeleteAnnouncement()}>
            Delete
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default DeleteQuestion;
