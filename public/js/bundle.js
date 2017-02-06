/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _utility = __webpack_require__(1);

	var _utility2 = _interopRequireDefault(_utility);

	var _views = __webpack_require__(2);

	var _views2 = _interopRequireDefault(_views);

	var _sfuHelper = __webpack_require__(3);

	var _sfuHelper2 = _interopRequireDefault(_sfuHelper);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var sfuOption = {
	    provider: 'SKYWAY',
	    anzuChannelId: '',
	    anzuUpstreamToken: '',
	    skywayAPIKey: 'f1507a0e-d2ae-44cb-8fff-2db63fc89e1e',
	    skywayRoomName: 'skeo3fgvoldp22'
	};

	var sfu = new _sfuHelper2.default(sfuOption);

	if (_utility2.default.isSpeaker()) {
	    console.log('speaker mode');
	    sfu.startStreamingForSkyWay({ video: true, audio: true }, function (stream) {
	        var videoDom = $('#video')[0];
	        videoDom.srcObject = stream;
	        videoDom.muted = true;
	    }, function () {
	        console.error(reason);
	    });
	} else {
	    console.log('viewer mode');
	    sfu.startViewingForSkyWay(function (stream) {
	        var videoDom = $('#video')[0];
	        videoDom.srcObject = stream;
	    }, function (reason) {
	        console.error(reason);
	    });
	}

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var utility = function () {
	    function utility() {
	        _classCallCheck(this, utility);
	    }
	    // nothing


	    /**
	     * スピーカーかどうかを判定する
	     * @returns {boolean}
	     */


	    _createClass(utility, null, [{
	        key: 'isSpeaker',
	        value: function isSpeaker() {
	            return location.hash === '#speaker' ? true : false;
	        }

	        /**
	         * getUserMediaのOptionオブジェクトを生成する
	         * @param width
	         * @param height
	         * @param framerate
	         * @returns {*}
	         */

	    }, {
	        key: 'createGumOptions',
	        value: function createGumOptions(width, height, framerate) {

	            var _param = {
	                video: {},
	                audio: true
	            };

	            if (!!navigator.mozGetUserMedia) {
	                // for FF
	                if (isFinite(width)) _param.video.width = { min: width, max: width };
	                if (isFinite(height)) _param.video.height = { min: height, max: height };
	            } else {
	                // for Chrome
	                if (isFinite(width)) _param.video.width = { min: width, max: width };
	                if (isFinite(height)) _param.video.height = { min: height, max: height };
	                if (isFinite(framerate)) _param.video.frameRate = { min: framerate, max: framerate };
	            }

	            return _param;
	        }
	    }]);

	    return utility;
	}();

	exports.default = utility;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var views = function views() {
	    _classCallCheck(this, views);
	};

	exports.default = views;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _utility = __webpack_require__(1);

	var _utility2 = _interopRequireDefault(_utility);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var anzu = __webpack_require__(4);

	var sfuHelper = function () {
	    function sfuHelper(param) {
	        _classCallCheck(this, sfuHelper);

	        var defaultoptions = {
	            provider: 'ANZU',
	            anzuChannelId: '',
	            anzuUpstreamToken: ''
	        };
	        this.options = Object.assign({}, defaultoptions, param);
	        console.log(this.options);
	    }

	    _createClass(sfuHelper, [{
	        key: 'startStreamingForAnzu',
	        value: function startStreamingForAnzu(gUNOptions) {
	            var self = this;
	            return new Promise(function (resolve, reject) {
	                var anzuUpstream = new anzu('upstream');
	                anzuUpstream.start(self.options.anzuChannelId, self.options.anzuUpstreamToken, gUNOptions).then(function (params) {
	                    resolve(params.stream);
	                }).catch(function (error) {
	                    reject(error);
	                });
	            });
	        }
	    }, {
	        key: 'startViewingForAnzu',
	        value: function startViewingForAnzu() {
	            var self = this;
	            return new Promise(function (resolve, reject) {
	                var anzuDownstream = new anzu('downstream');
	                anzuDownstream.start(self.options.anzuChannelId, "").then(function (params) {
	                    resolve(params.stream);
	                }).catch(function (error) {
	                    reject(error);
	                });
	            });
	        }
	    }, {
	        key: 'startStreamingForSkyWay',
	        value: function startStreamingForSkyWay(gUNOptions, successCallback, errorCallback) {
	            var self = this;
	            navigator.mediaDevices.getUserMedia(gUNOptions).then(function (stream) {
	                // success
	                var date = new Date();
	                var skywayUpstream = new Peer('UPSTREAM_' + date.getTime(), { key: self.options.skywayAPIKey, debug: 3 });
	                skywayUpstream.on('open', function () {
	                    var sfuRoom = skywayUpstream.joinRoom(self.options.skywayRoomName, { mode: 'sfu', stream: stream });
	                    sfuRoom.on('open', function () {
	                        console.log('Broadcast ready.');
	                        successCallback(stream);
	                    });
	                    sfuRoom.on('peerJoin', function (peerId) {
	                        console.log('join the viewer');
	                    });
	                });
	            }).catch(function (error) {
	                // error
	                errorCallback(error);
	            });
	        }
	    }, {
	        key: 'startViewingForSkyWay',
	        value: function startViewingForSkyWay(successCallback, errorCallback) {
	            var self = this;
	            var skywayDownstream = new Peer({ key: self.options.skywayAPIKey, debug: 1 });
	            skywayDownstream.on('open', function () {
	                navigator.mediaDevices.getUserMedia(_utility2.default.createGumOptions(1, 1, 1)).then(function (stream) {
	                    // success
	                    var sfuRoom = skywayDownstream.joinRoom(self.options.skywayRoomName, { mode: 'sfu', stream: self._streamMute(stream) });
	                    console.log('Viewer ready.');
	                    sfuRoom.on('stream', function (stream) {
	                        if (stream.peerId.slice(0, 8) === 'UPSTREAM') {
	                            console.log('receive stream');
	                            successCallback(stream);
	                        }
	                    });
	                    sfuRoom.on('removeStream', function (stream) {
	                        if (stream.peerId.slice(0, 8) === 'UPSTREAM') {
	                            console.log('remove');
	                        }
	                    });
	                    sfuRoom.on('close', function (stream) {
	                        if (stream.peerId.slice(0, 8) === 'UPSTREAM') {
	                            console.log('close peer');
	                        }
	                    });
	                }).catch(function (error) {
	                    // error
	                    errorCallback(error);
	                });
	            });
	        }
	    }, {
	        key: '_streamMute',
	        value: function _streamMute(stream) {
	            var tempVideoTrack = stream.getVideoTracks()[0];
	            var tempAudioTrack = stream.getAudioTracks()[0];
	            tempVideoTrack.enabled = false;
	            tempAudioTrack.enabled = false;
	            var result = new MediaStream();
	            result.addTrack(tempVideoTrack);
	            result.addTrack(tempAudioTrack);
	            return result;
	        }
	    }]);

	    return sfuHelper;
	}();

	exports.default = sfuHelper;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var require;var require;/* WEBPACK VAR INJECTION */(function(global) {"use strict";

	var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/*!
	 * anzu-js-sdk
	 * WebRTC SFU as a Service Anzu Library
	 * @version 0.6.1
	 * @author Shiguredo Inc.
	 * @license MIT
	 */
	(function (f) {
	    if (( false ? "undefined" : _typeof2(exports)) === "object" && typeof module !== "undefined") {
	        module.exports = f();
	    } else if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (f), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else {
	        var g;if (typeof window !== "undefined") {
	            g = window;
	        } else if (typeof global !== "undefined") {
	            g = global;
	        } else if (typeof self !== "undefined") {
	            g = self;
	        } else {
	            g = this;
	        }g.Anzu = f();
	    }
	})(function () {
	    var define, module, exports;return function e(t, n, r) {
	        function s(o, u) {
	            if (!n[o]) {
	                if (!t[o]) {
	                    var a = typeof require == "function" && require;if (!u && a) return require(o, !0);if (i) return i(o, !0);var f = new Error("Cannot find module '" + o + "'");throw f.code = "MODULE_NOT_FOUND", f;
	                }var l = n[o] = { exports: {} };t[o][0].call(l.exports, function (e) {
	                    var n = t[o][1][e];return s(n ? n : e);
	                }, l, l.exports, e, t, n, r);
	            }return n[o].exports;
	        }var i = typeof require == "function" && require;for (var o = 0; o < r.length; o++) {
	            s(r[o]);
	        }return s;
	    }({ 1: [function (require, module, exports) {
	            (function (global) {
	                /*!
	                 * sora-js-sdk
	                 * WebRTC SFU Sora Signaling Library
	                 * @version 0.5.0
	                 * @author Shiguredo Inc.
	                 * @license MIT
	                 */
	                !function (n) {
	                    if ("object" == (typeof exports === "undefined" ? "undefined" : _typeof2(exports)) && "undefined" != typeof module) module.exports = n();else if ("function" == typeof define && define.amd) define([], n);else {
	                        var e;e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, e.Sora = n();
	                    }
	                }(function () {
	                    return function n(e, t, o) {
	                        function r(u, s) {
	                            if (!t[u]) {
	                                if (!e[u]) {
	                                    var c = "function" == typeof require && require;if (!s && c) return c(u, !0);if (i) return i(u, !0);var f = new Error("Cannot find module '" + u + "'");throw f.code = "MODULE_NOT_FOUND", f;
	                                }var a = t[u] = { exports: {} };e[u][0].call(a.exports, function (n) {
	                                    var t = e[u][1][n];return r(t ? t : n);
	                                }, a, a.exports, n, e, t, o);
	                            }return t[u].exports;
	                        }for (var i = "function" == typeof require && require, u = 0; u < o.length; u++) {
	                            r(o[u]);
	                        }return r;
	                    }({ 1: [function (n, e, t) {
	                            "use strict";
	                            function o(n, e) {
	                                if (!(n instanceof e)) throw new TypeError("Cannot call a class as a function");
	                            }var r = function () {
	                                function n(n, e) {
	                                    for (var t = 0; t < e.length; t++) {
	                                        var o = e[t];o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(n, o.key, o);
	                                    }
	                                }return function (e, t, o) {
	                                    return t && n(e.prototype, t), o && n(e, o), e;
	                                };
	                            }(),
	                                i = function () {
	                                function n(e) {
	                                    o(this, n), this.url = e || "";
	                                }return r(n, [{ key: "connection", value: function value() {
	                                        return new u(this.url);
	                                    } }]), n;
	                            }(),
	                                u = function () {
	                                function n(e) {
	                                    o(this, n), this._ws = null, this._url = e, this._onerror = function () {}, this._onclose = function () {};
	                                }return r(n, [{ key: "connect", value: function value(n) {
	                                        var e = this;return new Promise(function (t, o) {
	                                            null === e._ws && (e._ws = new WebSocket(e._url)), e._ws.onopen = function () {
	                                                var t = { type: "connect", role: n.role, channel_id: n.channelId, access_token: n.accessToken };n.codecType && (t.video = { codec_type: n.codecType }), e._ws.send(JSON.stringify(t));
	                                            }, e._ws.onclose = function (n) {
	                                                /440\d$/.test(n.code) ? o(n) : e._onclose(n);
	                                            }, e._ws.onerror = function (n) {
	                                                e._onerror(n);
	                                            }, e._ws.onmessage = function (n) {
	                                                var o = JSON.parse(n.data);"offer" == o.type ? t(o) : "ping" == o.type && e._ws.send(JSON.stringify({ type: "pong" }));
	                                            };
	                                        });
	                                    } }, { key: "answer", value: function value(n) {
	                                        this._ws.send(JSON.stringify({ type: "answer", sdp: n }));
	                                    } }, { key: "candidate", value: function value(n) {
	                                        var e = n.toJSON();e.type = "candidate", this._ws.send(JSON.stringify(e));
	                                    } }, { key: "onError", value: function value(n) {
	                                        this._onerror = n;
	                                    } }, { key: "onDisconnect", value: function value(n) {
	                                        this._onclose = n;
	                                    } }, { key: "disconnect", value: function value() {
	                                        this._ws.close(), this._ws = null;
	                                    } }]), n;
	                            }();e.exports = i;
	                        }, {}] }, {}, [1])(1);
	                });
	            }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
	        }, {}], 2: [function (require, module, exports) {
	            "use strict";

	            var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
	                return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
	            } : function (obj) {
	                return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
	            };

	            var _createClass = function () {
	                function defineProperties(target, props) {
	                    for (var i = 0; i < props.length; i++) {
	                        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	                    }
	                }return function (Constructor, protoProps, staticProps) {
	                    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	                };
	            }();

	            var _soraJsSdk = require("sora-js-sdk");

	            var _soraJsSdk2 = _interopRequireDefault(_soraJsSdk);

	            function _interopRequireDefault(obj) {
	                return obj && obj.__esModule ? obj : { default: obj };
	            }

	            function _classCallCheck(instance, Constructor) {
	                if (!(instance instanceof Constructor)) {
	                    throw new TypeError("Cannot call a class as a function");
	                }
	            }

	            var RTCPeerConnection = window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
	            var RTCSessionDescription = window.RTCSessionDescription || window.mozRTCSessionDescription;
	            navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

	            var Anzu = function () {
	                /**
	                 * @constructor
	                 * @param {string} rolse - ロール (upstram or downstream)
	                 * @param {?object} [params={anzuUrl: null, signalingUrl: null}] - URL 設定
	                 */

	                function Anzu(role) {
	                    var params = arguments.length <= 1 || arguments[1] === undefined ? { anzuUrl: null, signalingUrl: null } : arguments[1];

	                    _classCallCheck(this, Anzu);

	                    this.anzuUrl = params.anzuUrl === null ? "https://anzu.shiguredo.jp/api/" : params.anzuUrl;
	                    this.signalingUrl = params.signalingUrl === null ? "wss://anzu.shiguredo.jp/signaling" : params.signalingUrl;
	                    if (role !== "upstream" && role !== "downstream") {
	                        var error = new Error("Role " + role + " is not defined");
	                        throw error;
	                    }
	                    this.role = role;
	                    this._onError = function () {};
	                    this._onDisconnect = function () {};
	                }
	                /**
	                 * Anzu を開始する
	                 * @param {string} channelId - チャンネルID
	                 * @param {string} token - アクセストークン
	                 * @param {object} [constraints={video: true, audio: true}] - LocalMediaStream オブジェクトがサポートするメディアタイプ
	                 */

	                _createClass(Anzu, [{
	                    key: "start",
	                    value: function start(channelId, token) {
	                        var constraints = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
	                        var codecType = arguments.length <= 3 || arguments[3] === undefined ? "VP8" : arguments[3];
	                        var multistream = arguments.length <= 4 || arguments[4] === undefined ? false : arguments[4];

	                        if (this.role === "upstream") {
	                            var c = constraints === null ? { video: true, audio: true } : constraints;
	                            return this._startUpstream(channelId, token, c, codecType, multistream);
	                        } else if (this.role === "downstream") {
	                            return this._startDownstream(channelId, token, codecType, multistream);
	                        }
	                    }
	                    /**
	                     * アップストリームを開始する
	                     * @private
	                     * @param {string} channelId - チャンネルID
	                     * @param {string} upstreamToken - アップストリームトークン
	                     * @param {object} constraints - LocalMediaStream オブジェクトがサポートするメディアタイプ
	                     * )
	                     */

	                }, {
	                    key: "_startUpstream",
	                    value: function _startUpstream(channelId, upstreamToken, constraints, codecType, multistream) {
	                        var _this = this;

	                        var getUserMedia = function getUserMedia(constraints) {
	                            return new Promise(function (resolve, reject) {
	                                if (navigator.getUserMedia) {
	                                    navigator.getUserMedia(constraints, function (stream) {
	                                        _this.trace("Upstream getUserMedia constraints", constraints);
	                                        _this.stream = stream;
	                                        resolve({ stream: stream });
	                                    }, function (err) {
	                                        reject(err);
	                                    });
	                                } else {
	                                    reject();
	                                }
	                            });
	                        };
	                        var createOffer = function createOffer() {
	                            _this.sora = new _soraJsSdk2.default(_this.signalingUrl).connection();
	                            _this.sora.onError(_this._onError);
	                            _this.sora.onDisconnect(_this._onDisconnect);
	                            return _this.sora.connect({
	                                role: "upstream",
	                                channelId: channelId,
	                                accessToken: upstreamToken,
	                                codecType: codecType,
	                                multistream: multistream
	                            });
	                        };
	                        var createPeerConnection = function createPeerConnection(offer) {
	                            _this.trace("Upstream Offer sdp", offer.sdp);
	                            _this.trace("Upstream Offer clientId", offer.client_id);
	                            _this.trace("Upstream Offer config", offer.config);
	                            return new Promise(function (resolve, _reject) {
	                                _this.clientId = offer.client_id;
	                                _this.pc = new RTCPeerConnection(offer.config);
	                                _this.pc.addStream(_this.stream);
	                                resolve(offer);
	                            });
	                        };
	                        var createAnswer = function createAnswer(offer) {
	                            return new Promise(function (resolve, reject) {
	                                _this.pc.oniceconnectionstatechange = function (event) {
	                                    _this.trace("Upstream oniceconnectionstatechange", {
	                                        iceConnectionState: _this.pc.iceConnectionState,
	                                        iceGatheringState: _this.pc.iceGatheringState
	                                    });
	                                    switch (_this.pc.iceConnectionState) {
	                                        case "connected":
	                                        case "completed":
	                                            resolve({ clientId: _this.clientId, stream: _this.stream });
	                                            break;
	                                        case "failed":
	                                            reject(event);
	                                            break;
	                                    }
	                                };
	                                _this.pc.onicecandidate = function (event) {
	                                    _this.trace("Upstream onicecandidate", {
	                                        candidate: event.candidate,
	                                        iceConnectionState: _this.pc.iceConnectionState,
	                                        iceGatheringState: _this.pc.iceGatheringState
	                                    });
	                                    if (event.candidate !== null) {
	                                        _this.sora.candidate(event.candidate);
	                                    }
	                                };
	                                _this.pc.setRemoteDescription(new RTCSessionDescription(offer), function () {
	                                    _this.pc.createAnswer(function (answer) {
	                                        _this.trace("Upstream answer sdp", answer.sdp);
	                                        _this.pc.setLocalDescription(answer, function () {
	                                            _this.sora.answer(answer.sdp);
	                                        }, function (error) {
	                                            reject(error);
	                                        });
	                                    }, function (error) {
	                                        reject(error);
	                                    });
	                                }, function (error) {
	                                    reject(error);
	                                });
	                            });
	                        };
	                        return getUserMedia(constraints).then(createOffer).then(createPeerConnection).then(createAnswer).catch(function (e) {
	                            _this.disconnect();
	                            return Promise.reject(e);
	                        });
	                    }
	                    /**
	                     * ダウンストリームを開始する
	                     * @private
	                     * @param {string} channelId - チャンネルID
	                     * @param {string} downstreamToken - ダウンストリームトークン
	                     */

	                }, {
	                    key: "_startDownstream",
	                    value: function _startDownstream(channelId, downstreamToken, codecType, multistream) {
	                        var _this2 = this;

	                        var createOffer = function createOffer() {
	                            _this2.sora = new _soraJsSdk2.default(_this2.signalingUrl).connection();
	                            _this2.sora.onError(_this2._onError);
	                            _this2.sora.onDisconnect(_this2._onDisconnect);
	                            return _this2.sora.connect({
	                                role: "downstream",
	                                channelId: channelId,
	                                accessToken: downstreamToken,
	                                codecType: codecType,
	                                multistream: multistream
	                            });
	                        };
	                        var createPeerConnection = function createPeerConnection(offer) {
	                            _this2.trace("Downstream offer sdp", offer.sdp);
	                            _this2.trace("Downstream offer clientId", offer.client_id);
	                            _this2.trace("Downstream offer config", offer.config);
	                            return new Promise(function (resolve, _reject) {
	                                _this2.clientId = offer.client_id;
	                                _this2.pc = new RTCPeerConnection(offer.config);
	                                resolve(offer);
	                            });
	                        };
	                        var createAnswer = function createAnswer(offer) {
	                            // firefox と chrome のタイミング問題判定用 flag
	                            _this2.icecandidateConnected = false;
	                            _this2.addstreamCompleted = false;
	                            return new Promise(function (resolve, reject) {
	                                _this2.pc.onaddstream = function (event) {
	                                    _this2.addstreamCompleted = true;
	                                    _this2.stream = event.stream;
	                                    _this2.trace("Downstream onaddstream", event.stream.id);
	                                    if (_this2.icecandidateConnected) {
	                                        resolve({ clientId: _this2.clientId, stream: _this2.stream });
	                                    }
	                                };
	                                _this2.pc.oniceconnectionstatechange = function (event) {
	                                    _this2.trace("Downstream oniceconnectionstatechange", {
	                                        iceConnectionState: _this2.pc.iceConnectionState,
	                                        iceGatheringState: _this2.pc.iceGatheringState
	                                    });
	                                    switch (_this2.pc.iceConnectionState) {
	                                        case "connected":
	                                        case "completed":
	                                            _this2.icecandidateConnected = true;
	                                            if (_this2.addstreamCompleted) {
	                                                resolve({ clientId: _this2.clientId, stream: _this2.stream });
	                                            }
	                                            break;
	                                        case "failed":
	                                            reject(event);
	                                            break;
	                                    }
	                                };
	                                _this2.pc.onicecandidate = function (event) {
	                                    _this2.trace("Downstream onicecandidate", {
	                                        candidate: event.candidate,
	                                        iceConnectionState: _this2.pc.iceConnectionState,
	                                        iceGatheringState: _this2.pc.iceGatheringState
	                                    });
	                                    if (event.candidate !== null) {
	                                        _this2.sora.candidate(event.candidate);
	                                    }
	                                };
	                                _this2.pc.setRemoteDescription(new RTCSessionDescription(offer), function () {
	                                    _this2.pc.createAnswer(function (answer) {
	                                        _this2.trace("Downstream answer sdp", answer.sdp);
	                                        _this2.pc.setLocalDescription(answer, function () {
	                                            _this2.sora.answer(answer.sdp);
	                                        }, function (error) {
	                                            reject(error);
	                                        });
	                                    }, function (error) {
	                                        reject(error);
	                                    });
	                                }, function (error) {
	                                    reject(error);
	                                });
	                            });
	                        };
	                        return createOffer().then(createPeerConnection).then(createAnswer).catch(function (e) {
	                            _this2.disconnect();
	                            return Promise.reject(e);
	                        });
	                    }
	                    /**
	                     * コンソールログを出力する
	                     * @private
	                     * @param {string} text - タイトル
	                     * @param {string|object} value - 値
	                     */

	                }, {
	                    key: "trace",
	                    value: function trace(text, value) {
	                        var now = "";
	                        if (window.performance) {
	                            now = (window.performance.now() / 1000).toFixed(3) + ": ";
	                        }

	                        if ((typeof value === "undefined" ? "undefined" : _typeof(value)) === "object" && value !== null) {
	                            console.info(now + text + "\n" + JSON.stringify(value, null, 2)); // eslint-disable-line
	                        } else {
	                            console.info(now + text + "\n" + value); // eslint-disable-line
	                        }
	                    }
	                    /**
	                     * 切断する
	                     */

	                }, {
	                    key: "disconnect",
	                    value: function disconnect() {
	                        if (this.stream) {
	                            this.stream.getTracks().forEach(function (t) {
	                                t.stop();
	                            });
	                        }
	                        this.stream = null;
	                        if (this.sora) {
	                            this.sora.disconnect();
	                        }
	                        this.sora = null;
	                        if (this.pc && this.pc.signalingState !== "closed") {
	                            this.pc.oniceconnectionstatechange = null;
	                            this.pc.close();
	                        }
	                        this.pc = null;
	                    }
	                    /**
	                     * エラー時のコールバックを登録する
	                     * @param {function} コールバック
	                     */

	                }, {
	                    key: "onError",
	                    value: function onError(f) {
	                        this._onError = f;
	                        if (this.sora) {
	                            this.sora.onError(f);
	                        }
	                    }
	                    /**
	                     * 切断時のコールバックを登録する
	                     * @param {function} コールバック
	                     */

	                }, {
	                    key: "onDisconnect",
	                    value: function onDisconnect(f) {
	                        this._onDisconnect = f;
	                        if (this.sora) {
	                            this.sora.onDisconnect(f);
	                        }
	                    }
	                }]);

	                return Anzu;
	            }();

	            module.exports = Anzu;
	        }, { "sora-js-sdk": 1 }] }, {}, [2])(2);
	});
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }
/******/ ]);