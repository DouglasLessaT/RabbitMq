package privateclasswizard.m1sevicepayament.controllers;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import privateclasswizard.m1sevicepayament.config.RabbitMQConfig;
import privateclasswizard.m1sevicepayament.models.Payment;


@RestController
@RequestMapping("/pagar")
public class PaymentController {

    private final RabbitTemplate rabbitTemplate;

    public PaymentController(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    @PostMapping
    public ResponseEntity<String> processPayment(@RequestBody Payment payment) {
        // Simular o processamento do pagamento
        String confirmationMessage = String.format("Pagamento de %.2f para o pedido %s processado com sucesso!",
                payment.getAmount(),
                payment.getOrderId());

        System.out.println("Enviando pagamento para RabbitMQ: " + payment);
        // Enviar a mensagem para a fila do RabbitMQ
        rabbitTemplate.convertAndSend(RabbitMQConfig.QUEUE, payment);

        return ResponseEntity.ok(confirmationMessage);
    }
}
