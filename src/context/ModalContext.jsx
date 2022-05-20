import React, { createContext, useContext, useState } from "react";

const ModalContext = createContext();
const ModalProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);
  return (
    <ModalContext.Provider value={{ showModal, toggleModal }}>
      {children}
    </ModalContext.Provider>
  );
};

const useModal = () => useContext(ModalContext);
export { useModal, ModalProvider };
