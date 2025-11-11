import { TurboModuleRegistry, type TurboModule } from 'react-native';

export interface Spec extends TurboModule {
  multiply(_a: number, _b: number): number;
}

export default TurboModuleRegistry.getEnforcing<Spec>('PocPosSdk');
