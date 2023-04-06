import { Contract } from '@entities/entities';
import { GenericContractRepository } from '@entities/repositories';
import { contractFactory } from '@entities/factories/contracts.factory';

const contracts = [
  contractFactory(),
  contractFactory(),
  contractFactory(),
  contractFactory(),
];

export class ContractRepository implements GenericContractRepository {
  async getAll(): Promise<Contract[]> {
    return contracts;
  }

  async getOneById(contractId: string): Promise<Contract> {
    return contracts.find((contract) => contract.id === contractId);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getAllContractsOlderThan(date: string): Promise<Contract[]> {
    return contracts;
  }
}
