(function() {
  'use strict';

  describe('batter.service.spec', function(){
    var $httpBackend;
    var $http;
    var BatterService;
    var batters = ['452655', '457706', '502082'];
    var mockData = [];
    var listOfBatters = [];

    beforeEach(module('tmnProject'));

    beforeEach(angular.mock.inject(function(_$httpBackend_, _BatterService_, _$http_){
      $httpBackend = _$httpBackend_;
      $http = _$http_;
      BatterService = _BatterService_;
      var games1 = [
        {AB: 5, H: 2, HR: 0, RBI: 1},
        {AB: 4, H: 1, HR: 1, RBI: 3},
        {AB: 4, H: 0, HR: 0, RBI: 0}
      ];
      var games2 = [
        {AB: 3, H: 0, HR: 0, RBI: 0},
        {AB: 4, H: 1, HR: 1, RBI: 3},
        {AB: 4, H: 0, HR: 0, RBI: 0}
      ];
      var games3 = [
        {AB: 5, H: 2, HR: 0, RBI: 1},
        {AB: 4, H: 1, HR: 1, RBI: 3},
        {AB: 4, H: 0, HR: 0, RBI: 0}
      ];
      mockData['452655'] = {games: games1, id: '452655'};
      mockData['457706'] = {games: games2, id: '457706'};
      mockData['502082'] = {games: games3, id: '502082'};

      listOfBatters = {
        batters: [
          {"id": "452655", "name": "Denard Span", "image": "http://mlb.mlb.com/images/players/mugshot/ph_452655.jpg"},
          {"id": "457706", "name": "Austin Jackson", "image": "http://mlb.mlb.com/images/players/mugshot/ph_457706.jpg"},
          {"id": "502082", "name": "Lonnie Chisenhall", "image": "http://mlb.mlb.com/images/players/mugshot/ph_502082.jpg"}
        ]
      };
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should initialize the service correctly', inject(function() {
      expect(BatterService).toBeDefined();
    }));

    it('should get a list of batters data', inject(function() {
      $httpBackend.whenGET('/assets/data/batters.json').respond(listOfBatters);
      BatterService.getAllBatters(batters).then(function (response) {
        expect(response.data.batters.length).toBe(listOfBatters.batters.length);
      });
      $httpBackend.flush();
    }));

    it('should get a single batters data', inject(function() {
      $httpBackend.whenGET('/assets/data/'+batters[0]+'.json').respond(mockData[batters[0]]);
      BatterService.getBatterData(batters[0]).then(function (response) {
        expect(response.data).toEqual(mockData[batters[0]]);
      });
      $httpBackend.flush();
    }));

    it('should get ensure that caching is working properly in the service', inject(function() {
      $httpBackend.whenGET('/assets/data/'+batters[0]+'.json').respond(mockData[batters[0]]);
      BatterService.getBatterData(batters[0]).then(function (response) {
        expect(response.data).toEqual(mockData[batters[0]]);
      });
      $httpBackend.flush();

      BatterService.getBatterData(batters[0]).then(function (response) {
        expect(response.data).toEqual(mockData[batters[0]]);
      });
      // make sure that don't have any requests since the above call won't make an http request if caching worked properly
      $httpBackend.verifyNoOutstandingRequest();
    }));

  });
})();
