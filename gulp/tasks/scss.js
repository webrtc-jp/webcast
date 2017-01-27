var gulp = require('gulp');
var sass = require('gulp-sass');
var config = require('../config').scss;

// Sassコンパイルタスク
gulp.task('sass', function(){
    gulp.src(config.src)
        .pipe(sass({
                outputStyle: config.outputStyle
            })
        )
        .pipe(gulp.dest(config.dest));
});