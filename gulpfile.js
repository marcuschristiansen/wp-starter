var gulp = require('gulp'),     
    sass = require('gulp-ruby-sass') 
    notify = require("gulp-notify") 
    bower = require('gulp-bower');

var config = {
 	sassPath: './assets',
 	bowerDir: './assets/bower_components' 
};

/* Tasks */
gulp.task('bower', function() { 
    return bower()
         .pipe(gulp.dest(config.bowerDir)) 
});

gulp.task('icons', function() { 
    return gulp.src(config.bowerDir + '/font-awesome/fonts/**.*') 
        .pipe(gulp.dest('./fonts')); 
});

gulp.task('css', function() { 
    return sass(config.sassPath + '/style.scss', {
             //style: 'compressed',
             loadPath: [
                 './assets',
				config.bowerDir + '/bourbon/app/assets/stylesheets',
				config.bowerDir + '/neat/app/assets/stylesheets',
				config.bowerDir + '/normalize-scss/sass',
                 //config.bowerDir + '/bootstrap-sass/assets/stylesheets',
                config.bowerDir + '/bootstrap/scss',
                 config.bowerDir + '/font-awesome/scss',
             ]
         }) 
            .on("error", notify.onError(function (error) {
                 return "Error: " + error.message;
             }))
         .pipe(gulp.dest('./')); 
});

// Rerun the task when a file changes
 gulp.task('watch', function() {
     gulp.watch(config.sassPath + '/**/*.scss', ['css']); 
});

  gulp.task('default', ['bower', 'icons', 'css']);