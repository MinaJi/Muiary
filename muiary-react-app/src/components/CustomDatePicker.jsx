import React, { useState } from "react";
import DatePicker from "react-date-picker";
import "../css/CustomDatePicker.css";

function CustomDatePicker() {
  const [value, onChange] = useState(new Date());
  return (
    <>
      <DatePicker onChange={onChange} value={value} />
    </>
  );
}

export default CustomDatePicker;
