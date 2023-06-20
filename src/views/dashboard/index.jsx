import React, { useEffect } from "react";
import { BarChart2, Search, ShoppingCart, User, UserCheck, Users } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody, Col, Row } from "reactstrap";
import BreadCrumbs from "../../@core/components/breadcrumbs";
import { dashboardCounts } from "../../redux/dashboard/slice";
import CustomSpinner from "../../@core/components/customSpinner";
import { useHistory } from "react-router-dom";
import { RiCouponLine, RiCoupon4Fill } from "react-icons/ri";

const Dashboard = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { isLoading, dashboardCountsData } = useSelector((store) => ({
    isLoading: store?.dashboard?.isLoading,
    dashboardCountsData: store?.dashboard?.dashboardCountsData,
  }));
  useEffect(() => {
    dispatch(dashboardCounts());
  }, []);

  const cardArray = [
    {
      name: "All Users",
      icon: <Users />,
      color: "bg-light-primary",
      count: dashboardCountsData?.total_users,
      route: "/user",
    },
    {
      name: "All Customers",
      icon: <Users />,
      color: "bg-light-danger",
      count: dashboardCountsData?.total_customers,
      route: `/user?tabIndex=1&filter=user`,
    },
    {
      name: "Total Shope",
      icon: <ShoppingCart />,
      color: "bg-light-info",
      count: dashboardCountsData?.total_shops,
      route: `/user?tabIndex=2&filter=researcher`,
    },
    {
      name: "Total Coupons",
      icon: <RiCouponLine />,
      color: "bg-light-success",
      count: dashboardCountsData?.total_coupons,
      route: "/group",
    },
    {
      name: "Total Redeem Coupons",
      icon: <RiCoupon4Fill />,
      color: "bg-light-warning",
      count: dashboardCountsData?.total_redeem_coupons,
    },
  ];

  useEffect(() => {
    // dispatch(dashboardCounts());
  }, []);

  return (
    <>
      {isLoading && <CustomSpinner />}
      <Col>
        <BreadCrumbs breadCrumbTitle="Dashboard" breadCrumbActive="Dashboard" />
      </Col>

      <Row className="mt-2">
        <Col lg="12">
          <Row className="match-height">
            {(cardArray || [])?.map((item, index) => (
              <Col key={index} lg="3" md="4" sm="6">
                <Card
                  className="cursor-pointer"
                  onClick={() => history.push(item?.route)}
                >
                  <CardBody>
                    <div className="d-flex align-items-center">
                      <div
                        className={`rounded-circle p-1 me-2 bg-light-primary ${item?.color}`}
                      >
                        {item?.icon}
                      </div>
                      <div className="my-auto">
                        <h4 className="fw-bolder mb-0">{item?.count || 0}</h4>
                        <p className="font-small-3 mb-0 card-text">
                          {item?.name}
                        </p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
