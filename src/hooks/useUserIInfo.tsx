import { parsePhoneNumber } from "libphonenumber-js/min";
import { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { IAppState } from "store/store.interface";

const useUserInfo = () => {
  const { data, countries, answers } = useSelector((state: IAppState) => ({
    ...state.auth,
    ...state.general,
    ...state.onBoardingAnswers,
  }));

  const phoneNumberParser = useCallback(
    (phone_number?: string, phone_code?: any) => {
      if (
        phone_number &&
        (phone_number.includes("+") || phone_number.startsWith("00", 0))
      ) {
        return parsePhoneNumber(phone_number);
      } else if (
        phone_number &&
        countries &&
        countries.allCountriesOptions &&
        phone_code
      ) {
        // old way of getting the code from the address_country
        // TODO: remove the commented block when we don't get back to this way
        // const allCountries = countries.allCountriesOptions;
        const allPhoneOptions = countries.phoneCodeOptions;
        // const countryValue = (
        //   allCountries.filter(
        //     (country) =>
        //       country.label.toLowerCase() === address_country.toLowerCase()
        //   )[0] || {}
        // ).value;
        const countryCode = (
          allPhoneOptions.filter((option) => option.value === phone_code)[0] ||
          {}
        ).codeNumber;
        const formattedPhoneNumber = `${countryCode}${phone_number}`;
        return parsePhoneNumber(formattedPhoneNumber);
      } else {
        return "";
      }
    },
    [countries]
  );

  const userInfo = useMemo(() => {
    if (data && answers) {
      const { dw, other } = answers || {};
      const {
        ADDRESS_INFO = {},
        EMPLOYMENT_INFO = {},
        BASIC_INFO = {},
      } = dw || {};
      const { ADDRESS_INFO: ADDRESS_INFO_OTHER = {} } = other || {};
      const { user } = data;
      let countryCode = "";
      let phoneNumber = "";
      let fullPhoneNumber = "";
      let addressCountry = "";
      let addressCity = "";
      let addressLine = "";
      let employmentStatus = "";
      let employmentCompanyName = "";
      let employmentPosition = "";
      let regulation = "";
      if (user) {
        const {
          email,
          first_name,
          last_name,
          address_country,
          regulation: userRegulation,
        } = user;

        const { country: onboardingCountryValue, phone: onboardingPhone } =
          BASIC_INFO || {};

        const { country, nationalNumber, number } = (phoneNumberParser(
          onboardingPhone,
          onboardingCountryValue
        ) || {}) as any;
        const allPhoneOptions = countries ? countries.phoneCodeOptions : [];
        if (country) {
          countryCode = (
            allPhoneOptions.filter((option) => option.iso2 === country)[0] || {}
          ).value;
        }

        if (userRegulation) {
          regulation = userRegulation;
        }

        if (nationalNumber) {
          phoneNumber = nationalNumber;
        }

        if (number) {
          fullPhoneNumber = number;
        }

        if (ADDRESS_INFO_OTHER) {
          addressCountry = ADDRESS_INFO_OTHER.addressCountry;
        }
        if (ADDRESS_INFO) {
          addressCity = ADDRESS_INFO.city;
          addressLine = ADDRESS_INFO.street1;
        }
        if (EMPLOYMENT_INFO) {
          employmentStatus = EMPLOYMENT_INFO.status;
          employmentCompanyName = EMPLOYMENT_INFO.company;
          employmentPosition = EMPLOYMENT_INFO.position;
        }
        return {
          phone_number: onboardingPhone,
          email,
          first_name,
          last_name,
          address_country,
          countryCode,
          phoneNumber,
          addressCountry,
          addressCity,
          addressLine,
          employmentStatus,
          employmentCompanyName,
          employmentPosition,
          fullPhoneNumber,
          regulation,
        };
      }
    }
    return {};
  }, [data, phoneNumberParser, countries, answers]);

  return userInfo;
};

export default useUserInfo;
