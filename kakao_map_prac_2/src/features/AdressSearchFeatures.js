import React, { useState } from "react";
import AddressSearch from "./AddressSearch";

const AddressSearchFeatures = () => {
  const [address, setAddress] = useState({
    postcode: "",
    address: "",
    extraAddress: "",
  });

  const handleAddressChange = (value) => {
    setAddress(value);
  };

  return (
    <div>
      <AddressSearch onChange={handleAddressChange} />
      <div>
        <p>우편번호: {address.postcode}</p>
        <p>주소: {address.address}</p>
        <p>참고항목: {address.extraAddress}</p>
        <p>참고항목: {address.extraAddress}</p>
      </div>
    </div>
  );
};

export default AddressSearchFeatures;