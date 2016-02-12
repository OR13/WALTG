

function linkFunc(scope: angular.IScope, el: JQuery, attr: any, vm: TestDirectiveController) {
  vm.$log.debug('testDirective linkFunc...');
};

export function testDirective(): angular.IDirective {
  return {
    restrict: 'E',
    scope: {},
    template: '<h1>testDirective</h1>',
    link: linkFunc,
    controller: TestDirectiveController,
    controllerAs: 'vm'
  };

}

export class TestDirectiveController {

  /** @ngInject */
  constructor(public $log: angular.ILogService) {
    $log.debug('testDirective Controller constructor...');
  }
  
}
