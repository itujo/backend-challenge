interface TransactionProps {
  id?: number;
  userId: number;
  type: 'deposit' | 'purchase' | 'sale';
  amount: string;
  pricePerUnit: string | null;
  totalValue: string;
  date: Date;
}

export class Transaction {
  id?: number;
  userId: number;
  type: 'deposit' | 'purchase' | 'sale';
  amount: string;
  pricePerUnit?: string | null;
  totalValue: string;
  date: Date | null;

  constructor(props: TransactionProps) {
    this.id = props.id;
    this.userId = props.userId;
    this.type = props.type;
    this.amount = props.amount;
    this.totalValue = props.totalValue;
    this.date = props.date;
  }
}
