<template>
  <div>
    <div v-if="!isLoading">
      <div class="description" style="max-width: 650px; margin-bottom: 40px">
        <h1 class="text-center">Welcome to the Visitor Accounting Service</h1>
        <p class="text-center">This service allows you to manage and track visitor information.</p>
      </div>
      <div class="table-responsive">
        <table class="table table-striped">
          <thead>
            <tr>
              <th
                scope="col"
                @click="sortTable('index')"
                :class="{
                  'cursor-pointer': true,
                  sorted: sortColumn === 'index',
                  asc: sortColumn === 'index' && sortDirection === 'asc',
                  desc: sortColumn === 'index' && sortDirection === 'desc'
                }"
              >
                №
                <span class="sort-icon">
                  <i
                    class="bi bi-caret-up-fill"
                    v-if="sortColumn === 'index' && sortDirection === 'asc'"
                  ></i>
                  <i
                    class="bi bi-caret-down-fill"
                    v-if="sortColumn === 'index' && sortDirection === 'desc'"
                  ></i>
                  <IconCaretSort v-if="sortColumn !== 'index'" style="width: 16px; height: 16px" />
                </span>
              </th>
              <th
                scope="col"
                @click="sortTable('firstName')"
                :class="{
                  'cursor-pointer': true,
                  sorted: sortColumn === 'firstName',
                  asc: sortColumn === 'firstName' && sortDirection === 'asc',
                  desc: sortColumn === 'firstName' && sortDirection === 'desc'
                }"
              >
                First Name
                <span class="sort-icon">
                  <i
                    class="bi bi-caret-up-fill"
                    v-if="sortColumn === 'firstName' && sortDirection === 'asc'"
                  ></i>
                  <i
                    class="bi bi-caret-down-fill"
                    v-if="sortColumn === 'firstName' && sortDirection === 'desc'"
                  ></i>
                  <IconCaretSort
                    v-if="sortColumn !== 'firstName'"
                    style="width: 16px; height: 16px"
                  />
                </span>
              </th>
              <th
                scope="col"
                @click="sortTable('lastName')"
                :class="{
                  'cursor-pointer': true,
                  sorted: sortColumn === 'lastName',
                  asc: sortColumn === 'lastName' && sortDirection === 'asc',
                  desc: sortColumn === 'lastName' && sortDirection === 'desc'
                }"
              >
                Last Name
                <span class="sort-icon">
                  <i
                    class="bi bi-caret-up-fill"
                    v-if="sortColumn === 'lastName' && sortDirection === 'asc'"
                  ></i>
                  <i
                    class="bi bi-caret-down-fill"
                    v-if="sortColumn === 'lastName' && sortDirection === 'desc'"
                  ></i>
                  <IconCaretSort
                    v-if="sortColumn !== 'lastName'"
                    style="width: 16px; height: 16px"
                  />
                </span>
              </th>
              <th
                scope="col"
                @click="sortTable('createdAt')"
                :class="{
                  'cursor-pointer': true,
                  sorted: sortColumn === 'createdAt',
                  asc: sortColumn === 'createdAt' && sortDirection === 'asc',
                  desc: sortColumn === 'createdAt' && sortDirection === 'desc'
                }"
              >
                Enter Date
                <span class="sort-icon">
                  <i
                    class="bi bi-caret-up-fill"
                    v-if="sortColumn === 'createdAt' && sortDirection === 'asc'"
                  ></i>
                  <i
                    class="bi bi-caret-down-fill"
                    v-if="sortColumn === 'createdAt' && sortDirection === 'desc'"
                  ></i>
                  <IconCaretSort
                    v-if="sortColumn !== 'createdAt'"
                    style="width: 16px; height: 16px"
                  />
                </span>
              </th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in sortedVisitors" :key="item.id">
              <td>{{ item.index }}</td>
              <td>{{ item.firstName }}</td>
              <td>{{ item.lastName }}</td>
              <td>{{ dayjs(item.createdAt).format('MMM D, YYYY h:mm A') }}</td>
              <td class="d-flex gap-3">
                <button
                  @click="() => handleRemoveBtnClick(item.id)"
                  type="button"
                  class="btn btn-danger flex-item"
                >
                  Remove
                </button>
                <button
                  @click="updateVisitor(item.id)"
                  type="button"
                  class="btn btn-primary flex-item"
                >
                  Edit
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="d-flex justify-content-center mt-3">
        <router-link to="/add-visitor" class="btn btn-primary">Add New Visitor</router-link>
      </div>
    </div>
    <ConfirmationModal
      title="visitor delete"
      body-text="Are you sure you want to delete the visitor?"
      @confirmed="handleVisitorDeleteOk"
      @cancel="handleVisitorDeleteCancel"
    />
  </div>
