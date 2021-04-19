import axios from "axios";
import {api_url} from "../../helpers";
import {nullifyCustomAction} from "./customOrderAction";
import {fetchProductAction} from "./productAction";

const url = api_url + "/user";

// LOGIN ACTION
export const loginAction = (data) => {
  return async (dispatch) => {
    dispatch({type: "API_USER_START"});
    try {
      const response = await axios.post(`${url}/login`, data);
      const {
        user_id,
        user_email,
        user_username,
        user_role_id,
        user_isverified,
        cart,
        token,
      } = response.data;
      dispatch({
        type: "LOGIN",
        payload: {
          user_id,
          user_email,
          user_username,
          user_role_id,
          user_isverified,
        },
      });
      localStorage.setItem("token", token);
      dispatch(fetchNotifUser(user_id));
      dispatch({type: "API_USER_SUCCESS"});
      dispatch({type: "USER_FETCH_CART", payload: cart});
      dispatch(fetchAddressAction({user_id}));
      dispatch(fetchProductAction());
    } catch (err) {
      console.log(err);
      dispatch({type: "API_USER_FAILED", payload: err.response.data.message});
    }
  };
};

// REGISTER ACTION
export const registerAction = (data) => {
  return async (dispatch) => {
    dispatch({type: "API_USER_START"});
    try {
      await axios.post(`${url}/signup`, data);
      dispatch(loginAction(data));
      dispatch({type: "API_USER_SUCCESS"});
    } catch (err) {
      console.log(err);
      dispatch({
        type: "API_USER_FAILED",
        payload: err.response.data.message,
      });
    }
  };
};

// VERIFICATION EMAIL ACTION
export const verificationAction = (token) => {
  return async (dispatch) => {
    await axios.post(`${url}/verification`, {token: token});
  };
};

// NULLIFY ERROR ACTION
export const nullifyErrorAction = () => {
  return async (dispatch) => {
    dispatch({type: "NULLIFY_ERROR"});
  };
};

// SEND RESET PASSWORD
export const sendResetEmailAction = (email) => {
  return async (dispatch) => {
    try {
      dispatch({type: "API_USER_START"});
      await axios.post(`${url}/reset-password`, {email: email});
      dispatch({type: "API_USER_SUCCESS"});
    } catch (err) {
      console.log(err);
      dispatch({
        type: "API_USER_FAILED",
        payload: err.response.data.message,
      });
    }
  };
};

// CHANGE PASSWORD
export const changePasswordAction = (token, password) => {
  return async (dispatch) => {
    try {
      dispatch({type: "API_USER_START"});
      const response = await axios.post(
        `${url}/change-password`,
        token,
        password
      );
      dispatch({type: "API_USER_SUCCESS"});
      return response.data.message;
    } catch (err) {
      console.log(err);
      dispatch({
        type: "API_USER_FAILED",
        payload: err.response.data.message,
      });
    }
  };
};

// VERIFIED CHECK
export const verifiedCheckAction = (email) => {
  return async (dispatch) => {
    const response = await axios.post(`${url}/verified-check`, email);
    return response.data.message;
  };
};

// SECURITY QUESTION CHECK
export const securityQuestionAction = (email, answer) => {
  return async (dispatch) => {
    try {
      dispatch({type: "API_USER_START"});
      const response = await axios.post(
        `${url}/security-question`,
        email,
        answer
      );
      dispatch({type: "API_USER_SUCCESS"});
      return response.data.message;
    } catch (err) {
      console.log(err);
      dispatch({
        type: "API_USER_FAILED",
        payload: err.response.data.message,
      });
    }
  };
};

// PWP-15 LOGOUT
export const logoutAction = () => {
  return async (dispatch) => {
    try {
      dispatch({type: "API_USER_START"});
      localStorage.clear();
      dispatch({type: "LOGOUT"});
      dispatch({
        type: "CLEAR_CART",
      });
      dispatch({type: "API_USER_SUCCESS"});
      dispatch(nullifyCustomAction());
    } catch (err) {
      console.log(err);
      dispatch({
        type: "API_USER_FAILED",
        payload: err.response.data.message,
      });
    }
  };
};

// FETCH ADDRESS
export const fetchAddressAction = ({a, user_id}) => {
  return async (dispatch) => {
    try {
      dispatch({type: "API_USER_START"});
      let response;
      if (a) {
        response = await axios.get(`${url}/address/get/${user_id}${a}`);
      } else {
        response = await axios.get(`${url}/address/get/${user_id}`);
      }
      return dispatch({
        type: "API_GET_ADDRESS_SUCCESS",
        payload: response.data,
      });
    } catch (err) {
      dispatch({type: "API_USER_FAILED", payload: err.response});
    }
  };
};

//ADD NEW ADDRESS
export const addNewAddressAction = ({user_address, user_id}) => {
  return async (dispatch) => {
    try {
      dispatch({type: "API_USER_START"});
      await axios.post(`${url}/address/add/${user_id}`, {
        user_address,
        user_id,
      });
      dispatch(fetchAddressAction({user_id}));
    } catch (err) {
      dispatch({type: "API_USER_FAILED", payload: err.message});
    }
  };
};

//CHANGE ADDRESS
export const editAddressAction = ({user_address, user_address_id, user_id}) => {
  return async (dispatch) => {
    try {
      dispatch({type: "API_USER_START"});
      await axios.patch(`${url}/address/edit/${user_address_id}`, {
        user_address,
      });
      dispatch(fetchAddressAction({user_id}));
    } catch (err) {
      dispatch({type: "API_USER_FAILED", payload: err.message});
    }
  };
};

//DELETE ADDRESS
export const deleteAddressAction = ({id, user_id}) => {
  return async (dispatch) => {
    try {
      dispatch({type: "API_USER_START"});
      await axios.delete(`${url}/address/delete/${id}`);
      dispatch(fetchAddressAction({user_id}));
    } catch (err) {
      dispatch({type: "API_USER_FAILED", payload: err.message});
    }
  };
};

export const uploadRecipesAction = ({user_id, pict}) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      dispatch({type: "API_USER_START"});
      let formData = new FormData();
      const val = JSON.stringify({
        user_id,
      });

      formData.append("image", pict);
      formData.append("data", val);

      const headers = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.post(`${url}/upload`, formData, headers);

      dispatch({type: "API_USER_SUCCESS"});
    } catch (err) {
      dispatch({type: "API_USER_FAILED", payload: err.message});
    }
  };
};

export const fetchNotifUser = (user_id) => {
  return async (dispatch) => {
    try {
      console.log(user_id);
      dispatch({type: "API_USER_START"});
      const response = await axios.post(`${url}/get-notif`, {
        user_id: user_id,
      });
      dispatch({type: "API_GET_NOTIF", payload: response.data});
      dispatch({type: "API_USER_SUCCESS"});
    } catch (err) {
      dispatch({type: "API_USER_FAILED", payload: err.message});
    }
  };
};

export const readNotifUser = (user_notif_id) => {
  return async (dispatch) => {
    try {
      dispatch({type: "API_USER_START"});
      await axios.post(`${url}/read-notif`, {
        user_notif_id: user_notif_id,
      });
      dispatch({type: "API_USER_SUCCESS"});
    } catch (err) {
      dispatch({type: "API_USER_FAILED", payload: err.message});
    }
  };
};
