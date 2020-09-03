const gulp = require("gulp");
const rename = require("gulp-rename");
const connect = require("gulp-connect");
const sourcemaps = require("gulp-sourcemaps");
const sass = require("gulp-sass");
sass.compiler = require("node-sass");

function scss(){
    return gulp
        .src("./src/scss/style.scss")
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./tmp/assets/css"))
        .pipe(connect.reload());
}
function scssDark(){
    return gulp
        .src("./src/scss/dark-style.scss")
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./tmp/assets/css"))
        .pipe(connect.reload());
}
function buildSCSS(){
    return gulp
        .src("./src/scss/style.scss")
        .pipe(sass())
        .pipe(gulp.dest("./dist/assets/css"));
}
function buildSCSSDark(){
    return gulp
        .src("./src/scss/dark-style.scss")
        .pipe(sass())
        .pipe(gulp.dest("./dist/assets/css"));
}

function watchSCSS(){
    return gulp
        .watch("./src/scss/**/*.scss", {
            ignoreInitial: false
        }, scss);
}
function watchSCSSDark(){
    return gulp
        .watch("./src/scss/**/*.scss", {
            ignoreInitial: false
        }, scssDark);
}

module.exports = {
    watchSCSS,
    buildSCSS,
    buildSCSSDark,
    watchSCSSDark
}