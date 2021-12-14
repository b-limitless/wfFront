import { TField } from "../OnboardingProcess.interface";

const usePhoneHandler = (
  field: TField,
  onChangeHandler: (...args: any) => void
) => {
  const onChange = (phone: string, code: string) => {
    onChangeHandler({ phone, code });
  };

  return [onChange];
};

export default usePhoneHandler;
