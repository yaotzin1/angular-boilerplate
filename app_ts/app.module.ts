/// <reference path="../typings/browser.d.ts" />
/// <reference path="./app.config.ts" />
/// <reference path="./app.constant.ts" />
/// <reference path="./app.run.ts"/>


module app {
    let angularModule = angular.module('app', ['ui.router', 'my']);
    angularModule.constant('config', app.Constants.MyAppConstants);
    angularModule.run(app.Run);
    angularModule.config(app.MyAppConfig);
}
