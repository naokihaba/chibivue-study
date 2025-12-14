export type VNodeTypes = string | typeof Text

// Symbol は絶対に他の値と衝突しない一意の識別子
export const Text = Symbol()

export interface VNode<HostNode = any> {
  type: VNodeTypes
  props: VNodeProps | null
  children: VNodeNormalizedChildren

  // 実際のDOMノードへの参照を保持するためのフィールド
  el: HostNode | undefined
}

export interface VNodeProps {
  [key: string]: any
}

export type VNodeNormalizedChildren = string | VNodeArrayChildren
export type VNodeArrayChildren = Array<VNodeArrayChildren | VNodeChildAtom>

export type VNodeChild = VNodeChildAtom | VNodeArrayChildren
type VNodeChildAtom = VNode | string

// h() → createVNode() → VNode
export function createVNode(
  type: VNodeTypes,
  props: VNodeProps | null,
  children: VNodeNormalizedChildren,
): VNode {
  const vnode: VNode = { type, props, children: children, el: undefined }
  return vnode
}

export function normalizeVNode(child: VNodeChild): VNode {
  if (typeof child === 'object') {
    return { ...child } as VNode
  } else {
    return createVNode(Text, null, String(child))
  }
}
