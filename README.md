LARAVEL ELIXIR INDEX BUILDER
=============================

For creating true single page application. This package helps you to build index.html as a laravel-elixir task which should be called post version call.

Index builder uses simple pug template to craft your index.html. Along with cache busted versioned files are injected during pug transpilation.

Additional configs can be passed to index builder as a part of configs.

## Installation

```
npm install laravel-elixir-index-builder
```

## Usage

Include laravel-elixir-index-builder
```
var indexBuilder  = require('laravel-elixir-index-builder');
```
for ECMA2015
```
import indexBuilder from 'laravel-elixir-index-builder';
```
Initialize it with existing elixir.
```
indexBuilder(elixir);
```
call buildIndex task post version call.

```
mix.sass(['*.scss'], 'public/css/app.css')
    .browserify('test.js', './public/build/app.js')
    .scripts([ './public/build/app.js'], './public/js/all.js')
    .version(["css/app.css", "js/all.js"])
    .buildIndex();
```
further check example

## Contributing

If you find this code useful : <a href="https://www.buymeacoffee.com/gourav" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: auto !important;width: auto !important;" ></a>

In lieu of a formal style guide, take care to maintain the existing coding style.

further improvement
*  Include unit tests
*  CI Integration.
