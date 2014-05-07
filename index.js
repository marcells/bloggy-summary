'use strict';

var minidom = require('minidom');

exports.init = function (engine) {
    var original = engine.loadContent;

    engine.loadContent = function (content, callback) {
        original(content, function (transformedContent) {
            var dom = minidom(transformedContent);

            console.log("Yeah!!")
            console.log(dom.textContent);

            callback(transformedContent);
        });
    };
};