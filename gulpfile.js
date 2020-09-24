// Carrega os módulos
const gulp 			= require('gulp')
const sass 			= require('gulp-sass')
const autoprefixer 	= require('gulp-autoprefixer')
const browserSync 	= require('browser-sync').create()
const concat 		= require('gulp-concat')
const babel			= require('gulp-babel')
const uglify		= require('gulp-uglify')

// Compila SASS e Autoprefixer
// ====================================
function sassCompila(){
	return  gulp
		.src(['node_modules/bootstrap/scss/*scss', 'src/scss/*.scss'])
		.pipe(sass())
		.pipe(autoprefixer({
			overrideBrowserslist: ['last 2 versions']
		}))
		.pipe(gulp.dest('src/css'))
		.pipe(browserSync.stream())
}

// Plugins
function plugins(){
	return gulp
	.src([
		'node_modules/jquery/dist/jquery.min.js',
		// 'nome_modules/moment/min/moment.min.js'
	])
	.pipe(concat('plugins.js'))
	.pipe(gulp.dest('src/js/'))
	.pipe(browserSync.stream())
}

// Concatena arquivos JS
function concatJS(){
	return gulp
		.src('src/js/lib/*.js')
		.pipe(concat('main.js'))
		.pipe(babel({
			presets: ['env']
		}))
		.pipe(uglify())
		.pipe(gulp.dest('src/js/'))
		.pipe(browserSync.stream())
}

// BrowserSync
// ====================================
function serve(){
	
	browserSync.init({
		open: false,
		proxy: "https://wp-template.radel.com.br/src/",
		watchTask: true
	})

	gulp.watch('src/scss/*.scss', gulp.series(sassCompila) )
	gulp.watch('src/js/lib/*.js', gulp.series(concatJS))
	gulp.watch('src/*').on('change', browserSync.reload)
	
}

// Tarefas
exports.sassCompila = sassCompila
// exports plugins = plugins
exports.concatJS = concatJS
exports.serve 	 = serve
exports.default  = gulp.series([sassCompila, concatJS, serve])