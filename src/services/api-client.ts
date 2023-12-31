
import axios, { AxiosInstance, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import toast from 'react-hot-toast';

const excludedEndpoints: string[] = [];

const headers: Readonly<Record<string, string | boolean>> = {
  Accept: 'application/json',
  // 'Content-Type': 'application/json; charset=utf-8',
};



class NetworkClient {
  public instance: AxiosInstance | null = null;

  public get axiosInstance(): AxiosInstance {
    return this.instance != null ? this.instance : this.initInstance();
  }

  private async errorHandler(error: { response: { data: any; status: number }; code: string }) {
    const { response, code } = error;
    if (response && response.status === 401) {
    
      toast.error('Session Expired !');
    
      await this.closeSession();
      return false;
    }
    if (response) {
      const { data } = response;
      const { message } = data;
      if (message) {
        toast.error(message);
      } else {
        toast.error(`Server error`);
      }
      return Promise.reject(response.data);
    }
    return Promise.reject(code);
  }

  private async closeSession() {
    
    return Promise.resolve(true);
  }


  initInstance() {
    const axiosInstance = axios.create({
      baseURL: `${import.meta.env.VITE_SERVER_URL}`,
      headers,
    });

    axiosInstance.interceptors.request.use(
      (config) => {
       
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    axiosInstance.interceptors.response.use(
      (response) => {
        return response.data;
      },
      async (error) => {
        const errorResp = await this.errorHandler(error);
        return errorResp;
      }
    );

    this.instance = axiosInstance;
    return axiosInstance;
  }

  request<T = any, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R> {
    return this.axiosInstance.request(config);
  }

  get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.axiosInstance.get<T, R>(url, config);
  }

  post<T = any, R = AxiosResponse<T>>(url: string, data?: T, config?: AxiosRequestConfig): Promise<R> {
    return this.axiosInstance.post<T, R>(url, data, config);
  }

  patch<T = any, R = AxiosResponse<T>>(url: string, data?: T, config?: AxiosRequestConfig): Promise<R> {
    return this.axiosInstance.patch<T, R>(url, data, config);
  }

  put<T = any, R = AxiosResponse<T>>(url: string, data?: T, config?: AxiosRequestConfig): Promise<R> {
    return this.axiosInstance.put<T, R>(url, data, config);
  }

  delete<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.axiosInstance.delete<T, R>(url, config);
  }
}

const networkClient = new NetworkClient();

export default networkClient;
