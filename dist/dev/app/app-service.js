if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global2 = uni.requireGlobal();
  ArrayBuffer = global2.ArrayBuffer;
  Int8Array = global2.Int8Array;
  Uint8Array = global2.Uint8Array;
  Uint8ClampedArray = global2.Uint8ClampedArray;
  Int16Array = global2.Int16Array;
  Uint16Array = global2.Uint16Array;
  Int32Array = global2.Int32Array;
  Uint32Array = global2.Uint32Array;
  Float32Array = global2.Float32Array;
  Float64Array = global2.Float64Array;
  BigInt64Array = global2.BigInt64Array;
  BigUint64Array = global2.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue) {
  "use strict";
  const navBarHeight = 44;
  const _sfc_main$q = /* @__PURE__ */ vue.defineComponent({
    __name: "CustomNavbar",
    props: {
      title: { type: String, required: false, default: "" },
      showBack: { type: Boolean, required: false, default: false },
      fixed: { type: Boolean, required: false, default: true },
      bgColor: { type: String, required: false, default: "#ffffff" }
    },
    setup(__props, { expose: __expose }) {
      __expose();
      const props = __props;
      const systemInfo = uni.getSystemInfoSync();
      const statusBarHeight = systemInfo.statusBarHeight || 20;
      const totalHeight = statusBarHeight + navBarHeight;
      function handleBack() {
        const pages = getCurrentPages();
        if (pages.length > 1) {
          uni.navigateBack();
        } else {
          uni.switchTab({ url: "/pages/home/index" });
        }
      }
      const __returned__ = { props, systemInfo, statusBarHeight, navBarHeight, totalHeight, handleBack };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  function _sfc_render$p(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createElementVNode(
          "view",
          {
            class: "custom-navbar",
            style: vue.normalizeStyle({ paddingTop: $setup.statusBarHeight + "px" })
          },
          [
            vue.createElementVNode(
              "view",
              {
                class: "navbar-content",
                style: vue.normalizeStyle({ height: $setup.navBarHeight + "px" })
              },
              [
                $props.showBack ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 0,
                  class: "navbar-left",
                  onClick: $setup.handleBack
                }, [
                  vue.createElementVNode("text", { class: "back-icon" }, "‹")
                ])) : vue.createCommentVNode("v-if", true),
                vue.createElementVNode("view", { class: "navbar-title" }, [
                  vue.createElementVNode(
                    "text",
                    null,
                    vue.toDisplayString($props.title),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "navbar-right" }, [
                  vue.renderSlot(_ctx.$slots, "right", {}, void 0, true)
                ])
              ],
              4
              /* STYLE */
            )
          ],
          4
          /* STYLE */
        ),
        $props.fixed ? (vue.openBlock(), vue.createElementBlock(
          "view",
          {
            key: 0,
            class: "navbar-placeholder",
            style: vue.normalizeStyle({ height: $setup.totalHeight + "px" })
          },
          null,
          4
          /* STYLE */
        )) : vue.createCommentVNode("v-if", true)
      ],
      64
      /* STABLE_FRAGMENT */
    );
  }
  const CustomNavbar = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["render", _sfc_render$p], ["__scopeId", "data-v-f3889534"], ["__file", "D:/geek/AI文旅/geek012/frontend/src/components/CustomNavbar/CustomNavbar.vue"]]);
  function formatDate(date, fmt = "YYYY-MM-DD") {
    const d = typeof date === "string" ? new Date(date) : date;
    if (Number.isNaN(d.getTime()))
      return "";
    const map = {
      YYYY: d.getFullYear(),
      MM: String(d.getMonth() + 1).padStart(2, "0"),
      DD: String(d.getDate()).padStart(2, "0"),
      HH: String(d.getHours()).padStart(2, "0"),
      mm: String(d.getMinutes()).padStart(2, "0"),
      ss: String(d.getSeconds()).padStart(2, "0")
    };
    return fmt.replace(/YYYY|MM|DD|HH|mm|ss/g, (key) => String(map[key]));
  }
  function formatCount(count) {
    if (count >= 1e4)
      return `${(count / 1e4).toFixed(1)}w`;
    if (count >= 1e3)
      return `${(count / 1e3).toFixed(1)}k`;
    return String(count);
  }
  function formatPrice(price) {
    return `¥${price.toFixed(0)}`;
  }
  function formatRating(rating) {
    return rating.toFixed(1);
  }
  const _sfc_main$p = /* @__PURE__ */ vue.defineComponent({
    __name: "ScenicCard",
    props: {
      item: { type: Object, required: true }
    },
    setup(__props, { expose: __expose }) {
      __expose();
      const props = __props;
      function handleTap() {
        uni.navigateTo({ url: `/pages/scenic/detail?id=${props.item.id}` });
      }
      const __returned__ = { props, handleTap, get formatRating() {
        return formatRating;
      }, get formatPrice() {
        return formatPrice;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$o(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", {
      class: "scenic-card",
      onClick: $setup.handleTap
    }, [
      vue.createElementVNode("image", {
        class: "cover",
        src: $props.item.cover,
        mode: "aspectFill"
      }, null, 8, ["src"]),
      vue.createElementVNode("view", { class: "info" }, [
        vue.createElementVNode(
          "text",
          { class: "name text-ellipsis" },
          vue.toDisplayString($props.item.name),
          1
          /* TEXT */
        ),
        vue.createElementVNode("view", { class: "meta" }, [
          vue.createElementVNode(
            "text",
            { class: "rating" },
            "⭐ " + vue.toDisplayString($setup.formatRating($props.item.rating)),
            1
            /* TEXT */
          ),
          vue.createElementVNode(
            "text",
            { class: "city" },
            vue.toDisplayString($props.item.city),
            1
            /* TEXT */
          )
        ]),
        $props.item.price !== void 0 ? (vue.openBlock(), vue.createElementBlock(
          "text",
          {
            key: 0,
            class: "price"
          },
          vue.toDisplayString($setup.formatPrice($props.item.price)),
          1
          /* TEXT */
        )) : vue.createCommentVNode("v-if", true)
      ])
    ]);
  }
  const ScenicCard = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["render", _sfc_render$o], ["__scopeId", "data-v-989d2699"], ["__file", "D:/geek/AI文旅/geek012/frontend/src/components/ScenicCard/ScenicCard.vue"]]);
  const _sfc_main$o = /* @__PURE__ */ vue.defineComponent({
    __name: "ActivityCard",
    props: {
      item: { type: Object, required: true }
    },
    setup(__props, { expose: __expose }) {
      __expose();
      const props = __props;
      function handleTap() {
        uni.navigateTo({ url: `/pages/activity/detail?id=${props.item.id}` });
      }
      const __returned__ = { props, handleTap, get formatDate() {
        return formatDate;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$n(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", {
      class: "activity-card card",
      onClick: $setup.handleTap
    }, [
      vue.createElementVNode("image", {
        class: "cover",
        src: $props.item.cover,
        mode: "aspectFill"
      }, null, 8, ["src"]),
      vue.createElementVNode("view", { class: "content" }, [
        vue.createElementVNode(
          "text",
          { class: "title text-ellipsis-2" },
          vue.toDisplayString($props.item.title),
          1
          /* TEXT */
        ),
        vue.createElementVNode("view", { class: "row" }, [
          vue.createElementVNode("text", { class: "icon" }, "📅"),
          vue.createElementVNode(
            "text",
            { class: "text" },
            vue.toDisplayString($setup.formatDate($props.item.startTime, "MM-DD HH:mm")),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "row" }, [
          vue.createElementVNode("text", { class: "icon" }, "📍"),
          vue.createElementVNode(
            "text",
            { class: "text text-ellipsis" },
            vue.toDisplayString($props.item.location),
            1
            /* TEXT */
          )
        ])
      ])
    ]);
  }
  const ActivityCard = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["render", _sfc_render$n], ["__scopeId", "data-v-7ac72b11"], ["__file", "D:/geek/AI文旅/geek012/frontend/src/components/ActivityCard/ActivityCard.vue"]]);
  const API_BASE_URL = "http://localhost:8080";
  const TOKEN_KEY = "Authentication";
  const USER_INFO_KEY = "userInfo";
  const REQUEST_TIMEOUT = 3e4;
  const INTEREST_TAGS = [
    "美食",
    "摄影",
    "历史文化",
    "自然风光",
    "户外运动",
    "亲子旅行",
    "购物娱乐",
    "夜生活"
  ];
  const HOT_CITIES = [
    { name: "杭州", cover: "https://picsum.photos/seed/hangzhou/400/300", rating: 4.9 },
    { name: "成都", cover: "https://picsum.photos/seed/chengdu/400/300", rating: 4.8 },
    { name: "重庆", cover: "https://picsum.photos/seed/chongqing/400/300", rating: 4.8 },
    { name: "西安", cover: "https://picsum.photos/seed/xian/400/300", rating: 4.7 },
    { name: "北京", cover: "https://picsum.photos/seed/beijing/400/300", rating: 4.9 },
    { name: "苏州", cover: "https://picsum.photos/seed/suzhou/400/300", rating: 4.7 },
    { name: "厦门", cover: "https://picsum.photos/seed/xiamen/400/300", rating: 4.8 },
    { name: "长沙", cover: "https://picsum.photos/seed/changsha/400/300", rating: 4.6 }
  ];
  const COMMUNITY_TAGS = [
    "杭州旅行",
    "CityWalk",
    "周末出游",
    "美食推荐"
  ];
  const SCENIC_CATEGORIES = ["全部", "自然风光", "历史文化", "主题乐园", "博物馆", "古镇"];
  const ACTIVITY_CATEGORIES = ["全部", "音乐节", "展览", "户外", "美食节", "文化体验"];
  const BANNERS = [
    { id: 1, title: "探索杭州西湖", image: "https://picsum.photos/seed/banner1/750/360", link: "/pages/scenic/list?city=杭州" },
    { id: 2, title: "成都美食之旅", image: "https://picsum.photos/seed/banner2/750/360", link: "/pages/ai/generate" },
    { id: 3, title: "周末CityWalk", image: "https://picsum.photos/seed/banner3/750/360", link: "/pages/community/index" }
  ];
  const ON_LAUNCH = "onLaunch";
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  const createHook = (lifecycle) => (hook, target = vue.getCurrentInstance()) => {
    !vue.isInSSRComponentSetup && vue.injectHook(lifecycle, hook, target);
  };
  const onLaunch = /* @__PURE__ */ createHook(ON_LAUNCH);
  const storage = {
    get(key, defaultValue) {
      try {
        const value = uni.getStorageSync(key);
        if (value === "" || value === void 0 || value === null) {
          return defaultValue;
        }
        if (typeof value === "string") {
          try {
            return JSON.parse(value);
          } catch {
            return value;
          }
        }
        return value;
      } catch {
        return defaultValue;
      }
    },
    set(key, value) {
      const data = typeof value === "object" ? JSON.stringify(value) : value;
      uni.setStorageSync(key, data);
    },
    remove(key) {
      uni.removeStorageSync(key);
    },
    clear() {
      uni.clearStorageSync();
    }
  };
  function getToken() {
    return storage.get(TOKEN_KEY, "") || "";
  }
  function setToken(token) {
    storage.set(TOKEN_KEY, token);
  }
  function removeToken() {
    storage.remove(TOKEN_KEY);
  }
  function isLoggedIn() {
    return !!getToken();
  }
  function redirectToLogin() {
    const pages = getCurrentPages();
    const currentPage = pages[pages.length - 1];
    const redirect = currentPage ? `/${currentPage.route}` : "";
    uni.navigateTo({
      url: `/pages/auth/login${redirect ? `?redirect=${encodeURIComponent(redirect)}` : ""}`
    });
  }
  let loadingCount = 0;
  function showLoading(text = "加载中...") {
    loadingCount++;
    if (loadingCount === 1) {
      uni.showLoading({ title: text, mask: true });
    }
  }
  function hideLoading() {
    loadingCount = Math.max(0, loadingCount - 1);
    if (loadingCount === 0) {
      uni.hideLoading();
    }
  }
  function buildUrl(url, params) {
    const base = url.startsWith("http") ? url : `${API_BASE_URL}${url}`;
    if (!params || Object.keys(params).length === 0)
      return base;
    const query = Object.entries(params).filter(([, v]) => v !== void 0 && v !== null && v !== "").map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`).join("&");
    return query ? `${base}${base.includes("?") ? "&" : "?"}${query}` : base;
  }
  function request(config) {
    const {
      url,
      method = "GET",
      data,
      params,
      header = {},
      showLoading: needLoading = false,
      loadingText,
      skipAuth = false
    } = config;
    if (needLoading)
      showLoading(loadingText);
    const token = getToken();
    const headers = {
      "Content-Type": "application/json",
      ...header
    };
    if (token && !skipAuth) {
      headers.Authentication = token;
    }
    return new Promise((resolve, reject) => {
      uni.request({
        url: buildUrl(url, method === "GET" ? params : void 0),
        method,
        data: method !== "GET" ? data : void 0,
        header: headers,
        timeout: REQUEST_TIMEOUT,
        success: (res) => {
          const statusCode = res.statusCode;
          const body = res.data;
          if (statusCode === 401) {
            uni.showToast({ title: "请先登录", icon: "none" });
            redirectToLogin();
            reject(new Error("未授权"));
            return;
          }
          if (statusCode >= 200 && statusCode < 300) {
            if (body && typeof body === "object" && "code" in body) {
              if (body.code === 1 || body.code === 200 || body.code === 0) {
                resolve(body.data);
              } else {
                const msg = body.msg || "请求失败";
                uni.showToast({ title: msg, icon: "none" });
                formatAppLog("error", "at utils/request.ts:100", "[API Error]", url, body);
                reject(new Error(msg));
              }
            } else {
              resolve(body);
            }
          } else {
            const msg = `请求失败(${statusCode})`;
            uni.showToast({ title: msg, icon: "none" });
            formatAppLog("error", "at utils/request.ts:109", "[HTTP Error]", url, statusCode, res.data);
            reject(new Error(msg));
          }
        },
        fail: (err) => {
          uni.showToast({ title: "网络异常，请稍后重试", icon: "none" });
          formatAppLog("error", "at utils/request.ts:115", "[Network Error]", url, err);
          reject(err);
        },
        complete: () => {
          if (needLoading)
            hideLoading();
        }
      });
    });
  }
  const http = {
    get(url, params, config) {
      return request({ url, method: "GET", params, ...config });
    },
    post(url, data, config) {
      return request({ url, method: "POST", data, ...config });
    },
    put(url, data, config) {
      return request({ url, method: "PUT", data, ...config });
    },
    delete(url, params, config) {
      return request({ url, method: "DELETE", params, ...config });
    }
  };
  function getScenicList(params) {
    return http.get("/scenic/list", params);
  }
  function getScenicDetail(id) {
    return http.get(`/scenic/${id}`);
  }
  function getHotScenics(limit = 10) {
    return http.get("/scenic/hot", { limit });
  }
  function collectScenic(id) {
    return http.post(`/scenic/${id}/collect`);
  }
  function uncollectScenic(id) {
    return http.delete(`/scenic/${id}/collect`);
  }
  function getActivityList(params) {
    return http.get("/activity/list", params);
  }
  function getActivityDetail(id) {
    return http.get(`/activity/${id}`);
  }
  function getHotActivities(limit = 10) {
    return http.get("/activity/hot", { limit });
  }
  function enrollActivity(id) {
    return http.post(`/activity/${id}/enroll`, {}, { showLoading: true });
  }
  function getCommunityList(params) {
    return http.get("/community/list", params);
  }
  function getCommunityDetail(id) {
    return http.get(`/community/${id}`);
  }
  function publishPost(data) {
    return http.post("/community/publish", data, { showLoading: true, loadingText: "发布中..." });
  }
  function getHotPosts(limit = 10) {
    return http.get("/community/hot", { limit });
  }
  const mockScenics = [
    { id: 1, name: "西湖", cover: "https://picsum.photos/seed/xihu/400/300", rating: 4.9, city: "杭州", price: 0, category: "自然风光" },
    { id: 2, name: "灵隐寺", cover: "https://picsum.photos/seed/lingyin/400/300", rating: 4.8, city: "杭州", price: 75, category: "历史文化" },
    { id: 3, name: "宽窄巷子", cover: "https://picsum.photos/seed/kuanzhai/400/300", rating: 4.7, city: "成都", price: 0, category: "古镇" },
    { id: 4, name: "洪崖洞", cover: "https://picsum.photos/seed/hongya/400/300", rating: 4.8, city: "重庆", price: 0, category: "历史文化" },
    { id: 5, name: "兵马俑", cover: "https://picsum.photos/seed/bingmayong/400/300", rating: 4.9, city: "西安", price: 120, category: "博物馆" }
  ];
  const mockActivities = [
    { id: 1, title: "西湖音乐节", cover: "https://picsum.photos/seed/music/400/300", startTime: "2026-06-01 19:00", location: "杭州西湖", city: "杭州", category: "音乐节" },
    { id: 2, title: "成都美食节", cover: "https://picsum.photos/seed/foodfest/400/300", startTime: "2026-05-15 10:00", location: "春熙路", city: "成都", category: "美食节" },
    { id: 3, title: "故宫文化展", cover: "https://picsum.photos/seed/exhibit/400/300", startTime: "2026-07-01 09:00", location: "故宫博物院", city: "北京", category: "展览" }
  ];
  const mockPosts = [
    {
      id: 1,
      title: "杭州三日游攻略，西湖+灵隐寺完美路线",
      cover: "https://picsum.photos/seed/post1/400/500",
      author: { id: 1, nickname: "旅行小达人", avatar: "https://picsum.photos/seed/avatar1/100/100" },
      likeCount: 2340,
      collectCount: 890,
      commentCount: 156,
      createdAt: "2026-05-20"
    },
    {
      id: 2,
      title: "成都火锅探店指南，本地人推荐",
      cover: "https://picsum.photos/seed/post2/400/600",
      author: { id: 2, nickname: "吃货小王", avatar: "https://picsum.photos/seed/avatar2/100/100" },
      likeCount: 1890,
      collectCount: 670,
      commentCount: 98,
      createdAt: "2026-05-18"
    },
    {
      id: 3,
      title: "重庆夜景CityWalk，洪崖洞到解放碑",
      cover: "https://picsum.photos/seed/post3/400/450",
      author: { id: 3, nickname: "摄影爱好者", avatar: "https://picsum.photos/seed/avatar3/100/100" },
      likeCount: 3200,
      collectCount: 1200,
      commentCount: 234,
      createdAt: "2026-05-15"
    }
  ];
  const mockTrip = {
    title: "杭州3日精品之旅",
    fromCity: "深圳",
    toCity: "杭州",
    days: 3,
    budget: 3e3,
    people: 2,
    tags: ["美食", "摄影"],
    estimatedCost: 2800,
    hotel: "西湖边精品民宿",
    dayPlans: [
      {
        day: 1,
        title: "西湖经典一日游",
        schedules: [
          { time: "09:00", title: "西湖", description: "漫步苏堤春晓，欣赏断桥残雪", type: "scenic" },
          { time: "12:00", title: "楼外楼午餐", description: "品尝正宗杭帮菜", type: "food" },
          { time: "15:00", title: "灵隐寺", description: "千年古刹，感受禅意", type: "scenic" },
          { time: "18:00", title: "河坊街", description: "逛古街，品小吃", type: "scenic" }
        ]
      },
      {
        day: 2,
        title: "文化深度体验",
        schedules: [
          { time: "09:00", title: "中国丝绸博物馆", type: "scenic" },
          { time: "12:00", title: "知味观", description: "小笼包、片儿川", type: "food" },
          { time: "14:00", title: "宋城", description: "观看千古情演出", type: "scenic" },
          { time: "19:00", title: "西湖音乐喷泉", type: "scenic" }
        ]
      },
      {
        day: 3,
        title: "休闲返程",
        schedules: [
          { time: "09:00", title: "西溪湿地", type: "scenic" },
          { time: "12:00", title: "外婆家", type: "food" },
          { time: "15:00", title: "返程", type: "transport" }
        ]
      }
    ]
  };
  async function withFallback(apiCall, fallback) {
    try {
      return await apiCall();
    } catch {
      formatAppLog("warn", "at utils/mock.ts:102", "[Mock] 接口不可用，使用 Mock 数据");
      return fallback;
    }
  }
  const _sfc_main$n = /* @__PURE__ */ vue.defineComponent({
    __name: "index",
    setup(__props, { expose: __expose }) {
      __expose();
      const systemInfo = uni.getSystemInfoSync();
      const navHeight = (systemInfo.statusBarHeight || 20) + 44;
      const hotScenics = vue.ref([]);
      const hotActivities = vue.ref([]);
      const hotPosts = vue.ref([]);
      vue.onMounted(async () => {
        hotScenics.value = await withFallback(() => getHotScenics(8), mockScenics);
        hotActivities.value = await withFallback(() => getHotActivities(5), mockActivities);
        hotPosts.value = await withFallback(() => getHotPosts(4), mockPosts);
      });
      function goSearch() {
        uni.navigateTo({ url: "/pages/scenic/list" });
      }
      function handleBannerTap(link) {
        if (link.startsWith("/pages/")) {
          if (link.includes("ai/generate") || link.includes("community")) {
            uni.switchTab({ url: link });
          } else {
            uni.navigateTo({ url: link });
          }
        }
      }
      function goCity(city) {
        uni.navigateTo({ url: `/pages/scenic/list?city=${city}` });
      }
      function goDiscover() {
        uni.switchTab({ url: "/pages/discover/index" });
      }
      function goScenicList() {
        uni.navigateTo({ url: "/pages/scenic/list" });
      }
      function goActivityList() {
        uni.navigateTo({ url: "/pages/activity/list" });
      }
      function goCommunity() {
        uni.switchTab({ url: "/pages/community/index" });
      }
      function goPostDetail(id) {
        uni.navigateTo({ url: `/pages/community/detail?id=${id}` });
      }
      const __returned__ = { systemInfo, navHeight, hotScenics, hotActivities, hotPosts, goSearch, handleBannerTap, goCity, goDiscover, goScenicList, goActivityList, goCommunity, goPostDetail, CustomNavbar, ScenicCard, ActivityCard, get BANNERS() {
        return BANNERS;
      }, get HOT_CITIES() {
        return HOT_CITIES;
      }, get formatCount() {
        return formatCount;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$m(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "page" }, [
      vue.createVNode($setup["CustomNavbar"], { title: "TourLing 途灵" }),
      vue.createElementVNode(
        "scroll-view",
        {
          "scroll-y": "",
          class: "scroll-content",
          style: vue.normalizeStyle({ paddingTop: $setup.navHeight + "px" })
        },
        [
          vue.createCommentVNode(" 搜索区域 "),
          vue.createElementVNode("view", {
            class: "search-bar",
            onClick: $setup.goSearch
          }, [
            vue.createElementVNode("text", { class: "search-icon" }, "🔍"),
            vue.createElementVNode("text", { class: "search-placeholder" }, "搜索城市、景点、攻略")
          ]),
          vue.createCommentVNode(" Banner 轮播 "),
          vue.createElementVNode("swiper", {
            class: "banner-swiper",
            circular: "",
            autoplay: "",
            interval: "4000",
            "indicator-dots": "",
            "indicator-color": "rgba(255,255,255,0.5)",
            "indicator-active-color": "#fff"
          }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($setup.BANNERS, (banner) => {
                return vue.openBlock(), vue.createElementBlock("swiper-item", {
                  key: banner.id,
                  onClick: ($event) => $setup.handleBannerTap(banner.link)
                }, [
                  vue.createElementVNode("image", {
                    class: "banner-img",
                    src: banner.image,
                    mode: "aspectFill"
                  }, null, 8, ["src"]),
                  vue.createElementVNode("view", { class: "banner-mask" }, [
                    vue.createElementVNode(
                      "text",
                      { class: "banner-title" },
                      vue.toDisplayString(banner.title),
                      1
                      /* TEXT */
                    )
                  ])
                ], 8, ["onClick"]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ]),
          vue.createCommentVNode(" 热门城市 "),
          vue.createElementVNode("view", { class: "section" }, [
            vue.createElementVNode("view", { class: "section-header" }, [
              vue.createElementVNode("text", { class: "section-title" }, "热门城市"),
              vue.createElementVNode("text", {
                class: "section-more",
                onClick: $setup.goDiscover
              }, "更多 ›")
            ]),
            vue.createElementVNode("scroll-view", {
              "scroll-x": "",
              class: "city-scroll",
              "show-scrollbar": false
            }, [
              vue.createElementVNode("view", { class: "city-list" }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($setup.HOT_CITIES, (city) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      key: city.name,
                      class: "city-item",
                      onClick: ($event) => $setup.goCity(city.name)
                    }, [
                      vue.createElementVNode("image", {
                        class: "city-cover",
                        src: city.cover,
                        mode: "aspectFill"
                      }, null, 8, ["src"]),
                      vue.createElementVNode("view", { class: "city-info" }, [
                        vue.createElementVNode(
                          "text",
                          { class: "city-name" },
                          vue.toDisplayString(city.name),
                          1
                          /* TEXT */
                        ),
                        vue.createElementVNode(
                          "text",
                          { class: "city-rating" },
                          "⭐ " + vue.toDisplayString(city.rating),
                          1
                          /* TEXT */
                        )
                      ])
                    ], 8, ["onClick"]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])
            ])
          ]),
          vue.createCommentVNode(" 热门景点 "),
          vue.createElementVNode("view", { class: "section" }, [
            vue.createElementVNode("view", { class: "section-header" }, [
              vue.createElementVNode("text", { class: "section-title" }, "热门景点"),
              vue.createElementVNode("text", {
                class: "section-more",
                onClick: $setup.goScenicList
              }, "更多 ›")
            ]),
            vue.createElementVNode("scroll-view", {
              "scroll-x": "",
              class: "scenic-scroll",
              "show-scrollbar": false
            }, [
              vue.createElementVNode("view", { class: "scenic-list" }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($setup.hotScenics, (item) => {
                    return vue.openBlock(), vue.createBlock($setup["ScenicCard"], {
                      key: item.id,
                      item
                    }, null, 8, ["item"]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])
            ])
          ]),
          vue.createCommentVNode(" 热门活动 "),
          vue.createElementVNode("view", { class: "section" }, [
            vue.createElementVNode("view", { class: "section-header" }, [
              vue.createElementVNode("text", { class: "section-title" }, "热门活动"),
              vue.createElementVNode("text", {
                class: "section-more",
                onClick: $setup.goActivityList
              }, "更多 ›")
            ]),
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($setup.hotActivities, (item) => {
                return vue.openBlock(), vue.createBlock($setup["ActivityCard"], {
                  key: item.id,
                  item
                }, null, 8, ["item"]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ]),
          vue.createCommentVNode(" 推荐攻略 "),
          vue.createElementVNode("view", { class: "section" }, [
            vue.createElementVNode("view", { class: "section-header" }, [
              vue.createElementVNode("text", { class: "section-title" }, "推荐攻略"),
              vue.createElementVNode("text", {
                class: "section-more",
                onClick: $setup.goCommunity
              }, "更多 ›")
            ]),
            vue.createElementVNode("view", { class: "post-grid" }, [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList($setup.hotPosts, (post) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    key: post.id,
                    class: "post-item",
                    onClick: ($event) => $setup.goPostDetail(post.id)
                  }, [
                    vue.createElementVNode("image", {
                      class: "post-cover",
                      src: post.cover,
                      mode: "aspectFill"
                    }, null, 8, ["src"]),
                    vue.createElementVNode(
                      "text",
                      { class: "post-title text-ellipsis-2" },
                      vue.toDisplayString(post.title),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode("view", { class: "post-meta" }, [
                      vue.createElementVNode(
                        "text",
                        { class: "post-author" },
                        vue.toDisplayString(post.author.nickname),
                        1
                        /* TEXT */
                      ),
                      vue.createElementVNode(
                        "text",
                        { class: "post-like" },
                        "❤️ " + vue.toDisplayString($setup.formatCount(post.likeCount)),
                        1
                        /* TEXT */
                      )
                    ])
                  ], 8, ["onClick"]);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ])
          ]),
          vue.createElementVNode("view", {
            class: "safe-bottom",
            style: { "height": "40rpx" }
          })
        ],
        4
        /* STYLE */
      )
    ]);
  }
  const PagesHomeIndex = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["render", _sfc_render$m], ["__scopeId", "data-v-2c5296db"], ["__file", "D:/geek/AI文旅/geek012/frontend/src/pages/home/index.vue"]]);
  const _sfc_main$m = /* @__PURE__ */ vue.defineComponent({
    __name: "LoadingView",
    props: {
      text: { type: String, required: false, default: "加载中..." }
    },
    setup(__props, { expose: __expose }) {
      __expose();
      const __returned__ = {};
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$l(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "loading-view" }, [
      vue.createElementVNode("view", { class: "spinner" }),
      vue.createElementVNode(
        "text",
        { class: "loading-text" },
        vue.toDisplayString($props.text),
        1
        /* TEXT */
      )
    ]);
  }
  const LoadingView = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["render", _sfc_render$l], ["__scopeId", "data-v-c2822a7d"], ["__file", "D:/geek/AI文旅/geek012/frontend/src/components/LoadingView/LoadingView.vue"]]);
  const _sfc_main$l = /* @__PURE__ */ vue.defineComponent({
    __name: "EmptyState",
    props: {
      icon: { type: String, required: false, default: "🗺️" },
      title: { type: String, required: false, default: "暂无数据" },
      description: { type: String, required: false, default: "" },
      buttonText: { type: String, required: false, default: "" }
    },
    emits: ["action"],
    setup(__props, { expose: __expose }) {
      __expose();
      const __returned__ = {};
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$k(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "empty-state" }, [
      vue.createElementVNode(
        "text",
        { class: "empty-icon" },
        vue.toDisplayString($props.icon),
        1
        /* TEXT */
      ),
      vue.createElementVNode(
        "text",
        { class: "empty-title" },
        vue.toDisplayString($props.title),
        1
        /* TEXT */
      ),
      $props.description ? (vue.openBlock(), vue.createElementBlock(
        "text",
        {
          key: 0,
          class: "empty-desc"
        },
        vue.toDisplayString($props.description),
        1
        /* TEXT */
      )) : vue.createCommentVNode("v-if", true),
      $props.buttonText ? (vue.openBlock(), vue.createElementBlock(
        "button",
        {
          key: 1,
          class: "empty-btn",
          onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("action"))
        },
        vue.toDisplayString($props.buttonText),
        1
        /* TEXT */
      )) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const EmptyState = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["render", _sfc_render$k], ["__scopeId", "data-v-00c0c74e"], ["__file", "D:/geek/AI文旅/geek012/frontend/src/components/EmptyState/EmptyState.vue"]]);
  const _sfc_main$k = /* @__PURE__ */ vue.defineComponent({
    __name: "index",
    setup(__props, { expose: __expose }) {
      __expose();
      const systemInfo = uni.getSystemInfoSync();
      const navHeight = (systemInfo.statusBarHeight || 20) + 44;
      const tabs = [
        { key: "scenic", label: "景点" },
        { key: "activity", label: "活动" }
      ];
      const activeTab = vue.ref("scenic");
      const loading = vue.ref(false);
      const scenics = vue.ref([]);
      const activities = vue.ref([]);
      const scenicCategory = vue.ref("全部");
      const activityCategory = vue.ref("全部");
      const isEmpty = vue.computed(() => {
        return activeTab.value === "scenic" ? scenics.value.length === 0 : activities.value.length === 0;
      });
      async function loadScenics() {
        loading.value = true;
        const category = scenicCategory.value === "全部" ? void 0 : scenicCategory.value;
        const res = await withFallback(
          () => getScenicList({ category, page: 1, pageSize: 20 }),
          { records: mockScenics, total: mockScenics.length, page: 1, pageSize: 20 }
        );
        scenics.value = res.records;
        loading.value = false;
      }
      async function loadActivities() {
        loading.value = true;
        const category = activityCategory.value === "全部" ? void 0 : activityCategory.value;
        const res = await withFallback(
          () => getActivityList({ category, page: 1, pageSize: 20 }),
          { records: mockActivities, total: mockActivities.length }
        );
        activities.value = res.records;
        loading.value = false;
      }
      vue.watch([activeTab, scenicCategory], () => {
        if (activeTab.value === "scenic")
          loadScenics();
      });
      vue.watch(activityCategory, () => {
        if (activeTab.value === "activity")
          loadActivities();
      });
      vue.onMounted(() => {
        loadScenics();
      });
      const __returned__ = { systemInfo, navHeight, tabs, activeTab, loading, scenics, activities, scenicCategory, activityCategory, isEmpty, loadScenics, loadActivities, CustomNavbar, ScenicCard, ActivityCard, LoadingView, EmptyState, get SCENIC_CATEGORIES() {
        return SCENIC_CATEGORIES;
      }, get ACTIVITY_CATEGORIES() {
        return ACTIVITY_CATEGORIES;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$j(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "page" }, [
      vue.createVNode($setup["CustomNavbar"], { title: "发现" }),
      vue.createElementVNode(
        "scroll-view",
        {
          "scroll-y": "",
          class: "scroll-content",
          style: vue.normalizeStyle({ paddingTop: $setup.navHeight + "px" })
        },
        [
          vue.createCommentVNode(" Tab 切换 "),
          vue.createElementVNode("view", { class: "tabs" }, [
            (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($setup.tabs, (tab) => {
                return vue.createElementVNode("text", {
                  key: tab.key,
                  class: vue.normalizeClass(["tab-item", { active: $setup.activeTab === tab.key }]),
                  onClick: ($event) => $setup.activeTab = tab.key
                }, vue.toDisplayString(tab.label), 11, ["onClick"]);
              }),
              64
              /* STABLE_FRAGMENT */
            ))
          ]),
          vue.createCommentVNode(" 景点 "),
          $setup.activeTab === "scenic" ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "content"
          }, [
            vue.createElementVNode("view", { class: "filter-bar" }, [
              vue.createElementVNode("scroll-view", {
                "scroll-x": "",
                class: "filter-scroll"
              }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($setup.SCENIC_CATEGORIES, (cat) => {
                    return vue.openBlock(), vue.createElementBlock("text", {
                      key: cat,
                      class: vue.normalizeClass(["filter-tag", { active: $setup.scenicCategory === cat }]),
                      onClick: ($event) => $setup.scenicCategory = cat
                    }, vue.toDisplayString(cat), 11, ["onClick"]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])
            ]),
            vue.createElementVNode("view", { class: "grid" }, [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList($setup.scenics, (item) => {
                  return vue.openBlock(), vue.createBlock($setup["ScenicCard"], {
                    key: item.id,
                    item,
                    class: "grid-item"
                  }, null, 8, ["item"]);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ])
          ])) : vue.createCommentVNode("v-if", true),
          vue.createCommentVNode(" 活动 "),
          $setup.activeTab === "activity" ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 1,
            class: "content"
          }, [
            vue.createElementVNode("view", { class: "filter-bar" }, [
              vue.createElementVNode("scroll-view", {
                "scroll-x": "",
                class: "filter-scroll"
              }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($setup.ACTIVITY_CATEGORIES, (cat) => {
                    return vue.openBlock(), vue.createElementBlock("text", {
                      key: cat,
                      class: vue.normalizeClass(["filter-tag", { active: $setup.activityCategory === cat }]),
                      onClick: ($event) => $setup.activityCategory = cat
                    }, vue.toDisplayString(cat), 11, ["onClick"]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])
            ]),
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($setup.activities, (item) => {
                return vue.openBlock(), vue.createBlock($setup["ActivityCard"], {
                  key: item.id,
                  item
                }, null, 8, ["item"]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ])) : vue.createCommentVNode("v-if", true),
          $setup.loading ? (vue.openBlock(), vue.createBlock($setup["LoadingView"], { key: 2 })) : vue.createCommentVNode("v-if", true),
          !$setup.loading && $setup.isEmpty ? (vue.openBlock(), vue.createBlock($setup["EmptyState"], {
            key: 3,
            title: "暂无内容"
          })) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode("view", {
            class: "safe-bottom",
            style: { "height": "40rpx" }
          })
        ],
        4
        /* STYLE */
      )
    ]);
  }
  const PagesDiscoverIndex = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["render", _sfc_render$j], ["__scopeId", "data-v-20534a7c"], ["__file", "D:/geek/AI文旅/geek012/frontend/src/pages/discover/index.vue"]]);
  function set(target, key, val) {
    if (Array.isArray(target)) {
      target.length = Math.max(target.length, key);
      target.splice(key, 1, val);
      return val;
    }
    target[key] = val;
    return val;
  }
  function del(target, key) {
    if (Array.isArray(target)) {
      target.splice(key, 1);
      return;
    }
    delete target[key];
  }
  function getDevtoolsGlobalHook() {
    return getTarget().__VUE_DEVTOOLS_GLOBAL_HOOK__;
  }
  function getTarget() {
    return typeof navigator !== "undefined" && typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : {};
  }
  const isProxyAvailable = typeof Proxy === "function";
  const HOOK_SETUP = "devtools-plugin:setup";
  const HOOK_PLUGIN_SETTINGS_SET = "plugin:settings:set";
  let supported;
  let perf;
  function isPerformanceSupported() {
    var _a;
    if (supported !== void 0) {
      return supported;
    }
    if (typeof window !== "undefined" && window.performance) {
      supported = true;
      perf = window.performance;
    } else if (typeof globalThis !== "undefined" && ((_a = globalThis.perf_hooks) === null || _a === void 0 ? void 0 : _a.performance)) {
      supported = true;
      perf = globalThis.perf_hooks.performance;
    } else {
      supported = false;
    }
    return supported;
  }
  function now() {
    return isPerformanceSupported() ? perf.now() : Date.now();
  }
  class ApiProxy {
    constructor(plugin, hook) {
      this.target = null;
      this.targetQueue = [];
      this.onQueue = [];
      this.plugin = plugin;
      this.hook = hook;
      const defaultSettings = {};
      if (plugin.settings) {
        for (const id in plugin.settings) {
          const item = plugin.settings[id];
          defaultSettings[id] = item.defaultValue;
        }
      }
      const localSettingsSaveId = `__vue-devtools-plugin-settings__${plugin.id}`;
      let currentSettings = Object.assign({}, defaultSettings);
      try {
        const raw = localStorage.getItem(localSettingsSaveId);
        const data = JSON.parse(raw);
        Object.assign(currentSettings, data);
      } catch (e) {
      }
      this.fallbacks = {
        getSettings() {
          return currentSettings;
        },
        setSettings(value) {
          try {
            localStorage.setItem(localSettingsSaveId, JSON.stringify(value));
          } catch (e) {
          }
          currentSettings = value;
        },
        now() {
          return now();
        }
      };
      if (hook) {
        hook.on(HOOK_PLUGIN_SETTINGS_SET, (pluginId, value) => {
          if (pluginId === this.plugin.id) {
            this.fallbacks.setSettings(value);
          }
        });
      }
      this.proxiedOn = new Proxy({}, {
        get: (_target, prop) => {
          if (this.target) {
            return this.target.on[prop];
          } else {
            return (...args) => {
              this.onQueue.push({
                method: prop,
                args
              });
            };
          }
        }
      });
      this.proxiedTarget = new Proxy({}, {
        get: (_target, prop) => {
          if (this.target) {
            return this.target[prop];
          } else if (prop === "on") {
            return this.proxiedOn;
          } else if (Object.keys(this.fallbacks).includes(prop)) {
            return (...args) => {
              this.targetQueue.push({
                method: prop,
                args,
                resolve: () => {
                }
              });
              return this.fallbacks[prop](...args);
            };
          } else {
            return (...args) => {
              return new Promise((resolve) => {
                this.targetQueue.push({
                  method: prop,
                  args,
                  resolve
                });
              });
            };
          }
        }
      });
    }
    async setRealTarget(target) {
      this.target = target;
      for (const item of this.onQueue) {
        this.target.on[item.method](...item.args);
      }
      for (const item of this.targetQueue) {
        item.resolve(await this.target[item.method](...item.args));
      }
    }
  }
  function setupDevtoolsPlugin(pluginDescriptor, setupFn) {
    const descriptor = pluginDescriptor;
    const target = getTarget();
    const hook = getDevtoolsGlobalHook();
    const enableProxy = isProxyAvailable && descriptor.enableEarlyProxy;
    if (hook && (target.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !enableProxy)) {
      hook.emit(HOOK_SETUP, pluginDescriptor, setupFn);
    } else {
      const proxy = enableProxy ? new ApiProxy(descriptor, hook) : null;
      const list = target.__VUE_DEVTOOLS_PLUGINS__ = target.__VUE_DEVTOOLS_PLUGINS__ || [];
      list.push({
        pluginDescriptor: descriptor,
        setupFn,
        proxy
      });
      if (proxy) {
        setupFn(proxy.proxiedTarget);
      }
    }
  }
  /*!
   * pinia v2.3.1
   * (c) 2025 Eduardo San Martin Morote
   * @license MIT
   */
  let activePinia;
  const setActivePinia = (pinia) => activePinia = pinia;
  const piniaSymbol = Symbol("pinia");
  function isPlainObject(o) {
    return o && typeof o === "object" && Object.prototype.toString.call(o) === "[object Object]" && typeof o.toJSON !== "function";
  }
  var MutationType;
  (function(MutationType2) {
    MutationType2["direct"] = "direct";
    MutationType2["patchObject"] = "patch object";
    MutationType2["patchFunction"] = "patch function";
  })(MutationType || (MutationType = {}));
  const IS_CLIENT = typeof window !== "undefined";
  const _global = /* @__PURE__ */ (() => typeof window === "object" && window.window === window ? window : typeof self === "object" && self.self === self ? self : typeof global === "object" && global.global === global ? global : typeof globalThis === "object" ? globalThis : { HTMLElement: null })();
  function bom(blob, { autoBom = false } = {}) {
    if (autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
      return new Blob([String.fromCharCode(65279), blob], { type: blob.type });
    }
    return blob;
  }
  function download(url, name, opts) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.onload = function() {
      saveAs(xhr.response, name, opts);
    };
    xhr.onerror = function() {
      console.error("could not download file");
    };
    xhr.send();
  }
  function corsEnabled(url) {
    const xhr = new XMLHttpRequest();
    xhr.open("HEAD", url, false);
    try {
      xhr.send();
    } catch (e) {
    }
    return xhr.status >= 200 && xhr.status <= 299;
  }
  function click(node) {
    try {
      node.dispatchEvent(new MouseEvent("click"));
    } catch (e) {
      const evt = document.createEvent("MouseEvents");
      evt.initMouseEvent("click", true, true, window, 0, 0, 0, 80, 20, false, false, false, false, 0, null);
      node.dispatchEvent(evt);
    }
  }
  const _navigator = typeof navigator === "object" ? navigator : { userAgent: "" };
  const isMacOSWebView = /* @__PURE__ */ (() => /Macintosh/.test(_navigator.userAgent) && /AppleWebKit/.test(_navigator.userAgent) && !/Safari/.test(_navigator.userAgent))();
  const saveAs = !IS_CLIENT ? () => {
  } : (
    // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView or mini program
    typeof HTMLAnchorElement !== "undefined" && "download" in HTMLAnchorElement.prototype && !isMacOSWebView ? downloadSaveAs : (
      // Use msSaveOrOpenBlob as a second approach
      "msSaveOrOpenBlob" in _navigator ? msSaveAs : (
        // Fallback to using FileReader and a popup
        fileSaverSaveAs
      )
    )
  );
  function downloadSaveAs(blob, name = "download", opts) {
    const a = document.createElement("a");
    a.download = name;
    a.rel = "noopener";
    if (typeof blob === "string") {
      a.href = blob;
      if (a.origin !== location.origin) {
        if (corsEnabled(a.href)) {
          download(blob, name, opts);
        } else {
          a.target = "_blank";
          click(a);
        }
      } else {
        click(a);
      }
    } else {
      a.href = URL.createObjectURL(blob);
      setTimeout(function() {
        URL.revokeObjectURL(a.href);
      }, 4e4);
      setTimeout(function() {
        click(a);
      }, 0);
    }
  }
  function msSaveAs(blob, name = "download", opts) {
    if (typeof blob === "string") {
      if (corsEnabled(blob)) {
        download(blob, name, opts);
      } else {
        const a = document.createElement("a");
        a.href = blob;
        a.target = "_blank";
        setTimeout(function() {
          click(a);
        });
      }
    } else {
      navigator.msSaveOrOpenBlob(bom(blob, opts), name);
    }
  }
  function fileSaverSaveAs(blob, name, opts, popup) {
    popup = popup || open("", "_blank");
    if (popup) {
      popup.document.title = popup.document.body.innerText = "downloading...";
    }
    if (typeof blob === "string")
      return download(blob, name, opts);
    const force = blob.type === "application/octet-stream";
    const isSafari = /constructor/i.test(String(_global.HTMLElement)) || "safari" in _global;
    const isChromeIOS = /CriOS\/[\d]+/.test(navigator.userAgent);
    if ((isChromeIOS || force && isSafari || isMacOSWebView) && typeof FileReader !== "undefined") {
      const reader = new FileReader();
      reader.onloadend = function() {
        let url = reader.result;
        if (typeof url !== "string") {
          popup = null;
          throw new Error("Wrong reader.result type");
        }
        url = isChromeIOS ? url : url.replace(/^data:[^;]*;/, "data:attachment/file;");
        if (popup) {
          popup.location.href = url;
        } else {
          location.assign(url);
        }
        popup = null;
      };
      reader.readAsDataURL(blob);
    } else {
      const url = URL.createObjectURL(blob);
      if (popup)
        popup.location.assign(url);
      else
        location.href = url;
      popup = null;
      setTimeout(function() {
        URL.revokeObjectURL(url);
      }, 4e4);
    }
  }
  function toastMessage(message, type) {
    const piniaMessage = "🍍 " + message;
    if (typeof __VUE_DEVTOOLS_TOAST__ === "function") {
      __VUE_DEVTOOLS_TOAST__(piniaMessage, type);
    } else if (type === "error") {
      console.error(piniaMessage);
    } else if (type === "warn") {
      console.warn(piniaMessage);
    } else {
      console.log(piniaMessage);
    }
  }
  function isPinia(o) {
    return "_a" in o && "install" in o;
  }
  function checkClipboardAccess() {
    if (!("clipboard" in navigator)) {
      toastMessage(`Your browser doesn't support the Clipboard API`, "error");
      return true;
    }
  }
  function checkNotFocusedError(error) {
    if (error instanceof Error && error.message.toLowerCase().includes("document is not focused")) {
      toastMessage('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', "warn");
      return true;
    }
    return false;
  }
  async function actionGlobalCopyState(pinia) {
    if (checkClipboardAccess())
      return;
    try {
      await navigator.clipboard.writeText(JSON.stringify(pinia.state.value));
      toastMessage("Global state copied to clipboard.");
    } catch (error) {
      if (checkNotFocusedError(error))
        return;
      toastMessage(`Failed to serialize the state. Check the console for more details.`, "error");
      console.error(error);
    }
  }
  async function actionGlobalPasteState(pinia) {
    if (checkClipboardAccess())
      return;
    try {
      loadStoresState(pinia, JSON.parse(await navigator.clipboard.readText()));
      toastMessage("Global state pasted from clipboard.");
    } catch (error) {
      if (checkNotFocusedError(error))
        return;
      toastMessage(`Failed to deserialize the state from clipboard. Check the console for more details.`, "error");
      console.error(error);
    }
  }
  async function actionGlobalSaveState(pinia) {
    try {
      saveAs(new Blob([JSON.stringify(pinia.state.value)], {
        type: "text/plain;charset=utf-8"
      }), "pinia-state.json");
    } catch (error) {
      toastMessage(`Failed to export the state as JSON. Check the console for more details.`, "error");
      console.error(error);
    }
  }
  let fileInput;
  function getFileOpener() {
    if (!fileInput) {
      fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = ".json";
    }
    function openFile() {
      return new Promise((resolve, reject) => {
        fileInput.onchange = async () => {
          const files = fileInput.files;
          if (!files)
            return resolve(null);
          const file = files.item(0);
          if (!file)
            return resolve(null);
          return resolve({ text: await file.text(), file });
        };
        fileInput.oncancel = () => resolve(null);
        fileInput.onerror = reject;
        fileInput.click();
      });
    }
    return openFile;
  }
  async function actionGlobalOpenStateFile(pinia) {
    try {
      const open2 = getFileOpener();
      const result = await open2();
      if (!result)
        return;
      const { text, file } = result;
      loadStoresState(pinia, JSON.parse(text));
      toastMessage(`Global state imported from "${file.name}".`);
    } catch (error) {
      toastMessage(`Failed to import the state from JSON. Check the console for more details.`, "error");
      console.error(error);
    }
  }
  function loadStoresState(pinia, state) {
    for (const key in state) {
      const storeState = pinia.state.value[key];
      if (storeState) {
        Object.assign(storeState, state[key]);
      } else {
        pinia.state.value[key] = state[key];
      }
    }
  }
  function formatDisplay(display) {
    return {
      _custom: {
        display
      }
    };
  }
  const PINIA_ROOT_LABEL = "🍍 Pinia (root)";
  const PINIA_ROOT_ID = "_root";
  function formatStoreForInspectorTree(store) {
    return isPinia(store) ? {
      id: PINIA_ROOT_ID,
      label: PINIA_ROOT_LABEL
    } : {
      id: store.$id,
      label: store.$id
    };
  }
  function formatStoreForInspectorState(store) {
    if (isPinia(store)) {
      const storeNames = Array.from(store._s.keys());
      const storeMap = store._s;
      const state2 = {
        state: storeNames.map((storeId) => ({
          editable: true,
          key: storeId,
          value: store.state.value[storeId]
        })),
        getters: storeNames.filter((id) => storeMap.get(id)._getters).map((id) => {
          const store2 = storeMap.get(id);
          return {
            editable: false,
            key: id,
            value: store2._getters.reduce((getters, key) => {
              getters[key] = store2[key];
              return getters;
            }, {})
          };
        })
      };
      return state2;
    }
    const state = {
      state: Object.keys(store.$state).map((key) => ({
        editable: true,
        key,
        value: store.$state[key]
      }))
    };
    if (store._getters && store._getters.length) {
      state.getters = store._getters.map((getterName) => ({
        editable: false,
        key: getterName,
        value: store[getterName]
      }));
    }
    if (store._customProperties.size) {
      state.customProperties = Array.from(store._customProperties).map((key) => ({
        editable: true,
        key,
        value: store[key]
      }));
    }
    return state;
  }
  function formatEventData(events) {
    if (!events)
      return {};
    if (Array.isArray(events)) {
      return events.reduce((data, event) => {
        data.keys.push(event.key);
        data.operations.push(event.type);
        data.oldValue[event.key] = event.oldValue;
        data.newValue[event.key] = event.newValue;
        return data;
      }, {
        oldValue: {},
        keys: [],
        operations: [],
        newValue: {}
      });
    } else {
      return {
        operation: formatDisplay(events.type),
        key: formatDisplay(events.key),
        oldValue: events.oldValue,
        newValue: events.newValue
      };
    }
  }
  function formatMutationType(type) {
    switch (type) {
      case MutationType.direct:
        return "mutation";
      case MutationType.patchFunction:
        return "$patch";
      case MutationType.patchObject:
        return "$patch";
      default:
        return "unknown";
    }
  }
  let isTimelineActive = true;
  const componentStateTypes = [];
  const MUTATIONS_LAYER_ID = "pinia:mutations";
  const INSPECTOR_ID = "pinia";
  const { assign: assign$1 } = Object;
  const getStoreType = (id) => "🍍 " + id;
  function registerPiniaDevtools(app, pinia) {
    setupDevtoolsPlugin({
      id: "dev.esm.pinia",
      label: "Pinia 🍍",
      logo: "https://pinia.vuejs.org/logo.svg",
      packageName: "pinia",
      homepage: "https://pinia.vuejs.org",
      componentStateTypes,
      app
    }, (api) => {
      if (typeof api.now !== "function") {
        toastMessage("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html.");
      }
      api.addTimelineLayer({
        id: MUTATIONS_LAYER_ID,
        label: `Pinia 🍍`,
        color: 15064968
      });
      api.addInspector({
        id: INSPECTOR_ID,
        label: "Pinia 🍍",
        icon: "storage",
        treeFilterPlaceholder: "Search stores",
        actions: [
          {
            icon: "content_copy",
            action: () => {
              actionGlobalCopyState(pinia);
            },
            tooltip: "Serialize and copy the state"
          },
          {
            icon: "content_paste",
            action: async () => {
              await actionGlobalPasteState(pinia);
              api.sendInspectorTree(INSPECTOR_ID);
              api.sendInspectorState(INSPECTOR_ID);
            },
            tooltip: "Replace the state with the content of your clipboard"
          },
          {
            icon: "save",
            action: () => {
              actionGlobalSaveState(pinia);
            },
            tooltip: "Save the state as a JSON file"
          },
          {
            icon: "folder_open",
            action: async () => {
              await actionGlobalOpenStateFile(pinia);
              api.sendInspectorTree(INSPECTOR_ID);
              api.sendInspectorState(INSPECTOR_ID);
            },
            tooltip: "Import the state from a JSON file"
          }
        ],
        nodeActions: [
          {
            icon: "restore",
            tooltip: 'Reset the state (with "$reset")',
            action: (nodeId) => {
              const store = pinia._s.get(nodeId);
              if (!store) {
                toastMessage(`Cannot reset "${nodeId}" store because it wasn't found.`, "warn");
              } else if (typeof store.$reset !== "function") {
                toastMessage(`Cannot reset "${nodeId}" store because it doesn't have a "$reset" method implemented.`, "warn");
              } else {
                store.$reset();
                toastMessage(`Store "${nodeId}" reset.`);
              }
            }
          }
        ]
      });
      api.on.inspectComponent((payload, ctx) => {
        const proxy = payload.componentInstance && payload.componentInstance.proxy;
        if (proxy && proxy._pStores) {
          const piniaStores = payload.componentInstance.proxy._pStores;
          Object.values(piniaStores).forEach((store) => {
            payload.instanceData.state.push({
              type: getStoreType(store.$id),
              key: "state",
              editable: true,
              value: store._isOptionsAPI ? {
                _custom: {
                  value: vue.toRaw(store.$state),
                  actions: [
                    {
                      icon: "restore",
                      tooltip: "Reset the state of this store",
                      action: () => store.$reset()
                    }
                  ]
                }
              } : (
                // NOTE: workaround to unwrap transferred refs
                Object.keys(store.$state).reduce((state, key) => {
                  state[key] = store.$state[key];
                  return state;
                }, {})
              )
            });
            if (store._getters && store._getters.length) {
              payload.instanceData.state.push({
                type: getStoreType(store.$id),
                key: "getters",
                editable: false,
                value: store._getters.reduce((getters, key) => {
                  try {
                    getters[key] = store[key];
                  } catch (error) {
                    getters[key] = error;
                  }
                  return getters;
                }, {})
              });
            }
          });
        }
      });
      api.on.getInspectorTree((payload) => {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          let stores = [pinia];
          stores = stores.concat(Array.from(pinia._s.values()));
          payload.rootNodes = (payload.filter ? stores.filter((store) => "$id" in store ? store.$id.toLowerCase().includes(payload.filter.toLowerCase()) : PINIA_ROOT_LABEL.toLowerCase().includes(payload.filter.toLowerCase())) : stores).map(formatStoreForInspectorTree);
        }
      });
      globalThis.$pinia = pinia;
      api.on.getInspectorState((payload) => {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          const inspectedStore = payload.nodeId === PINIA_ROOT_ID ? pinia : pinia._s.get(payload.nodeId);
          if (!inspectedStore) {
            return;
          }
          if (inspectedStore) {
            if (payload.nodeId !== PINIA_ROOT_ID)
              globalThis.$store = vue.toRaw(inspectedStore);
            payload.state = formatStoreForInspectorState(inspectedStore);
          }
        }
      });
      api.on.editInspectorState((payload, ctx) => {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          const inspectedStore = payload.nodeId === PINIA_ROOT_ID ? pinia : pinia._s.get(payload.nodeId);
          if (!inspectedStore) {
            return toastMessage(`store "${payload.nodeId}" not found`, "error");
          }
          const { path } = payload;
          if (!isPinia(inspectedStore)) {
            if (path.length !== 1 || !inspectedStore._customProperties.has(path[0]) || path[0] in inspectedStore.$state) {
              path.unshift("$state");
            }
          } else {
            path.unshift("state");
          }
          isTimelineActive = false;
          payload.set(inspectedStore, path, payload.state.value);
          isTimelineActive = true;
        }
      });
      api.on.editComponentState((payload) => {
        if (payload.type.startsWith("🍍")) {
          const storeId = payload.type.replace(/^🍍\s*/, "");
          const store = pinia._s.get(storeId);
          if (!store) {
            return toastMessage(`store "${storeId}" not found`, "error");
          }
          const { path } = payload;
          if (path[0] !== "state") {
            return toastMessage(`Invalid path for store "${storeId}":
${path}
Only state can be modified.`);
          }
          path[0] = "$state";
          isTimelineActive = false;
          payload.set(store, path, payload.state.value);
          isTimelineActive = true;
        }
      });
    });
  }
  function addStoreToDevtools(app, store) {
    if (!componentStateTypes.includes(getStoreType(store.$id))) {
      componentStateTypes.push(getStoreType(store.$id));
    }
    setupDevtoolsPlugin({
      id: "dev.esm.pinia",
      label: "Pinia 🍍",
      logo: "https://pinia.vuejs.org/logo.svg",
      packageName: "pinia",
      homepage: "https://pinia.vuejs.org",
      componentStateTypes,
      app,
      settings: {
        logStoreChanges: {
          label: "Notify about new/deleted stores",
          type: "boolean",
          defaultValue: true
        }
        // useEmojis: {
        //   label: 'Use emojis in messages ⚡️',
        //   type: 'boolean',
        //   defaultValue: true,
        // },
      }
    }, (api) => {
      const now2 = typeof api.now === "function" ? api.now.bind(api) : Date.now;
      store.$onAction(({ after, onError, name, args }) => {
        const groupId = runningActionId++;
        api.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: {
            time: now2(),
            title: "🛫 " + name,
            subtitle: "start",
            data: {
              store: formatDisplay(store.$id),
              action: formatDisplay(name),
              args
            },
            groupId
          }
        });
        after((result) => {
          activeAction = void 0;
          api.addTimelineEvent({
            layerId: MUTATIONS_LAYER_ID,
            event: {
              time: now2(),
              title: "🛬 " + name,
              subtitle: "end",
              data: {
                store: formatDisplay(store.$id),
                action: formatDisplay(name),
                args,
                result
              },
              groupId
            }
          });
        });
        onError((error) => {
          activeAction = void 0;
          api.addTimelineEvent({
            layerId: MUTATIONS_LAYER_ID,
            event: {
              time: now2(),
              logType: "error",
              title: "💥 " + name,
              subtitle: "end",
              data: {
                store: formatDisplay(store.$id),
                action: formatDisplay(name),
                args,
                error
              },
              groupId
            }
          });
        });
      }, true);
      store._customProperties.forEach((name) => {
        vue.watch(() => vue.unref(store[name]), (newValue, oldValue) => {
          api.notifyComponentUpdate();
          api.sendInspectorState(INSPECTOR_ID);
          if (isTimelineActive) {
            api.addTimelineEvent({
              layerId: MUTATIONS_LAYER_ID,
              event: {
                time: now2(),
                title: "Change",
                subtitle: name,
                data: {
                  newValue,
                  oldValue
                },
                groupId: activeAction
              }
            });
          }
        }, { deep: true });
      });
      store.$subscribe(({ events, type }, state) => {
        api.notifyComponentUpdate();
        api.sendInspectorState(INSPECTOR_ID);
        if (!isTimelineActive)
          return;
        const eventData = {
          time: now2(),
          title: formatMutationType(type),
          data: assign$1({ store: formatDisplay(store.$id) }, formatEventData(events)),
          groupId: activeAction
        };
        if (type === MutationType.patchFunction) {
          eventData.subtitle = "⤵️";
        } else if (type === MutationType.patchObject) {
          eventData.subtitle = "🧩";
        } else if (events && !Array.isArray(events)) {
          eventData.subtitle = events.type;
        }
        if (events) {
          eventData.data["rawEvent(s)"] = {
            _custom: {
              display: "DebuggerEvent",
              type: "object",
              tooltip: "raw DebuggerEvent[]",
              value: events
            }
          };
        }
        api.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: eventData
        });
      }, { detached: true, flush: "sync" });
      const hotUpdate = store._hotUpdate;
      store._hotUpdate = vue.markRaw((newStore) => {
        hotUpdate(newStore);
        api.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: {
            time: now2(),
            title: "🔥 " + store.$id,
            subtitle: "HMR update",
            data: {
              store: formatDisplay(store.$id),
              info: formatDisplay(`HMR update`)
            }
          }
        });
        api.notifyComponentUpdate();
        api.sendInspectorTree(INSPECTOR_ID);
        api.sendInspectorState(INSPECTOR_ID);
      });
      const { $dispose } = store;
      store.$dispose = () => {
        $dispose();
        api.notifyComponentUpdate();
        api.sendInspectorTree(INSPECTOR_ID);
        api.sendInspectorState(INSPECTOR_ID);
        api.getSettings().logStoreChanges && toastMessage(`Disposed "${store.$id}" store 🗑`);
      };
      api.notifyComponentUpdate();
      api.sendInspectorTree(INSPECTOR_ID);
      api.sendInspectorState(INSPECTOR_ID);
      api.getSettings().logStoreChanges && toastMessage(`"${store.$id}" store installed 🆕`);
    });
  }
  let runningActionId = 0;
  let activeAction;
  function patchActionForGrouping(store, actionNames, wrapWithProxy) {
    const actions = actionNames.reduce((storeActions, actionName) => {
      storeActions[actionName] = vue.toRaw(store)[actionName];
      return storeActions;
    }, {});
    for (const actionName in actions) {
      store[actionName] = function() {
        const _actionId = runningActionId;
        const trackedStore = wrapWithProxy ? new Proxy(store, {
          get(...args) {
            activeAction = _actionId;
            return Reflect.get(...args);
          },
          set(...args) {
            activeAction = _actionId;
            return Reflect.set(...args);
          }
        }) : store;
        activeAction = _actionId;
        const retValue = actions[actionName].apply(trackedStore, arguments);
        activeAction = void 0;
        return retValue;
      };
    }
  }
  function devtoolsPlugin({ app, store, options }) {
    if (store.$id.startsWith("__hot:")) {
      return;
    }
    store._isOptionsAPI = !!options.state;
    if (!store._p._testing) {
      patchActionForGrouping(store, Object.keys(options.actions), store._isOptionsAPI);
      const originalHotUpdate = store._hotUpdate;
      vue.toRaw(store)._hotUpdate = function(newStore) {
        originalHotUpdate.apply(this, arguments);
        patchActionForGrouping(store, Object.keys(newStore._hmrPayload.actions), !!store._isOptionsAPI);
      };
    }
    addStoreToDevtools(
      app,
      // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
      store
    );
  }
  function createPinia() {
    const scope = vue.effectScope(true);
    const state = scope.run(() => vue.ref({}));
    let _p = [];
    let toBeInstalled = [];
    const pinia = vue.markRaw({
      install(app) {
        setActivePinia(pinia);
        {
          pinia._a = app;
          app.provide(piniaSymbol, pinia);
          app.config.globalProperties.$pinia = pinia;
          if (IS_CLIENT) {
            registerPiniaDevtools(app, pinia);
          }
          toBeInstalled.forEach((plugin) => _p.push(plugin));
          toBeInstalled = [];
        }
      },
      use(plugin) {
        if (!this._a && true) {
          toBeInstalled.push(plugin);
        } else {
          _p.push(plugin);
        }
        return this;
      },
      _p,
      // it's actually undefined here
      // @ts-expect-error
      _a: null,
      _e: scope,
      _s: /* @__PURE__ */ new Map(),
      state
    });
    if (IS_CLIENT && typeof Proxy !== "undefined") {
      pinia.use(devtoolsPlugin);
    }
    return pinia;
  }
  function patchObject(newState, oldState) {
    for (const key in oldState) {
      const subPatch = oldState[key];
      if (!(key in newState)) {
        continue;
      }
      const targetValue = newState[key];
      if (isPlainObject(targetValue) && isPlainObject(subPatch) && !vue.isRef(subPatch) && !vue.isReactive(subPatch)) {
        newState[key] = patchObject(targetValue, subPatch);
      } else {
        {
          newState[key] = subPatch;
        }
      }
    }
    return newState;
  }
  const noop = () => {
  };
  function addSubscription(subscriptions, callback, detached, onCleanup = noop) {
    subscriptions.push(callback);
    const removeSubscription = () => {
      const idx = subscriptions.indexOf(callback);
      if (idx > -1) {
        subscriptions.splice(idx, 1);
        onCleanup();
      }
    };
    if (!detached && vue.getCurrentScope()) {
      vue.onScopeDispose(removeSubscription);
    }
    return removeSubscription;
  }
  function triggerSubscriptions(subscriptions, ...args) {
    subscriptions.slice().forEach((callback) => {
      callback(...args);
    });
  }
  const fallbackRunWithContext = (fn) => fn();
  const ACTION_MARKER = Symbol();
  const ACTION_NAME = Symbol();
  function mergeReactiveObjects(target, patchToApply) {
    if (target instanceof Map && patchToApply instanceof Map) {
      patchToApply.forEach((value, key) => target.set(key, value));
    } else if (target instanceof Set && patchToApply instanceof Set) {
      patchToApply.forEach(target.add, target);
    }
    for (const key in patchToApply) {
      if (!patchToApply.hasOwnProperty(key))
        continue;
      const subPatch = patchToApply[key];
      const targetValue = target[key];
      if (isPlainObject(targetValue) && isPlainObject(subPatch) && target.hasOwnProperty(key) && !vue.isRef(subPatch) && !vue.isReactive(subPatch)) {
        target[key] = mergeReactiveObjects(targetValue, subPatch);
      } else {
        target[key] = subPatch;
      }
    }
    return target;
  }
  const skipHydrateSymbol = Symbol("pinia:skipHydration");
  function shouldHydrate(obj) {
    return !isPlainObject(obj) || !obj.hasOwnProperty(skipHydrateSymbol);
  }
  const { assign } = Object;
  function isComputed(o) {
    return !!(vue.isRef(o) && o.effect);
  }
  function createOptionsStore(id, options, pinia, hot) {
    const { state, actions, getters } = options;
    const initialState = pinia.state.value[id];
    let store;
    function setup() {
      if (!initialState && !hot) {
        {
          pinia.state.value[id] = state ? state() : {};
        }
      }
      const localState = hot ? (
        // use ref() to unwrap refs inside state TODO: check if this is still necessary
        vue.toRefs(vue.ref(state ? state() : {}).value)
      ) : vue.toRefs(pinia.state.value[id]);
      return assign(localState, actions, Object.keys(getters || {}).reduce((computedGetters, name) => {
        if (name in localState) {
          console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${name}" in store "${id}".`);
        }
        computedGetters[name] = vue.markRaw(vue.computed(() => {
          setActivePinia(pinia);
          const store2 = pinia._s.get(id);
          return getters[name].call(store2, store2);
        }));
        return computedGetters;
      }, {}));
    }
    store = createSetupStore(id, setup, options, pinia, hot, true);
    return store;
  }
  function createSetupStore($id, setup, options = {}, pinia, hot, isOptionsStore) {
    let scope;
    const optionsForPlugin = assign({ actions: {} }, options);
    if (!pinia._e.active) {
      throw new Error("Pinia destroyed");
    }
    const $subscribeOptions = { deep: true };
    {
      $subscribeOptions.onTrigger = (event) => {
        if (isListening) {
          debuggerEvents = event;
        } else if (isListening == false && !store._hotUpdating) {
          if (Array.isArray(debuggerEvents)) {
            debuggerEvents.push(event);
          } else {
            console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug.");
          }
        }
      };
    }
    let isListening;
    let isSyncListening;
    let subscriptions = [];
    let actionSubscriptions = [];
    let debuggerEvents;
    const initialState = pinia.state.value[$id];
    if (!isOptionsStore && !initialState && !hot) {
      {
        pinia.state.value[$id] = {};
      }
    }
    const hotState = vue.ref({});
    let activeListener;
    function $patch(partialStateOrMutator) {
      let subscriptionMutation;
      isListening = isSyncListening = false;
      {
        debuggerEvents = [];
      }
      if (typeof partialStateOrMutator === "function") {
        partialStateOrMutator(pinia.state.value[$id]);
        subscriptionMutation = {
          type: MutationType.patchFunction,
          storeId: $id,
          events: debuggerEvents
        };
      } else {
        mergeReactiveObjects(pinia.state.value[$id], partialStateOrMutator);
        subscriptionMutation = {
          type: MutationType.patchObject,
          payload: partialStateOrMutator,
          storeId: $id,
          events: debuggerEvents
        };
      }
      const myListenerId = activeListener = Symbol();
      vue.nextTick().then(() => {
        if (activeListener === myListenerId) {
          isListening = true;
        }
      });
      isSyncListening = true;
      triggerSubscriptions(subscriptions, subscriptionMutation, pinia.state.value[$id]);
    }
    const $reset = isOptionsStore ? function $reset2() {
      const { state } = options;
      const newState = state ? state() : {};
      this.$patch(($state) => {
        assign($state, newState);
      });
    } : (
      /* istanbul ignore next */
      () => {
        throw new Error(`🍍: Store "${$id}" is built using the setup syntax and does not implement $reset().`);
      }
    );
    function $dispose() {
      scope.stop();
      subscriptions = [];
      actionSubscriptions = [];
      pinia._s.delete($id);
    }
    const action = (fn, name = "") => {
      if (ACTION_MARKER in fn) {
        fn[ACTION_NAME] = name;
        return fn;
      }
      const wrappedAction = function() {
        setActivePinia(pinia);
        const args = Array.from(arguments);
        const afterCallbackList = [];
        const onErrorCallbackList = [];
        function after(callback) {
          afterCallbackList.push(callback);
        }
        function onError(callback) {
          onErrorCallbackList.push(callback);
        }
        triggerSubscriptions(actionSubscriptions, {
          args,
          name: wrappedAction[ACTION_NAME],
          store,
          after,
          onError
        });
        let ret;
        try {
          ret = fn.apply(this && this.$id === $id ? this : store, args);
        } catch (error) {
          triggerSubscriptions(onErrorCallbackList, error);
          throw error;
        }
        if (ret instanceof Promise) {
          return ret.then((value) => {
            triggerSubscriptions(afterCallbackList, value);
            return value;
          }).catch((error) => {
            triggerSubscriptions(onErrorCallbackList, error);
            return Promise.reject(error);
          });
        }
        triggerSubscriptions(afterCallbackList, ret);
        return ret;
      };
      wrappedAction[ACTION_MARKER] = true;
      wrappedAction[ACTION_NAME] = name;
      return wrappedAction;
    };
    const _hmrPayload = /* @__PURE__ */ vue.markRaw({
      actions: {},
      getters: {},
      state: [],
      hotState
    });
    const partialStore = {
      _p: pinia,
      // _s: scope,
      $id,
      $onAction: addSubscription.bind(null, actionSubscriptions),
      $patch,
      $reset,
      $subscribe(callback, options2 = {}) {
        const removeSubscription = addSubscription(subscriptions, callback, options2.detached, () => stopWatcher());
        const stopWatcher = scope.run(() => vue.watch(() => pinia.state.value[$id], (state) => {
          if (options2.flush === "sync" ? isSyncListening : isListening) {
            callback({
              storeId: $id,
              type: MutationType.direct,
              events: debuggerEvents
            }, state);
          }
        }, assign({}, $subscribeOptions, options2)));
        return removeSubscription;
      },
      $dispose
    };
    const store = vue.reactive(assign(
      {
        _hmrPayload,
        _customProperties: vue.markRaw(/* @__PURE__ */ new Set())
        // devtools custom properties
      },
      partialStore
      // must be added later
      // setupStore
    ));
    pinia._s.set($id, store);
    const runWithContext = pinia._a && pinia._a.runWithContext || fallbackRunWithContext;
    const setupStore = runWithContext(() => pinia._e.run(() => (scope = vue.effectScope()).run(() => setup({ action }))));
    for (const key in setupStore) {
      const prop = setupStore[key];
      if (vue.isRef(prop) && !isComputed(prop) || vue.isReactive(prop)) {
        if (hot) {
          set(hotState.value, key, vue.toRef(setupStore, key));
        } else if (!isOptionsStore) {
          if (initialState && shouldHydrate(prop)) {
            if (vue.isRef(prop)) {
              prop.value = initialState[key];
            } else {
              mergeReactiveObjects(prop, initialState[key]);
            }
          }
          {
            pinia.state.value[$id][key] = prop;
          }
        }
        {
          _hmrPayload.state.push(key);
        }
      } else if (typeof prop === "function") {
        const actionValue = hot ? prop : action(prop, key);
        {
          setupStore[key] = actionValue;
        }
        {
          _hmrPayload.actions[key] = prop;
        }
        optionsForPlugin.actions[key] = prop;
      } else {
        if (isComputed(prop)) {
          _hmrPayload.getters[key] = isOptionsStore ? (
            // @ts-expect-error
            options.getters[key]
          ) : prop;
          if (IS_CLIENT) {
            const getters = setupStore._getters || // @ts-expect-error: same
            (setupStore._getters = vue.markRaw([]));
            getters.push(key);
          }
        }
      }
    }
    {
      assign(store, setupStore);
      assign(vue.toRaw(store), setupStore);
    }
    Object.defineProperty(store, "$state", {
      get: () => hot ? hotState.value : pinia.state.value[$id],
      set: (state) => {
        if (hot) {
          throw new Error("cannot set hotState");
        }
        $patch(($state) => {
          assign($state, state);
        });
      }
    });
    {
      store._hotUpdate = vue.markRaw((newStore) => {
        store._hotUpdating = true;
        newStore._hmrPayload.state.forEach((stateKey) => {
          if (stateKey in store.$state) {
            const newStateTarget = newStore.$state[stateKey];
            const oldStateSource = store.$state[stateKey];
            if (typeof newStateTarget === "object" && isPlainObject(newStateTarget) && isPlainObject(oldStateSource)) {
              patchObject(newStateTarget, oldStateSource);
            } else {
              newStore.$state[stateKey] = oldStateSource;
            }
          }
          set(store, stateKey, vue.toRef(newStore.$state, stateKey));
        });
        Object.keys(store.$state).forEach((stateKey) => {
          if (!(stateKey in newStore.$state)) {
            del(store, stateKey);
          }
        });
        isListening = false;
        isSyncListening = false;
        pinia.state.value[$id] = vue.toRef(newStore._hmrPayload, "hotState");
        isSyncListening = true;
        vue.nextTick().then(() => {
          isListening = true;
        });
        for (const actionName in newStore._hmrPayload.actions) {
          const actionFn = newStore[actionName];
          set(store, actionName, action(actionFn, actionName));
        }
        for (const getterName in newStore._hmrPayload.getters) {
          const getter = newStore._hmrPayload.getters[getterName];
          const getterValue = isOptionsStore ? (
            // special handling of options api
            vue.computed(() => {
              setActivePinia(pinia);
              return getter.call(store, store);
            })
          ) : getter;
          set(store, getterName, getterValue);
        }
        Object.keys(store._hmrPayload.getters).forEach((key) => {
          if (!(key in newStore._hmrPayload.getters)) {
            del(store, key);
          }
        });
        Object.keys(store._hmrPayload.actions).forEach((key) => {
          if (!(key in newStore._hmrPayload.actions)) {
            del(store, key);
          }
        });
        store._hmrPayload = newStore._hmrPayload;
        store._getters = newStore._getters;
        store._hotUpdating = false;
      });
    }
    if (IS_CLIENT) {
      const nonEnumerable = {
        writable: true,
        configurable: true,
        // avoid warning on devtools trying to display this property
        enumerable: false
      };
      ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((p) => {
        Object.defineProperty(store, p, assign({ value: store[p] }, nonEnumerable));
      });
    }
    pinia._p.forEach((extender) => {
      if (IS_CLIENT) {
        const extensions = scope.run(() => extender({
          store,
          app: pinia._a,
          pinia,
          options: optionsForPlugin
        }));
        Object.keys(extensions || {}).forEach((key) => store._customProperties.add(key));
        assign(store, extensions);
      } else {
        assign(store, scope.run(() => extender({
          store,
          app: pinia._a,
          pinia,
          options: optionsForPlugin
        })));
      }
    });
    if (store.$state && typeof store.$state === "object" && typeof store.$state.constructor === "function" && !store.$state.constructor.toString().includes("[native code]")) {
      console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${store.$id}".`);
    }
    if (initialState && isOptionsStore && options.hydrate) {
      options.hydrate(store.$state, initialState);
    }
    isListening = true;
    isSyncListening = true;
    return store;
  }
  /*! #__NO_SIDE_EFFECTS__ */
  // @__NO_SIDE_EFFECTS__
  function defineStore(idOrOptions, setup, setupOptions) {
    let id;
    let options;
    const isSetupStore = typeof setup === "function";
    if (typeof idOrOptions === "string") {
      id = idOrOptions;
      options = isSetupStore ? setupOptions : setup;
    } else {
      options = idOrOptions;
      id = idOrOptions.id;
      if (typeof id !== "string") {
        throw new Error(`[🍍]: "defineStore()" must be passed a store id as its first argument.`);
      }
    }
    function useStore(pinia, hot) {
      const hasContext = vue.hasInjectionContext();
      pinia = // in test mode, ignore the argument provided as we can always retrieve a
      // pinia instance with getActivePinia()
      pinia || (hasContext ? vue.inject(piniaSymbol, null) : null);
      if (pinia)
        setActivePinia(pinia);
      if (!activePinia) {
        throw new Error(`[🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
See https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.
This will fail in production.`);
      }
      pinia = activePinia;
      if (!pinia._s.has(id)) {
        if (isSetupStore) {
          createSetupStore(id, setup, options, pinia);
        } else {
          createOptionsStore(id, options, pinia);
        }
        {
          useStore._pinia = pinia;
        }
      }
      const store = pinia._s.get(id);
      if (hot) {
        const hotId = "__hot:" + id;
        const newStore = isSetupStore ? createSetupStore(hotId, setup, options, pinia, true) : createOptionsStore(hotId, assign({}, options), pinia, true);
        hot._hotUpdate(newStore);
        delete pinia.state.value[hotId];
        pinia._s.delete(hotId);
      }
      if (IS_CLIENT) {
        const currentInstance = vue.getCurrentInstance();
        if (currentInstance && currentInstance.proxy && // avoid adding stores that are just built for hot module replacement
        !hot) {
          const vm = currentInstance.proxy;
          const cache = "_pStores" in vm ? vm._pStores : vm._pStores = {};
          cache[id] = store;
        }
      }
      return store;
    }
    useStore.$id = id;
    return useStore;
  }
  function storeToRefs(store) {
    {
      const rawStore = vue.toRaw(store);
      const refs = {};
      for (const key in rawStore) {
        const value = rawStore[key];
        if (value.effect) {
          refs[key] = // ...
          vue.computed({
            get: () => store[key],
            set(value2) {
              store[key] = value2;
            }
          });
        } else if (vue.isRef(value) || vue.isReactive(value)) {
          refs[key] = // ---
          vue.toRef(store, key);
        }
      }
      return refs;
    }
  }
  const _sfc_main$j = /* @__PURE__ */ vue.defineComponent({
    __name: "BudgetChart",
    props: {
      items: { type: Array, required: true }
    },
    setup(__props, { expose: __expose }) {
      __expose();
      const props = __props;
      const total = vue.computed(() => props.items.reduce((sum, i) => sum + i.value, 0));
      function getPercent(value) {
        if (total.value === 0)
          return 0;
        return Math.round(value / total.value * 100);
      }
      const __returned__ = { props, total, getPercent, get formatPrice() {
        return formatPrice;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$i(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "budget-chart" }, [
      vue.createElementVNode("view", { class: "chart-header" }, [
        vue.createElementVNode("text", { class: "label" }, "预计花费"),
        vue.createElementVNode(
          "text",
          { class: "total" },
          vue.toDisplayString($setup.formatPrice($setup.total)),
          1
          /* TEXT */
        )
      ]),
      vue.createElementVNode("view", { class: "bars" }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($props.items, (item) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              key: item.label,
              class: "bar-item"
            }, [
              vue.createElementVNode("view", { class: "bar-info" }, [
                vue.createElementVNode(
                  "text",
                  { class: "bar-label" },
                  vue.toDisplayString(item.label),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode(
                  "text",
                  { class: "bar-value" },
                  vue.toDisplayString($setup.formatPrice(item.value)),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode("view", { class: "bar-track" }, [
                vue.createElementVNode(
                  "view",
                  {
                    class: "bar-fill",
                    style: vue.normalizeStyle({ width: $setup.getPercent(item.value) + "%", background: item.color })
                  },
                  null,
                  4
                  /* STYLE */
                )
              ])
            ]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ])
    ]);
  }
  const BudgetChart = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["render", _sfc_render$i], ["__scopeId", "data-v-b180d95a"], ["__file", "D:/geek/AI文旅/geek012/frontend/src/components/BudgetChart/BudgetChart.vue"]]);
  function generateTrip(data) {
    return http.post("/trip/generate", data, { showLoading: true, loadingText: "AI 规划中..." });
  }
  function saveTrip(data) {
    return http.post("/trip/save", data, { showLoading: true });
  }
  function getMyTrips() {
    return http.get("/trip/list");
  }
  function getTripDetail(id) {
    return http.get(`/trip/${id}`);
  }
  function deleteTrip(id) {
    return http.delete(`/trip/${id}`, void 0, { showLoading: true });
  }
  const useTripStore = /* @__PURE__ */ defineStore("trip", () => {
    const currentTrip = vue.ref(null);
    const tripHistory = vue.ref([]);
    const generating = vue.ref(false);
    async function generateTrip$1(params) {
      generating.value = true;
      try {
        const trip = await generateTrip(params);
        currentTrip.value = trip;
        return trip;
      } finally {
        generating.value = false;
      }
    }
    async function saveTrip$1(trip) {
      const data = trip || currentTrip.value;
      if (!data)
        throw new Error("无行程数据");
      const saved = await saveTrip(data);
      currentTrip.value = saved;
      await loadHistory();
      return saved;
    }
    async function deleteTrip$1(id) {
      var _a;
      await deleteTrip(id);
      tripHistory.value = tripHistory.value.filter((t) => t.id !== id);
      if (((_a = currentTrip.value) == null ? void 0 : _a.id) === id) {
        currentTrip.value = null;
      }
    }
    async function loadHistory() {
      const list = await getMyTrips();
      tripHistory.value = list;
      return list;
    }
    async function getTripDetail$1(id) {
      const trip = await getTripDetail(id);
      currentTrip.value = trip;
      return trip;
    }
    return {
      currentTrip,
      tripHistory,
      generating,
      generateTrip: generateTrip$1,
      saveTrip: saveTrip$1,
      deleteTrip: deleteTrip$1,
      loadHistory,
      getTripDetail: getTripDetail$1
    };
  });
  function login(data) {
    return http.post("/user/login", data, { showLoading: true, skipAuth: true });
  }
  function register(data) {
    return http.post("/user/register", data, { showLoading: true, skipAuth: true });
  }
  function getUserInfo() {
    return http.get("/user/info");
  }
  function updateUserInfo(data) {
    return http.put("/user/info", data, { showLoading: true });
  }
  const useUserStore = /* @__PURE__ */ defineStore("user", () => {
    const token = vue.ref("");
    const userInfo = vue.ref(null);
    const isLogin = vue.computed(() => !!token.value);
    function initFromStorage() {
      token.value = storage.get(TOKEN_KEY, "") || "";
      userInfo.value = storage.get(USER_INFO_KEY) || null;
    }
    async function login$1(params) {
      const res = await login(params);
      token.value = res.token;
      userInfo.value = res.userInfo;
      setToken(res.token);
      storage.set(USER_INFO_KEY, res.userInfo);
      return res;
    }
    async function register$1(params) {
      return register(params);
    }
    function logout() {
      token.value = "";
      userInfo.value = null;
      removeToken();
      storage.remove(USER_INFO_KEY);
      uni.reLaunch({ url: "/pages/auth/login" });
    }
    async function getUserInfo$1() {
      const info = await getUserInfo();
      userInfo.value = info;
      storage.set(USER_INFO_KEY, info);
      return info;
    }
    async function updateUserInfo$1(data) {
      const info = await updateUserInfo(data);
      userInfo.value = { ...userInfo.value, ...info };
      storage.set(USER_INFO_KEY, userInfo.value);
      return info;
    }
    return {
      token,
      userInfo,
      isLogin,
      initFromStorage,
      login: login$1,
      register: register$1,
      logout,
      getUserInfo: getUserInfo$1,
      updateUserInfo: updateUserInfo$1
    };
  });
  function useLogin() {
    const userStore = useUserStore();
    const loading = vue.ref(false);
    async function handleLogin(phone, password) {
      loading.value = true;
      try {
        await userStore.login({ phone, password });
        uni.showToast({ title: "登录成功", icon: "success" });
        setTimeout(() => {
          const pages = getCurrentPages();
          if (pages.length > 1) {
            uni.navigateBack();
          } else {
            uni.switchTab({ url: "/pages/home/index" });
          }
        }, 1e3);
      } finally {
        loading.value = false;
      }
    }
    function checkLogin() {
      if (!isLoggedIn()) {
        uni.showModal({
          title: "提示",
          content: "请先登录",
          confirmText: "去登录",
          success: (res) => {
            if (res.confirm) {
              uni.navigateTo({ url: "/pages/auth/login" });
            }
          }
        });
        return false;
      }
      return true;
    }
    return { loading, handleLogin, checkLogin, isLogin: userStore.isLogin };
  }
  const _sfc_main$i = /* @__PURE__ */ vue.defineComponent({
    __name: "generate",
    setup(__props, { expose: __expose }) {
      __expose();
      const tripStore = useTripStore();
      const { currentTrip, generating } = storeToRefs(tripStore);
      const { checkLogin } = useLogin();
      const systemInfo = uni.getSystemInfoSync();
      const navHeight = (systemInfo.statusBarHeight || 20) + 44;
      const showResult = vue.ref(false);
      const dayOptions = Array.from({ length: 14 }, (_, i) => `${i + 1} 天`);
      const peopleOptions = Array.from({ length: 10 }, (_, i) => `${i + 1} 人`);
      const form = vue.reactive({
        fromCity: "",
        toCity: "",
        days: 3,
        budget: 3e3,
        people: 2,
        tags: []
      });
      const budgetItems = vue.computed(() => {
        if (!currentTrip.value)
          return [];
        const total = currentTrip.value.estimatedCost || currentTrip.value.budget;
        return [
          { label: "住宿", value: Math.round(total * 0.35), color: "#3B82F6" },
          { label: "餐饮", value: Math.round(total * 0.25), color: "#14B8A6" },
          { label: "门票", value: Math.round(total * 0.2), color: "#F59E0B" },
          { label: "交通", value: Math.round(total * 0.2), color: "#8B5CF6" }
        ];
      });
      function toggleTag(tag) {
        const idx = form.tags.indexOf(tag);
        if (idx >= 0) {
          form.tags.splice(idx, 1);
        } else {
          form.tags.push(tag);
        }
      }
      function onDayChange(e) {
        form.days = e.detail.value + 1;
      }
      function onPeopleChange(e) {
        form.people = e.detail.value + 1;
      }
      async function handleGenerate() {
        if (!form.fromCity || !form.toCity) {
          uni.showToast({ title: "请填写出发地和目的地", icon: "none" });
          return;
        }
        if (form.tags.length === 0) {
          uni.showToast({ title: "请至少选择一个兴趣标签", icon: "none" });
          return;
        }
        try {
          await tripStore.generateTrip({ ...form });
          showResult.value = true;
        } catch {
          tripStore.currentTrip = { ...mockTrip, ...form };
          showResult.value = true;
        }
      }
      async function handleSave() {
        if (!checkLogin())
          return;
        try {
          await tripStore.saveTrip();
          uni.showToast({ title: "保存成功", icon: "success" });
        } catch {
          uni.showToast({ title: "保存失败", icon: "none" });
        }
      }
      function handleEdit() {
        var _a;
        if ((_a = currentTrip.value) == null ? void 0 : _a.id) {
          uni.navigateTo({ url: `/pages/trip/edit?id=${currentTrip.value.id}` });
        } else {
          uni.showToast({ title: "请先保存行程", icon: "none" });
        }
      }
      function handleShare() {
        uni.showShareMenu({ withShareTicket: true });
        uni.showToast({ title: "点击右上角分享", icon: "none" });
      }
      function resetForm() {
        showResult.value = false;
        tripStore.currentTrip = null;
      }
      const __returned__ = { tripStore, currentTrip, generating, checkLogin, systemInfo, navHeight, showResult, dayOptions, peopleOptions, form, budgetItems, toggleTag, onDayChange, onPeopleChange, handleGenerate, handleSave, handleEdit, handleShare, resetForm, CustomNavbar, BudgetChart, get INTEREST_TAGS() {
        return INTEREST_TAGS;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$h(_ctx, _cache, $props, $setup, $data, $options) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    return vue.openBlock(), vue.createElementBlock("view", { class: "page" }, [
      vue.createVNode($setup["CustomNavbar"], { title: "AI 智能规划" }),
      vue.createElementVNode(
        "scroll-view",
        {
          "scroll-y": "",
          class: "scroll-content",
          style: vue.normalizeStyle({ paddingTop: $setup.navHeight + "px" })
        },
        [
          vue.createCommentVNode(" 表单区域 "),
          !$setup.showResult ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "form-section"
          }, [
            vue.createElementVNode("view", { class: "hero" }, [
              vue.createElementVNode("text", { class: "hero-title" }, "让 AI 为你规划完美旅程"),
              vue.createElementVNode("text", { class: "hero-desc" }, "输入你的旅行偏好，一键生成专属行程")
            ]),
            vue.createElementVNode("view", { class: "form card" }, [
              vue.createElementVNode("view", { class: "form-item" }, [
                vue.createElementVNode("text", { class: "label" }, "出发地"),
                vue.withDirectives(vue.createElementVNode(
                  "input",
                  {
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.form.fromCity = $event),
                    class: "input",
                    placeholder: "请输入出发城市"
                  },
                  null,
                  512
                  /* NEED_PATCH */
                ), [
                  [vue.vModelText, $setup.form.fromCity]
                ])
              ]),
              vue.createElementVNode("view", { class: "form-item" }, [
                vue.createElementVNode("text", { class: "label" }, "目的地"),
                vue.withDirectives(vue.createElementVNode(
                  "input",
                  {
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.form.toCity = $event),
                    class: "input",
                    placeholder: "请输入目的城市"
                  },
                  null,
                  512
                  /* NEED_PATCH */
                ), [
                  [vue.vModelText, $setup.form.toCity]
                ])
              ]),
              vue.createElementVNode("view", { class: "form-row" }, [
                vue.createElementVNode("view", { class: "form-item half" }, [
                  vue.createElementVNode("text", { class: "label" }, "旅行天数"),
                  vue.createElementVNode("picker", {
                    range: $setup.dayOptions,
                    onChange: $setup.onDayChange
                  }, [
                    vue.createElementVNode(
                      "view",
                      { class: "picker" },
                      vue.toDisplayString($setup.form.days) + " 天",
                      1
                      /* TEXT */
                    )
                  ], 40, ["range"])
                ]),
                vue.createElementVNode("view", { class: "form-item half" }, [
                  vue.createElementVNode("text", { class: "label" }, "旅行人数"),
                  vue.createElementVNode("picker", {
                    range: $setup.peopleOptions,
                    onChange: $setup.onPeopleChange
                  }, [
                    vue.createElementVNode(
                      "view",
                      { class: "picker" },
                      vue.toDisplayString($setup.form.people) + " 人",
                      1
                      /* TEXT */
                    )
                  ], 40, ["range"])
                ])
              ]),
              vue.createElementVNode("view", { class: "form-item" }, [
                vue.createElementVNode("text", { class: "label" }, "预算（元）"),
                vue.withDirectives(vue.createElementVNode(
                  "input",
                  {
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.form.budget = $event),
                    class: "input",
                    type: "number",
                    placeholder: "请输入预算"
                  },
                  null,
                  512
                  /* NEED_PATCH */
                ), [
                  [
                    vue.vModelText,
                    $setup.form.budget,
                    void 0,
                    { number: true }
                  ]
                ])
              ]),
              vue.createElementVNode("view", { class: "form-item" }, [
                vue.createElementVNode("text", { class: "label" }, "兴趣标签"),
                vue.createElementVNode("view", { class: "tags" }, [
                  (vue.openBlock(true), vue.createElementBlock(
                    vue.Fragment,
                    null,
                    vue.renderList($setup.INTEREST_TAGS, (tag) => {
                      return vue.openBlock(), vue.createElementBlock("text", {
                        key: tag,
                        class: vue.normalizeClass(["tag-item", { active: $setup.form.tags.includes(tag) }]),
                        onClick: ($event) => $setup.toggleTag(tag)
                      }, vue.toDisplayString(tag), 11, ["onClick"]);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ])
              ])
            ]),
            vue.createElementVNode("button", {
              class: "btn-primary generate-btn",
              loading: $setup.generating,
              disabled: $setup.generating,
              onClick: $setup.handleGenerate
            }, vue.toDisplayString($setup.generating ? "AI 规划中..." : "立即生成行程"), 9, ["loading", "disabled"])
          ])) : (vue.openBlock(), vue.createElementBlock(
            vue.Fragment,
            { key: 1 },
            [
              vue.createCommentVNode(" 结果展示 "),
              vue.createElementVNode("view", { class: "result-section" }, [
                vue.createElementVNode("view", { class: "result-header card" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "result-title" },
                    vue.toDisplayString((_a = $setup.currentTrip) == null ? void 0 : _a.title),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "text",
                    { class: "result-route" },
                    vue.toDisplayString((_b = $setup.currentTrip) == null ? void 0 : _b.fromCity) + " → " + vue.toDisplayString((_c = $setup.currentTrip) == null ? void 0 : _c.toCity) + " · " + vue.toDisplayString((_d = $setup.currentTrip) == null ? void 0 : _d.days) + "天 · " + vue.toDisplayString((_e = $setup.currentTrip) == null ? void 0 : _e.people) + "人",
                    1
                    /* TEXT */
                  ),
                  ((_g = (_f = $setup.currentTrip) == null ? void 0 : _f.tags) == null ? void 0 : _g.length) ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 0,
                    class: "result-tags"
                  }, [
                    (vue.openBlock(true), vue.createElementBlock(
                      vue.Fragment,
                      null,
                      vue.renderList($setup.currentTrip.tags, (tag) => {
                        return vue.openBlock(), vue.createElementBlock(
                          "text",
                          {
                            key: tag,
                            class: "tag"
                          },
                          vue.toDisplayString(tag),
                          1
                          /* TEXT */
                        );
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    ))
                  ])) : vue.createCommentVNode("v-if", true)
                ]),
                vue.createCommentVNode(" 预算图表 "),
                $setup.budgetItems.length ? (vue.openBlock(), vue.createBlock($setup["BudgetChart"], {
                  key: 0,
                  items: $setup.budgetItems,
                  class: "budget-section"
                }, null, 8, ["items"])) : vue.createCommentVNode("v-if", true),
                vue.createCommentVNode(" 时间轴 "),
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList((_h = $setup.currentTrip) == null ? void 0 : _h.dayPlans, (day) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      key: day.day,
                      class: "timeline card"
                    }, [
                      vue.createElementVNode("view", { class: "day-header" }, [
                        vue.createElementVNode(
                          "text",
                          { class: "day-badge" },
                          "DAY " + vue.toDisplayString(day.day),
                          1
                          /* TEXT */
                        ),
                        vue.createElementVNode(
                          "text",
                          { class: "day-title" },
                          vue.toDisplayString(day.title),
                          1
                          /* TEXT */
                        )
                      ]),
                      (vue.openBlock(true), vue.createElementBlock(
                        vue.Fragment,
                        null,
                        vue.renderList(day.schedules, (schedule, idx) => {
                          return vue.openBlock(), vue.createElementBlock("view", {
                            key: idx,
                            class: "schedule-item"
                          }, [
                            vue.createElementVNode("view", { class: "time-dot" }, [
                              vue.createElementVNode("view", { class: "dot" }),
                              idx < day.schedules.length - 1 ? (vue.openBlock(), vue.createElementBlock("view", {
                                key: 0,
                                class: "line"
                              })) : vue.createCommentVNode("v-if", true)
                            ]),
                            vue.createElementVNode("view", { class: "schedule-content" }, [
                              vue.createElementVNode(
                                "text",
                                { class: "schedule-time" },
                                vue.toDisplayString(schedule.time),
                                1
                                /* TEXT */
                              ),
                              vue.createElementVNode(
                                "text",
                                { class: "schedule-title" },
                                vue.toDisplayString(schedule.title),
                                1
                                /* TEXT */
                              ),
                              schedule.description ? (vue.openBlock(), vue.createElementBlock(
                                "text",
                                {
                                  key: 0,
                                  class: "schedule-desc"
                                },
                                vue.toDisplayString(schedule.description),
                                1
                                /* TEXT */
                              )) : vue.createCommentVNode("v-if", true)
                            ])
                          ]);
                        }),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                )),
                vue.createCommentVNode(" 操作按钮 "),
                vue.createElementVNode("view", { class: "action-bar safe-bottom" }, [
                  vue.createElementVNode("button", {
                    class: "action-btn",
                    onClick: $setup.handleSave
                  }, "保存行程"),
                  vue.createElementVNode("button", {
                    class: "action-btn",
                    onClick: $setup.handleEdit
                  }, "编辑"),
                  vue.createElementVNode("button", {
                    class: "action-btn",
                    onClick: $setup.handleShare
                  }, "分享"),
                  vue.createElementVNode("button", {
                    class: "action-btn outline",
                    onClick: $setup.resetForm
                  }, "重新规划")
                ])
              ])
            ],
            2112
            /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
          )),
          vue.createElementVNode("view", {
            class: "safe-bottom",
            style: { "height": "40rpx" }
          })
        ],
        4
        /* STYLE */
      )
    ]);
  }
  const PagesAiGenerate = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["render", _sfc_render$h], ["__scopeId", "data-v-906dd97d"], ["__file", "D:/geek/AI文旅/geek012/frontend/src/pages/ai/generate.vue"]]);
  const _sfc_main$h = /* @__PURE__ */ vue.defineComponent({
    __name: "CommunityCard",
    props: {
      item: { type: Object, required: true }
    },
    setup(__props, { expose: __expose }) {
      __expose();
      const props = __props;
      function handleTap() {
        uni.navigateTo({ url: `/pages/community/detail?id=${props.item.id}` });
      }
      const __returned__ = { props, handleTap, get formatCount() {
        return formatCount;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$g(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", {
      class: "community-card",
      onClick: $setup.handleTap
    }, [
      vue.createElementVNode("image", {
        class: "cover",
        src: $props.item.cover,
        mode: "widthFix"
      }, null, 8, ["src"]),
      vue.createElementVNode("view", { class: "info" }, [
        vue.createElementVNode(
          "text",
          { class: "title text-ellipsis-2" },
          vue.toDisplayString($props.item.title),
          1
          /* TEXT */
        ),
        vue.createElementVNode("view", { class: "author-row" }, [
          vue.createElementVNode("image", {
            class: "avatar",
            src: $props.item.author.avatar,
            mode: "aspectFill"
          }, null, 8, ["src"]),
          vue.createElementVNode(
            "text",
            { class: "nickname text-ellipsis" },
            vue.toDisplayString($props.item.author.nickname),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "stats" }, [
          vue.createElementVNode(
            "text",
            { class: "stat" },
            "❤️ " + vue.toDisplayString($setup.formatCount($props.item.likeCount)),
            1
            /* TEXT */
          ),
          vue.createElementVNode(
            "text",
            { class: "stat" },
            "⭐ " + vue.toDisplayString($setup.formatCount($props.item.collectCount)),
            1
            /* TEXT */
          )
        ])
      ])
    ]);
  }
  const CommunityCard = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$g], ["__scopeId", "data-v-92a2cfad"], ["__file", "D:/geek/AI文旅/geek012/frontend/src/components/CommunityCard/CommunityCard.vue"]]);
  const _sfc_main$g = /* @__PURE__ */ vue.defineComponent({
    __name: "index",
    setup(__props, { expose: __expose }) {
      __expose();
      const { checkLogin } = useLogin();
      const systemInfo = uni.getSystemInfoSync();
      const navHeight = (systemInfo.statusBarHeight || 20) + 44;
      const posts = vue.ref([]);
      const loading = vue.ref(false);
      const page = vue.ref(1);
      const noMore = vue.ref(false);
      const leftColumn = vue.computed(() => posts.value.filter((_, i) => i % 2 === 0));
      const rightColumn = vue.computed(() => posts.value.filter((_, i) => i % 2 === 1));
      async function loadPosts(reset = false) {
        if (loading.value)
          return;
        if (reset) {
          page.value = 1;
          noMore.value = false;
        }
        loading.value = true;
        const res = await withFallback(
          () => getCommunityList({ page: page.value, pageSize: 10 }),
          { records: mockPosts, total: mockPosts.length }
        );
        if (reset) {
          posts.value = res.records;
        } else {
          posts.value.push(...res.records);
        }
        if (res.records.length < 10)
          noMore.value = true;
        loading.value = false;
      }
      function loadMore() {
        if (noMore.value || loading.value)
          return;
        page.value++;
        loadPosts();
      }
      function goPublish() {
        if (!checkLogin())
          return;
        uni.navigateTo({ url: "/pages/community/publish" });
      }
      vue.onMounted(() => loadPosts(true));
      const __returned__ = { checkLogin, systemInfo, navHeight, posts, loading, page, noMore, leftColumn, rightColumn, loadPosts, loadMore, goPublish, CustomNavbar, CommunityCard, LoadingView, EmptyState };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "page" }, [
      vue.createVNode($setup["CustomNavbar"], { title: "社区" }, {
        right: vue.withCtx(() => [
          vue.createElementVNode("text", {
            class: "publish-btn",
            onClick: $setup.goPublish
          }, "发布")
        ]),
        _: 1
        /* STABLE */
      }),
      vue.createElementVNode(
        "scroll-view",
        {
          "scroll-y": "",
          class: "scroll-content",
          style: vue.normalizeStyle({ paddingTop: $setup.navHeight + "px" }),
          onScrolltolower: $setup.loadMore
        },
        [
          vue.createCommentVNode(" 瀑布流布局 "),
          vue.createElementVNode("view", { class: "waterfall" }, [
            vue.createElementVNode("view", { class: "column" }, [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList($setup.leftColumn, (item) => {
                  return vue.openBlock(), vue.createBlock($setup["CommunityCard"], {
                    key: item.id,
                    item
                  }, null, 8, ["item"]);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ]),
            vue.createElementVNode("view", { class: "column" }, [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList($setup.rightColumn, (item) => {
                  return vue.openBlock(), vue.createBlock($setup["CommunityCard"], {
                    key: item.id,
                    item
                  }, null, 8, ["item"]);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ])
          ]),
          $setup.loading && $setup.posts.length === 0 ? (vue.openBlock(), vue.createBlock($setup["LoadingView"], { key: 0 })) : vue.createCommentVNode("v-if", true),
          !$setup.loading && $setup.posts.length === 0 ? (vue.openBlock(), vue.createBlock($setup["EmptyState"], {
            key: 1,
            title: "暂无游记",
            "button-text": "发布第一篇",
            onAction: $setup.goPublish
          })) : vue.createCommentVNode("v-if", true),
          $setup.loading && $setup.posts.length > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 2,
            class: "load-more"
          }, "加载中...")) : vue.createCommentVNode("v-if", true),
          $setup.noMore && $setup.posts.length > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 3,
            class: "load-more"
          }, "— 没有更多了 —")) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode("view", {
            class: "safe-bottom",
            style: { "height": "40rpx" }
          })
        ],
        36
        /* STYLE, NEED_HYDRATION */
      ),
      vue.createCommentVNode(" 悬浮发布按钮 "),
      vue.createElementVNode("view", {
        class: "fab",
        onClick: $setup.goPublish
      }, [
        vue.createElementVNode("text", { class: "fab-icon" }, "+")
      ])
    ]);
  }
  const PagesCommunityIndex = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$f], ["__scopeId", "data-v-485a05f3"], ["__file", "D:/geek/AI文旅/geek012/frontend/src/pages/community/index.vue"]]);
  const defaultAvatar$1 = "https://picsum.photos/seed/default/200/200";
  const _sfc_main$f = /* @__PURE__ */ vue.defineComponent({
    __name: "index",
    setup(__props, { expose: __expose }) {
      __expose();
      const userStore = useUserStore();
      const tripStore = useTripStore();
      const { userInfo } = storeToRefs(userStore);
      const systemInfo = uni.getSystemInfoSync();
      const navHeight = (systemInfo.statusBarHeight || 20) + 44;
      const tripCount = vue.ref(0);
      const isLogin = vue.computed(() => isLoggedIn());
      const menuItems = [
        { icon: "⭐", label: "我的收藏", path: "" },
        { icon: "📝", label: "我的游记", path: "" },
        { icon: "🗺️", label: "我的行程", path: "/pages/trip/myTrip" },
        { icon: "👁️", label: "浏览历史", path: "" },
        { icon: "💬", label: "意见反馈", path: "" },
        { icon: "ℹ️", label: "关于我们", path: "" },
        { icon: "⚙️", label: "设置中心", path: "/pages/profile/setting" }
      ];
      vue.onMounted(async () => {
        if (isLogin.value) {
          try {
            const list = await tripStore.loadHistory();
            tripCount.value = list.length;
          } catch {
            tripCount.value = 0;
          }
        }
      });
      function handleUserTap() {
        if (isLogin.value) {
          uni.navigateTo({ url: "/pages/profile/edit" });
        } else {
          uni.navigateTo({ url: "/pages/auth/login" });
        }
      }
      function goPage(path) {
        if (!path) {
          uni.showToast({ title: "功能开发中", icon: "none" });
          return;
        }
        if (path.includes("trip") && !isLogin.value) {
          uni.navigateTo({ url: "/pages/auth/login" });
          return;
        }
        uni.navigateTo({ url: path });
      }
      function handleLogout() {
        uni.showModal({
          title: "提示",
          content: "确定退出登录？",
          success: (res) => {
            if (res.confirm)
              userStore.logout();
          }
        });
      }
      const __returned__ = { userStore, tripStore, userInfo, systemInfo, navHeight, defaultAvatar: defaultAvatar$1, tripCount, isLogin, menuItems, handleUserTap, goPage, handleLogout, CustomNavbar };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
    var _a, _b, _c;
    return vue.openBlock(), vue.createElementBlock("view", { class: "page" }, [
      vue.createVNode($setup["CustomNavbar"], { title: "我的" }),
      vue.createElementVNode(
        "scroll-view",
        {
          "scroll-y": "",
          class: "scroll-content",
          style: vue.normalizeStyle({ paddingTop: $setup.navHeight + "px" })
        },
        [
          vue.createCommentVNode(" 用户信息 "),
          vue.createElementVNode("view", {
            class: "user-card",
            onClick: $setup.handleUserTap
          }, [
            vue.createElementVNode("image", {
              class: "avatar",
              src: ((_a = $setup.userInfo) == null ? void 0 : _a.avatar) || $setup.defaultAvatar,
              mode: "aspectFill"
            }, null, 8, ["src"]),
            vue.createElementVNode("view", { class: "user-info" }, [
              vue.createElementVNode(
                "text",
                { class: "nickname" },
                vue.toDisplayString(((_b = $setup.userInfo) == null ? void 0 : _b.nickname) || "点击登录"),
                1
                /* TEXT */
              ),
              vue.createElementVNode(
                "text",
                { class: "bio" },
                vue.toDisplayString(((_c = $setup.userInfo) == null ? void 0 : _c.bio) || "探索世界，记录美好"),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("text", { class: "arrow" }, "›")
          ]),
          vue.createCommentVNode(" 数据统计 "),
          vue.createElementVNode("view", { class: "stats card" }, [
            vue.createElementVNode("view", {
              class: "stat-item",
              onClick: _cache[0] || (_cache[0] = ($event) => $setup.goPage("/pages/trip/myTrip"))
            }, [
              vue.createElementVNode(
                "text",
                { class: "stat-num" },
                vue.toDisplayString($setup.tripCount),
                1
                /* TEXT */
              ),
              vue.createElementVNode("text", { class: "stat-label" }, "行程")
            ]),
            vue.createElementVNode("view", { class: "stat-item" }, [
              vue.createElementVNode("text", { class: "stat-num" }, "0"),
              vue.createElementVNode("text", { class: "stat-label" }, "收藏")
            ]),
            vue.createElementVNode("view", { class: "stat-item" }, [
              vue.createElementVNode("text", { class: "stat-num" }, "0"),
              vue.createElementVNode("text", { class: "stat-label" }, "游记")
            ]),
            vue.createElementVNode("view", { class: "stat-item" }, [
              vue.createElementVNode("text", { class: "stat-num" }, "0"),
              vue.createElementVNode("text", { class: "stat-label" }, "关注")
            ])
          ]),
          vue.createCommentVNode(" 功能菜单 "),
          vue.createElementVNode("view", { class: "menu card" }, [
            (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($setup.menuItems, (item) => {
                return vue.createElementVNode("view", {
                  key: item.label,
                  class: "menu-item",
                  onClick: ($event) => $setup.goPage(item.path)
                }, [
                  vue.createElementVNode(
                    "text",
                    { class: "menu-icon" },
                    vue.toDisplayString(item.icon),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "text",
                    { class: "menu-label" },
                    vue.toDisplayString(item.label),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode("text", { class: "menu-arrow" }, "›")
                ], 8, ["onClick"]);
              }),
              64
              /* STABLE_FRAGMENT */
            ))
          ]),
          $setup.isLogin ? (vue.openBlock(), vue.createElementBlock("button", {
            key: 0,
            class: "logout-btn",
            onClick: $setup.handleLogout
          }, "退出登录")) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode("view", {
            class: "safe-bottom",
            style: { "height": "40rpx" }
          })
        ],
        4
        /* STYLE */
      )
    ]);
  }
  const PagesProfileIndex = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$e], ["__scopeId", "data-v-f97f9319"], ["__file", "D:/geek/AI文旅/geek012/frontend/src/pages/profile/index.vue"]]);
  const _sfc_main$e = /* @__PURE__ */ vue.defineComponent({
    __name: "list",
    setup(__props, { expose: __expose }) {
      __expose();
      const keyword = vue.ref("");
      const category = vue.ref("全部");
      const city = vue.ref("");
      const list = vue.ref([]);
      const loading = vue.ref(false);
      const page = vue.ref(1);
      const noMore = vue.ref(false);
      vue.onMounted(() => {
        var _a;
        const pages = getCurrentPages();
        const current = pages[pages.length - 1];
        city.value = ((_a = current.options) == null ? void 0 : _a.city) || "";
        search();
      });
      async function search() {
        page.value = 1;
        noMore.value = false;
        loading.value = true;
        const cat = category.value === "全部" ? void 0 : category.value;
        const res = await withFallback(
          () => getScenicList({ keyword: keyword.value, city: city.value, category: cat, page: 1, pageSize: 20 }),
          { records: mockScenics, total: mockScenics.length, page: 1, pageSize: 20 }
        );
        list.value = res.records;
        loading.value = false;
      }
      async function loadMore() {
        if (noMore.value || loading.value)
          return;
        page.value++;
        loading.value = true;
        const cat = category.value === "全部" ? void 0 : category.value;
        const res = await withFallback(
          () => getScenicList({ keyword: keyword.value, city: city.value, category: cat, page: page.value, pageSize: 20 }),
          { records: [], total: 0, page: page.value, pageSize: 20 }
        );
        list.value.push(...res.records);
        if (res.records.length < 20)
          noMore.value = true;
        loading.value = false;
      }
      function goDetail(id) {
        uni.navigateTo({ url: `/pages/scenic/detail?id=${id}` });
      }
      const __returned__ = { keyword, category, city, list, loading, page, noMore, search, loadMore, goDetail, LoadingView, EmptyState, get SCENIC_CATEGORIES() {
        return SCENIC_CATEGORIES;
      }, get formatRating() {
        return formatRating;
      }, get formatPrice() {
        return formatPrice;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "page" }, [
      vue.createElementVNode("view", { class: "search-bar" }, [
        vue.withDirectives(vue.createElementVNode(
          "input",
          {
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.keyword = $event),
            class: "search-input",
            placeholder: "搜索景点",
            "confirm-type": "search",
            onConfirm: $setup.search
          },
          null,
          544
          /* NEED_HYDRATION, NEED_PATCH */
        ), [
          [vue.vModelText, $setup.keyword]
        ])
      ]),
      vue.createElementVNode("view", { class: "filters" }, [
        vue.createElementVNode("scroll-view", {
          "scroll-x": "",
          class: "filter-scroll"
        }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($setup.SCENIC_CATEGORIES, (cat) => {
              return vue.openBlock(), vue.createElementBlock("text", {
                key: cat,
                class: vue.normalizeClass(["filter-tag", { active: $setup.category === cat }]),
                onClick: ($event) => {
                  $setup.category = cat;
                  $setup.search();
                }
              }, vue.toDisplayString(cat), 11, ["onClick"]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ])
      ]),
      vue.createElementVNode(
        "scroll-view",
        {
          "scroll-y": "",
          class: "list",
          onScrolltolower: $setup.loadMore
        },
        [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($setup.list, (item) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                key: item.id,
                class: "list-item card",
                onClick: ($event) => $setup.goDetail(item.id)
              }, [
                vue.createElementVNode("image", {
                  class: "cover",
                  src: item.cover,
                  mode: "aspectFill"
                }, null, 8, ["src"]),
                vue.createElementVNode("view", { class: "info" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "name" },
                    vue.toDisplayString(item.name),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode("view", { class: "meta" }, [
                    vue.createElementVNode(
                      "text",
                      { class: "rating" },
                      "⭐ " + vue.toDisplayString($setup.formatRating(item.rating)),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode(
                      "text",
                      { class: "city" },
                      vue.toDisplayString(item.city),
                      1
                      /* TEXT */
                    )
                  ]),
                  vue.createElementVNode(
                    "text",
                    { class: "price" },
                    vue.toDisplayString(item.price === 0 ? "免费" : $setup.formatPrice(item.price || 0)),
                    1
                    /* TEXT */
                  )
                ])
              ], 8, ["onClick"]);
            }),
            128
            /* KEYED_FRAGMENT */
          )),
          $setup.loading && $setup.list.length === 0 ? (vue.openBlock(), vue.createBlock($setup["LoadingView"], { key: 0 })) : vue.createCommentVNode("v-if", true),
          !$setup.loading && $setup.list.length === 0 ? (vue.openBlock(), vue.createBlock($setup["EmptyState"], { key: 1 })) : vue.createCommentVNode("v-if", true)
        ],
        32
        /* NEED_HYDRATION */
      )
    ]);
  }
  const PagesScenicList = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$d], ["__scopeId", "data-v-ae2a11fa"], ["__file", "D:/geek/AI文旅/geek012/frontend/src/pages/scenic/list.vue"]]);
  const _sfc_main$d = /* @__PURE__ */ vue.defineComponent({
    __name: "detail",
    setup(__props, { expose: __expose }) {
      __expose();
      const loading = vue.ref(true);
      const detail = vue.ref(null);
      const scenicId = vue.ref(0);
      const images = vue.computed(() => {
        var _a;
        if (!detail.value)
          return [];
        return ((_a = detail.value.images) == null ? void 0 : _a.length) ? detail.value.images : [detail.value.cover];
      });
      vue.onMounted(async () => {
        var _a;
        const pages = getCurrentPages();
        const page = pages[pages.length - 1];
        scenicId.value = Number(((_a = page.options) == null ? void 0 : _a.id) || 0);
        try {
          detail.value = await getScenicDetail(scenicId.value);
        } catch {
          detail.value = mockScenics.find((s) => s.id === scenicId.value) || mockScenics[0];
        }
        loading.value = false;
      });
      async function toggleCollect() {
        if (!detail.value)
          return;
        try {
          if (detail.value.isCollected) {
            await uncollectScenic(detail.value.id);
            detail.value.isCollected = false;
          } else {
            await collectScenic(detail.value.id);
            detail.value.isCollected = true;
          }
          uni.showToast({ title: detail.value.isCollected ? "已收藏" : "已取消", icon: "none" });
        } catch {
          detail.value.isCollected = !detail.value.isCollected;
          uni.showToast({ title: detail.value.isCollected ? "已收藏" : "已取消", icon: "none" });
        }
      }
      function addToTrip() {
        uni.switchTab({ url: "/pages/ai/generate" });
      }
      const __returned__ = { loading, detail, scenicId, images, toggleCollect, addToTrip, LoadingView, get formatRating() {
        return formatRating;
      }, get formatPrice() {
        return formatPrice;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "page" }, [
      $setup.loading ? (vue.openBlock(), vue.createBlock($setup["LoadingView"], { key: 0 })) : $setup.detail ? (vue.openBlock(), vue.createElementBlock("view", { key: 1 }, [
        vue.createElementVNode("swiper", {
          class: "banner",
          circular: "",
          "indicator-dots": ""
        }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($setup.images, (img, i) => {
              return vue.openBlock(), vue.createElementBlock("swiper-item", { key: i }, [
                vue.createElementVNode("image", {
                  src: img,
                  mode: "aspectFill",
                  class: "banner-img"
                }, null, 8, ["src"])
              ]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ]),
        vue.createElementVNode("view", { class: "content" }, [
          vue.createElementVNode(
            "text",
            { class: "name" },
            vue.toDisplayString($setup.detail.name),
            1
            /* TEXT */
          ),
          vue.createElementVNode("view", { class: "meta" }, [
            vue.createElementVNode(
              "text",
              { class: "rating" },
              "⭐ " + vue.toDisplayString($setup.formatRating($setup.detail.rating)),
              1
              /* TEXT */
            ),
            vue.createElementVNode(
              "text",
              { class: "city" },
              vue.toDisplayString($setup.detail.city),
              1
              /* TEXT */
            ),
            $setup.detail.price !== void 0 ? (vue.openBlock(), vue.createElementBlock(
              "text",
              {
                key: 0,
                class: "price"
              },
              vue.toDisplayString($setup.detail.price === 0 ? "免费" : $setup.formatPrice($setup.detail.price)),
              1
              /* TEXT */
            )) : vue.createCommentVNode("v-if", true)
          ]),
          $setup.detail.openTime ? (vue.openBlock(), vue.createElementBlock(
            "text",
            {
              key: 0,
              class: "open-time"
            },
            "开放时间：" + vue.toDisplayString($setup.detail.openTime),
            1
            /* TEXT */
          )) : vue.createCommentVNode("v-if", true),
          $setup.detail.address ? (vue.openBlock(), vue.createElementBlock(
            "text",
            {
              key: 1,
              class: "address"
            },
            "📍 " + vue.toDisplayString($setup.detail.address),
            1
            /* TEXT */
          )) : vue.createCommentVNode("v-if", true),
          $setup.detail.reason ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 2,
            class: "section"
          }, [
            vue.createElementVNode("text", { class: "section-title" }, "推荐理由"),
            vue.createElementVNode(
              "text",
              { class: "desc" },
              vue.toDisplayString($setup.detail.reason),
              1
              /* TEXT */
            )
          ])) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode("view", { class: "section" }, [
            vue.createElementVNode("text", { class: "section-title" }, "景点简介"),
            vue.createElementVNode(
              "text",
              { class: "desc" },
              vue.toDisplayString($setup.detail.description || "暂无简介"),
              1
              /* TEXT */
            )
          ])
        ]),
        vue.createElementVNode("view", { class: "bottom-bar safe-bottom" }, [
          vue.createElementVNode(
            "button",
            {
              class: "bar-btn",
              onClick: $setup.toggleCollect
            },
            vue.toDisplayString($setup.detail.isCollected ? "已收藏" : "收藏"),
            1
            /* TEXT */
          ),
          vue.createElementVNode("button", {
            class: "bar-btn primary",
            onClick: $setup.addToTrip
          }, "加入行程")
        ])
      ])) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const PagesScenicDetail = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$c], ["__scopeId", "data-v-847a7a77"], ["__file", "D:/geek/AI文旅/geek012/frontend/src/pages/scenic/detail.vue"]]);
  const _sfc_main$c = /* @__PURE__ */ vue.defineComponent({
    __name: "list",
    setup(__props, { expose: __expose }) {
      __expose();
      const list = vue.ref([]);
      const loading = vue.ref(false);
      const page = vue.ref(1);
      const noMore = vue.ref(false);
      vue.onMounted(() => loadData(true));
      async function loadData(reset = false) {
        if (loading.value)
          return;
        if (reset) {
          page.value = 1;
          noMore.value = false;
        }
        loading.value = true;
        const res = await withFallback(
          () => getActivityList({ page: page.value, pageSize: 20 }),
          { records: mockActivities, total: mockActivities.length }
        );
        if (reset)
          list.value = res.records;
        else
          list.value.push(...res.records);
        if (res.records.length < 20)
          noMore.value = true;
        loading.value = false;
      }
      function loadMore() {
        if (noMore.value)
          return;
        page.value++;
        loadData();
      }
      const __returned__ = { list, loading, page, noMore, loadData, loadMore, ActivityCard, LoadingView, EmptyState };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "page" }, [
      vue.createElementVNode(
        "scroll-view",
        {
          "scroll-y": "",
          class: "list",
          onScrolltolower: $setup.loadMore
        },
        [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($setup.list, (item) => {
              return vue.openBlock(), vue.createBlock($setup["ActivityCard"], {
                key: item.id,
                item
              }, null, 8, ["item"]);
            }),
            128
            /* KEYED_FRAGMENT */
          )),
          $setup.loading && $setup.list.length === 0 ? (vue.openBlock(), vue.createBlock($setup["LoadingView"], { key: 0 })) : vue.createCommentVNode("v-if", true),
          !$setup.loading && $setup.list.length === 0 ? (vue.openBlock(), vue.createBlock($setup["EmptyState"], { key: 1 })) : vue.createCommentVNode("v-if", true)
        ],
        32
        /* NEED_HYDRATION */
      )
    ]);
  }
  const PagesActivityList = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$b], ["__scopeId", "data-v-a098bff7"], ["__file", "D:/geek/AI文旅/geek012/frontend/src/pages/activity/list.vue"]]);
  const _sfc_main$b = /* @__PURE__ */ vue.defineComponent({
    __name: "detail",
    setup(__props, { expose: __expose }) {
      __expose();
      const loading = vue.ref(true);
      const detail = vue.ref(null);
      vue.onMounted(async () => {
        var _a;
        const pages = getCurrentPages();
        const page = pages[pages.length - 1];
        const id = Number(((_a = page.options) == null ? void 0 : _a.id) || 0);
        try {
          detail.value = await getActivityDetail(id);
        } catch {
          detail.value = mockActivities.find((a) => a.id === id) || mockActivities[0];
        }
        loading.value = false;
      });
      async function toggleCollect() {
        if (!detail.value)
          return;
        detail.value.isCollected = !detail.value.isCollected;
        uni.showToast({ title: detail.value.isCollected ? "已收藏" : "已取消", icon: "none" });
      }
      async function enroll() {
        if (!detail.value)
          return;
        try {
          await enrollActivity(detail.value.id);
          uni.showToast({ title: "报名成功", icon: "success" });
        } catch {
          uni.showToast({ title: "报名成功（演示）", icon: "success" });
        }
      }
      const __returned__ = { loading, detail, toggleCollect, enroll, LoadingView, get formatDate() {
        return formatDate;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "page" }, [
      $setup.loading ? (vue.openBlock(), vue.createBlock($setup["LoadingView"], { key: 0 })) : $setup.detail ? (vue.openBlock(), vue.createElementBlock("view", { key: 1 }, [
        vue.createElementVNode("image", {
          class: "cover",
          src: $setup.detail.cover,
          mode: "aspectFill"
        }, null, 8, ["src"]),
        vue.createElementVNode("view", { class: "content" }, [
          vue.createElementVNode(
            "text",
            { class: "title" },
            vue.toDisplayString($setup.detail.title),
            1
            /* TEXT */
          ),
          vue.createElementVNode("view", { class: "row" }, [
            vue.createElementVNode("text", null, "📅"),
            vue.createElementVNode(
              "text",
              null,
              vue.toDisplayString($setup.formatDate($setup.detail.startTime)),
              1
              /* TEXT */
            )
          ]),
          vue.createElementVNode("view", { class: "row" }, [
            vue.createElementVNode("text", null, "📍"),
            vue.createElementVNode(
              "text",
              null,
              vue.toDisplayString($setup.detail.location),
              1
              /* TEXT */
            )
          ]),
          $setup.detail.organizer ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "row"
          }, [
            vue.createElementVNode("text", null, "🏢"),
            vue.createElementVNode(
              "text",
              null,
              vue.toDisplayString($setup.detail.organizer),
              1
              /* TEXT */
            )
          ])) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode("view", { class: "section" }, [
            vue.createElementVNode("text", { class: "section-title" }, "活动介绍"),
            vue.createElementVNode(
              "text",
              { class: "desc" },
              vue.toDisplayString($setup.detail.description || "精彩活动，欢迎参与"),
              1
              /* TEXT */
            )
          ])
        ]),
        vue.createElementVNode("view", { class: "bottom-bar safe-bottom" }, [
          vue.createElementVNode(
            "button",
            {
              class: "bar-btn",
              onClick: $setup.toggleCollect
            },
            vue.toDisplayString($setup.detail.isCollected ? "已收藏" : "收藏"),
            1
            /* TEXT */
          ),
          vue.createElementVNode("button", {
            class: "bar-btn primary",
            onClick: $setup.enroll
          }, "立即报名")
        ])
      ])) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const PagesActivityDetail = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$a], ["__scopeId", "data-v-141de3ae"], ["__file", "D:/geek/AI文旅/geek012/frontend/src/pages/activity/detail.vue"]]);
  const _sfc_main$a = /* @__PURE__ */ vue.defineComponent({
    __name: "detail",
    setup(__props, { expose: __expose }) {
      __expose();
      const loading = vue.ref(true);
      const post = vue.ref(null);
      vue.onMounted(async () => {
        var _a;
        const pages = getCurrentPages();
        const page = pages[pages.length - 1];
        const id = Number(((_a = page.options) == null ? void 0 : _a.id) || 0);
        try {
          post.value = await getCommunityDetail(id);
        } catch {
          post.value = mockPosts.find((p) => p.id === id) || mockPosts[0];
        }
        loading.value = false;
      });
      function toggleLike() {
        if (!post.value)
          return;
        post.value.isLiked = !post.value.isLiked;
        post.value.likeCount += post.value.isLiked ? 1 : -1;
      }
      function toggleCollect() {
        if (!post.value)
          return;
        post.value.isCollected = !post.value.isCollected;
        post.value.collectCount += post.value.isCollected ? 1 : -1;
      }
      function followAuthor() {
        if (!post.value)
          return;
        post.value.isFollowed = true;
        uni.showToast({ title: "关注成功", icon: "none" });
      }
      function share() {
        uni.showToast({ title: "点击右上角分享", icon: "none" });
      }
      const __returned__ = { loading, post, toggleLike, toggleCollect, followAuthor, share, LoadingView, get formatCount() {
        return formatCount;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
    var _a, _b;
    return vue.openBlock(), vue.createElementBlock("view", { class: "page" }, [
      $setup.loading ? (vue.openBlock(), vue.createBlock($setup["LoadingView"], { key: 0 })) : $setup.post ? (vue.openBlock(), vue.createElementBlock("view", { key: 1 }, [
        ((_a = $setup.post.images) == null ? void 0 : _a.length) ? (vue.openBlock(), vue.createElementBlock("swiper", {
          key: 0,
          class: "banner",
          circular: ""
        }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($setup.post.images, (img, i) => {
              return vue.openBlock(), vue.createElementBlock("swiper-item", { key: i }, [
                vue.createElementVNode("image", {
                  src: img,
                  mode: "aspectFill",
                  class: "banner-img"
                }, null, 8, ["src"])
              ]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ])) : (vue.openBlock(), vue.createElementBlock("image", {
          key: 1,
          class: "cover",
          src: $setup.post.cover,
          mode: "aspectFill"
        }, null, 8, ["src"])),
        vue.createElementVNode("view", { class: "content" }, [
          vue.createElementVNode(
            "text",
            { class: "title" },
            vue.toDisplayString($setup.post.title),
            1
            /* TEXT */
          ),
          vue.createElementVNode("view", {
            class: "author",
            onClick: $setup.followAuthor
          }, [
            vue.createElementVNode("image", {
              class: "avatar",
              src: $setup.post.author.avatar,
              mode: "aspectFill"
            }, null, 8, ["src"]),
            vue.createElementVNode(
              "text",
              { class: "nickname" },
              vue.toDisplayString($setup.post.author.nickname),
              1
              /* TEXT */
            ),
            !$setup.post.isFollowed ? (vue.openBlock(), vue.createElementBlock("text", {
              key: 0,
              class: "follow-btn"
            }, "+ 关注")) : vue.createCommentVNode("v-if", true)
          ]),
          vue.createElementVNode(
            "text",
            { class: "body" },
            vue.toDisplayString($setup.post.content || "精彩内容..."),
            1
            /* TEXT */
          ),
          ((_b = $setup.post.tags) == null ? void 0 : _b.length) ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "tags"
          }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($setup.post.tags, (tag) => {
                return vue.openBlock(), vue.createElementBlock(
                  "text",
                  {
                    key: tag,
                    class: "tag"
                  },
                  "#" + vue.toDisplayString(tag),
                  1
                  /* TEXT */
                );
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ])) : vue.createCommentVNode("v-if", true)
        ]),
        vue.createElementVNode("view", { class: "action-bar safe-bottom" }, [
          vue.createElementVNode("view", {
            class: "action",
            onClick: $setup.toggleLike
          }, [
            vue.createElementVNode(
              "text",
              null,
              vue.toDisplayString($setup.post.isLiked ? "❤️" : "🤍"),
              1
              /* TEXT */
            ),
            vue.createElementVNode(
              "text",
              null,
              vue.toDisplayString($setup.formatCount($setup.post.likeCount)),
              1
              /* TEXT */
            )
          ]),
          vue.createElementVNode("view", {
            class: "action",
            onClick: $setup.toggleCollect
          }, [
            vue.createElementVNode(
              "text",
              null,
              vue.toDisplayString($setup.post.isCollected ? "⭐" : "☆"),
              1
              /* TEXT */
            ),
            vue.createElementVNode(
              "text",
              null,
              vue.toDisplayString($setup.formatCount($setup.post.collectCount)),
              1
              /* TEXT */
            )
          ]),
          vue.createElementVNode("view", {
            class: "action",
            onClick: $setup.share
          }, [
            vue.createElementVNode("text", null, "📤"),
            vue.createElementVNode("text", null, "分享")
          ])
        ])
      ])) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const PagesCommunityDetail = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$9], ["__scopeId", "data-v-e186c394"], ["__file", "D:/geek/AI文旅/geek012/frontend/src/pages/community/detail.vue"]]);
  function useUpload() {
    const uploading = vue.ref(false);
    const progress = vue.ref(0);
    async function chooseAndUpload(count = 9) {
      const chooseRes = await new Promise((resolve, reject) => {
        uni.chooseImage({
          count,
          sizeType: ["compressed"],
          sourceType: ["album", "camera"],
          success: resolve,
          fail: reject
        });
      });
      uploading.value = true;
      progress.value = 0;
      const urls = [];
      const total = chooseRes.tempFilePaths.length;
      for (let i = 0; i < total; i++) {
        const url = await uploadFile(chooseRes.tempFilePaths[i]);
        urls.push(url);
        progress.value = Math.round((i + 1) / total * 100);
      }
      uploading.value = false;
      return urls;
    }
    function uploadFile(filePath) {
      return new Promise((resolve, reject) => {
        const token = getToken();
        uni.uploadFile({
          url: `${API_BASE_URL}/common/upload`,
          filePath,
          name: "file",
          header: token ? { Authentication: token } : {},
          success: (res) => {
            try {
              const data = JSON.parse(res.data);
              if (data.code === 1 || data.code === 200) {
                resolve(data.data);
              } else {
                reject(new Error(data.msg || "上传失败"));
              }
            } catch {
              reject(new Error("上传响应解析失败"));
            }
          },
          fail: reject
        });
      });
    }
    return { uploading, progress, chooseAndUpload, uploadFile };
  }
  const _sfc_main$9 = /* @__PURE__ */ vue.defineComponent({
    __name: "publish",
    setup(__props, { expose: __expose }) {
      __expose();
      const { uploading, progress, chooseAndUpload } = useUpload();
      const publishing = vue.ref(false);
      const form = vue.reactive({
        title: "",
        content: "",
        images: [],
        tags: [],
        location: ""
      });
      function toggleTag(tag) {
        const idx = form.tags.indexOf(tag);
        if (idx >= 0)
          form.tags.splice(idx, 1);
        else
          form.tags.push(tag);
      }
      async function addImages() {
        try {
          const urls = await chooseAndUpload(9 - form.images.length);
          form.images.push(...urls);
        } catch {
          form.images.push(`https://picsum.photos/seed/${Date.now()}/400/400`);
        }
      }
      function removeImage(index) {
        form.images.splice(index, 1);
      }
      async function handlePublish() {
        if (!form.title.trim()) {
          uni.showToast({ title: "请填写标题", icon: "none" });
          return;
        }
        if (!form.content.trim()) {
          uni.showToast({ title: "请填写内容", icon: "none" });
          return;
        }
        publishing.value = true;
        try {
          await publishPost(form);
          uni.showToast({ title: "发布成功", icon: "success" });
          setTimeout(() => uni.navigateBack(), 1e3);
        } catch {
          uni.showToast({ title: "发布成功（演示）", icon: "success" });
          setTimeout(() => uni.navigateBack(), 1e3);
        } finally {
          publishing.value = false;
        }
      }
      const __returned__ = { uploading, progress, chooseAndUpload, publishing, form, toggleTag, addImages, removeImage, handlePublish, get COMMUNITY_TAGS() {
        return COMMUNITY_TAGS;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "page" }, [
      vue.createElementVNode("view", { class: "form card" }, [
        vue.withDirectives(vue.createElementVNode(
          "input",
          {
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.form.title = $event),
            class: "title-input",
            placeholder: "填写标题，吸引更多阅读"
          },
          null,
          512
          /* NEED_PATCH */
        ), [
          [vue.vModelText, $setup.form.title]
        ]),
        vue.withDirectives(vue.createElementVNode(
          "textarea",
          {
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.form.content = $event),
            class: "content-input",
            placeholder: "分享你的旅行故事...",
            maxlength: "2000"
          },
          null,
          512
          /* NEED_PATCH */
        ), [
          [vue.vModelText, $setup.form.content]
        ]),
        vue.createCommentVNode(" 图片上传 "),
        vue.createElementVNode("view", { class: "images" }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($setup.form.images, (img, i) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                key: i,
                class: "img-item"
              }, [
                vue.createElementVNode("image", {
                  src: img,
                  mode: "aspectFill",
                  class: "img"
                }, null, 8, ["src"]),
                vue.createElementVNode("text", {
                  class: "remove",
                  onClick: ($event) => $setup.removeImage(i)
                }, "×", 8, ["onClick"])
              ]);
            }),
            128
            /* KEYED_FRAGMENT */
          )),
          $setup.form.images.length < 9 ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "add-btn",
            onClick: $setup.addImages
          }, [
            $setup.uploading ? (vue.openBlock(), vue.createElementBlock(
              "text",
              { key: 0 },
              vue.toDisplayString($setup.progress) + "%",
              1
              /* TEXT */
            )) : (vue.openBlock(), vue.createElementBlock("text", { key: 1 }, "+"))
          ])) : vue.createCommentVNode("v-if", true)
        ]),
        vue.createCommentVNode(" 标签 "),
        vue.createElementVNode("view", { class: "tags-section" }, [
          vue.createElementVNode("text", { class: "label" }, "添加标签"),
          vue.createElementVNode("view", { class: "tags" }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($setup.COMMUNITY_TAGS, (tag) => {
                return vue.openBlock(), vue.createElementBlock("text", {
                  key: tag,
                  class: vue.normalizeClass(["tag", { active: $setup.form.tags.includes(tag) }]),
                  onClick: ($event) => $setup.toggleTag(tag)
                }, vue.toDisplayString(tag), 11, ["onClick"]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ])
        ]),
        vue.withDirectives(vue.createElementVNode(
          "input",
          {
            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.form.location = $event),
            class: "location-input",
            placeholder: "添加地点（选填）"
          },
          null,
          512
          /* NEED_PATCH */
        ), [
          [vue.vModelText, $setup.form.location]
        ])
      ]),
      vue.createElementVNode("button", {
        class: "btn-primary publish-btn",
        loading: $setup.publishing,
        onClick: $setup.handlePublish
      }, "发布游记", 8, ["loading"])
    ]);
  }
  const PagesCommunityPublish = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$8], ["__scopeId", "data-v-a68b7565"], ["__file", "D:/geek/AI文旅/geek012/frontend/src/pages/community/publish.vue"]]);
  const _sfc_main$8 = /* @__PURE__ */ vue.defineComponent({
    __name: "TourCard",
    props: {
      trip: { type: Object, required: true }
    },
    setup(__props, { expose: __expose }) {
      __expose();
      const props = __props;
      function handleTap() {
        if (props.trip.id) {
          uni.navigateTo({ url: `/pages/trip/detail?id=${props.trip.id}` });
        }
      }
      const __returned__ = { props, handleTap, get formatPrice() {
        return formatPrice;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    var _a;
    return vue.openBlock(), vue.createElementBlock("view", {
      class: "tour-card card",
      onClick: $setup.handleTap
    }, [
      vue.createElementVNode("view", { class: "header" }, [
        vue.createElementVNode(
          "text",
          { class: "title text-ellipsis" },
          vue.toDisplayString($props.trip.title),
          1
          /* TEXT */
        ),
        vue.createElementVNode(
          "text",
          { class: "route" },
          vue.toDisplayString($props.trip.fromCity) + " → " + vue.toDisplayString($props.trip.toCity),
          1
          /* TEXT */
        )
      ]),
      vue.createElementVNode("view", { class: "meta" }, [
        vue.createElementVNode(
          "text",
          { class: "tag" },
          vue.toDisplayString($props.trip.days) + "天",
          1
          /* TEXT */
        ),
        vue.createElementVNode(
          "text",
          { class: "tag" },
          vue.toDisplayString($props.trip.people) + "人",
          1
          /* TEXT */
        ),
        vue.createElementVNode(
          "text",
          { class: "tag budget" },
          "预算 " + vue.toDisplayString($setup.formatPrice($props.trip.budget)),
          1
          /* TEXT */
        )
      ]),
      ((_a = $props.trip.tags) == null ? void 0 : _a.length) ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "tags"
      }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($props.trip.tags.slice(0, 3), (tag) => {
            return vue.openBlock(), vue.createElementBlock(
              "text",
              {
                key: tag,
                class: "interest-tag"
              },
              vue.toDisplayString(tag),
              1
              /* TEXT */
            );
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ])) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const TourCard = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$7], ["__scopeId", "data-v-89d16d4d"], ["__file", "D:/geek/AI文旅/geek012/frontend/src/components/TourCard/TourCard.vue"]]);
  const _sfc_main$7 = /* @__PURE__ */ vue.defineComponent({
    __name: "myTrip",
    setup(__props, { expose: __expose }) {
      __expose();
      const tripStore = useTripStore();
      const trips = vue.ref([]);
      const loading = vue.ref(true);
      vue.onMounted(async () => {
        try {
          trips.value = await tripStore.loadHistory();
        } catch {
          trips.value = [];
        }
        loading.value = false;
      });
      function goGenerate() {
        uni.switchTab({ url: "/pages/ai/generate" });
      }
      function viewTrip(trip) {
        uni.navigateTo({ url: `/pages/trip/detail?id=${trip.id}` });
      }
      function editTrip(trip) {
        uni.navigateTo({ url: `/pages/trip/edit?id=${trip.id}` });
      }
      async function copyTrip(trip) {
        uni.showToast({ title: "复制成功", icon: "success" });
      }
      function deleteTrip2(trip) {
        uni.showModal({
          title: "确认删除",
          content: "删除后不可恢复",
          success: async (res) => {
            if (res.confirm && trip.id) {
              await tripStore.deleteTrip(trip.id);
              trips.value = trips.value.filter((t) => t.id !== trip.id);
              uni.showToast({ title: "已删除", icon: "none" });
            }
          }
        });
      }
      const __returned__ = { tripStore, trips, loading, goGenerate, viewTrip, editTrip, copyTrip, deleteTrip: deleteTrip2, TourCard, LoadingView, EmptyState };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "page" }, [
      $setup.loading ? (vue.openBlock(), vue.createBlock($setup["LoadingView"], { key: 0 })) : $setup.trips.length === 0 ? (vue.openBlock(), vue.createBlock($setup["EmptyState"], {
        key: 1,
        title: "暂无行程",
        description: "去 AI 规划生成你的第一份行程吧",
        "button-text": "去规划",
        onAction: $setup.goGenerate
      })) : (vue.openBlock(), vue.createElementBlock("scroll-view", {
        key: 2,
        "scroll-y": "",
        class: "list"
      }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($setup.trips, (trip) => {
            return vue.openBlock(), vue.createBlock($setup["TourCard"], {
              key: trip.id,
              trip
            }, null, 8, ["trip"]);
          }),
          128
          /* KEYED_FRAGMENT */
        )),
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($setup.trips, (trip) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              key: "action-" + trip.id,
              class: "actions"
            }, [
              vue.createElementVNode("text", {
                class: "action",
                onClick: ($event) => $setup.viewTrip(trip)
              }, "查看", 8, ["onClick"]),
              vue.createElementVNode("text", {
                class: "action",
                onClick: ($event) => $setup.editTrip(trip)
              }, "编辑", 8, ["onClick"]),
              vue.createElementVNode("text", {
                class: "action",
                onClick: ($event) => $setup.copyTrip(trip)
              }, "复制", 8, ["onClick"]),
              vue.createElementVNode("text", {
                class: "action danger",
                onClick: ($event) => $setup.deleteTrip(trip)
              }, "删除", 8, ["onClick"])
            ]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ]))
    ]);
  }
  const PagesTripMyTrip = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$6], ["__scopeId", "data-v-1fb113e6"], ["__file", "D:/geek/AI文旅/geek012/frontend/src/pages/trip/myTrip.vue"]]);
  const _sfc_main$6 = /* @__PURE__ */ vue.defineComponent({
    __name: "detail",
    setup(__props, { expose: __expose }) {
      __expose();
      const tripStore = useTripStore();
      const trip = vue.ref(null);
      const loading = vue.ref(true);
      const budgetItems = vue.computed(() => {
        if (!trip.value)
          return [];
        const total = trip.value.estimatedCost || trip.value.budget;
        return [
          { label: "住宿", value: Math.round(total * 0.35), color: "#3B82F6" },
          { label: "餐饮", value: Math.round(total * 0.25), color: "#14B8A6" },
          { label: "门票", value: Math.round(total * 0.2), color: "#F59E0B" },
          { label: "交通", value: Math.round(total * 0.2), color: "#8B5CF6" }
        ];
      });
      vue.onMounted(async () => {
        var _a;
        const pages = getCurrentPages();
        const page = pages[pages.length - 1];
        const id = (_a = page.options) == null ? void 0 : _a.id;
        try {
          trip.value = id ? await tripStore.getTripDetail(id) : tripStore.currentTrip;
        } catch {
          trip.value = { ...mockTrip, id };
        }
        loading.value = false;
      });
      const __returned__ = { tripStore, trip, loading, budgetItems, LoadingView, BudgetChart, get formatPrice() {
        return formatPrice;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "page" }, [
      $setup.loading ? (vue.openBlock(), vue.createBlock($setup["LoadingView"], { key: 0 })) : $setup.trip ? (vue.openBlock(), vue.createElementBlock("view", { key: 1 }, [
        vue.createElementVNode("view", { class: "header card" }, [
          vue.createElementVNode(
            "text",
            { class: "title" },
            vue.toDisplayString($setup.trip.title),
            1
            /* TEXT */
          ),
          vue.createElementVNode(
            "text",
            { class: "route" },
            vue.toDisplayString($setup.trip.fromCity) + " → " + vue.toDisplayString($setup.trip.toCity),
            1
            /* TEXT */
          ),
          vue.createElementVNode("view", { class: "meta" }, [
            vue.createElementVNode(
              "text",
              null,
              vue.toDisplayString($setup.trip.days) + "天",
              1
              /* TEXT */
            ),
            vue.createElementVNode(
              "text",
              null,
              vue.toDisplayString($setup.trip.people) + "人",
              1
              /* TEXT */
            ),
            vue.createElementVNode(
              "text",
              null,
              "预算 " + vue.toDisplayString($setup.formatPrice($setup.trip.budget)),
              1
              /* TEXT */
            )
          ])
        ]),
        $setup.budgetItems.length ? (vue.openBlock(), vue.createBlock($setup["BudgetChart"], {
          key: 0,
          items: $setup.budgetItems,
          class: "budget"
        }, null, 8, ["items"])) : vue.createCommentVNode("v-if", true),
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($setup.trip.dayPlans, (day) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              key: day.day,
              class: "timeline card"
            }, [
              vue.createElementVNode("view", { class: "day-header" }, [
                vue.createElementVNode(
                  "text",
                  { class: "day-badge" },
                  "DAY " + vue.toDisplayString(day.day),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode(
                  "text",
                  { class: "day-title" },
                  vue.toDisplayString(day.title),
                  1
                  /* TEXT */
                )
              ]),
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList(day.schedules, (s, i) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    key: i,
                    class: "schedule"
                  }, [
                    vue.createElementVNode(
                      "text",
                      { class: "time" },
                      vue.toDisplayString(s.time),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode("view", { class: "info" }, [
                      vue.createElementVNode(
                        "text",
                        { class: "name" },
                        vue.toDisplayString(s.title),
                        1
                        /* TEXT */
                      ),
                      s.description ? (vue.openBlock(), vue.createElementBlock(
                        "text",
                        {
                          key: 0,
                          class: "desc"
                        },
                        vue.toDisplayString(s.description),
                        1
                        /* TEXT */
                      )) : vue.createCommentVNode("v-if", true)
                    ])
                  ]);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ])) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const PagesTripDetail = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$5], ["__scopeId", "data-v-2cdd79c7"], ["__file", "D:/geek/AI文旅/geek012/frontend/src/pages/trip/detail.vue"]]);
  const _sfc_main$5 = /* @__PURE__ */ vue.defineComponent({
    __name: "edit",
    setup(__props, { expose: __expose }) {
      __expose();
      const tripStore = useTripStore();
      const saving = vue.ref(false);
      const tripId = vue.ref("");
      const form = vue.reactive({
        title: "",
        fromCity: "",
        toCity: "",
        days: 3,
        people: 2,
        budget: 3e3
      });
      vue.onMounted(async () => {
        var _a;
        const pages = getCurrentPages();
        const page = pages[pages.length - 1];
        tripId.value = ((_a = page.options) == null ? void 0 : _a.id) || "";
        try {
          const trip = tripId.value ? await tripStore.getTripDetail(tripId.value) : mockTrip;
          Object.assign(form, trip);
        } catch {
          Object.assign(form, mockTrip);
        }
      });
      async function handleSave() {
        saving.value = true;
        try {
          if (tripId.value) {
            await tripStore.saveTrip(form);
          }
          uni.showToast({ title: "保存成功", icon: "success" });
          setTimeout(() => uni.navigateBack(), 1e3);
        } catch {
          uni.showToast({ title: "保存成功（演示）", icon: "success" });
          setTimeout(() => uni.navigateBack(), 1e3);
        } finally {
          saving.value = false;
        }
      }
      const __returned__ = { tripStore, saving, tripId, form, handleSave };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "page" }, [
      vue.createElementVNode("view", { class: "form card" }, [
        vue.createElementVNode("view", { class: "form-item" }, [
          vue.createElementVNode("text", { class: "label" }, "行程标题"),
          vue.withDirectives(vue.createElementVNode(
            "input",
            {
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.form.title = $event),
              class: "input"
            },
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vModelText, $setup.form.title]
          ])
        ]),
        vue.createElementVNode("view", { class: "form-row" }, [
          vue.createElementVNode("view", { class: "form-item half" }, [
            vue.createElementVNode("text", { class: "label" }, "出发地"),
            vue.withDirectives(vue.createElementVNode(
              "input",
              {
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.form.fromCity = $event),
                class: "input"
              },
              null,
              512
              /* NEED_PATCH */
            ), [
              [vue.vModelText, $setup.form.fromCity]
            ])
          ]),
          vue.createElementVNode("view", { class: "form-item half" }, [
            vue.createElementVNode("text", { class: "label" }, "目的地"),
            vue.withDirectives(vue.createElementVNode(
              "input",
              {
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.form.toCity = $event),
                class: "input"
              },
              null,
              512
              /* NEED_PATCH */
            ), [
              [vue.vModelText, $setup.form.toCity]
            ])
          ])
        ]),
        vue.createElementVNode("view", { class: "form-row" }, [
          vue.createElementVNode("view", { class: "form-item half" }, [
            vue.createElementVNode("text", { class: "label" }, "天数"),
            vue.withDirectives(vue.createElementVNode(
              "input",
              {
                "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $setup.form.days = $event),
                class: "input",
                type: "number"
              },
              null,
              512
              /* NEED_PATCH */
            ), [
              [
                vue.vModelText,
                $setup.form.days,
                void 0,
                { number: true }
              ]
            ])
          ]),
          vue.createElementVNode("view", { class: "form-item half" }, [
            vue.createElementVNode("text", { class: "label" }, "人数"),
            vue.withDirectives(vue.createElementVNode(
              "input",
              {
                "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $setup.form.people = $event),
                class: "input",
                type: "number"
              },
              null,
              512
              /* NEED_PATCH */
            ), [
              [
                vue.vModelText,
                $setup.form.people,
                void 0,
                { number: true }
              ]
            ])
          ])
        ]),
        vue.createElementVNode("view", { class: "form-item" }, [
          vue.createElementVNode("text", { class: "label" }, "预算"),
          vue.withDirectives(vue.createElementVNode(
            "input",
            {
              "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $setup.form.budget = $event),
              class: "input",
              type: "number"
            },
            null,
            512
            /* NEED_PATCH */
          ), [
            [
              vue.vModelText,
              $setup.form.budget,
              void 0,
              { number: true }
            ]
          ])
        ])
      ]),
      vue.createElementVNode("button", {
        class: "btn-primary",
        loading: $setup.saving,
        onClick: $setup.handleSave
      }, "保存修改", 8, ["loading"])
    ]);
  }
  const PagesTripEdit = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$4], ["__scopeId", "data-v-f0183e46"], ["__file", "D:/geek/AI文旅/geek012/frontend/src/pages/trip/edit.vue"]]);
  const defaultAvatar = "https://picsum.photos/seed/default/200/200";
  const _sfc_main$4 = /* @__PURE__ */ vue.defineComponent({
    __name: "edit",
    setup(__props, { expose: __expose }) {
      __expose();
      const userStore = useUserStore();
      const { userInfo } = storeToRefs(userStore);
      const { chooseAndUpload } = useUpload();
      const saving = vue.ref(false);
      const form = vue.reactive({
        nickname: "",
        phone: "",
        avatar: "",
        bio: ""
      });
      vue.onMounted(() => {
        if (userInfo.value) {
          Object.assign(form, userInfo.value);
        }
      });
      async function changeAvatar() {
        try {
          const urls = await chooseAndUpload(1);
          if (urls[0])
            form.avatar = urls[0];
        } catch {
          form.avatar = `https://picsum.photos/seed/${Date.now()}/200/200`;
        }
      }
      async function handleSave() {
        saving.value = true;
        try {
          await userStore.updateUserInfo(form);
          uni.showToast({ title: "保存成功", icon: "success" });
          setTimeout(() => uni.navigateBack(), 1e3);
        } catch {
          uni.showToast({ title: "保存成功（演示）", icon: "success" });
          setTimeout(() => uni.navigateBack(), 1e3);
        } finally {
          saving.value = false;
        }
      }
      const __returned__ = { userStore, userInfo, chooseAndUpload, saving, defaultAvatar, form, changeAvatar, handleSave };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "page" }, [
      vue.createElementVNode("view", { class: "form card" }, [
        vue.createElementVNode("view", {
          class: "avatar-section",
          onClick: $setup.changeAvatar
        }, [
          vue.createElementVNode("image", {
            class: "avatar",
            src: $setup.form.avatar || $setup.defaultAvatar,
            mode: "aspectFill"
          }, null, 8, ["src"]),
          vue.createElementVNode("text", { class: "change-text" }, "点击更换头像")
        ]),
        vue.createElementVNode("view", { class: "form-item" }, [
          vue.createElementVNode("text", { class: "label" }, "昵称"),
          vue.withDirectives(vue.createElementVNode(
            "input",
            {
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.form.nickname = $event),
              class: "input"
            },
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vModelText, $setup.form.nickname]
          ])
        ]),
        vue.createElementVNode("view", { class: "form-item" }, [
          vue.createElementVNode("text", { class: "label" }, "手机号"),
          vue.withDirectives(vue.createElementVNode(
            "input",
            {
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.form.phone = $event),
              class: "input",
              disabled: ""
            },
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vModelText, $setup.form.phone]
          ])
        ]),
        vue.createElementVNode("view", { class: "form-item" }, [
          vue.createElementVNode("text", { class: "label" }, "个人简介"),
          vue.withDirectives(vue.createElementVNode(
            "textarea",
            {
              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.form.bio = $event),
              class: "textarea",
              placeholder: "介绍一下自己吧"
            },
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vModelText, $setup.form.bio]
          ])
        ])
      ]),
      vue.createElementVNode("button", {
        class: "btn-primary",
        loading: $setup.saving,
        onClick: $setup.handleSave
      }, "保存", 8, ["loading"])
    ]);
  }
  const PagesProfileEdit = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$3], ["__scopeId", "data-v-7e5a80f3"], ["__file", "D:/geek/AI文旅/geek012/frontend/src/pages/profile/edit.vue"]]);
  const useAppStore = /* @__PURE__ */ defineStore("app", () => {
    const theme = vue.ref("light");
    const tabbarIndex = vue.ref(0);
    const loading = vue.ref(false);
    function changeTheme(mode) {
      theme.value = mode;
    }
    function setTabbarIndex(index) {
      tabbarIndex.value = index;
    }
    function showLoading2() {
      loading.value = true;
      uni.showLoading({ title: "加载中...", mask: true });
    }
    function hideLoading2() {
      loading.value = false;
      uni.hideLoading();
    }
    return {
      theme,
      tabbarIndex,
      loading,
      changeTheme,
      setTabbarIndex,
      showLoading: showLoading2,
      hideLoading: hideLoading2
    };
  });
  const _sfc_main$3 = /* @__PURE__ */ vue.defineComponent({
    __name: "setting",
    setup(__props, { expose: __expose }) {
      __expose();
      const appStore = useAppStore();
      const notify = vue.ref(true);
      const darkMode = vue.ref(false);
      function toggleDark() {
        darkMode.value = !darkMode.value;
        appStore.changeTheme(darkMode.value ? "dark" : "light");
      }
      function clearCache() {
        uni.showModal({
          title: "清除缓存",
          content: "确定清除本地缓存？",
          success: (res) => {
            if (res.confirm) {
              uni.clearStorageSync();
              uni.showToast({ title: "已清除", icon: "none" });
            }
          }
        });
      }
      const __returned__ = { appStore, notify, darkMode, toggleDark, clearCache };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "page" }, [
      vue.createElementVNode("view", { class: "menu card" }, [
        vue.createElementVNode("view", { class: "menu-item" }, [
          vue.createElementVNode("text", null, "消息通知"),
          vue.createElementVNode("switch", {
            checked: $setup.notify,
            onChange: _cache[0] || (_cache[0] = ($event) => $setup.notify = !$setup.notify),
            color: "#3B82F6"
          }, null, 40, ["checked"])
        ]),
        vue.createElementVNode("view", { class: "menu-item" }, [
          vue.createElementVNode("text", null, "深色模式"),
          vue.createElementVNode("switch", {
            checked: $setup.darkMode,
            onChange: $setup.toggleDark,
            color: "#3B82F6"
          }, null, 40, ["checked"])
        ]),
        vue.createElementVNode("view", {
          class: "menu-item",
          onClick: $setup.clearCache
        }, [
          vue.createElementVNode("text", null, "清除缓存"),
          vue.createElementVNode("text", { class: "arrow" }, "›")
        ]),
        vue.createElementVNode("view", { class: "menu-item" }, [
          vue.createElementVNode("text", null, "版本号"),
          vue.createElementVNode("text", { class: "value" }, "v1.0.0")
        ])
      ]),
      vue.createElementVNode("view", { class: "about card" }, [
        vue.createElementVNode("text", { class: "about-title" }, "关于 TourLing AI"),
        vue.createElementVNode("text", { class: "about-desc" }, "基于大语言模型的智能文旅行程规划平台，为年轻用户提供 AI 行程规划、景点推荐、活动发现与社区分享服务。")
      ])
    ]);
  }
  const PagesProfileSetting = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2], ["__scopeId", "data-v-5dd37346"], ["__file", "D:/geek/AI文旅/geek012/frontend/src/pages/profile/setting.vue"]]);
  const _sfc_main$2 = /* @__PURE__ */ vue.defineComponent({
    __name: "login",
    setup(__props, { expose: __expose }) {
      __expose();
      const { loading, handleLogin } = useLogin();
      const phone = vue.ref("");
      const password = vue.ref("");
      async function submit() {
        if (!phone.value || phone.value.length !== 11) {
          uni.showToast({ title: "请输入正确手机号", icon: "none" });
          return;
        }
        if (!password.value) {
          uni.showToast({ title: "请输入密码", icon: "none" });
          return;
        }
        await handleLogin(phone.value, password.value);
      }
      function goRegister() {
        uni.navigateTo({ url: "/pages/auth/register" });
      }
      const __returned__ = { loading, handleLogin, phone, password, submit, goRegister };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "page" }, [
      vue.createElementVNode("view", { class: "header" }, [
        vue.createElementVNode("text", { class: "logo" }, "🗺️"),
        vue.createElementVNode("text", { class: "title" }, "TourLing 途灵"),
        vue.createElementVNode("text", { class: "subtitle" }, "智能文旅行程规划平台")
      ]),
      vue.createElementVNode("view", { class: "form card" }, [
        vue.createElementVNode("view", { class: "form-item" }, [
          vue.createElementVNode("text", { class: "label" }, "手机号"),
          vue.withDirectives(vue.createElementVNode(
            "input",
            {
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.phone = $event),
              class: "input",
              type: "number",
              maxlength: "11",
              placeholder: "请输入手机号"
            },
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vModelText, $setup.phone]
          ])
        ]),
        vue.createElementVNode("view", { class: "form-item" }, [
          vue.createElementVNode("text", { class: "label" }, "密码"),
          vue.withDirectives(vue.createElementVNode(
            "input",
            {
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.password = $event),
              class: "input",
              password: "",
              placeholder: "请输入密码"
            },
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vModelText, $setup.password]
          ])
        ])
      ]),
      vue.createElementVNode("button", {
        class: "btn-primary login-btn",
        loading: $setup.loading,
        onClick: $setup.submit
      }, "登录", 8, ["loading"]),
      vue.createElementVNode("view", { class: "footer" }, [
        vue.createElementVNode("text", {
          class: "link",
          onClick: $setup.goRegister
        }, "还没有账号？立即注册")
      ])
    ]);
  }
  const PagesAuthLogin = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__scopeId", "data-v-6c56cc25"], ["__file", "D:/geek/AI文旅/geek012/frontend/src/pages/auth/login.vue"]]);
  const _sfc_main$1 = /* @__PURE__ */ vue.defineComponent({
    __name: "register",
    setup(__props, { expose: __expose }) {
      __expose();
      const userStore = useUserStore();
      const loading = vue.ref(false);
      const form = vue.reactive({
        nickname: "",
        phone: "",
        password: ""
      });
      async function submit() {
        if (!form.nickname) {
          uni.showToast({ title: "请输入昵称", icon: "none" });
          return;
        }
        if (!form.phone || form.phone.length !== 11) {
          uni.showToast({ title: "请输入正确手机号", icon: "none" });
          return;
        }
        if (form.password.length < 6) {
          uni.showToast({ title: "密码至少6位", icon: "none" });
          return;
        }
        loading.value = true;
        try {
          await userStore.register(form);
          uni.showToast({ title: "注册成功", icon: "success" });
          setTimeout(() => uni.navigateBack(), 1e3);
        } catch {
        } finally {
          loading.value = false;
        }
      }
      function goLogin() {
        uni.navigateBack();
      }
      const __returned__ = { userStore, loading, form, submit, goLogin, CustomNavbar };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "page" }, [
      vue.createVNode($setup["CustomNavbar"], {
        title: "注册",
        "show-back": ""
      }),
      vue.createElementVNode("view", { class: "form card" }, [
        vue.createElementVNode("view", { class: "form-item" }, [
          vue.createElementVNode("text", { class: "label" }, "昵称"),
          vue.withDirectives(vue.createElementVNode(
            "input",
            {
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.form.nickname = $event),
              class: "input",
              placeholder: "请输入昵称"
            },
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vModelText, $setup.form.nickname]
          ])
        ]),
        vue.createElementVNode("view", { class: "form-item" }, [
          vue.createElementVNode("text", { class: "label" }, "手机号"),
          vue.withDirectives(vue.createElementVNode(
            "input",
            {
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.form.phone = $event),
              class: "input",
              type: "number",
              maxlength: "11",
              placeholder: "请输入手机号"
            },
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vModelText, $setup.form.phone]
          ])
        ]),
        vue.createElementVNode("view", { class: "form-item" }, [
          vue.createElementVNode("text", { class: "label" }, "密码"),
          vue.withDirectives(vue.createElementVNode(
            "input",
            {
              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.form.password = $event),
              class: "input",
              password: "",
              placeholder: "请输入密码（6位以上）"
            },
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vModelText, $setup.form.password]
          ])
        ])
      ]),
      vue.createElementVNode("button", {
        class: "btn-primary",
        loading: $setup.loading,
        onClick: $setup.submit
      }, "注册", 8, ["loading"]),
      vue.createElementVNode("view", { class: "footer" }, [
        vue.createElementVNode("text", {
          class: "link",
          onClick: $setup.goLogin
        }, "已有账号？去登录")
      ])
    ]);
  }
  const PagesAuthRegister = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__scopeId", "data-v-3d5ab0d5"], ["__file", "D:/geek/AI文旅/geek012/frontend/src/pages/auth/register.vue"]]);
  __definePage("pages/home/index", PagesHomeIndex);
  __definePage("pages/discover/index", PagesDiscoverIndex);
  __definePage("pages/ai/generate", PagesAiGenerate);
  __definePage("pages/community/index", PagesCommunityIndex);
  __definePage("pages/profile/index", PagesProfileIndex);
  __definePage("pages/scenic/list", PagesScenicList);
  __definePage("pages/scenic/detail", PagesScenicDetail);
  __definePage("pages/activity/list", PagesActivityList);
  __definePage("pages/activity/detail", PagesActivityDetail);
  __definePage("pages/community/detail", PagesCommunityDetail);
  __definePage("pages/community/publish", PagesCommunityPublish);
  __definePage("pages/trip/myTrip", PagesTripMyTrip);
  __definePage("pages/trip/detail", PagesTripDetail);
  __definePage("pages/trip/edit", PagesTripEdit);
  __definePage("pages/profile/edit", PagesProfileEdit);
  __definePage("pages/profile/setting", PagesProfileSetting);
  __definePage("pages/auth/login", PagesAuthLogin);
  __definePage("pages/auth/register", PagesAuthRegister);
  const _sfc_main = /* @__PURE__ */ vue.defineComponent({
    __name: "App",
    setup(__props, { expose: __expose }) {
      __expose();
      onLaunch(() => {
        const userStore = useUserStore();
        userStore.initFromStorage();
      });
      const __returned__ = { get onLaunch() {
        return onLaunch;
      }, get useUserStore() {
        return useUserStore;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "D:/geek/AI文旅/geek012/frontend/src/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    const pinia = createPinia();
    app.use(pinia);
    return { app };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue);
