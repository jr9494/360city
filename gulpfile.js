// 引入gulp
var gulp = require('gulp');             // 基础库
// 引入gulp插件
var  webserver = require('gulp-webserver'), // 本地服务器
    livereload = require('gulp-livereload'),//自动刷新
    sass=require("gulp-sass"),         //sass编译插件
    uglify=require("gulp-uglify"),          //压缩js脚本
    rename=require("gulp-rename"),          //引入min写法压缩文件名称
    imagemin=require("gulp-imagemin"),       //压缩图片
    pngquant=require("imagemin-pngquant");  //对png图片进行深度压缩的插件

// 注册任务
gulp.task('webserver', function() {
    gulp.src( './dist' ) // 服务器目录（./代表根目录）
        .pipe(webserver({ // 运行gulp-webserver
            livereload: true, // 启用LiveReload
            open: true // 服务器启动时自动打开网页
        }));
});
//把开发环境中的HTML文件移动到发布环境
gulp.task("html",function(){
    return gulp.src("src/**/*.html")
        .pipe(gulp.dest("dist/"));
});

//注册sass的任务
//gulp.task("sass",function(){
//  return sass("src/sass/*.scss")
//      .pipe(gulp.dest("dist/css"))
//});

gulp.task("sass",function(){
    return gulp.src("src/sass/*.scss")
    	.pipe(sass())
        .pipe(gulp.dest("dist/css/"));
});

//注册js压缩的任务
gulp.task("script",function(){
    return gulp.src("src/js/**/*.")
        .pipe(uglify())
        .pipe(rename({suffix:".min"}))
        .pipe(gulp.dest("dist/js"))
});

gulp.task("lib",function () {
    return gulp.src("src/lib/**/*")
        .pipe(gulp.dest("dist/lib/"));
});

gulp.task("json",function () {
    return gulp.src("src/json/*")
        .pipe(gulp.dest("dist/json/"));
});

//注册压缩图片任务
gulp.task("imagemin",function(){
    return gulp.src("src/images/**/*.{png,jpg,gif,svg}")
        .pipe(imagemin({
            progressive:true,   //无损压缩jpg图片
            svgPlugins:[{removeViewBox:false}], //不移除svg图片的viewbox属性
            use:[pngquant()]                    //  使用pngquant插件进行深度压缩
        }))
        .pipe(gulp.dest("dist/images"));     //输出路径
});

// 监听任务
gulp.task('watch',function(){
    // 监听 html
    gulp.watch('src/**/*.html', ['html']);
    // 监听 scss
    gulp.watch('src/sass/*.scss', ['sass']);
    // 监听 images
    gulp.watch('src/images/**/*.{png,jpg,gif,svg}', ['imagemin']);
    // 监听 js
    gulp.watch('src/js/*.js', ['script']);
});

// 默认任务
gulp.task('default',["sass","script","imagemin","html","lib","json","webserver","watch"]);



