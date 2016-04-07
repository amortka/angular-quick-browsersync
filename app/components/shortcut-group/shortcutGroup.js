'use strict';

(function () {
    angular.module('components')
        .directive('shortcutGroup', function ($window) {
            return {
                restrict: 'E',
                templateUrl: 'components/shortcut-group/shortcutGroup.tmpl.html',
                link: function (scope, elem, attr) {

                    var DEBOUNCE_TIME = 250;
                    var SHORTCUT_WIDTH = 200;
                    var SHORTCUT_MIN_GUTTER = 10;
                    var SHORTCUT_MAX_GUTTER = 30;

                    var watcher;
                    var shortcuts = [];
                    var elContainer = elem.children(':first');
                    var elContainerWidth = elContainer.width();
                    var visibleCapacity = 0;
                    var calculatedGutter = 0;
                    var spaceAround = 0;


                    /** --- functions --- **/
                    function setAvailableShortcuts() {
                        shortcuts = _.range(10);
                        scope.shortcuts = shortcuts;
                    }

                    function calculateWidth() {
                        elContainerWidth = elContainer.width();
                        
                        visibleCapacity = ~~(elContainerWidth / (SHORTCUT_WIDTH + SHORTCUT_MIN_GUTTER));
                        calculatedGutter = Math.min((elContainerWidth - (visibleCapacity * SHORTCUT_WIDTH)) / visibleCapacity, SHORTCUT_MAX_GUTTER);
                        spaceAround = elContainerWidth - (SHORTCUT_WIDTH + calculatedGutter) * visibleCapacity;
                        
                        console.log('-- calculate: container width:', elContainerWidth);
                        console.log('-- calculate: visibleCapacity:', visibleCapacity);
                        console.log('-- calculate: calculatedGutter:', calculatedGutter);
                        console.log('-- calculate: leftSpace:', leftSpace);
                    }

                    function bindEvents() {
                        angular.element($window)
                            .on('resize', _.debounce(function () {
                                calculateWidth();
                            }, DEBOUNCE_TIME));
                    }

                    function addWatch() {
                        watcher = scope.$watch(function () {
                            return elem.find('div.Shortcut').length === shortcuts.length;
                        }, function () {
                            var shortcuts = elem.find('div.Shortcut');
                            if (shortcuts.length === shortcuts.length) {
                                console.log('- 1. render is done');
                                calculateWidth();
                                watcher(); //remove watcher
                            }
                        });
                    }

                    function init() {
                        setAvailableShortcuts();
                        addWatch();
                        bindEvents();
                    }

                    init();

                }
            }
        });
}());

/*
function addWatcher() {
                    watcher = scope.$watch(function () {
                        return elem.find('div.DashboardShortcut').length === shortcutCount;
                    }, function () {
                        var shortcuts = elem.find('div.DashboardShortcut');
                        if (shortcuts.length === shortcutCount) {
                            calculateWidth();
                            watcher(); //remove watcher
                        }
                    });
                }
*/