import React, { useState, useEffect } from "react";
import { GENDER } from "../../utils/enums";
import { updateUser } from "../../services/userService";
import "../../styles/modalStyles.css";

const EditModal = ({ selectedUser, handleSaveChanges, closeModal }) => {
  const [nombre, setNombre] = useState("");
  const [genero, setGenero] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [edad, setEdad] = useState("");

  useEffect(() => {
    if(selectedUser) {
      setNombre(`${selectedUser.firstName} ${selectedUser.lastName}`);
      setGenero(selectedUser.gender);
      setDireccion(selectedUser.address?.address || "");
      setTelefono(selectedUser.phone);
      setCorreo(selectedUser.email);
      setEdad(selectedUser.age);
    }
  }, [selectedUser]);

  const onSaveChanges = async (e) => {
    e.preventDefault();
    const updatedUser = {
      ...selectedUser,
      firstName: nombre.split(" ")[0] || "",
      lastName: nombre.split(" ")[1] || "",
      gender: genero,
      address: { ...selectedUser.address, address: direccion },
      phone: telefono,
      email: correo,
      age: parseInt(edad, 10),
    };

    try {
      const response = await updateUser(selectedUser.id, updatedUser);
      handleSaveChanges(response);
      closeModal();
    } catch (error) {
      console.error("Error saving changes: ", error);
    }
  };

  return (
    <>
      <div className="modal-overlay" onClick={closeModal}></div>
      <div className="modal-container">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Editar Usuario</h5>
            <button type="button" className="btn-close" onClick={closeModal}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={onSaveChanges}>
              <div className="row">
                <div className="col-6 mb-3">
                  <label className="form-label">Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                  />
                </div>
                <div className="col-6 mb-3">
                  <label className="form-label">Género</label>
                  <select
                    className="form-select"
                    value={genero}
                    onChange={(e) => setGenero(e.target.value)}
                    required
                  >
                    <option value="">Seleccionar género</option>
                    <option value={GENDER.FEMALE}>Female</option>
                    <option value={GENDER.MALE}>Male</option>
                  </select>
                </div>
                <div className="col-6 mb-3">
                  <label className="form-label">Dirección</label>
                  <input
                    type="text"
                    className="form-control"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                  />
                </div>
                <div className="col-6 mb-3">
                  <label className="form-label">Teléfono</label>
                  <input
                    type="text"
                    className="form-control"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                  />
                </div>
                <div className="col-6 mb-3">
                  <label className="form-label">Correo Electrónico</label>
                  <input
                    type="email"
                    className="form-control"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    required
                  />
                </div>
                <div className="col-6 mb-3">
                  <label className="form-label">Edad</label>
                  <input
                    type="number"
                    className="form-control"
                    value={edad}
                    onChange={(e) => setEdad(e.target.value)}
                    min="0"
                    required
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-primary w-100">Guardar cambios</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditModal;
