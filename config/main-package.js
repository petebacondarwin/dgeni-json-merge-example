const path = require('path');
const Package = require('dgeni').Package;
const base = require('dgeni-packages/base');
const nunjucks = require('dgeni-packages/nunjucks');

module.exports = new Package('main-package', [base, nunjucks])

.factory(require('./file-readers/jsonFileReader'))
.processor(require('./processors/mergeNavigation'))

.config(function(readFilesProcessor, jsonFileReader) {
  readFilesProcessor.fileReaders = [jsonFileReader];
  readFilesProcessor.basePath = path.resolve(__dirname, '../content');
  readFilesProcessor.sourceFiles = [
    'navigation.project-a.json',
    'navigation.project-b.json'
  ];
})

.config(function(computeIdsProcessor, computePathsProcessor, renderDocsProcessor, unescapeCommentsProcessor) {
  // we are doing our own rendering and so disable some basic processor that we don't need
  computeIdsProcessor.$enabled = false;
  computePathsProcessor.$enabled = false;
  renderDocsProcessor.$enabled = false;
  unescapeCommentsProcessor.$enabled = false;
})

.config(function(writeFilesProcessor) {
  writeFilesProcessor.outputFolder = path.resolve(__dirname, '../build');
});