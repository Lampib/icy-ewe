'use strict';

const gulp       = require('gulp');
const sass       = require('gulp-sass');
const crass      = require('gulp-crass');
const sourcemaps = require('gulp-sourcemaps');
const rollup     = require('gulp-better-rollup');
const babel      = require('rollup-plugin-babel');

gulp.task('sass', () =>
  gulp.src('./sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(crass({
      pretty:    false,
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/css'))
);

gulp.task('rollup', () =>
  gulp.src(['./scripts/**/*.js', '!./scripts/**/_*.js'])
    .pipe(sourcemaps.init())
    .pipe(rollup(
      {plugins: [babel()]},
      { format: 'cjs'}
    ))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/scripts'))
);

gulp.task('copy', () =>
  gulp.src('./bin/**/*.*')
    .pipe(gulp.dest('./dist'))
);

gulp.task('watch', ['compile'], () =>
  gulp.watch('./sass/**/*.scss', ['sass']),
  gulp.watch('./scripts/**/*.js', ['rollup']),
  gulp.watch('./bin/**/*.*', ['copy'])
);

gulp.task('compile', ['sass', 'rollup', 'copy']);

gulp.task('default', ['watch']);
