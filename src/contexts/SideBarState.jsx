import { createContext, useContext, useState } from "react";

const SideBarStateContext = createContext();

const useSideBarStateContext = () => useContext(SideBarStateContext);

export default function SideBarState({ children }) {
  const [isVisible, setIsVisible] = useState(
    localStorage.getItem("show-side-bar") === "true" || false
  );

  function handleShow() {
    setIsVisible(true);
    localStorage.setItem("show-side-bar", "true");
  }

  function handleHide() {
    setIsVisible(false);
    localStorage.setItem("show-side-bar", "false");
  }

  function handleToggle() {
    setIsVisible((state) => {
      const newState = !state;
      localStorage.setItem("show-side-bar", newState.toString());
      return newState;
    });
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
