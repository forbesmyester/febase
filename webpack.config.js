var q = {
    plugins: ['require-parts-babel', 'babel-plugin-react-display-name']
};
module.exports = {
    entry: __dirname + "/jsx/index.jsx",
    module: {
        loaders: [
            {
                test: /\.jsx/,
                loader: "babel-loader",
                query: q
            },
            {
                test: /\.js/,
                loader: "babel-loader",
                query: q
            }
        ]
    },
    lazy: true,
    output: {
        filename: "js/jsx/index.js",
        publicPath: "/",
        path: __dirname
    },
    devtool: "inline-source-map"
};



