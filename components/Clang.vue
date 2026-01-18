<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const open = ref(false)
const toggleOpen = () => { open.value = !open.value }
const close = () => { open.value = false }

const handleClickOutside = (event: MouseEvent) => {
  const langEl = document.querySelector('.lang')
  if (langEl && !langEl.contains(event.target as Node)) {
    close()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

const languages = [
  { code: 'zh-TW', label: '繁體中文' },
  { code: 'en-US', label: 'English' }
]
</script>

<template>
  <div class="lang fixed top-[8px] right-[10px] inline-block">
    <div class="lang__toggle cursor-pointer px-3 py-1 rounded" @click="toggleOpen">🌐 {{ t('language') }}</div>
    <div class="lang__list absolute mt-2 left-1/2 w-[90px] bg-white border border-gray-200 rounded shadow-lg flex flex-col" :class="{ 'hidden': !open }">
      <NuxtLinkLocale v-for="item in languages" :key="item.code" to="/" :locale="item.code" class="lang__link px-3 py-2 text-sm" :class="{ 'bg-gray-200 font-bold': locale === item.code }" @click="open = false" >{{ item.label }}</NuxtLinkLocale>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.lang {
  transition: background .5s ease;

  &__list {
    opacity: 1;
    transform: translate(-50%, 0);
    transition: opacity .5s ease, transform .5s ease;
    pointer-events: auto;
    &.hidden {
      pointer-events: none;
      opacity: 0;
      transform: translate(-50%, -10px);
    }
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover{
      background: #ededed;
    }

    &__link:hover {
      background: #ededed;
    }
  }
}
</style>