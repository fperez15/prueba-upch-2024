import React, { useState } from "react";
import { GENDER } from "../utils/enums";

const Filters = ({ showFilters, onSearch }) => {
  const [selectedAge, setSelectedAge] = useState("");
  const [selectedGender, setSelectedGender] = useState("");

  const handleSearch = () => {
    onSearch(selectedAge, selectedGender);
  };

  const handleClear = () => {
    setSelectedAge("");
    setSelectedGender("");
    onSearch("", "");
  };

  if (!showFilters) return null;

  return (
    <div className="col-12 mb-3">
      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <div className="row">
            <div className="col-md-4">
              <input
                type="number"
                className="form-control"
                placeholder="EDAD"
                min="0"
                value={selectedAge}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "" || /^[0-9]+$/.test(value)) {
                    setSelectedAge(value);
                  }
                }}
              />
            </div>
            <div className="col-md-4">
              <select
                className="form-select"
                value={selectedGender}
                onChange={(e) => setSelectedGender(e.target.value)}
              >
                <option value="">GÉNERO</option>
                <option value={GENDER.FEMALE}>Female</option>
                <option value={GENDER.MALE}>Male</option>
              </select>
            </div>
            <div className="col-md-4 d-flex gap-2">
              <button className="btn btn-primary w-100" onClick={handleSearch}>
                <i className="bi bi-search"></i> Buscar
              </button>
              <button className="btn btn-secondary w-100" onClick={handleClear}>
                <i className="bi bi-trash"></i> Limpiar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
