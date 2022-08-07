const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
    transpileDependencies: true,

    pwa: {
        name: "todo-ts",
    },

    configureWebpack: {
        devtool: "source-map",
    },

    css: {
        sourceMap: true,
    },
    devServer: {
        port: 3000,
    },
});
