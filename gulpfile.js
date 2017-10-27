var gulp   = require('gulp'),
		sass = require('gulp-sass'),
		autoprefixer = require('gulp-autoprefixer'),
		concat = require('gulp-concat');
		browserSync = require('browser-sync').create();
		reload = browserSync.reload;

gulp.task('default', ['styles', 'watch', 'autoprefixer', 'browser-sync']);

gulp.task('styles', function() {
	return gulp.src('sass/**/*.scss')
		.pipe(sass({
			'sourcemap=none': true,
			errLogToConsole: true
		}))
		.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'Firefox > 20', 'Firefox >= 20', 'Firefox'))
		.pipe(concat('style.css'))
		.pipe(gulp.dest('.'))
		.pipe(reload({stream: true}));
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
	gulp.watch(['sass/**/*.scss'], ['styles']);
	gulp.watch('*html', reload);
});

gulp.task('autoprefixer', function () {
    return gulp.src('src/app.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('browser-sync', function() {
	browserSync.init({
		server: '.'
	})
});