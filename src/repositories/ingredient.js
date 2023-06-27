import { apiResep } from "src/api";
import axios from "axios";

export const fetchListIngredient = async () => {
  try {
    const res = await apiResep.get("/ingredients");
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};

export const fetchAddIngredient = async ({ name }) => {
  try {
    const res = await apiResep.post("/ingredients", { name });
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};

export const fetchUpdateIngredient = async ({ id, name }) => {
  try {
    const res = await apiResep.put(`/ingredients/${id}`, { name });
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};

export const fetchDeleteIngredient = async ({ id }) => {
  try {
    const res = await apiResep.delete(`/ingredients/${id}`);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};
