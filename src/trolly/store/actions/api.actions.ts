import { IStoreAction } from "../store.interface";
import { API_START, API_END, API_ERROR, API_CLEAR } from "../store.types";

export const apiStart = (label: string): IStoreAction => ({
  type: API_START,
  payload: label,
});

export const apiEnd = (label: string, message: string): IStoreAction => ({
  type: API_END,
  payload: { label, message },
});

export const apiError = (error: string, label: string): IStoreAction => ({
  type: API_ERROR,
  payload: {
    label,
    error,
  },
});

export const clearApi = (label: string): IStoreAction => ({
  type: API_CLEAR,
  payload: label,
});
