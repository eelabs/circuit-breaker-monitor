const fs = require("fs");

function handler(data, serverless) {
  const authConfig = {
    apiKey: data['GraphQlApiKeyDefault'],
    graphqlEndpoint: data['GraphQlApiUrl'],
    region: serverless.getProvider('aws').getRegion()
  };
  const content = "const authConfig = " + JSON.stringify(authConfig, null, 2) + ";\n\nexport default authConfig;";

  fs.writeFileSync('./web/src/config.js', content);
}

module.exports = { handler };