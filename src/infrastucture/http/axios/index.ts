import HttpContract, {
  HttpResponseContract,
} from "../../../domain/contracts/http.contract";
import axios, { AxiosInstance } from "axios";

export default class HttpInstance implements HttpContract {
  private axiosInstance: AxiosInstance;

  constructor(url: string, extraHeader?: { [key: string]: string }) {
    this.axiosInstance = axios.create({
      baseURL: url,
      headers: {
        Accept: "application/json",
        ...extraHeader,
      },
    });
  }

  public async get<T>(path: string, headers?: object): Promise<T> {
    const { data } = await this.axiosInstance
      .get<T>(path, headers)
      .catch((error: any) =>
        Promise.reject({
          status: error?.response?.status || -1,
          error: error?.response?.data || error?.response?.statusText || error,
        })
      );

    return data;
  }

  public async post<T>(
    path: string,
    body?: object,
    headers?: object
  ): Promise<HttpResponseContract<T>> {
    const response = await this.axiosInstance
      .post(path, body, headers)
      .catch((error: any) =>
        Promise.reject({
          status: error?.response?.status || -1,
          error: error?.response?.data || error?.response?.statusText || error,
        })
      );

    return response;
  }

  public async put<T>(
    path: string,
    body: object,
    headers?: object | undefined
  ): Promise<HttpResponseContract<T>> {
    const response = await this.axiosInstance
      .put(path, body, headers)
      .catch((error: any) =>
        Promise.reject({
          status: error?.response?.status || -1,
          error: error?.response?.data || error?.response?.statusText || error,
        })
      );

    return response;
  }

  public async delete<T>(
    path: string,
    headers?: object
  ): Promise<HttpResponseContract<T>> {
    const response = await this.axiosInstance
      .delete<T>(path, { headers })
      .catch((error: any) =>
        Promise.reject({
          status: error?.response?.status || -1,
          error: error?.response?.data || error?.response?.statusText || error,
        })
      );

    return response;
  }
}
