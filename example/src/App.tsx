import {
  InstallmentType,
  PaymentStatus,
  PaymentType,
  PosSdk,
  PosSdkAdministrator,
} from 'poc-pos-sdk';
import { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Button from './components/button';

const sdkInstance = PosSdk.init(PosSdkAdministrator.REDE);

export default function App() {
  useEffect(() => {
    const makePayment = async () => {
      const response = await sdkInstance.tef.payment({
        installments: 1,
        installmentType: null,
        type: PaymentType.DEBIT,
        value: 1000, // INTEGER VALUE IN CENTS (1000 = R$10.00)
        extras: {
          // REDE
          redePackageName: 'com.yourapp.package',
        },
      });

      const capabilities = sdkInstance.scanner.getCapabilities();
      console.log('Scanner Capabilities:', capabilities);

      if (response.status === PaymentStatus.SUCCESS) {
        console.log('Payment Successful:', response.data.extras?.transactionId);
      } else {
        console.log('Payment Failed or Canceled:', response);
      }
    };

    makePayment();
  }, []);

  return (
    <View style={styles.container}>
      <Button title="Press" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
