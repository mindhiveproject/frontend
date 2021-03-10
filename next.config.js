module.exports = {
  webpack: (config, { isServer, webpack }) => {
    if (!isServer) {
      config.node = {
        ...config.node,
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty',
      };
    }

    config.module.rules.push({
      test: /\.md$/,
      loader: 'frontmatter-markdown-loader',
      options: { mode: ['react-component'] },
    });

    return config;
  },
};
