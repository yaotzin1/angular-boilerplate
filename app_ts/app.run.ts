/// <reference path="../typings/browser.d.ts" />

export namespace app {
    export class Run {
        constructor($state: ng.ui.IStateService) {
            $state.go('main');
        }
    }
}
