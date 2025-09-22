// import axiosInstance from './axiosInstance';

// user service functions: getUserProfile, updateUserProfile
// dưới đây là ví dụ cách dùng, không cần phải viết lại axiosInstance trong file này
// tham khảo cách viết

// export const getUserProfile = async (userId: string) => {
//     const response = await axiosInstance.get(`/users/${userId}`, { withCredentials: true });
//     return response.data;
// };

import axiosInstance from './axiosInstance';
import { UPDATE_USER_PROFILE_API } from '@/utils/constants';

export interface UpdateUserProfileData {
  name: string;
  age?: number;
  gender?: string;
  bio?: string;
  avatarUrl?: string;
}

export const updateUserProfile = async (userId: string, profileData: UpdateUserProfileData) => {
  const response = await axiosInstance.put(`${UPDATE_USER_PROFILE_API}/${userId}`, profileData, {
    withCredentials: true,
  });
  return response.data;
};