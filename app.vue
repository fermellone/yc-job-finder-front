<script setup>
// const userProfile = ref("");
// const companyDescription = ref("");

import { useFetch } from "nuxt/app";

const companies = ref({});

const submitForm = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const body = Object.fromEntries(formData);

  try {
    console.log("asd");
    const { data, pending, error, refresh } = await useFetch(
      "http://localhost:8001",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      }
    );

    companies.value = data.value.companies;
  } catch (error) {
    console.log(error.message);
  }
};
</script>

<template>
  <div>
    <h1>
      Find your YC job describing your profile and what you want of a company
    </h1>
    <form @submit="submitForm" method="post">
      <textarea
        type="text"
        name="profile"
        placeholder="Describe your profile"
      ></textarea>
      <textarea
        type="text"
        name="company-description"
        placeholder="How should be the company"
      ></textarea>
      <input type="submit" value="Submit" />
    </form>

    <p v-for="company in companies">{{ company }}</p>
  </div>
</template>

<style>
textarea {
  width: 100%;
  height: 100px;
}
</style>
