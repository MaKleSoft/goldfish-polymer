var gulp = require("gulp"),
    less = require("gulp-less"),
    watch = require("gulp-watch"),
    argv = require("yargs").argv,
    connect = require("connect");

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

// Start a server listening on localhost port 8000
gulp.task("serve", function() {
    // The port can be specified via the --port flat
    // e.g. `gulp serve --port 8080
    var port = argv.port || 8000;
    connect.createServer(
        connect.static(__dirname)
    ).listen(port);
    console.log("Serving app on port " + port + ". If you want a different port use the --port flag.");
});