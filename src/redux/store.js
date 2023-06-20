import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from "./auth/slice";
import layout from "./layout";
import navbar from "./navbar";
import questionReducer from "./questions/slice";
import announcementReducer from "./announcement/slice";
import userReducer from "./user/slice";
import sponsored from "./sponsored/slice";
import profileReducer from "./profile/slice";
import dashboard from "./dashboard/slice";

const rootReducer = {
  navbar,
  layout,
  auth: authReducer,
  profile:profileReducer,
  user: userReducer,
  question: questionReducer,
  annoucement: announcementReducer,
  sponsored: sponsored,
  dashboard: dashboard,
};

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

export default configureStore({
  reducer: rootReducer,
  middleware: customizedMiddleware,
});
