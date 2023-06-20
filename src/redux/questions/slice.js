import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import { toast } from "react-toastify";
import { axiosApi } from "../../helpers/axios";

const initialStates = {
  isError: null,
  isLoading: false,
};

//** Question List **\\
export const questionList = () => async (dispatch) => {
  try {
    dispatch(questionSetState([{ key: "isLoading", value: true }]));
    const response = await axiosApi.get(`admin/registration-question`, null);
    if (response) {
      dispatch(
        questionSetState([
          { key: "isError", value: false },
          { key: "isLoading", value: false },
          { key: "questionListData", value: response?.data?.data },
        ])
      );
    }
    return response;
  } catch (error) {
    dispatch(questionSetState([{ key: "isLoading", value: false }]));
    toast.error(error.response?.data?.message);
  }
};

//** Question Detail List **\\
export const questionDetailList = (questionId) => async (dispatch) => {
  try {
    dispatch(questionSetState([{ key: "isLoading", value: true }]));
    const response = await axiosApi.get(
      `admin/registration-question/${questionId}`,
      null
    );
    if (response) {
      dispatch(
        questionSetState([
          { key: "isError", value: false },
          { key: "isLoading", value: false },
          { key: "questionDetailData", value: response?.data?.data },
        ])
      );
    }
    return response;
  } catch (error) {
    dispatch(questionSetState([{ key: "isLoading", value: false }]));
    toast.error(error.response?.data?.message);
  }
};

//** Create Question **\\
export const createQuestion =
  ({ data, history }) =>
  async (dispatch) => {
    try {
      dispatch(questionSetState([{ key: "isLoading", value: true }]));
      const response = await axiosApi.post(`admin/registration-question`, data);
      if (response) {
        dispatch(
          questionSetState([
            { key: "isError", value: false },
            { key: "isLoading", value: false },
            { key: "createQuestionData", value: response?.data?.data },
          ])
        );
        toast.success(response?.data?.message);
        history.push("/questions");
      }
      return response;
    } catch (error) {
      dispatch(questionSetState([{ key: "isLoading", value: false }]));
      toast.error(error.response?.data?.message);
    }
  };

//** Update Question **\\
export const updateQuestion =
  ({ questionId, data, history }) =>
  async (dispatch) => {
    try {
      dispatch(questionSetState([{ key: "isLoading", value: true }]));
      const response = await axiosApi.put(
        `admin/registration-question/${questionId}`,
        data
      );
      if (response) {
        dispatch(
          questionSetState([
            { key: "isError", value: false },
            { key: "isLoading", value: false },
            { key: "updateQuestionData", value: response?.data?.data },
          ])
        );
        toast.success(response?.data?.message);
        history.push("/questions");
      }
      return response;
    } catch (error) {
      dispatch(questionSetState([{ key: "isLoading", value: false }]));
      toast.error(error.response?.data?.message);
    }
  };

//** Delete Question **\\
export const deleteQuestion =
  ({ questionId, setDeleteQuestionModal }) =>
  async (dispatch) => {
    try {
      dispatch(
        questionSetState([
          { key: "isLoading", value: true },
          { key: "deleteQuestionData", value: null },
        ])
      );
      const response = await axiosApi.delete(
        `admin/registration-question/${questionId}`,
        null
      );
      if (response) {
        dispatch(
          questionSetState([
            { key: "isError", value: false },
            { key: "isLoading", value: false },
            { key: "deleteQuestionData", value: response?.data?.message },
          ])
        );
        toast.success(response?.data?.message);
        setDeleteQuestionModal(false);
      }
      return response;
    } catch (error) {
      dispatch(questionSetState([{ key: "isLoading", value: false }]));
      toast.error(error.response?.data?.message);
    }
  };

const questionSlice = createSlice({
  name: "question",
  initialState: initialStates,
  reducers: {
    questionSetState: (state, { payload }) => {
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

export const { questionSetState } = questionSlice.actions;

const { reducer } = questionSlice;

export default reducer;
