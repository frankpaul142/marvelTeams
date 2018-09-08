'use strict';

angular.module('App')
    .controller('Main', function ($scope, $http) {
        var apikey = '988904d94709fdeec78e7335038afdf0';
        var team = makeTeam();
        $scope.data = {
            search: '',
            searchHeroe: '',
            comics: [
                {
                    'code': 'avengers',
                    'name': 'The Avengers',
                    'all': true
                },
                {
                    'code': 'spider-man',
                    'name': 'Spiderman',
                    'all': true
                },
                {
                    'code': 'x-men',
                    'name': 'X-Men',
                    'all': true
                },
                {
                    'code': 'wolverine',
                    'name': 'Wolverine',
                    'all': true
                },
                {
                    'code': 'hulk',
                    'name': 'Hulk',
                    'all': false
                }
            ],
            comicsId: [],
            heroes: [],
            team: [],
            confirmTeam: false
        };

        $scope.searchComic = function (status) {
            if (status) {
                $scope.data.team = []
            }
            if ($scope.data.search.all) {
                searchComicAll();
            } else {
                searchComicSpecific();
            }
        }

        $scope.searchHeroe = function () {
            if ($scope.data.searchHeroe) {
                $scope.data.heroes = [];
                var promiseAll = [];
                $scope.data.comicsId.forEach(comicId => {
                    var marvelAPI = `https://gateway.marvel.com/v1/public/comics/${comicId}/characters?limit=20&nameStartsWith=${$scope.data.searchHeroe}&apikey=${apikey}`;
                    promiseAll.push($http({ method: 'GET', url: marvelAPI }));
                });
                return Promise.all(promiseAll).then(data => {
                    data.forEach(responseHeroes => {
                        responseHeroes.data.data.results.forEach(heroe => {
                            if (heroe.name && heroe.thumbnail) {

                                var findHeroe = $scope.data.heroes.find(function (valueHeroe) {
                                    return valueHeroe.id === heroe.id;
                                });

                                if (!findHeroe) {
                                    if (!heroe.description) {
                                        heroe.description = heroe.name;
                                    }
                                    $scope.data.heroes.push(heroe);

                                }
                            }
                        });
                    });
                    $scope.$digest();
                })
            } else {
                $scope.searchComic();
            }
        }

        $scope.selectHeroe = function (heroe) {
            heroe.selected = true;

            var findHeroe = $scope.data.team.find(function (valueHeroe) {
                return valueHeroe.id === heroe.id;
            });

            if (!findHeroe) {
                var data = {
                    team: team,
                    id: heroe.id,
                    name: heroe.name,
                    description: heroe.description,
                    image: heroe.thumbnail.path + '.' + heroe.thumbnail.extension,
                }
                $scope.data.team.push(data);
            } else {
                alert("Selected hero")
            }
        }

        $scope.confirmTeam = function () {
            $scope.data.confirmTeam = true;
        };

        $scope.cancelSaveTeam = function () {
            if (confirm("If canceled, you will lose all changes")) {
                $scope.data.confirmTeam = false;
                $scope.data.team = [];

                $scope.data.heroes.forEach(heroe => {
                    heroe.selected = false;
                });
            }
        };

        $scope.saveTeam = function () {
            $http({
                method: 'POST',
                url: 'http://localhost:3001/team',
                data: $scope.data.team,
            }).then(function (response) {
                $scope.data.confirmTeam = false;
                alert("Team Save");
            });
        }

        function makeTeam () {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (var i = 0; i < 5; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            return text;
        }

        function searchComicAll () {
            $scope.data.heroes = [];
            var marvelAPI = `https://gateway.marvel.com:443/v1/public/comics?limit=20&titleStartsWith=${$scope.data.search.code}&apikey=${apikey}`;

            var promiseAll = [];
            $http({
                method: 'GET',
                url: marvelAPI
            }).then(function successCallback (response) {
                response.data.data.results.forEach(comic => {
                    $scope.data.comicsId.push(comic.id);
                    comic.characters.items.forEach(value => {
                        promiseAll.push($http({ method: 'GET', url: value.resourceURI + `?limit=20&apikey=${apikey}` }));
                    });
                });

                return Promise.all(promiseAll).then(data => {
                    data.forEach(responseHeroes => {
                        responseHeroes.data.data.results.forEach(heroe => {
                            if (heroe.name && heroe.thumbnail) {

                                var findHeroe = $scope.data.heroes.find(function (valueHeroe) {
                                    return valueHeroe.id === heroe.id;
                                });

                                if (!findHeroe) {
                                    if (!heroe.description) {
                                        heroe.description = heroe.name;
                                    }
                                    $scope.data.heroes.push(heroe);

                                }
                            }
                        });
                    });
                    $scope.$digest();
                });
            });
        }

        function searchComicSpecific () {
            $scope.data.comicsId = [];
            var marvelAPI = `https://gateway.marvel.com:443/v1/public/characters?limit=10&nameStartsWith=${$scope.data.search.code}&limit=1&apikey=${apikey}`;
            $http({
                method: 'GET',
                url: marvelAPI
            }).then(function successCallback (response) {
                var resourceURI = [];
                response.data.data.results.forEach(comic => {
                    if ($scope.data.comicsId.length < 10) {
                        resourceURI.push(comic.resourceURI);
                    }
                });

                $scope.data.heroes = [];
                var promiseAll = [];
                resourceURI.forEach(valueURI => {
                    promiseAll.push($http({ method: 'GET', url: valueURI + `?apikey=${apikey}` }));
                });

                return Promise.all(promiseAll).then(data => {
                    data.forEach(responseHeroes => {
                        console.log(responseHeroes)
                        responseHeroes.data.data.results.forEach(heroe => {
                            if (heroe.name && heroe.thumbnail) {

                                var findHeroe = $scope.data.heroes.find(function (valueHeroe) {
                                    return valueHeroe.id === heroe.id;
                                });

                                if (!findHeroe) {
                                    if (!heroe.description) {
                                        heroe.description = heroe.name;
                                    }
                                    $scope.data.heroes.push(heroe);

                                }
                            }
                        });
                    });
                    $scope.$digest();
                })
            });

        }
    });