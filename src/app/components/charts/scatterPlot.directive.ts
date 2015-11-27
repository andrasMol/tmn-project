module tmnProject {
  'use strict';
  
  /** @ngInject */
  export function scatterPlot(): ng.IDirective {

    return {
      restrict: 'E',
      scope: {
        data: '='
      },
      controller: MilkCanadaController,
      controllerAs: 'sp',
      link: (scope: any, ele: JQuery, attrs: ng.IAttributes) => {
        scope.sp.d3Service.d3().then(d3 => {
          
          var margin = { top: 20, right: 80, bottom: 30, left: 50 };
          var width = 900;
          var height = 600;

          var parseDate = d3.time.format("%Y-%m-%d").parse;
          scope.sp.d3ScatterPlotChartHelperService.createScatterPlot(d3, width, height, margin, scope.sp.data, ele, 'scatter-plot', parseDate, "Scatter Plot");
        });
      },
      bindToController: true
    };
  }

  /** @ngInject */
  class MilkCanadaController {

    constructor(private d3Service: any, private d3ScatterPlotChartHelperService: any, private d3HelperService: any) {
    }
  }
}
