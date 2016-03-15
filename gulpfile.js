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
var del = require('del');


var paths = {
    appDirectory: './app',
    tsDirectory: './app',
    distDirectory: './dist',
    tsConfig: 'tsconfig.json',
    getInjectPath: function() {
        return this.tsDirectory+'/index.html';
     },
     getTypeScriptMainConfiguration: function(){
         return './'+this.tsConfig;
     }
};

gulp.task('inject', function(){
    var target = gulp.src(paths.getInjectPath());
    var gulpSrcConfig = {
        read: false,
        cwd:paths.appDirectory+'/'
    };

    var cssFilesStream = gulp.src(['./**/*.css'], gulpSrcConfig);

    return target.pipe(inject(series(cssFilesStream)))
        .pipe(gulp.dest(paths.appDirectory));
});

gulp.task('typescript',function(){
    console.log(paths.injectDirectory);
    var tsProject = ts.createProject(paths.getTypeScriptMainConfiguration(), {noExternalResolve: false, declarationFiles: true});
    var tsResult = tsProject.src(paths.tsDirectory)
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject));
    return tsResult.js.pipe(sourcemaps.write()).pipe(gulp.dest(paths.appDirectory));
});

gulp.task('html-watch', function(){
    gulp.src('./app/**/*.html', {base: paths.appDirectory})
    .pipe(gulpWatch(paths.appDirectory, {base: paths.appDirectory}))
    .pipe(gulp.dest(paths.appDirectory));
});

gulp.task('annotate-angular', function(){
    return gulp.src(['./**/*.js','!./**/*.js.map', '!./libs/**/*.js'], {cwd:paths.appDirectory})
    .pipe(ngAnnotate())
    .pipe(gulp.dest(paths.distDirectory));
});

gulp.task('buildDistWrapper', function(){
    return gulp.src('./app/app.bootstrap.js')
    .pipe(gulpJspm({
        minify: true
    }))
    .pipe(gulp.dest(path.distDirectory));
});


gulp.task('sass', function () {
    return gulp.src('./app/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.appDirectory));
});

//watch

gulp.task('sass:watch', function () {
    gulp.watch('./app/**/*.scss', ['sass']);
});

//Developement tasks

gulp.task('serve', function(){
    runSequence('build:dev', 'run-server:dev');
});

gulp.task('run-server:dev', function(){
    return gulp.src(paths.appDirectory)
    .pipe(server({
        livereload: {
            enable: true,
            filter: function(filePath, cb){
                console.log(filePath);
                cb(!(/node_modules/.test(filePath)));
                cb(!(/libs/.test(filePath)));
            }
        },
        directoryListing: false,
        defaultFile: 'index.html',
        fallback: 'index.html',
        port:9000,
        open:true
    }));
});

gulp.task('build:dev', function(){
    runSequence(['typescript', 'sass'],'inject');
});

//DISTRIBUTE BUILD

gulp.task('copy:dist', function(){
    return gulp
            .src(['./app/**/*.html', './app/**/*.css', './app/libs/*.js']).pipe(gulp.dest(path.distDirectory));
});

gulp.task('run-server:dist', function(){
    return gulp.src(paths.distDirectory)
    .pipe(server({
        livereload:true,
        directoryListing: false,
        defaultFile: 'index.html',
        fallback: 'index.html',
        port:9000,
        open:true
    }));
});

gulp.task('build:dist', function(){
    runSequence('buildDistWrapper', 'annotate-angular', 'copy:dist');
});

gulp.task('serve:dist', ['run-server:dist'],function(){
});
