import { ErrorMessage, Formik } from "formik";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Edit, Send, Trash2 } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Offcanvas,
  OffcanvasBody,
  OffcanvasHeader,
  Row,
  UncontrolledTooltip,
} from "reactstrap";
import * as Yup from "yup";
import BreadCrumbs from "../../@core/components/breadcrumbs";
import CustomSpinner from "../../@core/components/customSpinner";
import CustomTable from "../../@core/components/table/CustomTable";
import { announcementList, sendAnnouncementApi, updateStatus } from "../../redux/announcement/slice";
import DeleteAnnouncement from "../announcement/DeleteAnnouncement";
import { sponsoredList, updateSponsoredStatus } from "../../redux/sponsored/slice";

const SponsoredList = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [logo, setLogo] = useState(null);
  const [logoUrl, setLogoUrl] = useState(null);
  const [announceData, setAnnounceData] = useState([]);
  const [selectIndex, setSelectIndex] = useState(-1);
  const [announcementId, setAnnouncementId] = useState(null);
  const [deleteAnnouncementModal, setDeleteAnnouncementModal] = useState(false);

  const handleClose = () => {
    setShow(false);
    setSelectIndex(-1);
  };
  const handleShow = () => setShow(true);

  const {
    isLoading,
    sponsoredListData,
    counts,
    status,
    updateSponsoredStatusData
  } = useSelector((store) => ({
    isLoading: store?.sponsored?.isLoading,
    counts: store?.sponsored?.sponsoredListData,
    sponsoredListData: store?.sponsored?.sponsoredListData?.results,
    updateSponsoredStatusData: store?.sponsored?.updateSponsoredStatus,
    status: store?.sponsored?.updateStatus,
  }));
  const handlePageChange = (page) => {
    setPage(page);
  };

  const logoChange = (files) => {
    const fileGet = files[0];
    setLogo(fileGet);
    setLogoUrl(URL.createObjectURL(files[0]));
  };

  const handlePerPageChange = (limit) => {
    setLimit(limit);
  };

  // useEffect(() => {
  //   dispatch(announcementList({ page: page, limit: limit, search: search }));
  // }, []);

  useEffect(() => {
    dispatch(sponsoredList({ page: page, limit: limit, search: search }));
  }, [page, limit, search, updateSponsoredStatusData]);

  useEffect(() => {
    if (selectIndex !== -1) {
      setSelectIndex(-1);
    }
  }, [status]);

  const ColumnHeaders = () => (
    <>
      <th className="text-center">No.</th>
      <th className="">Banner Image</th>
      <th>Title</th>
      <th className="text-center">From Date</th>
      <th className="text-center">To Date</th>
      <th>Status</th>
      <th className="text-center">Action</th>
    </>
  );

  const DataRows = () => (
    <>
      {(sponsoredListData || [])?.map((row, index) => (
        <tr key={index}>
          <td className="text-center">
            {(counts?.page - 1) * counts?.limit + index}
          </td>
          <td className="text-center">
            {/* <img src={row?.announcement_image} className="h-50 w-50" /> */}
            <img
              src={row?.banner_image}
              height="40px"
              width="40px"
              crossOrigin="anonymous"
              className="rounded-circle"
              style={{ objectFit: "cover" }}
            />
          </td>
          <td>
            <h6>{row?.title}</h6>
            <p>{row?.description}</p>
          </td>
          <td className="text-center">
            {moment(row?.from_date).format("DD-MM-YYYY")}
          </td>
          <td className="text-center">
            {moment(row?.to_date).format("DD-MM-YYYY")}
          </td>
          <td className="text-center">
            <div className="form-check form-switch">
              <Input
                type="switch"
                name="customSwitch"
                className="cursor-pointer"
                checked={row?.verified_by_admin}
                onChange={(e) => {
                  // const data = announcementListData
                  // setSelectIndex(index);
                  dispatch(updateSponsoredStatus({ id: row?._id }));
                  //handleFraudUser(row.id);
                }}
              />
            </div>
          </td>
          <td>
            <div className="d-flex justify-content-center align-items-center gap-1">
              {/* <Send
                id={`edit-${row?._id}`}
                color="gray"
                size={15}
                className="cursor-pointer"
                onClick={() => {
                  dispatch(sendAnnouncementApi({ id: row?._id }));
                }}
              />
              <UncontrolledTooltip placement="top" target={`edit-${row?._id}`}>
                Send Notification
              </UncontrolledTooltip> */}
              <Edit
                id={`edit-${row?._id}`}
                color="gray"
                size={15}
                className="cursor-pointer"
                onClick={() => {
                  history.push(
                    `sponsored/add-sponsored?sponsoredId=${row?._id}`
                  );
                }}
              />
              <UncontrolledTooltip placement="top" target={`edit-${row?._id}`}>
                Edit Question
              </UncontrolledTooltip>
              {/* <Trash2
                id={`delete-${row?._id}`}
                color="gray"
                size={15}
                className="cursor-pointer"
                onClick={() => {
                  setAnnouncementId(row?._id);
                  setDeleteAnnouncementModal(true);
                }}
              />
              <UncontrolledTooltip
                placement="top"
                target={`delete-${row?._id}`}
              >
                Delete Question
              </UncontrolledTooltip> */}
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
            breadCrumbTitle="Sponsored"
            breadCrumbActive="Sponsored List"
          />
        </Col>
        {/* <Col xs={6} className="d-flex justify-content-end">
          <Button color="primary" onClick={() => handleShow()}>
            Add Announcement
          </Button>
        </Col> */}
        {/* <Col xs={6} className="d-flex justify-content-end">
          <Button
            color="primary"
            onClick={() => history.push(`/sponsored/add-sponsored`)}
          >
            Add Announcements
          </Button>
        </Col> */}
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
     
      {deleteAnnouncementModal && (
        <DeleteAnnouncement
          announcementId={announcementId}
          deleteAnnouncementModal={deleteAnnouncementModal}
          setDeleteAnnouncementModal={setDeleteAnnouncementModal}
        />
      )}
    </>
  );
};

export default SponsoredList;
