/// <reference path="../refs.ts" />

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
