"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var utility_1 = require("../../../utility");
var SortingPipe = /** @class */ (function () {
    function SortingPipe() {
    }
    /**
     * Helper function for sorting
     * Always moved the `up` folder to the top
     * Sorts everything else according to the `property`
     * @param x
     * @param y
     * @param property
     * @param decreasing -- boolean to tell whether `ascending` or `descending`
     */
    SortingPipe.prototype.sortFunctionLol = function (x, y, property, decreasing) {
        // up button first
        if (x.fileName === '*UP*') {
            return -1;
        }
        else if (y.fileName === '*UP*') {
            return 1;
        }
        if (property === 'alphabetical') {
            if (x.fileName < y.fileName) {
                return decreasing ? -1 : 1;
            }
            if (x.fileName > y.fileName) {
                return decreasing ? 1 : -1;
            }
            else {
                return 0;
            }
        }
        if (property === 'tags') {
            if ((x.tags || []).length < (y.tags || []).length) {
                return -1;
            }
            if ((x.tags || []).length > (y.tags || []).length) {
                return decreasing ? -1 : 1;
            }
            else {
                return 0;
            }
        }
        if (property === 'hash') {
            if (x.hash < y.hash) {
                return -1;
            }
            if (x.hash > y.hash) {
                return 1;
            }
            else {
                return 0;
            }
        }
        // handle `year` case:   show properties that are not empty first
        if (property === 'year') {
            if (decreasing) {
                return (x.year || Infinity) - (y.year || Infinity);
            }
            else {
                return (y.year || 0) - (x.year || 0);
            }
        }
        // handle `stars` case:  show properties that are not empty first
        if (property === 'stars') {
            if (decreasing) {
                return (x.stars === 0.5 ? Infinity : x.stars)
                    - (y.stars === 0.5 ? Infinity : y.stars);
            }
            else {
                return (y.stars === 0.5 ? 0 : y.stars)
                    - (x.stars === 0.5 ? 0 : x.stars);
            }
        }
        if (decreasing) {
            return (x[property]) - (y[property]);
        }
        else {
            return (y[property]) - (x[property]);
        }
    };
    /**
     * Return the same array randomized on next search
     * @param galleryArray
     * @param sortingType         - sorting method
     * @param forceSortUpdateHack - hack to force the sorting update
     * @param skip                - whether to sort or return as is (needed for DUPLICATE SEARCH)
     */
    SortingPipe.prototype.transform = function (galleryArray, sortingType, forceSortUpdateHack, skip) {
        // console.log('SORTING RUNNING');
        // console.log(sortingType);
        var _this = this;
        if (skip) {
            // console.log('skipping !!!');
            return galleryArray;
        }
        else if (sortingType === 'random') {
            if (galleryArray.length === 0) {
                return []; // else `galleryArray[0] errors out!
            }
            var currentIndex = (galleryArray[0].fileName === '*UP*' ? 1 : 0); // skip 'up button' if present
            return utility_1.randomizeArray(galleryArray, currentIndex);
        }
        else if (sortingType === 'tagsAsc') {
            return galleryArray.slice().sort(function (x, y) {
                return _this.sortFunctionLol(x, y, 'tags', true);
            });
        }
        else if (sortingType === 'tagsDesc') {
            return galleryArray.slice().sort(function (x, y) {
                return _this.sortFunctionLol(x, y, 'tags', false);
            });
        }
        else if (sortingType === 'alphabetAsc') {
            return galleryArray.slice().sort(function (x, y) {
                return _this.sortFunctionLol(x, y, 'alphabetical', true);
            });
        }
        else if (sortingType === 'alphabetDesc') {
            return galleryArray.slice().sort(function (x, y) {
                return _this.sortFunctionLol(x, y, 'alphabetical', false);
            });
        }
        else if (sortingType === 'sizeAsc') {
            return galleryArray.slice().sort(function (x, y) {
                return _this.sortFunctionLol(x, y, 'fileSize', true);
            });
        }
        else if (sortingType === 'sizeDesc') {
            return galleryArray.slice().sort(function (x, y) {
                return _this.sortFunctionLol(x, y, 'fileSize', false);
            });
        }
        else if (sortingType === 'timeAsc') {
            return galleryArray.slice().sort(function (x, y) {
                return _this.sortFunctionLol(x, y, 'duration', true);
            });
        }
        else if (sortingType === 'timeDesc') {
            return galleryArray.slice().sort(function (x, y) {
                return _this.sortFunctionLol(x, y, 'duration', false);
            });
        }
        else if (sortingType === 'starAsc') {
            return galleryArray.slice().sort(function (x, y) {
                return _this.sortFunctionLol(x, y, 'stars', true);
            });
        }
        else if (sortingType === 'starDesc') {
            return galleryArray.slice().sort(function (x, y) {
                return _this.sortFunctionLol(x, y, 'stars', false);
            });
        }
        else if (sortingType === 'yearAsc') {
            return galleryArray.slice().sort(function (x, y) {
                return _this.sortFunctionLol(x, y, 'year', true);
            });
        }
        else if (sortingType === 'yearDesc') {
            return galleryArray.slice().sort(function (x, y) {
                return _this.sortFunctionLol(x, y, 'year', false);
            });
        }
        else if (sortingType === 'timesPlayedAsc') {
            return galleryArray.slice().sort(function (x, y) {
                return _this.sortFunctionLol(x, y, 'timesPlayed', true);
            });
        }
        else if (sortingType === 'timesPlayedDesc') {
            return galleryArray.slice().sort(function (x, y) {
                return _this.sortFunctionLol(x, y, 'timesPlayed', false);
            });
        }
        else if (sortingType === 'modifiedAsc') {
            return galleryArray.slice().sort(function (x, y) {
                return _this.sortFunctionLol(x, y, 'mtime', true);
            });
        }
        else if (sortingType === 'modifiedDesc') {
            return galleryArray.slice().sort(function (x, y) {
                return _this.sortFunctionLol(x, y, 'mtime', false);
            });
        }
        else if (sortingType === 'hash') {
            return galleryArray.slice().sort(function (x, y) {
                return _this.sortFunctionLol(x, y, 'hash', true);
            });
        }
        else {
            return galleryArray.slice().sort(function (x, y) {
                return _this.sortFunctionLol(x, y, 'index', true);
            });
        }
    };
    SortingPipe = __decorate([
        core_1.Pipe({
            name: 'sortingPipe'
        })
    ], SortingPipe);
    return SortingPipe;
}());
exports.SortingPipe = SortingPipe;
//# sourceMappingURL=sorting.pipe.js.map