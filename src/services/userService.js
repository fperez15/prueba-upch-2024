import apiClient from "../api/usersApi";

export const getUsers = async (limit = 10, skip = 0) => {
  try {
    const response = await apiClient.get(`?limit=${limit}&skip=${skip}`);
    return response.data;
  } catch (error) {
    console.error("Error get users: ", error);
    return null;
  }
};

export const getUsersByAgeGender = async (limit = 10, skip = 0, age, gender) => {
  try {
    const response = await apiClient.get(`?limit=${limit}&skip=${skip}`);
    const users = response.data.users;
    const filteredUsers = users.filter(user => {
      return (
        (age ? user.age === parseInt(age) : true) &&
        (gender ? user.gender === gender : true)
      );
    });

    return { users: filteredUsers, total: filteredUsers.length };
  } catch (error) {
    console.error("Error get users with filters: ", error);
    return null;
  }
};

export const updateUser = async (id, userData) => {
  try {
    const response = await apiClient.put(`/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error("Error updating user: ", error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await apiClient.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user: ", error);
    throw error;
  }
};
