import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import { toast } from "react-toastify";
import { axiosApi } from "../../helpers/axios";

const initialStates = {
  isError: null,
  isLoading: false,
  loggedinData: null,
};

//** Admin Login **\\
export const adminLogin =
  ({ data, history }) =>
  async (dispatch) => {
    try {
      dispatch(authSetState([{ key: "isLoading", value: true }]));
      const response = await axiosApi.post(`admin/auth/login`, data);
      if (response) {
        axiosApi.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response?.data?.data?.tokens?.access?.token}`;
        localStorage.setItem(
          "access",
          response?.data?.data?.tokens?.access?.token
        );
        localStorage.setItem("userID", response?.data?.data?.user?._id);
        toast.success(response?.data?.message);
        history.push("/dashboard");
        dispatch(
          authSetState([
            { key: "isError", value: false },
            { key: "isLoading", value: false },
          ])
        );
      }
      return response;
    } catch (error) {
      dispatch(authSetState([{ key: "isLoading", value: false }]));
      toast.error(error.response?.data?.message);
    }
  };

const authSlice = createSlice({
  name: "auth",
  initialState: initialStates,
  reducers: {
    authSetState: (state, { payload }) => {
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

export const { authSetState } = authSlice.actions;

const { reducer } = authSlice;

export default reducer;
