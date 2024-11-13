import React from "react";
import { USER_PER_PAGE_OPTIONS } from "../utils/enums";

const RecordsPerPage = ({ usersPerPage, onChange }) => (
  <div>
    <label htmlFor="usersPerPage">#Registros: </label>
    <select
      id="usersPerPage"
      className="form-select d-inline-block ms-2"
      style={{ width: "auto" }}
      value={usersPerPage}
      onChange={(e) => onChange(Number(e.target.value))}
    >
     {USER_PER_PAGE_OPTIONS.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default RecordsPerPage;
