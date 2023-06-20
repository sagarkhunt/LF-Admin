import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import { toast } from "react-toastify";
import { axiosApi } from "../../helpers/axios";

const initialStates = {
  isError: null,
  isLoading: false,
};

//** Announcement List **\\
export const announcementList = (data) => async (dispatch) => {
  try {
    dispatch(announcementSetState([{ key: "isLoading", value: true }]));
    const response = await axiosApi.get(
      `admin/announcement?page=${data?.page}&limit=${data?.limit}&search=${data?.search}`,
      null
    );
    if (response) {
      dispatch(
        announcementSetState([
          { key: "isError", value: false },
          { key: "isLoading", value: false },
          { key: "announcementListData", value: response?.data?.data },
        ])
      );
    }
    return response;
  } catch (error) {
    dispatch(announcementSetState([{ key: "isLoading", value: false }]));
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
export const updateStatus =
  ({ id }) =>
  async (dispatch) => {
    try {
      dispatch(
        announcementSetState([
          { key: "isLoading", value: true },
          { key: "updateStatus", value: null },
        ])
      );
      const response = await axiosApi.put(
        `admin/announcement/status/${id}`);
      if (response) {
        toast.success(response?.data?.message);
        dispatch(
          announcementSetState([
            { key: "isError", value: false },
            { key: "isLoading", value: false },
            { key: "updateStatus", value: response?.data?.success },
          ])
        );
        // setActionAnnouncement(false);
      }
      return response;
    } catch (error) {
      dispatch(announcementSetState([{ key: "isLoading", value: false }]));
      toast.error(error.response?.data?.message);
    }
    };

//** Update Announcement **\\
export const updateAnnouncement =
  ({ announcementId, formData, history }) =>
  async (dispatch) => {
    try {
      dispatch(
        announcementSetState([
          { key: "isLoading", value: true },
          { key: "updateAnnouncementData", value: null },
        ])
      );
      const response = await axiosApi.put(`admin/announcement/${announcementId}`, formData);
      if (response) {
        toast.success(response?.data?.message);
        dispatch(
          announcementSetState([
            { key: "isError", value: false },
            { key: "isLoading", value: false },
            { key: "updateAnnouncementData", value: response?.data?.message },
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

//** Delete Announcement **\\
export const deleteAnnouncementApi =
  ({ announcementId, setDeleteAnnouncementModal }) =>
  async (dispatch) => {
    try {
      dispatch(
        announcementSetState([
          { key: "isLoading", value: true },
          { key: "deleteAnnouncementData", value: null },
        ])
      );
      const response = await axiosApi.delete(
        `admin/announcement/${announcementId}`,
        null
      );
      if (response) {
        toast.success(response?.data?.message);
        dispatch(
          announcementSetState([
            { key: "isError", value: false },
            { key: "isLoading", value: false },
            { key: "deleteAnnouncementData", value: response?.data?.message },
          ])
        );
        // history.push("/announcement");
        setDeleteAnnouncementModal(false);
      }
      return response;
    } catch (error) {
      dispatch(announcementSetState([{ key: "isLoading", value: false }]));
      toast.error(error.response?.data?.message);
    }
  };

//** Send Announcement **\\
export const sendAnnouncementApi = ({id}) => async (dispatch) => {
  try {
    dispatch(announcementSetState([{ key: "isLoading", value: true }]));
    const response = await axiosApi.post(
      `admin/announcement/send-notification/${id}`
    );
    if (response) {
      toast.success(response?.data?.message);
      dispatch(
        announcementSetState([
          { key: "isError", value: false },
          { key: "isLoading", value: false },
          { key: "sendAnnouncementData", value: response?.data?.message },
        ])
      );
    }
    return response;
  } catch (error) {
    dispatch(announcementSetState([{ key: "isLoading", value: false }]));
    toast.error(error.response?.data?.message);
  }
};

//** Announcement Detail List **\\
export const announcementDetailList = (announcementId) => async (dispatch) => {
  try {
    dispatch(announcementSetState([{ key: "isLoading", value: true }]));
    const response = await axiosApi.get(
      `admin/announcement/${announcementId}`,
      null
    );
    if (response) {
      dispatch(
        announcementSetState([
          { key: "isError", value: false },
          { key: "isLoading", value: false },
          { key: "announcementDetailData", value: response?.data?.data },
        ])
      );
    }
    return response;
  } catch (error) {
    dispatch(announcementSetState([{ key: "isLoading", value: false }]));
    toast.error(error.response?.data?.message);
  }
};

const announcementSlice = createSlice({
  name: "announcement",
  initialState: initialStates,
  reducers: {
    announcementSetState: (state, { payload }) => {
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

export const { announcementSetState } = announcementSlice.actions;

const { reducer } = announcementSlice;

export default reducer;
