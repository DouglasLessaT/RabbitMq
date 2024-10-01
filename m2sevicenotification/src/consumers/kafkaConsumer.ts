import { Kafka, Consumer } from "kafkajs";
import axios from "axios"; // Adicione a biblioteca axios

export class KafkaConsumer {
  private kafka: Kafka;
  private consumer: Consumer;

  // URL da API de notificação
  private notificationApiUrl = 'http://localhost:8080/notification'; // Ajuste conforme necessário

  constructor(broker: string, groupId: string) {
    this.kafka = new Kafka({
      clientId: "notification-microservice",
      brokers: [broker],
    });

    this.consumer = this.kafka.consumer({ groupId });
  }

  public async connect(topic: string) {
    await this.consumer.connect();
    console.log('Conectando ao Kafka');

    await this.consumer.subscribe({ topic, fromBeginning: true });

    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const paymentData = message.value?.toString();
        console.log(`Mensagem recebida do tópico ${topic}: ${paymentData}`);

        // Tente analisar a mensagem como JSON
        try {
          const paymentObject = JSON.parse(paymentData!);
          console.log('Dados do pagamento:', paymentObject);
        } catch (error) {
          console.error('Erro ao analisar a mensagem JSON:', error);
        }
        
        // Notifica que a mensagem foi consumida
        await this.notifyPaymentConsumption(paymentData);
      }
    });
  }

  private async notifyPaymentConsumption(paymentData: string | undefined) {
    if (paymentData) {
      try {
        const response = await axios.post(this.notificationApiUrl, {
          message: `Pagamento consumido: ${paymentData}`
        });
        console.log('Notificação enviada:', response.data);
      } catch (error) {
        console.error('Erro ao enviar notificação:', error);
      }
    }
  }
}