import axios from 'axios';

export async function getApi<T>(url: string, options?: any): Promise<T> {
  try {
    const response = await axios.get<T>(url, options);
    return response.data;
  } catch (error: any) {
    throw new Error(`Error in 'getApi(${url})': ${error.message}`);
  }
}

export async function postApi<T>(url: string, body: any, options?: any): Promise<T> {
  try {
    const response = await axios.post<T>(url, body, options);
    return response.data;
  } catch (error: any) {
    throw new Error(`Error in 'postApi(${url})': ${error.message}`);
  }
}

export async function putApi<T>(url: string, data: any, options?: any): Promise<T> {
  try {
    const response = await axios.put<T>(url, data, options);
    return response.data;
  } catch (error: any) {
    throw new Error(`Error in 'putApi(${url})': ${error.message}`);
  }
}

export async function deleteApi<T>(url: string, options?: any): Promise<T> {
  try {
    const response = await axios.delete<T>(url, options);
    return response.data;
  } catch (error: any) {
    throw new Error(`Error in 'deleteApi(${url})': ${error.message}`);
  }
}
