import { BarChart2, HelpCircle, User } from "react-feather";

export default [
  {
    id: "dashboard",
    title: "Dashboard",
    navLink: "/dashboard",
    icon: <BarChart2 />,
    // permission: ["superAdmin", "Manager"],
  },
  {
    id: "user",
    title: "User",
    navLink: "/user",
    icon: <User />,
    // permission: ["superAdmin", "Manager"],
  },
  {
    id: "questions",
    title: "Questions",
    navLink: "/questions",
    icon: <HelpCircle />,
    // permission: ["superAdmin", "Manager"],
  },
  {
    id: "announcement",
    title: "Announcement",
    navLink: "/announcement",
    icon: <HelpCircle />,
    // permission: ["superAdmin", "Manager"],
  },
  {
    id: "sponsored",
    title: "Sponsored",
    navLink: "/sponsored",
    icon: <HelpCircle />,
    // permission: ["superAdmin", "Manager"],
  },
];
