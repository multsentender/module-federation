const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const path = require("path");

module.exports = {
	entry: './src/index',
	mode: 'development',
	devServer: {
		static: {
			directory: path.join(__dirname, 'dist')
		},
		port: 3001
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: 'auto',
	},
	module: {
		rules: [
			{
				test: /\.(css|s[ac]ss)$/i,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.(tsx?|jsx?)$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				options: {
					presets: ['@babel/preset-react', '@babel/preset-typescript'],
				},
			},
			{
				test: /\.(gif|png|jpe?g|svg|ico)$/i,
				use: ['file-loader',
					{
						loader: 'image-webpack-loader',
						options: {
							bypassOnDebug: true,
							disable: true,
						},
					},
				],
			}
		],
	},
	plugins: [
		new ModuleFederationPlugin({
			name: 'remote',
			remotes: {
				'libs': 'libs@http://localhost:3000/remoteEntry.js',
				'remote': 'remote@http://localhost:3002/remoteEntry.js'
			},
		}),
		new HtmlWebPackPlugin({
			template: './public/index.html',
			favicon: './public/favicon.ico',
		})
	]
}
