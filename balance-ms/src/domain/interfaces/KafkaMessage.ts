export interface KafkaMessage {
    topic: string;
    partition: number;
    message: {
        key: Buffer | null;
        value: Buffer | null;
        timestamp: string;
        size: number;
        attributes: number;
        offset: string;
        headers?: Record<string, any>;
    };
}

export interface DefaultMessage {
    Name: string;
    Payload: {}
} 