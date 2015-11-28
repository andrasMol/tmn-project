(function() {
    'use strict';

    describe('batter controller', function() {
      var batterController;
      var batterData;
      var battingAverage = .286;
      var RBIs = 5;
      var HRs = 2;
      var battingAvgOverTime = ['0.400', '0.333', '0.231', '0.250', '0.286'];

      beforeEach(module('tmnProject'));

      beforeEach(angular.mock.inject(function($controller){
        batterController = $controller('BatterController');

        var games = [
          {AB: 5, H: 2, HR: 0, RBI: 1},
          {AB: 4, H: 1, HR: 1, RBI: 3},
          {AB: 4, H: 0, HR: 0, RBI: 0},
          {AB: 3, H: 1, HR: 1, RBI: 0},
          {AB: 0, H: 0, HR: 0, RBI: 0},
          {AB: 5, H: 2, HR: 0, RBI: 1}
        ];
        batterData = {games: games};
        batterController.batterData = batterData;
      }));

      it('should test to make sure the controller is properly initialized', inject(function() {
        expect(batterController).toBeTruthy();
      })); 

      it('should test calculateOveralls to ensure correct batting average', inject(function() {
        batterController.calculateOveralls();
        expect(batterController.battingAverage.toFixed(3)).toBe(battingAverage.toFixed(3));
      }));

      it('should test calculateOveralls to ensure correct number of RBIs', inject(function() {
        batterController.calculateOveralls();
        expect(batterController.RBIs).toBe(RBIs);
      }));

      it('should test calculateOveralls to ensure correct number of HRs', inject(function() {
        batterController.calculateOveralls();
        expect(batterController.HRs).toBe(HRs);
      }));

      it('should test calculateOveralls to ensure correct Batting Average over time', inject(function() {
        batterController.calculateOveralls();
        for (var i = 0; i < batterController.battingAverageOverTime.length; i++) {
          expect(batterController.battingAverageOverTime[i].ba).toBe(battingAvgOverTime[i]);
        }
      }));

    });
})();