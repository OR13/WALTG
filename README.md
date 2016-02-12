# Webpack Angular Less TypeScript Gulp

This repo is for understanding TypeScript Angular Gulp Module Namespace toxic stews you may encounter in the wild.

If you've been working with TypeScript for a while, you might have a nasty mix of Internal Modules (now called Namespaces), Ambient Type References, External Modules, and ES6 imports...

With large projects its often not possible to get "there" from "here".

Where "there" is the the new hotness, and "here" is a pile of code written by a younger, stupider version of yourself.

Its not reasonable to break a production system, but some upgrades take a long time.

You need a plan! But first, read up:

http://stackoverflow.com/questions/30357634/how-do-i-use-namespaces-with-typescript-external-modules

https://github.com/Microsoft/TypeScript/issues/2242

Google TypeScript Internal Modules Namespaces ES6 Import, reference, etc...

Cool, so depending on your gulp / grunt / webpack setup, some things will work, others will not.

If you want to use ES6 imports, you will need to compile typescript with --module flag.

that looks like this:

```
{
  "buildOnSave": false,
  "compileOnSave": false,
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs"
  }
}
```

Lets say you didn't read the first link where it clearly says:

```
Do not use "namespaces" in external modules. Don't do this. Seriously. Stop.
```

Lets say you were like:

fuck that, I don't know what external modules are, I like being able to compile my typescript files, and bind all my controllers with one line:

```

angular.module('waltg', [
  'ngAnimate',
  'ngCookies',
  'ngTouch',
  'ngSanitize',
  'ngMessages',
  'ngAria',
  'ngResource',
  'ngRoute',
  'ui.bootstrap',
  'toastr'
])

  .config(config)
  .config(routerConfig)
  .run(runBlock)

  .service(waltg)
  .controller(waltg)

  // .directive(waltg.Directives) will never work, don't even try.


```

In your pitfull pre external modules world, you probably have shit like this:


```

namespace waltg {

/** @ngInject */
export function testOtherDirective2 ($log: angular.ILogService, $timeout: angular.ITimeoutService, $rootScope: angular.IRootScopeService) : angular.IDirective  {
  return {
    template: `<h2>testOtherDirective2</h2>`,
    restrict: 'A',
    link: function (scope:any, $el:any, attrs:any) {

      $log.log('testOtherDirective....')
    }
  };
};

}


```

Maybe you are compiling typescript with gulp like :

```
gulp.task('typescripts-scripts', ['tsd:install'], function () {
  mkdirp.sync(options.tmp);

  return gulp.src(options.src + '/app/**/*.ts')
      .pipe($.sourcemaps.init())
      .pipe($.tslint())
      .pipe($.tslint.report('prose', { emitError: false }))
      .pipe($.typescript({sortOutput: true})).on('error', options.errorHandler('TypeScript'))
      .pipe($.sourcemaps.write())
      .pipe($.ngAnnotate())
      .pipe($.toJson({filename: options.tmp + '/sortOutputTypeScripts.json', relative:true}))
      .pipe(gulp.dest(options.tmp + '/serve/app'))
      .pipe(browserSync.reload({ stream: true }))
      .pipe($.size());
});

gulp.task('scripts', ['typescripts-scripts'], function () {

```

Thats all fine and dandy, but you haven't read the first link yet, it clearly says:

```
Do not use "namespaces" in external modules. Don't do this. Seriously. Stop.
```

Now what?

Good news! You can indeed upgrade incrementally, in a project with a million files in it.

First, put an export in front of you namespace so it can be an external module!

```

export namespace waltg {

/** @ngInject */
export function testOtherDirective2 ($log: angular.ILogService, $timeout: angular.ITimeoutService, $rootScope: angular.IRootScopeService) : angular.IDirective  {
  return {
    template: `<h2>testOtherDirective2</h2>`,
    restrict: 'A',
    link: function (scope:any, $el:any, attrs:any) {

      $log.log('testOtherDirective....')
    }
  };
};

}

```

Great, now everything is broken.

You need to start compiling with --module, which means you are gonna need a module loader...

Use Webpack.

Lots of things will change, I'm not saying this is easy. Use this repo as a reference for the "their" part.

Your new angular module will look like this:

```
angular.module('waltg', [
  'ngAnimate',
  'ngCookies',
  'ngTouch',
  'ngSanitize',
  'ngMessages',
  'ngAria',
  'ngResource',
  'ngRoute',
  'ui.bootstrap',
  'toastr'
])
  .constant('malarkey', malarkey)
  .constant('moment', moment)
  .config(config)
  .config(routerConfig)
  .run(runBlock)

  // This shit is ugly, but it works, and its close to what you had before, the import has to go at the top obivously.
  // import * as testOtherDirective2 from '../app/patterns/testOtherDirective2';
  .directive('testOtherDirective2', testOtherDirective2.waltg.testOtherDirective2)

  // This is what you want, the import goes at the top
  // import { testDirective } from '../app/patterns/testDirective';
  .directive('testDirective', testDirective);

```
