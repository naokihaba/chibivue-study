import { RendererOptions } from "../runtime-core/renderer";

export const nodeOps :RendererOptions<Node> = {
  setElementText(node: Node, text: string) {
    node.textContent = text;
  }
};
