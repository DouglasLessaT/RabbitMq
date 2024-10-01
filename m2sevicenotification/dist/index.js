"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const paymentConsumerService_1 = require("./consumers/paymentConsumerService");
const kafkaBroker = process.env.KAFKA_BROKER || 'localhost:9092';
const kafkaTopic = process.env.KAFKA_TOPIC || 'payments';
const consumerGroupId = process.env.CONSUMER_GROUP_ID || 'notification_group';
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Inicializa o PaymentConsumerService que gerencia a conexão e consumo
            new paymentConsumerService_1.PaymentConsumerService(kafkaBroker, consumerGroupId, kafkaTopic);
            console.log(`Consumidor do tópico "${kafkaTopic}" inicializado.`);
        }
        catch (error) {
            console.error('Erro ao inicializar o consumidor Kafka', error);
        }
    });
}
start();
