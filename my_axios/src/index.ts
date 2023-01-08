import axios from "./lib/axios";

axios.interceptors.request.use(
  function (config) {
    // console.log("被我请求拦截器拦截了，哈哈:", config);
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    console.log("被响应拦截拦截 ");
    // response = { message: "响应数据被我替换了，啊哈哈哈" };
    return response;
  },
  function (error) {
    // 对响应错误做点什么
    console.log(error);
    return Promise.reject(error);
  }
);

async function send() {
  const res = await axios({
    method: "get",
    url: "http://localhost:3000/getTest",
    data: {},
  });

  const res2 = await axios.get("http://localhost:3000/getTest", {
    params: {
      name: "zhangsan",
    },
  });

  console.log(res);
  console.log(res2);
}

const btnEl = document.getElementById("send");
btnEl!.addEventListener("click", send);
