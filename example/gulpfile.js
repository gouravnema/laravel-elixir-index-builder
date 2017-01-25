var elixir = require('laravel-elixir');
var indexBuilder = require('../src/main');
indexBuilder(elixir);

elixir(function (mix) {
    mix.sass(['*.scss'], 'public/css/app.css')
        .browserify('test.js', './public/build/app.js')
        .scripts([ './public/build/app.js'], './public/js/all.js')
        .version(["css/app.css", "js/all.js"])
        .buildIndex();
});
