export default class Stack<T> {
  items: T[];

  constructor(items?: T[]) {
    this.items = items ?? [];
  }

  push(element) {
    this.items.push(element);
    return this;
  }

  pop() {
    if (this.items.length === 0) return null;
    return [this, this.items.pop()];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  length() {
    return this.items.length;
  }

  peek() {
    return this.items[this.items.length - 1];
  }
}
