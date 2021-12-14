import { API_END, API_START, API_ERROR, API_CLEAR } from "../store.types";
import { INITIAL_STATE_API } from "../store.constants";
import { IStoreAction } from "../store.interface";

const apiReducer = (state = INITIAL_STATE_API, action: IStoreAction) => {
  switch (action.type) {
    case API_END:
      return {
        ...state,
        [action.payload.label]: {
          isLoading: false,
          label: action.payload.label,
          done: true,
          isSuccess: true,
          message: action.payload.message,
        },
      };
    case API_START:
      return {
        ...state,
        [action.payload]: {
          isLoading: true,
          error: null,
          label: action.payload,
          done: false,
          isSuccess: false,
          message: "",
        },
      };
    case API_ERROR:
      return {
        ...state,
        [action.payload.label]: {
          isLoading: false,
          error: action.payload.error,
          label: action.payload.label,
          done: true,
          isSuccess: false,
          message: "",
        },
      };
    case API_CLEAR:
      return {
        ...state,
        [action.payload]: {
          isLoading: false,
          done: false,
          error: null,
          isSuccess: false,
          message: "",
        },
      };
    default:
      return state;
  }
};

export default apiReducer;
