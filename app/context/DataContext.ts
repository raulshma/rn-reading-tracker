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
  pages: number;
  bookmark: number,
  lineHint: string,
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
      return { ...state, books: action.payload.books, fetchingBooks: false };
    case 'addBook':
      state.books.unshift(action.payload.book)
      return { ...state }
    case 'patchBook':
      return {
        ...state, books: state.books.map((e: Book) => {
          if (e._id == action.payload.id) {
            e.bookmark = action.payload.bookmark
          }
          return e
        })
      }
    case 'patchLineHint':
      return {
        ...state, books: state.books.map((e: Book) => {
          if (e._id == action.payload.id) {
            e.lineHint = action.payload.lineHint
          }
          return e
        })
      }
    case 'removeBook':
      return { ...state, books: state.books.filter(e => e._id !== action.payload.id), total: state.total - 1 }
    case 'search':
      return { ...state, searchData: action.payload.result };
    case 'loading':
      return { ...state, loading: !state.loading };
    case 'fetching':
      return { ...state, fetchingBooks: true }
    case 'error':
      return { ...state, error: action.payload.error, fetchingBooks: false };
    default:
      return state;
  }
};

const getBooks = (dispatch: any) => {
  return () => {
    dispatch({ type: 'fetching' })
    featherClient.service('books')
      .find()
      .then((e: any) => {
        dispatch({ type: 'getBooks', payload: { books: e.data, total: e.total, limit: e.limit, skip: e.skip } });
      }).catch((e: any) => {
        dispatch({ type: 'error', payload: { error: e.message } });
      });
  };
};

const addBook = (dispatch: any) => {
  return ({ book, hideDialog }: { book: Book, hideDialog: any }) => {
    console.log(book)
    featherClient.service('books')
      .create(book)
      .then((e: any) => {
        dispatch({ type: 'addBook', payload: { book } });
        hideDialog()
      }).catch((e: any) => {
        dispatch({ type: 'error', payload: { error: e.message } });
        setTimeout(() => {
          dispatch({ type: 'error', payload: { error: false } });
        }, 3000)
      });
  };
}

const patchPages = (dispatch: any) => {
  return ({ id, bookmark }: any) => {
    featherClient.service('books')
      .patch(id, { bookmark })
      .then((e: any) => {
        dispatch({ type: 'patchBook', payload: { id, bookmark } });
      }).catch((e: any) => {
        console.log(e)
        dispatch({ type: 'error', payload: { error: e.message } });
      });
  }
}

const patchLineHint = (dispatch: any) => {
  return ({ id, lineHint }: any) => {
    featherClient.service('books')
      .patch(id, { lineHint })
      .then((e: any) => {
        dispatch({ type: 'patchLineHint', payload: { id, lineHint } });
      }).catch((e: any) => {
        console.log(e)
        dispatch({ type: 'error', payload: { error: e.message } });
      });
  }
}

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
  fetchingBooks: boolean;

}

export interface DataContextModel {
  state: DataContextState;
  getBooks: any;
  searchQuery: any;
  addBook: any;
  deleteBook: any;
  patchPages: any; patchLineHint: any;
}

export const { Provider, Context }: any = createDataContext(
  dataReducer,
  { getBooks, searchQuery, deleteBook, addBook, patchPages, patchLineHint },
  {
    searchData: null,
    books: null,
    error: false,
    total: 0,
    limit: 10,
    skip: 0,
    loading: false,
    fetchingBooks: false
  }
);