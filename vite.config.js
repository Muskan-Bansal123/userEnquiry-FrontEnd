// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite"; // ✅ correct import
import flowbiteReact from "flowbite-react/plugin/vite";

export default defineConfig({
  plugins: [
    react(), // ✅ use as a plugin here
    tailwindcss(),
    flowbiteReact(),
  ],
  base: "/",
});
