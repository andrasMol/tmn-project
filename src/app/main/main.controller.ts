module tmnProject {
  'use strict';

  export class MainController {
    public battersData = [];
    public loading: boolean = false;

    /* @ngInject */
    constructor (private BatterService: any) {
      this.loading = true;
      this.BatterService.getAllBatters().then((result: any) => {
        this.loading = false;
        this.battersData = result.data.batters;
      }).catch((failure) => {
        console.log("error", failure);
      });
    }

  }
}
