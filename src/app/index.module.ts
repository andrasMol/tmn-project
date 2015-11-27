/// <reference path="../../.tmp/typings/tsd.d.ts" />


/// <reference path="index.route.ts" />

/// <reference path="index.config.ts" />
/// <reference path="index.run.ts" />
/// <reference path="main/main.controller.ts" />
/// <reference path="../app/components/batters/batter.controller.ts" />
/// <reference path="../app/components/batters/batter.service.ts" />
/// <reference path="../app/components/navbar/navbar.directive.ts" />
/// <reference path="../app/components/charts/scatterPlot.directive.ts" />
/// <reference path="../app/components/d3/d3.service.ts" />
/// <reference path="../app/components/d3/d3ScatterPlotChartHelper.service.ts" />
/// <reference path="../app/components/d3/d3Helper.service.ts" />

module tmnProject {
  'use strict';

  angular.module('tmnProject', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ui.router', 'ui.bootstrap', 'd3'])
      .config(Config)
      .config(RouterConfig)
      .run(RunBlock)
      .service('d3HelperService', d3HelperService)
      .service('d3ScatterPlotChartHelperService', d3ScatterPlotChartHelperService)
      .service('BatterService', BatterService)
      .controller('MainController', MainController)
      .controller('BatterController', BatterController)
      .directive('navbar', navbar)
      .directive('scatterPlot', scatterPlot);
}
