export class Queue<T> {
  queue: T[] = [];

  enqueue(item: T) {
    this.queue.push(item);
  }

  dequeue() {
    return this.queue.shift();
  }

  peek() {
    return this.queue[0];
  }

  get size() {
    return this.queue.length;
  }

  empty() {
    return this.queue.length === 0;
  }
}

export class PriorityQueue<T> extends Queue<T> {
  constructor(private compare: (a: T, b: T) => number) {
    super();
  }

  enqueue(item: T) {
    this.queue.push(item);
    this.queue.sort(this.compare);
  }
}
