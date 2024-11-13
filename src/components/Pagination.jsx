import React from "react";
import '../../src/styles/paginationStyles.css'

const Pagination = ({ currentPage, totalPages, onPageChange }) => (
  <div className="d-flex justify-content-center align-items-center mt-3">
    <button
      disabled={currentPage === 1}
      className="btn btn-outline-secondary btn-sm mx-2 pagination-button"
      style={{
        borderRadius: "10px",
        backgroundColor: currentPage === 1 ? "#f8f9fa" : "white",
        opacity: currentPage === 1 ? 0.6 : 1,
        cursor: currentPage === 1 ? "not-allowed" : "pointer",
      }}
      onClick={() => onPageChange(currentPage - 1)}
    >
      Anterior
    </button>

    <span
      className="px-3 py-1 mx-2"
      style={{
        borderRadius: "5px",
        backgroundColor: "#007bff",
        color: "white",
        fontWeight: "bold",
        minWidth: "30px",
        textAlign: "center",
      }}
    >
      {currentPage}
    </span>

    <button
      disabled={currentPage === totalPages}
      className="btn btn-outline-secondary btn-sm mx-2 pagination-button"
      style={{
        borderRadius: "10px",
        backgroundColor: currentPage === totalPages ? "#f8f9fa" : "white",
        opacity: currentPage === totalPages ? 0.6 : 1,
        cursor: currentPage === totalPages ? "not-allowed" : "pointer",
      }}
      onClick={() => onPageChange(currentPage + 1)}
    >
      Siguiente
    </button>
  </div>
);

export default Pagination;
