import { type Config } from "prettier";

const config: Config = {
  plugins: ["prettier-plugin-packagejson"],
  printWidth: 120,
  proseWrap: "always",
};

export default config;
