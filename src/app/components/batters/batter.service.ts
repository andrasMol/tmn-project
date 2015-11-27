module tmnProject {
  'use strict';

  export class BatterService {
    public batters: any = {};
    
    /** @ngInject */
    constructor(private $http: ng.IHttpService, private $q: ng.IQService) {

    }

    getBatterData(id) {
      if (this.batters[id]) {
        // we already have this loaded in so just return the data
        var deferred = this.$q.defer();
        deferred.resolve(this.batters[id]);
        return deferred.promise;
      }
      return this.$http.get('/assets/data/'+id+'.json');
    }

    getListOfBatters(list) {
      // doing this because the only way to get the 3 individual players' name/profile picture is to load in the whole dataset
      // preferably there would be a list of players that was light in data which we could use to show the front page
      var promises = [];
      for (var i = 0; i < list.length; i++) {
        // make sure we don't already have this dataset loaded in
        if (!this.batters[list[i]]) {
          promises.push(this.$http.get('/assets/data/' + list[i] + '.json'));  
        }
      }
      // in the case that we have already fetched all this data then just return it
      // this doesn't handle the case where some of the data hasn't been returned but some has, that would be a TODO
      if (promises.length === 0) {
        var deferred = this.$q.defer();
        deferred.resolve(this.batters);
        return deferred.promise;
      }

      var allPromise = this.$q.all(promises);
      allPromise.then((arrayOfResults) => { 
        for (var i = 0; i < arrayOfResults.length; i++) {
          this.batters[arrayOfResults[i].data.id] = arrayOfResults[i];
        }
      });
      return allPromise;
    }
  }
}
