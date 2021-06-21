<template>
  <div class="about">
    <div class="list-unstyled" v-for="dish in dishesh" :key="dish._id">
      <li class="media menu-item">
        <img v-if="dish.imageURL" class="mr-3" require :src="dish.imageURL">
        <div class="media-body">
          <h4 class="mt-0 mb-1">{{dish.name}}</h4>
          <h5 class="mt-0 mb-1">{{dish.description}}</h5>
          ${{dish.price}}
          <br />
        </div>
        <form @submit.prevent="deleteDish(dish._id)" class="mb-3" id="remove-dish-form">
          <button class="x-button">X</button>
        </form>
      </li>
    </div>
  </div>
</template>
<script>
const API_URL = 'http://localhost:4000/dishesh';

export default {
  name: 'home',
  data: () => ({
    error: '',
    dishesh: [],
    dish: {
      name: '',
      description: '',
      price: '',
      imageURL: '',
    },
  }),
  computed: {
    reversedDishesh() {
      return this.dishesh.slice().reverse();
    },
  },
  mounted() {
    fetch(API_URL)
      .then((response) => response.json())
      .then((result) => {
        this.dishesh = result;
      });
  },
  methods: {
    deleteDish(id) {
      fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.details) {
            // there was an error...
            const error = result.details
              .map((detail) => detail.message)
              .join('. ');
            this.error = error;
          } else {
            this.error = '';
            this.showMessageForm = false;
            this.dishesh = result;
          }
        });
    },
  },
};
</script>

<style>
img {
  max-width: 300px;
  height: auto;
}
</style>
