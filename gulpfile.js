const gulp = require('gulp');
const browserSync = require('browser-sync').create();  //browser listen
const minify = require('gulp-minify');                 //minify js
const concat = require('gulp-concat');                 //for combine files
const reload = browserSync.reload;
var sass = require('gulp-sass')(require('node-sass'));

function browserSync_f(done) {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        port: 3000
    });
    done();
}

function html(done) {
    browserSync.reload();
    done();
}

function scss() {
    return gulp.src(['src/scss/**/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest('dist/scss'))
        .pipe(browserSync.stream());
}

function scripts() {
    return gulp.src(['src/js/**/*.js'])
        .pipe(concat('all.js'))
        .pipe(minify({
            ext: {
                min: '.min.js'
            },
            noSource: true
        }))
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream())
}

function watchFiles() {
    gulp.watch('./*.html').on('change', reload)
    gulp.watch('src/scss/**/*.scss', scss);
    gulp.watch('src/js/**/*.js', scripts);
}

// define complex tasks
const build = gulp.series(html, scss, scripts);
const watch = gulp.parallel(watchFiles, browserSync_f);

// export tasks
exports.html = html;
exports.scss = scss;
exports.scripts = scripts;
exports.build = build;
exports.watch = watch;
exports.default = watch;