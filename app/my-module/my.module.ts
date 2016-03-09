/// <reference path="../../typings/browser.d.ts" />
/// <reference path="./route/my.module.router.ts"/>
import * as stateConfig from './route/my.module.router';

export namespace my {
    export let name = 'my';
    let myAngularModule = angular.module('my', ['ui.router']);
    myAngularModule.config(stateConfig.my.MyStateConfig);
}
