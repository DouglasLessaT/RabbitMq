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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KafkaConsumer = void 0;
const kafkajs_1 = require("kafkajs");
const axios_1 = __importDefault(require("axios")); // Adicione a biblioteca axios
class KafkaConsumer {
    constructor(broker, groupId) {
        // URL da API de notificação
        this.notificationApiUrl = 'http://localhost:8080/notification'; // Ajuste conforme necessário
        this.kafka = new kafkajs_1.Kafka({
            clientId: "notification-microservice",
            brokers: [broker],
        });
        this.consumer = this.kafka.consumer({ groupId });
    }
    connect(topic) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.consumer.connect();
            console.log('Conectando ao Kafka');
            yield this.consumer.subscribe({ topic, fromBeginning: true });
            yield this.consumer.run({
                eachMessage: (_a) => __awaiter(this, [_a], void 0, function* ({ topic, partition, message }) {
                    var _b;
                    const paymentData = (_b = message.value) === null || _b === void 0 ? void 0 : _b.toString();
                    console.log(`Mensagem recebida do tópico ${topic}: ${paymentData}`);
                    // Tente analisar a mensagem como JSON
                    try {
                        const paymentObject = JSON.parse(paymentData);
                        console.log('Dados do pagamento:', paymentObject);
                    }
                    catch (error) {
                        console.error('Erro ao analisar a mensagem JSON:', error);
                    }
                    // Notifica que a mensagem foi consumida
                    yield this.notifyPaymentConsumption(paymentData);
                })
            });
        });
    }
    notifyPaymentConsumption(paymentData) {
        return __awaiter(this, void 0, void 0, function* () {
            if (paymentData) {
                try {
                    const response = yield axios_1.default.post(this.notificationApiUrl, {
                        message: `Pagamento consumido: ${paymentData}`
                    });
                    console.log('Notificação enviada:', response.data);
                }
                catch (error) {
                    console.error('Erro ao enviar notificação:', error);
                }
            }
        });
    }
}
exports.KafkaConsumer = KafkaConsumer;
