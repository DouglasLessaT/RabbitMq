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
exports.PaymentConsumerService = void 0;
const kafkaConsumer_1 = require("./kafkaConsumer");
class PaymentConsumerService {
    constructor(broker, groupId, topic) {
        this.consumer = new kafkaConsumer_1.KafkaConsumer(broker, groupId);
        this.start(topic);
    }
    start(topic) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.consumer.connect(topic);
                console.log(`Consumidor do tópico "${topic}" inicializado.`);
            }
            catch (error) {
                console.error('Erro ao inicializar o consumidor Kafka', error);
            }
        });
    }
}
exports.PaymentConsumerService = PaymentConsumerService;
