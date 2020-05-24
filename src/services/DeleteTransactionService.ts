import { getCustomRepository } from 'typeorm';
import TransactionsRepository from '../repositories/TransactionsRepository';
import AppError from '../errors/AppError';

interface Request {
  transaction_id: string;
}

class DeleteTransactionService {
  public async execute({ transaction_id }: Request): Promise<void> {
    // TODO
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const findTransaction = await transactionsRepository.findOne({
      where: {
        id: transaction_id,
      },
    });

    if (!findTransaction) {
      throw new AppError('Transaction does not exist', 400);
    }

    await transactionsRepository.remove(findTransaction);
  }
}

export default DeleteTransactionService;
