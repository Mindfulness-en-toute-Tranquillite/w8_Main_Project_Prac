import styled from "styled-components";

export default function Modal({ onClose }) {

    return (
        <ModalDiv className="modal">
        <div className="modal-overlay">
        <button
            style={{
              cursor: 'pointer',
              border: 'none',
              backgroundColor: 'transparent',
            }}
            onClick={onClose}
          >
                닫기
            </button>
        </div>
        </ModalDiv>
    )
}
const ModalDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #c9cdd2;
  mix-blend-mode: darken;
  z-index: 999;

  .modal-overlay {
    padding: 20px 40px;
    border-radius: 20px;
    position: fixed;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255);
    z-index: 1000;
    max-width: 600px;
    min-width: 380px;
    width: 50%;
    border: 1px solid #939aa0;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;