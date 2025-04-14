import axios from "axios";
import { getAxiosClient, getAxiosClientWithToken } from ".";
import { axiosKeyNoToken } from "../utils/axioInstance";

export const getListUserApi = () => {
    return axiosKeyNoToken.get("/users");
  };