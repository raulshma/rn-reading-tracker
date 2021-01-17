import createDataContext from './CreateDataContext';
import featherClient from '../services/client';

interface AuthState {
  user: any,
  loading: boolean;
  isRefreshing: boolean;
}

interface AuthAction {
  payload: any,
  type: string
}
interface SigninModel {
  email: string,
  password: string
}


const authReducer = (state: AuthState, action: AuthAction) => {
  console.log("AuthContext", action.type)
  switch (action.type) {
    case 'signout':
      return { ...state, user: null };
    case 'refresh':
      return {
        ...state,
        user: action.payload.user,
        isRefreshing: action.payload.isRefreshing
      }
    case 'signin':
      return {
        ...state,
        user: action.payload.user,
        loading: action.payload.loading
      };
    case 'signup':
      return {
        token: action.payload.token,
        email: action.payload.email,
      };
    case 'error':
      return { ...state, error: action.payload.error };
    case 'loading':
      return {
        ...state,
        isRefreshing: action.payload.isRefreshing,
        loading: action.payload.loading
      };
    default:
      return state;
  }
};

const signup = (dispatch: any) => {
  return ({ email, password }: SigninModel) => {
  };
};

const refresh = (dispatch: any) => {
  return () => {
    const isAuthenticated = featherClient.authentication.authenticated
    if (!isAuthenticated)
      featherClient?.reAuthenticate().then((e) => { dispatch({ type: 'refresh', payload: { ...e, isRefreshing: false } }) }).catch(e => console.log('failed to reauth', e)).finally(() => {
        dispatch({ type: 'loading', payload: { isRefreshing: false } })
      })
    else
      dispatch({ type: 'loading', payload: { isRefreshing: false } })
  }
}

const signin = (dispatch: any) => {
  return ({ email, password }: SigninModel) => {
    dispatch({
      type: 'loading',
      payload: {
        loading: true
      },
    });
    featherClient
      .authenticate({
        strategy: 'local',
        email,
        password,
      })
      .then((e) => {
        dispatch({
          type: 'signin',
          payload: {
            ...e,
            loading: false
          },
        });
      })
      .catch((e) => {
        dispatch({
          type: 'loading',
          payload: {
            loading: false
          },
        });
      })

  };
};

const signout = (dispatch: any) => {
  return () => {
    featherClient.logout();
    dispatch({ type: 'signout' });
  };
};

export const { Provider, Context }: any = createDataContext(
  authReducer,
  { signin, signout, signup, refresh },
  { user: null, loading: false, isRefreshing: true, error: false }
);
