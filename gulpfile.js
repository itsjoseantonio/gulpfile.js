// Dependencies
const gulp = require('gulp');

const sass = require('gulp-sass');
const minifyCSS = require('gulp-minify-css');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify')

// Css Tasks
gulp.task('styles', function(){
    gulp.src('./sass/main.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer('last 5 version','safari 5','ie 8','ie 9','ios 6','android 4'))
        .pipe(gulp.dest('./css/'))
        .pipe(minifyCSS())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./css/'))
});

// Js Tasks
gulp.task("scripts", function () {
    gulp.src("./js/script.js")
        .pipe(uglify().on('error', function(e){
            console.log(e);
            return this.end();
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest("./js/"));
});

// Images Task
gulp.task('imagemin', function(){
    gulp.src('./images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./img/'))
    .pipe(notify({message: 'Images task complete'}))
});

// Watch tasks
gulp.task('watch', function(){
    gulp.watch(['./sass/base/*.sass'], ['styles']);
    gulp.watch(['./js/script.js'], ['scripts']);
});

// Default Task
gulp.task('default', ['watch']);