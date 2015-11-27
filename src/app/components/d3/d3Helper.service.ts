module tmnProject {
  'use strict';

  export class d3HelperService {

    /** @ngInject */
    constructor(private $http: any) {}

    public removeSVGOnDestroy(svg: any, d3: any) {
      svg.selectAll("*").remove();
      d3.select("svg").remove();
    }

    public createSVG(d3, width, height, margin, ele, cssClass) {
      var svg = d3.select(ele[0]).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("class", cssClass)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      return svg;
    }

  }
}
