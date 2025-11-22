// EventListener is a built-in interface
// Event を受け取り処理するためのインターフェース
interface Invoker extends EventListener {
  value: EventValue;
}

type EventValue = Function;

export function addEventListener(
  el: Element,
  event: string,
  handler: EventListener,
) {
  el.addEventListener(event, handler);
}

export function removeEventListener(
  el: Element,
  event: string,
  handler: EventListener,
) {
  el.removeEventListener(event, handler);
}

export function patchEvent(
  el: Element & { _vei?: Record<string, Invoker | undefined> },
  rawName: string,
  value: EventValue | null,
) {
  // DOM要素に_veiプロパティを追加し、イベント名→invokerのマップを保持
  const invokers = el._vei || (el._vei = {});

  const existingInvoker = invokers[rawName];
  if (value && existingInvoker) {
    // 更新
    existingInvoker.value = value;
  } else {
    const name = parseName(rawName);
    if (value) {
      const invoker = (invokers[rawName] = createInvoker(value));
      addEventListener(el, name, invoker);
    } else {
      removeEventListener(el, name, existingInvoker!);
      invokers[rawName] = undefined;
    }
  }
}

function parseName(rawName: string): string {
  return rawName.slice(2).toLocaleLowerCase();
}

function createInvoker(initialValue: EventValue) {
  const invoker: Invoker = (e: Event) => {
    invoker.value(e);
  };

  invoker.value = initialValue;
  return invoker;
}
