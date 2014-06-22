var gulp = require('gulp');
var connect = require('gulp-connect');
var ejs = require("gulp-ejs");
var fs = require('fs');
var exec = require('child_process').exec;
var s3 = require("gulp-s3");

/**
 * {
 *   "key": "KEY",
 *   "secret": "SERET",
 *   "bucket": "BUCKET",
 *   "region": "REGION"
 * }
 */
var aws = JSON.parse(fs.readFileSync('./aws.json'));

/**
 * Start webserver
 */
gulp.task('webserver', function() {
	connect.server({
		root : 'dist'
	});
});

/**
 * Reload webserver
 */
gulp.task('webserver-reload', function() {
	connect.reload();
});
/**
 * Watch for changes
 */
gulp.task('watch', function() {
	gulp.watch(['data/*'], ['compile', 'webserver-reload']);
	gulp.watch(['index.ejs'], ['compile', 'webserver-reload']);
	gulp.watch(['products/*'], ['convert', 'webserver-reload']);

});

/**
 * COmpile ejs template from .json data
 */
gulp.task('compile', function() {
	var data = JSON.parse(fs.readFileSync('./data/mrmizo.json', 'utf-8'));
	gulp.src("./index.ejs").pipe(ejs(data)).pipe(gulp.dest("./dist/"));
});

/**
 * Convert images from products/* to dist/products/* (150x150)
 */
gulp.task('convert', function() {
	//shell.task(['touch hello', 'convert.sh']);
	exec('./convert.sh', function(err, stdout, stderr) {
		//console.log(stdout);
		if (err) {
			console.log(stderr);
		}
	});
});
/**
 * Convert images from products/* to dist/products/* (150x150)
 * requires imagemagick
 */
gulp.task('publish', function() {
	gulp.src('./dist/**').pipe(s3(aws));
});

gulp.task('default', ['convert', 'compile', 'webserver', 'watch']);
