import { ReactiveEffect } from "../reactivity";
import type { ComponentOptions } from "./componentOptions";
import { VNode, VNodeChild } from "./vnode";

export type Component = ComponentOptions;

export interface ComponentInternalInstance {
  type: Component; // コンポーネントの定義（setup関数など）
  vnode: VNode; // コンポーネント自体を表す仮想ノード（`h(MyComponent, {}, [])`）
  subTree: VNode; // コンポーネントの `render()` が返す仮想ノード（実際のDOM構造）
  next: VNode | null; // 更新時の新しいVNode
  effect: ReactiveEffect; // リアクティブエフェクト
  render: InternalRenderFunction; // render関数
  update: () => void; // 更新をトリガーする関数
  isMounted: boolean; // マウント済みかどうか
}

export type InternalRenderFunction = {
  (): VNodeChild;
};

export function createComponentInstance(
  vnode: VNode,
): ComponentInternalInstance {
  const type = vnode.type as Component;

  const instance: ComponentInternalInstance = {
    type,
    vnode,
    next: null,
    effect: null!,
    subTree: null!,
    update: null!,
    render: null!,
    isMounted: false,
  };

  return instance;
}
