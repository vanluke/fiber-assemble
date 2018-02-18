export default function (path) {
  return function stats() {
    this.plugin('done', function onDone(stats) {
      require('fs')
        .writeFileSync(
           path, JSON.stringify(stats.toJson().assetsByChunkName)
        );
    });
  }
}
