module.exports = function jsonFileReader() {
  return {
    name: 'jsonFileReader',
    defaultPattern: /\.json$/,
    getDocs: function(fileInfo) {
      return [{
        docType: 'json',
        data: JSON.parse(fileInfo.content)
      }];
    }
  };
};