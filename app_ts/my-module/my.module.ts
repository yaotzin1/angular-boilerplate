/// <reference path="../../typings/browser.d.ts" />
/// <reference path="./route/my.module.router.ts"/>

module my{
    let myAngularModule = angular.module('my', ['ui.router']);
    myAngularModule.config(my.MyStateConfig);
}
