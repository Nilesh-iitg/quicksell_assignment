import React, { useState } from "react";
import "./todofilter.css";
import DownArrowIcon from "../../Shared/Icon/DownArrowIcon";
import FilterIcon from "../../Shared/Icon/FilterIcon";

const TodoFilter = ({ displayOption, sortOption, setDisplayOption, setSortOption }) => {
  const [isDropDownSelected, setIsDropDownSelected] = useState(false);

  const handleDisplayChange = (e) => {
    setDisplayOption(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };
  const handleDropDown = ()=>{
    setIsDropDownSelected(!isDropDownSelected)
  }

  return (
    <div style={{ position: "relative" }}>
      <div
        className="outline-button cursor-pointer"
        style={{ display: "flex", columnGap: "5px" }}
        onClick={handleDropDown}
      >
        <FilterIcon />
        <h4 style={{ fontSize: "14px" }}>Display</h4>
        <DownArrowIcon />
      </div>
      {isDropDownSelected && (
        <div
          className="outline-button flex-col"
          style={{
            padding: "12px 22px",
            position: "absolute",
            borderRadius: "6px",
            maxWidth: "280px",
            width: "100%",
            top: "40px",
            background: "#F8F9FB",
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <label htmlFor="group" className="text-gray">
              Grouping
            </label>
            <select value={displayOption} onChange={handleDisplayChange} className="select-button" name="group" id="group">
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority">Priority</option>
            </select>
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              marginTop: "8px",
            }}
          >
            <label htmlFor="order" className="text-gray">
              Ordering
            </label>
            <select value={sortOption} onChange={handleSortChange} className="select-button" name="order" id="order">
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoFilter;
