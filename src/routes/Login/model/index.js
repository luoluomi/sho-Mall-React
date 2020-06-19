import { routerRedux } from "dva";
import { login } from "../service";
import $$ from "cmn-utils";
import { Alert } from "antd";
import { normal, antdNotice } from "components/Notification";
export default {
  namespace: "login",

  state: {
    loggedIn: false,
    message: "",
    user: {},
  },

  //监听登录
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        if (pathname.indexOf('/sign/login') !== -1) {
          $$.removeStore('user');
        }
      });
    }
  },

  effects: {
    //登录
    *login({ payload }, { call, put }) {
      try {
        const { status, message, data } = yield call(login, payload);
        if (status) {
          if (data.status == 200) {
            $$.setStore("user", data.msg);
            yield put(routerRedux.push("/"));
          } else {
            yield put({
              type: "loginError",
              payload: { message },
            });
          }
        }
      } catch (e) {
        yield put({
          type: "loginError",
          payload: { message: e.message },
        });
      }
    },
    *logout(_, { put }) {},
     //获取用户信息
     *getUser({payload},{call,put}){

      // console.log(payload.uid)
      let param={uid:payload.uid}
      // let status,mess,data
      let result =yield call(getUser,param)
      if(result.status==200){
        yield put({
          type:'getUserSuccess',
          payload:result.msg
        })
      }else{
        notice.error(res.msg)
      }
    }
  },

  reducers: {
    //登录成功
    loginSuccess(state, { payload }) {
      return {
        ...state,
        loggedIn: true,
        message: "",
        user: payload,
      };
    },
    //登录失败
    loginError(state, { payload }) {
      return {
        ...state,
        loggedIn: false,
        message: payload.message,
      };
    },
  },
};
