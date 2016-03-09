/// <reference path="../typings/browser.d.ts" />

import angular from 'angular';
import uiRouter from  'angular-ui-router';
import * as app from './app.module';


angular.element(document).ready(function(){
    let ui = uiRouter;
    angular.bootstrap(document, [app.app.name]);
});
