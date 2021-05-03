import axios from "axios";

class BaseAxios {
  request = axios.create({
    baseURL: "https://k4a201.p.ssafy.io/api",
  });
  async basicRequest(url) {
    try {
      const response = await this.request.get(url);
      return response.data;
    } catch (error) {
      return error;
    }
  }
}

export class TestJobAxios extends BaseAxios {
  getAll() {
    return this.basicRequest("/testjob");
  }
  getOne(pid, id) {
    return this.basicRequest(`/testjob/${pid}/${id}`);
  }
}

export class ProjectAxios extends BaseAxios {
  all() {
    return this.basicRequest("/project");
  }
  one(id) {
    return this.basicRequest(`/project/${id}`);
  }
}
