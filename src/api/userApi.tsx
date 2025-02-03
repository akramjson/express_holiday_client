import { axiosInstance } from "../libs/axios";

class UsersCalls {
  static async getRequest({ url }: { url: string }): Promise<any> {
    const response = await axiosInstance.get(url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return response.data;
  }

  static async postRequest({
    url,
    data,
  }: {
    url: string;
    data: any[] | any;
  }): Promise<any> {
    const response = await axiosInstance.post(url, data, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return response;
  }
}

export default UsersCalls;
