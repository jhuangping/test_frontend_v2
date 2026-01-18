<template>
  <button class="e-btn px-2 py-1 rounded-md" :class="`e-btn--${props.color || 'success'}`">
    {{ props.text }}
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  text?: string // 若有輸入時以此為主，若沒有就顯示 slot
  color?: 'success' | 'error' | 'warn' // 預設為 success
}

const props = withDefaults(defineProps<Props>(), {})
</script>

<style scoped lang="scss">
.e-btn {
  line-height: 1;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  user-select: none;
  border: none;
  transition: all .5s ease;
  isolation: isolate;

  // border-radius: 5px;
  // success 綠
  &--success {
    color: #fff;
    background: #0D861C;

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background: #0a6b15;
      }
    }
  }

  // error 紅
  &--error {
    color: #fff;
    background: #AD1C1F;

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background: #8a1517;
      }
    }
  }

  // warn 黃
  &--warn {
    background: #FCC134;

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background: #e6a82e;
      }
    }
  }
}
</style>
