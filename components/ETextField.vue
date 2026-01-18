<template>
  <div>
    <label :for="inputId">{{ props.label }}</label>
    <input :id="inputId" :placeholder="props.placeholder" :value="modelValue" @input="updateValue" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  id?: string // 若使用者有輸入，以使用者輸入的為主，若沒有請產出一個唯一 ID
  label?: string
  placeholder?: string
  modelValue?: string
}

interface Emits {
  (e: 'update:modelValue', value: string): void
}

const props = withDefaults(defineProps<Props>(), {})
const emit = defineEmits<Emits>()

const inputId = computed(() => props.id || `input-${Math.random().toString(36).substr(2, 9)}`)

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value.trim())
}
</script>

<style scoped lang="scss">
input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
}

label {
  display: block;
  margin-bottom: 4px;
  font-weight: 500;
  color: #333;
}
</style>
