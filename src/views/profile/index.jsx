import React, { useState } from "react";
import { Col, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import ChangePassowrd from "./ChangePassowrd";
import ProfileDetail from "./ProfileDetail";
import { Lock, User } from "react-feather";

const Profile = () => {
  const [activeTab, setActiveTab] = useState(0);

  const dummyArray = [
    { name: "Profile Detail", icon: <User size={20} /> },
    { name: "Change Passowrd", icon: <Lock size={20} /> },
  ];

  return (
    <>
      <Nav tabs>
        <NavItem className="d-flex">
          {(dummyArray || [])?.map((item, index) => (
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

      <TabContent activeTab={activeTab}>
        <TabPane tabId={0}>
          <Col xs={6}>
            <ProfileDetail />
          </Col>
        </TabPane>
        <TabPane tabId={1}>
          <Col xs={6}>
            <ChangePassowrd />
          </Col>
        </TabPane>
      </TabContent>
    </>
  );
};

export default Profile;
