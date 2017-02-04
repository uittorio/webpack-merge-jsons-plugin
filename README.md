# webpack-merge-jsons-plugin
webpack merge multiple jsons into one file

# Merge json files

Merge Json files into one using this webpack plugin.
 
## Usage

Install with npm

```
npm i webpack-merge-jsons-plugin
```

```javascript
 var WebpackMergeJsonsPlugin = require("webpack-merge-jsons-plugin")
 new WebpackMergeJsonsPlugin({
           src: './src/i18n/*.json',
           dest: 'i18n/en-gb.json'
        })
```
