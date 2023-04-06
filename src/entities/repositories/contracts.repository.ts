import { Contract } from '../entities';

export interface GenericContractRepository {
  getAll: () => Promise<Contract[]>;
  getOneById: (id: string) => Promise<Contract>;
  getAllContractsOlderThan: (date: string) => Promise<Contract[]>;
}
