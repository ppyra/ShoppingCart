var gulp = require('gulp');
var gulpSass = require('gulp-sass');

gulp.task('buildcss', function() {
    return gulp.src('src/dev-assets/style.scss')
        .pipe(gulpSass())
        .pipe(gulp.dest('src/assets'));
});

gulp.task('watch', function() {
    gulp.watch('src/dev-assets/**/*.scss', gulp.series('buildcss'));
});