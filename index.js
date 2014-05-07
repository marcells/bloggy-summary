'use strict';

var minidom = require('minidom'),
    htmlencode = require('node-htmlencode'),
    makeSummary = function (content, maxLength, prefix, suffix) {
        var summary = content
            .substr(0, content.lastIndexOf(' ', maxLength));

        return prefix + htmlencode.htmlEncode(summary).replace(/&#10;/g, '<br />') + suffix;
    };

exports.maxLength = 300;
exports.prefix = '<p>';
exports.suffix = ' ...<p>';

exports.init = function (engine) {
    var original = engine.loadContent;

    engine.loadContent = function (entry, content, callback) {
        original(content, function (transformedContent) {
            var dom = minidom('<div>' + transformedContent + '</div>'),
                text = dom.children[0].textContent;

            entry.summary = makeSummary(text, exports.maxLength, exports.prefix, exports.suffix);

            callback(transformedContent);
        });
    };
};