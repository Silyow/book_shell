module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'semi': ['error', 'always'],//行尾分号配置
    'space-before-function-paren': 0,//去掉函数名后的空格
    // "no-irregular-whitespace":"off",//禁止空格检查报错
    "quotes": "off",//引号类型
    "eqeqeq": "off",//使用"==="和"!=="
    "no-unused-vars": "off",// 关闭未使用的变量提示
  }
};
