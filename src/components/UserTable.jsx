import React from "react";

const UserTable = ({
  users,
  onSelectUser,
  selectedUser,
  onSort,
  sortConfig,
}) => {
  const getSortIndicator = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? "↑" : "↓";
    }
    return "";
  };

  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th>
            <i className="bi bi-check2-square"></i>
          </th>
          <th onClick={() => onSort("firstName")} style={{ cursor: "pointer" }}>
            Nombre {getSortIndicator("firstName")}
          </th>
          <th onClick={() => onSort("gender")} style={{ cursor: "pointer" }}>
            Género {getSortIndicator("gender")}
          </th>
          <th onClick={() => onSort("address")} style={{ cursor: "pointer" }}>
            Dirección {getSortIndicator("address")}
          </th>
          <th onClick={() => onSort("phone")} style={{ cursor: "pointer" }}>
            Teléfono {getSortIndicator("phone")}
          </th>
          <th onClick={() => onSort("email")} style={{ cursor: "pointer" }}>
            Correo Electrónico {getSortIndicator("email")}
          </th>
          <th onClick={() => onSort("age")} style={{ cursor: "pointer" }}>
            Edad {getSortIndicator("age")}
          </th>
        </tr>
      </thead>
      <tbody>
        {users.length > 0 ? (
          users.map((user) => (
            <tr
              key={user.id}
              onClick={() => onSelectUser(user)}
              className={selectedUser?.id === user.id ? "table-active" : ""}
            >
              <td>
                <input
                  type="checkbox"
                  checked={selectedUser?.id === user.id}
                  onChange={() => onSelectUser(user)}
                />
              </td>
              <td>{`${user.firstName} ${user.lastName}`}</td>
              <td>{user.gender}</td>
              <td>{user.address?.address || "-"}</td>
              <td>{user.phone}</td>
              <td>{user.email}</td>
              <td>{user.age}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="8" className="text-center">
              No hay datos disponibles
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default UserTable;
