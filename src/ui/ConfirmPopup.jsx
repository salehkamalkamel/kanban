import BodyText from "./Bodytext";
import Button from "./Button";
import Heading from "./Heading";
import LoadingSpinner from "./LoadingSpinner";
import PopupWindow from "./PopupWindow";

export default function ConfirmPopup({
  onClose,
  heading,
  children,
  onConfirm,
  isDoing,
  isGettingData,
}) {
  if (isGettingData) {
    return (
      <PopupWindow onClose={onClose}>
        <div className="flex flex-col items-center justify-center w-full h-full p-6">
          <div className="w-full h-6 bg-gray-200 animate-pulse mb-4"></div>
          <div className="w-3/4 h-4 bg-gray-200 animate-pulse mb-4"></div>
          <div className="w-1/2 h-4 bg-gray-200 animate-pulse mb-4"></div>
          <div className="w-full h-12 bg-gray-200 animate-pulse"></div>
        </div>
      </PopupWindow>
    );
  }

  return (
    <PopupWindow onClose={onClose}>
      <div className="flex flex-col items-center justify-center gap-6">
        <Heading shape="l" level={2} className="text-red1 w-full">
          {heading}
        </Heading>
        <BodyText shape="bodyL" className="text-gray1">
          {children}
        </BodyText>
      </div>
      <div className="flex w-full flex-col sm:flex-row items-center justify-center gap-2 pt-6">
        <Button
          shape="error"
          disabled={isDoing}
          className="w-full"
          onClick={onConfirm}
        >
          {isDoing ? <LoadingSpinner /> : "Confirm"}
        </Button>
        <Button
          onClick={onClose}
          disabled={isDoing}
          shape="secondary"
          className="w-full"
        >
          Cancel
        </Button>
      </div>
    </PopupWindow>
  );
}
