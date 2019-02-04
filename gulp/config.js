var dest = './'; // 出力先ディレクトリ
var src = './src';  // ソースディレクトリ
var path = require('path');
var relativeSrcPath = path.relative('.', src);  // パス整形

module.exports = {
    // 出力先の指定
    dest: dest,

    // jsのビルド設定
    js: {
        src: src + '/js/**',
        dest: dest + '/js',
        uglify: false
    },

    // scssのビルド設定
    scss: {
        src: src + '/style/**',
        dest: dest + '/style',
        output: {
            filename: 'style.css'
        },
        outputStyle: 'expanded' // compressed(minify) or expanded
    },

    // webpackの設定
    webpack: {
        entry: src + '/js/app.js',
        output: {
            filename: 'bundle.js'
        },
        resolve: {
            extensions: ['', '.js']
        },
        externals: {
            jquery: 'jQuery'
        },module: {
            loaders: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader'
                }
            ]
        }
    },

    watch: {
        js: relativeSrcPath + '/js/**',
        sass: relativeSrcPath + '/style/**',
        www: relativeSrcPath + '/www/**'
    }

}