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
        dest: 'src/css/style.min.css'
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
      dev: {
        files: {
          'src/js/main.min.js': ['src/js/*.js']
        }
      },
      prod: {
        files: {
          'dist/js/main.min.js': ['src/js/plugins/slippry/slippry.min.js','src/js/main.js']
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
          'uglify:dev',
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
  grunt.registerTask('default', [
    'sass:dev'
  ]);


  // Production Deployment Task
  // --------------------------
  // Run "grunt prod" to initiate this task
  grunt.registerTask('prod', function() {
    grunt.task.run([
      'sass:prod',
      'uglify:prod',
      'notify:prod'
    ]);
  });

};
