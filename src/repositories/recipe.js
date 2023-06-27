import { apiResep } from "src/api";
import axios from "axios";

export const fetchListRecipes = async ({
  search,
  category_id,
  ingredients,
}) => {
  try {
    const res = await apiResep.get("/recipes", {
      params: { search, category_id, ingredients },
    });
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};

export const fetchCreateRecipes = async ({
  category_id,
  name,
  time,
  portion,
  description,
  photo,
  steps,
  ingredients,
}) => {
  try {
    let formData = new FormData();
    formData.append("category_id", category_id);
    formData.append("name", name);
    formData.append("time", time);
    formData.append("portion", portion);
    formData.append("description", description);
    for (let i in steps) {
      formData.append("steps[]", steps[i]);
    }
    // for (let i in ingredients) {
    //   // formData.append("ingredients[]", JSON.stringify(ingredients[i]));
    // }
    ingredients.forEach(function (element, index) {
      formData.append(`ingredients[${index}][id]`, element.id);
      formData.append(
        `ingredients[${index}][measurement]`,
        element.measurement
      );
    });
    formData.append("photo", photo);

    const res = await apiResep.post("/recipes", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};

export const fetchGetRecipe = async ({ id }) => {
  try {
    const res = await apiResep.get(`/recipes/${id}`);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};

export const fetchDeleteRecipe = async ({ id }) => {
  try {
    const res = await apiResep.delete(`/recipes/${id}`);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};

export const fetchUpdateRecipe = async ({
  id,
  category_id,
  name,
  time,
  portion,
  description,
  photo,
  steps,
  ingredients,
}) => {
  try {
    let formData = new FormData();
    formData.append("category_id", category_id);
    formData.append("name", name);
    formData.append("time", time);
    formData.append("portion", portion);
    formData.append("description", description);
    for (let i in steps) {
      formData.append("steps[]", steps[i]);
    }
    // for (let i in ingredients) {
    //   // formData.append("ingredients[]", JSON.stringify(ingredients[i]));
    // }
    ingredients.forEach(function (element, index) {
      formData.append(`ingredients[${index}][id]`, element.id);
      formData.append(
        `ingredients[${index}][measurement]`,
        element.measurement
      );
    });
    formData.append("photo", photo);

    const res = await apiResep.post(`/recipes/update/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};
