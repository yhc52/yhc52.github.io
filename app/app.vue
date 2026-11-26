<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'zh-CN'
  }
});

const title = 'yhc52的个人网站';
const description = '数学工具，以后还有更多。。。';

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: 'https://ui.nuxt.com/assets/templates/nuxt/starter-light.png',
  twitterCard: 'summary_large_image'
});

const items = ref<NavigationMenuItem[]>([
  {
    label: '个人博客',
    icon: 'i-lucide-book-open',
    // to: '/blogs',
    children: [
      {
        label: 'Introduction',
        description: '暂未完善。。。',
        icon: 'i-lucide-house'
      }
    ]
  },
  {
    label: '数学工具',
    icon: 'i-lucide-database',
    // to: '/math-tools',
    children: [
      {
        label: '矩阵初等变换检查器',
        icon: 'i-lucide-file-text',
        description: '高效、便捷、美观的矩阵初等变换检查器',
        to: '/math-tools/matrix-elementary-transformation-checker'
      },
      {
        label: '行列式初等变换检查器',
        icon: 'i-lucide-file-text',
        description: '高效、便捷、美观的行列式初等变换检查器',
        to: '/math-tools/determinant-elementary-transformation-checker'
      },
      {
        label: '初等变换法求矩阵的逆检查器',
        icon: 'i-lucide-file-text',
        description: '编不下去了。。。',
        to: '/math-tools/inverse-matrix-checker'
      }
    ]
  }
]);
</script>

<template>
  <UApp>
    <UHeader>
      <template #title>
        <NuxtLink
          to="/"
          class="focus-visible:outline-3 outline-primary/25 rounded-md p-1 -ms-1"
        >
          <AppLogo class="w-auto h-6 shrink-0" />
        </NuxtLink>
      </template>

      <UNavigationMenu content-orientation="vertical" :items="items" />

      <template #body>
        <UNavigationMenu content-orientation="vertical" orientation="vertical" :items="items" />
      </template>

      <template #right>
        <UColorModeButton />

        <UButton
          to="https://github.com/yhc52/yhc52.github.io/"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
          color="neutral"
          variant="ghost"
        />
      </template>
    </UHeader>

    <UMain>
      <NuxtPage />
    </UMain>

    <USeparator icon="i-simple-icons-nuxtdotjs" />

    <UFooter>
      <template #left>
        <p class="text-sm text-muted">
          Built with Nuxt UI • © 2026 yhc52
        </p>
      </template>

      <template #right>
        <UButton
          to="https://github.com/yhc52/yhc52.github.io/"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
          color="neutral"
          variant="ghost"
        />
      </template>
    </UFooter>
  </UApp>
</template>
