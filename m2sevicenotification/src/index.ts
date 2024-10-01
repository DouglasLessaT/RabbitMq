import { PaymentConsumerService } from './consumers/paymentConsumerService';

const kafkaBroker = process.env.KAFKA_BROKER || 'localhost:9092';
const kafkaTopic = process.env.KAFKA_TOPIC || 'payments';
const consumerGroupId = process.env.CONSUMER_GROUP_ID || 'notification_group';

async function start() {
    try {
        // Inicializa o PaymentConsumerService que gerencia a conexão e consumo
        new PaymentConsumerService(kafkaBroker, consumerGroupId, kafkaTopic);
        console.log(`Consumidor do tópico "${kafkaTopic}" inicializado.`);
    } catch (error) {
        console.error('Erro ao inicializar o consumidor Kafka', error);
    }
}

start();
