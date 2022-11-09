const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { FederatedTypesPlugin } = require('@module-federation/typescript');

const path = require("path");
const deps = require('./package.json').dependencies;

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
				use: ['style-loader', 'css-loader', 'postcss-loader'],
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
			exposes: {
				'./Todo': './src/Todo'
			},
			shared: {
				react: {
					singleton: true,
					requiredVersion: deps.react,
					eager: true,
				},
				'react-dom': {
					singleton: true,
					requiredVersion: deps['react-dom'],
					eager: true,
				},
			},
		}),
		new FederatedTypesPlugin(),
		new HtmlWebPackPlugin({
			template: './public/index.html',
		})
	]
}
