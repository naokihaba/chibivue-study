import { type ReactiveEffect } from "./effect";

// 依存関係を監視しているReactiveEffectの集合
// Setを使うことで同じeffectが重複して登録されるのを防ぐ
export type Dep = Set<ReactiveEffect>;

export const createDep = (effects?: ReactiveEffect[]): Dep => {
  const dep: Dep = new Set<ReactiveEffect>(effects);
  return dep;
};
