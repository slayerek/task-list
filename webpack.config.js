var path = require('path');




module.exports = {
    
    entry: ['@babel/polyfill', './src/js/app.js' ],
    output: {
        //path: `${__dirname}/dist`, //przy npm run prod
        path: `${__dirname}/dist/js`,
        filename: 'bundle.js'   
    },
    devServer: {
        publicPath: '/js/',
        contentBase: path.join(__dirname, 'dist'),
        watchContentBase: true,
        host: '195.181.223.13',
        port: 777,
        allowedHosts: [
            'webpacktasklist.bike-lovers.pl'
        ]
        
    },
    watch: true,
    cache: false,
    mode: "development", //ta opcja zostanie pominięta jeżeli użyjemy npm run build
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                //exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [["@babel/preset-env", {
                            targets: {
                                browsers: ['> 1%']
                            }
                        }]]
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
                        {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader'
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
                    }
                }]
            }
        ]
    }
   
  
    
}