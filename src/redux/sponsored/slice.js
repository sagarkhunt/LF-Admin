import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import { toast } from "react-toastify";
import { axiosApi } from "../../helpers/axios";

const initialStates = {
  isError: null,
  isLoading: false,
};

//** Announcement List **\\
export const sponsoredList = (data) => async (dispatch) => {
  try {
    dispatch(sponsoredSetState([{ key: "isLoading", value: true }]));
    const response = await axiosApi.get(
      `admin/sponsored-banner/list?page=${data?.page}&limit=${data?.limit}&search=${data?.search}`,
      null
    );
    if (response) {
      dispatch(
        sponsoredSetState([
          { key: "isError", value: false },
          { key: "isLoading", value: false },
          { key: "sponsoredListData", value: response?.data?.data },
        ])
      );
    }
    return response;
  } catch (error) {
    dispatch(sponsoredSetState([{ key: "isLoading", value: false }]));
    toast.error(error.response?.data?.message);
  }
};

//** Create Announcement **\\
export const createAnnouncement =
  ({ formData,history, setActionAnnouncement }) =>
  async (dispatch) => {
    try {
      dispatch(
        announcementSetState([
          { key: "isLoading", value: true },
          { key: "createAnnouncementData", value: null },
        ])
      );
      const response = await axiosApi.post(`admin/announcement`, formData);
      if (response) {
        toast.success(response?.data?.message);
        dispatch(
          announcementSetState([
            { key: "isError", value: false },
            { key: "isLoading", value: false },
            { key: "createAnnouncementData", value: response?.data?.message },
          ])
        );
        history.push("/announcement");
        // setActionAnnouncement(false);
      }
      return response;
    } catch (error) {
      dispatch(announcementSetState([{ key: "isLoading", value: false }]));
      toast.error(error.response?.data?.message);
    }
  };

//** Create Announcement **\\
export const updateSponsoredStatus =
  ({ id }) =>
  async (dispatch) => {
    try {
      dispatch(
        sponsoredSetState([
          { key: "isLoading", value: true },
          { key: "updateSponsoredStatus", value: null },
        ])
      );
      const response = await axiosApi.put(
        `admin/sponsored-banner/update-verification-status/${id}`
      );
      if (response) {
        toast.success(response?.data?.message);
        dispatch(
          sponsoredSetState([
            { key: "isError", value: false },
            { key: "isLoading", value: false },
            { key: "updateSponsoredStatus", value: response?.data?.success },
          ])
        );
        // setActionAnnouncement(false);
      }
      return response;
    } catch (error) {
      dispatch(sponsoredSetState([{ key: "isLoading", value: false }]));
      toast.error(error.response?.data?.message);
    }
  };

//** Update Announcement **\\
export const updateSponsored =
  ({ sponsoredId, formData, history }) =>
  async (dispatch) => {
    try {
      dispatch(
        sponsoredSetState([
          { key: "isLoading", value: true },
          { key: "updateSponsoredData", value: null },
        ])
      );
      const response = await axiosApi.put(
        `admin/sponsored-banner/update/${sponsoredId}`,
        formData
      );
      if (response) {
        toast.success(response?.data?.message);
        dispatch(
          sponsoredSetState([
            { key: "isError", value: false },
            { key: "isLoading", value: false },
            { key: "updateSponsoredData", value: response?.data?.message },
          ])
        );
        history.push("/sponsored");
        // setActionAnnouncement(false);
      }
      return response;
    } catch (error) {
      dispatch(sponsoredSetState([{ key: "isLoading", value: false }]));
      toast.error(error.response?.data?.message);
    }
  };


//** Announcement Detail List **\\
export const sponsoredDetailList = (sponsoredId) => async (dispatch) => {
  try {
    dispatch(sponsoredSetState([{ key: "isLoading", value: true }]));
    const response = await axiosApi.get(
      `/admin/sponsored-banner/single/${sponsoredId}`,
      null
    );
    if (response) {
      dispatch(
        sponsoredSetState([
          { key: "isError", value: false },
          { key: "isLoading", value: false },
          { key: "sponsoredDetailData", value: response?.data?.data },
        ])
      );
    }
    return response;
  } catch (error) {
    dispatch(sponsoredSetState([{ key: "isLoading", value: false }]));
    toast.error(error.response?.data?.message);
  }
};

const sponsoredSlice = createSlice({
  name: "sponsored",
  initialState: initialStates,
  reducers: {
    sponsoredSetState: (state, { payload }) => {
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

export const { sponsoredSetState } = sponsoredSlice.actions;

const { reducer } = sponsoredSlice;

export default reducer;
