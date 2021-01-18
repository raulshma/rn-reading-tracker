import createDataContext from './CreateDataContext';
import featherClient from '../services/client';
import { BookSearchResult } from '../common';
import { BookDetails } from '../screens/Book';
interface DataAction {
  payload: any,
  type: string
}
export interface Book {
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

const dataReducer = (state: DataContextState, action: DataAction) => {
  console.log("DataContext", action.type)
  switch (action.type) {
    case 'getBooks':
      return { ...state, books: action.payload.books };
    case 'removeBook':
      return { ...state, books: state.books.filter(e => e._id !== action.payload.id), total: state.total - 1 }
    case 'search':
      return { ...state, searchData: action.payload.result };
    case 'loading':
      return { ...state, loading: !state.loading };
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

const deleteBook = (dispatch: any) => {
  return ({ id }: { id: string }) => {
    featherClient.service('books')
      .remove(id)
      .then((e: any) => {
        dispatch({ type: 'removeBook', payload: { id } });
      }).catch((e: any) => {
        console.log(e)
        dispatch({ type: 'error', payload: { error: e.message } });
      });
  };
};

const searchQuery = (dispatch: any) => {
  return ({ query }: { query: string }) => {
    if (!query) return;
    dispatch({ type: 'loading' });
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
      .then((e) => e.json())
      .then((e) => {
        dispatch({ type: 'search', payload: { result: e } });
      })
      .finally(() => {
        dispatch({ type: 'loading' });
      });
  };
};

interface DataContextState {
  books: Book[];
  searchData: BookSearchResult;
  error: boolean;
  total: number;
  skip: number;
  limit: number;
  loading: boolean;
}

export interface DataContextModel {
  state: DataContextState;
  getBooks: any;
  searchQuery: any;
  deleteBook: any;
}

export const { Provider, Context }: any = createDataContext(
  dataReducer,
  { getBooks, searchQuery, deleteBook },
  {
    searchData: null,
    books: null,
    error: false,
    total: 0,
    limit: 10,
    skip: 0,
    loading: false
  }
);