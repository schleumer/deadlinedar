var gulp = require("gulp");
var babel = require("gulp-babel");
var less = require("gulp-less");
var path = require('path');
var plumber = require('gulp-plumber');

gulp.task("babel", function () {
  return gulp.src(["src/javascript/**/*.js"], { base: 'src' })
    .pipe(plumber())
    .pipe(babel())
    .pipe(gulp.dest("dist"));
});

gulp.task("less", function() {
  return gulp.src(["src/less/app.less"], { base: 'src/less'})
    .pipe(plumber())
    .pipe(less({paths: [path.join(__dirname, 'node_modules')]}))
    .pipe(gulp.dest("dist/css"));
})

gulp.task('copy-html', function() {
  return gulp.src("src/**/*.html", { base: 'src' })
    .pipe(gulp.dest('dist'));
});

gulp.task('copy-fonts', function() {
  return gulp.src("src/fonts/**/*", { base: 'src/fonts' })
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('watch-babel', function() {
  return gulp.watch(["src/javascript/**/*.js"], ["babel"]);
});

gulp.task('watch-less', function() {
  return gulp.watch(["src/less/**/*.less"], ["less"]);
});

gulp.task('watch-copy-html', function() {
  return gulp.watch(["src/**/*.html"],   ["copy-html"]);
});

gulp.task('watch-copy-fonts', function() {
  return gulp.watch(["src/fonts/**/*"],   ["copy-fonts"]);
});

gulp.task('watch', [
  'babel',
  'watch-babel',
  'copy-html',
  'watch-copy-html',
  'less',
  'watch-less',
  'copy-fonts',
  'watch-copy-fonts'
]);

gulp.task('default', [
  'babel',
  'copy-html',
]);