import React, { useState } from "react";

const DaumPostcode = () => {
  const [postcode, setPostcode] = useState("");
  const [roadAddress, setRoadAddress] = useState("");
  const [jibunAddress, setJibunAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [extraAddress, setExtraAddress] = useState("");
  const [guideText, setGuideText] = useState("");

  const handleExecDaumPostcode = () => {
    const daum = window.daum;
    new daum.Postcode({
      oncomplete: function (data) {
        let roadAddr = data.roadAddress;
        let extraRoadAddr = "";
        if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
          extraRoadAddr += data.bname;
        }
        if (data.buildingName !== "" && data.apartment === "Y") {
          extraRoadAddr += extraRoadAddr !== "" ? ", " + data.buildingName : data.buildingName;
        }
        if (extraRoadAddr !== "") {
          extraRoadAddr = " (" + extraRoadAddr + ")";
        }
        setPostcode(data.zonecode);
        setRoadAddress(roadAddr);
        setJibunAddress(data.jibunAddress);
        if (roadAddr !== "") {
          setExtraAddress(extraRoadAddr);
        } else {
          setExtraAddress("");
        }
        if (data.autoRoadAddress) {
          let expRoadAddr = data.autoRoadAddress + extraRoadAddr;
          setGuideText("(예상 도로명 주소 : " + expRoadAddr + ")");
        } else if (data.autoJibunAddress) {
          let expJibunAddr = data.autoJibunAddress;
          setGuideText("(예상 지번 주소 : " + expJibunAddr + ")");
        } else {
          setGuideText("");
        }
      },
    }).open();
  };

  return (
    <>
      <input type="text" id="sample4_postcode" placeholder="우편번호" value={postcode} />
      <input type="button" onClick={handleExecDaumPostcode} value="우편번호 찾기" /><br />
      <input type="text" id="sample4_roadAddress" placeholder="도로명주소" value={roadAddress} />
      <input type="text" id="sample4_jibunAddress" placeholder="지번주소" value={jibunAddress} />
      <span id="guide" style={{ color: "#999", display: guideText ? "block" : "none" }}>
        {guideText}
      </span>
      <input type="text" id="sample4_detailAddress" placeholder="상세주소" value={detailAddress} onChange={(e) => setDetailAddress(e.target.value)} />
      <input type="text" id="sample4_extraAddress" placeholder="참고항목" value={extraAddress} />
      <script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js" />
    </>
  );
};

export default DaumPostcode;