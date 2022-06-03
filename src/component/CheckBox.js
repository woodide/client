import React from "react";
function CheckBox({ checked, onChecked, label, style }) {
  return (
    <div onClick={onChecked} style={{ cursor: "pointer", ...style }}>
      {label && (
        <label
          style={{ marginRight: "5px", userSelect: "none", cursor: "pointer" }}
        >
          {label}
        </label>
      )}
      <input type="checkbox" checked={checked} style={{ cursor: "pointer" }} />
    </div>
  );
}

export default CheckBox;
