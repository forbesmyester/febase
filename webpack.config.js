var path = require('path');

module.exports = {
    // Modules root directory
    context: __dirname,

    // Entry points for the build
    entry: {
        index: './jsx/index.jsx'     // also used in devServer config below
    },

    // Where and how to expose build results
    output: {
        publicPath: '/js/jsx',        // Where bundles (build results) are served 
        path: path.join(__dirname, 'js', 'jsx'),
                                // (not path, just prefix for requests)
        filename: '[name].jsx',
        chunkFilename: '[name].[chunkhash].js'
    },

    module: {
        loaders: [
            { test: /\.jsx$/, loader: "babel?sourceMaps=inline", exclude: /(node_modules|bower_components)/ },
            { test: /\.css$/, loader: "style!css" }
        ]
    },

    // Development server configuration
    devServer: {
        host: process.env.USER_IP || 'localhost',
        port: 8090,
        publicPath: '/js/jsx/',        // Where webpack exposes bundles
                                //  on its own in-memory file system 
        hot: true,              // Switch on Hot Module Replacement
        indexEntry: 'index.jsx',    // Entry to add HNR code to (EntryChunk or CommonsChunk)
        secure: true,           // use https or http
        stats: {
            colors: true,
            hash: false,
            timings: false,
            assets: true,
            chunks: true,
            chunkModules: true,
            modules: false,
            children: true
        }
    }
};
