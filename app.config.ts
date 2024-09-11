export default defineAppConfig({
	SERVER_URL: import.meta.dev
		? 'https://mock_2c435a412a7f4c4ea74a1d972d4c2054.mock.insomnia.rest/'
		: 'https://yc-job-finder.onrender.com',
});
