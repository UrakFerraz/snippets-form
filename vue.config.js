const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
    transpileDependencies: true,
    pwa: {
        name: "todo-ts",
    },
    configureWebpack: {
        devtool: "source-map",
    },
    devServer: {
        port: 3000,
    },
});
