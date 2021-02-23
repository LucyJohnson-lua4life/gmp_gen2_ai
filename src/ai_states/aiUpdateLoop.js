"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var aiStates_1 = require("./aiStates");
var AiUpdateLoop = /** @class */ (function () {
    function AiUpdateLoop() {
        this._state = new aiStates_1.AIState();
    }
    Object.defineProperty(AiUpdateLoop.prototype, "state", {
        get: function () {
            return this._state;
        },
        enumerable: false,
        configurable: true
    });
    return AiUpdateLoop;
}());
