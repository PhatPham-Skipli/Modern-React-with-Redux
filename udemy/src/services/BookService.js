import axiosClient1 from "../api/axiosClient1";

export const getBooks = async () => {
  const response = await axiosClient1.get("/books");
  return response;
}

export const createBook = async (data) => {
  const response = await axiosClient1.post("/books", data);
  return response;
};

export const updateBook = async (id, data) => {
  const response = await axiosClient1.put(`/books/${id}`, data);
  return response;
}

export const deleteBook = async (id) => {
  const response = await axiosClient1.delete(`/books/${id}`);
  return response;
}