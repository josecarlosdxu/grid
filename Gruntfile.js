module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        sass: {
            options: {

            },
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'css/front.css': 'scss/front.scss',
                      'css/back.css': 'scss/back.scss',
                     // 'css/print.css': 'scss/print.scss',
                      'css/mobile.css': 'scss/mobile.scss',
                     'css/mobileback.css': 'scss/mobileback.scss'//,
                    // 'css/doc.css': 'scss/doc.scss'
                }
            }
        },

        assemble: {
            options: {
                flatten: true,
                layout: 'default.hbs',
                layoutdir: 'views',
                helpers: ['helper-aggregate', 'helpers/helper-atoms.js'],
                data: 'data/**/*.json'
            },
            // doc: {
            //     options: {
            //         layout: 'doc/layouts/doc.hbs',
            //         partials: ['views/doc/partials/*.hbs']
            //     },
            //     src:   ['views/doc/pages/*.md'],
            //     dest:  'static/doc/'
            // },
            front: {
                options: {
                    layout: 'front/layouts/default.hbs',
                    data: 'data/**/*.json',
                    partials: ['views/front/partials/**/*.hbs']
                },
                //src:   ['views/front/pages/*.hbs'],
                //src: ['views/front/pages/packsMayoristas.hbs', 'views/front/pages/tiendaDropshipping360.hbs'], 
                //src: [ 'views/front/pages/categorias_lista.hbs'],
                src: ['views/front/pages/producto_especial_sincros.hbs'],
                dest: 'static/front/'
            },
           back: {
                options: {
                    layout: 'back/layouts/default.hbs',
                    data: 'data/**/*.json',
                    partials: ['views/back/partials/**/*.hbs']
                },
                //src: ['views/back/pages/*.hbs'],
                src:   ['views/back/pages/account.hbs'],
                dest: 'static/back/'
             },
            // print: {
            //     options: {
            //         layout: 'print/layouts/default.hbs',
            //         data: 'data/**/*.json',
            //         partials: ['views/print/partials/**/*.hbs']
            //     },
            //     src:   ['views/print/pages/*.hbs'],
            //     dest:  'static/print/'
            // },
            // mail: {
            //     options: {
            //         layout: 'mail/layouts/default.hbs',
            //         data: 'data/**/*.json',
            //         partials: ['views/mail/partials/**/*.hbs']
            //     },
            //     src:   ['views/mail/pages/*.hbs'],
            //     dest:  'static/mail/'
            // },
            mobile: {
                options: {
                    layout: 'mobile/layouts/default.hbs',
                    data: 'data/**/*.json',
                    partials: ['views/mobile/partials/**/*.hbs']

                },
                src: ['views/mobile/pages/*.hbs'],            
                //src:   ['views/mobile/pages/producto_cliente_especial.hbs'],
                dest: 'static/mobile/'
            },
            mobileback: {
                options: {
                    layout: 'mobileback/layouts/default.hbs',
                    data: 'data/**/*.json',
                    partials: ['views/mobileback/partials/**/*.hbs']
                },
                //src: ['views/mobileback/pages/*.hbs'],
                src:   ['views/mobileback/pages/wallet.hbs'],
                dest: 'static/mobileback/'
            },
            popups: {
                options: {
                    layout: 'popups/layouts/default.hbs',
                    data: 'data/**/*.json',
                    partials: ['views/popups/partials/**/*.hbs']
                },
                src: ['views/popups/pages/*.hbs'],
                //src:   ['views/popups/pages/popup.hbs'],
                dest: 'static/popups/'
            }
        },

        connect: {
            server: {
                options: {
                    port: 8080,
                    base: './',
                    hostname: '*',
                }
            }
        },

        svgstore: {
            options: {
                prefix: 'icon-'
            },
            default: {
                files: {
                    'img/icons/svg-defs.svg': ['img/icons/*.svg']
                }
            }
        },

        svgmin: {
            options: {
                plugins: [{
                    removeViewBox: false
                }, {
                    removeUselessStrokeAndFill: false
                }, {
                    convertPathData: {
                        straightCurves: false
                    }
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'img/icons',
                    src: ['**/*.svg'],
                    dest: 'img/icons',
                    ext: '.svg'
                }]
            }
        },
        watch: {
            sass: {
                files: 'scss/**/*.scss',
                tasks: ['sass'],
                options: {
                    livereload: 1337,
                }
            },
            assemble: {
                files: ['views/**/*', 'data/**/*', 'scss/**/*.scss'],
                tasks: ['assemble'],
                options: {
                    livereload: 1337,
                }
            }
        },

        clean: {
            all: ['doc/**/*.html', 'static/**/*.html'],
            svg: ['img/icons/svg-defs.svg']
        },

        cssshrink: {
            css: {
                files: {
                    'tmp': ['css/*.css']
                }
            }
        }








    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    //grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('assemble');
    grunt.loadNpmTasks('grunt-svgstore');
    grunt.loadNpmTasks('grunt-svgmin');
    grunt.loadNpmTasks('grunt-cssshrink');

    grunt.registerTask('cleanup', ['sass']);

    grunt.registerTask('css', ['sass', 'connect', 'watch']);
    // grunt.registerTask('svg', ['clean:svg','svgmin','svgstore','default']);
    grunt.registerTask('cssshrink', ['clean:all', 'sass', 'cssshrink', 'assemble', 'connect', 'watch']);
    grunt.registerTask('default', ['clean:all', 'sass', 'assemble', 'connect', 'watch']);
    grunt.registerTask('svg', ['clean:svg', 'svgmin', 'svgstore']);
}