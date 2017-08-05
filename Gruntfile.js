// Master Grunt File
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dev: {
        options: {
          style: 'expanded'
        },
        src: ['src/sass/style.scss'],
        dest: 'src/css/style.css'
      },
      prod: {
        options: {
          style: 'compressed'
        },
        src: ['src/sass/style.scss'],
        dest: 'dist/css/style.min.css'
      }
    },

    // Grunt Uglify
    // ------------
    // Minify seclected Javascript files into a single file for better delivery and reduced requests from the browser 
    uglify: {
      options: {
        mangle: false
      },
      js: {
        files: {
          'dist/js/main.min.js': ['src/js/*.js']
        }
      }
    },

    // Grunt Watch
    watch: {
      scss: {
        files: ['src/sass/*.scss'],
        tasks: [
          'sass:dev',
          'notify:scss'
        ]
      },
      js: {
        files: ['src/js/*.js'],
        tasks: [
          //  'uglify:js',
          'notify:js'
        ]
      }
    },

    // Grunt Notify
    // ------------
    // Allow Grunt to use the OS X notifications feature

    notify: {
      scss: {
        options: {
          title: 'Grunt, grunt!',
          message: 'SASS is all gravy'
        }
      },
      js: {
        options: {
          title: 'Grunt, grunt!',
          message: 'JS is all good'
        }
      },
      prod: {
        options: {
          title: 'Lights, Camera, ACTION!',
          message: 'Website has been deployed to production successfully'
        }
      }
    },
  });

  // Matchdep
  // --------
  // Load all installed NPM modules to remove the need to list them individually
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Development Task
  // ----------------
  // Default task is grunt is used with no further commands
  grunt.registerTask('default', ['sass:dev']);

  // Dev Deployment Task
  // -------------------
  // Run "grunt dev" to initiate this task
  // This will upload html_dev to the staging area

  grunt.registerTask('dev', function() {
    grunt.task.run([
      'sass:html_dev',
      //'uglify',
      'notify:stage'
    ]);
  });

  // Production Deployment Task
  // --------------------------
  // Run "grunt prod" to initiate this task

  grunt.registerTask('prod', function() {
    grunt.task.run([
      'sass:prod',
      'uglify',
      'notify:prod'
    ]);
  });

};
