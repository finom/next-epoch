import { worker } from '../../../packages/vovk/worker';
import { ClientController, MyInnerWorker } from '.vovk-client/client';

@worker()
export default class MyWorker {
  static getClientizeHelloWorld(prefix?: string) {
    return ClientController.getHelloWorldHeaders({
      prefix,
      headers: { 'x-test': 'world' },
    });
  }

  static calculateFibonacci(n: number): Promise<number> {
    return MyInnerWorker.calculateFibonacci(n);
  }

  static findLargestPrimeBelow(max: number): number {
    function isPrime(number: number): boolean {
      for (let i = 2; i * i <= number; i++) {
        if (number % i === 0) {
          return false;
        }
      }
      return number > 1;
    }

    for (let i = max; i >= 2; i--) {
      if (isPrime(i)) {
        return i;
      }
    }

    return -1;
  }

  static async *asyncGenerator() {
    for (let i = 0; i < 10; i++) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      yield i;
    }
  }

  static async *asyncGeneratorWithError() {
    for (let i = 0; i < 10; i++) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      if (i === 5) {
        throw new Error('Not good');
      }
      yield i;
    }
  }

  static *generator() {
    for (let i = 0; i < 10; i++) {
      yield i;
    }
  }

  static *generatorWithError() {
    for (let i = 0; i < 10; i++) {
      if (i === 5) {
        throw new Error('Not good');
      }
      yield i;
    }
  }
}
