import ConfirmPopup from "../../ui/ConfirmPopup";

export default function LogoutConfirmWindow({
  onClose,
  isLogingOut,
  handleLogout,
}) {
  return (
    <ConfirmPopup
      onClose={onClose}
      isDoing={isLogingOut}
      onConfirm={handleLogout}
      heading="Log Out of the App?"
    >
      Are you sure you want to <span className="text-red1">log out</span>? This
      action will end your current session, and you will need to sign in again
      to access the app.
    </ConfirmPopup>
  );
}
