import axios, { AxiosInstance } from 'axios';

class AppClient {
  private static instance: AxiosInstance | null = null;

  public static getInstance() {
    if (!AppClient.instance) {
      AppClient.instance = axios.create({
        baseURL: `http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/`,
        timeout: 10000,
      });
    }

    return AppClient.instance;
  }
}

export default AppClient;
