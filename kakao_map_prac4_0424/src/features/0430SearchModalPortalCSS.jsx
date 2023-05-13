  // X 버튼 Handler(해당 인풋박스 값 초기화(index줘서 각각의 인풋 박스 값 취소 가능)
  const onInputClearHandler = (index) => {
    setInputValues(prevInputValues => {
      const newInputValues = [...prevInputValues];
      newInputValues[index] = '';
      return newInputValues;
    });
  }



  

  {inputValues[index] && (
    <div onClick={() => onInputClearHandler(index)}
    style={{ 
      position: 'absolute', 
      marginLeft: '500px',
      paddingTop: '6px',
    }}>
    <img 
    // style={{display: 'inlineBlock', verticalAlign: 'middle'}}
    src="ModalPortalInputXButton.png" alt="X button" />
  </div>
)}