/** @type {import("syncpack").RcFile} */
export default {
  versionGroups: [
    {
      label: "Internal @workspace packages use workspace:*",
      dependencies: ["@workspace/**"],
      packages: ["**"],
      dependencyTypes: ["dev", "prod"],
      pinVersion: "workspace:*",
    },
  ],
}
