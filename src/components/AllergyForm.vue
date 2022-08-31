<template>
  <div class="wrapper">
    <form @submit="handleSubmit">
      <div class="form-controller">
        <label for="">Name:</label>
        <input
          type="text"
          placeholder="Enter Name of allergy"
          v-model="name"
          required
        />
      </div>
      <div class="form-controller">
        <label for="">Symptoms:</label>
        <textarea
          required
          v-model="symptoms"
          placeholder="Add symptoms of allergy"
        ></textarea>
      </div>
      <div class="form-controller">
        <label for="">Severity:</label>
        <select v-model="severity">
          <option value="1">Severe</option>
          <option value="2">Normal</option>
          <option value="3">Low</option>
        </select>
      </div>
      <div class="form-control">
        <input
          class="btn"
          type="submit"
          value="submit"
        />
      </div>
    </form>
    <div>
      <div class="img-container">
        <img
          v-if="image"
          class="form__image"
          :src="image"
        />
      </div>
      <input
        type="file"
        @change="handleFileInput"
        required
      />
    </div>
    <i
      class="fa-solid fa-xmark close--form"
      @click="toggle"
    ></i>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { createToast } from 'mosha-vue-toastify'
import { WARNING } from '../constants/constant'

export default {
  name: 'AllergyForm',
  props: ['toggle', 'update', 'formData'],

  data() {
    return {
      name: '',
      symptoms: '',
      severity: 2,
      image: '',
    }
  },

  created() {
    if (this.update) {
      this.name = this.formData.name
      this.symptoms = this.formData.symptoms
      this.severity = this.formData.severity
      this.image = this.formData.image
    }
  },

  methods: {
    ...mapActions(['addAllergy', 'updateAllergy']),

    handleSubmit(e) {
      e.preventDefault()
      if (!this.image) {
        createToast('Upload png or jpg image', { type: WARNING })
        return
      }
      const dataPayload = {
        name: this.name,
        symptoms: this.symptoms,
        severity: this.severity,
        image: this.image,
      }
      if (this.update) {
        this.updateAllergy({
          payload: dataPayload,
          id: this.formData.allergy_id,
        })
      } else {
        this.addAllergy(dataPayload)
      }
      // Reset form fields
      this.name = ''
      this.symptoms = ''
      this.severity = 2
      this.image = ''
      this.$emit('resetData')
    },

    handleFileInput(e) {
      if (!e.target.files) {
        return
      }
      const file = e.target.files[0]
      if (
        !file.name.endsWith('.jpg') &&
        !file.name.endsWith('.png') &&
        !file.name.endsWith('.gif')
      ) {
        createToast('Upload png or jpg image', { type: WARNING })
        return
      }
      // reader
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (e) => {
        const imageElement = document.createElement('img')
        imageElement.src = e.target.result
        imageElement.onload = (e) => {
          const canvas = document.createElement('canvas')
          const MAX_WIDTH = 600
          const scaleRatio = MAX_WIDTH / e.target.width
          // canvas size
          canvas.width = MAX_WIDTH
          canvas.height = e.target.height * scaleRatio
          const ctx = canvas.getContext('2d')
          ctx.drawImage(e.target, 0, 0, canvas.width, canvas.height)
          const srcEncoded = ctx.canvas.toDataURL(e.target, 'image/jpg')
          this.image = srcEncoded
        }
      }
    },
  },
}
</script>

<style scoped>
.wrapper {
  display: flex;
  justify-content: space-between;
  background-image: linear-gradient(to right, #f3f3f4, #c1e0d3);
  padding: 20px;
  box-shadow: #33475c9f 0px 4px 6px;
  border-radius: 5px;
  align-items: center;
  position: relative;
}
form {
  width: 600px;
}
select {
  background-color: white;
}
option {
  color: #2c3e50;
  border-bottom: 2px solid #2c3e50;
}
input[type='submit'] {
  background: #41b883;
  color: #fff;
  border: 1px #41b883 solid;
  cursor: pointer;
  border-radius: 2px;
}
input[type='file'] {
  color: #2c3e50;
  font-size: 16px;
}
.img-container {
  width: 400px;
  height: 300px;
  border: 1px #41b883 solid;
  position: relative;
  margin-bottom: 15px;
  margin-right: 10px;
}
.img-container::after {
  content: 'Upload Image';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 24px;
}
.form__image {
  width: 100%;
  height: 100%;
  z-index: 5;
  object-fit: cover;
}
.close--form {
  color: #33b97d;
  font-size: 24px;
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
}
</style>
