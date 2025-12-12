import { createDep, Dep } from "./dep";

// プロパティとReactiveEffectの集合のマップ
type keyToDepMap = Map<any, Dep>;

// 不要になったオブジェクトをガベージコレクションするためにWeakMapを使用
const targetMap = new WeakMap<any, keyToDepMap>();

export let activeEffect: ReactiveEffect | undefined;

// 実行したい関数（fn）をラップして、実行時に自動で依存関係を追跡できるようにする
export class ReactiveEffect<T = any> {
  constructor(public fn: () => T) {}

  run() {
    let parent: ReactiveEffect | undefined = activeEffect;
    activeEffect = this;
    const res = this.fn();
    activeEffect = parent;
    return res;
  }
}

export function track(target: object, key: unknown) {
  let depsMap = targetMap.get(target);

  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()));
  }

  let dep = depsMap.get(key);
  if (!dep) {
    depsMap.set(key, (dep = createDep()));
  }

  if (activeEffect) {
    dep.add(activeEffect);
  }
}

export function trigger(target: object, key?: unknown) {
  const depsMap = targetMap.get(target);
  if (!depsMap) return;

  const dep = depsMap.get(key);

  if (dep) {
    const effects = [...dep];
    for (const effect of effects) {
      effect.run();
    }
  }
}
