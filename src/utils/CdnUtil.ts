import axiosInstance from "@/services/axiosInstance";
import { CREATE_IMG_URL_API } from "./constants";
import axios from "axios";

export const uploadImageToCDN = async (fileImage: File) => {
  const response = await axiosInstance.get(
    `${CREATE_IMG_URL_API}?name=${fileImage.name}&type=${fileImage.type}`
  );
  const { uploadURL, fileURL } = response.data.data;
  await axios.put(uploadURL, fileImage, {
    headers: {
      "Content-Type": fileImage.type,
    },
  });
  return fileURL;
};
