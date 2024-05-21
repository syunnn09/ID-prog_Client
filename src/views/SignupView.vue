<template>
  <div class="signup w-100">
    <div class="main d-flex justify-content-center">
      <div class="signup-form">
        <h3 class="text-center">Create an account</h3>
        <p>Enter your Email to sign up for this application</p>
        <div class="inputs my-3">
          <input type="text" v-model="email" id="email" class="w-100 mb-2" placeholder="sample@gmail.com">
          <input type="submit" @click="create" class="bg-dark text-white w-100 rounded" value="Sign up with email">
        </div>
        <!-- <div class="google">
          <p class="text-center">or continue with</p>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { getAuth, onAuthStateChanged } from 'firebase/auth';
</script>

<script>
export default {
  data() {
    return {
      email: ""
    }
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user != null) {
        this.$router.push('/editor');
      }
    })
  },
  methods: {
    create() {
      if (!this.email) return
      console.log(this.email);
    }
  }
}
</script>

<style lang="scss">

</style>
