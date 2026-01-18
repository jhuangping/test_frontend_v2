<template>
  <table class="e-table w-full">
    <thead>
      <tr>
        <th v-for="col in columns" :key="col.key" :class="col.class">{{ col.label }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in data" :key="item.id">
        <td v-for="col in columns" :key="col.key" :class="col.class">
          <span v-if="col.key !== 'actions'">{{ item[col.key] }}</span>
          <div v-else class="flex gap-1">
            <eBtn v-for="action in col.actions" :key="action.text" :text="action.text" :color="action.color" @click="action.handler(item)" />
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import EBtn from '~/components/EBtn.vue'

interface Column {
  key: string
  label: string
  class?: string
  actions?: Array<{
    text: string
    color?: 'success' | 'error' | 'warn'
    handler: (item: any) => void
  }>
}

interface Props {
  columns: Column[]
  data: any[]
}

const props = defineProps<Props>()
</script>

<style scoped lang="scss">
.e-table {
  thead {
    tr:last-child th {
      border-bottom: 1px solid #ccc;
      padding-bottom: 5px;
    }
  }
  tbody {
    tr {
      &:not(:last-child) td {
        border-bottom: 1px solid #ededed;
      }

      @media (hover: hover) and (pointer: fine) {
        &:hover td {
          background: #ededed;
        }
      }
    }

    td {
      padding: 5px;
      transition: background .5s ease;
    }
  }
}
</style>