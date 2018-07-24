var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var cleanCss = require('gulp-clean-css');
var gulpIf = require('gulp-if');
var browserSync = require('browser-sync').create();
var imagemin = require('gulp-imagemin');//Minify PNG, JPEG, GIF and SVG images

var config = {
    paths: {
        scss: './src/scss/**/*.scss',
        html: './public/index.html'
    },
    output: {
        cssName: 'main.min.css',
        path: './public/css'
    },
    isDevelop: true
};

gulp.task('scss', function () {
    return gulp.src(config.paths.scss)
        .pipe(gulpIf(config.isDevelop, sourcemaps.init()))
        .pipe(sass())
        .pipe(concat(config.output.cssName))
        .pipe(autoprefixer({browsers: ['last 2 version', 'safari 5']}))
        .pipe(gulpIf(!config.isDevelop, cleanCss()))
        .pipe(gulpIf(config.isDevelop, sourcemaps.write()))
        .pipe(gulp.dest(config.output.path))
        .pipe(browserSync.stream());
});

gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: './public'
        }
    });

    gulp.watch(config.paths.scss, ['scss']);
    gulp.watch(config.paths.html).on('change', browserSync.reload);
});

gulp.task('default', function () {
	gulp.src('src/img/*')
		.pipe(imagemin())
		.pipe(gulp.dest('public/img'))
});

gulp.task('default', ['scss', 'serve']);
