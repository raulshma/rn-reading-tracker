import createDataContext from './CreateDataContext';
import featherClient from '../services/client';

interface AuthState {
  user: any,
  loading: boolean;
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
  console.log(action.type)
  switch (action.type) {
    case 'signout':
      return { ...state, user: null };
    case 'refresh':
      return {
        ...state,
        user: action.payload.user
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
    case 'loading':
      return {
        ...state,
        loading: action.payload.loading
      }
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
      featherClient?.reAuthenticate().then((e) => { dispatch({ ...e }) }).catch(e => console.log('failed to reauth', e));
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
  featherClient.logout();
  return () => {
    dispatch({ type: 'signout' });
  };
};

export const { Provider, Context }: any = createDataContext(
  authReducer,
  { signin, signout, signup, refresh },
  { user: null, loading: false }
);
