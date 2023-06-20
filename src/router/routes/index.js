import { lazy } from "react";

const DefaultRoute = "/dashboard";
const Routes = [
  // Profile
  {
    path: "/profile",
    component: lazy(() => import("../../views/profile/index")),
  },

  // Dashboard
  {
    path: "/dashboard",
    component: lazy(() => import("../../views/dashboard/index")),
  },

  // Questions
  {
    path: "/questions/action-questions",
    component: lazy(() => import("../../views/questions/ActionQuestion")),
  },
  {
    path: "/questions",
    component: lazy(() => import("../../views/questions/index")),
  },

  // Announcement
  {
    path: "/announcement/add-announcement",
    component: lazy(() => import("../../views/announcement/AddAnnouncement")),
  },
  {
    path: "/announcement",
    component: lazy(() => import("../../views/announcement/index")),
  },

  // Sponsored
  {
    path: "/sponsored/add-sponsored",
    component: lazy(() => import("../../views/sponsored/AddSponsored")),
  },
  {
    path: "/sponsored",
    component: lazy(() => import("../../views/sponsored/index")),
  },

  // User
  {
    path: "/user/view-shop",
    component: lazy(() => import("../../views/user/shop/ViewShop")),
  },
  {
    path: "/user/view-user",
    component: lazy(() => import("../../views/user/userList/ViewUser")),
  },
  {
    path: "/user",
    component: lazy(() => import("../../views/user/index")),
  },

  // Login
  {
    path: "/login",
    component: lazy(() => import("../../views/auth/Login")),
    layout: "BlankLayout",
    meta: {
      authRoute: true,
    },
  },
  {
    path: "/error",
    component: lazy(() => import("../../views/Error")),
    layout: "BlankLayout",
  },
];

export { DefaultRoute, Routes };
