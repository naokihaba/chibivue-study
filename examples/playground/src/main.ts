import { createApp, h } from "chibivue";

const app = createApp({
  render() {
    return h("div", {}, [
      h("h1", {}, ["Hello, ChibiVue!"]),
      h("p", {}, ["This is a simple example of ChibiVue."]),
    ]);
  },
});

app.mount("#app");
