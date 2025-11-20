import { RendererOptions } from "../runtime-core/renderer";

// Node = DOM Node のこと
export const nodeOps :RendererOptions<Node> = {
  setElementText(node: Node, text: string) {
    node.textContent = text;
  }
};
