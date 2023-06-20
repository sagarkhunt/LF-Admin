import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import { toast } from "react-toastify";
import { axiosApi } from "../../helpers/axios";

const initialStates = {
  isError: null,
  isLoading: false,
};

//** Deshboard Counts Data **\\
export const dashboardCounts = () => async (dispatch) => {
  try {
    dispatch(dashboardSetState([{ key: "isLoading", value: true }]));
    const response = await axiosApi.get(`admin/dashboard`, null);
    if (response) {
      dispatch(
        dashboardSetState([
          { key: "isError", value: false },
          { key: "isLoading", value: false },
          { key: "dashboardCountsData", value: response?.data?.data },
        ])
      );
    }
    return response;
  } catch (error) {
    dispatch(dashboardSetState([{ key: "isLoading", value: false }]));
    toast.error(error.response?.data?.message);
  }
};


const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: initialStates,
  reducers: {
    dashboardSetState: (state, { payload }) => {
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

export const { dashboardSetState } = dashboardSlice.actions;

const { reducer } = dashboardSlice;

export default reducer;
