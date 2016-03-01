var gulp = require('gulp');
var inject = require('gulp-inject');
var series = require('stream-series');
var ts = require('gulp-typescript');
var browserify = require('gulp-browserify');
var server = require('gulp-server-livereload');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var ngAnnotate = require('gulp-ng-annotate');
var sourcemaps = require('gulp-sourcemaps');
var gulpWatch = require('gulp-watch');
var gulpJspm = require('gulp-jspm');

gulp.task('inject', function(){
    var target = gulp.src('./app_ts/index.html');
    var gulpSrcConfig = {
        read: false,
        cwd:'./app/'
    };

    var cssFilesStream = gulp.src(['./**/*.css'], gulpSrcConfig);

    return target.pipe(inject(series(cssFilesStream)))
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
    var tsResult = tsProject.src('./app_ts')
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject));
    return tsResult.js.pipe(sourcemaps.write()).pipe(gulp.dest('./app'));
});

gulp.task('copy', function(){
    return gulp
            .src(['./app_ts/**/*.html']).pipe(gulp.dest('./app'));
});

gulp.task('copy:dist', function(){
    return gulp
            .src(['./app/**/*.html', './app/**/*.css', './app/libs/*.js']).pipe(gulp.dest('./dist'));
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

gulp.task('gulp-watch', function(){
    gulp.src('./app_ts/**/*.html', {base: './app_ts'})
    .pipe(gulpWatch('./app_ts', {base: './app_ts'}))
    .pipe(gulp.dest('./app'));
});

gulp.task('annotate-angular', function(){
    return gulp.src(['./**/*.js','!./**/*.js.map', '!./libs/**/*.js'], {cwd:'./app/'})
           .pipe(ngAnnotate())
           .pipe(gulp.dest('dist'));
});

gulp.task('buildDistWrapper', function(){
    return gulp.src('./app/app.bootstrap.js')
       .pipe(gulpJspm({
           minify: true
       }))
       .pipe(gulp.dest('./dist'));
});

gulp.task('build', function(){
    runSequence(['typescript', 'libs', 'sass'],'copy','inject');
});

gulp.task('build:dist', function(){
    runSequence('buildDistWrapper', 'annotate-angular', 'copy:dist');
});

gulp.task('serve:dist', function(){
    return gulp.src('./dist')
    .pipe(server({
        livereload:true,
        directoryListing: false,
        defaultFile: 'index.html',
        fallback: 'index.html',
        port:9000,
        open:true
    }));
});

gulp.task('serve', ['gulp-watch'],function(){
    runSequence('build', 'run-server');
});

gulp.task('sass', function () {
  return gulp.src('./app_ts/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./app'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./app_ts/**/*.scss', ['sass']);
});
