import axios from "axios";
import { message } from "antd";

export async function request(url, params = {}, method = "post", options = {}) {
  try {
    const config = { 
      url, 
      method, 
      data: params, 
      headers: {
        'Content-Type': 'application/json',
      },
      ...options 
    }

    const response = await axios(config);
    console.log('response', response);
    const { data, error } = handleResponse(response);
    if (error) {
      throw error;
    } else {
      return data;
    }
  } catch (error) {
    message.error(error.message || "服务异常");
    console.error(error);
    throw error;
  }
}

/**
 * Custom response data handler logic
 *
 * @param {object} response - response data returned by request
 * @return {object} data or error according to status code
 */
function handleResponse(response) {
  const { data } = response;
  // Please modify the status key according to your business logic
  // normally the key is `status` or `code`
  if (data.status === 200) {
    return { data };
  } else if (data.status === 401) {
    window.location.href = ""; // TODO
  } else {
    const error = new Error(data.message);
    return { error };
  }
}
