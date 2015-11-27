module tmnProject {
  'use strict';
  
  /** @ngInject */
  export function rbiOverTime(): ng.IDirective {

    return {
      restrict: 'E',
      scope: {
        data: '='
      },
      controller: rbiOverTimeController,
      controllerAs: 'sp',
      link: (scope: any, ele: JQuery, attrs: ng.IAttributes) => {
        scope.sp.d3Service.d3().then(d3 => {

          var margin = { top: 20, right: 80, bottom: 30, left: 50 };
          var width = ele.parent().width() - margin.left - margin.right;
          var height = 300;

          var parseDate = d3.time.format("%Y-%m-%d").parse;
          scope.sp.d3ScatterPlotChartHelperService.createScatterPlot(scope, d3, width, height, margin, scope.sp.data, ele, 'scatter-plot', parseDate, "Cumulative RBIs Over Time", "rbi");
        });
      },
      bindToController: true
    };
  }

  /** @ngInject */
  class rbiOverTimeController {

    constructor(private d3Service: any, private d3ScatterPlotChartHelperService: any, private d3HelperService: any) {
    }
  }
}
