/// <reference path="../typings/browser.d.ts" />
/// <reference path="./app.config.ts" />
/// <reference path="./app.constant.ts" />
/// <reference path="./app.run.ts"/>

import * as myModule from './my-module/my.module';
import * as appConstants from './app.constant';
import * as appRun from './app.run';
import * as appConfig from './app.config';

export namespace app {
    export let name = 'app';
    let angularModule = angular.module(name, ['ui.router',  myModule.my.name]);
    angularModule.constant('config', appConstants.app.Constants.MyAppConstants);
    angularModule.run(appRun.app.Run);
    angularModule.config(appConfig.app.MyAppConfig);
}
