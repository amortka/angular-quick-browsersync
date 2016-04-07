'use strict';

(function () {
    angular.module('components')
        .directive('shortcut', function () {
            return {
                restrict: 'E',
                templateUrl: 'components/shortcut/shortcut.tmpl.html',
                scope: {
                    number: '@',
                },
                link: function (scope, elem, attr) {

                }
            }
        });
}());