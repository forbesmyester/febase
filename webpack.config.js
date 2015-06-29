module.exports = {
    entry: __dirname + "/jsx/index.jsx",
    module: {
        loaders: [
            { test: /\.jsx/, loader: "babel-loader" },
            { test: /\.js/, loader: "babel-loader" }
        ]
    },
    lazy: true,
    output: {
        filename: "js/jsx/index.js",
        publicPath: "/",
        path: __dirname
    },
    devtool: "inline-source-map"
}


