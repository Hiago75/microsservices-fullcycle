import KafkaService from '@infra/messaging/kafka/KafkaService'
import { BalanceUpdatedMessage } from '@domain/interfaces/BalanceUpdatedMessage'
import BaseServiceInterface from 'src/@shared/domain/base-service.interface'
import { InputUpdateBalanceDTO, OutputUpdateBalanceDTO } from '@application/usecases/update-balance/update-balance.dto'

export default class BalanceUpdatedConsumer {
  constructor(
    private consumerService: KafkaService,
    private updateBalanceUseCase: BaseServiceInterface<InputUpdateBalanceDTO, OutputUpdateBalanceDTO>
  ) {}

  async consume() {
    await this.consumerService.consume({
      topic: 'balances',
      groupId: 'balance-ms',
      eachMessage: async (message: BalanceUpdatedMessage) => {
        if(message.Name === 'BalanceUpdated') {
            try {
                await this.updateBalanceUseCase.execute({
                    accountId: message.Payload.account_id_from,
                    balance: message.Payload.balance_account_id_from
                })
            
                await this.updateBalanceUseCase.execute({
                    accountId: message.Payload.account_id_to,
                    balance: message.Payload.balance_account_id_to
                })
    
                console.log(`Balance updated for accounts ${message.Payload.account_id_from} and ${message.Payload.account_id_to}`)
            } catch (error) {
                console.error('Error processing BalanceUpdated message:', error)
            }
        } 
      }
    })
  }
}