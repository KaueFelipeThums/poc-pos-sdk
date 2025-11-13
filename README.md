# poc-pos-sdk

Module integration response:

```JAVA
  promise.resolve(Map.of(
    "status", PaymentStatus.APPROVED.name(),
    "message", "Pagamento concluído com sucesso",
    "data", paymentData
  ));
```
