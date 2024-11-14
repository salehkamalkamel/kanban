import { useLogOut } from "../../hooks/useLogOut";
import Model from "../../ui/Model";
import LogoutBtn from "./LogoutBtn";
import LogoutConfirmWindow from "./LogoutConfirmWindow";

export default function LogoutSystem() {
  const { logOut, isLogingOut } = useLogOut();
  return (
    <Model>
      <Model.Toggle>
        <LogoutBtn />
      </Model.Toggle>
      <Model.Window>
        <LogoutConfirmWindow isLogingOut={isLogingOut} handleLogout={logOut} />
      </Model.Window>
    </Model>
  );
}
