const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const { FederatedTypesPlugin } = require('@module-federation/typescript');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const path = require("path");
const deps = require('./package.json').dependencies;

module.exports = {
	entry: './src/index',
	mode: 'development',
	devServer: {
		static: {
			directory: path.join(__dirname, 'dist')
		},
		port: 3000
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
			name: 'host',
			remotes: {
				remote: 'remote@http://localhost:3001/remoteEntry.js',
			},
			shared: {
				react: {
					requiredVersion: deps.react,
					singleton: true,
					eager: true,
				},
				'react-dom': {
					requiredVersion: deps['react-dom'],
					singleton: true,
					eager: true,
				},
			},
		}),
		new FederatedTypesPlugin(),
		new HtmlWebPackPlugin({
			template: './public/index.html',
			favicon: './public/favicon.ico',
		}),
	]
}
