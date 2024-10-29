import { createPortal } from "react-dom";

export default function PopupWindow({ onClose, children, className }) {
  return createPortal(
    <>
      <div
        onClick={onClose}
        className="bg-black opacity-30 z-50 fixed inset-0"
      ></div>
      <div
        className={`w-[90%] max-h-[90%] overflow-y-auto sm:w-[30rem] bg-white dark:bg-black3 rounded-md fixed top-[5%] left-1/2 -translate-x-1/2 p-6 sm:p-8  z-50 ${className}`}
      >
        {children}
      </div>
    </>,
    document.body
  );
}
