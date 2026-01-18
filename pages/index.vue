<template>
  <Clang />
  <div class="user">
    <div class="content">
      <div class="search | flex justify-end items-center mb-4">
        <EBtn :text="t('add')" color="warn" @click="mode = 'add'; form.name = ''; form.age = ''; isLightbox = true" />
      </div>
      <ETable :columns="columns" :data="appStore.user.list" />
    </div>
    <ELightbox v-model:visible="isLightbox">
      <h4 class="text-xl font-bold mb-4">
        {{ mode === 'edit' ? t('edit') : mode === 'delete' ? t('delete') : t('add') }}
      </h4>
      <div v-if="mode !== 'delete'" class="space-y-4">
        <div v-for="field in fields" :key="field.key" class="space-y-1">
          <ETextField v-model="form[field.key]" :label="field.label" :placeholder="field.placeholder" />
          <div v-if="hasSubmitted && field.error" class="text-red-500 text-sm">{{ field.error }}</div>
        </div>
      </div>
      <div v-else class="mb-4">
        確定要刪除 "{{ editingUser?.name }}" 嗎？
      </div>
      <div class="mt-4 flex justify-end">
        <EBtn :text="t('cancel')" color="warn" @click="closeLightbox" />
        <EBtn :text="mode === 'delete' ? t('delete') : mode === 'add' ? t('add') : t('confirm')"
          :color="mode === 'delete' ? 'error' : 'success'" class="ml-2" @click="handleSubmit" />
      </div>
    </ELightbox>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { getUserList, postCreateUser, putUserInfo, deleteUser } from '@/utils/axios/useAxios'
import { useAppStore } from '@/store/app'

definePageMeta({
  name: 'index'
})

const { t, locale } = useI18n()
const appStore = useAppStore()
const isLightbox = ref(false)
const editingUser = ref<any>(null)
const mode = ref<'add' | 'edit' | 'delete'>('add')
const form = reactive({
  name: '',
  age: ''
})

const hasSubmitted = ref(false)

const nameError = computed(() => {
  if (!form.name.trim()) return '名字不能為空'
  if (form.name.length > 20) return '名字長度不能超過20個字符'
  if (!/^[a-zA-Z\u4e00-\u9fff]+$/.test(form.name.trim())) return '名字只能包含字母和中文字符'
  return ''
})

const ageError = computed(() => {
  const ageStr = String(form.age).trim()
  if (!form.age.trim()) return '年齡不能為空'
  const ageNum = parseInt(ageStr, 10)
  if (isNaN(ageNum) || ageNum < 1 || ageNum > 120) return '年齡必須是1-120的數字'
  return ''
})

const fields = [
  { key: 'name' as const, label: t('name'), placeholder: '請輸入名字', error: nameError },
  { key: 'age' as const, label: t('age'), placeholder: '請輸入年齡', error: ageError }
]

const isFormValid = computed(() => !nameError.value && !ageError.value)

const handleSubmit = async () => {
  if (mode.value === 'delete') {
    // 處理刪除
    try {
      await deleteUser(editingUser.value.id)
      await getUserList()
      closeLightbox()
    } catch (error) {
      console.error('刪除失敗:', error)
    }
  } else if (mode.value === 'add' && isFormValid.value) {
    // 處理新增
    try {
      await postCreateUser({ name: form.name, age: parseInt(form.age) })
      await getUserList()
      closeLightbox()
    } catch (error) {
      console.error('新增失敗:', error)
    }
  } else if (mode.value === 'edit' && isFormValid.value) {
    // 處理修改
    try {
      await putUserInfo({ id: editingUser.value.id, name: form.name, age: parseInt(form.age) })
      await getUserList()
      closeLightbox()
    } catch (error) { console.error('修改失敗:', error) }
  } else {
    hasSubmitted.value = true
  }
}

const closeLightbox = () => {
  isLightbox.value = false
  editingUser.value = null
  mode.value = 'add'
  form.name = ''
  form.age = ''
  hasSubmitted.value = false
}

const columns = [
  { key: 'id', label: '#', class: 'w-10% text-center' },
  { key: 'name', label: t('name'), class: 'w-45% text-center' },
  { key: 'age', label: t('age'), class: 'w-45% text-center' },
  {
    key: 'actions',
    label: t('operate'),
    class: 'w-50',
    actions: [
      { text: t('edit'), handler: (item: any) => { mode.value = 'edit'; editingUser.value = item; form.name = item.name; form.age = String(item.age); isLightbox.value = true } },
      { text: t('delete'), color: 'error' as const, handler: (item: any) => { mode.value = 'delete'; editingUser.value = item; isLightbox.value = true } }
    ]
  }
]

onMounted(async () => {
  try {
    await getUserList()
  } catch (error) {
    console.error('Failed to load user list:', error)
  }
})
</script>

<style scoped lang="scss">
.user {
  width: 100%;
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.content {
  max-width: 768px;
  width: 80%;
  max-height: 100%;
  align-self: flex-start;
  border: 1px solid #ededed;
  border-radius: 5px;
  padding: 20px;
}
</style>
