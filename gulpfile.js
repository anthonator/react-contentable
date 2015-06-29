var babel = require('gulp-babel'),
    gulp  = require('gulp');

gulp.task('default', function() {
  return (
    gulp.src('./index.js')
      .pipe(babel())
      .pipe(gulp.dest('./dist'))
  );
});
