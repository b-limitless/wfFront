import { useMemo } from "react";
import { useSelector } from "react-redux";
import { IState } from "@wf-org/trolly.store";

const useApiInfo = (type: string) => {
  const api = useSelector((state: IState) => state.api);
  return useMemo(() => {
    if (api) {
      const typeInfo = api[type];
      if (typeInfo) {
        const { isLoading, error, done, isSuccess, message } = typeInfo;
        return { isLoading, error, done, isSuccess, message };
      }
    }
    return {
      isLoading: false,
      error: "",
      done: false,
      isSuccess: false,
      message: "",
    };
  }, [type, api]);
};

export default useApiInfo;
