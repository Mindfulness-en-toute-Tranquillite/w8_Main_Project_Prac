    // midPoint값 없으면 오류가는데 방지. midPoint값 없으면 뒤로가기(일부러 새로고침하며 뒤로 = queryKey리셋위해)
    useEffect(() => {
        if (!midPointProp) {
            window.location.href = '/map';
        }
    }, [midPointProp]);



    {
        isClickedOutside === true
       ? (<div class="modal" ref={modalRef} onClick={(e)=>{
         if(modalRef.current === e.target) {
            setIsClickedOutside(false)
         }
      }}>
        <div class="modal-overlay"> 모달창 내용</div>
      <div>)
      : null
    }













