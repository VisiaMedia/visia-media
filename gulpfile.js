const gulp = require('gulp');
const { src, dest, watch, series, parallel } = require('gulp');
const concat = require('gulp-concat');
const dartSass = require('gulp-dart-sass'); // Gebruik gulp-dart-sass
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const paths = {
    stylesReset: {
        src: ['./assets/css/reset/*.scss'],
        dest: './dist/',
    },
    styles: {
        src: ['./assets/css/*.scss'],
        dest: './dist/',
    }
};

function compileResetStyles() {
    return src(paths.stylesReset.src)
        .pipe(dartSass().on('error', dartSass.logError)) // Gebruik dartSass in plaats van sass
        .pipe(postcss([autoprefixer({ flexbox: true }), cssnano()]))
        .pipe(concat('reset.min.css'))
        .pipe(dest(paths.stylesReset.dest));
}

function compileStyles() {
    return src(paths.styles.src)
        .pipe(dartSass().on('error', dartSass.logError)) // Gebruik dartSass in plaats van sass
        .pipe(postcss([autoprefixer({ flexbox: true }), cssnano()]))
        .pipe(concat('bundle.min.css'))
        .pipe(dest(paths.styles.dest));
}

function watcher() {
    watch(paths.stylesReset.src, parallel(compileResetStyles));
    watch(paths.styles.src, parallel(compileStyles));
}

exports.compileStyles = compileStyles;
exports.watcher = watcher;

exports.default = series(
    parallel(compileStyles),
    watcher
);