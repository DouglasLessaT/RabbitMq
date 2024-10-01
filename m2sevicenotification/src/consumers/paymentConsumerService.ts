import { KafkaConsumer } from './kafkaConsumer';

export class PaymentConsumerService {
    private consumer: KafkaConsumer;

    constructor(broker: string, groupId: string, topic: string) {
        this.consumer = new KafkaConsumer(broker, groupId);
        this.start(topic);
    }

    private async start(topic: string) {
        try {
            await this.consumer.connect(topic);
            console.log(`Consumidor do tópico "${topic}" inicializado.`);
        } catch (error) {
            console.error('Erro ao inicializar o consumidor Kafka', error);
        }
    }
}