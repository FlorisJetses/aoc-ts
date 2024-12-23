type GraphList<T, K = string> = {node: T, cost: number, direction?: K}[]

export class Graph<T, K = string> {
  private adjacencyList: Map<T, GraphList<T, K>> = new Map();

  addEdge(from: T, to: T, cost: number, direction?: K): void {
      if (!this.adjacencyList.has(from)) {
          this.adjacencyList.set(from, []);
      }
      this.adjacencyList.get(from)?.push({ node: to, cost, direction });
  }

  neighbors(node: T): GraphList<T, K> {
      return this.adjacencyList.get(node) || [];
  }

  cost(from: T, to: T): number {
      const edges = this.adjacencyList.get(from) || [];
      const edge = edges.find(e => e.node === to);
      return edge ? edge.cost : Infinity;
  }

  get(){
    return this.adjacencyList
  }
}
