import Vant from "vant";
import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";

// 引入重置样式
import "./style/reset.scss";
// 一定要在main.ts中导入tailwind.css，防止vite每次hmr都会请求src/style/index.scss整体css文件导致热更新慢的问题
import "vant/lib/index.css";
import "./style/tailwind.css";

const app = createApp(App);
app.use(Vant);
app.mount("#app");
