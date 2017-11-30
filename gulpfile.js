var gulp = require('gulp');
var less = require('gulp-less');
var concat = require('gulp-concat');
var minify = require('gulp-minify-css');
var merge = require('merge-stream');
var uglify = require('gulp-uglify');
var nunjucks = require('gulp-nunjucks');
var rename = require('gulp-rename');
var copy = require('gulp-copy');

var i18nEN = require('./src/html/i18n/en');
var i18nKO = require('./src/html/i18n/ko');

var cssStyles = []

var vendorScripts = [
  './src/js/vendor/jquery.min.js',
  './src/js/vendor/scroll.js',
  './src/js/vendor/slick.min.js',
  './src/js/vendor/moment-with-locales.min.js',
]

var scripts = [
  './src/js/counter.js',
  './src/js/ga.js',
  './src/js/main.js',
  './src/js/popover.js',
  './src/js/tokens.js',
]

var i18n = [
  './src/js/i18n/en.js',
  './src/js/i18n/ko.js',
  './src/js/i18n/countries-en.js',
  './src/js/i18n/countries-ko.js',
]

gulp.task('html-en', function() {
  return gulp
    .src('./src/html/index.html')
    .pipe(nunjucks.compile(i18nEN))
    .pipe(rename('./index.html'))
    .pipe(gulp.dest('./'));
});

gulp.task('html-ko', function() {
  return gulp
    .src('./src/html/index.html')
    .pipe(nunjucks.compile(i18nKO))
    .pipe(rename('./ko.html'))
    .pipe(gulp.dest('./'));
});

gulp.task('css', function() {
  var lessStream = gulp.src('./src/less/core.less').pipe(less());
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

gulp.task('i18n', function() {
  return gulp
    .src(i18n)
    .pipe(copy('./assets/js/i18n', { prefix: 3 }));
});

gulp.task('css-min', function() {
  var lessStream = gulp.src('./src/less/core.less').pipe(less());
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

gulp.task('i18n-min', function() {
  return gulp
    .src(i18n)
    .pipe(copy('./assets/js/i18n', { prefix: 3 }))
    .pipe(uglify({ mangle: false }))
    .pipe(gulp.dest('./assets/js/i18n'));
});

gulp.task('html', ['html-en', 'html-ko']);

gulp.task('watch', function() {
  gulp.watch('src/html/**/*', ['html']);
  gulp.watch('src/less/*.less', ['css', 'css-min']);
  gulp.watch('src/js/**/*.js', ['js', 'js-vendor', 'js-vendor-min', 'js-min', 'i18n-min']);
});

gulp.task('default', ['html', 'css', 'js-vendor', 'js', 'i18n']);
gulp.task('prod', ['html', 'css-min', 'js-vendor-min', 'js-min', 'i18n-min']);
gulp.task('all', ['default', 'prod']);
