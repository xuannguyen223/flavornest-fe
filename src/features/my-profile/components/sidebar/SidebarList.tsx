import SidebarItem from "./SidebarItem";
import { MY_PROFILE_NAV } from "../../constants";

function SidebarList() {
  return (
    <ul className="space-y-1">
      {MY_PROFILE_NAV.map((item) => (
        <SidebarItem key={item.key} label={item.label} to={item.path} />
      ))}
    </ul>
  );
}

export default SidebarList;