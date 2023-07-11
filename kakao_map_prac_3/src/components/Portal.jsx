import { useState } from "react";
import Modal from "./Modal";
import ReactDOM, { createPortal } from "react-dom"; // react-dom 패키지에서 import 해줍니다.

export default function Portal() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button
        onClick={() => setShowModal(true)}
      ></button>
      {showModal &&
        createPortal(
          <Modal onClose={() => setShowModal(false)} />,
          document.body,
        )}
    </>
  );
}
