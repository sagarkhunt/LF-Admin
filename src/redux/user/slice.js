import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import { toast } from "react-toastify";
import { axiosApi } from "../../helpers/axios";

const initialStates = {
  isError: null,
  isLoading: false,
};

//** User List **\\
export const userList = (data) => async (dispatch) => {
  try {
    dispatch(userSetState([{ key: "isLoading", value: true }]));
    const response = await axiosApi.get(
      `admin/users?page=${data?.page}&limit=${data?.limit}&search=${data?.searchUser}&is_shop=${data?.userFilter}`,
      null
    );
    if (response) {
      dispatch(
        userSetState([
          { key: "isError", value: false },
          { key: "isLoading", value: false },
          { key: "userListData", value: response?.data?.data },
        ])
      );
    }
    return response;
  } catch (error) {
    dispatch(userSetState([{ key: "isLoading", value: false }]));
    toast.error(error.response?.data?.message);
  }
};

//** User Detail **\\
export const userDetail = (userId) => async (dispatch) => {
  try {
    dispatch(userSetState([{ key: "isLoading", value: true }]));
    const response = await axiosApi.get(`admin/users/${userId}`, null);
    if (response) {
      dispatch(
        userSetState([
          { key: "isError", value: false },
          { key: "isLoading", value: false },
          { key: "userDetailData", value: response?.data?.data },
        ])
      );
    }
    return response;
  } catch (error) {
    dispatch(userSetState([{ key: "isLoading", value: false }]));
    toast.error(error.response?.data?.message);
  }
};

const userSlice = createSlice({
  name: "user",
  initialState: initialStates,
  reducers: {
    userSetState: (state, { payload }) => {
      if (Array.isArray(payload)) {
        for (const obj of payload) {
          _.set(state, obj.key, obj.value);
        }
      } else {
        _.set(state, payload.key, payload.value);
      }
    },
  },
});

export const { userSetState } = userSlice.actions;

const { reducer } = userSlice;

export default reducer;
