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
        loaderOptions: {
            sass: {
                additionalData: `@import "@/assets/style/_colors.scss";`,
            },
        },
    },
    devServer: {
        port: 3000,
    },
});
