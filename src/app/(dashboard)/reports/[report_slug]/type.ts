export interface FinancialStatement {
  id: number;
  classifications: Classification[];
  name: string;
  slug: string;
  material_ui_icon: string;
}

export interface Classification {
  id: number;
  accounts: Account[];
  accural_budgets_value: number;
  name: string;
  lft: number;
  rght: number;
  tree_id: number;
  level: number;
  parent: number | null;
}

export interface Account {
  id: number;
  transactions: Transaction[];
  accural_budgets_value: number;
  name: string;
}

export interface Transaction {
  id: number;
  counter_parties: CounterParty[];
  accural_budgets_value: number;
  name: string;
}

export interface CounterParty {
  id: number;
  accural_budgets: AccuralBudget[];
  accural_budgets_value: number;
  tags: [];
}

export interface AccuralBudget {
  id: number;
  value: number;
  month: number;
  year: number;
  period: string;
}
