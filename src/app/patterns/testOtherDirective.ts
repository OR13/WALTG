/// <reference path="../refs.ts" />


export function bootstrap() {

  angular.module('waltg')
    .directive('testOtherDirective', [
      '$log', '$timeout', '$rootScope', function ($log, $timeout, $rootScope) {
        return {
          template: `<h2>testOtherDirective</h2>`,
          restrict: 'A',
          link: function (scope:any, $el:any, attrs:any) {

            $log.log('testOtherDirective....')
          }
        };
      }
    ]);

}
