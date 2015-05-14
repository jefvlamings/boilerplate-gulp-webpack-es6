/**
 * Created by jefvlamings on 14/05/15.
 */

// Requirements
var gulp        = require('gulp');
var sourcemaps  = require('gulp-sourcemaps');
var haml        = require('gulp-haml-coffee');
var sass        = require('gulp-sass');
var uglify      = require('gulp-uglify');
var notify      = require("gulp-notify");
var browserify  = require('browserify');
var coffeeify   = require('coffeeify');
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');

// Paths
var paths = {
    scripts: ['src/js/*.coffee'],
    sass: ['src/css/*.sass'],
    haml: ['src/*.haml']
};

// HTML
gulp.task('haml', function () {
    gulp.src(paths.haml)
        .pipe(haml())
        .pipe(gulp.dest('build'));
});

// Javascript
gulp.task('javascript', function() {
    return browserify({
        entries: ['src/js/app.coffee'],
        extensions: ['.js','.coffee'],
        debug: true
    })
        .transform(coffeeify)
        .bundle()
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        //.pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/js'))
        .pipe(notify("Bundling done."));
});

// Sass
gulp.task('sass', function () {
    gulp.src(paths.sass)
        .pipe(sass({ indentedSyntax: true }).on('error', sass.logError))
        .pipe(gulp.dest('build/css'));
});

// Watch task
gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['javascript']);
    gulp.watch(paths.haml, ['haml']);
    gulp.watch(paths.sass, ['sass']);
});

// Default task
gulp.task('default', ['watch', 'javascript', 'haml', 'sass']);
