<template>
  <div class="box has-text-grey">
    <p class="is-size-4 has-text-weight-bold mbm">Create New Item</p>
    <form @submit.prevent="onSubmit">
      <div class="columns">
        <div class="file column is-7 has-name is-boxed mrm">
          <label class="label has-text-grey">Image</label>
          <label class="file-label">
            <input
              class="file-input"
              type="file"
              ref="image"
              @input="onInputImage"
            >
            <span class="file-cta">
              <figure
                class="image"
                v-if="image.url"
              >
                <img :src="image.url">
              </figure>
              <template v-else>
                <span class="file-icon mtl">
                  <i class="fas fa-upload"></i>
                </span>
                <span class="file-label">
                  Choose an image file…
                </span>
              </template>
            </span>
            <span class="file-name">
              {{image.filename}}
            </span>
          </label>
        </div>
        <div class="column">
          <div class="field">
            <label class="label has-text-grey">
              Name
            </label>
            <input
              type="text"
              class="input"
              v-model="name"
              required
            >
          </div>
          <div class="field">
            <label class="label has-text-grey">
              Stock
            </label>
            <input
              type="number"
              class="input"
              min="0"
              v-model="stock"
            >
          </div>
          <div class="field">
            <label class="label has-text-grey">
              Price
            </label>
            <input
              type="number"
              class="input"
              min="0"
              v-model="price"
            >
          </div>
          <button class="button is-success is-fullwidth mtl">Save</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import api from '../api.js'

export default {
  name: 'ItemFormCreate',
  props: {
    token: String,
    item: Object
  },
  data: function () {
    return {
      id: '',
      name: '',
      stock: 1,
      price: 0,
      image: {
        url: '',
        filename: ''
      },
      isImageChange: false
    }
  },
  watch: {
    item: function () {
      this.id = this.item._id
      this.name = this.item.name
      this.stock = this.item.stock
      this.price = this.item.price
      this.image.url = 'http://localhost:3000/' + this.item.imageUrl
      this.image.filename = this.item.imageUrl
    }
  },
  methods: {
    onInputImage: function () {
      this.isImageChange = true
      let image = this.$refs.image.files[0]
      if (image) {
        this.image = {
          url: URL.createObjectURL(image),
          filename: image.name
        }
      }
    },
    onSubmit: function () {
      let formData = new FormData()
      formData.append('name', this.name)
      formData.append('stock', this.stock)
      formData.append('price', this.price)

      if (this.isImageChange) {
        formData.append('image', this.$refs.image.files[0])
      }

      if (this.id) {
        api
          .updateItem(formData, this.id, this.token)
          .then(({ data }) => {
            this.$alertify.success('Success updating item')
            this.$router.push('/')
          })
          .catch(err => console.log(err))
      } else {
        api
          .createItem(formData, this.token)
          .then(({ data }) => {
            this.$alertify.success('Success add new item')
            this.$router.push('/')
          })
          .catch(err => console.log(err))
      }
    }
  }
}
</script>

<style scoped>
.file-name {
  max-width: none;
}
.box {
  max-width: 810px;
}
.file-cta {
  min-height: 230px;
}
</style>
