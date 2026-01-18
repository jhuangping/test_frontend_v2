<template>
  <Teleport to="body">
    <Transition name="lightbox">
      <div v-if="visible" class="fixed inset-0 z-50 flex items-center justify-center">
        <!-- 遮罩 -->
        <div class="absolute inset-0 bg-black bg-opacity-50" @click="close"></div>
        <!-- 內容 -->
        <div class="relative bg-white rounded-lg shadow-lg max-w-lg w-full mx-4 max-h-[80dvh] overflow-auto">
          <!-- 關閉按鈕 -->
          <button class="absolute top-2 right-2 text-gray-500 hover:text-gray-700 border-none bg-transparent" @click="close">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          <!-- 自定義內容 -->
          <div class="p-6">
            <slot></slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
interface Props {
  visible: boolean
}

interface Emits {
  (e: 'update:visible', value: boolean): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const close = () => {
  emit('update:visible', false)
}
</script>

<style scoped>
.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 0.3s ease;
}

.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}
dialog::backdrop {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>