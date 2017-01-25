//node module main file
var gulp = require('gulp');
var promise = require('promise');
var fs = require('fs');
var pug = require('pug');

module.exports = function(elixir,config){
  if(!elixir){
    elixir = require('laravel-elixir');
  }

  if(!config){
    config = {};
  }

  function filterFile(fileList,rexp, pathPrefix){
    var files = [];
    var prefix = pathPrefix || "";
    fileList.forEach(function(file){
      if(rexp.test(file)){
        files.push(prefix +file);
      };
    });
    return files;
  }

  function readDir(path){
    return new promise(function(fulfill,reject){
      fs.readdir(path,function(err,files){
        if(err){
          return reject(err);
        }
        return fulfill(files);
      });
    });
  }

  var templatePath = elixir.config.assetsPath + "/index.pug";
  var buildPath = "/"+ elixir.config.versioning.buildFolder;
  var publicPath  = elixir.config.publicPath;
  var cssPath = publicPath+"/build/css";
  var jsPath = publicPath+"/build/js";

  elixir.extend("buildIndex", function(arguments) {
    return new elixir.Task('build_index', function() {
      var fileList = {};
      var thisTask = this;
      thisTask.watch("public/build/js/*");
      thisTask.watch("public/build/css/*");
      var outPutFile = publicPath +buildPath+ '/index.html';
      thisTask.src = [templatePath];
      thisTask.output = [outPutFile];
      return readDir(cssPath).then(function(cssFiles){
        thisTask.recordStep("Including css files");
        fileList.css = filterFile(cssFiles,/.*css$/,"/css/");
        thisTask.src = thisTask.src.concat(fileList.css.map((cssFile)=>(publicPath + buildPath + cssFile)));
        return readDir(jsPath);
      }).then(function(jsFiles){
        thisTask.recordStep("Including js files");
        fileList.js = filterFile(jsFiles,/.*js$/,"/js/");
        thisTask.src = thisTask.src.concat(fileList.js.map((jsFile)=>(publicPath + buildPath + jsFile)));
        thisTask.recordStep("Building index.html");
        fs.writeFile( outPutFile ,buildIndex(fileList));
      });
    });
  });


  function buildIndex(fileList){
    var template  = pug.compileFile(templatePath);
    return template({includePaths:fileList,config:config});
  }
  return elixir;
}
