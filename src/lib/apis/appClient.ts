import axios, {AxiosInstance} from "axios";
import ApiInterface from "../interfaces/apiInterface";

class AppClient {
    private static instance: AxiosInstance | null = null;

    public static getInstance() {
        if(!AppClient.instance) {
            AppClient.instance = axios.create({
                baseURL: 'http://localhost:8000/',
                timeout: 10000,
            });
        }

        return AppClient.instance;
    }
}

export default AppClient;