import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    // TODO
    const transactions = await this.find();
    // const income = transactions
    //   .filter(item => item.type === 'income')
    //   .reduce((acc, item) => acc + Number(item.value), 0);

    // const outcome = transactions
    //   .filter(item => item.type === 'outcome')
    //   .reduce((acc, item) => acc + Number(item.value), 0);

    const { income, outcome } = transactions.reduce(
      (acc, item) => {
        switch (item.type) {
          case 'income':
            acc.income += Number(item.value);
            break;
          case 'outcome':
            acc.outcome += Number(item.value);
            break;
          default:
            break;
        }

        return acc;
      },
      {
        income: 0,
        outcome: 0,
      },
    );

    const total = income - outcome;

    return {
      income,
      outcome,
      total,
    };
  }
}

export default TransactionsRepository;
