const gulpMinify = require('gulp-minify');
const nodeDel = require('del');
const vinylPaths = require('vinyl-paths');
const gulp = require('gulp');
const nodeFs = require('fs');
const gulpSourcemaps = require('gulp-sourcemaps');


const gulpMinifyOptions = {
  ext:{
    min:'.min.js'
  },
  exclude: ['tasks'],
  ignoreFiles: ['-min.js']
};

const gulpSrcOptions = {
  ignore: [
    '.gitkeep'
  ]
};

const assetPublicPath = './Assets/Public';
const assetPublicJsPath = assetPublicPath+'/JavaScript';
const assetSrcJsPath = './Assets/Source/JavaScript/**.js';

function clean(cb) {
  // Remove compiled JS folder assetPublicJsPath
  gulp.src([assetPublicPath+'/*'], gulpSrcOptions)
    .pipe(vinylPaths(nodeDel));
  cb();
}

function minifyJsAssets(cb) {
  if (!nodeFs.existsSync(assetPublicPath)) {
    console.log("Creating: "+assetPublicPath);
    nodeFs.mkdirSync(assetPublicPath);
  }

  if (!nodeFs.existsSync(assetPublicJsPath)) {
    console.log("Creating: "+assetPublicJsPath);
    nodeFs.mkdirSync(assetPublicJsPath);
  }

  gulp.src(['./Assets/Source/JavaScript/**/*.js'], gulpSrcOptions)
    .pipe(gulpMinify(gulpMinifyOptions))
    .pipe(gulp.dest(assetPublicJsPath))
  ;

  cb();
}

exports.clean = clean;
exports.default = gulp.series(clean, minifyJsAssets);