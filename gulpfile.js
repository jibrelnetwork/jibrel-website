var gulp = require('gulp');
var less = require('gulp-less');
var concat = require('gulp-concat');
var minify = require('gulp-minify-css');
var merge = require('merge-stream');
var uglify = require('gulp-uglify');
var nunjucks = require('gulp-nunjucks');
var rename = require('gulp-rename');

var i18nEN = require('./src/html/i18n/en');

var cssStyles = [
  './src/css/remodal.css',
  './src/css/remodal-default-theme.css',
]

var vendorScripts = [
  './src/js/jquery.min.js',
  './src/js/scroll.js',
  './src/js/jquery.knob.min.js',
  './src/js/jquery.throttle.min.js',
  './src/js/jquery.classycountdown.js',
  './src/js/remodal.min.js',
]

var scripts = [
  './src/js/autocomplete.js',
  './src/js/select.js',
  './src/js/countries.js',
  './src/js/form.js',
  './src/js/main.js',
]

gulp.task('html-en', function() {
  return gulp
    .src('./src/index.html')
    .pipe(nunjucks.compile(i18nEN))
    .pipe(rename('./index-en.html'))
    .pipe(gulp.dest('./'));
});

gulp.task('html', function() {
  return gulp
    .src('src/index.html')
    .pipe(gulp.dest('./'));
});

gulp.task('css', function() {
  var lessStream = gulp.src('./src/less/*.less').pipe(less());
  var cssStream = gulp.src(cssStyles);

  return merge(lessStream, cssStream)
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./assets/css'));
});

gulp.task('js-vendor', function() {
  return gulp
    .src(vendorScripts)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./assets/js'));
});

gulp.task('js', function() {
return gulp
    .src(scripts)
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('./assets/js'));
});

gulp.task('css-min', function() {
  var lessStream = gulp.src('./src/less/*.less').pipe(less());
  var cssStream = gulp.src(cssStyles);

  return merge(lessStream, cssStream)
    .pipe(concat('style.min.css'))
    .pipe(minify())
    .pipe(gulp.dest('./assets/css'));
});

gulp.task('js-vendor-min', function() {
  return gulp
    .src(vendorScripts)
    .pipe(concat('vendor.min.js'))
    .pipe(uglify({ mangle: false }))
    .pipe(gulp.dest('./assets/js'));
});

gulp.task('js-min', function() {
return gulp
    .src(scripts)
    .pipe(concat('bundle.min.js'))
    .pipe(uglify({ mangle: false }))
    .pipe(gulp.dest('./assets/js'));
});

gulp.task('watch', function() {
  gulp.watch('src/index.html', ['html']);
  gulp.watch('src/less/*.less', ['css', 'css-min']);
  gulp.watch('src/js/*.js', ['js', 'js-vendor', 'js-vendor-min', 'js-min']);
});

gulp.task('default', ['html', 'css', 'js-vendor', 'js']);
gulp.task('prod', ['html', 'css-min', 'js-vendor-min', 'js-min']);
gulp.task('all', ['default', 'prod']);
