import createDataContext from './CreateDataContext';
import featherClient from '../services/client';

interface DataState {
  books: any,
  loading: boolean;
}

interface DataAction {
  payload: any,
  type: string
}

interface Books {
  _id: string;
  rating: number;
  title: string;
  description: string;
  author: string;
  coverUrl: string;
  purchasedPrice: number;
  status: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

const dataReducer = (state: DataState, action: DataAction) => {
  console.log("DataContext", action.type)
  switch (action.type) {
    case 'getBooks':
      return { ...state, books: action.payload.books };
    case 'error':
      return { ...state, error: action.payload.error };
    default:
      return state;
  }
};

const getBooks = (dispatch: any) => {
  return () => {
    featherClient.service('books')
      .find()
      .then((e: any) => {
        dispatch({ type: 'getBooks', payload: { books: e.data, total: e.total, limit: e.limit, skip: e.skip } });
      }).catch((e: any) => {
        dispatch({ type: 'error', payload: { error: e.message } });
      });
  };
};

export interface DataContextModel {
  state: {
    books: Books[],
    error: boolean,
    total: number,
    skip: number;
    limit: number;
  },
  getBooks: any
}

export const { Provider, Context }: any = createDataContext(
  dataReducer,
  { getBooks },
  {
    books: null,
    error: false,
    total: 0,
    limit: 10,
    skip: 0
  }
);
