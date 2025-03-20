import { addCommas, digitsEnToFa } from "@persian-tools/persian-tools";
import { Account, AccuralBudget, Classification, CounterParty, Transaction } from "../type";


export const gperiods = (year: number) =>{return Array.from({ length: 12 }, (_, index) => {
  const month = index + 1;
  return `${year}${month > 9 ? month : `0${month}`}`;
});}

// SeriesValueFormatter<number | null>
export const accounting_display = (v: number | null)=> {
  if(v == null) return ""
  // if(v == 0) return 'صفر'
  const d = digitsEnToFa(addCommas(Math.abs(v)))
  if(v < 0) {
    return `(${d})`
  }
  return d
}

export const accounting_mt_display = (v: number ) => {
  return accounting_display(v / 10**7)
}

export const classification_value_period: (
  root_id: number,
  classifications: Classification[],
  period: string
) => number = (root_id, classifications, period) => {
  const root = classifications.find((c)=> c.id == root_id)
  if(!root) return 0

  const childs = classifications.filter((c)=> c.parent == root_id)
  const childs_value_arr = childs.map((clsf)=>classification_value_period(clsf.id, classifications, period) + accounts_value_for_period(clsf.accounts, period))
  return sum(childs_value_arr) + accounts_value_for_period(root.accounts, period)
};

export const accounts_value_for_period: (
  accounts: Account[],
  period: string
) => number = (accounts, period) => {
  const arr = accounts.map((acc)=>account_value_for_period(acc, period))
  return sum(arr)
};

export const account_value_for_period: (
  accounts: Account,
  period: string
) => number = (account, period) => {
  return transactions_value_for_period(account.transactions, period)
}

export const transactions_value_for_period: (
  transactions: Transaction[],
  period: string
) => number = (transactions, period) => {
  const arr = transactions.map((tr)=>transaction_value_for_period(tr, period))
  return sum(arr)
};

export const transaction_value_for_period: (
  transaction: Transaction,
  period: string
) => number = (transaction, period) => {
  return counterparties_value_for_period(transaction.counter_parties, period)
};


export const counterparties_value_for_period: (
    counterparties: CounterParty[],
    period: string
  ) => number = (counterparties, period) => {
    const arr = counterparties.map((cp)=>counterparty_value_for_period(cp, period))
    return sum(arr)
  };

  export const counterparty_value_for_period: (counterparty: CounterParty, period: string) => number = (counterparty, period) => {
    return accural_budgets_value_for_period(counterparty.accural_budgets, period)
  }

  export const accural_budgets_value_for_period: (
    accural_budgets: AccuralBudget[],
    period: string
  ) => number = (accural_budgets, period) => {
    return accural_budgets.find(ab => ab.period == period)?.value || 0
  };


  const sum = (array: number[]) => {
    return array.reduce((p, c)=>p + c, 0)
  }