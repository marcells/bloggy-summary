'use strict';

var minidom = require('minidom'),
    htmlencode = require('node-htmlencode'),
    mergeLineBreaksAndConvertToTags = function (htmlEncodedContent) {
        return htmlEncodedContent.replace(/&#10;{2,}/gm, '$1<br />');
    },
    makeSummary = function (content, maxLength, prefix, suffix) {
        var summary = content
            .substr(0, content.lastIndexOf(' ', maxLength));

        return prefix + mergeLineBreaksAndConvertToTags(htmlencode.htmlEncode(summary)) + suffix;
    },
    makeMetaDescription = function (content) {
        var minimumMetaDescriptionLengthToNextSpace = 180; // http://webdesign.about.com/od/metatags/qt/meta_descriptio.htm

        return content
                .replace(/\"/g, '\'')
                .substr(0, content.indexOf(' ', minimumMetaDescriptionLengthToNextSpace))
                .concat('...');
    };

exports.maxLength = 300;
exports.prefix = '<p>';
exports.suffix = ' ...<p>';

exports.init = function (engine) {
    var original = engine.loadContent;

    engine.loadContent = function (entry, content, callback) {
        original(entry, content, function (transformedContent) {
            var dom = minidom('<div>' + transformedContent + '</div>'),
                text = dom.children[0].textContent;

            entry.summary = makeSummary(text, exports.maxLength, exports.prefix, exports.suffix);
            entry.metaDescription = makeMetaDescription(text);

            callback(transformedContent);
        });
    };
};
