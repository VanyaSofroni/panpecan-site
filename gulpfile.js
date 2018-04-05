'use strict';

var gulp          = require('gulp'),

		browserSync		= require('browser-sync'),

		sass          = require('gulp-sass'),
		rename				= require('gulp-rename'), 
		postcss				= require('gulp-postcss'), 
		autoprefixer	= require('autoprefixer'),
		mqpacker			= require('css-mqpacker'),
		cssnano				= require('gulp-cssnano'), 
		plumber			 = require('gulp-plumber'),

		concat				= require('gulp-concat'),
		uglify				= require('gulp-uglifyjs'),

		imagemin			= require('gulp-imagemin'),
		pngquant			= require('imagemin-pngquant'),

		del						= require('del'),
		run						= require('run-sequence'),
		cache					= require('gulp-cache');

gulp.task('browser-sync', function() { 
	browserSync({ 
		server: { 
			baseDir: 'src' 
		},
		notify: false 
	});
});

gulp.task('style', function(){ 
	var mainMinCss = gulp.src('src/sass/main.scss') 
		.pipe(plumber())
		.pipe(sass()) 
		.pipe(postcss([
			autoprefixer({browsers: [
				'last 15 versions',
				'> 1%',
				'ie 8'
			]}),
			mqpacker({
				sort: true
			})
		]))
		.pipe(cssnano()) 
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('src/css')) 
		.pipe(browserSync.reload({stream: true})); 

	var fancyboxMinCss = gulp.src('src/css/fancybox.css')
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('src/css'));

	var fancyboxButtonsMinCss = gulp.src('src/css/fancybox-buttons.css')
		.pipe(cssnano()) 
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('src/css'));
});

gulp.task('js', function() {
	var commonMinJs = gulp.src('src/js/common.js')
	.pipe(uglify())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('src/js'));

	var fancyboxMinJs = gulp.src('src/js/fancybox.js')
	.pipe(uglify())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('src/js'));

	var fancyboxButtonsMinJs = gulp.src('src/js/fancybox-buttons.js')
	.pipe(uglify())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('src/js'));
});

gulp.task('img', function() {
	return gulp.src('src/img/**/*') 
		.pipe(cache(imagemin([  
			imagemin.gifsicle({interlaced: true}),
			imagemin.jpegtran({progressive: true}),
			/* imageminJpegRecompress({
				loops: 5,
				min: 65,
				max: 70,
				quality:'medium'
			}), */
			imagemin.svgo(),
			imagemin.optipng({optimizationLevel: 3}),
			pngquant({quality: '65-70', speed: 5})
		],{
			verbose: true		
		})))
		.pipe(gulp.dest('build/img')); 
});

gulp.task('clean', function() {
	return del.sync('build'); 
});

gulp.task('copy', function() {

	var buildHtml = gulp.src('src/*.html') 
	.pipe(gulp.dest('build'));

	var buildFonts = gulp.src('src/fonts/**/*') 
	.pipe(gulp.dest('build/fonts'));

	var buildCss = gulp.src('src/css/*.min.css')
	.pipe(gulp.dest('build/css'));

	var buildJs = gulp.src('src/js/*.min.js') 
	.pipe(gulp.dest('build/js'));

	var buildPhp = gulp.src('src/*.php') 
	.pipe(gulp.dest('build'));

	var buildFavicon = gulp.src([ 
		'src/android-icon-192x192.png',
		'src/apple-icon-180x180.png',
		'src/favicon-96x96.png'
		])
	.pipe(gulp.dest('build'));

});

gulp.task('watch', ['style', 'js', 'browser-sync'], function() {
	gulp.watch('src/sass/**/*.scss', ['style']); 
	gulp.watch('src/**/*.html', browserSync.reload);
	gulp.watch(['src/js/**/*.js'], browserSync.reload);
	//gulp.watch(['src/libs/**/*.js', 'src/js/common.js'], ['js']);
});

gulp.task('build', function(fn) {
	run(
		'clean',
		'style',
		'js',
		'img',
		'copy',
		fn
	);
});

gulp.task('clear', function (callback) {
	return cache.clearAll();
})