import { IoIosSettings } from "react-icons/io";

export default {
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  liveEdit: false,
  __experimental_actions: ["update", "publish" /* 'create', 'delete' */],
  icon: IoIosSettings,
  fields: [
    {
      name: "title",
      title: "Title",
      type: "localeString",
    },
    {
      name: "description",
      title: "Description",
      type: "localeString",
    },
  ],
};
