const glob = require('glob'),
  fs = require('fs'),
  path = require('path');

function WebpackMergeJsonsPlugin(options) {
  this.src = options.src;
  this.dest = options.dest;
}

WebpackMergeJsonsPlugin.prototype.apply = function(compiler) {
  var self = this;

  this.filesTimeStamps = {};

  compiler.plugin('emit', function(compilation, callback) {
    glob(self.src, function(error, files) {
      var json = {},
        filesChanged = [],
        isAtLeastOneFileChanged;

      files.forEach(function(fileName) {
        var filePath = path.join(compiler.context, fileName),
          isFileChanged;

        self.addJsonToMergedJson(fileName, json);

        self.addFileToWebPackDependencies(compilation, filePath);

        isFileChanged = self.isFileChanged(compilation, filePath);

        filesChanged.push(isFileChanged);

        self.updateFileStamp(compilation, filePath);
      });

      isAtLeastOneFileChanged = filesChanged.some(function(isChanged) {
        return isChanged;
      });

      if (isAtLeastOneFileChanged) {
        self.addJsonToWebPackAssets(compilation, json);
      }

      callback();
    });
  });
};

WebpackMergeJsonsPlugin.prototype.addFileToWebPackDependencies = function(compilation, filePath) {
  compilation.fileDependencies.push(filePath);
};

WebpackMergeJsonsPlugin.prototype.addJsonToWebPackAssets = function(compilation, json) {
  var jsonString = JSON.stringify(json);

  compilation.assets[this.dest] = {
    source: function() {
      return new Buffer(jsonString)
    },
    size: function() {
      return Buffer.byteLength(jsonString)
    }
  };
};

WebpackMergeJsonsPlugin.prototype.addJsonToMergedJson = function(fileName, json) {
  var file = fs.readFileSync(fileName, 'utf8');

  try {
    var fileContent = JSON.parse(file);

    Object.assign(json, fileContent);

  } catch(e) {

  }
};

WebpackMergeJsonsPlugin.prototype.isFileChanged = function(compilation, filePath) {
  var newFileTimeStamp = compilation.fileTimestamps[filePath],
    fileTimeStamp = this.filesTimeStamps[filePath];

  if (!fileTimeStamp || fileTimeStamp !== newFileTimeStamp) {
    return true;
  }
};

WebpackMergeJsonsPlugin.prototype.updateFileStamp = function(compilation, filePath) {
  this.filesTimeStamps[filePath] = compilation.fileTimestamps[filePath];
};

module.exports = WebpackMergeJsonsPlugin;