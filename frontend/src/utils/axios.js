import axios from "axios";

class BaseAxios {
  request = axios.create({
    baseURL: "https://k4a201.p.ssafy.io/api",
    // baseURL: "http://localhost:3000/",
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

const request = axios.create({
  baseURL: "https://k4a201.p.ssafy.io/api",
});

const basicGetRequest = async (url) => {
  try {
    const response = await request.get(url);
    return response.data;
  } catch (error) {
    return error;
  }
};

export class ProjectAxios extends BaseAxios {
  all() {
    return this.basicGetRequest("/project");
  }
  one(id) {
    return this.basicGetRequest(`/project/${id}`);
  }
}

export class AppAxios extends BaseAxios {
  getAll() {
    return this.basicGetRequest("/app");
  }
  getOne(id) {
    return this.basicGetRequest(`/app/${id}`);
  }
  getListByProjectId(pid) {
    return this.basicGetRequest(`/app/project/${pid}`);
  }
}

export class ReportAxios extends BaseAxios {
  all() {
    return this.basicGetRequest("/report");
  }
  getOne(id) {
    return this.basicGetRequest(`/report/${id}`);
  }
  getListByAppId(aid) {
    return this.basicGetRequest(`/report/app/${aid}`);
  }
}

export const CoverageAxios = {
  all: (id) => basicGetRequest(`/coverage/${id}`),
};

export class JacocoAxios extends BaseAxios {
  all() {
    return this.basicGetRequest("/jacoco");
  }
  one(id) {
    return this.basicGetRequest(`/jacoco/${id}`);
  }
}

export class TestAxios extends BaseAxios {
  getAll() {
    return this.basicGetRequest(`/test/`);
  }
  getOne(id) {
    return this.basicGetRequest(`/test/${id}`);
  }
  getListByReportId(rid) {
    return this.basicGetRequest(`/test/report/${rid}`);
  }
}
