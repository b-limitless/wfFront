import {
  TRiskLevel,
  TKYCQuestionCategory,
} from "store/reducers/general.reducers";

class Portfolio {
  getAnswerValue(
    answers: any,
    answerKey: string,
    getKey: string,
    options: any,
    optionKey: string
  ) {
    const answerValue = answers[answerKey];
    let finalAnswer;
    if (options[optionKey]) {
      const selectedOptions = options[optionKey];
      if (Array.isArray(answerValue)) {
        let ranks = [];
        answerValue.forEach((singleValue) => {
          ranks.push(
            (selectedOptions.filter(
              (option: any) => option.value === singleValue
            )[0] || {})[answerKey]
          );
        });
        finalAnswer = ranks.length > 0 ? 1 : 0;
      } else {
        finalAnswer = (selectedOptions.filter(
          (option: any) => option.value === answerValue
        )[0] || {})[getKey];
      }
    }
    return finalAnswer;
  }

  resolveDWData(answers: any, email: string) {
    let age = answers["WHAT_IS_YOUR_AGE"];
    let investment_objective = answers["INVESTMENT_OBJECTIVES"];
    let horizon = answers["INVESTMENT_HORIZON"];
    let debt = answers["INVESTMENT_HORIZON"];
    let income_stability = answers["HOW_CERTAIN_YOUR_INCOME"];
    let market_decline = answers["MARKET_DOWN_DECISION"];
    let experience = answers["PREVIOUS_INVESTMENT_EXPERIENCE"];
    let portfolio = answers["INVESTMENT_DECISION"];
    let type_investment =
      answers["PREVIOUS_INVESTMENT_EXPERIENCE"] !== "NONE"
        ? answers["INVESTMENTS_TYPES"]
        : "NONE";
    let scenario = answers["INVESTMENT_SCENNARIO"];
    let result = {
      fName: null,
      firstname: null,
      email,
      us_citizen: null,
      age: age,
      investment_objective: investment_objective,
      horizon: horizon,
      debt: debt,
      income_stability: income_stability,
      market_decline: market_decline,
      experience: experience,
      portfolio: portfolio,
      type_investment: type_investment,
      scenario: scenario,
      fName_info: null,
      middlename: null,
      lName_info: null,
      gender: null,
      marital_status: null,
      employment: null,
      company_name: null,
      company_address: null,
      employment_type: null,
      company_city: null,
      company_region: null,
      company_country: null,
      wealth_source: null,
      source_income: null,
      percentage_income: null,
      description: null,
      tax_id_option: null,
      identification_type: null,
      identification_goverment: null,
      polically_exposed: null,
      broker_dealer: null,
      director: null,
      passport_option: null,
      passport_id: null,
      proof_address: null,
      confirmation_id: null,
    };
    return result;
  }

  getPortfolioRiskLevel(
    answers: any,
    portfolioData: TRiskLevel[],
    options: any,
    KYCQuestionCategories: TKYCQuestionCategory[]
  ) {
    let result = {};
    let value = 0;
    const Answer2 = Number(answers["AMOUNT_TO_INVEST"]);
    const Answer3 = Number(
      this.getAnswerValue(answers, "ANNUAL_INCOME", "amount", options, "income")
    );
    const Answer4 = Number(
      this.getAnswerValue(
        answers,
        "LIQUID_NET_WORTH",
        "amount",
        options,
        "netWorth"
      )
    );

    const Answer2_3Per = (Answer2 / Answer3) * 100;
    const Answer2_4Per = (Answer2 / Answer4) * 100;

    const q2_q3Selected =
      KYCQuestionCategories.filter(
        ({ min, max }) => min < Answer2_3Per && max >= Answer2_3Per
      )[0] || {};
    const q2_q4Selected =
      KYCQuestionCategories.filter(
        ({ min, max }) => min < Answer2_4Per && max >= Answer2_4Per
      )[0] || {};

    const mark1 = q2_q3Selected.mark || 0;
    const mark2 = q2_q4Selected.mark || 0;

    const mark3 = this.getAnswerValue(
      answers,
      "WHAT_IS_YOUR_AGE",
      "rank",
      options,
      "age"
    );

    const q6_rank = this.getAnswerValue(
      answers,
      "INVESTMENT_OBJECTIVES",
      "rank",
      options,
      "objectives"
    );
    const q1_id =
      this.getAnswerValue(answers, "WHAT_IS_YOUR_AGE", "id", options, "age") -
      1;

    const mark4 = Array.isArray(q6_rank) ? q6_rank[q1_id] : 0;
    const mark5 = this.getAnswerValue(
      answers,
      "INVESTMENT_HORIZON",
      "rank",
      options,
      "investmentHorizon"
    );
    const mark6 = this.getAnswerValue(
      answers,
      "HAVE_DEPT",
      "rank",
      options,
      "haveDept"
    );
    const mark7 =
      mark6 === 0
        ? this.getAnswerValue(answers, "DEPT", "rank", options, "deptKind")
        : 0;
    const mark8 = this.getAnswerValue(
      answers,
      "MARKET_DOWN_DECISION",
      "rank",
      options,
      "marketDownDecision"
    );
    const mark9 = this.getAnswerValue(
      answers,
      "HOW_CERTAIN_YOUR_INCOME",
      "rank",
      options,
      "certainIncome"
    );
    const mark10 = this.getAnswerValue(
      answers,
      "PREVIOUS_INVESTMENT_EXPERIENCE",
      "rank",
      options,
      "previousExperience"
    );
    const mark12 = this.getAnswerValue(
      answers,
      "INVESTMENT_DECISION",
      "rank",
      options,
      "investmentDesicion"
    );

    value =
      Number(mark1) +
      Number(mark2) +
      Number(mark3) +
      Number(mark4) +
      Number(mark5) +
      Number(mark6) +
      Number(mark7) +
      Number(mark8) +
      Number(mark9) +
      Number(mark10) +
      Number(mark12);

    let val = portfolioData.filter(
      (x: any) => x.min < value && x.max >= value
    ) as any;

    result = { id: val[0].id, name: val[0].name, value: value };

    return result;
  }
}

export default Portfolio;
