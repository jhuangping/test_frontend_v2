<template>
  <div class="pagination">
    <button class="pagination__btn" @click="prevPage" :disabled="currentPage === 1">
      &lt;
    </button>
    <button class="pagination__btn" v-for="page in pages" :key="page" @click="goToPage(page)"
      :class="{ 'pagination__btn--active': page === currentPage }">
      {{ page }}
    </button>
    <button class="pagination__btn" @click="nextPage" :disabled="currentPage === totalPages">
      &gt;
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  currentPage: number;
  totalPages: number;
}>();

const emit = defineEmits(['update:currentPage']);

const pages = computed(() => {
  const pagesArray = [];
  for (let i = 1; i <= props.totalPages; i++) {
    pagesArray.push(i);
  }
  return pagesArray;
});

const goToPage = (page: number) => {
  if (page >= 1 && page <= props.totalPages) {
    emit('update:currentPage', page);
  }
};

const prevPage = () => {
  if (props.currentPage > 1) {
    emit('update:currentPage', props.currentPage - 1);
  }
};

const nextPage = () => {
  if (props.currentPage < props.totalPages) {
    emit('update:currentPage', props.currentPage + 1);
  }
};
</script>

<style scoped lang="scss">
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;

  &__btn {
    width: 30px;
    height: 30px;
    border: 1px solid #ccc;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    user-select: none;
    margin: 0 2px;
    border-radius: 4px;
    font-weight: bold;
    color: #333;
    transition: background .5s ease, color .5s ease;

    &--active {
      background-color: #007bff;
      color: #fff;
      border-color: #007bff;
    }

    &:disabled {
      opacity: .3;
      pointer-events: none;
    }

    @media (hover: hover) and (pointer: fine) {
      &:hover:not(.pagination__btn--active):not(:disabled) {
        background-color: #f0f0f0;
      }
    }
  }
}
</style>