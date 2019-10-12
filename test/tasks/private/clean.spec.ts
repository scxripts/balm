import CleanTask from '../../../src/tasks/private/clean';

describe('clean task', function() {
  let cleanTask: any;

  beforeEach(function() {
    cleanTask = new CleanTask();
    cleanTask.fn(function() {});
  });

  describe('in frontend', function() {
    describe('development', function() {
      before(function() {
        balm.config = {
          env: {
            isDev: true
          }
        };
      });

      const dirInFrontend = [`${balm.config.workspace}/.tmp`];

      it(
        `expected output: ${dirInFrontend}`,
        asyncCase(function() {
          expect(JSON.stringify(cleanTask.dirInFrontend)).to.equal(
            JSON.stringify(dirInFrontend)
          );
        })
      );
    });

    describe('production', function() {
      describe('without remote', function() {
        before(function() {
          balm.config = {
            env: {
              isProd: true
            },
            assets: {
              root: 'assets'
            }
          };
        });

        const dirInFrontend = [
          `${balm.config.workspace}/dist`,
          balm.config.assets.root
        ];

        it(
          `expected output: ${dirInFrontend}`,
          asyncCase(function() {
            expect(JSON.stringify(cleanTask.dirInFrontend)).to.equal(
              JSON.stringify(dirInFrontend)
            );
          })
        );
      });

      describe('with empty remote', function() {
        before(function() {
          balm.config = {
            env: {
              isProd: true
            },
            assets: {
              root: ''
            }
          };
        });

        const dirInFrontend = [`${balm.config.workspace}/dist`];

        it(
          `expected output: ${dirInFrontend}`,
          asyncCase(function() {
            expect(JSON.stringify(cleanTask.dirInFrontend)).to.equal(
              JSON.stringify(dirInFrontend)
            );
          })
        );
      });

      describe('with remote', function() {
        before(function() {
          balm.config = {
            env: {
              isProd: true
            },
            assets: {
              root: '/assets'
            }
          };
        });

        const dirInFrontend = [
          `${balm.config.workspace}/dist`,
          '/assets/public/css',
          '/assets/public/js',
          '/assets/public/img',
          '/assets/public/font',
          '/assets/public/media'
        ];

        it(
          `expected output: ${dirInFrontend}`,
          asyncCase(function() {
            expect(JSON.stringify(cleanTask.dirInFrontend)).to.equal(
              JSON.stringify(dirInFrontend)
            );
          })
        );
      });

      describe('with subDir', function() {
        before(function() {
          balm.config = {
            env: {
              isProd: true
            },
            assets: {
              root: '/assets',
              subDir: 'web'
            }
          };
        });

        const dirInFrontend = [
          `${balm.config.workspace}/dist`,
          '/assets/public/web'
        ];

        it(
          `expected output: ${dirInFrontend}`,
          asyncCase(function() {
            expect(JSON.stringify(cleanTask.dirInFrontend)).to.equal(
              JSON.stringify(dirInFrontend)
            );
          })
        );
      });
    });
  });

  describe('in backend', function() {
    describe('development', function() {
      describe('without subDir', function() {
        before(function() {
          balm.config = {
            inFrontend: false,
            env: {
              isDev: true
            },
            assets: {
              subDir: ''
            }
          };
        });
        const dirInBackend = [
          'public/css',
          'public/js',
          'public/img',
          'public/font',
          'public/media'
        ];
        it(
          `expected output: ${dirInBackend}`,
          asyncCase(function() {
            expect(JSON.stringify(cleanTask.dirInBackend)).to.equal(
              JSON.stringify(dirInBackend)
            );
          })
        );
      });
      describe('with subDir', function() {
        before(function() {
          balm.config = {
            inFrontend: false,
            env: {
              isDev: true
            },
            assets: {
              subDir: 'web'
            }
          };
        });
        const dirInBackend = [
          'public/web/css',
          'public/web/js',
          'public/web/img',
          'public/web/font',
          'public/web/media'
        ];
        it(
          `expected output: ${dirInBackend}`,
          asyncCase(function() {
            expect(JSON.stringify(cleanTask.dirInBackend)).to.equal(
              JSON.stringify(dirInBackend)
            );
          })
        );
      });
    });

    describe('production', function() {
      describe('non-cache', function() {
        describe('without subDir', function() {
          before(function() {
            balm.config = {
              inFrontend: false,
              env: {
                isProd: true
              },
              assets: {
                subDir: ''
              }
            };
          });

          const dirInBackend = [
            'public/css',
            'public/js',
            'public/img',
            'public/font',
            'public/media'
          ];

          it(
            `expected output: ${dirInBackend}`,
            asyncCase(function() {
              expect(JSON.stringify(cleanTask.dirInBackend)).to.equal(
                JSON.stringify(dirInBackend)
              );
            })
          );
        });

        describe('with subDir', function() {
          before(function() {
            balm.config = {
              inFrontend: false,
              env: {
                isProd: true
              },
              assets: {
                subDir: 'web'
              }
            };
          });

          const dirInBackend = ['public/web'];

          it(
            `expected output: ${dirInBackend}`,
            asyncCase(function() {
              expect(JSON.stringify(cleanTask.dirInBackend)).to.equal(
                JSON.stringify(dirInBackend)
              );
            })
          );
        });
      });

      describe('cache', function() {
        describe('without subDir', function() {
          before(function() {
            balm.config = {
              inFrontend: false,
              env: {
                isProd: true
              },
              assets: {
                subDir: '',
                cache: true
              }
            };
          });

          const dirInBackend = ['public/build'];

          it(
            `expected output: ${dirInBackend}`,
            asyncCase(function() {
              expect(JSON.stringify(cleanTask.dirInBackend)).to.equal(
                JSON.stringify(dirInBackend)
              );
            })
          );
        });

        describe('with subDir', function() {
          before(function() {
            balm.config = {
              inFrontend: false,
              env: {
                isProd: true
              },
              assets: {
                subDir: 'web',
                cache: true
              }
            };
          });

          const dirInBackend = ['public/web/build'];

          it(
            `expected output: ${dirInBackend}`,
            asyncCase(function() {
              expect(JSON.stringify(cleanTask.dirInBackend)).to.equal(
                JSON.stringify(dirInBackend)
              );
            })
          );
        });
      });
    });
  });
});