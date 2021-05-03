import axios from "axios";

class BaseAxios {
  request = axios.create({
    baseURL: "https://k4a201.p.ssafy.io/api",
  });
  async basicGetRequest(url) {
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
    return this.basicGetRequest("/testjob");
  }
  getOne(pid, id) {
    return this.basicGetRequest(`/testjob/${pid}/${id}`);
  }
}

export class ProjectAxios extends BaseAxios {
  all() {
    return this.basicGetRequest("/project");
  }
  one(id) {
    return this.basicGetRequest(`/project/${id}`);
  }
}

export class JacocoAxios extends BaseAxios {
  all() {
    return this.basicGetRequest("/jacoco");
  }
  one(id) {
    return this.basicGetRequest(`/jacoco/${id}`);
  }
}
