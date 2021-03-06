'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',

  VUE_MOGU_WEB: '"http://localhost:7878"',
  PICTURE_API: '"http://localhost:8602"',
	WEB_API: '"http://192.168.43.179:8080/"',
  ADMIN_API: '"http://192.168.43.179:8080/"',
	ELASTICSEARCH: '"http://localhost:8605"',

})
