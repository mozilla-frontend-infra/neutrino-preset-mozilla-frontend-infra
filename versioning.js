const { basename, extname } = require('path');

module.exports = (neutrino, { cacheVersion = 'v1' }) => {
  neutrino.config.when(process.env.NODE_ENV === 'production', config => {
    config.output
      .filename(`[name].[chunkhash].${cacheVersion}.js`)
      .chunkFilename(`[name].[chunkhash].${cacheVersion}.js`)
      .end()
      .plugin('named-chunks')
      .tap(([fn]) => [
        chunk => {
          if (chunk.name) {
            return chunk.name;
          }

          const filename = fn(chunk);
          const ext = extname(filename);

          return `${basename(filename, ext)}.${cacheVersion}${ext}`;
        },
      ]);
  });
};
