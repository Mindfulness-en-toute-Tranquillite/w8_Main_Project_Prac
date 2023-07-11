import { ButtonText } from '@components/Atoms/Button';
import { InputArea } from '@components/Atoms/Input';
import KeywordSearchModal from '@components/Modals/SearchKeywordModal';
import React, { useState } from 'react';
import { createPortal } from 'react-dom';

function AddingInputBoxButton() {
    //  Input Box 갯수 state. 값으로 1을 넣은 이유는 처음에 1개가 기본 있어야 한다.
    const [inputCount, setInputCount] = useState(1);
    //  Modal창 열고 닫는 state
    const [showModal, setShowModal] = useState(false);
    //   currentInputIndex 상태값을 설정
    const [currentInputIndex, setCurrentInputIndex] = useState(-1);

    //  Input Box 추가 Button Handler
    const addingInputBoxButtonHandler = () => {
        if (inputCount < 4) {
            setInputCount(inputCount + 1);
            }
    };
    //  Modal창 여는 Handler
    const onInputClickHandler = (index) => {
        setCurrentInputIndex(index);
        setShowModal(true);
    }
    //  Modal창 닫는 Handler
    const onCloseModalHandler = () => {
        setShowModal(false);
    }
    //  Input 박스 추가
    const renderInputArea = (index) => {
        return (
            <InputArea 
                key={index} 
                type="text" 
                placeholder='이 버튼을 눌러 위치를 추가해주세요.'
                variant='default'
                size='leftIcon'
                cursor='pointer'
                readOnly={true}
                onClick={() => onInputClickHandler(index)}
            />
        );
    }
    //  Modal창 렌더링
    const renderModal = () => {
        if (currentInputIndex < 0) {
            return null;
        }
        //  닫기 버튼 프롭스토 내려줌.
        return (
            showModal && createPortal(
                <KeywordSearchModal onClose={onCloseModalHandler} />,
                document.body
            )
        );
    };

    //  Input Box 받아주는 배열
    const inputs = [];

    for (let i = 0; i < inputCount; i++) {
        inputs.push(renderInputArea(i));
    }

    return (
        <div>
            {inputs}
            {renderModal()}
            <ButtonText 
                size='lg'
                variant='default'
                onClick={addingInputBoxButtonHandler}>
                추가하기
            </ButtonText>
        </div>
    );
}

export default AddingInputBoxButton;