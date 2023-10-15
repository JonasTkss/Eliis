import {
  mdiViewDashboard,
  mdiBookOpenVariant,
  mdiTableLarge,
  mdiMessageText,
  mdiBullhorn,
  mdiClockOutline,
  mdiCalendar,
  mdiFolderMultipleImage,
  mdiCloudOutline,
  mdiSilverware,
  mdiFile,
  mdiContacts,
  mdiTextBoxCheck,
  mdiLifebuoy,
} from "@mdi/js";

interface Subcategory {
  text: string;
  subPath: string;
}

interface SideMenuItem {
  icon: any;
  text: string;
  isExpandable: boolean;
  subcategories?: Subcategory[];
  path?: string;
}

const sideMenuOptions: SideMenuItem[] = [
  {
    icon: mdiViewDashboard,
    text: "Dashboard",
    isExpandable: false,
    path: "/dashboard",
  },
  {
    icon: mdiBookOpenVariant,
    text: "Diary",
    isExpandable: true,
    subcategories: [{ text: "My diary", subPath: "/my-diary" }],
  },
  {
    icon: mdiTableLarge,
    text: "Plans",
    isExpandable: true,
    subcategories: [{ text: "My-plans", subPath: "/my-plans" }],
  },
  {
    icon: mdiMessageText,
    text: "Messages",
    isExpandable: false,
    path: "/messages",
  },
  {
    icon: mdiBullhorn,
    text: "Announcements",
    isExpandable: false,
    path: "/announcments",
  },
  {
    icon: mdiClockOutline,
    text: "Work schedule",
    isExpandable: true,
    subcategories: [{ text: "My work", subPath: "/schedule" }],
  },
  {
    icon: mdiCalendar,
    text: "Events",
    isExpandable: true,
    subcategories: [
      { text: "Calendar", subPath: "/calendar" },
      { text: "List view", subPath: "/list-view" },
    ],
  },
  {
    icon: mdiFolderMultipleImage,
    text: "Gallery",
    isExpandable: false,
    path: "/gallery",
  },
  {
    icon: mdiCloudOutline,
    text: "Documents",
    isExpandable: false,
    path: "/documents",
  },
  {
    icon: mdiSilverware,
    text: "Food menu",
    isExpandable: true,
    subcategories: [{ text: "Recepies", subPath: "/recepies" }],
  },
  {
    icon: mdiFile,
    text: "Applications",
    isExpandable: true,
    subcategories: [{ text: "My applications", subPath: "/my-applications" }],
  },
  {
    icon: mdiContacts,
    text: "Contacts",
    isExpandable: true,
    subcategories: [{ text: "Favourites", subPath: "/favourites" }],
  },
  {
    icon: mdiTextBoxCheck,
    text: "Surveys",
    isExpandable: true,
    subcategories: [{ text: "Popular surveys", subPath: "/popular-surveys" }],
  },
  {
    icon: mdiLifebuoy,
    text: "Help",
    isExpandable: true,
    subcategories: [{ text: "FAQ", subPath: "/faq" }],
  },
];

export { sideMenuOptions };
export type { SideMenuItem };
