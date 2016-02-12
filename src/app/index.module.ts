
/// <reference path="./refs.ts" />

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { MainController } from './main/main.controller';
import { GithubContributor } from '../app/components/githubContributor/githubContributor.service';
import { WebDevTecService } from '../app/components/webDevTec/webDevTec.service';
import { acmeNavbar } from '../app/components/navbar/navbar.directive';
import { acmeMalarkey } from '../app/components/malarkey/malarkey.directive';

import { testDirective } from '../app/patterns/testDirective';

import * as testOtherDirective from '../app/patterns/testOtherDirective';

import * as testOtherDirective2 from '../app/patterns/testOtherDirective2';

declare var malarkey: any;
declare var moment: moment.MomentStatic;

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
  .service('githubContributor', GithubContributor)
  .service('webDevTec', WebDevTecService)
  .controller('MainController', MainController)
  .directive('acmeNavbar', acmeNavbar)
  .directive('acmeMalarkey', acmeMalarkey)

  // Only to get to YES
  .directive('testOtherDirective2', testOtherDirective2.waltg.testOtherDirective2)

  // YES
  .directive('testDirective', testDirective);


// NO!!!!!, NEVER EVER, NOT EVEN ONCE
testOtherDirective.bootstrap();
