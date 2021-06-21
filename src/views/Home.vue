<template>
  <div>
    <form @submit.prevent="addDish" class="mb-3" id="add-dish-form">
      <div v-if="error" class="alert alert-dismissible alert-warning">
        <button type="button" class="close" data-dismiss="alert">&times;</button>
        <h4 class="alert-heading">Error!</h4>
        <p class="mb-0">{{error}}</p>
      </div>
      <div class="form-group">
        <label for="name">Name</label>
        <input
          v-model="dish.name"
          type="text"
          class="form-control"
          id="name" required
          placeholder="Enter a dish name">
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input
          v-model="dish.description"
          type="text"
          class="form-control"
          id="subject"
          placeholder="Dish Description" required>
      </div>
      <div class="form-group">
        <label for="price">Price</label>
        <textarea
          v-model="dish.price"
          class="form-control"
          id="price"
          placeholder="0"
          type="number"
          rows="3"></textarea>
      </div>
      <div class="form-group">
        <label for="imageURL">Image URL</label>
        <input
          v-model="dish.imageURL"
          type="url"
          class="form-control"
          id="imageURL"
          placeholder="Enter URL to an image">
      </div>
      <button style="margin-top: 10px;" type="submit" class="btn btn-primary">Add Dish</button>
    </form>
  </div>
</template>

<script>
const API_URL = 'http://localhost:4000/dishesh';

export default {
  name: 'home',
  data: () => ({
    error: '',
    dish: {
      name: '',
      description: '',
      price: '',
      imageURL: '',
    },
  }),
  methods: {
    addDish() {
      fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(this.dish),
        headers: {
          'content-type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.details) {
            const error = result.details
              .map((detail) => detail.message)
              .join('. ');
            this.error = error;
          } else {
            this.error = '';
            this.showMessageForm = false;
            this.dishesh.push(result);
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
