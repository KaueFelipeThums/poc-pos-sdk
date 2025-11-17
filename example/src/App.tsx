import {
  InstallmentType,
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
    sdkInstance.tef.payment({
      installments: 1,
      installmentType: InstallmentType.CREDIT_ISSUER,
      type: PaymentType.DEBIT,
      value: 1000,
      extras: {
        redePackageName: 'com.example.app',
      },
    });
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
