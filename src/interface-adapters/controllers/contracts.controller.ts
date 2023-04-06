import { GetAllContracts, GetContractById } from '@use-cases/contracts';

import { Contract } from '@entities/entities';
import { GenericContractRepository } from '@entities/repositories';

export class ContractsController {
  contractRepository: GenericContractRepository;

  constructor(contractRepositoryImplementation: GenericContractRepository) {
    this.contractRepository = contractRepositoryImplementation;
  }

  async getContracts(): Promise<Contract[]> {
    const useCase = new GetAllContracts(this.contractRepository);

    return useCase.execute();
  }

  async getContractById(contractId: string): Promise<Contract> {
    const useCase = new GetContractById(this.contractRepository);

    return useCase.execute(contractId);
  }
}
