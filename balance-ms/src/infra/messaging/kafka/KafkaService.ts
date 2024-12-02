import { Kafka, Consumer, EachMessagePayload } from 'kafkajs'
import { ConsumerOptions } from './interfaces/ConsumerOptions'

export default class ConsumerService {
  private kafka: Kafka
  
  constructor(
    clientId: string, 
    private brokers: string[]
  ) {
    this.kafka = new Kafka({
      clientId,
      brokers
    })
  }

  async consume(options: ConsumerOptions) {
    const consumer = this.kafka.consumer({ groupId: options.groupId })

    try {
      await consumer.connect()
      await consumer.subscribe({ 
        topic: options.topic,
        fromBeginning: false 
      })

      await consumer.run({
        eachMessage: async ({ message }: EachMessagePayload) => {
          try {
            const parsedMessage = JSON.parse(message.value?.toString() || '{}')
            await options.eachMessage(parsedMessage)
          } catch (error) {
            console.error('Error in message processing:', error)
          }
        }
      })

      return consumer
    } catch (error) {
      console.error('Error setting up consumer:', error)
      throw error
    }
  }
}