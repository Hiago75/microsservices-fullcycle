import express from 'express';
import { router } from '@infra/http/routes';
import KafkaService from '@infra/messaging/kafka/KafkaService';
import BalanceUpdatedConsumerService from '@infra/messaging/kafka/consumers/BalanceUpdatedConsumer';
import UpdateBalanceFactory from '@application/factories/update-balance.factory';

const app = express();
app.use(express.json());
app.use(router);

async function startServer() {
    const kafkaService = new KafkaService(
        'balance-ms',
        ['localhost:9092']
    )
    
    const updateBalanceUseCase = UpdateBalanceFactory.create();
    const balanceUpdatedConsumer = new BalanceUpdatedConsumerService(kafkaService, updateBalanceUseCase)
    await balanceUpdatedConsumer.consume()

    const port = 3003;

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })
}

startServer().catch(console.error);