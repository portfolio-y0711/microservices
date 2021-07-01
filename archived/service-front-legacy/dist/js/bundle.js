(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUser = exports.GetUsers = exports.PutUser = exports.Logout = exports.Login = exports.PostFeed = exports.GetFeeds = void 0;
var typings_1 = require("../typings");
var typings_2 = require("../typings");
var user_query_type_1 = require("../typings/vo/user-query-type");
var index_1 = require("./index");
var GetFeeds = function (config, baseUrl) {
    return function (queryType, selectedUserUid) { return __awaiter(void 0, void 0, void 0, function () {
        var params, url, response, feeds, rawFeeds;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    params = __assign(__assign({}, typings_1.iFeedQueryMap.get(queryType)), (selectedUserUid ? ({ userUid: selectedUserUid }) : null));
                    url = new URL((baseUrl ? baseUrl : 'http://localhost:8000') + "/api/feeds");
                    Object.keys(params).forEach(function (key) { return url.searchParams.append(key, params[key]); });
                    return [4 /*yield*/, fetch("" + url.href, __assign({}, config.GET))];
                case 1:
                    response = _a.sent();
                    if (!(response.status === 200)) return [3 /*break*/, 3];
                    return [4 /*yield*/, response.json()];
                case 2:
                    rawFeeds = _a.sent();
                    feeds = rawFeeds.map(function (raw) { return ({
                        uuid: raw.uuid,
                        msg: raw.msg,
                        writer: raw.writer,
                        likers: raw.likers.split(','),
                        dislikers: raw.dislikers.split(',')
                    }); });
                    return [2 /*return*/, feeds];
                case 3: return [2 /*return*/, []];
            }
        });
    }); };
};
exports.GetFeeds = GetFeeds;
var PostFeed = function (config, baseUrl) {
    return function (msg) { return __awaiter(void 0, void 0, void 0, function () {
        var payload, formBodyStr, response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    payload = { msg: msg };
                    formBodyStr = index_1.urlEncoding(payload);
                    return [4 /*yield*/, fetch((baseUrl ? baseUrl : 'http://localhost:8000') + "/api/feeds", __assign(__assign({}, config.POST), { body: formBodyStr }))];
                case 1:
                    response = _a.sent();
                    if (!(response.status === 200)) return [3 /*break*/, 3];
                    return [4 /*yield*/, response.json()
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                    ];
                case 2:
                    data = _a.sent();
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                    return [2 /*return*/, data];
                case 3: return [2 /*return*/, []];
            }
        });
    }); };
};
exports.PostFeed = PostFeed;
var Login = function (config, baseUrl) {
    return function (userUid, pass) { return __awaiter(void 0, void 0, void 0, function () {
        var authInfo, formBodyStr, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    authInfo = { userUid: userUid, pass: pass };
                    formBodyStr = index_1.urlEncoding(authInfo);
                    return [4 /*yield*/, fetch((baseUrl ? baseUrl : 'http://localhost:8000') + "/api/auth/login", __assign(__assign({}, config.POST), { body: formBodyStr }))
                        // if (!(response.status === 401)) {
                        //     const data = await response.json()
                        //     const { logginUser: { name, uuid, userDetail: { device, deviceIcon, img }, leaders, followers, feeds } } = data
                        //     const user = ({ name, device, deviceIcon, uuid, img, leaders, followers, feeds }) as IUser
                        //     return user
                        // } else {
                        //     return undefined
                        // }
                    ];
                case 1:
                    response = _a.sent();
                    // if (!(response.status === 401)) {
                    //     const data = await response.json()
                    //     const { logginUser: { name, uuid, userDetail: { device, deviceIcon, img }, leaders, followers, feeds } } = data
                    //     const user = ({ name, device, deviceIcon, uuid, img, leaders, followers, feeds }) as IUser
                    //     return user
                    // } else {
                    //     return undefined
                    // }
                    if (!(response.status === 401)) {
                        return [2 /*return*/, true];
                    }
                    else {
                        return [2 /*return*/, false];
                    }
                    return [2 /*return*/];
            }
        });
    }); };
};
exports.Login = Login;
var Logout = function (config, baseUrl) {
    return function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch((baseUrl ? baseUrl : 'http://localhost:8000') + "/api/auth/logout", __assign({}, config.POST))];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                    ];
                case 2:
                    data = _a.sent();
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                    return [2 /*return*/, data];
            }
        });
    }); };
};
exports.Logout = Logout;
var PutUser = function (config, baseUrl) {
    return function (commandType, selectedUserUid) { return __awaiter(void 0, void 0, void 0, function () {
        var params, url, response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    params = typings_2.iUserCommandMap.get(commandType);
                    url = new URL((baseUrl ? baseUrl : 'http://localhost:8000') + "/api/users/" + selectedUserUid);
                    Object.keys(params).forEach(function (key) { return url.searchParams.append(key, params[key]); });
                    return [4 /*yield*/, fetch("" + url.href, __assign({}, config.PUT))];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, true];
            }
        });
    }); };
};
exports.PutUser = PutUser;
var GetUsers = function (config, baseUrl) {
    return function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, data, users;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch((baseUrl ? baseUrl : 'http://localhost:8000') + "/api/users", __assign({}, config.GET))];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    users = data.map(function (e) {
                        var name = e.name, uuid = e.uuid, _a = e.userDetail, device = _a.device, deviceIcon = _a.deviceIcon, img = _a.img;
                        return ({ name: name, device: device, deviceIcon: deviceIcon, uuid: uuid, img: img });
                    });
                    return [2 /*return*/, users];
            }
        });
    }); };
};
exports.GetUsers = GetUsers;
var GetUser = function (config, baseUrl) {
    return function (queryType, selectedUserUid) { return __awaiter(void 0, void 0, void 0, function () {
        var params, url, response, data, name, uuid, _a, device, deviceIcon, img, leaders, followers, feeds;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    params = __assign(__assign({}, user_query_type_1.iUserQueryMap.get(queryType)), (selectedUserUid ? ({ userUid: selectedUserUid }) : null));
                    url = new URL((baseUrl ? baseUrl : 'http://localhost:8000') + "/api/users/" + (selectedUserUid ? selectedUserUid : 'none'));
                    Object.keys(params).forEach(function (key) { return url.searchParams.append(key, params[key]); });
                    console.log(url.href);
                    return [4 /*yield*/, fetch("" + url.href, __assign({}, config.GET))];
                case 1:
                    response = _b.sent();
                    console.log(response);
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _b.sent();
                    name = data.name, uuid = data.uuid, _a = data.userDetail, device = _a.device, deviceIcon = _a.deviceIcon, img = _a.img;
                    leaders = data.leaders, followers = data.followers, feeds = data.feeds;
                    return [2 /*return*/, ({
                            name: name,
                            device: device,
                            deviceIcon: deviceIcon,
                            uuid: uuid,
                            img: img,
                            leaders: leaders,
                            followers: followers,
                            feeds: feeds,
                        })];
            }
        });
    }); };
};
exports.GetUser = GetUser;
// export const GetSelectUserProfile
//     = (config: IFetchConfig) => {
//         return async (userUid: string): Promise<IUser> => {
//             const { auth: { baseUrl } } = config
//             const userQuery = {
//                 query: 'profile',
//                 target: 'select_user',
//                 userUid: userUid
//             }
//             const response = await fetch(`${baseUrl}/api/users`, {
//                 ...config.GET,
//                 body: JSON.stringify(userQuery)
//             })
//             const data = await response.json()
//             const { name, uuid, userDetail: { device, deviceIcon, img } } = data
//             return ({
//                 name,
//                 device,
//                 deviceIcon,
//                 uuid,
//                 img,
//             }) as IUser
//         }
//     }

},{"../typings":31,"../typings/vo/user-query-type":34,"./index":3}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchConfig = void 0;
exports.fetchConfig = {
    "GET": {
        "method": "GET",
        "credentials": "include",
        "headers": {
            "Content-Type": "application/json"
        }
    },
    "POST": {
        "method": "POST",
        "credentials": "include",
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    },
    "PUT": {
        "method": "PUT",
        "mode": "cors",
        "credentials": "include",
        "headers": {
            "Content-Type": "application/json"
        }
    }
};

},{}],3:[function(require,module,exports){
"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlEncoding = exports.CreateApi = void 0;
var apis_1 = require("./apis");
var apis_2 = require("./apis");
var apis_3 = require("./apis");
var apis_4 = require("./apis");
var apis_5 = require("./apis");
var apis_6 = require("./apis");
var apis_7 = require("./apis");
var CreateApi = function (config, baseUrl) {
    var login = apis_4.Login(config, baseUrl);
    var logout = apis_5.Logout(config, baseUrl);
    var getUsers = apis_3.GetUsers(config, baseUrl);
    var putUser = apis_7.PutUser(config, baseUrl);
    var postFeed = apis_6.PostFeed(config, baseUrl);
    var getFeeds = apis_1.GetFeeds(config, baseUrl);
    var getUser = apis_2.GetUser(config, baseUrl);
    return {
        login: login,
        logout: logout,
        postFeed: postFeed,
        getUsers: getUsers,
        putUser: putUser,
        getFeeds: getFeeds,
        getUser: getUser,
    };
};
exports.CreateApi = CreateApi;
var urlEncoding = function (formInput) {
    return __spreadArray([], __read(Object.entries(formInput))).reduce(function (acc, _a) {
        var _b = __read(_a, 2), key = _b[0], val = _b[1];
        var encodedKey = encodeURIComponent(key);
        var encodedValue = encodeURIComponent(val);
        acc.push(encodedKey + "=" + encodedValue);
        return acc;
    }, []).join('&');
};
exports.urlEncoding = urlEncoding;

},{"./apis":1}],4:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var app = (function () {
    var App = /** @class */ (function () {
        function App() {
            // injectModules / module class, module instance, module properties
            this.moduleCls = new Map();
            this.moduleIns = new Map();
            this.modulePs = new Map();
            // injectHandlers / module handler class, module handler instance
            this.handlerCls = new Map();
            this.handlerIns = new Map();
            this.rootEl = document.querySelector('#root');
            // const root = this.rootEl
            // this.tagEls = Array.from(root.children)
            //     .filter(c => c instanceof HTMLUnknownElement)
            //     .map(tagEl => tagEl.tagName)
            // console.log(this.tagEls)
        }
        App.prototype.injectApi = function (api) {
            this.api = api;
            return this;
        };
        App.prototype.injectPageAndHandler = function (pagemap) {
            console.log(pagemap);
            console.log(Object.keys(pagemap));
            return this;
        };
        App.prototype.injectStore = function (_store, _module_props) {
            var _this = this;
            // extract module names
            var module_names = Array.from(Object.keys(_module_props));
            // merge props into state
            var state = module_names.reduce(function (acc, module_name) {
                var module_props = _module_props[module_name];
                var prop_names = Object.keys(module_props);
                prop_names
                    .forEach(function (prop_name) {
                    if (!("" + prop_name in acc)) {
                        acc["" + prop_name] = module_props["" + prop_name];
                    }
                });
                _this.modulePs.set(module_name, prop_names);
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                return acc;
            }, {});
            // inject state into store
            _store.state = state;
            _store.listeners.push(this);
            // create proxy of store
            var proxy_store = new Proxy(_store, {
                set: function (store, key, state) {
                    store[key] = state;
                    var _state = state;
                    var _logginUser;
                    if (_state.logginUser === undefined) {
                        _logginUser = {
                            name: 'none',
                            device: '',
                            deviceIcon: '',
                            img: '',
                            uuid: '',
                            leaders: [],
                            followers: [],
                            feeds: []
                        };
                    }
                    else {
                        _logginUser = _state.logginUser;
                    }
                    var users = _state.users, feeds = _state.feeds;
                    console.log("[STORE] login user: " + _logginUser.name + ", total users: " + users.length + ", feeds: " + feeds.length);
                    store.notify();
                    return true;
                },
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                get: function (store, key) { return store[key]; }
            });
            this.store = proxy_store;
            return this;
        };
        App.prototype.injectModules = function (modules) {
            this.moduleCls = new Map(modules.map(function (m) { return [m.name, m]; }));
            return this;
        };
        App.prototype.injectHandlers = function (handlers) {
            this.handlerCls = new Map(handlers.map(function (h) { return [h.name, h]; }));
            return this;
        };
        App.prototype.injectPageAndLoadHandler = function (pageArr) {
            this.pageCls = pageArr[0];
            this.pageHdl = pageArr[1](this.api);
            this.pageHdl.setApp(this);
            this.pageHdl.setStore(this.store);
            window["" + pageArr[0].name.toLowerCase()] = this.pageHdl;
            return this;
        };
        App.prototype.loadModules = function () {
            var e_1, _a;
            var _this = this;
            var _b;
            try {
                for (var _c = __values(this.moduleCls.entries()), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var _e = __read(_d.value, 2), _name = _e[0], classRef = _e[1];
                    var name_1 = _name.toLowerCase();
                    var props = (_b = this.modulePs.get(name_1)) === null || _b === void 0 ? void 0 : _b.reduce(function (acc, prop_name) {
                        acc["" + prop_name] = _this.store.state["" + prop_name];
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                        return acc;
                    }, {});
                    var instance = new classRef(props);
                    this.moduleIns.set(name_1, instance);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_1) throw e_1.error; }
            }
        };
        // async componentDidMount() {
        //     const users = await this.api.getUsers()
        //     const logginUser = await this.api.login()
        //     if (logginUser !== undefined) {
        //         this.store.state.logginUser = logginUser
        //     }
        //     this.store.state.users = users
        // }
        App.prototype.render = function () {
            var e_2, _a;
            this.dom = new DOMParser().parseFromString(this.pageIns.render(), 'text/html');
            var tagEls = Array
                .from(this.dom.documentElement.getElementsByTagName('*'))
                .filter(function (x) { return (x instanceof HTMLUnknownElement); });
            this.loadModules();
            try {
                for (var tagEls_1 = __values(tagEls), tagEls_1_1 = tagEls_1.next(); !tagEls_1_1.done; tagEls_1_1 = tagEls_1.next()) {
                    var el = tagEls_1_1.value;
                    var tag = el.tagName.toLowerCase();
                    var template = document.createElement('template');
                    template.innerHTML = this.moduleIns.get(tag).render();
                    var targetEl = this.dom.documentElement.querySelector(tag);
                    var parent_1 = targetEl.parentElement;
                    targetEl.insertBefore(template.content, parent_1.children[parent_1.children.length]);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (tagEls_1_1 && !tagEls_1_1.done && (_a = tagEls_1.return)) _a.call(tagEls_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
            this.rootEl.innerHTML = this.dom.documentElement.innerHTML;
        };
        App.prototype.selectModules = function (selected) {
            this.pageIns = new this.pageCls(selected);
        };
        App.prototype.start = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b, _c, _1, handler, handlerIns, name_2;
                var e_3, _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            try {
                                for (_a = __values(this.handlerCls), _b = _a.next(); !_b.done; _b = _a.next()) {
                                    _c = __read(_b.value, 2), _1 = _c[0], handler = _c[1];
                                    handlerIns = handler(this.api);
                                    name_2 = handlerIns.moduleName.toLowerCase();
                                    window["" + name_2] = handlerIns;
                                    handlerIns.setStore(this.store);
                                }
                            }
                            catch (e_3_1) { e_3 = { error: e_3_1 }; }
                            finally {
                                try {
                                    if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
                                }
                                finally { if (e_3) throw e_3.error; }
                            }
                            this.pageHdl.setStore(this.store);
                            // eslint-disable-next-line @typescript-eslint/await-thenable
                            this.selectModules(['login']);
                            return [4 /*yield*/, this.pageHdl.navToPage('HOME')];
                        case 1:
                            _e.sent();
                            this.render();
                            return [2 /*return*/];
                    }
                });
            });
        };
        return App;
    }());
    return new App();
})();
exports.app = app;

},{}],5:[function(require,module,exports){
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeederHandler = void 0;
var typings_1 = require("../../typings");
var FeederHandler = function (api) {
    var moduleName = 'Feeder';
    var store;
    var setStore = function (_store) { store = _store; };
    var toggle = function () { return __awaiter(void 0, void 0, void 0, function () {
        var feeds;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, api.getFeeds(typings_1.IFeedQueryType.LOGIN_USER_UNREAD_FEEDS)];
                case 1:
                    feeds = _a.sent();
                    store.state = __assign(__assign({}, store.state), {
                        feeds: feeds
                    });
                    return [2 /*return*/];
            }
        });
    }); };
    return {
        toggle: toggle,
        moduleName: moduleName,
        setStore: setStore,
    };
};
exports.FeederHandler = FeederHandler;

},{"../../typings":31}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Feeder = void 0;
var Feeder = /** @class */ (function () {
    function Feeder(props) {
        this.props = props;
    }
    Feeder.prototype.render = function () {
        var _a = this.props, feeds = _a.feeds, users = _a.users;
        if (feeds.length > 0) {
            return ("\n                <div class=\"panel\">\n                    <div class=\"panel-body feedlist\">\n                        " + feeds.map(function (feed) {
                var user = users.find(function (u) { return u.uuid === feed.writer.uuid; });
                return ("\n                                <div class=\"media-block\">\n                                    <a class=\"media-left\" href=\"#\">\n                                        <img \n                                            class=\"img-circle img-sm\" \n                                            alt=\"Profile Picture\" \n                                            src=\"img/" + user.img + ".png\"/>\n                                    </a>\n                                    <div class=\"media-body\">\n                                        <div class=\"mar-btm\">\n                                            <a class=\"btn-link text-semibold media-heading box-inline\" href=\"#\">" + user.name + "</a>\n                                            <p class=\"text-muted text-sm\"\n                                                <i class=\"fa fa-mobile-alt fa-lg\">\n                                                </i> - From Mobile - 7 min ago\n                                            </p>\n                                            <p>" + feed.msg + "</p>\n                                            <div class=\"pad-ver\"><span class=\"tag tag-sm\"><i class=\"fa fa-heart text-danger\"></i> 250 Likes</span>\n                                            <div class=\"btn-group\"><a class=\"btn btn-sm btn-default btn-hover-success\" href=\"#\"><i class=\"fa fa-thumbs-up\"></i></a><a class=\"btn btn-sm btn-default btn-hover-danger\" href=\"#\"><i class=\"fa fa-thumbs-down\"></i></a></div><a class=\"btn btn-sm btn-default btn-hover-primary\" href=\"#\">Comment</a>\n                                            </div>\n                                        </div>\n                                    <hr/>\n                                </div>");
            }).join('') + "\n\n\n                    </div>\n                </div>\n            ");
        }
        else {
            return ("\n                <div class=\"panel\">\n                    <img class=\"fit-picture\"\n                    src=\"img/no-posts.png\"\n                </div>\n            ");
        }
    };
    return Feeder;
}());
exports.Feeder = Feeder;
// const tmp = `<div class="panel">
//                     <div class="panel-body feedlist">
//                         <div class="media-block">
//                             <a class="media-left" href="#">
//                                 <img 
//                                     class="img-circle img-sm" 
//                                     alt="Profile Picture" 
//                                     src="https://bootdey.com/img/Content/avatar/avatar3.png"/>
//                             </a>
//                             <div class="media-body">
//                                 <div class="mar-btm">
//                                     <a class="btn-link text-semibold media-heading box-inline" href="#">Jenny</a>
//                                     <p class="text-muted text-sm">
//                                         <i class="fa fa-mobile-alt fa-lg">
//                                         </i> - From Mobile - 7 min ago
//                                     </p>
//                                     <p>consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>
//                                     <div class="pad-ver"><span class="tag tag-sm"><i class="fa fa-heart text-danger"></i> 250 Likes</span>
//                                       <div class="btn-group"><a class="btn btn-sm btn-default btn-hover-success" href="#"><i class="fa fa-thumbs-up"></i></a><a class="btn btn-sm btn-default btn-hover-danger" href="#"><i class="fa fa-thumbs-down"></i></a></div><a class="btn btn-sm btn-default btn-hover-primary" href="#">Comment</a>
//                                     </div>
//                                 </div>
//                             <hr/>
//                         </div>
//                         <div class="media-block">
//                             <a class="media-left" href="#">
//                                 <img 
//                                     class="img-circle img-sm" 
//                                     alt="Profile Picture" 
//                                     src="https://bootdey.com/img/Content/avatar/avatar4.png"/>
//                             </a>
//                             <div class="media-body">
//                                 <div class="mar-btm">
//                                     <a class="btn-link text-semibold media-heading box-inline" href="#">Tom</a>
//                                     <p class="text-muted text-sm">
//                                         <i class="fa fa-mobile-alt fa-lg">
//                                         </i> - From Mobile - 7 min ago
//                                     </p>
//                                     <p>consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>
//                                     <div class="pad-ver"><span class="tag tag-sm"><i class="fa fa-heart text-danger"></i> 250 Likes</span>
//                                       <div class="btn-group"><a class="btn btn-sm btn-default btn-hover-success" href="#"><i class="fa fa-thumbs-up"></i></a><a class="btn btn-sm btn-default btn-hover-danger" href="#"><i class="fa fa-thumbs-down"></i></a></div><a class="btn btn-sm btn-default btn-hover-primary" href="#">Comment</a>
//                                     </div>
//                                 </div>
//                             <hr/>
//                             <--  -->
//                             <div class="media-block">
//                                 <a class="media-left" href="#">
//                                     <img 
//                                         class="img-circle img-sm" 
//                                         alt="Profile Picture" 
//                                         src="https://bootdey.com/img/Content/avatar/avatar5.png"/>
//                                 </a>
//                                 <div class="media-body">
//                                     <div class="mar-btm">
//                                         <a class="btn-link text-semibold media-heading box-inline" href="#">Jacky</a>
//                                         <p class="text-muted text-sm">
//                                             <i class="fa fa-mobile-alt fa-lg">
//                                             </i> - From Mobile - 7 min ago
//                                         </p>
//                                         <p>consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>
//                                         <div class="pad-ver"><span class="tag tag-sm"><i class="fa fa-heart text-danger"></i> 250 Likes</span>
//                                         <div class="btn-group"><a class="btn btn-sm btn-default btn-hover-success" href="#"><i class="fa fa-thumbs-up"></i></a><a class="btn btn-sm btn-default btn-hover-danger" href="#"><i class="fa fa-thumbs-down"></i></a></div><a class="btn btn-sm btn-default btn-hover-primary" href="#">Comment</a>
//                                         </div>
//                                     </div>
//                                 <hr/>
//                                 <--  -->
//                                 <div class="panel">
//                                     <div class="panel-body">
//                                         <a class="media-left" href="#">
//                                             <img 
//                                                 class="img-circle img-sm" 
//                                                 alt="Profile Picture" 
//                                                 src="https://bootdey.com/img/Content/avatar/avatar2.png"/>
//                                         </a>
//                                         <div class="media-body">
//                                             <div class="mar-btm"><a class="btn-link text-semibold media-heading box-inline" href="#">Michael</a>
//                                                 <p class="text-muted text-sm"><i class="fa fa-mobile-alt fa-lg"></i> - From Web</p>
//                                             </div>
//                                         </div>
//                                         <hr/>
//                                         <form name="feedform">
//                                             <textarea class="form-control" name="msg" id="msg" rows="2" placeholder="What are you thinking?"></textarea>
//                                             <input type="hidden" name="access_token" id="access_token" value="#access_token"/>
//                                             <div class="mar-top clearfix">
//                                                 <button onclick="" class="btn btn-sm btn-primary pull-right" type="button">
//                                                     <i class="fas fa-pencil-alt fa-fw"></i> 
//                                                     Comment
//                                                 </button>
//                                             </div>
//                                         </form>
//                                     </div>
//                                 </div>
//                                 <--  -->
//                             </div>
//                         </div>
//                     </div>
//                 </div>`

},{}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeederHandler = exports.Feeder = void 0;
var feeder_1 = require("./feeder");
Object.defineProperty(exports, "Feeder", { enumerable: true, get: function () { return feeder_1.Feeder; } });
var feeder_handlers_1 = require("./feeder-handlers");
Object.defineProperty(exports, "FeederHandler", { enumerable: true, get: function () { return feeder_handlers_1.FeederHandler; } });

},{"./feeder":6,"./feeder-handlers":5}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginHandler = exports.Login = exports.WriterHandler = exports.Writer = exports.FeederHandler = exports.Feeder = exports.SelectorHandler = exports.Selector = exports.NavbarHandler = exports.Navbar = void 0;
var navbar_1 = require("./navbar");
Object.defineProperty(exports, "Navbar", { enumerable: true, get: function () { return navbar_1.Navbar; } });
var navbar_2 = require("./navbar");
Object.defineProperty(exports, "NavbarHandler", { enumerable: true, get: function () { return navbar_2.NavbarHandler; } });
var selector_1 = require("./selector");
Object.defineProperty(exports, "Selector", { enumerable: true, get: function () { return selector_1.Selector; } });
var selector_2 = require("./selector");
Object.defineProperty(exports, "SelectorHandler", { enumerable: true, get: function () { return selector_2.SelectorHandler; } });
var feeder_1 = require("./feeder");
Object.defineProperty(exports, "Feeder", { enumerable: true, get: function () { return feeder_1.Feeder; } });
var feeder_2 = require("./feeder");
Object.defineProperty(exports, "FeederHandler", { enumerable: true, get: function () { return feeder_2.FeederHandler; } });
var writer_1 = require("./writer");
Object.defineProperty(exports, "Writer", { enumerable: true, get: function () { return writer_1.Writer; } });
var writer_2 = require("./writer");
Object.defineProperty(exports, "WriterHandler", { enumerable: true, get: function () { return writer_2.WriterHandler; } });
var login_1 = require("./login");
Object.defineProperty(exports, "Login", { enumerable: true, get: function () { return login_1.Login; } });
var login_2 = require("./login");
Object.defineProperty(exports, "LoginHandler", { enumerable: true, get: function () { return login_2.LoginHandler; } });

},{"./feeder":7,"./login":9,"./navbar":13,"./selector":17,"./writer":21}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutNavView = exports.loginModalView = exports.LoginHandler = exports.Login = void 0;
var login_1 = require("./login");
Object.defineProperty(exports, "Login", { enumerable: true, get: function () { return login_1.Login; } });
var login_handlers_1 = require("./login-handlers");
Object.defineProperty(exports, "LoginHandler", { enumerable: true, get: function () { return login_handlers_1.LoginHandler; } });
var login_views_1 = require("./login-views");
Object.defineProperty(exports, "loginModalView", { enumerable: true, get: function () { return login_views_1.loginModalView; } });
Object.defineProperty(exports, "logoutNavView", { enumerable: true, get: function () { return login_views_1.logoutNavView; } });

},{"./login":12,"./login-handlers":10,"./login-views":11}],10:[function(require,module,exports){
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginHandler = void 0;
var user_query_type_1 = require("../../typings/vo/user-query-type");
var backward = function (currentIndex, maxIndex) {
    return (currentIndex === 0)
        ? currentIndex = maxIndex - 1
        : currentIndex = currentIndex - 1;
};
var forward = function (currentIndex, maxIndex) {
    return (currentIndex === maxIndex - 1)
        ? currentIndex = 0
        : currentIndex = currentIndex + 1;
};
var q = function (selector) { return document.querySelector(selector); };
var LoginHandler = function (api) {
    var moduleName = 'Login';
    var store;
    var currentIndex = 0;
    var defaultIndex = 0;
    var showLoginModal = function () {
        var _a = __read([
            q("div[data-user-index=\"" + (currentIndex = defaultIndex) + "\"]"),
            q("button[data-toggle=\"modal\"]")
        ], 2), userEl = _a[0], modalButton = _a[1];
        userEl.style.display = '';
        modalButton.click();
        $(document).on('hide.bs.modal', function (e) {
            var modalUsers = e.currentTarget.querySelectorAll("div[data-user-index]");
            modalUsers.forEach(function (user) { return user.style.display = 'none'; });
        });
    };
    var changeUserInLoginModal = function (selector) {
        var maxIndex = store.state.users.length;
        var userEl = q("div[data-user-index=\"" + currentIndex + "\"]");
        userEl.style.display = 'none';
        if (selector === 'prev')
            currentIndex = backward(currentIndex, maxIndex);
        if (selector === 'next')
            currentIndex = forward(currentIndex, maxIndex);
        var newUserEl = q("div[data-user-index=\"" + currentIndex + "\"]");
        newUserEl.style.display = '';
    };
    var processLogin = function (form) { return __awaiter(void 0, void 0, void 0, function () {
        var id, pass, newLogginUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    closeLoginModal();
                    id = form.elements['id'].value;
                    pass = form.elements['pass'].value;
                    return [4 /*yield*/, api.login(id, pass)];
                case 1:
                    if (!_a.sent()) return [3 /*break*/, 4];
                    return [4 /*yield*/, api.getUser(user_query_type_1.IUserQueryType.LOGIN_USER_PROFILE)];
                case 2:
                    newLogginUser = _a.sent();
                    store.state = __assign(__assign({}, store.state), {
                        logginUser: newLogginUser,
                    });
                    return [4 /*yield*/, window['feedpage'].navToPage('FEEDS')];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, window['feedpage'].navToPage('HOME')];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6: return [2 /*return*/];
            }
        });
    }); };
    var processLogout = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, api.logout()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, window['feedpage'].navToPage('LOGOUT')];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var closeLoginModal = function () { return document.querySelector('button[data-dismiss="modal"]').click(); };
    var selectPrevUserToLogin = function () { return changeUserInLoginModal('prev'); };
    var selectNextUserToLogin = function () { return changeUserInLoginModal('next'); };
    var setDefault = function (_default) { return defaultIndex = _default; };
    var setStore = function (_store) { store = _store; };
    return {
        moduleName: moduleName,
        setStore: setStore,
        setDefault: setDefault,
        showLoginModal: showLoginModal,
        processLogin: processLogin,
        processLogout: processLogout,
        changeUserInLoginModal: changeUserInLoginModal,
        selectPrevUserToLogin: selectPrevUserToLogin,
        selectNextUserToLogin: selectNextUserToLogin,
        closeLoginModal: closeLoginModal,
    };
};
exports.LoginHandler = LoginHandler;

},{"../../typings/vo/user-query-type":34}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutNavView = exports.loginModalView = void 0;
var loginModalView = function (props) {
    var users = props.users;
    var selectionEventHandler = function (selector) { return "login.select" + selector + "UserToLogin()"; };
    var userSelectionView = function (props, index) {
        var loginEventHandler = "login.processLogin(document.forms['loginform" + index + "'])";
        return ("\n        <div data-user-index='" + index + "' style=\"display:none;\">\n            <img class=\"profile-img\" src=\"img/" + props.img + ".png\"\n                alt=\"\">\n            <p class=\"profile-name\">" + props.name + "</p>\n            <span class=\"profile-email\">" + props.name.toLowerCase() + "@gmail.com</span>\n            <form name=\"loginform" + index + "\" class=\"form-signin\">\n                <input type=\"hidden\" name=\"id\" value=\"" + props.uuid + "\">\n                <input type=\"password\" name=\"pass\" value=\"" + props.name + "\" class=\"form-control\" placeholder=\"Password\" required autofocus readonly>\n                <button onclick=\"" + loginEventHandler + "\" class=\"btn btn-lg btn-primary btn-block\" type=\"button\">\n                    Sign in\n                </button>\n                <a href=\"#\" class=\"need-help\">Need help? </a><span class=\"clearfix\"></span>\n            </form>\n            <a href=\"#\" class=\"text-center new-account\">Sign in with a different account</a>\n        </div>\n    ");
    };
    return ("\n        <button class=\"btn btn-primary hidden\" type=\"button\" data-toggle=\"modal\" data-target=\"#login\">HiddenButton</button>\n        <div class=\"modal modal-center fade\" id=\"login\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"my80sizeCenterModalLabel\">\n            <div class=\"modal-dialog modal-80size modal-center\" role=\"document\">\n                <div class=\"modal-content modal-80size\">\n                    <div class=\"modal-header\">\n                        <button class=\"close\" type=\"button\" data-dismiss=\"modal\" aria-label=\"Close\">\n                            <span aria-hidden=\"true\">\u00D7</span>\n                        </button>\n                        <h4 class=\"modal-title\" id=\"myModalLabel\"></h4>\n                    </div>\n\n                    <div id=\"modal-body\" class=\"modal-body\">\n                        <div onclick=\"" + selectionEventHandler('Prev') + "\" class=\"left carousel-control\">\n                            <i class=\"fa fa-chevron-left\"></i>\n                        </div>\n                        <div onclick=\"" + selectionEventHandler('Next') + "\" class=\"right carousel-control\">\n                            <i class=\"fa fa-chevron-right\"></i>\n                        </div>\n                            " + users.map(function (user, index) { return userSelectionView(user, index); }).join('') + "\n                        </div>\n\n                    <div class=\"modal-footer\">\n                        <button class=\"btn btn-default\" type=\"button\" data-dismiss=\"modal\">\n                            close\n                        </button>\n                    </div>\n                </div>\n            </div>\n        </div>\n    ");
};
exports.loginModalView = loginModalView;
var logoutNavView = function (props) {
    var logoutEventHandler = "login.processLogout()";
    return ("\n        <li \n            class=\"dropdown\" \n            onmouseenter=\"this.classList.add('active')\" \n            onmouseout=\"this.classList.remove('active')\">\n            <a class=\"dropdown-toggle\" href=\"#\" data-toggle=\"dropdown\">\n                <i class=\"fas fa-user\">&nbsp;&nbsp;</i>\n                logout (" + props.name + ")\n            </a>\n\n            <ul class=\"dropdown-menu\">\n                <li>\n                    <div class=\"navbar-login\">\n                        <div class=\"row\">\n                            <div class=\"col-lg-4\">\n                                <p class=\"text-center\">\n                                    <img class=\"icon-size\" width=\"80\" height=\"80\" alt=\"120x120\" src=\"img/" + props.img + ".png\"/>\n                                </p>\n                            </div>\n                            <div class=\"col-lg-8\">\n                                <p class=\"text-left\"><strong>" + props.name + "</strong></p>\n                                <p class=\"text-left small\">" + props.name.toLowerCase() + "@gmail.com</p>\n                            </div>\n                        </div>\n                    </div>\n                </li>\n                <li class=\"divider\"></li>\n                <li>\n                    <div class=\"navbar-login navbar-login-session\">\n                        <div class=\"row\">\n                            <div class=\"col-lg-12\">\n                                <p><a class=\"btn btn-danger btn-block\" href=\"#\" onclick=\"" + logoutEventHandler + "\">Logout</a></p>\n                            </div>\n                        </div>\n                    </div>\n                </li>\n            </ul>\n        </li>\n    ");
};
exports.logoutNavView = logoutNavView;

},{}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Login = void 0;
var login_views_1 = require("./login-views");
var Login = /** @class */ (function () {
    function Login(props) {
        this.props = props;
    }
    Login.prototype.render = function () {
        var isLoggined = this.props.logginUser && ('name' in this.props.logginUser);
        return ("\n            <div>\n                " + (!isLoggined ? login_views_1.loginModalView(this.props) : '') + "\n            <div/>\n            ");
    };
    return Login;
}());
exports.Login = Login;

},{"./login-views":11}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavbarHandler = exports.Navbar = void 0;
var navbar_1 = require("./navbar");
Object.defineProperty(exports, "Navbar", { enumerable: true, get: function () { return navbar_1.Navbar; } });
var navbar_handlers_1 = require("./navbar-handlers");
Object.defineProperty(exports, "NavbarHandler", { enumerable: true, get: function () { return navbar_handlers_1.NavbarHandler; } });

},{"./navbar":16,"./navbar-handlers":14}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavbarHandler = void 0;
var NavbarHandler = function (api) {
    var moduleName = 'Navbar';
    var store;
    var setStore = function (_store) { store = _store; };
    return {
        moduleName: moduleName,
        setStore: setStore
    };
};
exports.NavbarHandler = NavbarHandler;

},{}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutNavView = exports.loginNavView = exports.selectorNavView = exports.writerNavView = exports.feederNavView = void 0;
var feederNavView = function () {
    var eventHandler = "feedpage.navToPage('FEEDS')";
    return ("\n        <li \n            id=\"feed\"\n            onclick=\"" + eventHandler + "\" \n            onmouseenter=\"this.classList.add('active')\" \n            onmouseout=\"this.classList.remove('active')\"\n        >\n            <a href=\"#\">\n                <i class=\"fas fa-rss-square\">&nbsp;&nbsp;</i>\n                feed\n            </a>\n        </li>\n    ");
};
exports.feederNavView = feederNavView;
var writerNavView = function () {
    var eventHandler = "feedpage.navToPage('POST')";
    return ("\n        <li \n            id=\"postNav\"\n            onclick=\"" + eventHandler + "\" \n            onmouseenter=\"this.classList.add('active')\" \n            onmouseout=\"this.classList.remove('active')\"\n        >\n            <a href=\"#\">\n                <i class=\"fas fa-pencil-alt\">&nbsp;&nbsp;</i>\n                post\n            </a>\n        </li>\n    ");
};
exports.writerNavView = writerNavView;
var selectorNavView = function () {
    var eventHandler = "feedpage.navToPage('FRIEND')";
    return ("\n        <li \n            id=\"friendNav\"\n            onclick=\"" + eventHandler + "\" \n            onmouseenter=\"this.classList.add('active')\" \n            onmouseout=\"this.classList.remove('active')\"\n        >\n            <a href=\"#\">\n                <i class=\"fas fa-users\">&nbsp;&nbsp;</i>\n                friends\n            </a>\n        </li>\n    ");
};
exports.selectorNavView = selectorNavView;
var loginNavView = function () {
    var eventHandler = 'login.showLoginModal()';
    return ("\n        <li \n            id=\"loginNav\"\n            onclick=\"" + eventHandler + "\" \n            onmouseenter=\"this.classList.add('active')\" \n            onmouseout=\"this.classList.remove('active')\"\n        >\n            <a href=\"#\">\n                <i class=\"fas fa-user-slash\">&nbsp;&nbsp;</i>\n                login\n            </a>\n        </li>\n    ");
};
exports.loginNavView = loginNavView;
var logoutNavView = function (props) {
    var logoutEventHandler = "login.processLogout()";
    return ("\n        <li \n            id=\"logoutNav\"\n            class=\"dropdown\" \n            onmouseenter=\"this.classList.add('active')\" \n            onmouseout=\"this.classList.remove('active')\"\n        >\n            <a class=\"dropdown-toggle\" href=\"#\" data-toggle=\"dropdown\">\n                <i class=\"fas fa-user\">&nbsp;&nbsp;</i>\n                logout (" + props.name + ")\n            </a>\n\n            <ul class=\"dropdown-menu\">\n                <li>\n                    <div class=\"navbar-login\">\n                        <div class=\"row\">\n                            <div class=\"col-lg-4\">\n                                <p class=\"text-center\">\n                                    <img class=\"icon-size\" width=\"80\" height=\"80\" alt=\"120x120\" src=\"https://bootdey.com/img/Content/avatar/" + props.img + ".png\"/>\n                                </p>\n                            </div>\n                            <div class=\"col-lg-8\">\n                                <p class=\"text-left\"><strong>" + props.name + "</strong></p>\n                                <p class=\"text-left small\">" + props.name.toLowerCase() + "@gmail.com</p>\n                            </div>\n                        </div>\n                    </div>\n                </li>\n                <li class=\"divider\"></li>\n                <li>\n                    <div class=\"navbar-login navbar-login-session\">\n                        <div class=\"row\">\n                            <div class=\"col-lg-12\">\n                                <p>\n                                    <a \n                                        id=\"logout\"\n                                        class=\"btn btn-danger btn-block\" \n                                        href=\"#\" \n                                        onclick=\"" + logoutEventHandler + "\">\n                                    Logout</a>\n                                </p>\n                            </div>\n                        </div>\n                    </div>\n                </li>\n            </ul>\n        </li>\n    ");
};
exports.logoutNavView = logoutNavView;
// "dev": "nodemon -e ts -x 'yarn stop && sleep 3 && npx gulp --gulpfile ./gulpfile.configs.js && SERVER_PORT=3333 ts-node ./bin/www.ts | bunyan -o short'",

},{}],16:[function(require,module,exports){
"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Navbar = void 0;
var navbar_views_1 = require("./navbar-views");
var Navbar = /** @class */ (function () {
    function Navbar(props) {
        this.props = props;
    }
    Navbar.prototype.render = function () {
        var isLoggined = this.props.logginUser && ('name' in this.props.logginUser);
        return ("\n                <div class=\"navbar navbar-default navbar-static-top\">\n                    <div class=\"container bootstrap snippets bootdey\">\n                        <div class=\"navbar-header\">\n                            <button class=\"navbar-toggle\" type=\"button\" data-toggle=\"collapse\" data-target=\".navbar-collapse\">\n                                " + __spreadArray([], __read(Array(3).keys())).map(function (_) { return '<span class="icon-bar"></span>'; }).join('') + "\n                            </button>\n                            <a class=\"navbar-brand\" href=\"#\"><strong>Feed</strong></a>\n                        </div>\n                        <div class=\"collapse navbar-collapse\">\n                            <ul class=\"nav navbar-nav navbar-right\">\n                            " + (isLoggined ? [navbar_views_1.feederNavView(), navbar_views_1.writerNavView(), navbar_views_1.selectorNavView(),].join('') : '') + "\n                            " + (!isLoggined ? navbar_views_1.loginNavView() : navbar_views_1.logoutNavView(this.props.logginUser)) + "\n                            </ul>\n                        </div>\n                    </div>\n                </div>\n            ");
    };
    return Navbar;
}());
exports.Navbar = Navbar;

},{"./navbar-views":15}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectorHandler = exports.Selector = void 0;
var selector_1 = require("./selector");
Object.defineProperty(exports, "Selector", { enumerable: true, get: function () { return selector_1.Selector; } });
var selector_handlers_1 = require("./selector-handlers");
Object.defineProperty(exports, "SelectorHandler", { enumerable: true, get: function () { return selector_handlers_1.SelectorHandler; } });

},{"./selector":20,"./selector-handlers":18}],18:[function(require,module,exports){
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectorHandler = void 0;
var typings_1 = require("../../typings");
var user_query_type_1 = require("../../typings/vo/user-query-type");
var selector_views_1 = require("./selector-views");
var SelectorHandler = function (api) {
    var moduleName = 'Selector';
    var store;
    var followUser = function (uuid) { return __awaiter(void 0, void 0, void 0, function () {
        var FOLLOW_FRIEND, result, loginUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    closeSelectorModal();
                    FOLLOW_FRIEND = typings_1.IUserCommandType.FOLLOW_FRIEND;
                    return [4 /*yield*/, api.putUser(FOLLOW_FRIEND, uuid)];
                case 1:
                    result = _a.sent();
                    if (!result) return [3 /*break*/, 3];
                    return [4 /*yield*/, api.getUser(user_query_type_1.IUserQueryType.LOGIN_USER_PROFILE)];
                case 2:
                    loginUser = _a.sent();
                    store.state = __assign(__assign({}, store.state), { logginUser: loginUser });
                    return [3 /*break*/, 4];
                case 3: return [2 /*return*/];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var unfollowUser = function (uuid) { return __awaiter(void 0, void 0, void 0, function () {
        var UNFOLLOW_FRIEND, result, loginUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    closeSelectorModal();
                    UNFOLLOW_FRIEND = typings_1.IUserCommandType.UNFOLLOW_FRIEND;
                    return [4 /*yield*/, api.putUser(UNFOLLOW_FRIEND, uuid)];
                case 1:
                    result = _a.sent();
                    if (!result) return [3 /*break*/, 3];
                    return [4 /*yield*/, api.getUser(user_query_type_1.IUserQueryType.LOGIN_USER_PROFILE)
                        // store.notify()
                    ];
                case 2:
                    loginUser = _a.sent();
                    // store.notify()
                    store.state = __assign(__assign({}, store.state), { logginUser: loginUser });
                    return [3 /*break*/, 4];
                case 3: return [2 /*return*/];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var showUserProfile = function (props) { return __awaiter(void 0, void 0, void 0, function () {
        var logginUser, wrapper, modalButton;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, window['feedpage'].navToPage('FRIEND', { selectedUserUid: props.uuid })];
                case 1:
                    _a.sent();
                    logginUser = store.state.logginUser;
                    wrapper = document.querySelector('Profile');
                    wrapper.insertAdjacentHTML('afterbegin', selector_views_1.userProfileModalView(logginUser, props));
                    modalButton = document.querySelector('button[data-toggle="modal"]');
                    modalButton.click();
                    return [2 /*return*/];
            }
        });
    }); };
    var setStore = function (_store) { store = _store; return null; };
    var closeSelectorModal = function () { return document.querySelector('button[data-dismiss="modal"]').click(); };
    return {
        // toggle,
        setStore: setStore,
        moduleName: moduleName,
        showUserProfile: showUserProfile,
        followUser: followUser,
        unfollowUser: unfollowUser,
    };
};
exports.SelectorHandler = SelectorHandler;

},{"../../typings":31,"../../typings/vo/user-query-type":34,"./selector-views":19}],19:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userProfileModalView = exports.thumbnailView = exports.selectorPanelView = void 0;
var selectorPanelView = function (props) {
    var logginUser = props.logginUser, users = props.users;
    return ("<div id=\"selector-panel\" class=\"panel\">\n            <div class=\"panel-body\">\n                <div class=\"row\">\n                    <div class=\"col-xs-12\">\n                        <div>\n                            <ul class=\"ace-thumbnails clearfix\">\n                            " + users
        .filter(function (user) { return (user.uuid !== logginUser.uuid); })
        .map(function (user) { return (exports.thumbnailView(logginUser, user)); }).join('') + "\n                            </ul>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>");
};
exports.selectorPanelView = selectorPanelView;
var thumbnailView = function (logginUser, user) {
    var showProfileEventHandler = "selector.showUserProfile({ uuid: '" + user.uuid + "', name: '" + user.name + "', img: '" + user.img + "'})";
    var isFollowed = logginUser.leaders.includes(user.uuid);
    return ("\n        <li \n            onclick=\"" + showProfileEventHandler + "\" \n            data-toggle=\"tooltip\" title=\"\" href=\"\" data-original-title=\"" + user.name + "\" \n            id=\"" + user.uuid + "\" class=\"" + (isFollowed ? 'followed' : '') + "\">\n            <a class=\"cboxElement\" href=\"#\" data-rel=\"colorbox\">\n                <img width=\"80\" height=\"80\" alt=\"80x80\" src=\"img/" + user.img + ".png\"/>\n                <div class=\"text\">\n                    <div class=\"inner\"></div>\n                </div>\n                <div class=\"tags\">\n                    <span class=\"label-holder\">\n                        " + (isFollowed ? '<span class="label label-primary">follow</span>' : '') + "\n                    </span>\n                </div>\n            </a>\n        </li>\n    ");
};
exports.thumbnailView = thumbnailView;
var userProfileModalView = function (logginUser, user) {
    var uuid = user.uuid, img = user.img, name = user.name;
    var isFollowed = logginUser.leaders.includes(user.uuid);
    var clickEventHandler = "console.log('" + uuid + "');selector." + (isFollowed ? 'un' : '') + "followUser('" + uuid + "')";
    var onMouseEnterHandler = "" + (!isFollowed ? "this.classList.remove('btn-light');this.classList.add('btn-primary')" : "");
    var onMouseLeaveHandler = "" + (!isFollowed ? "this.classList.remove('btn-primary');this.classList.add('btn-light')" : "this.classList.remove('btn-light');this.classList.add('btn-primary')");
    return ("\n        <button type=\"button\" class=\"btn btn-primary hidden\" data-toggle=\"modal\" data-target=\"#profileModal\">\n            open modal\n        </button>\n        <div class=\"modal fade\" id=\"profileModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLabel\" aria-hidden=\"true\">\n            <div class=\"modal-dialog\" role=\"document\">\n                <div class=\"modal-content\">\n                    <div class=\"modal-header\">\n                        <h5 class=\"modal-title\" id=\"exampleModalLabel\"></h5>\n                        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n                        <span aria-hidden=\"true\">&times;</span>\n                        </button>\n                    </div>\n                    <div class=\"modal-body\">\n                        <div class=\"row\">\n                            <div class=\"profile-page\">\n                                <div class=\"card profile-header\">\n                                    <div class=\"col-lg-4 col-md-4 col-6\">\n                                        <div class=\"profile-image float-md-right\">\n                                            <img src=\"img/" + img + ".png\" alt>\n                                        </div>\n                                    </div>\n                                    <div class=\"col-lg-8 col-md-8 col-6\">\n                                        <h4 class=\"m-t-0 m-b-0\"><strong>" + name + "</strong></h4>\n                                        <span class=\"job_post\">Ui UX Designer</span>\n                                        <p>795 Folsom Ave, Suite 600 San Francisco, CADGE 94107</p>\n                                    <div>\n                                        <button \n                                            onmouseenter=\"" + onMouseEnterHandler + ";" + (isFollowed ? "(this.innerText = 'Unfollow')" : '') + "\" \n                                            onmouseleave=\"" + onMouseLeaveHandler + ";" + (isFollowed ? "(this.innerText = 'Follow')" : '') + "\" \n                                            class=\"btn " + (isFollowed ? 'btn-primary' : 'btn-light') + " 'btn-round'\" id=\"follow\" \n                                            onclick=" + clickEventHandler + ">\n                                        Follow\n                                        </button>\n                                        <button \n                                            onmouseenter=\"this.classList.remove('btn-light');this.classList.add('btn-primary')\" \n                                            onmouseleave=\"this.classList.remove('btn-primary');this.classList.add('btn-light')\" \n                                            class=\"btn btn-light btn-round\">\n                                        Message\n                                        </button>\n                                    </div>\n                                    <p class=\"social-icon m-t-5 m-b-0\">\n                                        <a title=\"Twitter\" href=\"javascript:void(0);\"><i class=\"fab fa-twitter\"></i></a>\n                                        <a title=\"Facebook\" href=\"javascript:void(0);\"><i class=\"fab fa-facebook\"></i></a>\n                                        <a title=\"Google-plus\" href=\"javascript:void(0);\"><i class=\"fab fa-google-plus\"></i></a>\n                                        <a title=\"Behance\" href=\"javascript:void(0);\"><i class=\"fab fa-behance\"></i></a>\n                                        <a title=\"Instagram\" href=\"javascript:void(0);\"><i class=\"fab fa-instagram\"></i></a>\n                                    </p>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"modal-footer\">\n                        <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\n                    </div>\n                </div>\n            </div>\n        </div>\n    ");
};
exports.userProfileModalView = userProfileModalView;

},{}],20:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Selector = void 0;
var selector_views_1 = require("./selector-views");
var Selector = /** @class */ (function () {
    function Selector(props) {
        this.props = props;
    }
    Selector.prototype.render = function () {
        var isUserListLoaded = (this.props.users !== undefined);
        var isLoggined = (this.props.logginUser !== undefined);
        if (isUserListLoaded && isLoggined) {
            return ("\n                " + selector_views_1.selectorPanelView(this.props) + "\n                <Profile></Profile>\n            ");
        }
        else {
            return ('');
        }
    };
    return Selector;
}());
exports.Selector = Selector;

},{"./selector-views":19}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WriterHandler = exports.Writer = void 0;
var writer_1 = require("./writer");
Object.defineProperty(exports, "Writer", { enumerable: true, get: function () { return writer_1.Writer; } });
var writer_handlers_1 = require("./writer.handlers");
Object.defineProperty(exports, "WriterHandler", { enumerable: true, get: function () { return writer_handlers_1.WriterHandler; } });

},{"./writer":23,"./writer.handlers":22}],22:[function(require,module,exports){
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WriterHandler = void 0;
var WriterHandler = function (api) {
    var moduleName = 'Writer';
    var store;
    var setStore = function (_store) { store = _store; return null; };
    var postFeed = function (form) { return __awaiter(void 0, void 0, void 0, function () {
        var msg, feeds, newState;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    msg = form.elements['msg'].value;
                    return [4 /*yield*/, api.postFeed(msg)];
                case 1:
                    feeds = _a.sent();
                    newState = __assign(__assign({}, store.state), { comments: __spreadArray([], __read(feeds)) });
                    store.state = __assign(__assign({}, store.state), newState);
                    return [2 /*return*/];
            }
        });
    }); };
    return {
        postFeed: postFeed,
        setStore: setStore,
        moduleName: moduleName,
    };
};
exports.WriterHandler = WriterHandler;

},{}],23:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Writer = void 0;
var writer_views_1 = require("./writer.views");
var Writer = /** @class */ (function () {
    function Writer(props) {
        this.props = props;
    }
    Writer.prototype.render = function () {
        return ("\n            " + writer_views_1.writerPanelView(this.props) + "\n        ");
    };
    return Writer;
}());
exports.Writer = Writer;

},{"./writer.views":24}],24:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writerPanelView = void 0;
var writerPanelView = function (props) {
    var _a = props.logginUser, img = _a.img, name = _a.name, device = _a.device, deviceIcon = _a.deviceIcon, leaders = _a.leaders;
    var users = props.users;
    var friends = users.filter(function (u) { return leaders.includes(u.uuid); });
    var postFeed = "writer.postFeed(document.forms['feedform'])";
    return ("\n        <div class=\"panel\">\n            <div class=\"panel-body\">\n                <a class=\"media-left\" href=\"#\">\n                    <img class=\"img-circle img-md\" alt=\"Profile Picture\" src=\"img/" + img + ".png\"/>\n                </a>\n                <div class=\"media-body\">\n                    <div class=\"mar-btm\"><a class=\"btn-link text-semibold media-heading box-inline\" href=\"#\">" + name + "</a>\n                        <p class=\"text-muted text-sm\"><i class=\"fa " + deviceIcon + " fa-lg\"></i> - From " + device + "</p>\n                    </div>\n                </div>\n                <div class=\"media-body\">\n                    <div class=\"col-lg-12\">\n                        <span class=\"image-list m-t-20\">\n                            " + friends.map(function (f) { return "\n                                <a href=\"javascript:void(0)\">\n                                    <img \n                                        class=\"img-thumbnail img-circle img-xs\" \n                                        src=\"img/" + f.img + ".png\" \n                                        alt=\"user\" \n                                        width=\"50\" \n                                    />\n                                </a>\n                            "; }).join('') + "\n                        </span>\n                    </div>\n                </div>\n                <hr/>\n                <form name=\"feedform\">\n                    <textarea class=\"form-control\" name=\"msg\" id=\"msg\" rows=\"2\" placeholder=\"What are you thinking?\"></textarea>\n                    <input type=\"hidden\" name=\"access_token\" id=\"access_token\" value=\"#access_token\"/>\n                    <div class=\"mar-top clearfix\">\n                        <button onclick=\"" + postFeed + "\" class=\"btn btn-sm btn-primary pull-right\" type=\"button\">\n                            <i class=\"fas fa-pencil-alt fa-fw\"></i> \n                            Publish\n                        </button>\n                        <a class=\"btn btn-trans btn-icon fas fa-video add-tooltip\" href=\"#\"></a>\n                        <a class=\"btn btn-trans btn-icon fas fa-camera add-tooltip\" href=\"#\"></a>\n                        <a class=\"btn btn-trans btn-icon fas fa-file add-tooltip\" href=\"#\"></a>\n                    </div>\n                </form>\n            </div>\n        </div>\n        ");
};
exports.writerPanelView = writerPanelView;

},{}],25:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./typings/global");
var app_1 = require("./app");
var api_1 = require("./api");
var fetch_config_1 = require("./api/fetch.config");
var store_1 = require("./store");
var components_1 = require("./components");
var components_2 = require("./components");
var components_3 = require("./components");
var components_4 = require("./components");
var components_5 = require("./components");
var page_1 = require("./page");
var components_6 = require("./components");
var components_7 = require("./components");
var components_8 = require("./components");
var components_9 = require("./components");
var page_2 = require("./page");
void (function () { return __awaiter(void 0, void 0, void 0, function () {
    var baseUrl, api;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch('/baseurl')];
            case 1: return [4 /*yield*/, (_a.sent()).json()];
            case 2:
                baseUrl = (_a.sent()).baseUrl;
                api = api_1.CreateApi(fetch_config_1.fetchConfig, baseUrl);
                void app_1.app
                    .injectApi(api)
                    .injectStore(store_1.store, store_1.props)
                    .injectModules([
                    components_1.Navbar,
                    components_5.Login,
                    components_3.Feeder,
                    components_2.Selector,
                    components_4.Writer,
                ])
                    .injectHandlers([
                    components_9.LoginHandler,
                    components_8.FeederHandler,
                    components_6.SelectorHandler,
                    components_7.WriterHandler,
                ])
                    .injectPageAndLoadHandler([
                    page_1.FeedPage, page_2.FeedPageHandler
                ])
                    .start();
                return [2 /*return*/];
        }
    });
}); })();
// const config = await (await fetch('./config.json')).json()
// const config = {
//     "feed": {
//         "baseUrl": "http://localhost:8000"
//     },
//     "auth": {
//         "baseUrl": "http://localhost:8000"
//     },
//     "GET": {
//         "method": "GET",
//         "credentials": "include",
//         "headers": {
//             "Content-Type": "application/json"
//         }
//     },
//     "POST": {
//         "method": "POST",
//         "credentials": "include",
//         "headers": {
//             "Content-Type": "application/x-www-form-urlencoded"
//         }
//     },
//     "PUT": {
//         "method": "PUT",
//         "mode": "cors",
//         "credentials": "include",
//         "headers": {
//             "Content-Type": "application/json"
//         }
//     }
// }
// const api = CreateApi(config)

},{"./api":3,"./api/fetch.config":2,"./app":4,"./components":8,"./page":26,"./store":29,"./typings/global":30}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedPageHandler = exports.FeedPage = void 0;
var page_1 = require("./page");
Object.defineProperty(exports, "FeedPage", { enumerable: true, get: function () { return page_1.FeedPage; } });
var page_handlers_1 = require("./page-handlers");
Object.defineProperty(exports, "FeedPageHandler", { enumerable: true, get: function () { return page_handlers_1.FeedPageHandler; } });

},{"./page":28,"./page-handlers":27}],27:[function(require,module,exports){
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedPageHandler = void 0;
var typings_1 = require("../typings");
var user_query_type_1 = require("../typings/vo/user-query-type");
var FeedPageHandler = function (api) {
    var moduleName = 'feedpage';
    var app;
    var store;
    var setStore = function (_store) {
        store = _store;
    };
    var setApp = function (_app) {
        app = _app;
    };
    var navToPage = function (page, model) { return __awaiter(void 0, void 0, void 0, function () {
        var LOGIN_USER_RECENT_POSTS, LOGIN_USER_UNREAD_FEEDS, SELECT_USER_RECENT_POSTS, selected, feeds, users, logginUser, selectedUserUid, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    LOGIN_USER_RECENT_POSTS = typings_1.IFeedQueryType.LOGIN_USER_RECENT_POSTS, LOGIN_USER_UNREAD_FEEDS = typings_1.IFeedQueryType.LOGIN_USER_UNREAD_FEEDS, SELECT_USER_RECENT_POSTS = typings_1.IFeedQueryType.SELECT_USER_RECENT_POSTS;
                    _a = page;
                    switch (_a) {
                        case 'HOME': return [3 /*break*/, 1];
                        case 'FEEDS': return [3 /*break*/, 6];
                        case 'POST': return [3 /*break*/, 8];
                        case 'FRIEND': return [3 /*break*/, 10];
                        case 'LOGOUT': return [3 /*break*/, 12];
                    }
                    return [3 /*break*/, 13];
                case 1:
                    selected = ['login'];
                    return [4 /*yield*/, api.getUsers()];
                case 2:
                    users = _b.sent();
                    return [4 /*yield*/, api.login()];
                case 3:
                    if (!_b.sent()) return [3 /*break*/, 5];
                    return [4 /*yield*/, api.getUser(user_query_type_1.IUserQueryType.LOGIN_USER_PROFILE)];
                case 4:
                    logginUser = _b.sent();
                    _b.label = 5;
                case 5:
                    store.state = __assign(__assign({}, store.state), {
                        users: users,
                        logginUser: logginUser
                    });
                    return [3 /*break*/, 14];
                case 6:
                    selected = ['login', 'feeder'];
                    return [4 /*yield*/, api.getFeeds(LOGIN_USER_UNREAD_FEEDS)];
                case 7:
                    feeds = _b.sent();
                    store.state = __assign(__assign({}, store.state), {
                        feeds: feeds
                    });
                    return [3 /*break*/, 14];
                case 8:
                    selected = ['login', 'writer', 'feeder'];
                    return [4 /*yield*/, api.getFeeds(LOGIN_USER_RECENT_POSTS)];
                case 9:
                    feeds = _b.sent();
                    store.state = __assign(__assign({}, store.state), {
                        feeds: feeds
                    });
                    return [3 /*break*/, 14];
                case 10:
                    selected = ['login', 'selector', 'feeder'];
                    selectedUserUid = (model ? model.selectedUserUid : store.state.users[1].uuid);
                    return [4 /*yield*/, api.getFeeds(SELECT_USER_RECENT_POSTS, selectedUserUid)];
                case 11:
                    feeds = _b.sent();
                    store.state = __assign(__assign({}, store.state), {
                        feeds: feeds
                    });
                    return [3 /*break*/, 14];
                case 12:
                    selected = ['login'];
                    store.state = __assign(__assign({}, store.state), {
                        logginUser: undefined
                    });
                    return [3 /*break*/, 14];
                case 13:
                    selected = ['login'];
                    return [3 /*break*/, 14];
                case 14:
                    app.selectModules(selected);
                    app.render();
                    return [2 /*return*/];
            }
        });
    }); };
    return {
        moduleName: moduleName,
        navToPage: navToPage,
        setApp: setApp,
        setStore: setStore
    };
};
exports.FeedPageHandler = FeedPageHandler;

},{"../typings":31,"../typings/vo/user-query-type":34}],28:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedPage = void 0;
var FeedPage = /** @class */ (function () {
    function FeedPage(props) {
        this.components = new Map([
            ['login', '<Login></Login>'],
            ['selector', '<Selector></Selector>'],
            ['writer', '<Writer></Writer>'],
            ['feeder', '<Feeder></Feeder>']
        ]);
        this.props = props;
    }
    FeedPage.prototype.render = function () {
        var _this = this;
        return ("\n            <div>\n                <div>\n                    <Navbar>\n                </div>\n                <div class=\"container bootdey\">\n                    <div class=\"col-md-12 bootstrap snippets\">\n                        " + this.props.map(function (key) { return _this.components.get(key); }).join('\n') + "\n                    </div>\n                </div>\n            </div>\n        ");
    };
    return FeedPage;
}());
exports.FeedPage = FeedPage;

},{}],29:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.props = exports.store = void 0;
exports.store = (function () {
    var listeners = [];
    var notify = function () {
        listeners.forEach(function (l) {
            l.loadModules();
            l.render();
        });
    };
    var state;
    return {
        listeners: listeners,
        notify: notify,
        state: state
    };
})();
exports.props = {
    login: {
        logginUser: undefined,
        users: [],
    },
    navbar: {
        logginUser: undefined,
        users: []
    },
    selector: {
        logginUser: undefined,
        users: []
    },
    feeder: {
        logginUser: undefined,
        users: [],
        feeds: [],
    },
    writer: {
        logginUser: undefined,
        users: []
    }
};

},{}],30:[function(require,module,exports){
"use strict";

},{}],31:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.iUserCommandMap = exports.IUserCommandType = exports.iFeedQueryMap = exports.IUserType = exports.IFeedQueryType = void 0;
var feed_query_type_1 = require("./vo/feed-query-type");
Object.defineProperty(exports, "IFeedQueryType", { enumerable: true, get: function () { return feed_query_type_1.IFeedQueryType; } });
var feed_query_type_2 = require("./vo/feed-query-type");
Object.defineProperty(exports, "IUserType", { enumerable: true, get: function () { return feed_query_type_2.IUserType; } });
var feed_query_type_3 = require("./vo/feed-query-type");
Object.defineProperty(exports, "iFeedQueryMap", { enumerable: true, get: function () { return feed_query_type_3.iFeedQueryMap; } });
var user_command_type_1 = require("./vo/user-command-type");
Object.defineProperty(exports, "IUserCommandType", { enumerable: true, get: function () { return user_command_type_1.IUserCommandType; } });
var user_command_type_2 = require("./vo/user-command-type");
Object.defineProperty(exports, "iUserCommandMap", { enumerable: true, get: function () { return user_command_type_2.iUserCommandMap; } });

},{"./vo/feed-query-type":32,"./vo/user-command-type":33}],32:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.iFeedQueryMap = exports.IFeedQueryType = exports.IUserType = void 0;
var IUserType;
(function (IUserType) {
    IUserType["LOGIN_USER"] = "login_user";
    IUserType["SELECT_USER"] = "select_user";
})(IUserType = exports.IUserType || (exports.IUserType = {}));
var IFeedQueryType;
(function (IFeedQueryType) {
    IFeedQueryType["UNREAD"] = "unread";
    IFeedQueryType["RECENT"] = "recent";
})(IFeedQueryType = exports.IFeedQueryType || (exports.IFeedQueryType = {}));
(function (IFeedQueryType) {
    IFeedQueryType["LOGIN_USER_UNREAD_FEEDS"] = "login_user_unread_feeds";
    IFeedQueryType["LOGIN_USER_RECENT_POSTS"] = "login_user_recent_posts";
    IFeedQueryType["SELECT_USER_RECENT_POSTS"] = "select_user_recent_posts";
})(IFeedQueryType = exports.IFeedQueryType || (exports.IFeedQueryType = {}));
exports.iFeedQueryMap = new Map([
    [
        IFeedQueryType.LOGIN_USER_UNREAD_FEEDS,
        {
            target: IUserType.LOGIN_USER,
            query: IFeedQueryType.UNREAD
        }
    ],
    [
        IFeedQueryType.LOGIN_USER_RECENT_POSTS,
        {
            target: IUserType.LOGIN_USER,
            query: IFeedQueryType.RECENT
        }
    ],
    [
        IFeedQueryType.SELECT_USER_RECENT_POSTS,
        {
            target: IUserType.SELECT_USER,
            query: IFeedQueryType.RECENT
        }
    ],
]);

},{}],33:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.iUserCommandMap = exports.IUserCommandType = void 0;
var IUserCommandType;
(function (IUserCommandType) {
    IUserCommandType["FOLLOW_FRIEND"] = "follow_friend_feed";
    IUserCommandType["UNFOLLOW_FRIEND"] = "unfollow_friend_feed";
    IUserCommandType["NO_SUCH_COMMAND"] = "no_such_command";
})(IUserCommandType = exports.IUserCommandType || (exports.IUserCommandType = {}));
exports.iUserCommandMap = new Map([
    [
        IUserCommandType.FOLLOW_FRIEND,
        {
            command: 'follow',
            subject: 'feed',
        }
    ],
    [
        IUserCommandType.UNFOLLOW_FRIEND,
        {
            command: 'unfollow',
            subject: 'feed',
        }
    ],
]);

},{}],34:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserQueryType = exports.iUserQueryMap = exports.IUserQueryType = void 0;
var IUserQueryType;
(function (IUserQueryType) {
    IUserQueryType["LOGIN_USER_PROFILE"] = "login_user_info";
    IUserQueryType["SELECT_USER_PROFILE"] = "select_user_info";
})(IUserQueryType = exports.IUserQueryType || (exports.IUserQueryType = {}));
exports.iUserQueryMap = new Map([
    [
        IUserQueryType.LOGIN_USER_PROFILE,
        {
            query: 'profile',
            target: 'login_user'
        }
    ],
    [
        IUserQueryType.SELECT_USER_PROFILE,
        {
            query: 'profile',
            target: 'select_user'
        }
    ]
]);
var createUserQueryType = function (userInput) {
    var LOGIN_USER_PROFILE = IUserQueryType.LOGIN_USER_PROFILE, SELECT_USER_PROFILE = IUserQueryType.SELECT_USER_PROFILE;
    var target = userInput.target, query = userInput.query;
    if (target === 'login_user') {
        switch (query) {
            case 'profile':
                return LOGIN_USER_PROFILE;
        }
    }
    if (target === 'select_user') {
        switch (query) {
            case 'profile':
                return SELECT_USER_PROFILE;
        }
    }
    throw Error('no such user query');
};
exports.createUserQueryType = createUserQueryType;

},{}]},{},[25])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvdHMvYXBpL2FwaXMudHMiLCJzcmMvdHMvYXBpL2ZldGNoLmNvbmZpZy50cyIsInNyYy90cy9hcGkvaW5kZXgudHMiLCJzcmMvdHMvYXBwL2luZGV4LnRzIiwic3JjL3RzL2NvbXBvbmVudHMvZmVlZGVyL2ZlZWRlci1oYW5kbGVycy50cyIsInNyYy90cy9jb21wb25lbnRzL2ZlZWRlci9mZWVkZXIudHMiLCJzcmMvdHMvY29tcG9uZW50cy9mZWVkZXIvaW5kZXgudHMiLCJzcmMvdHMvY29tcG9uZW50cy9pbmRleC50cyIsInNyYy90cy9jb21wb25lbnRzL2xvZ2luL2luZGV4LnRzIiwic3JjL3RzL2NvbXBvbmVudHMvbG9naW4vbG9naW4taGFuZGxlcnMudHMiLCJzcmMvdHMvY29tcG9uZW50cy9sb2dpbi9sb2dpbi12aWV3cy50cyIsInNyYy90cy9jb21wb25lbnRzL2xvZ2luL2xvZ2luLnRzIiwic3JjL3RzL2NvbXBvbmVudHMvbmF2YmFyL2luZGV4LnRzIiwic3JjL3RzL2NvbXBvbmVudHMvbmF2YmFyL25hdmJhci1oYW5kbGVycy50cyIsInNyYy90cy9jb21wb25lbnRzL25hdmJhci9uYXZiYXItdmlld3MudHMiLCJzcmMvdHMvY29tcG9uZW50cy9uYXZiYXIvbmF2YmFyLnRzIiwic3JjL3RzL2NvbXBvbmVudHMvc2VsZWN0b3IvaW5kZXgudHMiLCJzcmMvdHMvY29tcG9uZW50cy9zZWxlY3Rvci9zZWxlY3Rvci1oYW5kbGVycy50cyIsInNyYy90cy9jb21wb25lbnRzL3NlbGVjdG9yL3NlbGVjdG9yLXZpZXdzLnRzIiwic3JjL3RzL2NvbXBvbmVudHMvc2VsZWN0b3Ivc2VsZWN0b3IudHMiLCJzcmMvdHMvY29tcG9uZW50cy93cml0ZXIvaW5kZXgudHMiLCJzcmMvdHMvY29tcG9uZW50cy93cml0ZXIvd3JpdGVyLmhhbmRsZXJzLnRzIiwic3JjL3RzL2NvbXBvbmVudHMvd3JpdGVyL3dyaXRlci50cyIsInNyYy90cy9jb21wb25lbnRzL3dyaXRlci93cml0ZXIudmlld3MudHMiLCJzcmMvdHMvaW5kZXgudHMiLCJzcmMvdHMvcGFnZS9pbmRleC50cyIsInNyYy90cy9wYWdlL3BhZ2UtaGFuZGxlcnMudHMiLCJzcmMvdHMvcGFnZS9wYWdlLnRzIiwic3JjL3RzL3N0b3JlL2luZGV4LnRzIiwic3JjL3RzL3R5cGluZ3MvaW5kZXgudHMiLCJzcmMvdHMvdHlwaW5ncy92by9mZWVkLXF1ZXJ5LXR5cGUudHMiLCJzcmMvdHMvdHlwaW5ncy92by91c2VyLWNvbW1hbmQtdHlwZS50cyIsInNyYy90cy90eXBpbmdzL3ZvL3VzZXItcXVlcnktdHlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDR0Esc0NBQTBDO0FBRTFDLHNDQUE0QztBQUU1QyxpRUFBNkU7QUFDN0UsaUNBQXFDO0FBRzlCLElBQU0sUUFBUSxHQUNmLFVBQUMsTUFBb0IsRUFBRSxPQUFnQjtJQUNyQyxPQUFPLFVBQU8sU0FBeUIsRUFBRSxlQUF3Qjs7Ozs7b0JBRXZELE1BQU0seUJBQVEsdUJBQWEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUUsQ0FBQTtvQkFDMUcsR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLENBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUEsQ0FBQyxDQUFDLHVCQUF1QixnQkFBWSxDQUFDLENBQUE7b0JBQzlFLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLE1BQU0s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LFNBQVM7Z0JBQ1YsT0FBTyxrQkFBa0IsQ0FBQTtTQUNoQztLQUNKO0lBQ0QsSUFBSSxNQUFNLEtBQUssYUFBYSxFQUFFO1FBQzFCLFFBQVEsS0FBSyxFQUFFO1lBQ1gsS0FBSyxTQUFTO2dCQUNWLE9BQU8sbUJBQW1CLENBQUE7U0FDakM7S0FDSjtJQUNELE1BQU0sS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUE7QUFDckMsQ0FBQyxDQUFBO0FBakJRLFFBQUEsbUJBQW1CLHVCQWlCM0IiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgeyBJRmVlZCB9IGZyb20gJy4uL3R5cGluZ3MnXG5pbXBvcnQgeyBJVXNlciB9IGZyb20gJy4uL3R5cGluZ3MnXG5pbXBvcnQgeyBJVXNlckNvbW1hbmRUeXBlIH0gZnJvbSAnLi4vdHlwaW5ncydcbmltcG9ydCB7IGlGZWVkUXVlcnlNYXAgfSBmcm9tICcuLi90eXBpbmdzJ1xuaW1wb3J0IHsgSUZlZWRRdWVyeVR5cGUgfSBmcm9tICcuLi90eXBpbmdzJ1xuaW1wb3J0IHsgaVVzZXJDb21tYW5kTWFwIH0gZnJvbSAnLi4vdHlwaW5ncydcbmltcG9ydCB7IElGZXRjaENvbmZpZyB9IGZyb20gJy4uL3R5cGluZ3MnXG5pbXBvcnQgeyBpVXNlclF1ZXJ5TWFwLCBJVXNlclF1ZXJ5VHlwZSB9IGZyb20gJy4uL3R5cGluZ3Mvdm8vdXNlci1xdWVyeS10eXBlJ1xuaW1wb3J0IHsgdXJsRW5jb2RpbmcgfSBmcm9tICcuL2luZGV4J1xuXG5cbmV4cG9ydCBjb25zdCBHZXRGZWVkc1xuICAgID0gKGNvbmZpZzogSUZldGNoQ29uZmlnLCBiYXNlVXJsPzogc3RyaW5nKSA9PiB7XG4gICAgICAgIHJldHVybiBhc3luYyAocXVlcnlUeXBlOiBJRmVlZFF1ZXJ5VHlwZSwgc2VsZWN0ZWRVc2VyVWlkPzogc3RyaW5nKTogUHJvbWlzZTxJRmVlZFtdPiA9PiB7XG4gICAgICAgICAgICAvLyBjb25zdCB7IGZlZWQ6IHsgYmFzZVVybCB9IH0gPSBjb25maWdcbiAgICAgICAgICAgIGNvbnN0IHBhcmFtcyA9IHsgLi4uaUZlZWRRdWVyeU1hcC5nZXQocXVlcnlUeXBlKSwgLi4uKHNlbGVjdGVkVXNlclVpZCA/ICh7IHVzZXJVaWQ6IHNlbGVjdGVkVXNlclVpZCB9KSA6IG51bGwpIH1cbiAgICAgICAgICAgIGNvbnN0IHVybCA9IG5ldyBVUkwoYCR7YmFzZVVybCA/IGJhc2VVcmw6ICdodHRwOi8vbG9jYWxob3N0OjgwMDAnfS9hcGkvZmVlZHNgKVxuICAgICAgICAgICAgT2JqZWN0LmtleXMocGFyYW1zKS5mb3JFYWNoKGtleSA9PiB1cmwuc2VhcmNoUGFyYW1zLmFwcGVuZChrZXksIHBhcmFtc1trZXldKSlcblxuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgJHt1cmwuaHJlZn1gLCB7XG4gICAgICAgICAgICAgICAgLi4uY29uZmlnLkdFVCxcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIGxldCBmZWVkczogSUZlZWRbXVxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmF3RmVlZHM6IHtcbiAgICAgICAgICAgICAgICAgICAgdXVpZDogc3RyaW5nXG4gICAgICAgICAgICAgICAgICAgIG1zZzogc3RyaW5nXG4gICAgICAgICAgICAgICAgICAgIHdyaXRlcjogeyB1dWlkOiBzdHJpbmcgfVxuICAgICAgICAgICAgICAgICAgICBsaWtlcnM6IHN0cmluZ1xuICAgICAgICAgICAgICAgICAgICBkaXNsaWtlcnM6IHN0cmluZ1xuICAgICAgICAgICAgICAgIH1bXSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKVxuICAgICAgICAgICAgICAgIGZlZWRzID0gcmF3RmVlZHMubWFwKHJhdyA9PiAoe1xuICAgICAgICAgICAgICAgICAgICB1dWlkOiByYXcudXVpZCxcbiAgICAgICAgICAgICAgICAgICAgbXNnOiByYXcubXNnLFxuICAgICAgICAgICAgICAgICAgICB3cml0ZXI6IHJhdy53cml0ZXIsXG4gICAgICAgICAgICAgICAgICAgIGxpa2VyczogcmF3Lmxpa2Vycy5zcGxpdCgnLCcpLFxuICAgICAgICAgICAgICAgICAgICBkaXNsaWtlcnM6IHJhdy5kaXNsaWtlcnMuc3BsaXQoJywnKVxuICAgICAgICAgICAgICAgIH0pKVxuICAgICAgICAgICAgICAgIHJldHVybiBmZWVkc1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gW11cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuZXhwb3J0IGNvbnN0IFBvc3RGZWVkXG4gICAgPSAoY29uZmlnOiBJRmV0Y2hDb25maWcsIGJhc2VVcmw/OiBzdHJpbmcpID0+IHtcbiAgICAgICAgcmV0dXJuIGFzeW5jIChtc2c6IHN0cmluZyk6IFByb21pc2U8SUZlZWRbXT4gPT4ge1xuICAgICAgICAgICAgLy8gY29uc3QgeyBmZWVkOiB7IGJhc2VVcmwgfSB9ID0gY29uZmlnXG4gICAgICAgICAgICBjb25zdCBwYXlsb2FkOiB7IG1zZzogc3RyaW5nIH0gPSB7IG1zZyB9XG4gICAgICAgICAgICBjb25zdCBmb3JtQm9keVN0ciA9IHVybEVuY29kaW5nKHBheWxvYWQpXG5cbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYCR7YmFzZVVybCA/IGJhc2VVcmw6ICdodHRwOi8vbG9jYWxob3N0OjgwMDAnfS9hcGkvZmVlZHNgLCB7XG4gICAgICAgICAgICAgICAgLi4uY29uZmlnLlBPU1QsXG4gICAgICAgICAgICAgICAgYm9keTogZm9ybUJvZHlTdHJcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSAyMDApIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpXG4gICAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnNhZmUtcmV0dXJuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGFcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtdXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbmV4cG9ydCBjb25zdCBMb2dpblxuICAgID0gKGNvbmZpZzogSUZldGNoQ29uZmlnLCBiYXNlVXJsPzogc3RyaW5nKSA9PiB7XG4gICAgICAgIHJldHVybiBhc3luYyAodXNlclVpZD86IHN0cmluZywgcGFzcz86IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj4gPT4ge1xuICAgICAgICAgICAgLy8gY29uc3QgeyBhdXRoOiB7IGJhc2VVcmwgfSB9ID0gY29uZmlnXG4gICAgICAgICAgICBjb25zdCBhdXRoSW5mbzogeyB1c2VyVWlkOiBzdHJpbmcsIHBhc3M6IHN0cmluZyB9ID0geyB1c2VyVWlkOiB1c2VyVWlkIGFzIHN0cmluZywgcGFzczogcGFzcyBhcyBzdHJpbmcgfVxuICAgICAgICAgICAgY29uc3QgZm9ybUJvZHlTdHIgPSB1cmxFbmNvZGluZyhhdXRoSW5mbylcblxuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgJHtiYXNlVXJsID8gYmFzZVVybCA6ICdodHRwOi8vbG9jYWxob3N0OjgwMDAnfS9hcGkvYXV0aC9sb2dpbmAsIHtcbiAgICAgICAgICAgICAgICAuLi5jb25maWcuUE9TVCwgYm9keTogZm9ybUJvZHlTdHJcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAvLyBpZiAoIShyZXNwb25zZS5zdGF0dXMgPT09IDQwMSkpIHtcbiAgICAgICAgICAgIC8vICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpXG4gICAgICAgICAgICAvLyAgICAgY29uc3QgeyBsb2dnaW5Vc2VyOiB7IG5hbWUsIHV1aWQsIHVzZXJEZXRhaWw6IHsgZGV2aWNlLCBkZXZpY2VJY29uLCBpbWcgfSwgbGVhZGVycywgZm9sbG93ZXJzLCBmZWVkcyB9IH0gPSBkYXRhXG4gICAgICAgICAgICAvLyAgICAgY29uc3QgdXNlciA9ICh7IG5hbWUsIGRldmljZSwgZGV2aWNlSWNvbiwgdXVpZCwgaW1nLCBsZWFkZXJzLCBmb2xsb3dlcnMsIGZlZWRzIH0pIGFzIElVc2VyXG4gICAgICAgICAgICAvLyAgICAgcmV0dXJuIHVzZXJcbiAgICAgICAgICAgIC8vIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgaWYgKCEocmVzcG9uc2Uuc3RhdHVzID09PSA0MDEpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbmV4cG9ydCBjb25zdCBMb2dvdXRcbiAgICA9IChjb25maWc6IElGZXRjaENvbmZpZywgYmFzZVVybD86IHN0cmluZykgPT4ge1xuICAgICAgICByZXR1cm4gYXN5bmMgKCk6IFByb21pc2U8YW55PiA9PiB7XG4gICAgICAgICAgICAvLyBjb25zdCB7IGF1dGg6IHsgYmFzZVVybCB9IH0gPSBjb25maWdcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYCR7YmFzZVVybCA/IGJhc2VVcmwgOiAnaHR0cDovL2xvY2FsaG9zdDo4MDAwJ30vYXBpL2F1dGgvbG9nb3V0YCwge1xuICAgICAgICAgICAgICAgIC4uLmNvbmZpZy5QT1NUXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKVxuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnNhZmUtcmV0dXJuXG4gICAgICAgICAgICByZXR1cm4gZGF0YVxuICAgICAgICB9XG4gICAgfVxuXG5leHBvcnQgY29uc3QgUHV0VXNlclxuICAgID0gKGNvbmZpZzogSUZldGNoQ29uZmlnLCBiYXNlVXJsPzogc3RyaW5nKSA9PiB7XG4gICAgICAgIHJldHVybiBhc3luYyAoY29tbWFuZFR5cGU6IElVc2VyQ29tbWFuZFR5cGUsIHNlbGVjdGVkVXNlclVpZDogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPiA9PiB7XG4gICAgICAgICAgICAvLyBjb25zdCB7IGF1dGg6IHsgYmFzZVVybCB9IH0gPSBjb25maWdcbiAgICAgICAgICAgIGNvbnN0IHBhcmFtcyA9IGlVc2VyQ29tbWFuZE1hcC5nZXQoY29tbWFuZFR5cGUpIVxuICAgICAgICAgICAgY29uc3QgdXJsID0gbmV3IFVSTChgJHtiYXNlVXJsID8gYmFzZVVybCA6ICdodHRwOi8vbG9jYWxob3N0OjgwMDAnfS9hcGkvdXNlcnMvJHtzZWxlY3RlZFVzZXJVaWR9YClcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKHBhcmFtcykuZm9yRWFjaChrZXkgPT4gdXJsLnNlYXJjaFBhcmFtcy5hcHBlbmQoa2V5LCBwYXJhbXNba2V5XSkpXG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAke3VybC5ocmVmfWAsIHtcbiAgICAgICAgICAgICAgICAuLi5jb25maWcuUFVUXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKVxuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgIH1cblxuXG5leHBvcnQgY29uc3QgR2V0VXNlcnNcbiAgICA9IChjb25maWc6IElGZXRjaENvbmZpZywgYmFzZVVybD86IHN0cmluZykgPT4ge1xuICAgICAgICByZXR1cm4gYXN5bmMgKCk6IFByb21pc2U8SVVzZXJbXT4gPT4ge1xuICAgICAgICAgICAgLy8gY29uc3QgeyBhdXRoOiB7IGJhc2VVcmwgfSB9ID0gY29uZmlnXG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAke2Jhc2VVcmwgPyBiYXNlVXJsOiAnaHR0cDovL2xvY2FsaG9zdDo4MDAwJ30vYXBpL3VzZXJzYCwge1xuICAgICAgICAgICAgICAgIC4uLmNvbmZpZy5HRVRcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpXG4gICAgICAgICAgICBjb25zdCB1c2VycyA9IGRhdGEubWFwKGUgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgbmFtZSwgdXVpZCwgdXNlckRldGFpbDogeyBkZXZpY2UsIGRldmljZUljb24sIGltZyB9IH0gPSBlXG4gICAgICAgICAgICAgICAgcmV0dXJuICh7IG5hbWUsIGRldmljZSwgZGV2aWNlSWNvbiwgdXVpZCwgaW1nIH0pXG4gICAgICAgICAgICB9KSBhcyBJVXNlcltdXG4gICAgICAgICAgICByZXR1cm4gdXNlcnNcbiAgICAgICAgfVxuICAgIH1cblxuZXhwb3J0IGNvbnN0IEdldFVzZXJcbiAgICA9IChjb25maWc6IElGZXRjaENvbmZpZywgYmFzZVVybD86IHN0cmluZykgPT4ge1xuICAgICAgICByZXR1cm4gYXN5bmMgKHF1ZXJ5VHlwZTogSVVzZXJRdWVyeVR5cGUsIHNlbGVjdGVkVXNlclVpZD86IHN0cmluZyk6IFByb21pc2U8SVVzZXI+ID0+IHtcbiAgICAgICAgICAgIC8vIGNvbnN0IHsgYXV0aDogeyBiYXNlVXJsIH0gfSA9IGNvbmZpZ1xuICAgICAgICAgICAgY29uc3QgcGFyYW1zID0geyBcbiAgICAgICAgICAgICAgICAuLi5pVXNlclF1ZXJ5TWFwLmdldChxdWVyeVR5cGUpLCBcbiAgICAgICAgICAgICAgICAuLi4oc2VsZWN0ZWRVc2VyVWlkID8gKHsgdXNlclVpZDogc2VsZWN0ZWRVc2VyVWlkIH0pIDogbnVsbCkgXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCB1cmwgPSBuZXcgVVJMKGAke2Jhc2VVcmwgPyBiYXNlVXJsOiAnaHR0cDovL2xvY2FsaG9zdDo4MDAwJ30vYXBpL3VzZXJzLyR7c2VsZWN0ZWRVc2VyVWlkID8gc2VsZWN0ZWRVc2VyVWlkIDogJ25vbmUnIH1gKVxuICAgICAgICAgICAgT2JqZWN0LmtleXMocGFyYW1zKS5mb3JFYWNoKGtleSA9PiB1cmwuc2VhcmNoUGFyYW1zLmFwcGVuZChrZXksIHBhcmFtc1trZXldKSlcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHVybC5ocmVmKVxuXG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAke3VybC5ocmVmfWAsIHtcbiAgICAgICAgICAgICAgICAuLi5jb25maWcuR0VULFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKVxuICAgICAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKVxuICAgICAgICAgICAgY29uc3QgeyBuYW1lLCB1dWlkLCB1c2VyRGV0YWlsOiB7IGRldmljZSwgZGV2aWNlSWNvbiwgaW1nIH0gfSA9IGRhdGFcbiAgICAgICAgICAgIGNvbnN0IHsgbGVhZGVycywgZm9sbG93ZXJzLCBmZWVkcyB9ID0gZGF0YVxuICAgICAgICAgICAgcmV0dXJuICh7XG4gICAgICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgICAgICBkZXZpY2UsXG4gICAgICAgICAgICAgICAgZGV2aWNlSWNvbixcbiAgICAgICAgICAgICAgICB1dWlkLFxuICAgICAgICAgICAgICAgIGltZyxcbiAgICAgICAgICAgICAgICBsZWFkZXJzLFxuICAgICAgICAgICAgICAgIGZvbGxvd2VycyxcbiAgICAgICAgICAgICAgICBmZWVkcyxcbiAgICAgICAgICAgIH0pIGFzIElVc2VyXG4gICAgICAgIH1cbiAgICB9XG5cblxuLy8gZXhwb3J0IGNvbnN0IEdldFNlbGVjdFVzZXJQcm9maWxlXG4vLyAgICAgPSAoY29uZmlnOiBJRmV0Y2hDb25maWcpID0+IHtcbi8vICAgICAgICAgcmV0dXJuIGFzeW5jICh1c2VyVWlkOiBzdHJpbmcpOiBQcm9taXNlPElVc2VyPiA9PiB7XG4vLyAgICAgICAgICAgICBjb25zdCB7IGF1dGg6IHsgYmFzZVVybCB9IH0gPSBjb25maWdcbi8vICAgICAgICAgICAgIGNvbnN0IHVzZXJRdWVyeSA9IHtcbi8vICAgICAgICAgICAgICAgICBxdWVyeTogJ3Byb2ZpbGUnLFxuLy8gICAgICAgICAgICAgICAgIHRhcmdldDogJ3NlbGVjdF91c2VyJyxcbi8vICAgICAgICAgICAgICAgICB1c2VyVWlkOiB1c2VyVWlkXG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAke2Jhc2VVcmx9L2FwaS91c2Vyc2AsIHtcbi8vICAgICAgICAgICAgICAgICAuLi5jb25maWcuR0VULFxuLy8gICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHVzZXJRdWVyeSlcbi8vICAgICAgICAgICAgIH0pXG4vLyAgICAgICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpXG4vLyAgICAgICAgICAgICBjb25zdCB7IG5hbWUsIHV1aWQsIHVzZXJEZXRhaWw6IHsgZGV2aWNlLCBkZXZpY2VJY29uLCBpbWcgfSB9ID0gZGF0YVxuLy8gICAgICAgICAgICAgcmV0dXJuICh7XG4vLyAgICAgICAgICAgICAgICAgbmFtZSxcbi8vICAgICAgICAgICAgICAgICBkZXZpY2UsXG4vLyAgICAgICAgICAgICAgICAgZGV2aWNlSWNvbixcbi8vICAgICAgICAgICAgICAgICB1dWlkLFxuLy8gICAgICAgICAgICAgICAgIGltZyxcbi8vICAgICAgICAgICAgIH0pIGFzIElVc2VyXG4vLyAgICAgICAgIH1cbi8vICAgICB9XG4iLCJpbXBvcnQgeyBJRmV0Y2hDb25maWcgfSBmcm9tICcuLi90eXBpbmdzJztcblxuZXhwb3J0IGNvbnN0IGZldGNoQ29uZmlnOiBJRmV0Y2hDb25maWcgPSB7XG4gICAgXCJHRVRcIjoge1xuICAgICAgICBcIm1ldGhvZFwiOiBcIkdFVFwiLFxuICAgICAgICBcImNyZWRlbnRpYWxzXCI6IFwiaW5jbHVkZVwiLFxuICAgICAgICBcImhlYWRlcnNcIjoge1xuICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICAgICAgfVxuICAgIH0sXG4gICAgXCJQT1NUXCI6IHtcbiAgICAgICAgXCJtZXRob2RcIjogXCJQT1NUXCIsXG4gICAgICAgIFwiY3JlZGVudGlhbHNcIjogXCJpbmNsdWRlXCIsXG4gICAgICAgIFwiaGVhZGVyc1wiOiB7XG4gICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFwiXG4gICAgICAgIH1cbiAgICB9LFxuICAgIFwiUFVUXCI6IHtcbiAgICAgICAgXCJtZXRob2RcIjogXCJQVVRcIixcbiAgICAgICAgXCJtb2RlXCI6IFwiY29yc1wiLFxuICAgICAgICBcImNyZWRlbnRpYWxzXCI6IFwiaW5jbHVkZVwiLFxuICAgICAgICBcImhlYWRlcnNcIjoge1xuICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICAgICAgfVxuICAgIH1cbn0iLCJpbXBvcnQgeyBJRmVlZCB9IGZyb20gJy4uL3R5cGluZ3MnXG5pbXBvcnQgeyBJVXNlciB9IGZyb20gJy4uL3R5cGluZ3MnXG5pbXBvcnQgeyBJRmV0Y2hDb25maWcgfSBmcm9tICcuLi90eXBpbmdzJ1xuaW1wb3J0IHsgSUZlZWRRdWVyeVR5cGUgfSBmcm9tICcuLi90eXBpbmdzJ1xuaW1wb3J0IHsgSVVzZXJDb21tYW5kVHlwZSB9IGZyb20gJy4uL3R5cGluZ3MnXG5pbXBvcnQgeyBJVXNlclF1ZXJ5VHlwZSB9IGZyb20gJy4uL3R5cGluZ3Mvdm8vdXNlci1xdWVyeS10eXBlJ1xuXG5pbXBvcnQgeyBHZXRGZWVkcyB9IGZyb20gJy4vYXBpcydcbmltcG9ydCB7IEdldFVzZXIgfSBmcm9tICcuL2FwaXMnXG5pbXBvcnQgeyBHZXRVc2VycyB9IGZyb20gJy4vYXBpcydcbmltcG9ydCB7IExvZ2luIH0gZnJvbSAnLi9hcGlzJ1xuaW1wb3J0IHsgTG9nb3V0IH0gZnJvbSAnLi9hcGlzJ1xuaW1wb3J0IHsgUG9zdEZlZWQgfSBmcm9tICcuL2FwaXMnXG5pbXBvcnQgeyBQdXRVc2VyIH0gZnJvbSAnLi9hcGlzJ1xuXG5leHBvcnQgaW50ZXJmYWNlIElBcGkge1xuICAgIGxvZ2luOiAodXNlclVpZD86IHN0cmluZywgcGFzcz86IHN0cmluZykgPT4gUHJvbWlzZTxib29sZWFuPlxuICAgIGxvZ291dDogKCkgPT4gUHJvbWlzZTx2b2lkPlxuICAgIHBvc3RGZWVkOiAobXNnOiBzdHJpbmcpID0+IFByb21pc2U8SUZlZWRbXT5cbiAgICBnZXRVc2VyczogKCkgPT4gUHJvbWlzZTxJVXNlcltdPlxuICAgIGdldFVzZXI6IChxdWVyeVR5cGU6IElVc2VyUXVlcnlUeXBlLCBzZWxlY3RlZFVzZXJVaWQ/OiBzdHJpbmcpID0+IFByb21pc2U8SVVzZXI+XG4gICAgcHV0VXNlcjogKGNvbW1hbmRUeXBlOiBJVXNlckNvbW1hbmRUeXBlLCBzZWxlY3RlZFVzZXJVaWQ6IHN0cmluZykgPT4gUHJvbWlzZTxib29sZWFuPlxuICAgIGdldEZlZWRzOiAocXVlcnlUeXBlOiBJRmVlZFF1ZXJ5VHlwZSwgc2VsZWN0ZWRVc2VyVWlkPzogc3RyaW5nKSA9PiBQcm9taXNlPElGZWVkW10+XG59XG5leHBvcnQgY29uc3QgQ3JlYXRlQXBpXG4gICAgPSAoY29uZmlnOiBJRmV0Y2hDb25maWcsIGJhc2VVcmw/OiBzdHJpbmcpOiBJQXBpID0+IHtcbiAgICAgICAgY29uc3QgbG9naW4gPSBMb2dpbihjb25maWcsIGJhc2VVcmwpXG4gICAgICAgIGNvbnN0IGxvZ291dCA9IExvZ291dChjb25maWcsIGJhc2VVcmwpXG4gICAgICAgIGNvbnN0IGdldFVzZXJzID0gR2V0VXNlcnMoY29uZmlnLCBiYXNlVXJsKVxuICAgICAgICBjb25zdCBwdXRVc2VyID0gUHV0VXNlcihjb25maWcsIGJhc2VVcmwpXG4gICAgICAgIGNvbnN0IHBvc3RGZWVkID0gUG9zdEZlZWQoY29uZmlnLCBiYXNlVXJsKVxuICAgICAgICBjb25zdCBnZXRGZWVkcyA9IEdldEZlZWRzKGNvbmZpZywgYmFzZVVybClcbiAgICAgICAgY29uc3QgZ2V0VXNlciA9IEdldFVzZXIoY29uZmlnLCBiYXNlVXJsKVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBsb2dpbixcbiAgICAgICAgICAgIGxvZ291dCxcbiAgICAgICAgICAgIHBvc3RGZWVkLFxuICAgICAgICAgICAgZ2V0VXNlcnMsXG4gICAgICAgICAgICBwdXRVc2VyLFxuICAgICAgICAgICAgZ2V0RmVlZHMsXG4gICAgICAgICAgICBnZXRVc2VyLFxuICAgICAgICB9XG4gICAgfVxuXG5leHBvcnQgY29uc3QgdXJsRW5jb2RpbmdcbiAgICA9IChmb3JtSW5wdXQ6IHsgW25hbWU6IHN0cmluZ106IHN0cmluZyB9KTogc3RyaW5nID0+IHtcbiAgICAgICAgcmV0dXJuIFsuLi5PYmplY3QuZW50cmllcyhmb3JtSW5wdXQpXVxuICAgICAgICAgICAgLnJlZHVjZSgoYWNjOiBbXSwgW2tleSwgdmFsXTogW3N0cmluZywgc3RyaW5nXSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGVuY29kZWRLZXkgPSBlbmNvZGVVUklDb21wb25lbnQoa2V5KVxuICAgICAgICAgICAgICAgIGNvbnN0IGVuY29kZWRWYWx1ZSA9IGVuY29kZVVSSUNvbXBvbmVudCh2YWwpO1xuICAgICAgICAgICAgICAgIChhY2MgYXMgc3RyaW5nW10pLnB1c2goZW5jb2RlZEtleSArIFwiPVwiICsgZW5jb2RlZFZhbHVlKVxuICAgICAgICAgICAgICAgIHJldHVybiBhY2NcbiAgICAgICAgICAgIH0sIFtdKS5qb2luKCcmJylcblxuICAgIH1cblxuIiwiaW1wb3J0IHsgSUFwaSB9IGZyb20gJy4uL2FwaSdcbmltcG9ydCB7IElBcHAsIElGZWVkU3RhdGUsIElIYW5kbGVyLCBJTW9kdWxlLCBJUGFnZUhhbmRsZXIsIElTdG9yZSwgSVVzZXIgfSBmcm9tICcuLi90eXBpbmdzJ1xuXG5jb25zdCBhcHAgPSAoKCkgPT4ge1xuXG4gICAgY2xhc3MgQXBwIGltcGxlbWVudHMgSUFwcCB7XG4gICAgICAgIGFwaTogSUFwaVxuICAgICAgICAvLyBpbmplY3RQYWdlIC8gcGFnZSBjbGFzcywgcGFnZSBpbnN0YW5jZSwgcGFnZSBoYW5kbGVyLCBwYWdlIFxuICAgICAgICBwYWdlQ2xzOiBuZXcgKHByb3BzPzogYW55KSA9PiBJTW9kdWxlXG4gICAgICAgIHBhZ2VJbnM6IElNb2R1bGVcbiAgICAgICAgcGFnZUhkbDogSVBhZ2VIYW5kbGVyXG5cbiAgICAgICAgLy8gaW5qZWN0TW9kdWxlcyAvIG1vZHVsZSBjbGFzcywgbW9kdWxlIGluc3RhbmNlLCBtb2R1bGUgcHJvcGVydGllc1xuICAgICAgICBtb2R1bGVDbHM6IE1hcDxzdHJpbmcsIG5ldyAocHJvcHM/OiBhbnkpID0+IElNb2R1bGU+ID0gbmV3IE1hcCgpXG4gICAgICAgIG1vZHVsZUluczogTWFwPHN0cmluZywgSU1vZHVsZT4gPSBuZXcgTWFwKClcbiAgICAgICAgbW9kdWxlUHM6IE1hcDxzdHJpbmcsIHN0cmluZ1tdPiA9IG5ldyBNYXAoKVxuXG4gICAgICAgIC8vIGluamVjdEhhbmRsZXJzIC8gbW9kdWxlIGhhbmRsZXIgY2xhc3MsIG1vZHVsZSBoYW5kbGVyIGluc3RhbmNlXG4gICAgICAgIGhhbmRsZXJDbHM6IE1hcDxzdHJpbmcsIHsgKGFwaTogSUFwaSk6IElIYW5kbGVyIH0+ID0gbmV3IE1hcCgpXG4gICAgICAgIGhhbmRsZXJJbnM6IE1hcDxzdHJpbmcsIElIYW5kbGVyPiA9IG5ldyBNYXAoKVxuXG4gICAgICAgIC8vIHRhZ3MgZm9yIG1vZHVsZXNcbiAgICAgICAgdGFnRWxzOiBzdHJpbmdbXVxuICAgICAgICByb290RWw6IEhUTUxFbGVtZW50XG5cbiAgICAgICAgLy8gaW5qZWN0U3RvcmUgLyBwcm94eV9zdG9yZVxuICAgICAgICBzdG9yZTogSVN0b3JlXG4gICAgICAgIGRvbTogRG9jdW1lbnRcbiAgICAgICAgaGFuZGxlcnM6IHsgKGFwaTogSUFwaSk6IElIYW5kbGVyIH1bXVxuXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAgICAgdGhpcy5yb290RWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcm9vdCcpIVxuICAgICAgICAgICAgLy8gY29uc3Qgcm9vdCA9IHRoaXMucm9vdEVsXG4gICAgICAgICAgICAvLyB0aGlzLnRhZ0VscyA9IEFycmF5LmZyb20ocm9vdC5jaGlsZHJlbilcbiAgICAgICAgICAgIC8vICAgICAuZmlsdGVyKGMgPT4gYyBpbnN0YW5jZW9mIEhUTUxVbmtub3duRWxlbWVudClcbiAgICAgICAgICAgIC8vICAgICAubWFwKHRhZ0VsID0+IHRhZ0VsLnRhZ05hbWUpXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnRhZ0VscylcbiAgICAgICAgfVxuICAgICAgICBpbmplY3RBcGkoYXBpOiBJQXBpKSB7XG4gICAgICAgICAgICB0aGlzLmFwaSA9IGFwaTsgcmV0dXJuIHRoaXNcbiAgICAgICAgfVxuICAgICAgICBpbmplY3RQYWdlQW5kSGFuZGxlcihwYWdlbWFwOiB7IFtuYW1lOnN0cmluZ106IChhcGk6IElBcGkpID0+IElIYW5kbGVyIH0pe1xuICAgICAgICAgICAgY29uc29sZS5sb2cocGFnZW1hcClcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKE9iamVjdC5rZXlzKHBhZ2VtYXApKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgfVxuXG5cbiAgICAgICAgaW5qZWN0U3RvcmUoX3N0b3JlOiBJU3RvcmUsIF9tb2R1bGVfcHJvcHM6IGFueSkge1xuICAgICAgICAgICAgLy8gZXh0cmFjdCBtb2R1bGUgbmFtZXNcbiAgICAgICAgICAgIGNvbnN0IG1vZHVsZV9uYW1lc1xuICAgICAgICAgICAgICAgID0gQXJyYXkuZnJvbShPYmplY3Qua2V5cyhfbW9kdWxlX3Byb3BzKSlcbiAgICAgICAgICAgIC8vIG1lcmdlIHByb3BzIGludG8gc3RhdGVcbiAgICAgICAgICAgIGNvbnN0IHN0YXRlXG4gICAgICAgICAgICAgICAgPSBtb2R1bGVfbmFtZXMucmVkdWNlKChhY2M6IGFueSwgbW9kdWxlX25hbWU6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBtb2R1bGVfcHJvcHMgPSBfbW9kdWxlX3Byb3BzW21vZHVsZV9uYW1lXVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm9wX25hbWVzID0gT2JqZWN0LmtleXMobW9kdWxlX3Byb3BzKVxuICAgICAgICAgICAgICAgICAgICBwcm9wX25hbWVzXG4gICAgICAgICAgICAgICAgICAgICAgICAuZm9yRWFjaCgocHJvcF9uYW1lOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIShgJHtwcm9wX25hbWV9YCBpbiBhY2MpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjY1tgJHtwcm9wX25hbWV9YF0gPSBtb2R1bGVfcHJvcHNbYCR7cHJvcF9uYW1lfWBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb2R1bGVQcy5zZXQobW9kdWxlX25hbWUsIHByb3BfbmFtZXMpXG4gICAgICAgICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW5zYWZlLXJldHVyblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWNjXG4gICAgICAgICAgICAgICAgfSwge30pXG4gICAgICAgICAgICAvLyBpbmplY3Qgc3RhdGUgaW50byBzdG9yZVxuICAgICAgICAgICAgX3N0b3JlLnN0YXRlID0gc3RhdGVcbiAgICAgICAgICAgIF9zdG9yZS5saXN0ZW5lcnMucHVzaCh0aGlzKVxuXG4gICAgICAgICAgICAvLyBjcmVhdGUgcHJveHkgb2Ygc3RvcmVcbiAgICAgICAgICAgIGNvbnN0IHByb3h5X3N0b3JlXG4gICAgICAgICAgICAgICAgPSBuZXcgUHJveHkoX3N0b3JlLCB7XG4gICAgICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHN0b3JlLCBrZXksIHN0YXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdG9yZVtrZXldID0gc3RhdGVcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IF9zdGF0ZSA9IHN0YXRlIGFzIHVua25vd24gYXMgSUZlZWRTdGF0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IF9sb2dnaW5Vc2VyOiBJVXNlclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9zdGF0ZS5sb2dnaW5Vc2VyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfbG9nZ2luVXNlciA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ25vbmUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXZpY2U6ICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXZpY2VJY29uOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1nOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXVpZDogJycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlYWRlcnM6IFtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb2xsb3dlcnM6IFtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmZWVkczogW11cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9sb2dnaW5Vc2VyID0gX3N0YXRlLmxvZ2dpblVzZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgdXNlcnMsIGZlZWRzIH0gPSBfc3RhdGVcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBbU1RPUkVdIGxvZ2luIHVzZXI6ICR7X2xvZ2dpblVzZXIubmFtZX0sIHRvdGFsIHVzZXJzOiAke3VzZXJzLmxlbmd0aH0sIGZlZWRzOiAke2ZlZWRzLmxlbmd0aH1gKVxuICAgICAgICAgICAgICAgICAgICAgICAgc3RvcmUubm90aWZ5KClcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW5zYWZlLXJldHVyblxuICAgICAgICAgICAgICAgICAgICBnZXQ6IChzdG9yZSwga2V5KSA9PiBzdG9yZVtrZXldXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHRoaXMuc3RvcmUgPSBwcm94eV9zdG9yZVxuICAgICAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgfVxuICAgICAgICBpbmplY3RNb2R1bGVzKG1vZHVsZXM6IHsgbmV3KHByb3BzOiBhbnkpIH1bXSkge1xuICAgICAgICAgICAgdGhpcy5tb2R1bGVDbHMgPSBuZXcgTWFwKG1vZHVsZXMubWFwKG0gPT4gW20ubmFtZSwgbV0pKTsgcmV0dXJuIHRoaXNcbiAgICAgICAgfVxuICAgICAgICBpbmplY3RIYW5kbGVycyhoYW5kbGVyczogeyAoYXBpOiBJQXBpKTogSUhhbmRsZXIgfVtdKSB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZXJDbHMgPSBuZXcgTWFwKGhhbmRsZXJzLm1hcChoID0+IFtoLm5hbWUsIGhdKSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICB9XG4gICAgICAgIGluamVjdFBhZ2VBbmRMb2FkSGFuZGxlcihwYWdlQXJyOiBhbnkpe1xuICAgICAgICAgICAgdGhpcy5wYWdlQ2xzID0gcGFnZUFyclswXVxuICAgICAgICAgICAgdGhpcy5wYWdlSGRsID0gKHBhZ2VBcnJbMV0gYXMgeyAoYXBpOiBJQXBpKTogSVBhZ2VIYW5kbGVyIH0pKHRoaXMuYXBpKVxuICAgICAgICAgICAgdGhpcy5wYWdlSGRsLnNldEFwcCh0aGlzKVxuICAgICAgICAgICAgdGhpcy5wYWdlSGRsLnNldFN0b3JlKHRoaXMuc3RvcmUpXG4gICAgICAgICAgICB3aW5kb3dbYCR7KHBhZ2VBcnJbMF0ubmFtZSBhcyBzdHJpbmcpLnRvTG93ZXJDYXNlKCl9YF0gPSB0aGlzLnBhZ2VIZGxcbiAgICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgIH1cbiAgICAgICAgbG9hZE1vZHVsZXMoKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IFtfbmFtZSwgY2xhc3NSZWZdIG9mIHRoaXMubW9kdWxlQ2xzLmVudHJpZXMoKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBfbmFtZS50b0xvd2VyQ2FzZSgpXG4gICAgICAgICAgICAgICAgY29uc3QgcHJvcHMgPSB0aGlzLm1vZHVsZVBzLmdldChuYW1lKT8ucmVkdWNlKChhY2M6IGFueSwgcHJvcF9uYW1lOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgYWNjW2Ake3Byb3BfbmFtZX1gXSA9IHRoaXMuc3RvcmUuc3RhdGVbYCR7cHJvcF9uYW1lfWBdXG4gICAgICAgICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW5zYWZlLXJldHVyblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWNjXG4gICAgICAgICAgICAgICAgfSwge30pXG4gICAgICAgICAgICAgICAgY29uc3QgaW5zdGFuY2UgPSBuZXcgY2xhc3NSZWYocHJvcHMpXG4gICAgICAgICAgICAgICAgdGhpcy5tb2R1bGVJbnMuc2V0KG5hbWUsIGluc3RhbmNlKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIGFzeW5jIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICAvLyAgICAgY29uc3QgdXNlcnMgPSBhd2FpdCB0aGlzLmFwaS5nZXRVc2VycygpXG4gICAgICAgIC8vICAgICBjb25zdCBsb2dnaW5Vc2VyID0gYXdhaXQgdGhpcy5hcGkubG9naW4oKVxuICAgICAgICAvLyAgICAgaWYgKGxvZ2dpblVzZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAvLyAgICAgICAgIHRoaXMuc3RvcmUuc3RhdGUubG9nZ2luVXNlciA9IGxvZ2dpblVzZXJcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gICAgIHRoaXMuc3RvcmUuc3RhdGUudXNlcnMgPSB1c2Vyc1xuICAgICAgICAvLyB9XG4gICAgICAgIHJlbmRlcigpIHtcbiAgICAgICAgICAgIHRoaXMuZG9tID0gbmV3IERPTVBhcnNlcigpLnBhcnNlRnJvbVN0cmluZyh0aGlzLnBhZ2VJbnMucmVuZGVyKCksICd0ZXh0L2h0bWwnKVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCB0YWdFbHMgPSBBcnJheVxuICAgICAgICAgICAgICAgIC5mcm9tKHRoaXMuZG9tLmRvY3VtZW50RWxlbWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnKicpKVxuICAgICAgICAgICAgICAgIC5maWx0ZXIoeCA9PiAoeCBpbnN0YW5jZW9mIEhUTUxVbmtub3duRWxlbWVudCkpXG4gICAgICAgICAgICB0aGlzLmxvYWRNb2R1bGVzKClcblxuICAgICAgICAgICAgZm9yIChjb25zdCBlbCBvZiB0YWdFbHMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0YWcgPSBlbC50YWdOYW1lLnRvTG93ZXJDYXNlKClcbiAgICAgICAgICAgICAgICBjb25zdCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJylcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZS5pbm5lckhUTUwgPSB0aGlzLm1vZHVsZUlucy5nZXQodGFnKSEucmVuZGVyKClcbiAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXRFbCA9IHRoaXMuZG9tLmRvY3VtZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKHRhZykhXG4gICAgICAgICAgICAgICAgY29uc3QgcGFyZW50ID0gdGFyZ2V0RWwucGFyZW50RWxlbWVudCFcbiAgICAgICAgICAgICAgICB0YXJnZXRFbC5pbnNlcnRCZWZvcmUodGVtcGxhdGUuY29udGVudCwgcGFyZW50LmNoaWxkcmVuW3BhcmVudC5jaGlsZHJlbi5sZW5ndGhdKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5yb290RWwuaW5uZXJIVE1MID0gdGhpcy5kb20uZG9jdW1lbnRFbGVtZW50LmlubmVySFRNTFxuICAgICAgICB9XG4gICAgICAgIHNlbGVjdE1vZHVsZXMoc2VsZWN0ZWQ6IHN0cmluZ1tdKSB7XG4gICAgICAgICAgICB0aGlzLnBhZ2VJbnMgPSBuZXcgdGhpcy5wYWdlQ2xzKHNlbGVjdGVkKVxuICAgICAgICB9XG4gICAgICAgIGFzeW5jIHN0YXJ0KCkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBbXywgaGFuZGxlcl0gb2YgdGhpcy5oYW5kbGVyQ2xzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaGFuZGxlcklucyA9IGhhbmRsZXIodGhpcy5hcGkpXG4gICAgICAgICAgICAgICAgY29uc3QgbmFtZSA9IGhhbmRsZXJJbnMubW9kdWxlTmFtZS50b0xvd2VyQ2FzZSgpXG4gICAgICAgICAgICAgICAgd2luZG93W2Ake25hbWV9YF0gPSBoYW5kbGVySW5zXG4gICAgICAgICAgICAgICAgaGFuZGxlcklucy5zZXRTdG9yZSh0aGlzLnN0b3JlKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5wYWdlSGRsLnNldFN0b3JlKHRoaXMuc3RvcmUpXG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2F3YWl0LXRoZW5hYmxlXG4gICAgICAgICAgICB0aGlzLnNlbGVjdE1vZHVsZXMoWydsb2dpbiddKVxuICAgICAgICAgICAgYXdhaXQgdGhpcy5wYWdlSGRsLm5hdlRvUGFnZSgnSE9NRScpXG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpXG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5ldyBBcHAoKVxufSkoKVxuXG5cbmV4cG9ydCB7XG4gICAgYXBwXG59XG4iLCJpbXBvcnQgeyBJQXBpIH0gZnJvbSAnLi4vLi4vYXBpJ1xuaW1wb3J0IHsgSUZlZWRRdWVyeVR5cGUsIElIYW5kbGVyLCBJU3RvcmUgfSBmcm9tICcuLi8uLi90eXBpbmdzJ1xuXG5leHBvcnQgY29uc3QgRmVlZGVySGFuZGxlclxuICAgID0gKGFwaTogSUFwaSk6IElIYW5kbGVyID0+IHtcbiAgICAgICAgY29uc3QgbW9kdWxlTmFtZSA9ICdGZWVkZXInXG4gICAgICAgIGxldCBzdG9yZTogSVN0b3JlXG5cbiAgICAgICAgY29uc3Qgc2V0U3RvcmUgPSAoX3N0b3JlOiBJU3RvcmUpID0+IHsgc3RvcmUgPSBfc3RvcmUgfVxuICAgICAgICBjb25zdCB0b2dnbGUgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmZWVkcyA9IGF3YWl0IGFwaS5nZXRGZWVkcyhJRmVlZFF1ZXJ5VHlwZS5MT0dJTl9VU0VSX1VOUkVBRF9GRUVEUylcbiAgICAgICAgICAgIHN0b3JlLnN0YXRlID0ge1xuICAgICAgICAgICAgICAgIC4uLnN0b3JlLnN0YXRlLFxuICAgICAgICAgICAgICAgIC4uLntcbiAgICAgICAgICAgICAgICAgICAgZmVlZHM6IGZlZWRzXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRvZ2dsZSxcbiAgICAgICAgICAgIG1vZHVsZU5hbWUsXG4gICAgICAgICAgICBzZXRTdG9yZSxcbiAgICAgICAgfVxuICAgIH0iLCJpbXBvcnQgeyBJRmVlZCwgSUhhbmRsZXIsIElNb2R1bGUsIElVc2VyIH0gZnJvbSBcIi4uLy4uL3R5cGluZ3NcIlxuXG5leHBvcnQgaW50ZXJmYWNlIElGZWVkZXJQcm9wcyB7XG4gICAgbG9nZ2luVXNlcj86IElVc2VyXG4gICAgdXNlcnM6IElVc2VyW11cbiAgICBmZWVkczogSUZlZWRbXVxufVxuXG5leHBvcnQgY2xhc3MgRmVlZGVyIGltcGxlbWVudHMgSU1vZHVsZSB7XG4gICAgcHJvcHM6IElGZWVkZXJQcm9wc1xuICAgIGhhbmRsZXI6IElIYW5kbGVyXG5cbiAgICBjb25zdHJ1Y3Rvcihwcm9wczogSUZlZWRlclByb3BzKSB7XG4gICAgICAgIHRoaXMucHJvcHMgPSBwcm9wc1xuICAgIH1cblxuICAgIHJlbmRlcigpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCB7IGZlZWRzLCB1c2VycyB9ID0gdGhpcy5wcm9wc1xuICAgICAgICBpZiAoZmVlZHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuIChgXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBhbmVsXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwYW5lbC1ib2R5IGZlZWRsaXN0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAke2ZlZWRzLm1hcChmZWVkID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB1c2VyID0gdXNlcnMuZmluZCh1ID0+IHUudXVpZCA9PT0gZmVlZC53cml0ZXIudXVpZCkhXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtZWRpYS1ibG9ja1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3M9XCJtZWRpYS1sZWZ0XCIgaHJlZj1cIiNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImltZy1jaXJjbGUgaW1nLXNtXCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsdD1cIlByb2ZpbGUgUGljdHVyZVwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmM9XCJpbWcvJHt1c2VyLmltZ30ucG5nXCIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1lZGlhLWJvZHlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibWFyLWJ0bVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzcz1cImJ0bi1saW5rIHRleHQtc2VtaWJvbGQgbWVkaWEtaGVhZGluZyBib3gtaW5saW5lXCIgaHJlZj1cIiNcIj4ke3VzZXIubmFtZX08L2E+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwidGV4dC1tdXRlZCB0ZXh0LXNtXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtbW9iaWxlLWFsdCBmYS1sZ1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9pPiAtIEZyb20gTW9iaWxlIC0gNyBtaW4gYWdvXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+JHtmZWVkLm1zZ308L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwYWQtdmVyXCI+PHNwYW4gY2xhc3M9XCJ0YWcgdGFnLXNtXCI+PGkgY2xhc3M9XCJmYSBmYS1oZWFydCB0ZXh0LWRhbmdlclwiPjwvaT4gMjUwIExpa2VzPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwXCI+PGEgY2xhc3M9XCJidG4gYnRuLXNtIGJ0bi1kZWZhdWx0IGJ0bi1ob3Zlci1zdWNjZXNzXCIgaHJlZj1cIiNcIj48aSBjbGFzcz1cImZhIGZhLXRodW1icy11cFwiPjwvaT48L2E+PGEgY2xhc3M9XCJidG4gYnRuLXNtIGJ0bi1kZWZhdWx0IGJ0bi1ob3Zlci1kYW5nZXJcIiBocmVmPVwiI1wiPjxpIGNsYXNzPVwiZmEgZmEtdGh1bWJzLWRvd25cIj48L2k+PC9hPjwvZGl2PjxhIGNsYXNzPVwiYnRuIGJ0bi1zbSBidG4tZGVmYXVsdCBidG4taG92ZXItcHJpbWFyeVwiIGhyZWY9XCIjXCI+Q29tbWVudDwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aHIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKX0pLmpvaW4oJycpfVxuXG5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICBgKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIChgXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBhbmVsXCI+XG4gICAgICAgICAgICAgICAgICAgIDxpbWcgY2xhc3M9XCJmaXQtcGljdHVyZVwiXG4gICAgICAgICAgICAgICAgICAgIHNyYz1cImltZy9uby1wb3N0cy5wbmdcIlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgYClcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyAke2ZlZWRUcmVlVmlldyhjb21tZW50cywgbG9nZ2luVXNlcil9IFxufVxuXG4vLyBjb25zdCB0bXAgPSBgPGRpdiBjbGFzcz1cInBhbmVsXCI+XG4vLyAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwYW5lbC1ib2R5IGZlZWRsaXN0XCI+XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibWVkaWEtYmxvY2tcIj5cbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzcz1cIm1lZGlhLWxlZnRcIiBocmVmPVwiI1wiPlxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJpbWctY2lyY2xlIGltZy1zbVwiIFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWx0PVwiUHJvZmlsZSBQaWN0dXJlXCIgXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmM9XCJodHRwczovL2Jvb3RkZXkuY29tL2ltZy9Db250ZW50L2F2YXRhci9hdmF0YXIzLnBuZ1wiLz5cbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1lZGlhLWJvZHlcIj5cbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1hci1idG1cIj5cbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzPVwiYnRuLWxpbmsgdGV4dC1zZW1pYm9sZCBtZWRpYS1oZWFkaW5nIGJveC1pbmxpbmVcIiBocmVmPVwiI1wiPkplbm55PC9hPlxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJ0ZXh0LW11dGVkIHRleHQtc21cIj5cbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhLW1vYmlsZS1hbHQgZmEtbGdcIj5cbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2k+IC0gRnJvbSBNb2JpbGUgLSA3IG1pbiBhZ29cbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPmNvbnNlY3RldHVlciBhZGlwaXNjaW5nIGVsaXQsIHNlZCBkaWFtIG5vbnVtbXkgbmliaCBldWlzbW9kIHRpbmNpZHVudCB1dCBsYW9yZWV0IGRvbG9yZSBtYWduYSBhbGlxdWFtIGVyYXQgdm9sdXRwYXQuIFV0IHdpc2kgZW5pbSBhZCBtaW5pbSB2ZW5pYW0sIHF1aXMgbm9zdHJ1ZCBleGVyY2kgdGF0aW9uIHVsbGFtY29ycGVyIHN1c2NpcGl0IGxvYm9ydGlzIG5pc2wgdXQgYWxpcXVpcCBleCBlYSBjb21tb2RvIGNvbnNlcXVhdC48L3A+XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGFkLXZlclwiPjxzcGFuIGNsYXNzPVwidGFnIHRhZy1zbVwiPjxpIGNsYXNzPVwiZmEgZmEtaGVhcnQgdGV4dC1kYW5nZXJcIj48L2k+IDI1MCBMaWtlczwvc3Bhbj5cbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJ0bi1ncm91cFwiPjxhIGNsYXNzPVwiYnRuIGJ0bi1zbSBidG4tZGVmYXVsdCBidG4taG92ZXItc3VjY2Vzc1wiIGhyZWY9XCIjXCI+PGkgY2xhc3M9XCJmYSBmYS10aHVtYnMtdXBcIj48L2k+PC9hPjxhIGNsYXNzPVwiYnRuIGJ0bi1zbSBidG4tZGVmYXVsdCBidG4taG92ZXItZGFuZ2VyXCIgaHJlZj1cIiNcIj48aSBjbGFzcz1cImZhIGZhLXRodW1icy1kb3duXCI+PC9pPjwvYT48L2Rpdj48YSBjbGFzcz1cImJ0biBidG4tc20gYnRuLWRlZmF1bHQgYnRuLWhvdmVyLXByaW1hcnlcIiBocmVmPVwiI1wiPkNvbW1lbnQ8L2E+XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGhyLz5cbi8vICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibWVkaWEtYmxvY2tcIj5cbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzcz1cIm1lZGlhLWxlZnRcIiBocmVmPVwiI1wiPlxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJpbWctY2lyY2xlIGltZy1zbVwiIFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWx0PVwiUHJvZmlsZSBQaWN0dXJlXCIgXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmM9XCJodHRwczovL2Jvb3RkZXkuY29tL2ltZy9Db250ZW50L2F2YXRhci9hdmF0YXI0LnBuZ1wiLz5cbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1lZGlhLWJvZHlcIj5cbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1hci1idG1cIj5cbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzPVwiYnRuLWxpbmsgdGV4dC1zZW1pYm9sZCBtZWRpYS1oZWFkaW5nIGJveC1pbmxpbmVcIiBocmVmPVwiI1wiPlRvbTwvYT5cbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwidGV4dC1tdXRlZCB0ZXh0LXNtXCI+XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1tb2JpbGUtYWx0IGZhLWxnXCI+XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9pPiAtIEZyb20gTW9iaWxlIC0gNyBtaW4gYWdvXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5jb25zZWN0ZXR1ZXIgYWRpcGlzY2luZyBlbGl0LCBzZWQgZGlhbSBub251bW15IG5pYmggZXVpc21vZCB0aW5jaWR1bnQgdXQgbGFvcmVldCBkb2xvcmUgbWFnbmEgYWxpcXVhbSBlcmF0IHZvbHV0cGF0LiBVdCB3aXNpIGVuaW0gYWQgbWluaW0gdmVuaWFtLCBxdWlzIG5vc3RydWQgZXhlcmNpIHRhdGlvbiB1bGxhbWNvcnBlciBzdXNjaXBpdCBsb2JvcnRpcyBuaXNsIHV0IGFsaXF1aXAgZXggZWEgY29tbW9kbyBjb25zZXF1YXQuPC9wPlxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBhZC12ZXJcIj48c3BhbiBjbGFzcz1cInRhZyB0YWctc21cIj48aSBjbGFzcz1cImZhIGZhLWhlYXJ0IHRleHQtZGFuZ2VyXCI+PC9pPiAyNTAgTGlrZXM8L3NwYW4+XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJidG4tZ3JvdXBcIj48YSBjbGFzcz1cImJ0biBidG4tc20gYnRuLWRlZmF1bHQgYnRuLWhvdmVyLXN1Y2Nlc3NcIiBocmVmPVwiI1wiPjxpIGNsYXNzPVwiZmEgZmEtdGh1bWJzLXVwXCI+PC9pPjwvYT48YSBjbGFzcz1cImJ0biBidG4tc20gYnRuLWRlZmF1bHQgYnRuLWhvdmVyLWRhbmdlclwiIGhyZWY9XCIjXCI+PGkgY2xhc3M9XCJmYSBmYS10aHVtYnMtZG93blwiPjwvaT48L2E+PC9kaXY+PGEgY2xhc3M9XCJidG4gYnRuLXNtIGJ0bi1kZWZhdWx0IGJ0bi1ob3Zlci1wcmltYXJ5XCIgaHJlZj1cIiNcIj5Db21tZW50PC9hPlxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoci8+XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC0tICAtLT5cblxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtZWRpYS1ibG9ja1wiPlxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzcz1cIm1lZGlhLWxlZnRcIiBocmVmPVwiI1wiPlxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImltZy1jaXJjbGUgaW1nLXNtXCIgXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWx0PVwiUHJvZmlsZSBQaWN0dXJlXCIgXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjPVwiaHR0cHM6Ly9ib290ZGV5LmNvbS9pbWcvQ29udGVudC9hdmF0YXIvYXZhdGFyNS5wbmdcIi8+XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1lZGlhLWJvZHlcIj5cbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtYXItYnRtXCI+XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3M9XCJidG4tbGluayB0ZXh0LXNlbWlib2xkIG1lZGlhLWhlYWRpbmcgYm94LWlubGluZVwiIGhyZWY9XCIjXCI+SmFja3k8L2E+XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJ0ZXh0LW11dGVkIHRleHQtc21cIj5cbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1tb2JpbGUtYWx0IGZhLWxnXCI+XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvaT4gLSBGcm9tIE1vYmlsZSAtIDcgbWluIGFnb1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5jb25zZWN0ZXR1ZXIgYWRpcGlzY2luZyBlbGl0LCBzZWQgZGlhbSBub251bW15IG5pYmggZXVpc21vZCB0aW5jaWR1bnQgdXQgbGFvcmVldCBkb2xvcmUgbWFnbmEgYWxpcXVhbSBlcmF0IHZvbHV0cGF0LiBVdCB3aXNpIGVuaW0gYWQgbWluaW0gdmVuaWFtLCBxdWlzIG5vc3RydWQgZXhlcmNpIHRhdGlvbiB1bGxhbWNvcnBlciBzdXNjaXBpdCBsb2JvcnRpcyBuaXNsIHV0IGFsaXF1aXAgZXggZWEgY29tbW9kbyBjb25zZXF1YXQuPC9wPlxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwYWQtdmVyXCI+PHNwYW4gY2xhc3M9XCJ0YWcgdGFnLXNtXCI+PGkgY2xhc3M9XCJmYSBmYS1oZWFydCB0ZXh0LWRhbmdlclwiPjwvaT4gMjUwIExpa2VzPC9zcGFuPlxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJidG4tZ3JvdXBcIj48YSBjbGFzcz1cImJ0biBidG4tc20gYnRuLWRlZmF1bHQgYnRuLWhvdmVyLXN1Y2Nlc3NcIiBocmVmPVwiI1wiPjxpIGNsYXNzPVwiZmEgZmEtdGh1bWJzLXVwXCI+PC9pPjwvYT48YSBjbGFzcz1cImJ0biBidG4tc20gYnRuLWRlZmF1bHQgYnRuLWhvdmVyLWRhbmdlclwiIGhyZWY9XCIjXCI+PGkgY2xhc3M9XCJmYSBmYS10aHVtYnMtZG93blwiPjwvaT48L2E+PC9kaXY+PGEgY2xhc3M9XCJidG4gYnRuLXNtIGJ0bi1kZWZhdWx0IGJ0bi1ob3Zlci1wcmltYXJ5XCIgaHJlZj1cIiNcIj5Db21tZW50PC9hPlxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoci8+XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwtLSAgLS0+XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwYW5lbFwiPlxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBhbmVsLWJvZHlcIj5cbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzcz1cIm1lZGlhLWxlZnRcIiBocmVmPVwiI1wiPlxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJpbWctY2lyY2xlIGltZy1zbVwiIFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWx0PVwiUHJvZmlsZSBQaWN0dXJlXCIgXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmM9XCJodHRwczovL2Jvb3RkZXkuY29tL2ltZy9Db250ZW50L2F2YXRhci9hdmF0YXIyLnBuZ1wiLz5cbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1lZGlhLWJvZHlcIj5cbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1hci1idG1cIj48YSBjbGFzcz1cImJ0bi1saW5rIHRleHQtc2VtaWJvbGQgbWVkaWEtaGVhZGluZyBib3gtaW5saW5lXCIgaHJlZj1cIiNcIj5NaWNoYWVsPC9hPlxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJ0ZXh0LW11dGVkIHRleHQtc21cIj48aSBjbGFzcz1cImZhIGZhLW1vYmlsZS1hbHQgZmEtbGdcIj48L2k+IC0gRnJvbSBXZWI8L3A+XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoci8+XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGZvcm0gbmFtZT1cImZlZWRmb3JtXCI+XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZXh0YXJlYSBjbGFzcz1cImZvcm0tY29udHJvbFwiIG5hbWU9XCJtc2dcIiBpZD1cIm1zZ1wiIHJvd3M9XCIyXCIgcGxhY2Vob2xkZXI9XCJXaGF0IGFyZSB5b3UgdGhpbmtpbmc/XCI+PC90ZXh0YXJlYT5cbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJoaWRkZW5cIiBuYW1lPVwiYWNjZXNzX3Rva2VuXCIgaWQ9XCJhY2Nlc3NfdG9rZW5cIiB2YWx1ZT1cIiNhY2Nlc3NfdG9rZW5cIi8+XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtYXItdG9wIGNsZWFyZml4XCI+XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG9uY2xpY2s9XCJcIiBjbGFzcz1cImJ0biBidG4tc20gYnRuLXByaW1hcnkgcHVsbC1yaWdodFwiIHR5cGU9XCJidXR0b25cIj5cbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS1wZW5jaWwtYWx0IGZhLWZ3XCI+PC9pPiBcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb21tZW50XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9mb3JtPlxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8LS0gIC0tPlxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4vLyAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuLy8gICAgICAgICAgICAgICAgIDwvZGl2PmBcblxuIiwiZXhwb3J0IHsgSUZlZWRlclByb3BzIH0gZnJvbSAnLi9mZWVkZXInXG5leHBvcnQgeyBGZWVkZXIgfSBmcm9tICcuL2ZlZWRlcidcbmV4cG9ydCB7IEZlZWRlckhhbmRsZXIgfSBmcm9tICcuL2ZlZWRlci1oYW5kbGVycyciLCJleHBvcnQgeyBJTmF2YmFyUHJvcHMgfSBmcm9tICcuL25hdmJhcidcbmV4cG9ydCB7IE5hdmJhciB9IGZyb20gJy4vbmF2YmFyJ1xuZXhwb3J0IHsgTmF2YmFySGFuZGxlciB9IGZyb20gJy4vbmF2YmFyJ1xuXG5leHBvcnQgeyBJU2VsZWN0b3JQcm9wcyB9IGZyb20gJy4vc2VsZWN0b3InXG5leHBvcnQgeyBTZWxlY3RvciB9IGZyb20gJy4vc2VsZWN0b3InXG5leHBvcnQgeyBTZWxlY3RvckhhbmRsZXIgfSBmcm9tICcuL3NlbGVjdG9yJ1xuXG5leHBvcnQgeyBJRmVlZGVyUHJvcHMgfSBmcm9tICcuL2ZlZWRlcidcbmV4cG9ydCB7IEZlZWRlciB9IGZyb20gJy4vZmVlZGVyJ1xuZXhwb3J0IHsgRmVlZGVySGFuZGxlciB9IGZyb20gJy4vZmVlZGVyJ1xuXG5leHBvcnQgeyBJV3JpdGVyUHJvcHMgfSBmcm9tICcuL3dyaXRlcidcbmV4cG9ydCB7IFdyaXRlciB9IGZyb20gJy4vd3JpdGVyJ1xuZXhwb3J0IHsgV3JpdGVySGFuZGxlciB9IGZyb20gJy4vd3JpdGVyJ1xuXG5leHBvcnQgeyBJTG9naW5Qcm9wcyB9IGZyb20gJy4vbG9naW4nXG5leHBvcnQgeyBMb2dpbiB9IGZyb20gJy4vbG9naW4nXG5leHBvcnQgeyBMb2dpbkhhbmRsZXIgfSBmcm9tICcuL2xvZ2luJ1xuIiwiZXhwb3J0IHsgSUxvZ2luUHJvcHMsIExvZ2luIH0gZnJvbSAnLi9sb2dpbidcbmV4cG9ydCB7IExvZ2luSGFuZGxlciB9IGZyb20gJy4vbG9naW4taGFuZGxlcnMnXG5leHBvcnQgeyBsb2dpbk1vZGFsVmlldywgbG9nb3V0TmF2VmlldyB9IGZyb20gJy4vbG9naW4tdmlld3MnIiwiaW1wb3J0IHsgSUZlZWRRdWVyeVR5cGUsIElIYW5kbGVyLCBJU3RvcmUsIElVc2VyIH0gZnJvbSAnLi4vLi4vdHlwaW5ncydcbmltcG9ydCB7IElBcGkgfSBmcm9tICcuLi8uLi9hcGknXG5pbXBvcnQgeyBJVXNlclF1ZXJ5VHlwZSB9IGZyb20gJy4uLy4uL3R5cGluZ3Mvdm8vdXNlci1xdWVyeS10eXBlJ1xuXG5jb25zdCBiYWNrd2FyZFxuICAgID0gKGN1cnJlbnRJbmRleDogbnVtYmVyLCBtYXhJbmRleDogbnVtYmVyKSA9PlxuICAgICAgICAoY3VycmVudEluZGV4ID09PSAwKVxuICAgICAgICAgICAgPyBjdXJyZW50SW5kZXggPSBtYXhJbmRleCAtIDFcbiAgICAgICAgICAgIDogY3VycmVudEluZGV4ID0gY3VycmVudEluZGV4IC0gMVxuXG5jb25zdCBmb3J3YXJkXG4gICAgPSAoY3VycmVudEluZGV4OiBudW1iZXIsIG1heEluZGV4OiBudW1iZXIpID0+XG4gICAgICAgIChjdXJyZW50SW5kZXggPT09IG1heEluZGV4IC0gMSlcbiAgICAgICAgICAgID8gY3VycmVudEluZGV4ID0gMFxuICAgICAgICAgICAgOiBjdXJyZW50SW5kZXggPSBjdXJyZW50SW5kZXggKyAxXG5cbmNvbnN0IHEgPSAoc2VsZWN0b3I6IHN0cmluZyk6IEhUTUxFbGVtZW50ID0+IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpIGFzIEhUTUxFbGVtZW50XG5cbmV4cG9ydCBjb25zdCBMb2dpbkhhbmRsZXJcbiAgICA9IChhcGk6IElBcGkpOiBJSGFuZGxlciA9PiB7XG4gICAgICAgIGNvbnN0IG1vZHVsZU5hbWUgPSAnTG9naW4nXG4gICAgICAgIGxldCBzdG9yZTogSVN0b3JlXG4gICAgICAgIGxldCBjdXJyZW50SW5kZXggPSAwXG4gICAgICAgIGxldCBkZWZhdWx0SW5kZXggPSAwXG5cbiAgICAgICAgY29uc3Qgc2hvd0xvZ2luTW9kYWxcbiAgICAgICAgICAgID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IFt1c2VyRWwsIG1vZGFsQnV0dG9uXSA9IFtcbiAgICAgICAgICAgICAgICAgICAgcShgZGl2W2RhdGEtdXNlci1pbmRleD1cIiR7Y3VycmVudEluZGV4ID0gZGVmYXVsdEluZGV4fVwiXWApLFxuICAgICAgICAgICAgICAgICAgICBxKGBidXR0b25bZGF0YS10b2dnbGU9XCJtb2RhbFwiXWApIGFzIEhUTUxCdXR0b25FbGVtZW50XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIHVzZXJFbC5zdHlsZS5kaXNwbGF5ID0gJydcbiAgICAgICAgICAgICAgICBtb2RhbEJ1dHRvbi5jbGljaygpXG4gICAgICAgICAgICAgICAgJChkb2N1bWVudCkub24oJ2hpZGUuYnMubW9kYWwnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBtb2RhbFVzZXJzID0gZS5jdXJyZW50VGFyZ2V0LnF1ZXJ5U2VsZWN0b3JBbGwoYGRpdltkYXRhLXVzZXItaW5kZXhdYClcbiAgICAgICAgICAgICAgICAgICAgbW9kYWxVc2Vycy5mb3JFYWNoKHVzZXIgPT4gKHVzZXIgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZScpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICBjb25zdCBjaGFuZ2VVc2VySW5Mb2dpbk1vZGFsXG4gICAgICAgICAgICA9IChzZWxlY3Rvcjogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgbWF4SW5kZXggPSBzdG9yZS5zdGF0ZS51c2Vycy5sZW5ndGhcbiAgICAgICAgICAgICAgICBjb25zdCB1c2VyRWwgPSBxKGBkaXZbZGF0YS11c2VyLWluZGV4PVwiJHtjdXJyZW50SW5kZXh9XCJdYClcbiAgICAgICAgICAgICAgICB1c2VyRWwuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICAgICAgICAgICAgICAgIGlmIChzZWxlY3RvciA9PT0gJ3ByZXYnKSBjdXJyZW50SW5kZXggPSBiYWNrd2FyZChjdXJyZW50SW5kZXgsIG1heEluZGV4KVxuICAgICAgICAgICAgICAgIGlmIChzZWxlY3RvciA9PT0gJ25leHQnKSBjdXJyZW50SW5kZXggPSBmb3J3YXJkKGN1cnJlbnRJbmRleCwgbWF4SW5kZXgpXG4gICAgICAgICAgICAgICAgY29uc3QgbmV3VXNlckVsID0gcShgZGl2W2RhdGEtdXNlci1pbmRleD1cIiR7Y3VycmVudEluZGV4fVwiXWApXG4gICAgICAgICAgICAgICAgbmV3VXNlckVsLnN0eWxlLmRpc3BsYXkgPSAnJ1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHByb2Nlc3NMb2dpblxuICAgICAgICAgICAgPSBhc3luYyAoZm9ybTogSFRNTEZvcm1FbGVtZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgY2xvc2VMb2dpbk1vZGFsKClcbiAgICAgICAgICAgICAgICBjb25zdCBpZCA9IChmb3JtLmVsZW1lbnRzIGFzIGFueSlbJ2lkJ10udmFsdWVcbiAgICAgICAgICAgICAgICBjb25zdCBwYXNzID0gKGZvcm0uZWxlbWVudHMgYXMgYW55KVsncGFzcyddLnZhbHVlXG4gICAgICAgICAgICAgICAgbGV0IG5ld0xvZ2dpblVzZXI6IElVc2VyXG4gICAgICAgICAgICAgICAgaWYgKGF3YWl0IGFwaS5sb2dpbihpZCwgcGFzcykpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3TG9nZ2luVXNlciA9IGF3YWl0IGFwaS5nZXRVc2VyKElVc2VyUXVlcnlUeXBlLkxPR0lOX1VTRVJfUFJPRklMRSlcbiAgICAgICAgICAgICAgICAgICAgc3RvcmUuc3RhdGUgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5zdG9yZS5zdGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2dnaW5Vc2VyOiBuZXdMb2dnaW5Vc2VyLFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHdpbmRvd1snZmVlZHBhZ2UnXS5uYXZUb1BhZ2UoJ0ZFRURTJylcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCB3aW5kb3dbJ2ZlZWRwYWdlJ10ubmF2VG9QYWdlKCdIT01FJylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcHJvY2Vzc0xvZ291dFxuICAgICAgICAgICAgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgYXdhaXQgYXBpLmxvZ291dCgpXG4gICAgICAgICAgICAgICAgYXdhaXQgd2luZG93WydmZWVkcGFnZSddLm5hdlRvUGFnZSgnTE9HT1VUJylcbiAgICAgICAgICAgIH1cblxuICAgICAgICBjb25zdCBjbG9zZUxvZ2luTW9kYWwgPSAoKSA9PiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uW2RhdGEtZGlzbWlzcz1cIm1vZGFsXCJdJykgYXMgSFRNTEJ1dHRvbkVsZW1lbnQpLmNsaWNrKClcbiAgICAgICAgY29uc3Qgc2VsZWN0UHJldlVzZXJUb0xvZ2luID0gKCkgPT4gY2hhbmdlVXNlckluTG9naW5Nb2RhbCgncHJldicpXG4gICAgICAgIGNvbnN0IHNlbGVjdE5leHRVc2VyVG9Mb2dpbiA9ICgpID0+IGNoYW5nZVVzZXJJbkxvZ2luTW9kYWwoJ25leHQnKVxuICAgICAgICBjb25zdCBzZXREZWZhdWx0ID0gKF9kZWZhdWx0OiBudW1iZXIpID0+IGRlZmF1bHRJbmRleCA9IF9kZWZhdWx0XG4gICAgICAgIGNvbnN0IHNldFN0b3JlID0gKF9zdG9yZTogSVN0b3JlKSA9PiB7IHN0b3JlID0gX3N0b3JlIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG1vZHVsZU5hbWUsXG4gICAgICAgICAgICBzZXRTdG9yZSxcbiAgICAgICAgICAgIHNldERlZmF1bHQsXG4gICAgICAgICAgICBzaG93TG9naW5Nb2RhbCxcbiAgICAgICAgICAgIHByb2Nlc3NMb2dpbixcbiAgICAgICAgICAgIHByb2Nlc3NMb2dvdXQsXG4gICAgICAgICAgICBjaGFuZ2VVc2VySW5Mb2dpbk1vZGFsLFxuICAgICAgICAgICAgc2VsZWN0UHJldlVzZXJUb0xvZ2luLFxuICAgICAgICAgICAgc2VsZWN0TmV4dFVzZXJUb0xvZ2luLFxuICAgICAgICAgICAgY2xvc2VMb2dpbk1vZGFsLFxuICAgICAgICB9XG4gICAgfVxuIiwiaW1wb3J0IHsgSVVzZXIgfSBmcm9tICcuLi8uLi90eXBpbmdzJ1xuXG5leHBvcnQgY29uc3QgbG9naW5Nb2RhbFZpZXdcbiAgICA9IChwcm9wczogeyB1c2VyczogSVVzZXJbXSB9KTogc3RyaW5nID0+IHtcblxuICAgICAgICBjb25zdCB7IHVzZXJzIH0gPSBwcm9wc1xuICAgICAgICBjb25zdCBzZWxlY3Rpb25FdmVudEhhbmRsZXIgPSAoc2VsZWN0b3I6IHN0cmluZykgPT4gYGxvZ2luLnNlbGVjdCR7c2VsZWN0b3J9VXNlclRvTG9naW4oKWBcbiAgICAgICAgY29uc3QgdXNlclNlbGVjdGlvblZpZXcgPSAocHJvcHM6IElVc2VyLCBpbmRleDogbnVtYmVyKTogc3RyaW5nID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGxvZ2luRXZlbnRIYW5kbGVyID0gYGxvZ2luLnByb2Nlc3NMb2dpbihkb2N1bWVudC5mb3Jtc1snbG9naW5mb3JtJHtpbmRleH0nXSlgXG4gICAgICAgICAgICByZXR1cm4gKGBcbiAgICAgICAgPGRpdiBkYXRhLXVzZXItaW5kZXg9JyR7aW5kZXh9JyBzdHlsZT1cImRpc3BsYXk6bm9uZTtcIj5cbiAgICAgICAgICAgIDxpbWcgY2xhc3M9XCJwcm9maWxlLWltZ1wiIHNyYz1cImltZy8ke3Byb3BzLmltZ30ucG5nXCJcbiAgICAgICAgICAgICAgICBhbHQ9XCJcIj5cbiAgICAgICAgICAgIDxwIGNsYXNzPVwicHJvZmlsZS1uYW1lXCI+JHtwcm9wcy5uYW1lfTwvcD5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1lbWFpbFwiPiR7cHJvcHMubmFtZS50b0xvd2VyQ2FzZSgpfUBnbWFpbC5jb208L3NwYW4+XG4gICAgICAgICAgICA8Zm9ybSBuYW1lPVwibG9naW5mb3JtJHtpbmRleH1cIiBjbGFzcz1cImZvcm0tc2lnbmluXCI+XG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJoaWRkZW5cIiBuYW1lPVwiaWRcIiB2YWx1ZT1cIiR7cHJvcHMudXVpZH1cIj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInBhc3N3b3JkXCIgbmFtZT1cInBhc3NcIiB2YWx1ZT1cIiR7cHJvcHMubmFtZX1cIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIHBsYWNlaG9sZGVyPVwiUGFzc3dvcmRcIiByZXF1aXJlZCBhdXRvZm9jdXMgcmVhZG9ubHk+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBvbmNsaWNrPVwiJHtsb2dpbkV2ZW50SGFuZGxlcn1cIiBjbGFzcz1cImJ0biBidG4tbGcgYnRuLXByaW1hcnkgYnRuLWJsb2NrXCIgdHlwZT1cImJ1dHRvblwiPlxuICAgICAgICAgICAgICAgICAgICBTaWduIGluXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGEgaHJlZj1cIiNcIiBjbGFzcz1cIm5lZWQtaGVscFwiPk5lZWQgaGVscD8gPC9hPjxzcGFuIGNsYXNzPVwiY2xlYXJmaXhcIj48L3NwYW4+XG4gICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICAgICA8YSBocmVmPVwiI1wiIGNsYXNzPVwidGV4dC1jZW50ZXIgbmV3LWFjY291bnRcIj5TaWduIGluIHdpdGggYSBkaWZmZXJlbnQgYWNjb3VudDwvYT5cbiAgICAgICAgPC9kaXY+XG4gICAgYClcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKGBcbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSBoaWRkZW5cIiB0eXBlPVwiYnV0dG9uXCIgZGF0YS10b2dnbGU9XCJtb2RhbFwiIGRhdGEtdGFyZ2V0PVwiI2xvZ2luXCI+SGlkZGVuQnV0dG9uPC9idXR0b24+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbCBtb2RhbC1jZW50ZXIgZmFkZVwiIGlkPVwibG9naW5cIiB0YWJpbmRleD1cIi0xXCIgcm9sZT1cImRpYWxvZ1wiIGFyaWEtbGFiZWxsZWRieT1cIm15ODBzaXplQ2VudGVyTW9kYWxMYWJlbFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWRpYWxvZyBtb2RhbC04MHNpemUgbW9kYWwtY2VudGVyXCIgcm9sZT1cImRvY3VtZW50XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWNvbnRlbnQgbW9kYWwtODBzaXplXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJjbG9zZVwiIHR5cGU9XCJidXR0b25cIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiIGFyaWEtbGFiZWw9XCJDbG9zZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPsOXPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3M9XCJtb2RhbC10aXRsZVwiIGlkPVwibXlNb2RhbExhYmVsXCI+PC9oND5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBpZD1cIm1vZGFsLWJvZHlcIiBjbGFzcz1cIm1vZGFsLWJvZHlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgb25jbGljaz1cIiR7c2VsZWN0aW9uRXZlbnRIYW5kbGVyKCdQcmV2Jyl9XCIgY2xhc3M9XCJsZWZ0IGNhcm91c2VsLWNvbnRyb2xcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhLWNoZXZyb24tbGVmdFwiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBvbmNsaWNrPVwiJHtzZWxlY3Rpb25FdmVudEhhbmRsZXIoJ05leHQnKX1cIiBjbGFzcz1cInJpZ2h0IGNhcm91c2VsLWNvbnRyb2xcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhLWNoZXZyb24tcmlnaHRcIj48L2k+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAke3VzZXJzLm1hcCgodXNlcjogSVVzZXIsIGluZGV4OiBudW1iZXIpID0+IHVzZXJTZWxlY3Rpb25WaWV3KHVzZXIsIGluZGV4KSkuam9pbignJyl9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtZm9vdGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCIgdHlwZT1cImJ1dHRvblwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgKVxuICAgIH1cblxuZXhwb3J0IGNvbnN0IGxvZ291dE5hdlZpZXdcbiAgICA9IChwcm9wczogSVVzZXIpOiBzdHJpbmcgPT4ge1xuXG4gICAgICAgIGNvbnN0IGxvZ291dEV2ZW50SGFuZGxlciA9IGBsb2dpbi5wcm9jZXNzTG9nb3V0KClgXG4gICAgICAgIHJldHVybiAoYFxuICAgICAgICA8bGkgXG4gICAgICAgICAgICBjbGFzcz1cImRyb3Bkb3duXCIgXG4gICAgICAgICAgICBvbm1vdXNlZW50ZXI9XCJ0aGlzLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXCIgXG4gICAgICAgICAgICBvbm1vdXNlb3V0PVwidGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVwiPlxuICAgICAgICAgICAgPGEgY2xhc3M9XCJkcm9wZG93bi10b2dnbGVcIiBocmVmPVwiI1wiIGRhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIj5cbiAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS11c2VyXCI+Jm5ic3A7Jm5ic3A7PC9pPlxuICAgICAgICAgICAgICAgIGxvZ291dCAoJHtwcm9wcy5uYW1lfSlcbiAgICAgICAgICAgIDwvYT5cblxuICAgICAgICAgICAgPHVsIGNsYXNzPVwiZHJvcGRvd24tbWVudVwiPlxuICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm5hdmJhci1sb2dpblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbGctNFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIGNsYXNzPVwiaWNvbi1zaXplXCIgd2lkdGg9XCI4MFwiIGhlaWdodD1cIjgwXCIgYWx0PVwiMTIweDEyMFwiIHNyYz1cImltZy8ke3Byb3BzLmltZ30ucG5nXCIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1sZy04XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwidGV4dC1sZWZ0XCI+PHN0cm9uZz4ke3Byb3BzLm5hbWV9PC9zdHJvbmc+PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInRleHQtbGVmdCBzbWFsbFwiPiR7cHJvcHMubmFtZS50b0xvd2VyQ2FzZSgpfUBnbWFpbC5jb208L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICA8bGkgY2xhc3M9XCJkaXZpZGVyXCI+PC9saT5cbiAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJuYXZiYXItbG9naW4gbmF2YmFyLWxvZ2luLXNlc3Npb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLWxnLTEyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPjxhIGNsYXNzPVwiYnRuIGJ0bi1kYW5nZXIgYnRuLWJsb2NrXCIgaHJlZj1cIiNcIiBvbmNsaWNrPVwiJHtsb2dvdXRFdmVudEhhbmRsZXJ9XCI+TG9nb3V0PC9hPjwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgPC91bD5cbiAgICAgICAgPC9saT5cbiAgICBgKVxuICAgIH0iLCJpbXBvcnQgeyBJSGFuZGxlciwgSU1vZHVsZSwgSVVzZXIgfSBmcm9tICcuLi8uLi90eXBpbmdzJ1xuaW1wb3J0IHsgbG9naW5Nb2RhbFZpZXcgfSBmcm9tICcuL2xvZ2luLXZpZXdzJ1xuXG5leHBvcnQgaW50ZXJmYWNlIElMb2dpblByb3BzIHtcbiAgICBsb2dnaW5Vc2VyPzogSVVzZXJcbiAgICB1c2VyczogSVVzZXJbXVxufVxuXG5leHBvcnQgY2xhc3MgTG9naW4gaW1wbGVtZW50cyBJTW9kdWxlIHtcbiAgICBwcm9wczogSUxvZ2luUHJvcHNcbiAgICBoYW5kbGVyOiBJSGFuZGxlclxuXG4gICAgY29uc3RydWN0b3IocHJvcHM6IElMb2dpblByb3BzKSB7XG4gICAgICAgIHRoaXMucHJvcHMgPSBwcm9wc1xuICAgIH1cblxuICAgIHJlbmRlcigpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBpc0xvZ2dpbmVkID0gdGhpcy5wcm9wcy5sb2dnaW5Vc2VyICYmICgnbmFtZScgaW4gdGhpcy5wcm9wcy5sb2dnaW5Vc2VyKVxuICAgICAgICByZXR1cm4gKGBcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgJHshaXNMb2dnaW5lZCA/IGxvZ2luTW9kYWxWaWV3KHRoaXMucHJvcHMpIDogJyd9XG4gICAgICAgICAgICA8ZGl2Lz5cbiAgICAgICAgICAgIGApXG4gICAgfVxufVxuXG4iLCJleHBvcnQgeyBJTmF2YmFyUHJvcHMgfSBmcm9tICcuL25hdmJhcidcbmV4cG9ydCB7IE5hdmJhciB9IGZyb20gJy4vbmF2YmFyJ1xuZXhwb3J0IHsgTmF2YmFySGFuZGxlciB9IGZyb20gJy4vbmF2YmFyLWhhbmRsZXJzJ1xuIiwiaW1wb3J0IHsgSUhhbmRsZXIsIElTdG9yZSB9IGZyb20gJy4uLy4uL3R5cGluZ3MnXG5pbXBvcnQgeyBJQXBpIH0gZnJvbSAnLi4vLi4vYXBpJ1xuXG5leHBvcnQgY29uc3QgTmF2YmFySGFuZGxlclxuICAgID0gKGFwaTogSUFwaSk6IElIYW5kbGVyID0+IHtcbiAgICAgICAgY29uc3QgbW9kdWxlTmFtZSA9ICdOYXZiYXInXG4gICAgICAgIGxldCBzdG9yZTogSVN0b3JlXG5cbiAgICAgICAgY29uc3Qgc2V0U3RvcmUgPSAoX3N0b3JlOiBJU3RvcmUpID0+IHsgc3RvcmUgPSBfc3RvcmUgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbW9kdWxlTmFtZSxcbiAgICAgICAgICAgIHNldFN0b3JlXG4gICAgICAgIH1cbiAgICB9XG4iLCJpbXBvcnQgeyBJVXNlciB9IGZyb20gJy4uLy4uL3R5cGluZ3MnXG5cbmV4cG9ydCBjb25zdCBmZWVkZXJOYXZWaWV3XG4gICAgPSAoKTogc3RyaW5nID0+IHtcblxuICAgICAgICBjb25zdCBldmVudEhhbmRsZXIgPSBgZmVlZHBhZ2UubmF2VG9QYWdlKCdGRUVEUycpYFxuICAgICAgICByZXR1cm4gKGBcbiAgICAgICAgPGxpIFxuICAgICAgICAgICAgaWQ9XCJmZWVkXCJcbiAgICAgICAgICAgIG9uY2xpY2s9XCIke2V2ZW50SGFuZGxlcn1cIiBcbiAgICAgICAgICAgIG9ubW91c2VlbnRlcj1cInRoaXMuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcIiBcbiAgICAgICAgICAgIG9ubW91c2VvdXQ9XCJ0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpXCJcbiAgICAgICAgPlxuICAgICAgICAgICAgPGEgaHJlZj1cIiNcIj5cbiAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS1yc3Mtc3F1YXJlXCI+Jm5ic3A7Jm5ic3A7PC9pPlxuICAgICAgICAgICAgICAgIGZlZWRcbiAgICAgICAgICAgIDwvYT5cbiAgICAgICAgPC9saT5cbiAgICBgKVxuICAgIH1cblxuZXhwb3J0IGNvbnN0IHdyaXRlck5hdlZpZXdcbiAgICA9ICgpOiBzdHJpbmcgPT4ge1xuICAgICAgICBjb25zdCBldmVudEhhbmRsZXIgPSBgZmVlZHBhZ2UubmF2VG9QYWdlKCdQT1NUJylgXG4gICAgICAgIHJldHVybiAoYFxuICAgICAgICA8bGkgXG4gICAgICAgICAgICBpZD1cInBvc3ROYXZcIlxuICAgICAgICAgICAgb25jbGljaz1cIiR7ZXZlbnRIYW5kbGVyfVwiIFxuICAgICAgICAgICAgb25tb3VzZWVudGVyPVwidGhpcy5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKVwiIFxuICAgICAgICAgICAgb25tb3VzZW91dD1cInRoaXMuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJylcIlxuICAgICAgICA+XG4gICAgICAgICAgICA8YSBocmVmPVwiI1wiPlxuICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXBlbmNpbC1hbHRcIj4mbmJzcDsmbmJzcDs8L2k+XG4gICAgICAgICAgICAgICAgcG9zdFxuICAgICAgICAgICAgPC9hPlxuICAgICAgICA8L2xpPlxuICAgIGApXG4gICAgfVxuXG5leHBvcnQgY29uc3Qgc2VsZWN0b3JOYXZWaWV3XG4gICAgPSAoKTogc3RyaW5nID0+IHtcblxuICAgICAgICBjb25zdCBldmVudEhhbmRsZXIgPSBgZmVlZHBhZ2UubmF2VG9QYWdlKCdGUklFTkQnKWBcbiAgICAgICAgcmV0dXJuIChgXG4gICAgICAgIDxsaSBcbiAgICAgICAgICAgIGlkPVwiZnJpZW5kTmF2XCJcbiAgICAgICAgICAgIG9uY2xpY2s9XCIke2V2ZW50SGFuZGxlcn1cIiBcbiAgICAgICAgICAgIG9ubW91c2VlbnRlcj1cInRoaXMuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcIiBcbiAgICAgICAgICAgIG9ubW91c2VvdXQ9XCJ0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpXCJcbiAgICAgICAgPlxuICAgICAgICAgICAgPGEgaHJlZj1cIiNcIj5cbiAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS11c2Vyc1wiPiZuYnNwOyZuYnNwOzwvaT5cbiAgICAgICAgICAgICAgICBmcmllbmRzXG4gICAgICAgICAgICA8L2E+XG4gICAgICAgIDwvbGk+XG4gICAgYClcbiAgICB9XG5cbmV4cG9ydCBjb25zdCBsb2dpbk5hdlZpZXdcbiAgICA9ICgpOiBzdHJpbmcgPT4ge1xuXG4gICAgICAgIGNvbnN0IGV2ZW50SGFuZGxlciA9ICdsb2dpbi5zaG93TG9naW5Nb2RhbCgpJ1xuICAgICAgICByZXR1cm4gKGBcbiAgICAgICAgPGxpIFxuICAgICAgICAgICAgaWQ9XCJsb2dpbk5hdlwiXG4gICAgICAgICAgICBvbmNsaWNrPVwiJHtldmVudEhhbmRsZXJ9XCIgXG4gICAgICAgICAgICBvbm1vdXNlZW50ZXI9XCJ0aGlzLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXCIgXG4gICAgICAgICAgICBvbm1vdXNlb3V0PVwidGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVwiXG4gICAgICAgID5cbiAgICAgICAgICAgIDxhIGhyZWY9XCIjXCI+XG4gICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtdXNlci1zbGFzaFwiPiZuYnNwOyZuYnNwOzwvaT5cbiAgICAgICAgICAgICAgICBsb2dpblxuICAgICAgICAgICAgPC9hPlxuICAgICAgICA8L2xpPlxuICAgIGApXG4gICAgfVxuXG5leHBvcnQgY29uc3QgbG9nb3V0TmF2Vmlld1xuICAgID0gKHByb3BzOiBJVXNlcik6IHN0cmluZyA9PiB7XG5cbiAgICAgICAgY29uc3QgbG9nb3V0RXZlbnRIYW5kbGVyID0gYGxvZ2luLnByb2Nlc3NMb2dvdXQoKWBcbiAgICAgICAgcmV0dXJuIChgXG4gICAgICAgIDxsaSBcbiAgICAgICAgICAgIGlkPVwibG9nb3V0TmF2XCJcbiAgICAgICAgICAgIGNsYXNzPVwiZHJvcGRvd25cIiBcbiAgICAgICAgICAgIG9ubW91c2VlbnRlcj1cInRoaXMuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcIiBcbiAgICAgICAgICAgIG9ubW91c2VvdXQ9XCJ0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpXCJcbiAgICAgICAgPlxuICAgICAgICAgICAgPGEgY2xhc3M9XCJkcm9wZG93bi10b2dnbGVcIiBocmVmPVwiI1wiIGRhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIj5cbiAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS11c2VyXCI+Jm5ic3A7Jm5ic3A7PC9pPlxuICAgICAgICAgICAgICAgIGxvZ291dCAoJHtwcm9wcy5uYW1lfSlcbiAgICAgICAgICAgIDwvYT5cblxuICAgICAgICAgICAgPHVsIGNsYXNzPVwiZHJvcGRvd24tbWVudVwiPlxuICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm5hdmJhci1sb2dpblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbGctNFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIGNsYXNzPVwiaWNvbi1zaXplXCIgd2lkdGg9XCI4MFwiIGhlaWdodD1cIjgwXCIgYWx0PVwiMTIweDEyMFwiIHNyYz1cImh0dHBzOi8vYm9vdGRleS5jb20vaW1nL0NvbnRlbnQvYXZhdGFyLyR7cHJvcHMuaW1nfS5wbmdcIi8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLWxnLThcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJ0ZXh0LWxlZnRcIj48c3Ryb25nPiR7cHJvcHMubmFtZX08L3N0cm9uZz48L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwidGV4dC1sZWZ0IHNtYWxsXCI+JHtwcm9wcy5uYW1lLnRvTG93ZXJDYXNlKCl9QGdtYWlsLmNvbTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cImRpdmlkZXJcIj48L2xpPlxuICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm5hdmJhci1sb2dpbiBuYXZiYXItbG9naW4tc2Vzc2lvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbGctMTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZD1cImxvZ291dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJidG4gYnRuLWRhbmdlciBidG4tYmxvY2tcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBocmVmPVwiI1wiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uY2xpY2s9XCIke2xvZ291dEV2ZW50SGFuZGxlcn1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIExvZ291dDwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICA8L3VsPlxuICAgICAgICA8L2xpPlxuICAgIGApXG4gICAgfVxuICAgIC8vIFwiZGV2XCI6IFwibm9kZW1vbiAtZSB0cyAteCAneWFybiBzdG9wICYmIHNsZWVwIDMgJiYgbnB4IGd1bHAgLS1ndWxwZmlsZSAuL2d1bHBmaWxlLmNvbmZpZ3MuanMgJiYgU0VSVkVSX1BPUlQ9MzMzMyB0cy1ub2RlIC4vYmluL3d3dy50cyB8IGJ1bnlhbiAtbyBzaG9ydCdcIiwiLCJpbXBvcnQgeyBJSGFuZGxlciwgSU1vZHVsZSwgSVVzZXIgfSBmcm9tICcuLi8uLi90eXBpbmdzJ1xuaW1wb3J0IHsgc2VsZWN0b3JOYXZWaWV3LCBsb2dpbk5hdlZpZXcsIGxvZ291dE5hdlZpZXcsIHdyaXRlck5hdlZpZXcsIGZlZWRlck5hdlZpZXcgfSBmcm9tICcuL25hdmJhci12aWV3cydcblxuZXhwb3J0IGludGVyZmFjZSBJTmF2YmFyUHJvcHMge1xuICAgIGxvZ2dpblVzZXI/OiBJVXNlclxuICAgIHVzZXJzOiBJVXNlcltdXG59XG5cbmV4cG9ydCBjbGFzcyBOYXZiYXIgaW1wbGVtZW50cyBJTW9kdWxlIHtcbiAgICBwcm9wczogSU5hdmJhclByb3BzXG4gICAgaGFuZGxlcjogSUhhbmRsZXJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wczogSU5hdmJhclByb3BzKSB7XG4gICAgICAgIHRoaXMucHJvcHMgPSBwcm9wc1xuICAgIH1cbiAgICByZW5kZXIoKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgaXNMb2dnaW5lZCA9IHRoaXMucHJvcHMubG9nZ2luVXNlciAmJiAoJ25hbWUnIGluIHRoaXMucHJvcHMubG9nZ2luVXNlcilcbiAgICAgICAgcmV0dXJuIChgXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm5hdmJhciBuYXZiYXItZGVmYXVsdCBuYXZiYXItc3RhdGljLXRvcFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyIGJvb3RzdHJhcCBzbmlwcGV0cyBib290ZGV5XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibmF2YmFyLWhlYWRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJuYXZiYXItdG9nZ2xlXCIgdHlwZT1cImJ1dHRvblwiIGRhdGEtdG9nZ2xlPVwiY29sbGFwc2VcIiBkYXRhLXRhcmdldD1cIi5uYXZiYXItY29sbGFwc2VcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHtbLi4uQXJyYXkoMykua2V5cygpXS5tYXAoXyA9PiAnPHNwYW4gY2xhc3M9XCJpY29uLWJhclwiPjwvc3Bhbj4nKS5qb2luKCcnKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzcz1cIm5hdmJhci1icmFuZFwiIGhyZWY9XCIjXCI+PHN0cm9uZz5GZWVkPC9zdHJvbmc+PC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sbGFwc2UgbmF2YmFyLWNvbGxhcHNlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzPVwibmF2IG5hdmJhci1uYXYgbmF2YmFyLXJpZ2h0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHtpc0xvZ2dpbmVkISA/IFtmZWVkZXJOYXZWaWV3KCkgLHdyaXRlck5hdlZpZXcoKSwgc2VsZWN0b3JOYXZWaWV3KCksXS5qb2luKCcnKSA6ICcnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7IWlzTG9nZ2luZWQhID8gbG9naW5OYXZWaWV3KCkgOiBsb2dvdXROYXZWaWV3KHRoaXMucHJvcHMubG9nZ2luVXNlciEpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICBgKVxuICAgIH1cbn1cblxuIiwiZXhwb3J0IHsgSVNlbGVjdG9yUHJvcHMgfSBmcm9tICcuL3NlbGVjdG9yJ1xuZXhwb3J0IHsgU2VsZWN0b3IgfSBmcm9tICcuL3NlbGVjdG9yJ1xuZXhwb3J0IHsgU2VsZWN0b3JIYW5kbGVyIH0gZnJvbSAnLi9zZWxlY3Rvci1oYW5kbGVycyciLCJpbXBvcnQgeyBJQXBpIH0gZnJvbSAnLi4vLi4vYXBpJ1xuaW1wb3J0IHsgSUhhbmRsZXIsIElTdG9yZSwgSVVzZXIsIElVc2VyQ29tbWFuZFR5cGUgfSBmcm9tICcuLi8uLi90eXBpbmdzJ1xuaW1wb3J0IHsgSVVzZXJRdWVyeVR5cGUgfSBmcm9tICcuLi8uLi90eXBpbmdzL3ZvL3VzZXItcXVlcnktdHlwZSdcbmltcG9ydCB7IHVzZXJQcm9maWxlTW9kYWxWaWV3IH0gZnJvbSAnLi9zZWxlY3Rvci12aWV3cydcblxuZXhwb3J0IGNvbnN0IFNlbGVjdG9ySGFuZGxlclxuICAgID0gKGFwaTogSUFwaSk6IElIYW5kbGVyID0+IHtcblxuICAgICAgICBjb25zdCBtb2R1bGVOYW1lID0gJ1NlbGVjdG9yJ1xuICAgICAgICBsZXQgc3RvcmU6IElTdG9yZVxuXG4gICAgICAgIGNvbnN0IGZvbGxvd1VzZXJcbiAgICAgICAgICAgID0gYXN5bmMgKHV1aWQ6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgIGNsb3NlU2VsZWN0b3JNb2RhbCgpXG4gICAgICAgICAgICAgICAgY29uc3QgeyBGT0xMT1dfRlJJRU5EIH0gPSBJVXNlckNvbW1hbmRUeXBlXG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgYXBpLnB1dFVzZXIoRk9MTE9XX0ZSSUVORCwgdXVpZClcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxvZ2luVXNlciA9IGF3YWl0IGFwaS5nZXRVc2VyKElVc2VyUXVlcnlUeXBlLkxPR0lOX1VTRVJfUFJPRklMRSlcbiAgICAgICAgICAgICAgICAgICAgc3RvcmUuc3RhdGUgPSB7IC4uLnN0b3JlLnN0YXRlLCBsb2dnaW5Vc2VyOiBsb2dpblVzZXIgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgY29uc3QgdW5mb2xsb3dVc2VyXG4gICAgICAgICAgICA9IGFzeW5jICh1dWlkOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICBjbG9zZVNlbGVjdG9yTW9kYWwoKVxuICAgICAgICAgICAgICAgIGNvbnN0IHsgVU5GT0xMT1dfRlJJRU5EIH0gPSBJVXNlckNvbW1hbmRUeXBlXG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgYXBpLnB1dFVzZXIoVU5GT0xMT1dfRlJJRU5ELCB1dWlkKVxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbG9naW5Vc2VyID0gYXdhaXQgYXBpLmdldFVzZXIoSVVzZXJRdWVyeVR5cGUuTE9HSU5fVVNFUl9QUk9GSUxFKVxuICAgICAgICAgICAgICAgICAgICAvLyBzdG9yZS5ub3RpZnkoKVxuICAgICAgICAgICAgICAgICAgICBzdG9yZS5zdGF0ZSA9IHsgLi4uc3RvcmUuc3RhdGUsIGxvZ2dpblVzZXI6IGxvZ2luVXNlciB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICBjb25zdCBzaG93VXNlclByb2ZpbGVcbiAgICAgICAgICAgID0gYXN5bmMgKHByb3BzOiBJVXNlcikgPT4ge1xuICAgICAgICAgICAgICAgIGF3YWl0IHdpbmRvd1snZmVlZHBhZ2UnXS5uYXZUb1BhZ2UoJ0ZSSUVORCcsIHsgc2VsZWN0ZWRVc2VyVWlkOiBwcm9wcy51dWlkfSlcbiAgICAgICAgICAgICAgICBjb25zdCB7IGxvZ2dpblVzZXIgfSA9IHN0b3JlLnN0YXRlXG4gICAgICAgICAgICAgICAgY29uc3Qgd3JhcHBlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1Byb2ZpbGUnKVxuICAgICAgICAgICAgICAgIHdyYXBwZXIhLmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJiZWdpbicsIHVzZXJQcm9maWxlTW9kYWxWaWV3KGxvZ2dpblVzZXIhLCBwcm9wcykpXG4gICAgICAgICAgICAgICAgY29uc3QgbW9kYWxCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b25bZGF0YS10b2dnbGU9XCJtb2RhbFwiXScpIGFzIEhUTUxCdXR0b25FbGVtZW50XG4gICAgICAgICAgICAgICAgbW9kYWxCdXR0b24uY2xpY2soKVxuICAgICAgICAgICAgfVxuICAgICAgICBjb25zdCBzZXRTdG9yZSA9IChfc3RvcmU6IElTdG9yZSkgPT4geyBzdG9yZSA9IF9zdG9yZTsgcmV0dXJuIG51bGwgfVxuICAgICAgICBjb25zdCBjbG9zZVNlbGVjdG9yTW9kYWwgPSAoKSA9PiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uW2RhdGEtZGlzbWlzcz1cIm1vZGFsXCJdJykgYXMgSFRNTEJ1dHRvbkVsZW1lbnQpLmNsaWNrKClcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC8vIHRvZ2dsZSxcbiAgICAgICAgICAgIHNldFN0b3JlLFxuICAgICAgICAgICAgbW9kdWxlTmFtZSxcbiAgICAgICAgICAgIHNob3dVc2VyUHJvZmlsZSxcbiAgICAgICAgICAgIGZvbGxvd1VzZXIsXG4gICAgICAgICAgICB1bmZvbGxvd1VzZXIsXG4gICAgICAgIH1cbiAgICB9XG4iLCJpbXBvcnQgeyBJVXNlciB9IGZyb20gJy4uLy4uL3R5cGluZ3MnXG5pbXBvcnQgeyBJU2VsZWN0b3JQcm9wcyB9IGZyb20gJy4vc2VsZWN0b3InO1xuXG5leHBvcnQgY29uc3Qgc2VsZWN0b3JQYW5lbFZpZXdcbiAgICA9IChwcm9wczogSVNlbGVjdG9yUHJvcHMpOiBzdHJpbmcgPT4ge1xuICAgICAgICBjb25zdCB7IGxvZ2dpblVzZXIsIHVzZXJzIH0gPSBwcm9wc1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICBgPGRpdiBpZD1cInNlbGVjdG9yLXBhbmVsXCIgY2xhc3M9XCJwYW5lbFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBhbmVsLWJvZHlcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wteHMtMTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzPVwiYWNlLXRodW1ibmFpbHMgY2xlYXJmaXhcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAke3VzZXJzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoKHVzZXI6IElVc2VyKSA9PiAodXNlci51dWlkICE9PSBsb2dnaW5Vc2VyIS51dWlkKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hcCgodXNlcjogSVVzZXIpID0+ICh0aHVtYm5haWxWaWV3KGxvZ2dpblVzZXIhLCB1c2VyKSkpLmpvaW4oJycpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+YFxuICAgICAgICApXG4gICAgfVxuXG5leHBvcnQgY29uc3QgdGh1bWJuYWlsVmlld1xuICAgID0gKGxvZ2dpblVzZXI6IElVc2VyLCB1c2VyOiBJVXNlcik6IHN0cmluZyA9PiB7XG5cbiAgICAgICAgY29uc3Qgc2hvd1Byb2ZpbGVFdmVudEhhbmRsZXIgPSBgc2VsZWN0b3Iuc2hvd1VzZXJQcm9maWxlKHsgdXVpZDogJyR7dXNlci51dWlkfScsIG5hbWU6ICcke3VzZXIubmFtZX0nLCBpbWc6ICcke3VzZXIuaW1nfSd9KWBcbiAgICAgICAgY29uc3QgaXNGb2xsb3dlZCA9IGxvZ2dpblVzZXIubGVhZGVycy5pbmNsdWRlcyh1c2VyLnV1aWQpXG4gICAgICAgIHJldHVybiAoYFxuICAgICAgICA8bGkgXG4gICAgICAgICAgICBvbmNsaWNrPVwiJHtzaG93UHJvZmlsZUV2ZW50SGFuZGxlcn1cIiBcbiAgICAgICAgICAgIGRhdGEtdG9nZ2xlPVwidG9vbHRpcFwiIHRpdGxlPVwiXCIgaHJlZj1cIlwiIGRhdGEtb3JpZ2luYWwtdGl0bGU9XCIke3VzZXIubmFtZX1cIiBcbiAgICAgICAgICAgIGlkPVwiJHt1c2VyLnV1aWR9XCIgY2xhc3M9XCIke2lzRm9sbG93ZWQgPyAnZm9sbG93ZWQnIDogJyd9XCI+XG4gICAgICAgICAgICA8YSBjbGFzcz1cImNib3hFbGVtZW50XCIgaHJlZj1cIiNcIiBkYXRhLXJlbD1cImNvbG9yYm94XCI+XG4gICAgICAgICAgICAgICAgPGltZyB3aWR0aD1cIjgwXCIgaGVpZ2h0PVwiODBcIiBhbHQ9XCI4MHg4MFwiIHNyYz1cImltZy8ke3VzZXIuaW1nfS5wbmdcIi8+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHRcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlubmVyXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRhZ3NcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJsYWJlbC1ob2xkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICR7aXNGb2xsb3dlZCA/ICc8c3BhbiBjbGFzcz1cImxhYmVsIGxhYmVsLXByaW1hcnlcIj5mb2xsb3c8L3NwYW4+JyA6ICcnfVxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2E+XG4gICAgICAgIDwvbGk+XG4gICAgYClcbiAgICB9XG5cbmV4cG9ydCBjb25zdCB1c2VyUHJvZmlsZU1vZGFsVmlld1xuICAgID0gKGxvZ2dpblVzZXI6IElVc2VyLCB1c2VyOiBJVXNlcik6IHN0cmluZyA9PiB7XG5cbiAgICAgICAgY29uc3QgeyB1dWlkLCBpbWcsIG5hbWUgfSA9IHVzZXJcbiAgICAgICAgY29uc3QgaXNGb2xsb3dlZCA9IGxvZ2dpblVzZXIubGVhZGVycy5pbmNsdWRlcyh1c2VyLnV1aWQpXG4gICAgICAgIGNvbnN0IGNsaWNrRXZlbnRIYW5kbGVyID0gYGNvbnNvbGUubG9nKCcke3V1aWR9Jyk7c2VsZWN0b3IuJHtpc0ZvbGxvd2VkID8gJ3VuJyA6ICcnfWZvbGxvd1VzZXIoJyR7dXVpZH0nKWBcbiAgICAgICAgY29uc3Qgb25Nb3VzZUVudGVySGFuZGxlciA9IGAkeyFpc0ZvbGxvd2VkID8gXCJ0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ2J0bi1saWdodCcpO3RoaXMuY2xhc3NMaXN0LmFkZCgnYnRuLXByaW1hcnknKVwiIDogXCJcIn1gXG4gICAgICAgIGNvbnN0IG9uTW91c2VMZWF2ZUhhbmRsZXIgPSBgJHshaXNGb2xsb3dlZCA/IFwidGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdidG4tcHJpbWFyeScpO3RoaXMuY2xhc3NMaXN0LmFkZCgnYnRuLWxpZ2h0JylcIiA6IFwidGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdidG4tbGlnaHQnKTt0aGlzLmNsYXNzTGlzdC5hZGQoJ2J0bi1wcmltYXJ5JylcIn1gXG4gICAgICAgIHJldHVybiAoYFxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSBoaWRkZW5cIiBkYXRhLXRvZ2dsZT1cIm1vZGFsXCIgZGF0YS10YXJnZXQ9XCIjcHJvZmlsZU1vZGFsXCI+XG4gICAgICAgICAgICBvcGVuIG1vZGFsXG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwgZmFkZVwiIGlkPVwicHJvZmlsZU1vZGFsXCIgdGFiaW5kZXg9XCItMVwiIHJvbGU9XCJkaWFsb2dcIiBhcmlhLWxhYmVsbGVkYnk9XCJleGFtcGxlTW9kYWxMYWJlbFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWRpYWxvZ1wiIHJvbGU9XCJkb2N1bWVudFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxoNSBjbGFzcz1cIm1vZGFsLXRpdGxlXCIgaWQ9XCJleGFtcGxlTW9kYWxMYWJlbFwiPjwvaDU+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImNsb3NlXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIiBhcmlhLWxhYmVsPVwiQ2xvc2VcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiZ0aW1lczs8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1ib2R5XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtcGFnZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZCBwcm9maWxlLWhlYWRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1sZy00IGNvbC1tZC00IGNvbC02XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtaW1hZ2UgZmxvYXQtbWQtcmlnaHRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCJpbWcvJHtpbWd9LnBuZ1wiIGFsdD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1sZy04IGNvbC1tZC04IGNvbC02XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzPVwibS10LTAgbS1iLTBcIj48c3Ryb25nPiR7bmFtZX08L3N0cm9uZz48L2g0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiam9iX3Bvc3RcIj5VaSBVWCBEZXNpZ25lcjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD43OTUgRm9sc29tIEF2ZSwgU3VpdGUgNjAwIFNhbiBGcmFuY2lzY28sIENBREdFIDk0MTA3PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbm1vdXNlZW50ZXI9XCIke29uTW91c2VFbnRlckhhbmRsZXJ9OyR7aXNGb2xsb3dlZCA/IFwiKHRoaXMuaW5uZXJUZXh0ID0gJ1VuZm9sbG93JylcIiA6ICcnfVwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbm1vdXNlbGVhdmU9XCIke29uTW91c2VMZWF2ZUhhbmRsZXJ9OyR7aXNGb2xsb3dlZCA/IFwiKHRoaXMuaW5uZXJUZXh0ID0gJ0ZvbGxvdycpXCIgOiAnJ31cIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJidG4gJHtpc0ZvbGxvd2VkID8gJ2J0bi1wcmltYXJ5JyA6ICdidG4tbGlnaHQnfSAnYnRuLXJvdW5kJ1wiIGlkPVwiZm9sbG93XCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uY2xpY2s9JHtjbGlja0V2ZW50SGFuZGxlcn0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRm9sbG93XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25tb3VzZWVudGVyPVwidGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdidG4tbGlnaHQnKTt0aGlzLmNsYXNzTGlzdC5hZGQoJ2J0bi1wcmltYXJ5JylcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25tb3VzZWxlYXZlPVwidGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdidG4tcHJpbWFyeScpO3RoaXMuY2xhc3NMaXN0LmFkZCgnYnRuLWxpZ2h0JylcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJidG4gYnRuLWxpZ2h0IGJ0bi1yb3VuZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1lc3NhZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJzb2NpYWwtaWNvbiBtLXQtNSBtLWItMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIHRpdGxlPVwiVHdpdHRlclwiIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMCk7XCI+PGkgY2xhc3M9XCJmYWIgZmEtdHdpdHRlclwiPjwvaT48L2E+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgdGl0bGU9XCJGYWNlYm9va1wiIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMCk7XCI+PGkgY2xhc3M9XCJmYWIgZmEtZmFjZWJvb2tcIj48L2k+PC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIHRpdGxlPVwiR29vZ2xlLXBsdXNcIiBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApO1wiPjxpIGNsYXNzPVwiZmFiIGZhLWdvb2dsZS1wbHVzXCI+PC9pPjwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSB0aXRsZT1cIkJlaGFuY2VcIiBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApO1wiPjxpIGNsYXNzPVwiZmFiIGZhLWJlaGFuY2VcIj48L2k+PC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIHRpdGxlPVwiSW5zdGFncmFtXCIgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKTtcIj48aSBjbGFzcz1cImZhYiBmYS1pbnN0YWdyYW1cIj48L2k+PC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWZvb3RlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXNlY29uZGFyeVwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+Q2xvc2U8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgYClcbiAgICB9XG4iLCJpbXBvcnQgeyBJSGFuZGxlciwgSU1vZHVsZSwgSVVzZXIgfSBmcm9tICcuLi8uLi90eXBpbmdzJ1xuaW1wb3J0IHsgc2VsZWN0b3JQYW5lbFZpZXcgfSBmcm9tICcuL3NlbGVjdG9yLXZpZXdzJ1xuXG5leHBvcnQgaW50ZXJmYWNlIElTZWxlY3RvclByb3BzIHtcbiAgICBsb2dnaW5Vc2VyPzogSVVzZXJcbiAgICB1c2VyczogSVVzZXJbXVxufVxuXG5leHBvcnQgY2xhc3MgU2VsZWN0b3IgaW1wbGVtZW50cyBJTW9kdWxlIHtcbiAgICBwcm9wczogSVNlbGVjdG9yUHJvcHNcbiAgICBoYW5kbGVyOiBJSGFuZGxlclxuXG4gICAgY29uc3RydWN0b3IocHJvcHM6IElTZWxlY3RvclByb3BzKSB7XG4gICAgICAgIHRoaXMucHJvcHMgPSBwcm9wc1xuICAgIH1cblxuICAgIHJlbmRlcigpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBpc1VzZXJMaXN0TG9hZGVkID0gKHRoaXMucHJvcHMudXNlcnMgIT09IHVuZGVmaW5lZClcbiAgICAgICAgY29uc3QgaXNMb2dnaW5lZCA9ICh0aGlzLnByb3BzLmxvZ2dpblVzZXIgIT09IHVuZGVmaW5lZClcblxuICAgICAgICBpZiAoaXNVc2VyTGlzdExvYWRlZCAmJiBpc0xvZ2dpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gKGBcbiAgICAgICAgICAgICAgICAke3NlbGVjdG9yUGFuZWxWaWV3KHRoaXMucHJvcHMpfVxuICAgICAgICAgICAgICAgIDxQcm9maWxlPjwvUHJvZmlsZT5cbiAgICAgICAgICAgIGApXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgIHJldHVybiAoJycpXG4gICAgICAgIH1cbiAgICB9XG59IiwiZXhwb3J0IHsgSVdyaXRlclByb3BzIH0gZnJvbSAnLi93cml0ZXInXG5leHBvcnQgeyBXcml0ZXIgfSBmcm9tICcuL3dyaXRlcidcbmV4cG9ydCB7IFdyaXRlckhhbmRsZXIgfSBmcm9tICcuL3dyaXRlci5oYW5kbGVycyciLCJpbXBvcnQgeyBJQXBpIH0gZnJvbSAnLi4vLi4vYXBpJ1xuaW1wb3J0IHsgSUhhbmRsZXIsIElTdG9yZSB9IGZyb20gJy4uLy4uL3R5cGluZ3MnXG5cbmV4cG9ydCBjb25zdCBXcml0ZXJIYW5kbGVyXG4gICAgPSAoYXBpOiBJQXBpKTogSUhhbmRsZXIgPT4ge1xuXG4gICAgICAgIGNvbnN0IG1vZHVsZU5hbWUgPSAnV3JpdGVyJ1xuICAgICAgICBsZXQgc3RvcmU6IElTdG9yZVxuICAgICAgICBjb25zdCBzZXRTdG9yZSA9IChfc3RvcmU6IElTdG9yZSkgPT4geyBzdG9yZSA9IF9zdG9yZTsgcmV0dXJuIG51bGwgfVxuXG4gICAgICAgIGNvbnN0IHBvc3RGZWVkXG4gICAgICAgICAgICA9IGFzeW5jIChmb3JtOiBIVE1MRm9ybUVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBtc2cgPSBmb3JtLmVsZW1lbnRzWydtc2cnXS52YWx1ZVxuICAgICAgICAgICAgICAgIGNvbnN0IGZlZWRzID0gYXdhaXQgYXBpLnBvc3RGZWVkKG1zZylcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdTdGF0ZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgLi4uc3RvcmUuc3RhdGUsIC4uLnsgY29tbWVudHM6IFsuLi5mZWVkc10gfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzdG9yZS5zdGF0ZSA9IHsgLi4uc3RvcmUuc3RhdGUsIC4uLm5ld1N0YXRlIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcG9zdEZlZWQsXG4gICAgICAgICAgICBzZXRTdG9yZSxcbiAgICAgICAgICAgIG1vZHVsZU5hbWUsXG4gICAgICAgIH1cbiAgICB9IiwiaW1wb3J0IHsgSUhhbmRsZXIsIElNb2R1bGUsIElVc2VyIH0gZnJvbSAnLi4vLi4vdHlwaW5ncydcbmltcG9ydCB7IHdyaXRlclBhbmVsVmlldyB9IGZyb20gJy4vd3JpdGVyLnZpZXdzJ1xuXG5leHBvcnQgaW50ZXJmYWNlIElXcml0ZXJQcm9wcyB7XG4gICAgbG9nZ2luVXNlcj86IElVc2VyXG4gICAgdXNlcnM6IElVc2VyW11cbn1cblxuZXhwb3J0IGNsYXNzIFdyaXRlciBpbXBsZW1lbnRzIElNb2R1bGUge1xuICAgIHByb3BzOiBJV3JpdGVyUHJvcHNcbiAgICBoYW5kbGVyOiBJSGFuZGxlclxuXG4gICAgY29uc3RydWN0b3IocHJvcHM6IElXcml0ZXJQcm9wcykge1xuICAgICAgICB0aGlzLnByb3BzID0gcHJvcHNcbiAgICB9XG4gICAgcmVuZGVyKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiAoYFxuICAgICAgICAgICAgJHt3cml0ZXJQYW5lbFZpZXcodGhpcy5wcm9wcyl9XG4gICAgICAgIGApXG4gICAgfVxufSIsImltcG9ydCB7IElXcml0ZXJQcm9wcyB9IGZyb20gJy4vd3JpdGVyJ1xuXG5leHBvcnQgY29uc3Qgd3JpdGVyUGFuZWxWaWV3XG4gICAgLy8gPSAodXNlcjogSVVzZXIsIHVzZXJzOiBJVXNlcltdKTogc3RyaW5nID0+IHtcbiAgICA9IChwcm9wczogSVdyaXRlclByb3BzKTogc3RyaW5nID0+IHtcbiAgICAgICAgY29uc3QgeyBpbWcsIG5hbWUsIGRldmljZSwgZGV2aWNlSWNvbiwgbGVhZGVycyB9ID0gcHJvcHMubG9nZ2luVXNlciFcbiAgICAgICAgY29uc3QgeyB1c2VycyB9PSBwcm9wc1xuICAgICAgICBjb25zdCBmcmllbmRzID0gdXNlcnMuZmlsdGVyKHUgPT4gbGVhZGVycy5pbmNsdWRlcyh1LnV1aWQpKVxuXG4gICAgICAgIGNvbnN0IHBvc3RGZWVkID0gYHdyaXRlci5wb3N0RmVlZChkb2N1bWVudC5mb3Jtc1snZmVlZGZvcm0nXSlgXG5cbiAgICAgICAgcmV0dXJuIChgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJwYW5lbFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBhbmVsLWJvZHlcIj5cbiAgICAgICAgICAgICAgICA8YSBjbGFzcz1cIm1lZGlhLWxlZnRcIiBocmVmPVwiI1wiPlxuICAgICAgICAgICAgICAgICAgICA8aW1nIGNsYXNzPVwiaW1nLWNpcmNsZSBpbWctbWRcIiBhbHQ9XCJQcm9maWxlIFBpY3R1cmVcIiBzcmM9XCJpbWcvJHtpbWd9LnBuZ1wiLz5cbiAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1lZGlhLWJvZHlcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1hci1idG1cIj48YSBjbGFzcz1cImJ0bi1saW5rIHRleHQtc2VtaWJvbGQgbWVkaWEtaGVhZGluZyBib3gtaW5saW5lXCIgaHJlZj1cIiNcIj4ke25hbWV9PC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJ0ZXh0LW11dGVkIHRleHQtc21cIj48aSBjbGFzcz1cImZhICR7ZGV2aWNlSWNvbn0gZmEtbGdcIj48L2k+IC0gRnJvbSAke2RldmljZX08L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtZWRpYS1ib2R5XCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbGctMTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaW1hZ2UtbGlzdCBtLXQtMjBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAke2ZyaWVuZHMubWFwKGYgPT4gYFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiaW1nLXRodW1ibmFpbCBpbWctY2lyY2xlIGltZy14c1wiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNyYz1cImltZy8ke2YuaW1nfS5wbmdcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbHQ9XCJ1c2VyXCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg9XCI1MFwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGApLmpvaW4oJycpfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8aHIvPlxuICAgICAgICAgICAgICAgIDxmb3JtIG5hbWU9XCJmZWVkZm9ybVwiPlxuICAgICAgICAgICAgICAgICAgICA8dGV4dGFyZWEgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBuYW1lPVwibXNnXCIgaWQ9XCJtc2dcIiByb3dzPVwiMlwiIHBsYWNlaG9sZGVyPVwiV2hhdCBhcmUgeW91IHRoaW5raW5nP1wiPjwvdGV4dGFyZWE+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgbmFtZT1cImFjY2Vzc190b2tlblwiIGlkPVwiYWNjZXNzX3Rva2VuXCIgdmFsdWU9XCIjYWNjZXNzX3Rva2VuXCIvPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibWFyLXRvcCBjbGVhcmZpeFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbmNsaWNrPVwiJHtwb3N0RmVlZH1cIiBjbGFzcz1cImJ0biBidG4tc20gYnRuLXByaW1hcnkgcHVsbC1yaWdodFwiIHR5cGU9XCJidXR0b25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS1wZW5jaWwtYWx0IGZhLWZ3XCI+PC9pPiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBQdWJsaXNoXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzPVwiYnRuIGJ0bi10cmFucyBidG4taWNvbiBmYXMgZmEtdmlkZW8gYWRkLXRvb2x0aXBcIiBocmVmPVwiI1wiPjwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzPVwiYnRuIGJ0bi10cmFucyBidG4taWNvbiBmYXMgZmEtY2FtZXJhIGFkZC10b29sdGlwXCIgaHJlZj1cIiNcIj48L2E+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzcz1cImJ0biBidG4tdHJhbnMgYnRuLWljb24gZmFzIGZhLWZpbGUgYWRkLXRvb2x0aXBcIiBocmVmPVwiI1wiPjwvYT5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICBgKVxuICAgIH0iLCJpbXBvcnQgJy4vdHlwaW5ncy9nbG9iYWwnXG5pbXBvcnQgeyBhcHAgfSBmcm9tICcuL2FwcCdcbmltcG9ydCB7IENyZWF0ZUFwaSB9IGZyb20gJy4vYXBpJ1xuaW1wb3J0IHsgZmV0Y2hDb25maWcgfSBmcm9tICcuL2FwaS9mZXRjaC5jb25maWcnXG5pbXBvcnQgeyBwcm9wcywgc3RvcmUgfSBmcm9tICcuL3N0b3JlJ1xuXG5pbXBvcnQgeyBOYXZiYXIgfSBmcm9tICcuL2NvbXBvbmVudHMnXG5pbXBvcnQgeyBTZWxlY3RvciB9IGZyb20gJy4vY29tcG9uZW50cydcbmltcG9ydCB7IEZlZWRlciB9IGZyb20gJy4vY29tcG9uZW50cydcbmltcG9ydCB7IFdyaXRlciB9IGZyb20gJy4vY29tcG9uZW50cydcbmltcG9ydCB7IExvZ2luIH0gZnJvbSAnLi9jb21wb25lbnRzJ1xuaW1wb3J0IHsgRmVlZFBhZ2UgfSBmcm9tICcuL3BhZ2UnXG5cbmltcG9ydCB7IFNlbGVjdG9ySGFuZGxlciB9IGZyb20gJy4vY29tcG9uZW50cydcbmltcG9ydCB7IFdyaXRlckhhbmRsZXIgfSBmcm9tICcuL2NvbXBvbmVudHMnXG5pbXBvcnQgeyBGZWVkZXJIYW5kbGVyIH0gZnJvbSAnLi9jb21wb25lbnRzJ1xuaW1wb3J0IHsgTG9naW5IYW5kbGVyIH0gZnJvbSAnLi9jb21wb25lbnRzJ1xuaW1wb3J0IHsgRmVlZFBhZ2VIYW5kbGVyIH0gZnJvbSAnLi9wYWdlJ1xuXG52b2lkIChhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgeyBiYXNlVXJsIH0gPSBhd2FpdCAoYXdhaXQgZmV0Y2goJy9iYXNldXJsJykpLmpzb24oKVxuICAgIGNvbnN0IGFwaSA9IENyZWF0ZUFwaShmZXRjaENvbmZpZywgYmFzZVVybClcblxuICAgIHZvaWQgYXBwXG4gICAgICAgIC5pbmplY3RBcGkoYXBpKVxuICAgICAgICAuaW5qZWN0U3RvcmUoc3RvcmUsIHByb3BzKVxuICAgICAgICAuaW5qZWN0TW9kdWxlcyhbXG4gICAgICAgICAgICBOYXZiYXIsXG4gICAgICAgICAgICBMb2dpbixcbiAgICAgICAgICAgIEZlZWRlcixcbiAgICAgICAgICAgIFNlbGVjdG9yLFxuICAgICAgICAgICAgV3JpdGVyLFxuICAgICAgICBdKVxuICAgICAgICAuaW5qZWN0SGFuZGxlcnMoW1xuICAgICAgICAgICAgTG9naW5IYW5kbGVyLFxuICAgICAgICAgICAgRmVlZGVySGFuZGxlcixcbiAgICAgICAgICAgIFNlbGVjdG9ySGFuZGxlcixcbiAgICAgICAgICAgIFdyaXRlckhhbmRsZXIsXG4gICAgICAgIF0pXG4gICAgICAgIC5pbmplY3RQYWdlQW5kTG9hZEhhbmRsZXIoW1xuICAgICAgICAgICAgRmVlZFBhZ2UsIEZlZWRQYWdlSGFuZGxlclxuICAgICAgICBdKVxuICAgICAgICAuc3RhcnQoKVxufSkoKVxuXG5cbi8vIGNvbnN0IGNvbmZpZyA9IGF3YWl0IChhd2FpdCBmZXRjaCgnLi9jb25maWcuanNvbicpKS5qc29uKClcbi8vIGNvbnN0IGNvbmZpZyA9IHtcbi8vICAgICBcImZlZWRcIjoge1xuLy8gICAgICAgICBcImJhc2VVcmxcIjogXCJodHRwOi8vbG9jYWxob3N0OjgwMDBcIlxuLy8gICAgIH0sXG4vLyAgICAgXCJhdXRoXCI6IHtcbi8vICAgICAgICAgXCJiYXNlVXJsXCI6IFwiaHR0cDovL2xvY2FsaG9zdDo4MDAwXCJcbi8vICAgICB9LFxuLy8gICAgIFwiR0VUXCI6IHtcbi8vICAgICAgICAgXCJtZXRob2RcIjogXCJHRVRcIixcbi8vICAgICAgICAgXCJjcmVkZW50aWFsc1wiOiBcImluY2x1ZGVcIixcbi8vICAgICAgICAgXCJoZWFkZXJzXCI6IHtcbi8vICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4vLyAgICAgICAgIH1cbi8vICAgICB9LFxuLy8gICAgIFwiUE9TVFwiOiB7XG4vLyAgICAgICAgIFwibWV0aG9kXCI6IFwiUE9TVFwiLFxuLy8gICAgICAgICBcImNyZWRlbnRpYWxzXCI6IFwiaW5jbHVkZVwiLFxuLy8gICAgICAgICBcImhlYWRlcnNcIjoge1xuLy8gICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIlxuLy8gICAgICAgICB9XG4vLyAgICAgfSxcbi8vICAgICBcIlBVVFwiOiB7XG4vLyAgICAgICAgIFwibWV0aG9kXCI6IFwiUFVUXCIsXG4vLyAgICAgICAgIFwibW9kZVwiOiBcImNvcnNcIixcbi8vICAgICAgICAgXCJjcmVkZW50aWFsc1wiOiBcImluY2x1ZGVcIixcbi8vICAgICAgICAgXCJoZWFkZXJzXCI6IHtcbi8vICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4vLyAgICAgICAgIH1cbi8vICAgICB9XG4vLyB9XG4vLyBjb25zdCBhcGkgPSBDcmVhdGVBcGkoY29uZmlnKVxuIiwiZXhwb3J0IHsgRmVlZFBhZ2UgfSBmcm9tICcuL3BhZ2UnXG5leHBvcnQgeyBGZWVkUGFnZUhhbmRsZXIgfSBmcm9tICcuL3BhZ2UtaGFuZGxlcnMnIiwiaW1wb3J0IHsgSUFwaSB9IGZyb20gXCIuLi9hcGlcIlxuaW1wb3J0IHsgSUFwcCwgSUZlZWQsIElGZWVkUXVlcnlUeXBlLCBJUGFnZUhhbmRsZXIsIElTdG9yZSwgSVVzZXIgfSBmcm9tIFwiLi4vdHlwaW5nc1wiXG5pbXBvcnQgeyBpVXNlclF1ZXJ5TWFwLCBJVXNlclF1ZXJ5VHlwZSB9IGZyb20gXCIuLi90eXBpbmdzL3ZvL3VzZXItcXVlcnktdHlwZVwiXG5cbmV4cG9ydCBjb25zdCBGZWVkUGFnZUhhbmRsZXJcbiAgICA9IChhcGk6IElBcGkpOiBJUGFnZUhhbmRsZXIgPT4ge1xuICAgICAgICBjb25zdCBtb2R1bGVOYW1lID0gJ2ZlZWRwYWdlJ1xuICAgICAgICBsZXQgYXBwOiBJQXBwXG4gICAgICAgIGxldCBzdG9yZTogSVN0b3JlXG5cbiAgICAgICAgY29uc3Qgc2V0U3RvcmUgPSAoX3N0b3JlOiBJU3RvcmUpID0+IHtcbiAgICAgICAgICAgIHN0b3JlID0gX3N0b3JlXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzZXRBcHAgPSAoX2FwcDogSUFwcCkgPT4ge1xuICAgICAgICAgICAgYXBwID0gX2FwcFxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG5hdlRvUGFnZSA9IGFzeW5jIChwYWdlOiBzdHJpbmcsIG1vZGVsPzogYW55KTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgICAgICAgICBjb25zdCB7IExPR0lOX1VTRVJfUkVDRU5UX1BPU1RTLCBMT0dJTl9VU0VSX1VOUkVBRF9GRUVEUywgU0VMRUNUX1VTRVJfUkVDRU5UX1BPU1RTIH0gPSBJRmVlZFF1ZXJ5VHlwZVxuICAgICAgICAgICAgbGV0IHNlbGVjdGVkOiBzdHJpbmdbXVxuICAgICAgICAgICAgbGV0IGZlZWRzOiBJRmVlZFtdXG4gICAgICAgICAgICBsZXQgdXNlcnM6IElVc2VyW11cbiAgICAgICAgICAgIGxldCBsb2dnaW5Vc2VyOiBJVXNlciB8IHVuZGVmaW5lZFxuXG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWRVc2VyVWlkOiBzdHJpbmcgXG4gICAgICAgICAgICBzd2l0Y2ggKHBhZ2UpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdIT01FJzpcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQgPSBbJ2xvZ2luJ11cbiAgICAgICAgICAgICAgICAgICAgdXNlcnMgPSBhd2FpdCBhcGkuZ2V0VXNlcnMoKVxuICAgICAgICAgICAgICAgICAgICBpZihhd2FpdCBhcGkubG9naW4oKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9nZ2luVXNlciA9IGF3YWl0IGFwaS5nZXRVc2VyKElVc2VyUXVlcnlUeXBlLkxPR0lOX1VTRVJfUFJPRklMRSlcbiAgICAgICAgICAgICAgICAgICAgfSBcbiAgICAgICAgICAgICAgICAgICAgc3RvcmUuc3RhdGUgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5zdG9yZS5zdGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyczogdXNlcnMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9nZ2luVXNlcjogbG9nZ2luVXNlclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgY2FzZSAnRkVFRFMnOlxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZCA9IFsnbG9naW4nLCAnZmVlZGVyJ11cbiAgICAgICAgICAgICAgICAgICAgZmVlZHMgPSBhd2FpdCBhcGkuZ2V0RmVlZHMoTE9HSU5fVVNFUl9VTlJFQURfRkVFRFMpXG4gICAgICAgICAgICAgICAgICAgIHN0b3JlLnN0YXRlID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgLi4uc3RvcmUuc3RhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmVlZHM6IGZlZWRzXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICBjYXNlICdQT1NUJzpcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQgPSBbJ2xvZ2luJywgJ3dyaXRlcicsICdmZWVkZXInXVxuICAgICAgICAgICAgICAgICAgICBmZWVkcyA9IGF3YWl0IGFwaS5nZXRGZWVkcyhMT0dJTl9VU0VSX1JFQ0VOVF9QT1NUUylcbiAgICAgICAgICAgICAgICAgICAgc3RvcmUuc3RhdGUgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5zdG9yZS5zdGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmZWVkczogZmVlZHNcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgIGNhc2UgJ0ZSSUVORCc6XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkID0gWydsb2dpbicsICdzZWxlY3RvcicsICdmZWVkZXInXVxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZFVzZXJVaWQgPSAobW9kZWwgPyBtb2RlbC5zZWxlY3RlZFVzZXJVaWQgOiBzdG9yZS5zdGF0ZS51c2Vyc1sxXS51dWlkKVxuICAgICAgICAgICAgICAgICAgICBmZWVkcyA9IGF3YWl0IGFwaS5nZXRGZWVkcyhTRUxFQ1RfVVNFUl9SRUNFTlRfUE9TVFMsIHNlbGVjdGVkVXNlclVpZClcbiAgICAgICAgICAgICAgICAgICAgc3RvcmUuc3RhdGUgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5zdG9yZS5zdGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmZWVkczogZmVlZHNcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVha1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnTE9HT1VUJzogXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkID0gWydsb2dpbiddXG4gICAgICAgICAgICAgICAgICAgIHN0b3JlLnN0YXRlID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgLi4uc3RvcmUuc3RhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9nZ2luVXNlcjogdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcblxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkID0gWydsb2dpbiddXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhcHAuc2VsZWN0TW9kdWxlcyhzZWxlY3RlZClcbiAgICAgICAgICAgIGFwcC5yZW5kZXIoKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBtb2R1bGVOYW1lLFxuICAgICAgICAgICAgbmF2VG9QYWdlLFxuICAgICAgICAgICAgc2V0QXBwLFxuICAgICAgICAgICAgc2V0U3RvcmVcbiAgICAgICAgfVxuICAgIH1cbiIsImltcG9ydCB7IElIYW5kbGVyLCBJTW9kdWxlIH0gZnJvbSAnLi4vdHlwaW5ncydcblxuZXhwb3J0IGNsYXNzIEZlZWRQYWdlIGltcGxlbWVudHMgSU1vZHVsZSB7XG4gICAgcHJvcHM6IHN0cmluZ1tdXG4gICAgaGFuZGxlcjogSUhhbmRsZXJcbiAgICBjb21wb25lbnRzOiBNYXA8c3RyaW5nLCBzdHJpbmc+XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm9wczogc3RyaW5nW10pIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnRzID0gbmV3IE1hcChbXG4gICAgICAgICAgICBbJ2xvZ2luJywgJzxMb2dpbj48L0xvZ2luPiddLCBcbiAgICAgICAgICAgIFsnc2VsZWN0b3InLCAnPFNlbGVjdG9yPjwvU2VsZWN0b3I+J10sIFxuICAgICAgICAgICAgWyd3cml0ZXInLCAnPFdyaXRlcj48L1dyaXRlcj4nXSwgXG4gICAgICAgICAgICBbJ2ZlZWRlcicsICc8RmVlZGVyPjwvRmVlZGVyPiddXG4gICAgICAgIF0pXG4gICAgICAgIHRoaXMucHJvcHMgPSBwcm9wc1xuICAgIH1cblxuICAgIHJlbmRlcigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gKGBcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPE5hdmJhcj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyIGJvb3RkZXlcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC0xMiBib290c3RyYXAgc25pcHBldHNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICR7dGhpcy5wcm9wcy5tYXAoa2V5ID0+IHRoaXMuY29tcG9uZW50cy5nZXQoa2V5KSkuam9pbignXFxuJyl9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIGApXG4gICAgfVxufVxuXG4iLCJpbXBvcnQgeyBJU3RvcmUgfSBmcm9tICcuLi90eXBpbmdzJ1xuaW1wb3J0IHsgSUZlZWRQYWdlTW9kdWxlU3RhdGUgYXMgSUZlZWRQYWdlTW9kdWxlUHJvcHMgfSBmcm9tICcuLi90eXBpbmdzJ1xuXG5leHBvcnQgY29uc3Qgc3RvcmU6IElTdG9yZVxuICAgID0gKCgpID0+IHtcbiAgICAgICAgY29uc3QgbGlzdGVuZXJzOiB7IGxvYWRNb2R1bGVzOiAoKSA9PiB2b2lkLCByZW5kZXI6ICgpID0+IHZvaWQgfVtdID0gW11cbiAgICAgICAgY29uc3Qgbm90aWZ5ID0gKCkgPT4ge1xuICAgICAgICAgICAgbGlzdGVuZXJzLmZvckVhY2goKGwpID0+IHtcbiAgICAgICAgICAgICAgICBsLmxvYWRNb2R1bGVzKClcbiAgICAgICAgICAgICAgICBsLnJlbmRlcigpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIGxldCBzdGF0ZTogYW55XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBsaXN0ZW5lcnMsXG4gICAgICAgICAgICBub3RpZnksXG4gICAgICAgICAgICBzdGF0ZVxuICAgICAgICB9XG4gICAgfSkoKVxuXG5leHBvcnQgY29uc3QgcHJvcHM6IElGZWVkUGFnZU1vZHVsZVByb3BzXG4gICAgPSB7XG4gICAgbG9naW46IHtcbiAgICAgICAgbG9nZ2luVXNlcjogdW5kZWZpbmVkLFxuICAgICAgICB1c2VyczogW10sXG4gICAgfSxcbiAgICBuYXZiYXI6IHtcbiAgICAgICAgbG9nZ2luVXNlcjogdW5kZWZpbmVkLFxuICAgICAgICB1c2VyczogW11cbiAgICB9LFxuICAgIHNlbGVjdG9yOiB7XG4gICAgICAgIGxvZ2dpblVzZXI6IHVuZGVmaW5lZCxcbiAgICAgICAgdXNlcnM6IFtdXG4gICAgfSxcbiAgICBmZWVkZXI6IHtcbiAgICAgICAgbG9nZ2luVXNlcjogdW5kZWZpbmVkLFxuICAgICAgICB1c2VyczogW10sXG4gICAgICAgIGZlZWRzOiBbXSxcbiAgICB9LFxuICAgIHdyaXRlcjoge1xuICAgICAgICBsb2dnaW5Vc2VyOiB1bmRlZmluZWQsXG4gICAgICAgIHVzZXJzOiBbXVxuICAgIH1cbn0iLCJleHBvcnQgeyBJRmVlZFF1ZXJ5VHlwZSB9IGZyb20gJy4vdm8vZmVlZC1xdWVyeS10eXBlJ1xuZXhwb3J0IHsgSVVzZXJUeXBlIH0gZnJvbSAnLi92by9mZWVkLXF1ZXJ5LXR5cGUnXG5leHBvcnQgeyBpRmVlZFF1ZXJ5TWFwIH0gZnJvbSAnLi92by9mZWVkLXF1ZXJ5LXR5cGUnXG5cbmV4cG9ydCB7IElVc2VyQ29tbWFuZFR5cGUgfSBmcm9tICcuL3ZvL3VzZXItY29tbWFuZC10eXBlJ1xuZXhwb3J0IHsgaVVzZXJDb21tYW5kTWFwIH0gZnJvbSAnLi92by91c2VyLWNvbW1hbmQtdHlwZSdcblxuZXhwb3J0IHsgSUFwcCB9IGZyb20gJy4vYXBwbGljYXRpb24nXG5leHBvcnQgeyBJSGFuZGxlciB9IGZyb20gJy4vYXBwbGljYXRpb24nXG5leHBvcnQgeyBJTW9kdWxlIH0gZnJvbSAnLi9hcHBsaWNhdGlvbidcbmV4cG9ydCB7IElQYWdlSGFuZGxlciB9IGZyb20gJy4vYXBwbGljYXRpb24nXG5leHBvcnQgeyBJU3RvcmUgfSBmcm9tICcuL2FwcGxpY2F0aW9uJ1xuZXhwb3J0IHsgSVN0b3JlU3RhdGUgfSBmcm9tICcuL2FwcGxpY2F0aW9uJ1xuZXhwb3J0IHsgSUZldGNoQ29uZmlnIH0gZnJvbSAnLi9hcHBsaWNhdGlvbidcblxuZXhwb3J0IHsgSUZlZWQgfSBmcm9tICcuL2VudGl0aWVzJ1xuZXhwb3J0IHsgSVVzZXIgfSBmcm9tICcuL2VudGl0aWVzJ1xuXG5leHBvcnQgeyBJRmVlZFBhZ2VNb2R1bGVTdGF0ZSB9IGZyb20gJy4vcHJvcHMtc3RhdGVzJ1xuZXhwb3J0IHsgSUZlZWRTdGF0ZSB9IGZyb20gJy4vcHJvcHMtc3RhdGVzJ1xuXG4iLCJleHBvcnQgZW51bSBJVXNlclR5cGUge1xuICAgIExPR0lOX1VTRVIgPSAnbG9naW5fdXNlcicsXG4gICAgU0VMRUNUX1VTRVIgPSAnc2VsZWN0X3VzZXInXG59XG5cbmV4cG9ydCBlbnVtIElGZWVkUXVlcnlUeXBlIHtcbiAgICBVTlJFQUQgPSAndW5yZWFkJyxcbiAgICBSRUNFTlQgPSAncmVjZW50J1xufVxuXG5pbnRlcmZhY2UgSUZlZWRRdWVyeSB7XG4gICAgdGFyZ2V0OiBJVXNlclR5cGVcbiAgICBxdWVyeTogSUZlZWRRdWVyeVR5cGVcbn1cblxuZXhwb3J0IGVudW0gSUZlZWRRdWVyeVR5cGUge1xuICAgIExPR0lOX1VTRVJfVU5SRUFEX0ZFRURTID0gJ2xvZ2luX3VzZXJfdW5yZWFkX2ZlZWRzJyxcbiAgICBMT0dJTl9VU0VSX1JFQ0VOVF9QT1NUUyA9ICdsb2dpbl91c2VyX3JlY2VudF9wb3N0cycsXG4gICAgU0VMRUNUX1VTRVJfUkVDRU5UX1BPU1RTID0gJ3NlbGVjdF91c2VyX3JlY2VudF9wb3N0cydcbn1cblxuZXhwb3J0IGNvbnN0IGlGZWVkUXVlcnlNYXA6IE1hcDxzdHJpbmcsIElGZWVkUXVlcnk+IFxuICAgID0gbmV3IE1hcChbXG4gICAgICAgIFtcbiAgICAgICAgICAgIElGZWVkUXVlcnlUeXBlLkxPR0lOX1VTRVJfVU5SRUFEX0ZFRURTLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRhcmdldDogSVVzZXJUeXBlLkxPR0lOX1VTRVIsXG4gICAgICAgICAgICAgICAgcXVlcnk6IElGZWVkUXVlcnlUeXBlLlVOUkVBRFxuICAgICAgICAgICAgfSAgICAgICAgICAgIFxuICAgICAgICBdLFxuICAgICAgICBbXG4gICAgICAgICAgICBJRmVlZFF1ZXJ5VHlwZS5MT0dJTl9VU0VSX1JFQ0VOVF9QT1NUUyxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0YXJnZXQ6IElVc2VyVHlwZS5MT0dJTl9VU0VSLFxuICAgICAgICAgICAgICAgIHF1ZXJ5OiBJRmVlZFF1ZXJ5VHlwZS5SRUNFTlRcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcbiAgICAgICAgXSxcbiAgICAgICAgW1xuICAgICAgICAgICAgSUZlZWRRdWVyeVR5cGUuU0VMRUNUX1VTRVJfUkVDRU5UX1BPU1RTLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRhcmdldDogSVVzZXJUeXBlLlNFTEVDVF9VU0VSLFxuICAgICAgICAgICAgICAgIHF1ZXJ5OiBJRmVlZFF1ZXJ5VHlwZS5SRUNFTlRcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcbiAgICAgICAgXSxcbiAgICBdKVxuIiwiXG5pbnRlcmZhY2UgSVVzZXJDb21tYW5kIHtcbiAgICBjb21tYW5kOiBzdHJpbmdcbiAgICBzdWJqZWN0OiBzdHJpbmdcbn1cbmV4cG9ydCBlbnVtIElVc2VyQ29tbWFuZFR5cGUge1xuICAgIEZPTExPV19GUklFTkQgPSAnZm9sbG93X2ZyaWVuZF9mZWVkJyxcbiAgICBVTkZPTExPV19GUklFTkQgPSAndW5mb2xsb3dfZnJpZW5kX2ZlZWQnLFxuICAgIE5PX1NVQ0hfQ09NTUFORCA9ICdub19zdWNoX2NvbW1hbmQnXG59XG5cbmV4cG9ydCBjb25zdCBpVXNlckNvbW1hbmRNYXA6IE1hcDxzdHJpbmcsIElVc2VyQ29tbWFuZD5cbiAgICA9IG5ldyBNYXAoW1xuICAgICAgICBbXG4gICAgICAgICAgICBJVXNlckNvbW1hbmRUeXBlLkZPTExPV19GUklFTkQsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY29tbWFuZDogJ2ZvbGxvdycsXG4gICAgICAgICAgICAgICAgc3ViamVjdDogJ2ZlZWQnLFxuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBbXG4gICAgICAgICAgICBJVXNlckNvbW1hbmRUeXBlLlVORk9MTE9XX0ZSSUVORCxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjb21tYW5kOiAndW5mb2xsb3cnLFxuICAgICAgICAgICAgICAgIHN1YmplY3Q6ICdmZWVkJyxcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICBdKSIsImV4cG9ydCBlbnVtIElVc2VyUXVlcnlUeXBlIHtcbiAgICBMT0dJTl9VU0VSX1BST0ZJTEUgPSAnbG9naW5fdXNlcl9pbmZvJyxcbiAgICBTRUxFQ1RfVVNFUl9QUk9GSUxFID0gJ3NlbGVjdF91c2VyX2luZm8nLFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIElVc2VyUXVlcnkge1xuICAgIHRhcmdldDogc3RyaW5nXG4gICAgcXVlcnk6IHN0cmluZ1xufVxuXG5leHBvcnQgY29uc3QgaVVzZXJRdWVyeU1hcDogTWFwPElVc2VyUXVlcnlUeXBlLCBJVXNlclF1ZXJ5PlxuICAgID0gbmV3IE1hcChbXG4gICAgICAgIFtcbiAgICAgICAgICAgIElVc2VyUXVlcnlUeXBlLkxPR0lOX1VTRVJfUFJPRklMRSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBxdWVyeTogJ3Byb2ZpbGUnLFxuICAgICAgICAgICAgICAgIHRhcmdldDogJ2xvZ2luX3VzZXInXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIFtcbiAgICAgICAgICAgIElVc2VyUXVlcnlUeXBlLlNFTEVDVF9VU0VSX1BST0ZJTEUsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcXVlcnk6ICdwcm9maWxlJyxcbiAgICAgICAgICAgICAgICB0YXJnZXQ6ICdzZWxlY3RfdXNlcidcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIF0pXG5cbmV4cG9ydCBjb25zdCBjcmVhdGVVc2VyUXVlcnlUeXBlXG4gICAgPSAodXNlcklucHV0OiBhbnkpOiBJVXNlclF1ZXJ5VHlwZSA9PiB7XG4gICAgICAgIGNvbnN0IHsgTE9HSU5fVVNFUl9QUk9GSUxFLCBTRUxFQ1RfVVNFUl9QUk9GSUxFIH0gPSBJVXNlclF1ZXJ5VHlwZVxuICAgICAgICBjb25zdCB7IHRhcmdldCwgcXVlcnkgfSA9IHVzZXJJbnB1dFxuICAgICAgICBpZiAodGFyZ2V0ID09PSAnbG9naW5fdXNlcicpIHtcbiAgICAgICAgICAgIHN3aXRjaCAocXVlcnkpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdwcm9maWxlJzpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIExPR0lOX1VTRVJfUFJPRklMRVxuICAgICAgICAgICAgfVxuICAgICAgICB9IFxuICAgICAgICBpZiAodGFyZ2V0ID09PSAnc2VsZWN0X3VzZXInKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHF1ZXJ5KSB7XG4gICAgICAgICAgICAgICAgY2FzZSAncHJvZmlsZSc6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBTRUxFQ1RfVVNFUl9QUk9GSUxFXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgRXJyb3IoJ25vIHN1Y2ggdXNlciBxdWVyeScpXG4gICAgfSJdfQ==
