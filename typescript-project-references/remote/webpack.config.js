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
		port: 3002
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
		],
	},
	plugins: [
		new ModuleFederationPlugin({
			name: 'remote',
			filename: 'remoteEntry.js',
			remotes: {
				'libs': 'libs@http://localhost:3000/remoteEntry.js'
			},
			exposes: {
				'./Todo': './src/Todo'
			},
		}),
		new HtmlWebPackPlugin({
			template: './public/index.html',
		})
	]
}
