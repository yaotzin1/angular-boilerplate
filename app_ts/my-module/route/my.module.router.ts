/// <reference path="../../../typings/browser.d.ts" />
/// <reference path="../controller/my.module.controller.ts" />

module my {
    export class MyStateConfig {
        constructor(private $stateProvider: ng.ui.IStateProvider, private $urlRouterProvider: ng.ui.IUrlRouterProvider) {
            this.$stateProvider.state('main', <ng.ui.IState> {
                url: '/main',
                templateUrl: '/my-module/view/index.html',
                controller: my.MyModuleController,
                controllerAs: 'moduleController'
            });
        }
    }
}
