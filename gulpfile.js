var gulp = require('gulp'),
    ngrok = require('ngrok'),
    psi = require('psi'),
    del = require('del'),
    open = require('gulp-open'),
    browserSync = require('browser-sync').create(),
    minifyCss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    imageop = require('gulp-image-optimization'),
    sequence = require('run-sequence'),
    minifyHtml = require('gulp-html-minify');

var site = '',
    portVal = 8080;

gulp.task('index', function() {
    return browserSync.init({
        port: portVal,
        open: false,
        server: {
            baseDir: 'dist',
        }
    });
});

gulp.task('ngrok-url', function(cb) {
    return ngrok.connect(portVal, function(err, url) {
        site = url;
        console.log('serving your tunnel from: ' + site);
        cb();
    });
});


gulp.task('psi-desktop', function(cb) {
    return psi.output(site, {
        nokey: 'true',
        strategy: 'desktop'
    });
});

gulp.task('psi-mobile', function(cb) {
    return psi.output(site, {
        nokey: 'true',
        strategy: 'mobile'
    });
});


gulp.task('psi-seq', function(cb) {
    return sequence(
        'index',
        'ngrok-url',
        'psi-mobile',
        'psi-desktop',
        cb
    );
});

// Print PSI independently
gulp.task('psi', ['psi-seq'], function() {
    return process.exit();
});

// All minification tasks

gulp.task('styles', function() {
    return gulp.src('src/**/css/*.css')
        .pipe(minifyCss())
        .pipe(gulp.dest('dist'));
});

gulp.task('contents', function() {
    return gulp.src('src/**/*.html')
        .pipe(minifyHtml())
        .pipe(gulp.dest('dist'));
});

gulp.task('img', function() {
    return gulp.src('src/**/img/**/*')
        .pipe(imageop())
        .pipe(gulp.dest('dist'));
});
gulp.task('scripts', function() {
    return gulp.src('src/**/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

// Delete the distribution folder and then build

gulp.task('clean', function() {
    return del('dist');
});

gulp.task('build', function(cb) {
    return sequence('clean', ['contents', 'styles', 'scripts', 'img'], cb);
});

// Show psi in the terminal, open both index.html and pizza.html in the browser

gulp.task('open-index', function() {
    return gulp.src('')
        .pipe(open({
            uri: 'http://localhost:' + portVal
        }));
});

gulp.task('open-external-url', function() {
    return gulp.src('')
        .pipe(open({
            uri: site
        }));
});

// TODO: those tasks are running synchronously.
gulp.task('serve', ['build'], function(cb) {
    return sequence(
        'index',
        'ngrok-url',
        ['open-index', 'open-external-url'],
        cb
    );
});
