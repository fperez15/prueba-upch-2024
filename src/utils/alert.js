import Swal from "sweetalert2";

export const showDeleteConfirmation = () => {
  return Swal.fire({
    icon: 'warning',
    title: '¿Estás seguro de que deseas eliminar este usuario?',
    showCancelButton: true,
    confirmButtonColor: '#6C63FF',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'No, cancelar'
  });
};

export const showSuccessAlert = (title, message) => {
  return Swal.fire({
    icon: 'success',
    title: title,
    text: message,
    confirmButtonColor: '#6C63FF'
  });
};
