import React, { useState } from "react";
import { ShoppingBag, User } from "react-feather";
import { useSelector } from "react-redux";
import {
  Card,
  Col,
  Input,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import BreadCrumbs from "../../@core/components/breadcrumbs";
import CustomSpinner from "../../@core/components/customSpinner";
import UserList from "./userList";
import Shop from "./shop";

const Users = () => {
  const tabArray = [
    { name: "User", icon: <User size={20} /> },
    {
      name: "Shop",
      icon: <ShoppingBag size={20} />,
    },
  ];

  const [searchUser, setSearchUser] = useState("");
  const [activeTab, setActiveTab] = useState(0);

  const { isLoading } = useSelector((store) => ({
    isLoading: store?.user?.isLoading,
  }));

  return (
    <>
      {isLoading && <CustomSpinner />}
      <Col>
        <BreadCrumbs
          breadCrumbTitle="User"
          breadCrumbActive={activeTab === 0 ? "User List" : "Shop List"}
        />
      </Col>

      <Card className="mt-1">
        <Row className="px-2 py-1 d-flex justify-content-between">
          <Col>
            <Nav tabs>
              <NavItem className="d-flex">
                {(tabArray || [])?.map((item, index) => (
                  <NavLink
                    key={index}
                    active={activeTab === index}
                    onClick={() => {
                      setActiveTab(index);
                    }}
                  >
                    <div className="d-flex justify-content-center align-content-center">
                      {item?.icon}
                      {item?.name}
                    </div>
                  </NavLink>
                ))}
              </NavItem>
            </Nav>
          </Col>
          <Col xs={2}>
            <Input
              placeholder="Search"
              onChange={(e) => {
                setTimeout(() => setSearchUser(e.target.value), 1000);
              }}
            />
          </Col>
        </Row>

        <TabContent activeTab={activeTab}>
          {activeTab === 0 && (
            <TabPane tabId={0}>
              <UserList searchUser={searchUser} />
            </TabPane>
          )}
          {activeTab === 1 && (
            <TabPane tabId={1}>
              <Shop searchUser={searchUser} />
            </TabPane>
          )}
        </TabContent>
      </Card>
    </>
  );
};

export default Users;
