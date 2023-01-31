# 初始化 vite + vue3 项目

## 初始化

- 初始化项目
  - `npm create vite@latest -- YourProject --template vue-ts`
- 增加 husky
  - `npm install husky -D`
  - package.json 的 scripts 添加`"prepare": "husky install"`
  - `npm install`后即可自动创建 .husky 文件夹
  - 向 .husky 添加 hooks
- 增加 vscode 配置
  - 删除 .gitignore 的 .vscode 内容
  - 向 .husky 添加 launch.json 和 settings.json
- 增加 build 文件夹
  - build 文件夹存放着打包的配置文件
- 增加 mock 文件夹
  - mock 文件夹存放着模拟数据文件
- 在 public 文件夹添加前端配置
  - 增加 config.json
- 增加 types 文件夹
  - types 文件夹存放着 interface 和 type 等类型定义
- 增加代码风格质量校验
  - package.json 的 scripts 添加下列命令
  ```json
  "lint:eslint": "eslint --max-warnings 0  \"{src,mock,build}/**/*.{vue,js,ts,tsx}\" --fix",
  "lint:prettier": "prettier --write  \"src/**/*.{js,ts,json,tsx,css,less,scss,vue,html,md}\"",
  "lint:stylelint": "stylelint --fix \"**/*.{vue,css,scss,postcss,less}\"",
  "lint": "npm run lint:eslint && npm run lint:prettier && npm run lint:stylelint"
  ```
  - eslint
    - `npm install @typescript-eslint/eslint-plugin @typescript-eslint/parser @vue/eslint-config-prettier @vue/eslint-config-typescript eslint eslint-plugin-prettier eslint-plugin-vue vue-eslint-parser -D`
    - 添加 .eslintignore 和 .eslintrc.js
  - prettier
    - `npm install @vue/eslint-config-prettier eslint-plugin-prettier prettier stylelint-config-prettier -D`
    - 添加 .prettierrc.js
    - 删除 package.json 的 type
  - stylelint
    - `npm install stylelint stylelint-config-html stylelint-config-prettier stylelint-config-recommended stylelint-config-standard stylelint-order -D`
    - 添加 .stylelintignore 和 stylelint.config.js
  - 其他配置
    - .editorconfig
    - commitlint
      - `npm install @commitlint/cli @commitlint/config-conventional -D`
      - commitlint.config.js
    - postcss
      - `npm install postcss postcss-html postcss-import postcss-scss autoprefixer cssnano -D`
      - postcss.config.js
    - tailwind
      - `npm install tailwindcss -D`
      - tailwind.config.js
- 安装 vite 依赖
  - `npm install vite-plugin-cdn-import vite-plugin-compression @vitejs/plugin-vue @vitejs/plugin-vue-jsx vite-plugin-mock vite-svg-loader rollup-plugin-visualizer unplugin-vue-define-options vite-plugin-remove-console -D`
- 安装开发依赖
  - `npm install @iconify/vue @iconify-icons/ep @iconify-icons/ri cross-env rimraf sass sass-loader -D`
- 安装 vue 依赖
  - `npm install vant @vueuse/core vue-demi vue-router pinia`
- 安装其他依赖
  - `npm install mitt dayjs axios echarts mockjs js-cookie`
- 增加 env 环境变量
- 修改 tsconfig.json 和 vite.config.ts 和 main.ts
