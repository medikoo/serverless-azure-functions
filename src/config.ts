export const configConstants = {
  bearer: "Bearer ",
  deploymentConfig: {
    container: "deployment-artifacts",
    rollback: true,
    runFromBlobUrl: false,
  },
  deploymentNameSuffix: "deployment",
  artifactNameSuffix: "artifact",
  functionAppApiPath: "/api/",
  functionAppDomain: ".azurewebsites.net",
  functionsAdminApiPath: "/admin/functions/",
  functionsApiPath: "/api/functions",
  funcCoreTools: "func",
  funcCoreToolsArgs: ["host", "start"],
  funcConsoleColor: "blue",
  jsonContentType: "application/json",
  logInvocationsApiPath: "/azurejobs/api/functions/definitions/",
  logOutputApiPath: "/azurejobs/api/log/output/",
  logStreamApiPath: "/api/logstream/application/functions/function/",
  masterKeyApiPath: "/api/functions/admin/masterkey",
  providerName: "azure",
  scmCommandApiPath: "/api/command",
  scmDomain: ".scm.azurewebsites.net",
  scmVfsPath: "/api/vfs/site/wwwroot/",
  scmZipDeployApiPath: "/api/zipdeploy"
};

export default configConstants;
