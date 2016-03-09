/// <reference path="../typings/browser.d.ts" />

export namespace app {
    export class MyAppConfig {
        constructor(private $locationProvider: ng.ILocationProvider) {
            $locationProvider.html5Mode(true);
        }
    }
}
