const { src, dest, pipe, series, watch } = require('gulp');
const terser = require('gulp-terser');

function minifyJS() {
    return src("src/*.js").pipe(terser()).pipe(dest("dist/js"));
}

function watchTask(){
    watch("src/*.js",minifyJS);
}

exports.default = series(minifyJS, watchTask);