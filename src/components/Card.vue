<template>
  <div class="wrapper">
    <div
      :class="[
        allergy.severity == 1
          ? 'severe'
          : [allergy.severity == 2 ? 'normal' : 'low'],
      ]"
    >
      <div class="post-body">
        <div class="title">
          <h2>
            {{ allergy.name }}
          </h2>
          <span>{{ allergy.created_at.slice(0, 10) }}</span>
        </div>
        <div class="content">
          <p>
            {{ allergy.symptoms }}
          </p>
          <span
            v-if="user_id === allergy.user_table_id"
            class="icons"
          >
            <i
              class="fa-solid fa-pen"
              @click="$emit('updateFormData', allergy)"
            ></i>
            <i
              @click="handleDelete(allergy.allergy_id)"
              class="fa-solid fa-trash-can"
            ></i
          ></span>
        </div>

        <div class="img--container">
          <img
            v-if="allergy.image"
            :src="allergy.image"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Card',
  computed: mapGetters(['getAuth']),
  props: ['allergy'],

  date() {
    return {
      user_id: null,
    }
  },

  methods: {
    ...mapActions(['deleteAllergy']),
    handleDelete(id) {
      if (confirm('Are you sure')) {
        this.deleteAllergy(id)
      }
    },
  },

  created() {
    this.user_id = this.getAuth.user.existingUser.user_id
  },
}
</script>

<style scoped>
.wrapper {
  width: 100%;
  border-radius: 5px;
  background-image: linear-gradient(to right, #f3f3f4, #c1e0d3);
  box-shadow: #33475c9f 0px 4px 6px;
}
.title,
.content {
  display: flex;
  justify-content: space-between;
}
.title span {
  color: rgb(114, 114, 114);
}
.severe {
  border-left: 10px solid #e02c2c;
}
.normal {
  border-left: 10px solid #dbd967;
}
.low {
  border-left: 10px solid #688ec7;
}
.post-body {
  padding: 20px;
}
p {
  margin: 16px 0;
  font-size: 18px;
}
.img--container {
  width: 500px;
  height: 400px;
}
img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
.icons {
  display: flex;
  gap: 24px;
  cursor: pointer;
}
</style>
