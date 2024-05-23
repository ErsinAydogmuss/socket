import sdk from "node-appwrite";

export const client = new sdk.Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("663976bf001ab9e257ed")
  .setKey(
    "63836bdff825c539d9398703dc8c47564199cef0a90171985b8e74234f7ad3e04c03dd51cad86eedfa78a5a084c0239789d42f4528348a0d7515826f9c589a3c7215f6696eaddd2b00704eb7df0a4b0413f120bbb37b14a59ce4ab4f392c537fe2e07d6c8b7a2568757fcbb0c3ee12813988563b21538f56032b37bf24f77d43"
  );
export { ID, Query } from "node-appwrite";
export const database = new sdk.Databases(client);
