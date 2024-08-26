import { worker } from '../../../packages/vovk';

@worker()
export default class MyInnerWorker {
  static calculateFibonacci(n: number): number {
    if (n <= 1) {
      return n;
    }
    return this.calculateFibonacci(n - 1) + this.calculateFibonacci(n - 2);
  }
}
