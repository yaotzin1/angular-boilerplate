/// <reference path="../../../typings/browser.d.ts" />

export namespace my {
    export class MyModuleController {
        public viewData: Array<any>;
        static $inject = [];
        constructor() {
            this.viewData = [
                {
                    name: 'John',
                    surname: 'Doe'
                },
                {
                    name: 'Jane',
                    surname: 'Kovalsky'
                }
            ];
        }
    }
}
