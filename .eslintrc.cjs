module.exports = {
  root: true,
  extends: ["next/core-web-vitals"],
  env: {
    browser: true,
    node: true,
    es2022: true
  },
  globals: {
    React: "readonly"
  },
  rules: {
    "no-undef": "off"
  }
};
