import react, { createContext } from "react";

const ModalContext = createContext();

export const { Provider, Consumer } = ModalContext;

export default ModalContext;
