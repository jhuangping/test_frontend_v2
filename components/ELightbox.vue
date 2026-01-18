<template>
  <dialog ref="dialogRef" class="w-full flex items-center justify-center">
    <Transition name="lightbox">
      <div v-if="visible" class="relative bg-white rounded-lg shadow-lg max-w-lg w-80% mx-4 max-h-[80dvh]">
        <!-- 關閉按鈕 -->
        <button class="absolute top-2 right-2 text-gray-500 hover:text-gray-700 border-none bg-transparent"
          @click="close">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <!-- 自定義內容 -->
        <div class="p-6">
          <slot></slot>
        </div>
      </div>
    </Transition>
  </dialog>
</template>

<script setup lang="ts">
const dialogRef = ref<HTMLDialogElement | null>(null)

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

watch(() => props.visible, (newVal) => {
  if (newVal) {
    dialogRef.value?.showModal()
  } else {
    dialogRef.value?.close()
  }
})
</script>

<style lang="scss" scoped>
.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 0.3s ease;
}

.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}

dialog {
  background-color: transparent;
  border: none;
  padding: 0;

  &::backdrop {
    background-color: rgba(0, 0, 0, 0.5);
  }
}
</style>