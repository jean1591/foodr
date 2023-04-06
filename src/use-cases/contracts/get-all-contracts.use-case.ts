import { Contract } from '@entities/entities';
import { GenericContractRepository } from '@entities/repositories';

export class GetAllContracts {
  contractRepository: GenericContractRepository;

  constructor(contractRepositoryImplementation: GenericContractRepository) {
    this.contractRepository = contractRepositoryImplementation;
  }

  async execute(): Promise<Contract[]> {
    return this.contractRepository.getAll();
  }
}
