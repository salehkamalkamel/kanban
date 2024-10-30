import { createContext, useContext, useState } from "react";

const SideBarStateContext = createContext();

const useSideBarStateContext = () => useContext(SideBarStateContext);

export default function SideBarState({ children }) {
  const [isVisible, setIsVisible] = useState(true);

  function handleShow() {
    setIsVisible(true);
  }

  function handleHide() {
    setIsVisible(false);
  }

  function handleToggle() {
    setIsVisible((state) => !state);
  }

  return (
    <SideBarStateContext.Provider
      value={{ isVisible, handleShow, handleHide, handleToggle }}
    >
      {children}
    </SideBarStateContext.Provider>
  );
}

export { useSideBarStateContext };
