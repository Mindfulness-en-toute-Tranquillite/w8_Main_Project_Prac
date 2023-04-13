import React, { useRef } from "react";
import DaumPostcode from "react-daum-postcode";

const AddressSearch = ({ onChange }) => {
  const layerRef = useRef(null);

  const handleComplete = (data) => {
    let address = data.address;
    let extraAddress = "";

    if (data.buildingName !== "") {
      extraAddress += data.buildingName;
    }

    if (data.apartment === "Y") {
      extraAddress += (extraAddress !== "" ? ", " : "") + data.apartmentName;
    }

    if (extraAddress !== "") {
      extraAddress = `(${extraAddress})`;
    }

    if (data.zonecode) {
      onChange({
        postcode: data.zonecode,
        address: address,
        extraAddress: extraAddress,
      });
    }
  };

  const handleClick = () => {
    if (layerRef.current) {
      layerRef.current.style = "display:block";
    }
  };

  return (
    <>
      <input
        type="text"
        id="sample2_postcode"
        placeholder="우편번호"
        readOnly
      />
      <input
        type="button"
        onClick={handleClick}
        value="우편번호 찾기"
        style={{ marginLeft: "5px" }}
      />
      <br />
      <input
        type="text"
        id="sample2_address"
        placeholder="주소"
        readOnly
        style={{ marginTop: "5px" }}
      />
      <br />
      <input
        type="text"
        id="sample2_detailAddress"
        placeholder="상세주소"
        style={{ marginTop: "5px" }}
      />
      <input
        type="text"
        id="sample2_extraAddress"
        placeholder="참고항목"
        style={{ marginTop: "5px" }}
        readOnly
      />
      <DaumPostcode
        onComplete={handleComplete}
        style={{
          display: "none",
          position: "fixed",
          overflow: "hidden",
          zIndex: "1",
          WebkitOverflowScrolling: "touch",
        }}
        ref={layerRef}
      />
    </>
  );
};

export default AddressSearch;