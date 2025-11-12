import { multiply } from 'poc-pos-sdk';
import { Text, View, StyleSheet } from 'react-native';
import Button from './components/button';

const result = multiply(3, 7);

export default function App() {
  return (
    <View style={styles.container}>
      <Button title="Press" />
      <Text>Result: {result}</Text>
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
