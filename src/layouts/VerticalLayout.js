import Layout from "@layouts/VerticalLayout";
import navigation from "@src/navigation/vertical";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { adminDetail } from "../redux/profile/slice";

const VerticalLayout = (props) => {
  const dispatch = useDispatch();

  // Admin Detail APi
  useEffect(() => {
    dispatch(adminDetail());
  }, []);

  return (
    <Layout menuData={navigation} {...props}>
      {props.children}
    </Layout>
  );
};

export default VerticalLayout;
