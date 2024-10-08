<script setup>
import { marked } from 'marked';

const companies = ref([]);
const companiesSection = ref(null);

const appConfig = useAppConfig();

const profile = ref('');
const companyDescription = ref('');
const isLoading = ref(false);

const profilePlaceholder =
	"I am a Full stack developer with 4 years of experience using Typescript, Vue.js, Node.js, PostgreSQL, MongoDB, Sveltekit, Tailwind and OpenAI API. The last year I was working with Flutter, Python and OpenAI API. Currently, I'm working as a Team Leader of a 7 people team.";
const companyDescriptionPlaceholder =
	"I am looking for a startup that I can help to grow faster and that can help me to grow as a professional. Also that helps me to improve my tech skills and my English. I'm open to learn new technologies and to work with small teams.";

const submitForm = async (e) => {
	console.log(appConfig.SERVER_URL);
	if (!profile.value || !companyDescription.value) {
		alert('Please fill all the fields.');
		return;
	}

	try {
		isLoading.value = true;
		const response = await fetch(appConfig.SERVER_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				profile: profile.value || profilePlaceholder,
				'company-description':
					companyDescription.value || companyDescriptionPlaceholder,
			}),
		});

		const data = await response.json();

		companies.value = data.companies;

		await nextTick(() => {
			scrollToBottom();
		});
	} catch (error) {
		console.log(error.message);
		alert('Something went wrong. Please try again later.');
	} finally {
		isLoading.value = false;
	}
};

const scrollToBottom = () => {
	if (companiesSection.value) {
		companiesSection.value.scrollIntoView({ behavior: 'smooth' });
	}
};

const isMobileDevice =
	/Mobile|Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(
		navigator.userAgent
	);

const colorMode = useColorMode();

const switchColorMode = () => {
	colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark';
};
</script>

<template>
	<div class="bg-white dark:bg-dark-slate">
		<div
			v-if="isLoading"
			class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
		>
			<div
				class="bg-white dark:bg-dark-slate p-6 rounded-lg shadow-lg flex items-center space-x-4"
			>
				<svg
					class="animate-spin h-8 w-8 text-blue-green"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
				>
					<circle
						class="opacity-25"
						cx="12"
						cy="12"
						r="10"
						stroke="currentColor"
						stroke-width="4"
					></circle>
					<path
						class="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					></path>
				</svg>
				<span class="text-lg font-semibold text-dark-slate dark:text-white"
					>Loading...</span
				>
			</div>
		</div>

		<header class="fixed z-10 right-2 top-2">
			<!-- Dark mode toggler -->
			<div class="flex justify-end">
				<button
					class="border-2 font-medium border-dark-slate text-dark-slate dark:border-white dark:text-white px-4 py-2 rounded-md shadow-md flex justify-center items-center bg-white dark:bg-dark-slate"
					type="button"
					@click="switchColorMode"
				>
					<Icon
						:name="
							colorMode.preference == 'light'
								? 'iconamoon:mode-light-fill'
								: 'iconamoon:mode-dark-fill'
						"
						size="24"
					></Icon>
				</button>
			</div>
		</header>
		<main>
			<h1 class="text-3xl font-bold text-blue-green my-2">
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
						class="bg-blue-green text-white px-4 py-2 rounded-md shadow-md"
						type="button"
						@click="submitForm"
					>
						Submit
					</button>
				</div>
			</form>

			<section v-if="companies.length" ref="companiesSection">
				<h2 class="mb-4 text-3xl">
					Here you have some Startups that can fit your interests.
				</h2>

				<article v-for="company in companies">
					<a :href="company.website" target="_blank">
						<h2 class="text-2xl">{{ company.name }}</h2>
					</a>
					<small>
						<a
							:href="`https://www.workatastartup.com/companies/${company.slug}`"
							target="_blank"
							>Apply here</a
						>
					</small>
					<h3 class="text-xl">{{ company.oneLiner }}</h3>
					<p class="text-lg">{{ company.primaryVertical }}</p>
					<div class="text-base">
						<b class="font-semibold">Description:</b>
						<p v-html="marked(company.description)"></p>
					</div>
					<div
						class="text-base p-4 border-dotted border border-dark-slate dark:border-white rounded-md mt-2"
					>
						<b class="font-semibold">Technologies:</b>
						<p v-html="marked(company.techDescription)"></p>
					</div>
					<div
						class="text-base p-4 border-dotted border border-dark-slate dark:border-white rounded-md mt-2"
					>
						<b class="font-semibold">Hiring description:</b>
						<p v-html="marked(company.hiringDescription)"></p>
					</div>
				</article>
			</section>
		</main>
	</div>
</template>

<style lang="postcss">
main {
	@apply py-4 px-8;
}

label {
	@apply font-medium text-lg;
}

textarea {
	@apply w-full focus:outline-none border-2 border-dark-slate dark:border-white rounded-md p-2 shadow-md dark:bg-dark-slate;
}

form > div {
	@apply mb-4;
}

article {
	@apply my-4 border border-white rounded-md p-4 shadow-md;
}
</style>
