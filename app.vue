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
        profile: profile.value ?? profilePlaceholder,
        "company-description":
          companyDescription.value ?? companyDescriptionPlaceholder,
      }),
    });

    const data = await response.json();

    companies.value = data.companies;
  } catch (error) {
    console.log(error.message);
    alert("Something went wrong. Please try again later.");
  } finally {
    isLoading.value = false;
  }
};

const isMobileDevice =
  /Mobile|Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(
    navigator.userAgent
  );
</script>

<template>
  <main>
    <h1 class="text-3xl font-bold text-secondary my-2">
      Find your dream YC Startup Job.
    </h1>

    <h2 class="text-xl">
      You only need to tell us your profile and what would you like your dream
      startup to have and leave the annoying things our side.
    </h2>
    <form class="my-4">
      <div>
        <label for="profile">Describe your profile.</label>
        <textarea
          type="text"
          name="profile"
          :rows="isMobileDevice ? 6 : 10"
          :placeholder="`Here's an example: ${profilePlaceholder}`"
          v-model="profile"
        ></textarea>
      </div>
      <div>
        <label for="company-description"
          >How should be your dream startup.</label
        >
        <textarea
          type="text"
          name="company-description"
          :rows="isMobileDevice ? 6 : 10"
          :placeholder="`Here's an example: ${companyDescriptionPlaceholder}`"
          v-model="companyDescription"
        ></textarea>
      </div>
      <div class="w-full flex justify-end items-center">
        <button
          class="bg-primary text-white px-4 py-2 rounded-md shadow-md"
          type="button"
          @click="submitForm"
        >
          Submit
        </button>
      </div>
    </form>

    <h2 v-if="isLoading">Loading...</h2>

    <section v-else-if="companies.length">
      <h2 class="mb-4">
        Here you have some Startups that can fit your interests.
      </h2>

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
  </main>
</template>

<style lang="postcss">
main {
  @apply py-4 px-8;
}

label {
  @apply font-medium text-lg;
}

textarea {
  @apply w-full focus:outline-none border-2 border-secondary rounded-md p-2 shadow-md;
}

form > div {
  @apply mb-4;
}
</style>
