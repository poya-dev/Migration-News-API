module.exports = {
  apps: [
    {
      name: "API",
      script: "./build/server.js",
      exec_mode: "cluster",
      instances: "max",
    },
  ],
};
