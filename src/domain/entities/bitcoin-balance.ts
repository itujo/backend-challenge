interface BitcoinBalanceProps {
  id?: number;
  userId: number;
  balance: string;
}

export class BitcoinBalance {
  id?: number;
  userId: number;
  balance: string;

  constructor(props: BitcoinBalanceProps) {
    this.id = props.id;
    this.userId = props.userId;
    this.balance = props.balance;
  }
}
