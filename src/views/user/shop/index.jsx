import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { userList } from "../../../redux/user/slice";
import CustomTable from "../../../@core/components/table/CustomTable";
import moment from "moment";
import { Check, Eye, X } from "react-feather";
import { Input, Label, UncontrolledTooltip } from "reactstrap";

const Shop = ({ searchUser }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { pageCounts, shopListData } = useSelector((store) => ({
    pageCounts: store?.user?.userListData,
    shopListData: store?.user?.userListData?.results,
  }));

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handlePerPageChange = (limit) => {
    setLimit(limit);
  };

  const handleStatusChange = () => {};

  useEffect(() => {
    dispatch(userList({ page, limit, searchUser, userFilter: true }));
  }, [page, limit, searchUser]);

  const ColumnHeaders = () => (
    <>
      <th className="text-center">No.</th>
      <th>Name</th>
      <th className="text-center">DOB</th>
      <th className="text-center">Active</th>
      <th className="text-center">Joined Date</th>
      <th className="text-center">Action</th>
    </>
  );

  const DataRows = () => (
    <>
      {shopListData?.map((row, index) => (
        <tr key={index}>
          <td className="text-center">
            {(pageCounts?.page - 1) * pageCounts?.limit + index + 1}
          </td>
          <td>
            <div className="d-flex align-items-center gap-1">
              <img
                src={row?.user_image}
                height="40px"
                width="40px"
                crossOrigin="anonymous"
                className="rounded-circle"
                style={{ objectFit: "cover" }}
              />
              <div>
                <div className="d-flex">
                  <span className="my-auto fw-bold">
                    {`${row?.first_name || ""} ${row?.last_name || ""}`}
                  </span>
                </div>
                <span>{row?.phone_number || ""}</span>
              </div>
            </div>
          </td>
          <td className="text-center">
            {moment(row?.dob).format("DD MMM YYYY") || ""}
          </td>
          <td>
            <div className="d-flex justify-content-center">
              <div className="form-switch">
                <Input
                  id={`active-${row?._id}`}
                  type="switch"
                  name="customSwitch"
                  className="cursor-pointer"
                  checked={row?.isActive}
                  onChange={(e) => handleStatusChange(row._id, index)}
                />
                <Label
                  className="form-check-label"
                  htmlFor={`active-${row?._id}`}
                >
                  <span className="switch-icon-left">
                    <Check />
                  </span>
                  <span className="switch-icon-right">
                    <X />
                  </span>
                </Label>
              </div>
            </div>
          </td>

          <td className="text-center">
            {moment(row?.createdAt).format("DD MMM YYYY") || ""}
          </td>
          <td>
            <div className="d-flex justify-content-center align-items-center gap-1">
              <Eye
                id={`tooltip-${row?._id}`}
                color="gray"
                size={15}
                className="cursor-pointer"
                onClick={() =>
                  history.push(`/user/view-shop?userId=${row?._id}`)
                }
              />
              <UncontrolledTooltip
                placement="top"
                target={`tooltip-${row?._id}`}
              >
                View Shop
              </UncontrolledTooltip>
            </div>
          </td>
        </tr>
      ))}
    </>
  );

  return (
    <>
      <CustomTable
        columnHeaders={<ColumnHeaders />}
        dataRows={<DataRows />}
        pageNumber={page}
        perPage={limit}
        isPerPageChange={true}
        totalCount={pageCounts?.totalResults || 0}
        handlePageChange={handlePageChange}
        handlePerPageChangeValue={handlePerPageChange}
      />
    </>
  );
};

export default Shop;
