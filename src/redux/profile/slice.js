import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import { toast } from "react-toastify";
import { axiosApi } from "../../helpers/axios";

const initialStates = {
  isError: null,
  isLoading: false,
};

//** Admin Detail **\\
export const adminDetail = () => async (dispatch) => {
  try {
    dispatch(profileSetState([{ key: "isLoading", value: true }]));
    const response = await axiosApi.get(`user/verify-token`, null);
    if (response) {
      dispatch(
        profileSetState([
          { key: "isError", value: false },
          { key: "isLoading", value: false },
          { key: "adminDetailData", value: response?.data?.data },
        ])
      );
    }
    return response;
  } catch (error) {
    dispatch(profileSetState([{ key: "isLoading", value: false }]));
    toast.error(error.response?.data?.message);
  }
};

//** Change Password **\\
export const updateProfile =
  ({ formData, history }) =>
  async (dispatch) => {
    try {
      dispatch(profileSetState([{ key: "isLoading", value: true }]));
      const response = await axiosApi.put(
        `admin/users/update-profile`,
        formData
      );
      if (response) {
        toast.success(response?.data?.message);
        dispatch(
          profileSetState([
            { key: "isError", value: false },
            { key: "isLoading", value: false },
          ])
        );
        history.push("/");
      }
      return response;
    } catch (error) {
      dispatch(profileSetState([{ key: "isLoading", value: false }]));
      toast.error(error.response?.data?.message);
    }
  };

//** Change Password **\\
export const changePassword =
  ({ body, history }) =>
  async (dispatch) => {
    try {
      dispatch(profileSetState([{ key: "isLoading", value: true }]));
      const response = await axiosApi.post(`admin/auth/change-password`, body);
      if (response) {
        toast.success(response?.data?.message);
        dispatch(
          profileSetState([
            { key: "isError", value: false },
            { key: "isLoading", value: false },
          ])
        );
        history.push("/");
      }
      return response;
    } catch (error) {
      dispatch(profileSetState([{ key: "isLoading", value: false }]));
      toast.error(error.response?.data?.message);
    }
  };

const profileSlice = createSlice({
  name: "profile",
  initialState: initialStates,
  reducers: {
    profileSetState: (state, { payload }) => {
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

export const { profileSetState } = profileSlice.actions;

const { reducer } = profileSlice;

export default reducer;
