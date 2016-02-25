/// <reference path="../../../typings/browser.d.ts" />

export namespace my {
    export class MyModuleController {
        public viewData: Array<any>;
        static $inject = [];
        constructor() {
            this.viewData = [
                {
                    value: 'some',
                    value2: 'some2'
                },
                {
                    value: 'some3',
                    value2: 'some4'
                }
            ];
        }
    }
}
