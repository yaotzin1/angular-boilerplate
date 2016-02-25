/// <reference path="../../../typings/browser.d.ts" />
/// <reference path="../controller/my.module.controller.ts" />
import * as controller from '../controller/my.module.controller';

export namespace my {
    export class MyStateConfig {
        /** @ngInject */
        constructor(private $stateProvider: ng.ui.IStateProvider, private $urlRouterProvider: ng.ui.IUrlRouterProvider) {
            this.$stateProvider.state('main', <ng.ui.IState> {
                url: '/main',
                templateUrl: '/my-module/view/index.html',
                controller: controller.my.MyModuleController,
                controllerAs: 'moduleController'
            });
        }
    }
}
