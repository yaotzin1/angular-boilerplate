/// <reference path="../typings/browser.d.ts" />

import angular from 'angular';
import route from 'angular-route';
import uiRouter from  'angular-ui-router';
import * as app from './app.module';


angular.element(document).ready(function(){
    let ui = uiRouter;
    let ar = route;
    angular.bootstrap(document, [app.app.name]);
});
