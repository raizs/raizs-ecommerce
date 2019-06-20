import axios from "axios";

const ROOT_URL = `${process.env.API_ROOT_URL || "http://raizs-api-dev.jy9ydwewbm.sa-east-1.elasticbeanstalk.com/api/v1/"}`;

export class BaseRepository {

	async get(endpoint) {
		return await this.resolvePromise(axios.get(`${ROOT_URL}${endpoint}`));
  }
  
	async post(endpoint, body) {
		return await this.resolvePromise(axios.post(`${ROOT_URL}${endpoint}`, body));
	}

	async put(endpoint, body) {
		return await this.resolvePromise(axios.put(`${ROOT_URL}${endpoint}`, body));
	}

	async delete(endpoint) {
		return await this.resolvePromise(axios.delete(`${ROOT_URL}${endpoint}`));
	}

	async resolvePromise(promise) {
		var data;
		var err;

		try {
      const result = await promise;
			if(result.data.success) data = result.data.data;
			
			else if(result.data) err = result.data.status;
			else err = { code: 502, msg: "unknown_err" };
		
		} catch(e) { 
			err = {
				code: 502,
				msg: e
			};
		}

		return { err, data };
	}
}