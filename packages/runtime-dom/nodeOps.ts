import { RendererOptions } from "../runtime-core";

// Node = DOM Node のこと
export const nodeOps: Omit<RendererOptions<Node>, "patchProp"> = {
  createElement: (tagName) => {
    return document.createElement(tagName);
  },

  createText: (text: string) => {
    return document.createTextNode(text);
  },

  setElementText(node: Node, text: string) {
    node.textContent = text;
  },

  insert(child: Node, parent: Node, anchor: Node | null = null) {
    parent.insertBefore(child, anchor);
  },
};
