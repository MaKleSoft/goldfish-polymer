var gulp = require("gulp"),
    less = require("gulp-less"),
    watch = require("gulp-watch"),
    argv = require("yargs").argv,
    connect = require("connect"),
    vulcan = require("vulcanize"),
    Q = require("q"),
    rmdir = require("rimraf"),
    ncp = require("ncp").ncp,
    path = require("path"),
    mkdirp = require("mkdirp");

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