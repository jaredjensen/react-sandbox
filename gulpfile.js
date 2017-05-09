const gulp = require('gulp');
const babel = require('gulp-babel');
const webserver = require('gulp-webserver');

gulp.task('transpile', () => {
  return gulp
    .src('app.js')
    .pipe(babel({
      plugins: [
        'transform-react-jsx',
        [
          "transform-class-properties", {
            "spec": true
          }
        ]
      ],
      presets: ['es2015']
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('webserver', ['transpile'], function () {
  gulp
    .src('./')
    .pipe(webserver({directoryListing: false, fallback: 'index.html', livereload: true, open: true, port: 8123}));
});

gulp.task('default', ['webserver'], function () {
  gulp.watch('app.js', 'transpile');
});