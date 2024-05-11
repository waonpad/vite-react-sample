import { resolve } from "node:path";
import react from "@vitejs/plugin-react-swc";
import { type UserConfig, defineConfig, loadEnv } from "vite";
import type { UserConfig as VitestUserConfig } from "vitest/dist/config.js";

const createEnv = require("./src/constants/env/create-env").createEnv;

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  // validae env vars
  createEnv({ runtimeEnv: process.env });

  return defineConfig({
    plugins: [react()],
    server: {
      port: 8080,
    },
    resolve: {
      alias: {
        "@": resolve(__dirname, "/src"),
      },
    },
    test: {
      globals: true,
      environment: "happy-dom",
      include: ["src/**/*.test.{js,ts,jsx,tsx}"],
      alias: {
        "@": resolve(__dirname, "./src"),
      },
      setupFiles: ["./src/setup-tests.ts"],
    },
    esbuild: {
      drop:
        process.env.VITE_APP_ENV === "production"
          ? [
              "console",
              // 'debugger'
            ]
          : [],
    },
  } as UserConfig & { test: VitestUserConfig["test"] });
};
