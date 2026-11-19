<template>
  <div>
    <UPageHero
      title="yhc52的个人网站"
      description="数学工具，以后还会有更多。。。"
      :links="[{
        label: '矩阵初等变换检查器',
        to: 'matrix-elementary-transformation-checker',
        trailingIcon: 'i-lucide-arrow-right',
        size: 'xl'
      }, {
        label: 'Github账号',
        to: 'https://github.com/yhc52/',
        target: '_blank',
        icon: 'i-simple-icons-github',
        size: 'xl',
        color: 'neutral',
        variant: 'subtle'
      }]"
    />

    <UPageSection
      id="features"
      title="网站内容介绍"
      description="数学工具，以后还会有更多。。。"
      :features="[{
        icon: 'i-lucide-rocket',
        title: '矩阵初等变换检查器',
        description: '高效、便捷、美观的矩阵初等变换检查器',
        to: 'matrix-elementary-transformation-checker'
      }, {
        icon: 'i-lucide-palette',
        title: '行列式初等变换检查器',
        description: '高效、便捷、美观的行列式初等变换检查器',
        to: 'determinant-elementary-transformation-checker'
      }, {
        icon: 'i-lucide-zap',
        title: 'Lightning fast',
        description: 'Optimized for performance with SSR/SSG support, automatic code splitting, and edge-ready deployment. Your users will love the speed.'
      }, {
        icon: 'i-lucide-blocks',
        title: '100+ components included',
        description: 'Access Nuxt UI\'s comprehensive component library. From forms to navigation, everything is accessible, responsive, and customizable.'
      }, {
        icon: 'i-lucide-code-2',
        title: 'Developer experience first',
        description: 'Auto-imports, hot module replacement, and TypeScript support. Write less boilerplate and ship more features.'
      }, {
        icon: 'i-lucide-shield-check',
        title: 'Built for scale',
        description: 'Enterprise-ready architecture with proper error handling, SEO optimization, and security best practices built-in.'
      }]"
    />
  </div>
</template>
