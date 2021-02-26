"use strict";
exports.__esModule = true;
exports.Wolf = void 0;
var heap_js_1 = require("heap-js");
var npcInits_1 = require("./npcInits");
var Wolf = /** @class */ (function () {
    function Wolf() {
        this.id = revmp.createBot(npcInits_1.INSTANCE_WOLF);
        ;
        this.isDead = false;
        this.isUnconscious = false;
        this.enemyIds = [];
        this.friendIds = [];
        this.respawnTime = 240;
        this.nextActions = new heap_js_1["default"](function (a, b) { return a.priority - b.priority; });
        this.aiFlags = {};
    }
    Wolf.prototype.executeNextAction = function () {
        console.log("Nothing implemented yet.");
    };
    Wolf.prototype.onNpcHitted = function (aiNpcId, attackerId) {
        console.log("Nothing implemented yet.");
    };
    return Wolf;
}());
exports.Wolf = Wolf;
