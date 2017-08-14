var app = angular.module("app", []);
app.controller("appCtrl",
    function ($scope) {
        //Initialize tooltips
        $('.nav-tabs > li a[title]').tooltip();

        $scope.isFirstScreenDone = false;
        $scope.gotoNext = function (screen) {
            if (screen === '1') {
                $scope.isFirstScreenDone = true;
            }
            if (screen === '2') {
                $scope.isSecondScreenDone = true;
            }
        }

        //Wizard
        $('a[data-toggle="tab"]')
            .on('show.bs.tab',
                function (e) {

                    var $target = $(e.target);

                    if ($target.parent().hasClass('disabled')) {
                        return false;
                    }
                });

        $(".next-step")
            .click(function (e) {

                var $active = $('.wizard .nav-tabs li.active');
                $active.next().removeClass('disabled');
                nextTab($active);
                return false;

            });
        $(".prev-step")
            .click(function (e) {

                var $active = $('.wizard .nav-tabs li.active');
                prevTab($active);

            });

        function nextTab(elem) {
            $(elem).next().find('a[data-toggle="tab"]').click();
        }

        function prevTab(elem) {
            $(elem).prev().find('a[data-toggle="tab"]').click();
        }

        $scope.Countries = countries;
        $scope.States = stateList;
        $scope.SelectedCountryDetail = {};
        $scope.SelectedStateDetail = {};

        $scope.SelectedStates = [];

        $scope.GetStates = function () {
            $scope.SelectedCountryDetail = $.grep($scope.Countries,
                function(country) {
                    return country.CountryId === parseInt($scope.selectedCountry, 10);
                })[0];
            $scope.SelectedStates = $.grep($scope.States,
                function (state) {
                    return state.CountryId === $scope.selectedCountry;
                });
            $scope.SelectedStateDetail = "";
        }
        $scope.SetStateSelection = function () {
            $scope.SelectedStateDetail = $.grep($scope.States,
                function (state) {
                    return state.SubdivisionId === $scope.selectedstate;
                })[0];
        }
    });