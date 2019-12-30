import axios from 'axios';

function searchService(searchTerm) {
	const postData = {
		term: searchTerm,
		entity: "movie"
	};
	
	return axios.post('https://itunes.apple.com/search', null, {
		headers: {
		  'Access-Control-Allow-Origin': '*',
		  'Content-Type' : 'application/json'
		},
		params: postData
	});
}

export default searchService;