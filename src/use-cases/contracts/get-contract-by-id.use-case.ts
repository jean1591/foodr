import { Contract } from '@entities/entities';
import { GenericContractRepository } from '@entities/repositories';

export class GetContractById {
  contractRepository: GenericContractRepository;

  constructor(contractRepositoryImplementation: GenericContractRepository) {
    this.contractRepository = contractRepositoryImplementation;
  }

  async execute(contractId: string): Promise<Contract> {
    return this.contractRepository.getOneById(contractId);
  }
}
