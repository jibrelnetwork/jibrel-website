const gulp = require('gulp')
const less = require('gulp-less')
const concat = require('gulp-concat')
const minify = require('gulp-minify-css')
const merge = require('merge-stream')
const uglify = require('gulp-uglify')
const nunjucks = require('gulp-nunjucks')
const rename = require('gulp-rename')
const copy = require('gulp-copy')

const i18n = require('./src/html/i18n')

const cssStyles = []

const vendorScripts = [
  './src/js/vendor/jquery.min.js',
  './src/js/vendor/scroll.js',
  './src/js/vendor/slick.min.js',
]

const scripts = [
  './src/js/main.js',
  './src/js/popover.js',
  './src/js/tracking.js',
]

/*
const i18n = [
  './src/js/i18n/en.js',
  './src/js/i18n/ko.js',
  './src/js/i18n/countries-en.js',
  './src/js/i18n/countries-ko.js',
]
*/

Object.keys(i18n).forEach(function (languageCode) {
  const isEN = (languageCode === 'en-US')

  gulp.task(languageCode, function() {
    return gulp
      .src('./src/html/index.html')
      .pipe(nunjucks.compile(i18n[languageCode]))
      .pipe(rename(isEN ? './index.html' : `./${languageCode}.html`))
      .pipe(gulp.dest('./public'))
  })
})

gulp.task('css', function() {
  const lessStream = gulp.src('./src/less/core.less').pipe(less())
  const cssStream = gulp.src(cssStyles)

  return merge(lessStream, cssStream)
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./public/assets/css'))
})

gulp.task('js-vendor', function() {
  return gulp
    .src(vendorScripts)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./public/assets/js'))
})

gulp.task('js', function() {
  return gulp
    .src(scripts)
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('./public/assets/js'))
})

/*
gulp.task('i18n', function() {
  return gulp
    .src(i18n)
    .pipe(copy('./public/assets/js/i18n', { prefix: 3 }))
})
*/

gulp.task('css-min', function() {
  const lessStream = gulp.src('./src/less/core.less').pipe(less())
  const cssStream = gulp.src(cssStyles)

  return merge(lessStream, cssStream)
    .pipe(concat('style.min.css'))
    .pipe(minify())
    .pipe(gulp.dest('./public/assets/css'))
})

gulp.task('js-vendor-min', function() {
  return gulp
    .src(vendorScripts)
    .pipe(concat('vendor.min.js'))
    .pipe(uglify({ mangle: false }))
    .pipe(gulp.dest('./public/assets/js'))
})

gulp.task('js-min', function() {
  return gulp
    .src(scripts)
    .pipe(concat('bundle.min.js'))
    .pipe(uglify({ mangle: false }))
    .pipe(gulp.dest('./public/assets/js'))
})

/*
gulp.task('i18n-min', function() {
  return gulp
    .src(i18n)
    .pipe(copy('./public/assets/js/i18n', { prefix: 3 }))
    .pipe(uglify({ mangle: false }))
    .pipe(gulp.dest('./public/assets/js/i18n'))
})
*/

gulp.task('html', Object.keys(i18n))

gulp.task('watch', function() {
  gulp.watch('src/html/**/*', ['html'])
  gulp.watch('src/less/*.less', ['css', 'css-min'])
  gulp.watch('src/js/**/*.js', ['js', 'js-vendor', 'js-vendor-min', 'js-min'])
})

gulp.task('default', ['html', 'css', 'js-vendor', 'js'])
gulp.task('prod', ['html', 'css-min', 'js-vendor-min', 'js-min'])
gulp.task('all', ['default', 'prod'])
