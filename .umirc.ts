import { defineConfig } from "umi";

export default defineConfig({
  npmClient: "pnpm",
  plugins: ["@umijs/plugins/dist/dva"], 
  dva: {},
  routes: [
    { path: "/", component: "@/pages/index" },
    { path: "/setting", component: "@/pages/setting" },
  ],
});
