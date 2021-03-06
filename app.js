
angular.module('instaCity', ['ngRoute'])

  .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'templates/search.html',
        controller: 'MainCtrl'
      })

      .when('/about',{
        templateUrl: 'templates/about.html',
      })

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  }])

  .controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.photos = [];

    $scope.searchCity = function () {
      var city = $scope.city.replace(/\s+/, '');
      $scope.currentCity = $scope.city;
      console.log($scope.currentCity);
      var url = 'https://api.instagram.com/v1/tags/' + city + '/media/recent?count=10&client_id=c54ba92f2d0847478489f3f2d58d088b&callback=JSON_CALLBACK';
      var weatherUrl = "http://api.openweathermap.org/data/2.5/weather?mode=json&cnt=7&units=imperial&callback=JSON_CALLBACK&APPID=8aa25b237192dd69078ca44e1b1e2598&q="  + city  ;
      $http.jsonp(url)
        .then(function (response) {
          console.log(response.data.data);       
          // console.log($scope.currentCity);
          $scope.city = '';
          $scope.photos = response.data.data;
        });
      $http.jsonp(weatherUrl)
        .then(function (response) {
          $scope.city = '';
          $scope.weather = response.data;
          $scope.main = response.data.weather[0].description;
          // console.log($scope.main);  
          // console.log($scope.weather);
        });


    };

    $scope.savePhoto = function (photo) {
      // check if localStorage.photos doesn't exist yet
      if (!localStorage.photos) {
        localStorage.photos = JSON.strinimgy([]);
      }

      // get existing favorites from localStorage.photos
      var allPhotos = JSON.parse(localStorage.photos);

      // push new favrotie into array of all photos
      allPhotos.push(photo);

      // reset localStorage.photos to updated array of all photos
      localStorage.photos = JSON.strinimgy(allPhotos);
    };
  }])

  .controller('FavoritesCtrl', ['$scope', function ($scope) {
    if (!localStorage.photos) {
      $scope.favorites = [];
    } else {
      $scope.favorites = JSON.parse(localStorage.photos);
    }
  }])


;







