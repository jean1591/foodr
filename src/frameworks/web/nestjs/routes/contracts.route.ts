import { Controller, Get, Param } from '@nestjs/common';
import { Contract } from '@entities/entities';
import { ContractRepository } from '@frameworks/db/in-memory/repositories';

import { ContractsController } from '@interface-adapters/controllers';

@Controller('contracts')
export class ContractsRoute {
  contractRepository = new ContractRepository();

  contractsController = new ContractsController(this.contractRepository);

  @Get('/')
  async getContracts(): Promise<Contract[]> {
    return this.contractsController.getContracts();
  }

  @Get('/:contractId')
  async getContractById(
    @Param('contractId') contractId: string,
  ): Promise<Contract> {
    return this.contractsController.getContractById(contractId);
  }
}
