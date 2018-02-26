const path = require('path');
const fs = require('fs');
const jsonpointer = require('json-pointer')

module.exports = function processNavigation() {
  return {
    $runAfter: ['files-read'],
    $runBefore: ['writing-files'],
    $process(docs) {
      docs.forEach(doc => {
        if (doc.docType === 'json') {
          doc.renderedContent = JSON.stringify(processJson(doc.data, doc.fileInfo.basePath), null, 2);
          doc.outputPath = doc.fileInfo.projectRelativePath;
        }
      });
    }
  }
}

function processJson(data, basePath) {
  if (data._extends) {
    const [filePath, jsonPath] = data._extends.split('#');
    const baseData = JSON.parse(fs.readFileSync(path.resolve(basePath, filePath), 'utf8'));
    const base = processJson(baseData, basePath);
    jsonpointer.set(base, jsonPath, data._data);
    return base;
  } else {
    return data;
  }
}