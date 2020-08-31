module.exports = {
  resolve: {
    extensions: [".wasm", ".mjs", ".js", ".jsx", ".ts", ".tsx", ".json"],
    alias: {
      "@": resolvePath("src"),
    }
  },
}
