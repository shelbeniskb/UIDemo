	var webpack = require('webpack');
	var path = require('path');
	module.exports = function(isWatching) {
		var DEBUG = !!isWatching ? true : false;
  		
  		var environment = DEBUG ? 'development' : 'production';

		return {
			entry: './app/js/main.js',
			output: {
				path: __dirname + '/build',
				filename: 'bundle.js'
			},
			devtool: 'inline-source-map',  
	        debug: true, 
	        watch: true,
	        module: {  
		      preLoaders: [],
		      loaders: [
		        {
		          test: /\.jsx?$/,
		          loader: 'babel-loader',
		          query: {
		            stage: 0,
		            loose: 'all',
		            blacklist: 'useStrict'
		          }
		        },
		        {
			      test: /\.scss$/,
			      loader: "style!css!sass"
			    }
		      ],
		      // other modules options here  
		    },
		    stats: {
		      colors: true,
		      chunks: !DEBUG,
		      reasons: DEBUG
		    },

		    resolve: {
		      alias: {
		        oneui: '@ali/oneui-expr',
		        'react-router': 'react-router-ie8'
		      },
		      extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx']
		    },

		    plugins: [
		      new webpack.optimize.OccurenceOrderPlugin(),
		      new webpack.DefinePlugin({
		        'process.env': {
		          'NODE_ENV': JSON.stringify(environment)
		        }
		      }),
		      // only load required locales of moment
		      new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en-gb|zh-cn/)
		    ].concat(DEBUG ? [] : [
		      new webpack.optimize.DedupePlugin(),
		      new webpack.optimize.UglifyJsPlugin(),
		      new webpack.optimize.AggressiveMergingPlugin()
		    ])

		}
	}