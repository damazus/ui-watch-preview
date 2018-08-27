let gulp = require('gulp');
let sass = require('gulp-sass');
let uglify = require('gulp-uglify');
let pump = require('pump');
let cleanCSS = require('gulp-clean-css');
let browserSync = require('browser-sync').create();

function asset(path) {
    return "src/assets/"+path
}

function dist(path) {
    return "src/dist/"+path
}

const _path = {
    scss: 'src/assets/scss/**/*.scss',
    js: {
        src: 'src/assets/js/**/*.js',
        dest: "src/dist/js/*.js"
    },
    css: {
        src: 'src/dist/css/*.css',
        dest: 'src/dist/css'
    },
    html: "src/*.html"
};

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "./src"
        }
    });

    gulp.watch(_path.scss, ['sass']);
    gulp.watch("src/*.html").on('change', browserSync.reload);
    gulp.watch(_path.js.dest).on('change', browserSync.reload);
});

gulp.task('sass', function(){
    return gulp.src(_path.scss)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(_path.css.dest))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);