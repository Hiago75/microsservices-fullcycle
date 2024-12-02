export interface ConsumerOptions {
    topic: string
    groupId: string
    eachMessage: (message: any) => Promise<void>
}