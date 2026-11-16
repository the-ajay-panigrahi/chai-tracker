import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";
const file = (path) => fileURLToPath(new URL(path, import.meta.url));
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [
      { find: /^firebase\/auth$/, replacement: file("./tests/mocks/auth.js") },
      {
        find: /^firebase\/firestore$/,
        replacement: file("./tests/mocks/firestore.js"),
      },
      {
        find: /^.*\/firebase(?:\.js)?$/,
        replacement: file("./tests/mocks/firebase.js"),
      },
    ],
  },
  server: { host: "127.0.0.1", port: 5174, strictPort: true },
});
