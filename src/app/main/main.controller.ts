module tmnProject {
  'use strict';

  export class MainController {
    public batters = ['452655', '457706', '502082'];
    public battersData = [];
    public loading: boolean = false;

    /* @ngInject */
    constructor (private BatterService: any) {
      this.loading = true;
      this.BatterService.getListOfBatters(this.batters).then((result: any) => {
        this.loading = false;
        this.battersData = result;
      }).catch((failure) => {
        console.log("error", failure);
      });
    }

  }
}
