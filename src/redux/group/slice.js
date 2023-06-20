import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import { toast } from "react-toastify";
import { axiosApi } from "../../helpers/axios";

const initialStates = {
  isError: null,
  isLoading: false,
};

//** Group List **\\
export const groupList = (data) => async (dispatch) => {
  try {
    dispatch(groupSetState([{ key: "isLoading", value: true }]));
    const response = await axiosApi.get(
      `admin/group/all?page=${data?.page}&limit=${data?.limit}&search=${data?.search}`,
      null
    );
    if (response) {
      dispatch(
        groupSetState([
          { key: "isError", value: false },
          { key: "isLoading", value: false },
          { key: "groupListData", value: response?.data?.data },
        ])
      );
    }
    return response;
  } catch (error) {
    dispatch(groupSetState([{ key: "isLoading", value: false }]));
    toast.error(error.response?.data?.message);
  }
};

//** Group Detail **\\
export const groupDetail = (data) => async (dispatch) => {
  try {
    dispatch(groupSetState([{ key: "isLoading", value: true }]));
    const response = await axiosApi.get(
      `admin/group/details/${data?.groupId}?page=${data?.page}&limit=${data?.limit}&search=${data?.searchGroup}`,
      null
    );
    if (response) {
      dispatch(
        groupSetState([
          { key: "isError", value: false },
          { key: "isLoading", value: false },
          { key: "groupDetailData", value: response?.data?.data },
        ])
      );
    }
    return response;
  } catch (error) {
    dispatch(groupSetState([{ key: "isLoading", value: false }]));
    toast.error(error.response?.data?.message);
  }
};

const groupSlice = createSlice({
  name: "group",
  initialState: initialStates,
  reducers: {
    groupSetState: (state, { payload }) => {
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

export const { groupSetState } = groupSlice.actions;

const { reducer } = groupSlice;

export default reducer;
