import { apiResep } from "src/api";
import axios from "axios";

export const fetchListCategory = async () => {
  try {
    const res = await apiResep.get("/categories");
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};

export const fetchAddCategory = async ({ name }) => {
  try {
    const res = await apiResep.post("/categories", { name });
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};

export const fetchUpdateCategory = async ({ id, name }) => {
  try {
    const res = await apiResep.put(`/categories/${id}`, { name });
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};

export const fetchDeleteCategory = async ({ id }) => {
  try {
    const res = await apiResep.delete(`/categories/${id}`);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};
