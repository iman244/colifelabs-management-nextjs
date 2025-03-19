import { addCommas, digitsEnToFa } from "@persian-tools/persian-tools";
import { Account, AccuralBudget, Classification, CounterParty, Transaction } from "./type";
import { AxisValueFormatterContext } from "@mui/x-charts/internals";


export const gperiods = (year: number) =>{return Array.from({ length: 12 }, (_, index) => {
  const month = index + 1;
  return `${year}${month > 9 ? month : `0${month}`}`;
});}

// SeriesValueFormatter<number | null>
export const accounting_display = (v: number | null)=> {
  if(!v) return ""
  const d = digitsEnToFa(addCommas(Math.abs(v)))
  if(v < 0) {
    return `(${d})`
  }
  return d
}

export const accounting_mt_display = (v: number, context: AxisValueFormatterContext ) => {
  console.log("context", context)
  console.log("v is", v)
  console.log("v / 10^7", v / 10**7)
  return accounting_display(v / 10**7)
}

type cvp_t = (
  root_id: number,
  classifications: Classification[],
  period: string
) => number
export const classifications_value_period: cvp_t = (root_id, classifications, period) => {
  const childs = classifications.filter((c)=> c.parent == root_id)
  return childs.reduce(
    (preV, currV) => {
      // const childs_v = 
      return preV + classifications_value_period(currV.id, classifications, period) + accounts_value_for_period(currV.accounts, period)
    },
    0
  );
};

export const accounts_value_for_period: (
  accounts: Account[],
  period: string
) => number = (accounts, period) => {
  return accounts.reduce(
    (preV, currV) =>
      preV + transactions_value_for_period(currV.transactions, period),
    0
  );
};

export const transactions_value_for_period: (
  transactions: Transaction[],
  period: string
) => number = (transactions, period) => {
  return transactions.reduce(
    (preV, currV) =>
      preV + counterparties_value_for_period(currV.counter_parties, period),
    0
  );
};

export const counterparties_value_for_period: (
    counterparties: CounterParty[],
    period: string
  ) => number = (counterparties, period) => {
    return counterparties.reduce(
      (preV, currV) =>
        preV + accural_budgets_value_for_period(currV.accural_budgets, period),
      0
    );
  };

  export const accural_budgets_value_for_period: (
    accural_budgets: AccuralBudget[],
    period: string
  ) => number = (accural_budgets, period) => {
    return accural_budgets.find(ab => ab.period == period)?.value || 0
  };