</template>

<script lang="ts">
import dayjs from 'dayjs'
import { visitorApi } from '@/services'
import type { VisitorData } from '@/common'
import IconCaretSort from '@/components/icons/IconCaretSort.vue'
import { useToast } from 'vue-toast-notification'
import { onMounted, reactive, ref } from 'vue'
import ConfirmationModal from '@/components/ConfirmationModal.vue'
import * as bootstrap from 'bootstrap'

interface State {
  modal: bootstrap.Modal | null
}

export default {
  components: { ConfirmationModal, IconCaretSort },
  computed: {
    dayjs() {
      return dayjs
    },
    sortedVisitors(): (VisitorData & { index: number })[] {
      const sorted = this.visitors.slice().sort((a, b) => {
        if (this.sortColumn === 'index') {
          return a.index - b.index
        } else if (this.sortColumn === 'firstName') {
          return a.firstName.localeCompare(b.firstName)
        } else if (this.sortColumn === 'lastName') {
          return a.lastName.localeCompare(b.lastName)
        } else if (this.sortColumn === 'createdAt') {
          const date1 = dayjs(a.createdAt)
          const date2 = dayjs(b.createdAt)
          return date1.diff(date2, 'second')
        }
        return 0
      })

      if (this.sortDirection === 'desc') {
        sorted.reverse()
      }

      return sorted
    }
  },
  setup() {
    const deleteVisitorId = ref<string | null>(null)
    const isLoading = ref(true)

    const state = reactive<State>({
      modal: null
    })

    onMounted(() => {
      state.modal = bootstrap.Modal.getOrCreateInstance(
        document.querySelector('#modal') as Element,
        {}
      )
    })

    function openModal() {
      if (state.modal) {
        state.modal.show()
        return
      }

      throw 'failed to setup modal'
    }

    function closeModal() {
      if (state.modal) {
        state.modal.hide()
        return
      }

      throw 'failed to setup modal'
    }

    return {
      openModal,
      closeModal,
      isLoading,
      deleteVisitorId
    }
  },
  data() {
    return {
      visitors: [] as (VisitorData & { index: number })[],
      sortColumn: 'index',
      sortDirection: 'asc'
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    handleVisitorDeleteCancel() {
      this.deleteVisitorId = null
      this.closeModal()
    },

    handleRemoveBtnClick(id: string) {
      this.deleteVisitorId = id
      this.openModal()
    },

    handleVisitorDeleteOk() {
      const { deleteVisitorId } = this

      if (deleteVisitorId) {
        this.removeVisitor(deleteVisitorId).finally(() => {
          this.deleteVisitorId = null
          this.closeModal()
        })
      }
    },

    async getData() {
      const loader = this.$loading.show({
        canCancel: false,
        isFullPage: true
      })

      try {
        const { data } = await visitorApi.getAll()
        this.visitors = data.map((visitor, visitorIndex) => ({
          ...visitor,
          index: visitorIndex + 1
        }))
      } catch (error) {
        console.error(error)
      } finally {
        loader.hide()
        this.isLoading = false
      }
    },
    async updateVisitor(id: string) {
      this.$router.push(`/update/${id}`)
    },

    async removeVisitor(id: string) {
      const $toast = useToast()

      const loader = this.$loading.show({
        canCancel: false,
        isFullPage: true
      })

      this.isLoading = true

      visitorApi
        .delete(id)
        .then(() => {
          this.visitors = this.visitors.filter(({ id: visitorId }) => visitorId !== id)
          $toast.success('Visitor deleted successfully')
        })
        .catch((error) => {
          console.error(error)
          $toast.success('Visitor deletion failed')
        })
        .finally(() => {
          loader.hide()
          this.isLoading = false
        })
    },
    sortTable(column: string) {
      if (this.sortColumn === column) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc'
      } else {
        this.sortDirection = 'asc'
      }

      this.sortColumn = column
    }
  }
}
</script>
