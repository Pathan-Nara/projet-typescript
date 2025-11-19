import { defineConfig } from "vitest/config";
export default defineConfig({
    test: {
        globals: true,
        environment: "node",
        coverage: {
            provider: "v8",
            enabled: true,
            reporter: ["text", "html", "json"],
            reportsDirectory: "./coverage",
            include: ["src/**/*.ts"],
            exclude: [
                "node_modules/",
                "dist/",
                "src/**/*.test.ts",
                "src/main.ts"
            ]
        }
    }
});
//# sourceMappingURL=vitest.config.js.map