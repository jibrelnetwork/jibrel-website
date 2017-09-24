var gulp = require('gulp');
var less = require('gulp-less');
var concat = require('gulp-concat');
var minify = require('gulp-minify-css');
var merge = require('merge-stream');
var uglify = require('gulp-uglify');

var vendorScripts = [
  './src/js/jquery.min.js',
  './src/js/scroll.js',
  './src/js/jquery.knob.min.js',
  './src/js/jquery.throttle.min.js',
  './src/js/jquery.classycountdown.min.js',
  './src/js/remodal.min.js',
]

var scripts = [
  './src/js/autocomplete.js',
  './src/js/countries.js',
  './src/js/form.js',
  './src/js/main.js',
]

gulp.task('css', function() {
  var lessStream = gulp.src('./src/less/*.less').pipe(less());
  var cssStream = gulp.src('./src/css/*.css');

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
  var cssStream = gulp.src('./src/css/*.css');

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
  gulp.watch('src/less/*.less', ['css']);
  gulp.watch('src/js/*.js', ['js', 'js-vendor']);
});

gulp.task('default', ['css', 'js-vendor', 'js']);
gulp.task('prod', ['css-min', 'js-vendor-min', 'js-min']);
gulp.task('all', ['default', 'prod']);
