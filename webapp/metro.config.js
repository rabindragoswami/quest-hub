const path = require('node:path');
const { getDefaultConfig } = require('expo/metro-config');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '..');
const config = getDefaultConfig(projectRoot);

config.watchFolders = [workspaceRoot];
config.resolver.nodeModulesPaths = [
  path.join(projectRoot, 'node_modules'),
  path.join(workspaceRoot, 'pilotapp', 'node_modules'),
  path.join(workspaceRoot, 'geographyapp', 'node_modules'),
];
config.resolver.disableHierarchicalLookup = true;

module.exports = config;
