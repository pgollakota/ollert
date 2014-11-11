var browserify = require('browserify');
var concat = require('gulp-concat');
var del = require('del');
var gulp = require('gulp');
var reactify = require('reactify');
var source = require('vinyl-source-stream');

var paths = {
    js: [
        './ollert/src/js/*.js'
    ],
    css: [
        './ollert/src/css/main.css',
        './node_modules/bootstrap/dist/css/bootstrap.css',
        './node_modules/font-awesome/css/font-awesome.css']
};

gulp.task('js', function () {
    browserify('./ollert/src/js/app.jsx')
        .transform(reactify)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./ollert/static/js'));
});

gulp.task('css', function () {
    gulp.src(paths.css)
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest('./ollert/static/css/'))
});

gulp.task('watch', function () {
    gulp.watch(paths.css, ['css']);
    gulp.watch(paths.js, ['js']);
});

gulp.task('default', ['watch', 'js', 'css']);
