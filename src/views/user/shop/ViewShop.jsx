import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import CustomSpinner from "../../../@core/components/customSpinner";
import { userDetail } from "../../../redux/user/slice";
import BreadCrumbs from "../../../@core/components/breadcrumbs";
import { Badge, Card, CardBody, Col } from "reactstrap";
import moment from "moment";

const ViewShop = () => {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const userId = new URLSearchParams(search).get("userId");

  const { isLoading, userDetailData } = useSelector((store) => ({
    isLoading: store?.user?.isLoading,
    userDetailData: store?.user?.userDetailData,
  }));

  useEffect(() => {
    if (userId) {
      dispatch(userDetail(userId));
    }
  }, [userId]);

  return (
    <>
      {isLoading && <CustomSpinner />}

      <BreadCrumbs
        breadCrumbTitle="User"
        breadCrumbParent={{ route: "/user", name: "User List" }}
        breadCrumbActive="Shop Detail"
      />

      <Col xs={6} className="mt-1">
        <Card>
          <CardBody>
            <div className="d-flex gap-2">
              <div style={{ height: "150px", width: "150px" }}>
                <img
                  src={userDetailData?.user_image}
                  className="rounded-3 h-100 w-100 object-fit-contain"
                />
              </div>
              <div>
                <h3>{`${userDetailData?.first_name || ""} ${
                  userDetailData?.last_name || ""
                }`}</h3>
                <h6 className="text-muted mt-1">
                  {userDetailData?.phone_number || ""}
                </h6>
                {/* <h6 className="text-muted mt-1">
                  {moment(userDetailData?.dob).format("DD MMM YYYY")}
                </h6> */}
                <h6 className="text-muted mt-1">
                  <Badge
                    color={`${
                      userDetailData?.isActive
                        ? "light-success"
                        : "light-danger"
                    }`}
                  >
                    {userDetailData?.isActive ? "Active" : "Deactive"}
                  </Badge>
                </h6>
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default ViewShop;
