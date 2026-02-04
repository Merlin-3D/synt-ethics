module.exports = {
  apps: [
    {
      name: 'synt-ethics-website',
      script: './build/bin/server.js',
      instances: 'max',
      exec_mode: 'cluster',
      autorestart: true,
    },
  ],
}
