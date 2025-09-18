export const MY_PROFILE_BASE_PATH = "/my-profile" as const;

export const MY_PROFILE_TABS = {
  EDIT_PROFILE: "edit-profile",
  ACCOUNT_SETTINGS: "account-settings",
  MY_RECIPES: "my-recipes",
  SAVED_RECIPES: "saved-recipes",
} as const;

export type MyProfileTabKey = keyof typeof MY_PROFILE_TABS;
export type MyProfileTabPath = (typeof MY_PROFILE_TABS)[MyProfileTabKey];

export const getMyProfilePath = (tab?: MyProfileTabPath) =>
  tab ? `${MY_PROFILE_BASE_PATH}/${tab}` : MY_PROFILE_BASE_PATH;

export const MY_PROFILE_NAV = [
  {
    key: "EDIT_PROFILE" as const,
    label: "Edit Your Profile",
    path: getMyProfilePath(MY_PROFILE_TABS.EDIT_PROFILE),
    isDefault: true,
  },
  {
    key: "ACCOUNT_SETTINGS" as const,
    label: "Account Settings",
    path: getMyProfilePath(MY_PROFILE_TABS.ACCOUNT_SETTINGS),
  },
  {
    key: "MY_RECIPES" as const,
    label: "My Recipes",
    path: getMyProfilePath(MY_PROFILE_TABS.MY_RECIPES),
  },
  {
    key: "SAVED_RECIPES" as const,
    label: "Saved Recipes",
    path: getMyProfilePath(MY_PROFILE_TABS.SAVED_RECIPES),
  },
];