import api from "./api";

export const getUsers = async (page = 1, pageSize = 100) => {
  const response = await api.post("/Users/get-users-paged", {
    PageQuery: {
      pageSize: pageSize,
      page: page,
    },
  });
  return response.data;
};

export const getUser = async (id: any) => {
  const response = await api.post("/Users/get-user", {
    id: id,
  });
  return response.data;
};

export const creatUsers = async (user: any) => {
  const response = await api.post("/Users/create-user", user);
  return response.data;
};

export const updateUsers = async (data: any) => {
  const response = await api.put("/Users/update-user", {
    ...data,
  });
  return response.data;
};
