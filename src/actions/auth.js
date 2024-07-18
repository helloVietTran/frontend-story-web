import Cookies from 'js-cookie';
import { authApi } from '@/config/api';

export const LOGIN = 'LOG_IN';
export const LOGOUT = 'LOG_OUT';
export const UPDATE_USER = 'UPDATE_USER';

export const login = (data) => async(dispatch)=>{
    try {
      const res = await authApi.login(data);

      Cookies.set("jwt", res.data.token, { expires: Date.now() + 30*60*1000 });
      Cookies.set("refreshToken", res.data.refreshToken, {expires: 7});
      dispatch({ type: LOGIN , payload: { user: res.data.user } });
    } catch (error) {
        console.log(error);
    }
}

export const logout = () => async (dispatch) => {
    try {
     await authApi.logout();
     Cookies.remove("jwt");
     Cookies.remove("refreshToken");
     dispatch({ type: LOGOUT  });
    } catch (error) {
        console.log(error);
    }
}

export const updateUser = (user) => {
    return {
      type: UPDATE_USER,
      payload: user,
    };
  
};

export const autoLogin = ()=> async(dispatch) => {
    try {
        const res =  await authApi.autoLogin();
        dispatch({ type: LOGIN , payload: { user: res.data }});
    } catch (error) {
        return;
    }
}