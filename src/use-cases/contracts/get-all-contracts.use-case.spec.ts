import { Contract } from '@entities/entities';
import { GenericContractRepository } from '@entities/repositories';
import { GetAllContracts } from './get-all-contracts.use-case';
import { contractFactory } from '@entities/factories/contracts.factory';

describe('GetAllContracts', () => {
  let useCase: GetAllContracts;
  let contractRepository: GenericContractRepository;

  const expectedContracts: Contract[] = [contractFactory(), contractFactory()];

  const Mock = jest.fn(() => ({
    getAll: jest.fn(() => Promise.all(expectedContracts)),
    getOneById: jest.fn(),
    getAllContractsOlderThan: jest.fn(),
  }));

  beforeEach(() => {
    contractRepository = new Mock();
    useCase = new GetAllContracts(contractRepository);
  });

  describe('first', () => {
    it('returns', async () => {
      const contracts = await useCase.execute();

      expect(contracts).toEqual(expectedContracts);
      expect(contractRepository.getAll).toHaveBeenCalledTimes(1);
      expect(contractRepository.getAll).toHaveBeenCalledWith();
    });
  });
});
