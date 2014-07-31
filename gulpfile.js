/* jshint globalstrict: true */
/* global require, console, process */
"use strict";

var gulp = require("gulp"),
    less = require("gulp-less"),
    watch = require("gulp-watch"),
    argv = require("yargs").argv,
    vulcan = require("vulcanize"),
    Q = require("q"),
    rmdir = require("rimraf"),
    ncp = require("ncp").ncp,
    path = require("path"),
    mkdirp = require("mkdirp"),
    st = require("st"),
    http = require("http"),
    jshint = require("gulp-jshint"),
    stylish = require("jshint-stylish");

function compileLess() {
    var deferred = Q.defer();

    gulp.src("./src/**/*.less")
        .pipe(less())
        .pipe(gulp.dest("./src"))
        .on("end", function() {
            deferred.resolve();
        });

    return deferred.promise;
}

// Compile all less files in place
gulp.task("less", function () {
    if (argv.watch) {
        watch({glob: "src/**/*.less"}, function(files) {
            return files.pipe(less())
                .pipe(gulp.dest("./src"));
        });
    } else {
        compileLess();
    }
});

// Start a server listening on localhost port 8000
gulp.task("serve", function() {
    // The port can be specified via the --port flat
    // e.g. `gulp serve --port 8080
    var port = argv.port || 8000;
    http.createServer(
        st(process.cwd())
    ).listen(port);
    console.log("Serving app on port " + port + ". If you want a different port use the --port flag.");
});

function build(dest) {
    var deferred = Q.defer();

    vulcan.setOptions({
        verbose: true,
        inline: true,
        csp: true,
        input: "index.html",
        output: path.join(dest, "index.html")
    }, function(err) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        vulcan.processDocument();
        deferred.resolve();
    });

    return deferred.promise;
}

// Deploy a minified/built version of the app to a given destination folder
gulp.task("deploy", function() {
    var dest = argv.dest || "deploy";
    console.log("Deploying app to " + path.resolve(process.cwd(), dest));
    Q(function() {
        console.log("Cleaning up existing target folder...");
        return Q.nfcall(rmdir, dest);
    })
    .then(function() {
        console.log("Creating target folder...");
        return Q.nfcall(mkdirp, dest);
    })
    .then(function() {
        console.log("Compiling less files...");
        return compileLess();
    })
    .then(function() {
        console.log("Building source...");
        return build(dest);
    })
    .then(function() {
        console.log("Copying assets...");
        return Q.nfcall(ncp, "assets", path.join(dest, "assets"));
    })
    .then(function() {
        console.log("Done!");
        process.exit(1);
    });
});

gulp.task("lint", function() {
    return gulp.src("src/**/*.js")
        .pipe(jshint(".jshintrc"))
        .pipe(jshint.reporter(stylish));
});