import { defineConfig } from "umi";

export default defineConfig({
  npmClient: "pnpm",
  routes: [
    { path: "/", component: "@/pages/index" },
    { path: "/user", component: "@/pages/user" },
  ],
});
