var gulp = require("gulp"),
    less = require("gulp-less"),
    watch = require("gulp-watch"),
    argv = require("yargs").argv;

// Compile all less files in place
gulp.task("less", function () {
    if (argv.watch) {
        watch({glob: "src/**/*.less"}, function(files) {
            return files.pipe(less())
                .pipe(gulp.dest("./src"));
        });
    } else {
        gulp.src("./src/**/*.less")
            .pipe(less())
            .pipe(gulp.dest("./src"));
    }
});