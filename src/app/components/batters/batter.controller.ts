module tmnProject {
  'use strict';

  export class BatterController {
    public loading: boolean = false;
    public batterData: any = {};
    public battingAverage: number;
    public RBIs: number;
    public HRs: number;
    public battingAverageOverTime = [];
    public RBIOverTime = [];

    /* @ngInject */
    constructor(private $stateParams: any, private BatterService: any) {
      this.loading = true;
      this.BatterService.getBatterData(this.$stateParams.batterId).then((result: any) => {
        this.loading = false;
        this.batterData = result.data;
        
        this.doCalculations();
        console.log(this.batterData);
      }).catch((failure) => {
        console.log("error", failure);
      });
    }

    public doCalculations() {
      this.calculateOveralls();
    }

    public calculateOveralls() {
      var atBats = 0;
      var hits = 0;
      var HRs = 0;
      var RBIs = 0;

      for (var i = 0; i < this.batterData.games.length; i++) {
        var game = this.batterData.games[i];
        if (typeof game.AB !== 'undefined' && typeof game.H !== 'undefined' && game.AB !== 0) {
          atBats += game.AB;
          hits += game.H;
          var cumulativeAvg = hits / atBats;
          this.battingAverageOverTime.push({ date: game.date, ba: cumulativeAvg.toFixed(3) });
        }
        if (typeof game.HR !== 'undefined') {
          HRs += game.HR;
        }
        if (typeof game.RBI !== 'undefined') {
          RBIs += game.RBI;
          this.RBIOverTime.push({ date: game.date, rbi: RBIs });
        }
      }
      this.battingAverage = hits / atBats;
      this.HRs = HRs;
      this.RBIs = RBIs;
      console.log(this.battingAverageOverTime);
    }
  }
}