export default function CtrlPopup({ onClose, children }) {
  return (
    <>
      <div
        className="fixed inset-0 bg-transparent z-50"
        onClick={onClose}
      ></div>
      <div className="fixed z-50 top-20 w-48 right-8 flex items-center  justify-center flex-col bg-white dark:bg-black2 rounded-xl p-6 gap-4 drop-shadow-lg">
        {children}
      </div>
    </>
  );
}
