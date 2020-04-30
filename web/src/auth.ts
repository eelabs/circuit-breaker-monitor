import AWSAppSyncClient from "aws-appsync";
import config from "./config";

const authType: "API_KEY" = "API_KEY";

const authConfig = {
    type: authType,
    apiKey: config.apiKey
}

const client = new AWSAppSyncClient(
    {
        disableOffline: true,
        url: config.graphqlEndpoint,
        region: config.region,
        auth: authConfig
    }
)

export default client;