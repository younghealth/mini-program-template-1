const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const babel = require('@babel/core')
const less = require('less')
const { stringify } = require('querystring')
const { lutimesSync } = require('fs')

module.exports = {
  mode:'development',
  entry:'./app.js',
  output:{
    path:path.join(__dirname,'dist')
  },
  plugins:[
    new CopyWebpackPlugin({
      patterns:[
        {from:'**/*.wxml',to:'./'},
        {from:'**/*.json',to:'./'},
        {from:"**/*.jpg",to:'./'},
        {from:'**/*.png',to:'./'},
        {from:'**/*.css',to:'./'},

        {
          from:'**/*.js',
          to:'./',
          context:'./wxh',
          globOptions:{
            ignore:['**.test.js']
          },

          transform(content,path){
            const newCode = babel.transformSync(content,{
              babelrc:true,
              "presets":["@babel/env"]
            }).code
            return Promise.resolve(newCode.toString())
          },
        },

        {
          from:'**/*.less',
          to:'./wxh.wxss',
          context:'./wxh',
          transform(content,path){
            return less.render(content.toString())
              .then(function(output){
                return output.css;
              })
          },
          
        }
      ],
    })
  ]
}