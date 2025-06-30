import path from 'node:path'
import VueI18n from '@intlify/unplugin-vue-i18n/vite'
import { unheadVueComposablesImports } from '@unhead/vue'
import Vue from '@vitejs/plugin-vue'
import { visualizer } from 'rollup-plugin-visualizer'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import VueMacros from 'unplugin-vue-macros/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig, mergeConfig } from 'vite'
import { compression } from 'vite-plugin-compression2'
import { createHtmlPlugin } from 'vite-plugin-html'
import { VitePWA } from 'vite-plugin-pwa'
import VueDevTools from 'vite-plugin-vue-devtools'
import { version } from './package.json'

import 'vitest/config'

export default defineConfig(({ command }) => {
  // 通用配置
  const common = {
    envDir: './config/env',
    resolve: {
      alias: {
        '~/': `${path.resolve(__dirname, 'src')}/`,
      },
    },

    plugins: [
      VueMacros({
        plugins: {
          vue: Vue({
            include: [/\.vue$/, /\.md$/],
          }),
        },
      }),
      // https://github.com/posva/unplugin-vue-router
      VueRouter({
        extensions: ['.vue', '.md'],
        dts: 'src/typed-router.d.ts',
      }),
      // https://github.com/antfu/unplugin-auto-import
      AutoImport({
        include: [/\.[jt]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
        imports: [
          'vue',
          'vue-i18n',
          '@vueuse/core',
          unheadVueComposablesImports,
          VueRouterAutoImports,
          {
            // add any other imports you were relying on
            'vue-router/auto': ['useLink'],
          },
        ],
        dts: 'src/auto-imports.d.ts',
        dirs: [
          'src/composables',
          'src/stores',
        ],
        vueTemplate: true,
      }),
      // https://github.com/antfu/unplugin-vue-components
      Components({
        // allow auto load  components under `./src/components/`
        extensions: ['vue'],
        // allow auto import and register components
        include: [/\.vue$/, /\.vue\?vue/],
        dts: 'src/components.d.ts',
      }),
      // https://github.com/antfu/unocss
      // see uno.config.ts for config
      Unocss(),
      // https://github.com/antfu/vite-plugin-pwa
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.svg', 'safari-pinned-tab.svg'],
        manifest: {
          name: 'YuanShi',
          short_name: 'YuanShi',
          theme_color: '#ffffff',
          icons: [
            {
              src: '/pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: '/pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
            },
            {
              src: '/pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable',
            },
          ],
        },
      }),
      // https://github.com/intlify/bundle-tools/tree/main/packages/unplugin-vue-i18n
      VueI18n({
        runtimeOnly: true,
        compositionOnly: true,
        fullInstall: true,
        include: [path.resolve(__dirname, 'locales/**')],
      }),
      // https://github.com/webfansplz/vite-plugin-vue-devtools
      VueDevTools(),
      // 修改index.html
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            title: '元始引擎',
          },
          tags: [
            {
              injectTo: 'head',
              tag: 'meta',
              attrs: {
                name: 'version',
                content: version, // 通过ci/cd 传入 测试环境通过传入hash 生产直接通过package.json 获取
              },
            },
          ],
        },
      }),
    ],

    // https://github.com/vitest-dev/vitest
    test: {
      include: ['test/**/*.test.ts'],
      environment: 'jsdom',
    },
  }
  if (command === 'serve') {
    return mergeConfig(common, {
      // dev 独有配置
      plugins: [],
    })
  }
  else {
    // command === 'build'
    return mergeConfig(common, {
      // build 独有配置
      plugins: [
        compression({ include: [/\.(js)$/, /\.(css)$/, /\.(html)$/] }), // 构建产物压缩 gzip
        visualizer({
          emitFile: true,
          filename: 'stats.html',
        }), // 构建产物文件大小分析
      ],
      build: {
        sourcemap: true,
      },
    })
  }
})
