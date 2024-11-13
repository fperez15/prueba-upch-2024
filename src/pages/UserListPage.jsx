import React, { useState, useEffect } from "react";
import EditModal from "../components/modals/EditModal";
import Filters from "../components/Filters";
import Navbar from "../components/Navbar";
import Pagination from "../components/Pagination";
import RecordsPerPage from "../components/RecordsPerPage";
import UserTable from "../components/UserTable";
import { getUsers, getUsersByAgeGender, updateUser, deleteUser } from "../services/userService";
import { showDeleteConfirmation, showSuccessAlert } from "../utils/alert";
import { USER_PER_PAGE_OPTIONS } from "../utils/enums";

const UserListPage = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [ageFilter, setAgeFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [usersPerPage, setUsersPerPage] = useState(USER_PER_PAGE_OPTIONS[0]);
  const [sortConfig, setSortConfig] = useState({ key: "name", direction: "asc" });

  const loadUsers = async () => {
    const skip = (currentPage - 1) * usersPerPage;
    const data = ageFilter || genderFilter 
      ? await getUsersByAgeGender(usersPerPage, skip, ageFilter, genderFilter) 
      : await getUsers(usersPerPage, skip);

    if (data) {
      let sortedUsers = [...data.users];
      if (sortConfig) {
        sortedUsers = sortedUsers.sort((a, b) => {
          if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
          if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
          return 0;
        });
      }
      setUsers(sortedUsers);
      setTotalUsers(data.total);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [currentPage, ageFilter, genderFilter, usersPerPage, sortConfig]);

  const toggleFilters = () => setShowFilters(!showFilters);

  const handleSearch = (age, gender) => {
    setAgeFilter(age);
    setGenderFilter(gender);
    setCurrentPage(1);
  };

  const handleEditClick = () => {
    if (selectedUser) setShowEditModal(true);
  };

  const handleSaveChanges = async (updatedUser) => {
    try {
      await updateUser(updatedUser.id, updatedUser);
      setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user)));
      setSelectedUser(updatedUser);
      setShowEditModal(false);
      showSuccessAlert("Editado", "El usuario ha sido actualizado.");
    } catch (error) {
      console.error("Error updating user: ", error);
      Swal.fire("Error", "No se pudo actualizar el usuario.", "error");
    }
  };

  const handleDeleteClick = async () => {
    if (selectedUser) {
      const result = await showDeleteConfirmation();
      if (result.isConfirmed) {
        try {
          await deleteUser(selectedUser.id);
          setUsers(users.filter(user => user.id !== selectedUser.id));
          setSelectedUser(null);
          showSuccessAlert("Eliminado", "El usuario ha sido eliminado.");
        } catch (error) {
          console.error("Error deleting user: ", error);
          Swal.fire("Error", "No se pudo eliminar el usuario.", "error");
        }
      }
    }
  };

  const handleUsersPerPageChange = (value) => {
    setUsersPerPage(value);
    setCurrentPage(1);
  };

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === "asc" ? "desc" : "asc"
    }));
  };

  return (
    <>
      <Navbar />
      <div className="container pt-5">
        <div className="row">
          <div className="col-12 d-flex justify-content-between align-items-center mb-3">
            <h3>Listado de usuarios</h3>
            <button className="btn btn-sm btn-outline-primary px-4" onClick={toggleFilters}>
              <i className="bi bi-sliders"></i> Filtros
            </button>
          </div>
          <Filters showFilters={showFilters} onSearch={handleSearch} />
          <div className="mb-3">
            <button
              className="btn btn-primary me-2"
              onClick={handleEditClick}
              disabled={!selectedUser}
            >
              <i className="bi bi-pencil"></i> Editar
            </button>
            <button
              className="btn btn-danger"
              onClick={handleDeleteClick}
              disabled={!selectedUser}
            >
              <i className="bi bi-trash"></i> Eliminar
            </button>
          </div>
          <div style={{ maxHeight: "400px", overflowY: "auto" }}>
            <UserTable
              users={users}
              onSelectUser={setSelectedUser}
              selectedUser={selectedUser}
              onSort={handleSort}
              sortConfig={sortConfig}
            />
          </div>
          <div className="d-flex justify-content-between align-items-center mt-3">
            <RecordsPerPage usersPerPage={usersPerPage} onChange={handleUsersPerPageChange} />
            <Pagination currentPage={currentPage} totalPages={Math.ceil(totalUsers / usersPerPage)} onPageChange={setCurrentPage} />
          </div>
        </div>
      </div>
      {showEditModal && (
        <EditModal
          selectedUser={selectedUser}
          handleSaveChanges={handleSaveChanges}
          closeModal={() => setShowEditModal(false)}
        />
      )}
    </>
  );
};

export default UserListPage;
