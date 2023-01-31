declare module "vue" {
  /**
   * 自定义全局组件获得 Volar 提示（自定义的全局组件需要在这里声明下才能获得 Volar 类型提示哦）
   */
  export interface GlobalComponents {
    IconifyIconOffline: typeof import("../src/components/icon")["IconifyIconOffline"];
    IconifyIconOnline: typeof import("../src/components/icon")["IconifyIconOnline"];
    FontIcon: typeof import("../src/components/icon")["FontIcon"];
    Auth: typeof import("../src/components/auth")["Auth"];
  }
}

/**
 * No need to install @vue/runtime-core
 */
declare module "vue" {
  export interface GlobalComponents {
    // ElAffix: typeof import("element-plus")["ElAffix"];
  }

  interface ComponentCustomProperties {
    // $message: typeof import("element-plus")["ElMessage"];
  }
}

export {};
