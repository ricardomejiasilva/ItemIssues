const path = require("path");
const ManifestPlugin = require("webpack-manifest-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = (env, args) => {
    return {
        context: path.resolve(__dirname, "Features/"),
        entry: {
            "assets/styles": "../Theme.less", // Allows Ant Styles to be bundled once
            "devtools/sample": "./DevTools/Assets/Scripts/Sample.js",
            "itemIssues/itemIssues":
                "./ItemIssues/Assets/Scripts/ItemIssues.js",
        },
        devtool: "source-map",
        mode: args ? args.mode : "development",
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                "@babel/preset-env",
                                "@babel/preset-react",
                            ],
                            plugins: [
                                "babel-plugin-root-import",
                                ["import", { libraryName: "antd" }],
                                "transform-class-properties",
                            ],
                        },
                    },
                },
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "ts-loader",
                    },
                },
                {
                    test: /\.css$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                        },
                        "css-loader",
                    ],
                },
                {
                    test: /\.less/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                        },
                        {
                            loader: "css-loader",
                        },
                        {
                            loader: "less-loader",
                            options: {
                                modifyVars: {
                                    "border-radius-base": "2px",
                                },
                                javascriptEnabled: true,
                            },
                        },
                    ],
                },
                {
                    test: /\.svg$/,
                    use: ["@svgr/webpack"],
                },
            ],
        },
        resolve: {
            extensions: [".js", ".jsx", ".ts", ".tsx"],
            alias: {
                "~": path.resolve(__dirname, "wwwroot", "src"),
                Theme: path.resolve(__dirname, "Theme.less"),
            },
        },
        output: {
            path: path.resolve(__dirname, "wwwroot/dist"),
            publicPath: "dist/",
            filename: "[name].[contenthash].js",
            libraryTarget: "window",
        },
        externals: {
            //add global dependencies from WAP
            jquery: "jQuery",
            pikaday: "Pikaday",
            moment: "moment",
        },
        plugins: [
            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin({
                filename: "[name].[contenthash].css",
            }),
            new ManifestPlugin(),
        ],
        optimization: {
            minimizer: [new TerserPlugin(), new OptimizeCssAssetsPlugin()],
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /([\\/]node_modules[\\/]|AntDesign)/,
                        chunks: "all",
                        name: "vendors",
                    },
                },
            },
        },
    };
};
