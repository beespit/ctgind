"use strict";
/* eslint-disable */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.$ = exports.GRAPHQL_TYPE_SEPARATOR = exports.START_VAR_NAME = exports.resolverFor = exports.InternalArgsBuilt = exports.ResolveFromPath = exports.purifyGraphQLKey = exports.PrepareScalarPaths = exports.GraphQLError = exports.SEPARATOR = exports.traverseResponse = exports.decodeScalarsInResponse = exports.ZeusScalars = exports.Gql = exports.TypeFromSelector = exports.Selector = exports.ZeusSelect = exports.Zeus = exports.Subscription = exports.SubscriptionThunder = exports.Chain = exports.Thunder = exports.InternalsBuildQuery = exports.apiFetch = exports.apiSubscription = exports.HEADERS = exports.HOST = void 0;
var const_1 = require("./const");
exports.HOST = "https://graphql.myshopify.com/api/2023-01/graphql.json";
exports.HEADERS = {};
var apiSubscription = function (options) { return function (query) {
    var _a, _b, _c;
    try {
        var queryString = options[0] + '?query=' + encodeURIComponent(query);
        var wsString = queryString.replace('http', 'ws');
        var host = (options.length > 1 && ((_b = (_a = options[1]) === null || _a === void 0 ? void 0 : _a.websocket) === null || _b === void 0 ? void 0 : _b[0])) || wsString;
        var webSocketOptions = ((_c = options[1]) === null || _c === void 0 ? void 0 : _c.websocket) || [host];
        var ws_1 = new (WebSocket.bind.apply(WebSocket, __spreadArray([void 0], webSocketOptions, false)))();
        return {
            ws: ws_1,
            on: function (e) {
                ws_1.onmessage = function (event) {
                    if (event.data) {
                        var parsed = JSON.parse(event.data);
                        var data = parsed.data;
                        return e(data);
                    }
                };
            },
            off: function (e) {
                ws_1.onclose = e;
            },
            error: function (e) {
                ws_1.onerror = e;
            },
            open: function (e) {
                ws_1.onopen = e;
            },
        };
    }
    catch (_d) {
        throw new Error('No websockets implemented');
    }
}; };
exports.apiSubscription = apiSubscription;
var handleFetchResponse = function (response) {
    if (!response.ok) {
        return new Promise(function (_, reject) {
            response
                .text()
                .then(function (text) {
                try {
                    reject(JSON.parse(text));
                }
                catch (err) {
                    reject(text);
                }
            })
                .catch(reject);
        });
    }
    return response.json();
};
var apiFetch = function (options) {
    return function (query, variables) {
        if (variables === void 0) { variables = {}; }
        var fetchOptions = options[1] || {};
        if (fetchOptions.method && fetchOptions.method === 'GET') {
            return fetch("".concat(options[0], "?query=").concat(encodeURIComponent(query)), fetchOptions)
                .then(handleFetchResponse)
                .then(function (response) {
                if (response.errors) {
                    throw new GraphQLError(response);
                }
                return response.data;
            });
        }
        return fetch("".concat(options[0]), __assign({ body: JSON.stringify({ query: query, variables: variables }), method: 'POST', headers: {
                'Content-Type': 'application/json',
            } }, fetchOptions))
            .then(handleFetchResponse)
            .then(function (response) {
            if (response.errors) {
                throw new GraphQLError(response);
            }
            return response.data;
        });
    };
};
exports.apiFetch = apiFetch;
var InternalsBuildQuery = function (_a) {
    var ops = _a.ops, props = _a.props, returns = _a.returns, options = _a.options, scalars = _a.scalars;
    var ibb = function (k, o, p, root, vars) {
        var _a;
        if (p === void 0) { p = ''; }
        if (root === void 0) { root = true; }
        if (vars === void 0) { vars = []; }
        var keyForPath = (0, exports.purifyGraphQLKey)(k);
        var newPath = [p, keyForPath].join(exports.SEPARATOR);
        if (!o) {
            return '';
        }
        if (typeof o === 'boolean' || typeof o === 'number') {
            return k;
        }
        if (typeof o === 'string') {
            return "".concat(k, " ").concat(o);
        }
        if (Array.isArray(o)) {
            var args = (0, exports.InternalArgsBuilt)({
                props: props,
                returns: returns,
                ops: ops,
                scalars: scalars,
                vars: vars,
            })(o[0], newPath);
            return "".concat(ibb(args ? "".concat(k, "(").concat(args, ")") : k, o[1], p, false, vars));
        }
        if (k === '__alias') {
            return Object.entries(o)
                .map(function (_a) {
                var alias = _a[0], objectUnderAlias = _a[1];
                if (typeof objectUnderAlias !== 'object' || Array.isArray(objectUnderAlias)) {
                    throw new Error('Invalid alias it should be __alias:{ YOUR_ALIAS_NAME: { OPERATION_NAME: { ...selectors }}}');
                }
                var operationName = Object.keys(objectUnderAlias)[0];
                var operation = objectUnderAlias[operationName];
                return ibb("".concat(alias, ":").concat(operationName), operation, p, false, vars);
            })
                .join('\n');
        }
        var hasOperationName = root && (options === null || options === void 0 ? void 0 : options.operationName) ? ' ' + options.operationName : '';
        var keyForDirectives = (_a = o.__directives) !== null && _a !== void 0 ? _a : '';
        var query = "{".concat(Object.entries(o)
            .filter(function (_a) {
            var k = _a[0];
            return k !== '__directives';
        })
            .map(function (e) { return ibb.apply(void 0, __spreadArray(__spreadArray([], e, false), [[p, "field<>".concat(keyForPath)].join(exports.SEPARATOR), false, vars], false)); })
            .join('\n'), "}");
        if (!root) {
            return "".concat(k, " ").concat(keyForDirectives).concat(hasOperationName, " ").concat(query);
        }
        var varsString = vars.map(function (v) { return "".concat(v.name, ": ").concat(v.graphQLType); }).join(', ');
        return "".concat(k, " ").concat(keyForDirectives).concat(hasOperationName).concat(varsString ? "(".concat(varsString, ")") : '', " ").concat(query);
    };
    return ibb;
};
exports.InternalsBuildQuery = InternalsBuildQuery;
var Thunder = function (fn) {
    return function (operation, graphqlOptions) {
        return function (o, ops) {
            return fn((0, exports.Zeus)(operation, o, {
                operationOptions: ops,
                scalars: graphqlOptions === null || graphqlOptions === void 0 ? void 0 : graphqlOptions.scalars,
            }), ops === null || ops === void 0 ? void 0 : ops.variables).then(function (data) {
                if (graphqlOptions === null || graphqlOptions === void 0 ? void 0 : graphqlOptions.scalars) {
                    return (0, exports.decodeScalarsInResponse)({
                        response: data,
                        initialOp: operation,
                        initialZeusQuery: o,
                        returns: const_1.ReturnTypes,
                        scalars: graphqlOptions.scalars,
                        ops: const_1.Ops,
                    });
                }
                return data;
            });
        };
    };
};
exports.Thunder = Thunder;
var Chain = function () {
    var options = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        options[_i] = arguments[_i];
    }
    return (0, exports.Thunder)((0, exports.apiFetch)(options));
};
exports.Chain = Chain;
var SubscriptionThunder = function (fn) {
    return function (operation, graphqlOptions) {
        return function (o, ops) {
            var returnedFunction = fn((0, exports.Zeus)(operation, o, {
                operationOptions: ops,
                scalars: graphqlOptions === null || graphqlOptions === void 0 ? void 0 : graphqlOptions.scalars,
            }));
            if ((returnedFunction === null || returnedFunction === void 0 ? void 0 : returnedFunction.on) && (graphqlOptions === null || graphqlOptions === void 0 ? void 0 : graphqlOptions.scalars)) {
                var wrapped_1 = returnedFunction.on;
                returnedFunction.on = function (fnToCall) {
                    return wrapped_1(function (data) {
                        if (graphqlOptions === null || graphqlOptions === void 0 ? void 0 : graphqlOptions.scalars) {
                            return fnToCall((0, exports.decodeScalarsInResponse)({
                                response: data,
                                initialOp: operation,
                                initialZeusQuery: o,
                                returns: const_1.ReturnTypes,
                                scalars: graphqlOptions.scalars,
                                ops: const_1.Ops,
                            }));
                        }
                        return fnToCall(data);
                    });
                };
            }
            return returnedFunction;
        };
    };
};
exports.SubscriptionThunder = SubscriptionThunder;
var Subscription = function () {
    var options = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        options[_i] = arguments[_i];
    }
    return (0, exports.SubscriptionThunder)((0, exports.apiSubscription)(options));
};
exports.Subscription = Subscription;
var Zeus = function (operation, o, ops) {
    return (0, exports.InternalsBuildQuery)({
        props: const_1.AllTypesProps,
        returns: const_1.ReturnTypes,
        ops: const_1.Ops,
        options: ops === null || ops === void 0 ? void 0 : ops.operationOptions,
        scalars: ops === null || ops === void 0 ? void 0 : ops.scalars,
    })(operation, o);
};
exports.Zeus = Zeus;
var ZeusSelect = function () { return (function (t) { return t; }); };
exports.ZeusSelect = ZeusSelect;
var Selector = function (key) { return key && (0, exports.ZeusSelect)(); };
exports.Selector = Selector;
var TypeFromSelector = function (key) { return key && (0, exports.ZeusSelect)(); };
exports.TypeFromSelector = TypeFromSelector;
exports.Gql = (0, exports.Chain)(exports.HOST, {
    headers: __assign({ 'Content-Type': 'application/json' }, exports.HEADERS),
});
exports.ZeusScalars = (0, exports.ZeusSelect)();
var decodeScalarsInResponse = function (_a) {
    var response = _a.response, scalars = _a.scalars, returns = _a.returns, ops = _a.ops, initialZeusQuery = _a.initialZeusQuery, initialOp = _a.initialOp;
    if (!scalars) {
        return response;
    }
    var builder = (0, exports.PrepareScalarPaths)({
        ops: ops,
        returns: returns,
    });
    var scalarPaths = builder(initialOp, ops[initialOp], initialZeusQuery);
    if (scalarPaths) {
        var r = (0, exports.traverseResponse)({ scalarPaths: scalarPaths, resolvers: scalars })(initialOp, response, [ops[initialOp]]);
        return r;
    }
    return response;
};
exports.decodeScalarsInResponse = decodeScalarsInResponse;
var traverseResponse = function (_a) {
    var resolvers = _a.resolvers, scalarPaths = _a.scalarPaths;
    var ibb = function (k, o, p) {
        var _a;
        if (p === void 0) { p = []; }
        if (Array.isArray(o)) {
            return o.map(function (eachO) { return ibb(k, eachO, p); });
        }
        if (o == null) {
            return o;
        }
        var scalarPathString = p.join(exports.SEPARATOR);
        var currentScalarString = scalarPaths[scalarPathString];
        if (currentScalarString) {
            var currentDecoder = (_a = resolvers[currentScalarString.split('.')[1]]) === null || _a === void 0 ? void 0 : _a.decode;
            if (currentDecoder) {
                return currentDecoder(o);
            }
        }
        if (typeof o === 'boolean' || typeof o === 'number' || typeof o === 'string' || !o) {
            return o;
        }
        var entries = Object.entries(o).map(function (_a) {
            var k = _a[0], v = _a[1];
            return [k, ibb(k, v, __spreadArray(__spreadArray([], p, true), [(0, exports.purifyGraphQLKey)(k)], false))];
        });
        var objectFromEntries = entries.reduce(function (a, _a) {
            var k = _a[0], v = _a[1];
            a[k] = v;
            return a;
        }, {});
        return objectFromEntries;
    };
    return ibb;
};
exports.traverseResponse = traverseResponse;
exports.SEPARATOR = '|';
var GraphQLError = /** @class */ (function (_super) {
    __extends(GraphQLError, _super);
    function GraphQLError(response) {
        var _this = _super.call(this, '') || this;
        _this.response = response;
        console.error(response);
        return _this;
    }
    GraphQLError.prototype.toString = function () {
        return 'GraphQL Response Error';
    };
    return GraphQLError;
}(Error));
exports.GraphQLError = GraphQLError;
var ExtractScalar = function (mappedParts, returns) {
    if (mappedParts.length === 0) {
        return;
    }
    var oKey = mappedParts[0];
    var returnP1 = returns[oKey];
    if (typeof returnP1 === 'object') {
        var returnP2 = returnP1[mappedParts[1]];
        if (returnP2) {
            return ExtractScalar(__spreadArray([returnP2], mappedParts.slice(2), true), returns);
        }
        return undefined;
    }
    return returnP1;
};
var PrepareScalarPaths = function (_a) {
    var ops = _a.ops, returns = _a.returns;
    var ibb = function (k, originalKey, o, p, pOriginals, root) {
        var _a;
        if (p === void 0) { p = []; }
        if (pOriginals === void 0) { pOriginals = []; }
        if (root === void 0) { root = true; }
        if (!o) {
            return;
        }
        if (typeof o === 'boolean' || typeof o === 'number' || typeof o === 'string') {
            var extractionArray = __spreadArray(__spreadArray([], pOriginals, true), [originalKey], false);
            var isScalar = ExtractScalar(extractionArray, returns);
            if (isScalar === null || isScalar === void 0 ? void 0 : isScalar.startsWith('scalar')) {
                var partOfTree = (_a = {},
                    _a[__spreadArray(__spreadArray([], p, true), [k], false).join(exports.SEPARATOR)] = isScalar,
                    _a);
                return partOfTree;
            }
            return {};
        }
        if (Array.isArray(o)) {
            return ibb(k, k, o[1], p, pOriginals, false);
        }
        if (k === '__alias') {
            return Object.entries(o)
                .map(function (_a) {
                var alias = _a[0], objectUnderAlias = _a[1];
                if (typeof objectUnderAlias !== 'object' || Array.isArray(objectUnderAlias)) {
                    throw new Error('Invalid alias it should be __alias:{ YOUR_ALIAS_NAME: { OPERATION_NAME: { ...selectors }}}');
                }
                var operationName = Object.keys(objectUnderAlias)[0];
                var operation = objectUnderAlias[operationName];
                return ibb(alias, operationName, operation, p, pOriginals, false);
            })
                .reduce(function (a, b) { return (__assign(__assign({}, a), b)); });
        }
        var keyName = root ? ops[k] : k;
        return Object.entries(o)
            .filter(function (_a) {
            var k = _a[0];
            return k !== '__directives';
        })
            .map(function (_a) {
            var k = _a[0], v = _a[1];
            // Inline fragments shouldn't be added to the path as they aren't a field
            var isInlineFragment = originalKey.match(/^...\s*on/) != null;
            return ibb(k, k, v, isInlineFragment ? p : __spreadArray(__spreadArray([], p, true), [(0, exports.purifyGraphQLKey)(keyName || k)], false), isInlineFragment ? pOriginals : __spreadArray(__spreadArray([], pOriginals, true), [(0, exports.purifyGraphQLKey)(originalKey)], false), false);
        })
            .reduce(function (a, b) { return (__assign(__assign({}, a), b)); });
    };
    return ibb;
};
exports.PrepareScalarPaths = PrepareScalarPaths;
var purifyGraphQLKey = function (k) { return k.replace(/\([^)]*\)/g, '').replace(/^[^:]*\:/g, ''); };
exports.purifyGraphQLKey = purifyGraphQLKey;
var mapPart = function (p) {
    var _a = p.split('<>'), isArg = _a[0], isField = _a[1];
    if (isField) {
        return {
            v: isField,
            __type: 'field',
        };
    }
    return {
        v: isArg,
        __type: 'arg',
    };
};
var ResolveFromPath = function (props, returns, ops) {
    var ResolvePropsType = function (mappedParts) {
        var oKey = ops[mappedParts[0].v];
        var propsP1 = oKey ? props[oKey] : props[mappedParts[0].v];
        if (propsP1 === 'enum' && mappedParts.length === 1) {
            return 'enum';
        }
        if (typeof propsP1 === 'string' && propsP1.startsWith('scalar.') && mappedParts.length === 1) {
            return propsP1;
        }
        if (typeof propsP1 === 'object') {
            if (mappedParts.length < 2) {
                return 'not';
            }
            var propsP2 = propsP1[mappedParts[1].v];
            if (typeof propsP2 === 'string') {
                return rpp("".concat(propsP2).concat(exports.SEPARATOR).concat(mappedParts
                    .slice(2)
                    .map(function (mp) { return mp.v; })
                    .join(exports.SEPARATOR)));
            }
            if (typeof propsP2 === 'object') {
                if (mappedParts.length < 3) {
                    return 'not';
                }
                var propsP3 = propsP2[mappedParts[2].v];
                if (propsP3 && mappedParts[2].__type === 'arg') {
                    return rpp("".concat(propsP3).concat(exports.SEPARATOR).concat(mappedParts
                        .slice(3)
                        .map(function (mp) { return mp.v; })
                        .join(exports.SEPARATOR)));
                }
            }
        }
    };
    var ResolveReturnType = function (mappedParts) {
        if (mappedParts.length === 0) {
            return 'not';
        }
        var oKey = ops[mappedParts[0].v];
        var returnP1 = oKey ? returns[oKey] : returns[mappedParts[0].v];
        if (typeof returnP1 === 'object') {
            if (mappedParts.length < 2)
                return 'not';
            var returnP2 = returnP1[mappedParts[1].v];
            if (returnP2) {
                return rpp("".concat(returnP2).concat(exports.SEPARATOR).concat(mappedParts
                    .slice(2)
                    .map(function (mp) { return mp.v; })
                    .join(exports.SEPARATOR)));
            }
        }
    };
    var rpp = function (path) {
        var parts = path.split(exports.SEPARATOR).filter(function (l) { return l.length > 0; });
        var mappedParts = parts.map(mapPart);
        var propsP1 = ResolvePropsType(mappedParts);
        if (propsP1) {
            return propsP1;
        }
        var returnP1 = ResolveReturnType(mappedParts);
        if (returnP1) {
            return returnP1;
        }
        return 'not';
    };
    return rpp;
};
exports.ResolveFromPath = ResolveFromPath;
var InternalArgsBuilt = function (_a) {
    var props = _a.props, ops = _a.ops, returns = _a.returns, scalars = _a.scalars, vars = _a.vars;
    var arb = function (a, p, root) {
        var _a, _b;
        if (p === void 0) { p = ''; }
        if (root === void 0) { root = true; }
        if (typeof a === 'string') {
            if (a.startsWith(exports.START_VAR_NAME)) {
                var _c = a.replace(exports.START_VAR_NAME, '$').split(exports.GRAPHQL_TYPE_SEPARATOR), varName_1 = _c[0], graphQLType = _c[1];
                var v = vars.find(function (v) { return v.name === varName_1; });
                if (!v) {
                    vars.push({
                        name: varName_1,
                        graphQLType: graphQLType,
                    });
                }
                else {
                    if (v.graphQLType !== graphQLType) {
                        throw new Error("Invalid variable exists with two different GraphQL Types, \"".concat(v.graphQLType, "\" and ").concat(graphQLType));
                    }
                }
                return varName_1;
            }
        }
        var checkType = (0, exports.ResolveFromPath)(props, returns, ops)(p);
        if (checkType.startsWith('scalar.')) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            var _d = checkType.split('.'), _1 = _d[0], splittedScalar = _d.slice(1);
            var scalarKey = splittedScalar.join('.');
            return ((_b = (_a = scalars === null || scalars === void 0 ? void 0 : scalars[scalarKey]) === null || _a === void 0 ? void 0 : _a.encode) === null || _b === void 0 ? void 0 : _b.call(_a, a)) || JSON.stringify(a);
        }
        if (Array.isArray(a)) {
            return "[".concat(a.map(function (arr) { return arb(arr, p, false); }).join(', '), "]");
        }
        if (typeof a === 'string') {
            if (checkType === 'enum') {
                return a;
            }
            return "".concat(JSON.stringify(a));
        }
        if (typeof a === 'object') {
            if (a === null) {
                return "null";
            }
            var returnedObjectString = Object.entries(a)
                .filter(function (_a) {
                var v = _a[1];
                return typeof v !== 'undefined';
            })
                .map(function (_a) {
                var k = _a[0], v = _a[1];
                return "".concat(k, ": ").concat(arb(v, [p, k].join(exports.SEPARATOR), false));
            })
                .join(',\n');
            if (!root) {
                return "{".concat(returnedObjectString, "}");
            }
            return returnedObjectString;
        }
        return "".concat(a);
    };
    return arb;
};
exports.InternalArgsBuilt = InternalArgsBuilt;
var resolverFor = function (type, field, fn) { return fn; };
exports.resolverFor = resolverFor;
exports.START_VAR_NAME = "$ZEUS_VAR";
exports.GRAPHQL_TYPE_SEPARATOR = "__$GRAPHQL__";
var $ = function (name, graphqlType) {
    return (exports.START_VAR_NAME + name + exports.GRAPHQL_TYPE_SEPARATOR + graphqlType);
};
exports.$ = $;
