<script lang="ts">
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    bodyText: {
      type: String,
      required: true
    }
  },

  methods: {
    handleUserOk() {
      this.$emit('confirmed')
    },
    handleUserCancel() {
      this.$emit('cancel')
    }
  }
}
</script>

<template>
  <div
    class="modal fade"
    id="modal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ title }}</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p>{{ bodyText }}</p>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            @click="handleUserCancel"
          >
            Cancel
          </button>
          <button type="button" class="btn btn-primary" @click="handleUserOk">Ok</button>
        </div>
      </div>
    </div>
  </div>
</template>
