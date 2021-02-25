"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIState = void 0;
var worldNames = ["NEWWORLD\\NEWWORLD.ZEN", "OLDWORLD\\OLDWORLD.ZEN", "ADDON\\ADDONWORLD.ZEN"];
var AIState = /** @class */ (function () {
    function AIState() {
        var _this = this;
        this.allPlayers = [];
        this.allBots = [];
        this.allPositions = {};
        worldNames.forEach(function (name) { return _this.allPositions[name] = {}; });
    }
    Object.defineProperty(AIState.prototype, "botMap", {
        get: function () {
            return this.allBots;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AIState.prototype, "positionMap", {
        get: function () {
            return this.allPositions;
        },
        enumerable: false,
        configurable: true
    });
    return AIState;
}());
exports.AIState = AIState;
