/// <reference path="../typings/browser.d.ts" />

module app {
    export class MyAppConfig {
        constructor(private $locationProvider: ng.ILocationProvider) {
            $locationProvider.html5Mode(true);
        }
    }
}
