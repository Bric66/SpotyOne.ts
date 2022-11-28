import type { Config } from "@jest/types";
// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  "collectCoverage": true,
<<<<<<< HEAD
    "coverageReporters": ["json", "html"]
=======
  "coverageReporters": ["json", "html"]
>>>>>>> dev
};
export default config;