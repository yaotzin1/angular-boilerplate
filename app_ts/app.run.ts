/// <reference path="../typings/browser.d.ts" />

module app {
    export class Run {
        constructor($state: ng.ui.IStateService) {
            $state.go('main');
        }
    }
}
