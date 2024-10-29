import { createContext, useContext, useState, cloneElement } from "react";

const ModelContext = createContext();

export default function Model({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  function closeModel() {
    setIsOpen(false);
  }

  function openModel() {
    setIsOpen(true);
  }

  return (
    <ModelContext.Provider value={{ isOpen, closeModel, openModel }}>
      {children}
    </ModelContext.Provider>
  );
}

function Toggle({ children }) {
  const { openModel, closeModel, isOpen } = useContext(ModelContext);

  return cloneElement(children, {
    onOpen: openModel,
    onClose: closeModel,
    isOpen,
  });
}

function Window({ children }) {
  const { closeModel, isOpen } = useContext(ModelContext);

  if (!isOpen) return null; // Conditionally render the window only when open

  return cloneElement(children, { onClose: closeModel, isOpen: isOpen });
}

Model.Toggle = Toggle;
Model.Window = Window;
