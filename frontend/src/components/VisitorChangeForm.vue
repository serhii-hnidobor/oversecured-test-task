<template>
  <div>
    <form
      @submit.prevent="submitForm"
      class="d-flex flex-column align-items-center"
      style="gap: 10px"
      v-if="!isLoading"
    >
      <h1 class="text-center">{{ headingText }}</h1>
      <div class="form-group">
        <label for="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          v-model="visitor.firstName"
          required
          class="form-control"
        />
      </div>
      <div class="form-group">
        <label for="lastName">Last Name:</label>
        <input type="text" id="lastName" v-model="visitor.lastName" required class="form-control" />
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script lang="ts">
import { ref, watch, onMounted } from 'vue'
import { AxiosResponse } from 'axios'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toast-notification'
import { useLoading } from 'vue-loading-overlay'
import { visitorApi } from '@/services'

export default {
  props: {
    id: {
      type: String,
      required: false
    }
  },
  setup(props) {
    const router = useRouter()
    const visitor = ref({
      firstName: '',
      lastName: ''
    })

    const isLoading = ref(true)

    const loaderApi = useLoading()

    const $toast = useToast()

    const fetchVisitorData = async () => {
      const loader = loaderApi.show({
        canCancel: false,
        isFullPage: true
      })

      if (!props.id) {
        loader.hide()
        isLoading.value = false
        return
      }

      try {
        const { data: visitorData } = await visitorApi.getById(props.id)
        visitor.value.firstName = visitorData.firstName
        visitor.value.lastName = visitorData.lastName
      } catch (error) {
        console.error(error)
      } finally {
        loader.hide()
        isLoading.value = false
      }
    }

    const submitForm = () => {
      let responsePromise: Promise<AxiosResponse>

      const loader = loaderApi.show({
        canCancel: false,
        isFullPage: true
      })

      const payload = {
        firstName: visitor.value.firstName,
        lastName: visitor.value.lastName
      }

      if (props.id) {
        responsePromise = visitorApi.update(payload, props.id)
      } else {
        responsePromise = visitorApi.create(payload)
      }

      responsePromise
        .then(() => {
          $toast.success(props.id ? 'Visitor edited successfully' : 'Visitor created successfully')
          router.push('/')
        })
        .catch((error) => {
          console.error(error)
          $toast.error(error?.message || 'Unknown error')
        })
        .finally(() => loader.hide())
    }

    watch(
      () => props.id,
      () => {
        visitor.value.firstName = ''
        visitor.value.lastName = ''
        fetchVisitorData()
      }
    )

    const headingText = props.id ? 'Edit visitor' : 'Add visitor'

    onMounted(() => {
      fetchVisitorData()
    })

    return {
      visitor,
      submitForm,
      headingText,
      isLoading
    }
  }
}
</script>
