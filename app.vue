<script setup>
const companies = ref([]);

const appConfig = useAppConfig();

const profile = ref("");
const companyDescription = ref("");
const isLoading = ref(false);

const profilePlaceholder =
  "I am a Full stack developer with 4 years of experience using Typescript, Vue.js, Node.js, PostgreSQL, MongoDB, Sveltekit, Tailwind and OpenAI API. The last year I was working with Flutter, Python and OpenAI API. Currently, I'm working as a Team Leader of a 7 people team.";
const companyDescriptionPlaceholder =
  "I am looking for a startup that I can help to grow faster and that can help me to grow as a professional. Also that helps me to improve my tech skills and my English. I'm open to learn new technologies and to work with small teams.";

const submitForm = async (e) => {
  console.log(appConfig.SERVER_URL);

  try {
    isLoading.value = true;
    const response = await fetch(appConfig.SERVER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        profile: profile.value,
        companyDescription: companyDescription.value,
      }),
    });

    const data = await response.json();

    console.log(data);

    companies.value = data.companies;
  } catch (error) {
    console.log(error.message);
    alert("Something went wrong. Please try again later.");
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div>
    <h1>
      Find your YC job describing your profile and what you want of a company
    </h1>
    <form>
      <textarea
        type="text"
        name="profile"
        :placeholder="`Describe your profile. Here's an example: ${profilePlaceholder}`"
        v-model="profile"
      ></textarea>
      <textarea
        type="text"
        name="company-description"
        :placeholder="`How should be the company. Here's an example: ${companyDescriptionPlaceholder}`"
        v-model="companyDescription"
      ></textarea>
      <button type="button" @click="submitForm">Submit</button>
    </form>

    <h2 v-if="isLoading">Loading...</h2>

    <section v-else>
      <article v-for="company in companies">
        <a :href="company.website" target="_blank">
          <h2>{{ company.name }}</h2>
        </a>
        <small>
          <a
            :href="`https://www.workatastartup.com/companies/${company.slug}`"
            target="_blank"
            >Apply here</a
          >
        </small>
        <h3>{{ company.one_liner }}</h3>
        <p>{{ company.primary_vertical }}</p>
        <p>Description: {{ company.description }}</p>
        <p>Technologies: {{ company.tech_description }}</p>
        <p>Hiring description: {{ company.hiring_description }}</p>
      </article>
    </section>
  </div>
</template>

<style>
textarea {
  width: 100%;
  height: 100px;
}
</style>
