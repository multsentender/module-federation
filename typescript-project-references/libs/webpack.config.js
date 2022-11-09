const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');

module.exports = {
	entry: './index.js',
	mode: 'development',
	devServer: {
		static: {
			directory: path.join(__dirname, 'dist')
		},
		port: 3000
	},
	output: {
		publicPath: 'auto',
		clean: true
	},
	plugins: [
		new ModuleFederationPlugin({
			name: 'libs',
			filename: 'remoteEntry.js',
			exposes: {
				'./react': 'react',
				'./react-dom': 'react-dom',
				'./react-dom/client': 'react-dom/client'
			}
		})
	]
}
