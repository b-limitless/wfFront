import { appUtils } from "trolly/utils";

interface IDoc {
  type: string;
  document: string;
}
class AccountOpening {
  transformWFToApp(data: any) {
    // initially the pbjects is empty
    const { dw = {}, other = {}, status = {}, docs = [] } = data || {};
    let updatedOther = Array.isArray(other) ? {} : other;
    let updatedDw = Array.isArray(dw) ? {} : dw;
    let newDocs: { [key: string]: string } = {};
    const { pageIndex = 1 } = status;
    // docs transformer
    if (Array.isArray(docs)) {
      docs.forEach((docObj) => {
        if (!appUtils.isObjectAndEmpty(docObj)) {
          const key = docObj.type;
          const value = docObj.document;
          if (key) {
            newDocs[key] = value;
          }
        }
      });
    } else if (!appUtils.isObjectAndEmpty(docs)) {
      newDocs = docs;
    }

    //tax transformer
    const { IDENTIFICATION_INFO: dwIdentificationInfo = {} } = dw;
    const { IDENTIFICATION_INFO: otherIdentificationInfo = {} } = other;
    const { taxCountry, type, value } = dwIdentificationInfo;
    const { taxPayee } = otherIdentificationInfo;
    if (taxCountry) {
      updatedOther = {
        ...updatedOther,
        IDENTIFICATION_INFO: {
          ...otherIdentificationInfo,
          haveTaxId: true,
          taxPayee: taxPayee ? "yes" : "no",
        },
      };
    }
    if (type === "TIN") {
      updatedDw = {
        ...updatedDw,
        IDENTIFICATION_INFO: {
          ...dwIdentificationInfo,
          TIN: value,
          type: null,
          value: null,
        },
      };
    } else if (type === "SSN") {
      updatedDw = {
        ...updatedDw,
        IDENTIFICATION_INFO: {
          ...dwIdentificationInfo,
          SSN: value,
          type: null,
          value: null,
        },
      };
    }

    let accountOpeningObj = {};
    if (!appUtils.isEmpty(status) && !Array.isArray(updatedDw)) {
      accountOpeningObj = {
        dw: updatedDw,
        other: updatedOther,
        status,
        docs: newDocs,
      };
    }
    return { answers: accountOpeningObj, questionIndex: pageIndex };
  }

  transformAppToWf(options: {
    data: any;
    questionIndex: number;
    appId?: string;
    isAccountOpeningCompleted?: boolean;
    isSubmit?: boolean;
  }) {
    const { data, questionIndex, appId, isSubmit, isAccountOpeningCompleted } =
      options;
    const { dw = {}, other = {}, status = {}, docs = [] } = data || {};
    let updatedOther = other;
    let updatedDw = dw;
    let newDocs: IDoc[] = [];
    // docs transformer
    if (!appUtils.isObjectAndEmpty(docs)) {
      Object.keys(docs).forEach((key) => {
        newDocs.push({ type: key, document: docs[key] });
      });
    }

    //tax transformer
    const { IDENTIFICATION_INFO: dwIdentificationInfo = {} } = dw;
    if (dwIdentificationInfo["TIN"]) {
      const newTaxShape = {
        type: "TIN",
        value: dwIdentificationInfo["TIN"],
      };
      updatedDw = {
        ...updatedDw,
        IDENTIFICATION_INFO: {
          ...dwIdentificationInfo,
          ...newTaxShape,
        },
      };
      delete updatedDw.IDENTIFICATION_INFO.TIN;
      // transformer for SSN if exist
    } else if (dwIdentificationInfo["SSN"]) {
      const newTaxShape = {
        type: "SSN",
        value: dwIdentificationInfo["SSN"],
      };
      updatedDw = {
        ...updatedDw,
        IDENTIFICATION_INFO: {
          ...dwIdentificationInfo,
          ...newTaxShape,
        },
      };
      delete updatedDw.IDENTIFICATION_INFO.SSN;
    }

    // status transformer
    let newStatus: any = {
      ...status,
      pageIndex: questionIndex,
      isAccountOpeningCompleted,
    };

    if (appId === "A") {
      if (isSubmit) {
        newStatus = {
          ...newStatus,
          submit: true,
        };
      }
    } else if (appId === "C") {
      if (isSubmit) {
        newStatus = {
          ...newStatus,
          submitTrade: true,
          isNewOnboarding: true,
        };
      } else {
        newStatus = {
          ...newStatus,
          isNewOnboarding: true,
        };
      }
    }

    const accountOpeningObj = {
      dw: updatedDw,
      other: updatedOther,
      status: newStatus,
      docs: newDocs,
    };

    return accountOpeningObj;
  }
}

export default AccountOpening;
