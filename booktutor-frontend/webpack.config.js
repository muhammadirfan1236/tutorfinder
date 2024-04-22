module.exports={
    mode: "development", 
    resolve: {
        extensions: ['.js','.jsx','.json'] 
    },
    module:{
        rules: [
            {
                test: /\.(js|jsx)$/,    //kind of file extension this rule should look for and apply in test
                loader:  'babel-loader' //loader which we are going to use
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: './src/index.html'
    })],
    devServer: {
        historyApiFallback: true,
    },
    externals: {
        config: JSON.stringify({
            apiUrl: '/api'
        })
    }
}