var gulp = require('gulp');
var inject = require('gulp-inject');
var series = require('stream-series');
var ts = require('gulp-typescript');
var browserify = require('gulp-browserify');
var server = require('gulp-server-livereload');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');

gulp.task('inject', function(){
    var target = gulp.src('./app_ts/index.html');
    var gulpSrcConfig = {
        read: false,
        cwd:'./app/'
    };

    var libStream = gulp.src(['./libs/**/*.js'], gulpSrcConfig);
    var allFilesStream = gulp.src(['./**/*.js','!./**/*.js.map', '!./**/*.module.js', '!./libs/**/*.js'], gulpSrcConfig);
    var onlyModulesStream = gulp.src(['./**/*.module.js'], gulpSrcConfig);
    var cssFilesStream = gulp.src(['./**/*.css'], gulpSrcConfig);

    return target.pipe(inject(series(libStream, allFilesStream, onlyModulesStream, cssFilesStream)))
        .pipe(gulp.dest('./app'));
});

gulp.task('libs', function(){
    return gulp.src('./scripts.js')
    .pipe(browserify({
        insertGlobals: true,
        debug: !gulp.env.production
    }))
    .pipe(gulp.dest('./app/libs'))
});

gulp.task('typescript',function(){
    var tsProject = ts.createProject('./tsconfig.json', {noExternalResolve: false, declarationFiles: true});
    var tsResult = tsProject.src('./app_ts').pipe(ts(tsProject));
    return tsResult.js.pipe(gulp.dest('./app'));
});

gulp.task('copy', function(){
    return gulp
            .src(['./app_ts/**/*.html']).pipe(gulp.dest('./app'));
});

gulp.task('run-server', function(){
    return gulp.src('./app')
    .pipe(server({
        livereload:true,
        directoryListing: false,
        defaultFile: 'index.html',
        fallback: 'index.html',
        port:9000,
        open:true
    }));
})

gulp.task('serve', function(){
    runSequence(['typescript', 'libs', 'sass'],'copy','inject', 'run-server');
});

gulp.task('sass', function () {
  return gulp.src('./app_ts/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./app'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./app_ts/**/*.scss', ['sass']);
});
