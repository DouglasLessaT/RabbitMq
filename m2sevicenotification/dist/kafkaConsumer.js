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
exports.KafkaConsumer = void 0;
const kafkajs_1 = require("kafkajs");
class KafkaConsumer {
    constructor(broker, groupId) {
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
                })
            });
        });
    }
}
exports.KafkaConsumer = KafkaConsumer;
