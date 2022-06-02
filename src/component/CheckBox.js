import React from "react";
function CheckBox({ checked, onChecked }) {
  return (
    <div style={{ marginLeft: "7px" }}>
      <input type="checkbox" checked={checked} onChange={onChecked} />
    </div>
  );
}

export default CheckBox;
