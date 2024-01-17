var $hxClasses = {},
	$estr = function() {
		return js_Boot.__string_rec(this, "")
	},
	$hxEnums = $hxEnums || {},
	$_;

function $extend(e, t) {
	var s = Object.create(e);
	for (var i in t) s[i] = t[i];
	return t.toString !== Object.prototype.toString && (s.toString = t.toString), s
}
var EReg = function(e, t) {
	this.r = new RegExp(e, t.split("u").join(""))
};
$hxClasses.EReg = EReg, EReg.__name__ = "EReg", EReg.prototype = {
	match: function(e) {
		return this.r.global && (this.r.lastIndex = 0), this.r.m = this.r.exec(e), this.r.s = e, null != this.r.m
	},
	matched: function(e) {
		if (null != this.r.m && 0 <= e && e < this.r.m.length) return this.r.m[e];
		throw haxe_Exception.thrown("EReg::matched")
	},
	split: function(e) {
		var t = "#__delim__#";
		return e.replace(this.r, t).split(t)
	},
	__class__: EReg
};
var HxOverrides = function() {};
$hxClasses.HxOverrides = HxOverrides, HxOverrides.__name__ = "HxOverrides", HxOverrides.strDate = function(e) {
	switch (e.length) {
		case 8:
			var t = e.split(":"),
				s = new Date;
			return s.setTime(0), s.setUTCHours(t[0]), s.setUTCMinutes(t[1]), s.setUTCSeconds(t[2]), s;
		case 10:
			t = e.split("-");
			return new Date(t[0], t[1] - 1, t[2], 0, 0, 0);
		case 19:
			var i = (t = e.split(" "))[0].split("-"),
				r = t[1].split(":");
			return new Date(i[0], i[1] - 1, i[2], r[0], r[1], r[2]);
		default:
			throw haxe_Exception.thrown("Invalid date format : " + e)
	}
}, HxOverrides.cca = function(e, t) {
	var s = e.charCodeAt(t);
	if (s == s) return s
}, HxOverrides.substr = function(e, t, s) {
	if (null == s) s = e.length;
	else if (s < 0) {
		if (0 != t) return "";
		s = e.length + s
	}
	return e.substr(t, s)
}, HxOverrides.remove = function(e, t) {
	var s = e.indexOf(t);
	return -1 != s && (e.splice(s, 1), !0)
}, HxOverrides.now = function() {
	return Date.now()
};
var Lambda = function() {};
$hxClasses.Lambda = Lambda, Lambda.__name__ = "Lambda", Lambda.has = function(e, t) {
	for (var s = $getIterator(e); s.hasNext();) {
		if (s.next() == t) return !0
	}
	return !1
}, Lambda.exists = function(e, t) {
	for (var s = $getIterator(e); s.hasNext();) {
		if (t(s.next())) return !0
	}
	return !1
}, Math.__name__ = "Math";
var Reflect = function() {};
$hxClasses.Reflect = Reflect, Reflect.__name__ = "Reflect", Reflect.field = function(e, t) {
	try {
		return e[t]
	} catch (e) {
		return null
	}
}, Reflect.getProperty = function(e, t) {
	var s;
	if (null == e) return null;
	var i = !!e.__properties__ && (s = e.__properties__["get_" + t]);
	return i ? e[s]() : e[t]
}, Reflect.setProperty = function(e, t, s) {
	var i, r = !!e.__properties__ && (i = e.__properties__["set_" + t]);
	r ? e[i](s) : e[t] = s
}, Reflect.fields = function(e) {
	var t = [];
	if (null != e) {
		var s = Object.prototype.hasOwnProperty;
		for (var i in e) "__id__" != i && "hx__closures__" != i && s.call(e, i) && t.push(i)
	}
	return t
}, Reflect.isFunction = function(e) {
	return "function" == typeof e && !(e.__name__ || e.__ename__)
}, Reflect.compareMethods = function(e, t) {
	return e == t || !(!Reflect.isFunction(e) || !Reflect.isFunction(t)) && (e.scope == t.scope && e.method == t.method && null != e.method)
}, Reflect.deleteField = function(e, t) {
	return !!Object.prototype.hasOwnProperty.call(e, t) && (delete e[t], !0)
};
var Std = function() {};
$hxClasses.Std = Std, Std.__name__ = "Std", Std.string = function(e) {
	return js_Boot.__string_rec(e, "")
}, Std.parseInt = function(e) {
	if (null != e)
		for (var t = 0, s = e.length; t < s;) {
			var i = t++,
				r = e.charCodeAt(i);
			if (r <= 8 || 14 <= r && 32 != r && 45 != r) {
				var n = e.charCodeAt(1 + i),
					_ = parseInt(e, 120 == n || 88 == n ? 16 : 10);
				return isNaN(_) ? null : _
			}
		}
	return null
}, Std.random = function(e) {
	return e <= 0 ? 0 : Math.floor(Math.random() * e)
};
var StringBuf = function() {
	this.b = ""
};
$hxClasses.StringBuf = StringBuf, StringBuf.__name__ = "StringBuf", StringBuf.prototype = {
	__class__: StringBuf
};
var StringTools = function() {};
$hxClasses.StringTools = StringTools, StringTools.__name__ = "StringTools", StringTools.htmlEscape = function(e, t) {
	for (var s = "", i = 0, r = e; i < r.length;) {
		var n = i++,
			_ = (e = r).charCodeAt(n);
		55296 <= _ && _ <= 56319 && (_ = _ - 55232 << 10 | 1023 & e.charCodeAt(1 + n)), 65536 <= _ && ++i;
		var a = _;
		switch (a) {
			case 34:
				s += t ? "&quot;" : String.fromCodePoint(a);
				break;
			case 38:
				s += "&amp;";
				break;
			case 39:
				s += t ? "&#039;" : String.fromCodePoint(a);
				break;
			case 60:
				s += "&lt;";
				break;
			case 62:
				s += "&gt;";
				break;
			default:
				s += String.fromCodePoint(a)
		}
	}
	return s
}, StringTools.isSpace = function(e, t) {
	var s = HxOverrides.cca(e, t);
	return 8 < s && s < 14 || 32 == s
}, StringTools.ltrim = function(e) {
	for (var t = e.length, s = 0; s < t && StringTools.isSpace(e, s);) ++s;
	return 0 < s ? HxOverrides.substr(e, s, t - s) : e
}, StringTools.rtrim = function(e) {
	for (var t = e.length, s = 0; s < t && StringTools.isSpace(e, t - s - 1);) ++s;
	return 0 < s ? HxOverrides.substr(e, 0, t - s) : e
}, StringTools.trim = function(e) {
	return StringTools.ltrim(StringTools.rtrim(e))
}, StringTools.replace = function(e, t, s) {
	return e.split(t).join(s)
}, StringTools.hex = function(e, t) {
	for (var s = ""; s = "0123456789ABCDEF".charAt(15 & e) + s, 0 < (e >>>= 4););
	if (null != t)
		for (; s.length < t;) s = "0" + s;
	return s
};
var ValueType = $hxEnums.ValueType = {
		__ename__: "ValueType",
		__constructs__: ["TNull", "TInt", "TFloat", "TBool", "TObject", "TFunction", "TClass", "TEnum", "TUnknown"],
		TNull: {
			_hx_index: 0,
			__enum__: "ValueType",
			toString: $estr
		},
		TInt: {
			_hx_index: 1,
			__enum__: "ValueType",
			toString: $estr
		},
		TFloat: {
			_hx_index: 2,
			__enum__: "ValueType",
			toString: $estr
		},
		TBool: {
			_hx_index: 3,
			__enum__: "ValueType",
			toString: $estr
		},
		TObject: {
			_hx_index: 4,
			__enum__: "ValueType",
			toString: $estr
		},
		TFunction: {
			_hx_index: 5,
			__enum__: "ValueType",
			toString: $estr
		},
		TClass: ($_ = function(e) {
			return {
				_hx_index: 6,
				c: e,
				__enum__: "ValueType",
				toString: $estr
			}
		}, $_.__params__ = ["c"], $_),
		TEnum: ($_ = function(e) {
			return {
				_hx_index: 7,
				e: e,
				__enum__: "ValueType",
				toString: $estr
			}
		}, $_.__params__ = ["e"], $_),
		TUnknown: {
			_hx_index: 8,
			__enum__: "ValueType",
			toString: $estr
		}
	},
	Type = function() {};
$hxClasses.Type = Type, Type.__name__ = "Type", Type.getEnum = function(e) {
	return null == e ? null : $hxEnums[e.__enum__]
}, Type.createEnum = function(e, t, s) {
	var i = Reflect.field(e, t);
	if (null == i) throw haxe_Exception.thrown("No such constructor " + t);
	if (Reflect.isFunction(i)) {
		if (null == s) throw haxe_Exception.thrown("Constructor " + t + " need parameters");
		return i.apply(e, s)
	}
	if (null != s && 0 != s.length) throw haxe_Exception.thrown("Constructor " + t + " does not need parameters");
	return i
}, Type.createEnumIndex = function(e, t, s) {
	var i = e.__constructs__[t];
	if (null == i) throw haxe_Exception.thrown(t + " is not a valid enum constructor index");
	return Type.createEnum(e, i, s)
}, Type.typeof = function(e) {
	switch (typeof e) {
		case "boolean":
			return ValueType.TBool;
		case "function":
			return e.__name__ || e.__ename__ ? ValueType.TObject : ValueType.TFunction;
		case "number":
			return Math.ceil(e) == e % 2147483648 ? ValueType.TInt : ValueType.TFloat;
		case "object":
			if (null == e) return ValueType.TNull;
			var t = e.__enum__;
			if (null != t) return ValueType.TEnum($hxEnums[t]);
			var s = js_Boot.getClass(e);
			return null != s ? ValueType.TClass(s) : ValueType.TObject;
		case "string":
			return ValueType.TClass(String);
		case "undefined":
			return ValueType.TNull;
		default:
			return ValueType.TUnknown
	}
}, Type.enumEq = function(e, t) {
	if (e == t) return !0;
	try {
		var s = e.__enum__;
		if (null == s || s != t.__enum__) return !1;
		if (e._hx_index != t._hx_index) return !1;
		for (var i = $hxEnums[s], r = i[i.__constructs__[e._hx_index]].__params__, n = 0; n < r.length;) {
			var _ = r[n];
			if (++n, !Type.enumEq(e[_], t[_])) return !1
		}
	} catch (n) {
		return !1
	}
	return !0
}, Type.enumParameters = function(e) {
	var t = $hxEnums[e.__enum__],
		s = t[t.__constructs__[e._hx_index]].__params__;
	if (null == s) return [];
	for (var i = [], r = 0; r < s.length;) {
		var n = s[r];
		++r, i.push(e[n])
	}
	return i
};
var XmlType = {
		toString: function(e) {
			switch (e) {
				case 0:
					return "Element";
				case 1:
					return "PCData";
				case 2:
					return "CData";
				case 3:
					return "Comment";
				case 4:
					return "DocType";
				case 5:
					return "ProcessingInstruction";
				case 6:
					return "Document"
			}
		}
	},
	Xml = function(e) {
		this.nodeType = e, this.children = [], this.attributeMap = new haxe_ds_StringMap
	};
$hxClasses.Xml = Xml, Xml.__name__ = "Xml", Xml.parse = function(e) {
	return haxe_xml_Parser.parse(e)
}, Xml.createElement = function(e) {
	var t = new Xml(Xml.Element);
	if (t.nodeType != Xml.Element) throw haxe_Exception.thrown("Bad node type, expected Element but found " + (null == t.nodeType ? "null" : XmlType.toString(t.nodeType)));
	return t.nodeName = e, t
}, Xml.createPCData = function(e) {
	var t = new Xml(Xml.PCData);
	if (t.nodeType == Xml.Document || t.nodeType == Xml.Element) throw haxe_Exception.thrown("Bad node type, unexpected " + (null == t.nodeType ? "null" : XmlType.toString(t.nodeType)));
	return t.nodeValue = e, t
}, Xml.createCData = function(e) {
	var t = new Xml(Xml.CData);
	if (t.nodeType == Xml.Document || t.nodeType == Xml.Element) throw haxe_Exception.thrown("Bad node type, unexpected " + (null == t.nodeType ? "null" : XmlType.toString(t.nodeType)));
	return t.nodeValue = e, t
}, Xml.createComment = function(e) {
	var t = new Xml(Xml.Comment);
	if (t.nodeType == Xml.Document || t.nodeType == Xml.Element) throw haxe_Exception.thrown("Bad node type, unexpected " + (null == t.nodeType ? "null" : XmlType.toString(t.nodeType)));
	return t.nodeValue = e, t
}, Xml.createDocType = function(e) {
	var t = new Xml(Xml.DocType);
	if (t.nodeType == Xml.Document || t.nodeType == Xml.Element) throw haxe_Exception.thrown("Bad node type, unexpected " + (null == t.nodeType ? "null" : XmlType.toString(t.nodeType)));
	return t.nodeValue = e, t
}, Xml.createProcessingInstruction = function(e) {
	var t = new Xml(Xml.ProcessingInstruction);
	if (t.nodeType == Xml.Document || t.nodeType == Xml.Element) throw haxe_Exception.thrown("Bad node type, unexpected " + (null == t.nodeType ? "null" : XmlType.toString(t.nodeType)));
	return t.nodeValue = e, t
}, Xml.createDocument = function() {
	return new Xml(Xml.Document)
}, Xml.prototype = {
	get: function(e) {
		if (this.nodeType != Xml.Element) throw haxe_Exception.thrown("Bad node type, expected Element but found " + (null == this.nodeType ? "null" : XmlType.toString(this.nodeType)));
		return this.attributeMap.h[e]
	},
	set: function(e, t) {
		if (this.nodeType != Xml.Element) throw haxe_Exception.thrown("Bad node type, expected Element but found " + (null == this.nodeType ? "null" : XmlType.toString(this.nodeType)));
		this.attributeMap.h[e] = t
	},
	exists: function(e) {
		if (this.nodeType != Xml.Element) throw haxe_Exception.thrown("Bad node type, expected Element but found " + (null == this.nodeType ? "null" : XmlType.toString(this.nodeType)));
		return Object.prototype.hasOwnProperty.call(this.attributeMap.h, e)
	},
	attributes: function() {
		if (this.nodeType != Xml.Element) throw haxe_Exception.thrown("Bad node type, expected Element but found " + (null == this.nodeType ? "null" : XmlType.toString(this.nodeType)));
		return haxe_ds_StringMap.keysIterator(this.attributeMap.h)
	},
	elements: function() {
		if (this.nodeType != Xml.Document && this.nodeType != Xml.Element) throw haxe_Exception.thrown("Bad node type, expected Element or Document but found " + (null == this.nodeType ? "null" : XmlType.toString(this.nodeType)));
		for (var e = [], t = 0, s = this.children; t < s.length;) {
			var i = s[t];
			++t, i.nodeType == Xml.Element && e.push(i)
		}
		return new haxe_iterators_ArrayIterator(e)
	},
	firstElement: function() {
		if (this.nodeType != Xml.Document && this.nodeType != Xml.Element) throw haxe_Exception.thrown("Bad node type, expected Element or Document but found " + (null == this.nodeType ? "null" : XmlType.toString(this.nodeType)));
		for (var e = 0, t = this.children; e < t.length;) {
			var s = t[e];
			if (++e, s.nodeType == Xml.Element) return s
		}
		return null
	},
	addChild: function(e) {
		if (this.nodeType != Xml.Document && this.nodeType != Xml.Element) throw haxe_Exception.thrown("Bad node type, expected Element or Document but found " + (null == this.nodeType ? "null" : XmlType.toString(this.nodeType)));
		null != e.parent && e.parent.removeChild(e), this.children.push(e), e.parent = this
	},
	removeChild: function(e) {
		if (this.nodeType != Xml.Document && this.nodeType != Xml.Element) throw haxe_Exception.thrown("Bad node type, expected Element or Document but found " + (null == this.nodeType ? "null" : XmlType.toString(this.nodeType)));
		return !!HxOverrides.remove(this.children, e) && !(e.parent = null)
	},
	toString: function() {
		return haxe_xml_Printer.print(this)
	},
	__class__: Xml
};
var awe6_interfaces_IPauseable = function() {};
$hxClasses["awe6.interfaces.IPauseable"] = awe6_interfaces_IPauseable, awe6_interfaces_IPauseable.__name__ = "awe6.interfaces.IPauseable", awe6_interfaces_IPauseable.__isInterface__ = !0, awe6_interfaces_IPauseable.prototype = {
	__class__: awe6_interfaces_IPauseable
};
var awe6_interfaces_IDisposable = function() {};
$hxClasses["awe6.interfaces.IDisposable"] = awe6_interfaces_IDisposable, awe6_interfaces_IDisposable.__name__ = "awe6.interfaces.IDisposable", awe6_interfaces_IDisposable.__isInterface__ = !0, awe6_interfaces_IDisposable.prototype = {
	__class__: awe6_interfaces_IDisposable
};
var awe6_interfaces_IUpdateable = function() {};
$hxClasses["awe6.interfaces.IUpdateable"] = awe6_interfaces_IUpdateable, awe6_interfaces_IUpdateable.__name__ = "awe6.interfaces.IUpdateable", awe6_interfaces_IUpdateable.__isInterface__ = !0, awe6_interfaces_IUpdateable.prototype = {
	__class__: awe6_interfaces_IUpdateable
};
var awe6_interfaces_IProcess = function() {};
$hxClasses["awe6.interfaces.IProcess"] = awe6_interfaces_IProcess, awe6_interfaces_IProcess.__name__ = "awe6.interfaces.IProcess", awe6_interfaces_IProcess.__isInterface__ = !0, awe6_interfaces_IProcess.__interfaces__ = [awe6_interfaces_IPauseable, awe6_interfaces_IDisposable, awe6_interfaces_IUpdateable];
var awe6_core_Process = function(e) {
	this._kernel = e, this._tools = this._kernel.tools, this._isEntity = js_Boot.__implements(this, awe6_interfaces_IEntity), this._init()
};
$hxClasses["awe6.core.Process"] = awe6_core_Process, awe6_core_Process.__name__ = "awe6.core.Process", awe6_core_Process.__interfaces__ = [awe6_interfaces_IProcess], awe6_core_Process.prototype = {
	_init: function() {
		this._isIsActiveSetterBypassed = !0, this.set_isActive(!0), this.isDisposed = !1, this._age = 0, this._updates = 0
	},
	dispose: function() {
		this.isDisposed || (this.isDisposed = !0, this.set_isActive(!1), this._disposer())
	},
	_disposer: function() {},
	getAge: function(e) {
		return null == e && (e = !0), e ? this._age : this._updates
	},
	update: function(e) {
		null == e && (e = 0), this.isActive && !this.isDisposed && (this._age += e, this._updates++, this._updater(e))
	},
	_updater: function(e) {
		null == e && (e = 0)
	},
	set_isActive: function(e) {
		return this.isDisposed ? this.isActive = !1 : (e != this.isActive && (this._isIsActiveSetterBypassed ? this.isActive = e : e ? this.isActive || this.isDisposed || (this._resumer(), this._isIsActiveSetterBypassed = !0, this.set_isActive(!0), this._isEntity && this._kernel.messenger.sendMessage(awe6_interfaces_EMessage.RESUME, this, !0, !0, !0)) : this.isActive && !this.isDisposed && (this._pauser(), this._isIsActiveSetterBypassed = !0, this.set_isActive(!1), this._isEntity && this._kernel.messenger.sendMessage(awe6_interfaces_EMessage.PAUSE, this, !0, !0, !0))), this._isIsActiveSetterBypassed = !1, this.isActive)
	},
	pause: function() {
		this.isActive && !this.isDisposed && (this._pauser(), this._isIsActiveSetterBypassed = !0, this.set_isActive(!1), this._isEntity && this._kernel.messenger.sendMessage(awe6_interfaces_EMessage.PAUSE, this, !0, !0, !0))
	},
	_pauser: function() {},
	resume: function() {
		this.isActive || this.isDisposed || (this._resumer(), this._isIsActiveSetterBypassed = !0, this.set_isActive(!0), this._isEntity && this._kernel.messenger.sendMessage(awe6_interfaces_EMessage.RESUME, this, !0, !0, !0))
	},
	_resumer: function() {},
	__class__: awe6_core_Process,
	__properties__: {
		set_isActive: "set_isActive"
	}
};
var awe6_interfaces_IAgendaManager = function() {};
$hxClasses["awe6.interfaces.IAgendaManager"] = awe6_interfaces_IAgendaManager, awe6_interfaces_IAgendaManager.__name__ = "awe6.interfaces.IAgendaManager", awe6_interfaces_IAgendaManager.__isInterface__ = !0, awe6_interfaces_IAgendaManager.prototype = {
	__class__: awe6_interfaces_IAgendaManager
};
var awe6_interfaces_IEntityCollection = function() {};
$hxClasses["awe6.interfaces.IEntityCollection"] = awe6_interfaces_IEntityCollection, awe6_interfaces_IEntityCollection.__name__ = "awe6.interfaces.IEntityCollection", awe6_interfaces_IEntityCollection.__isInterface__ = !0, awe6_interfaces_IEntityCollection.__interfaces__ = [awe6_interfaces_IAgendaManager], awe6_interfaces_IEntityCollection.prototype = {
	__class__: awe6_interfaces_IEntityCollection
};
var awe6_interfaces_IViewable = function() {};
$hxClasses["awe6.interfaces.IViewable"] = awe6_interfaces_IViewable, awe6_interfaces_IViewable.__name__ = "awe6.interfaces.IViewable", awe6_interfaces_IViewable.__isInterface__ = !0, awe6_interfaces_IViewable.prototype = {
	__class__: awe6_interfaces_IViewable,
	__properties__: {
		get_view: "get_view"
	}
};
var awe6_interfaces_IEntity = function() {};
$hxClasses["awe6.interfaces.IEntity"] = awe6_interfaces_IEntity, awe6_interfaces_IEntity.__name__ = "awe6.interfaces.IEntity", awe6_interfaces_IEntity.__isInterface__ = !0, awe6_interfaces_IEntity.__interfaces__ = [awe6_interfaces_IEntityCollection, awe6_interfaces_IViewable, awe6_interfaces_IProcess], awe6_interfaces_IEntity.prototype = {
	__class__: awe6_interfaces_IEntity,
	__properties__: {
		get_parent: "get_parent"
	}
};
var awe6_core_Entity = function(e, t, s) {
	null == this.get_view() && (this.view = new awe6_core_drivers_createjs_View(e, s, 0, this)), this.set_id(null == t ? e.tools.createGuid() : t), awe6_core_Process.call(this, e)
};
$hxClasses["awe6.core.Entity"] = awe6_core_Entity, awe6_core_Entity.__name__ = "awe6.core.Entity", awe6_core_Entity.__interfaces__ = [awe6_interfaces_IEntity], awe6_core_Entity.__super__ = awe6_core_Process, awe6_core_Entity.prototype = $extend(awe6_core_Process.prototype, {
	_init: function() {
		awe6_core_Process.prototype._init.call(this), this.agenda = awe6_interfaces_EAgenda.ALWAYS, this._entityAgendaPairs = new haxe_ds_GenericStack, this._isAgendaDirty = !0, this._cachedEntities = []
	},
	_updater: function(e) {
		null == e && (e = 0), awe6_core_Process.prototype._updater.call(this, e), this._isAgendaDirty && (this._cachedEntities = this._getEntities(this.get_agenda()), Type.enumEq(this.get_agenda(), awe6_interfaces_EAgenda.ALWAYS) || (this._cachedEntities = this._cachedEntities.concat(this._getEntities(awe6_interfaces_EAgenda.ALWAYS))), this._isAgendaDirty = !1);
		for (var t = 0, s = this._cachedEntities; t < s.length;) {
			var i = s[t];
			++t, i.update(e)
		}
	},
	_disposer: function() {
		this.remove(), this._kernel.messenger.removeSubscribers(this), this._kernel.messenger.removeSubscribers(null, null, null, this, null);
		var e = this._getEntities();
		e.reverse();
		for (var t = 0; t < e.length;) {
			var s = e[t];
			++t, s.dispose()
		}
		for (s = this._entityAgendaPairs.iterator(); s.hasNext();) {
			var i = s.next();
			this._entityAgendaPairs.remove(i)
		}
		this.get_view().dispose(), awe6_core_Process.prototype._disposer.call(this)
	},
	addEntity: function(e, t, s, i) {
		if (null == i && (i = 0), null == s && (s = !1), this.isDisposed || null == e) return null;
		null == t && (t = awe6_interfaces_EAgenda.ALWAYS);
		for (var r = this._entityAgendaPairs.iterator(); r.hasNext();) {
			var n = r.next();
			if (n.entity == e && Type.enumEq(n.agenda, t)) return e
		}
		this._isAgendaDirty = !0, e.get_parent() != this && (e.remove(s), e instanceof awe6_core_Entity && e._setParent(this));
		var _ = new awe6_core__$Entity__$HelperEntityAgendaPair(e, t),
			a = this._entityAgendaPairs;
		return a.head = new haxe_ds_GenericCell(_, a.head), s && (Type.enumEq(t, this.get_agenda()) || t == awe6_interfaces_EAgenda.ALWAYS ? this.get_view().addChild(e.get_view(), i) : (e.get_view().set_priority(i), _.isAddedToView = !0)), e
	},
	removeEntity: function(e, t, s) {
		if (null == s && (s = !1), !this.isDisposed && null != e) {
			for (var i = !1, r = this._entityAgendaPairs.iterator(); r.hasNext();) {
				var n = r.next();
				n.entity != e || null != t && !Type.enumEq(n.agenda, t) || (this._entityAgendaPairs.remove(n), i = !0)
			}
			i && (this._isAgendaDirty = !0, e instanceof awe6_core_Entity && e._setParent(null), s && e.get_view().remove())
		}
	},
	remove: function(e) {
		null == e && (e = !1), null != this.get_parent() && this.get_parent().removeEntity(this, null, e)
	},
	getEntities: function(e) {
		return this._getEntities(e)
	},
	_getEntities: function(e) {
		if (!this._isAgendaDirty && (null == e || Type.enumEq(e, this.get_agenda()))) return this._cachedEntities;
		for (var t = [], s = this._entityAgendaPairs.iterator(); s.hasNext();) {
			var i = s.next();
			null != e && !Type.enumEq(e, i.agenda) || t.push(i.entity)
		}
		return t.reverse(), t
	},
	getEntitiesByClass: function(e, t, s, i, r) {
		if (null == r && (r = !1), null == i && (i = !1), null == s && (s = !1), r && null != this._kernel.scenes.get_scene()) return this._kernel.scenes.get_scene().getEntitiesByClass(e, t, !0);
		for (var n = [], _ = this._getEntities(t), a = 0; a < _.length;) {
			var o = _[a];
			++a, js_Boot.__instanceof(o, e) && n.push(o), s && (n = n.concat(o.getEntitiesByClass(e, t, !0)))
		}
		return i && null != this.get_parent() && (n = n.concat(this.get_parent().getEntitiesByClass(e, t, !1, !0))), n
	},
	setAgenda: function(e) {
		if (null == e && (e = awe6_interfaces_EAgenda.ALWAYS), Type.enumEq(this.get_agenda(), e)) return !1;
		this._isAgendaDirty = !0;
		for (var t = this._entityAgendaPairs.iterator(); t.hasNext();) {
			var s = t.next(),
				i = Type.enumEq(this.get_agenda(), s.agenda) && s.entity.get_view().get_parent() == this.get_view();
			i && s.entity.get_view().remove(), s.isAddedToView = s.isAddedToView || i
		}
		this.agenda = e;
		for (t = this._entityAgendaPairs.iterator(); t.hasNext();) {
			(s = t.next()).isAddedToView && (Type.enumEq(awe6_interfaces_EAgenda.ALWAYS, s.agenda) || Type.enumEq(this.get_agenda(), s.agenda)) && this.get_view().addChild(s.entity.get_view())
		}
		return !0
	},
	_setParent: function(e) {
		this.parent = e
	},
	set_id: function(e) {
		return this.id = e, this.id
	},
	get_agenda: function() {
		return this.agenda
	},
	get_parent: function() {
		return this.parent
	},
	get_view: function() {
		return this.view
	},
	__class__: awe6_core_Entity,
	__properties__: $extend(awe6_core_Process.prototype.__properties__, {
		get_view: "get_view",
		get_parent: "get_parent",
		get_agenda: "get_agenda",
		set_id: "set_id"
	})
});
var awe6_interfaces_IPositionable = function() {};
$hxClasses["awe6.interfaces.IPositionable"] = awe6_interfaces_IPositionable, awe6_interfaces_IPositionable.__name__ = "awe6.interfaces.IPositionable", awe6_interfaces_IPositionable.__isInterface__ = !0, awe6_interfaces_IPositionable.prototype = {
	__class__: awe6_interfaces_IPositionable,
	__properties__: {
		set_y: "set_y",
		set_x: "set_x"
	}
};
var awe6_core_BasicButton = function(e, t, s, i, r, n, _, a, o, c, h) {
	null == _ && (_ = 0), null == n && (n = 0), null == r && (r = 20), null == i && (i = 100), this._stateUp = new awe6_core__$BasicButton__$HelperState(e, t), this._stateOver = new awe6_core__$BasicButton__$HelperState(e, s), this.x = n, this.y = _, this.set_width(i), this.set_height(r), this._keyType = a, this.onClickCallback = o, this.onRollOverCallback = c, this.onRollOutCallback = h, awe6_core_Entity.call(this, e)
};
$hxClasses["awe6.core.BasicButton"] = awe6_core_BasicButton, awe6_core_BasicButton.__name__ = "awe6.core.BasicButton", awe6_core_BasicButton.__interfaces__ = [awe6_interfaces_IPositionable], awe6_core_BasicButton.__super__ = awe6_core_Entity, awe6_core_BasicButton.prototype = $extend(awe6_core_Entity.prototype, {
	_init: function() {
		awe6_core_Entity.prototype._init.call(this), this.get_view().set_x(this.x), this.get_view().set_y(this.y), this.isOver = !1, this.addEntity(this._stateUp, awe6_interfaces_EAgenda.SUB_TYPE(awe6_core__$BasicButton__$HelperEState.UP), !0), this.addEntity(this._stateOver, awe6_interfaces_EAgenda.SUB_TYPE(awe6_core__$BasicButton__$HelperEState.OVER), !0), this.setAgenda(awe6_interfaces_EAgenda.SUB_TYPE(awe6_core__$BasicButton__$HelperEState.UP))
	},
	_updater: function(e) {
		null == e && (e = 0), awe6_core_Entity.prototype._updater.call(this, e);
		var t = this._kernel.inputs.mouse,
			s = this._isPointInsideRectangle(t.x + this.get_view().x - this.get_view().globalX, t.y + this.get_view().y - this.get_view().globalY, this.x, this.y, this.width, this.height);
		s && t.set_cursorType(awe6_interfaces_EMouseCursor.BUTTON), s && !this.isOver && this.onRollOver(), !s && this.isOver && (t.set_cursorType(awe6_interfaces_EMouseCursor.AUTO), this.onRollOut()), this.isOver = s, this.isOver && t.getIsButtonDown() && this.setAgenda(awe6_interfaces_EAgenda.SUB_TYPE(awe6_core__$BasicButton__$HelperEState.OVER)), this.isOver && t.getIsButtonRelease() && this.onClick(), null != this._keyType && this._kernel.inputs.keyboard.getIsKeyRelease(this._keyType) && this.onClick()
	},
	_isPointInsideRectangle: function(e, t, s, i, r, n) {
		return !(e < s) && (!(t < i) && (!(s + r < e) && !(i + n < t)))
	},
	onClick: function() {
		this.setAgenda(awe6_interfaces_EAgenda.SUB_TYPE(awe6_core__$BasicButton__$HelperEState.UP)), null != this.onClickCallback && this.onClickCallback()
	},
	onRollOver: function() {
		this.setAgenda(awe6_interfaces_EAgenda.SUB_TYPE(awe6_core__$BasicButton__$HelperEState.OVER)), null != this.onRollOverCallback && this.onRollOverCallback()
	},
	onRollOut: function() {
		this.setAgenda(awe6_interfaces_EAgenda.SUB_TYPE(awe6_core__$BasicButton__$HelperEState.UP)), null != this.onRollOutCallback && this.onRollOutCallback()
	},
	setPosition: function(e, t) {
		this.set_x(e), this.set_y(t)
	},
	set_x: function(e) {
		return this.x = e, null != this.get_view() && this.get_view().set_x(this.x), this.x
	},
	set_y: function(e) {
		return this.y = e, null != this.get_view() && this.get_view().set_y(this.y), this.y
	},
	set_width: function(e) {
		return this.width = e, this.width
	},
	set_height: function(e) {
		return this.height = e, this.height
	},
	__class__: awe6_core_BasicButton,
	__properties__: $extend(awe6_core_Entity.prototype.__properties__, {
		set_height: "set_height",
		set_width: "set_width",
		set_y: "set_y",
		set_x: "set_x"
	})
});
var awe6_core__$BasicButton__$HelperState = function(e, t) {
	awe6_core_Entity.call(this, e), this.view = t
};
$hxClasses["awe6.core._BasicButton._HelperState"] = awe6_core__$BasicButton__$HelperState, awe6_core__$BasicButton__$HelperState.__name__ = "awe6.core._BasicButton._HelperState", awe6_core__$BasicButton__$HelperState.__super__ = awe6_core_Entity, awe6_core__$BasicButton__$HelperState.prototype = $extend(awe6_core_Entity.prototype, {
	__class__: awe6_core__$BasicButton__$HelperState
});
var awe6_core__$BasicButton__$HelperEState = $hxEnums["awe6.core._BasicButton._HelperEState"] = {
		__ename__: "awe6.core._BasicButton._HelperEState",
		__constructs__: ["UP", "OVER"],
		UP: {
			_hx_index: 0,
			__enum__: "awe6.core._BasicButton._HelperEState",
			toString: $estr
		},
		OVER: {
			_hx_index: 1,
			__enum__: "awe6.core._BasicButton._HelperEState",
			toString: $estr
		}
	},
	awe6_interfaces_IEncrypter = function() {};
$hxClasses["awe6.interfaces.IEncrypter"] = awe6_interfaces_IEncrypter, awe6_interfaces_IEncrypter.__name__ = "awe6.interfaces.IEncrypter", awe6_interfaces_IEncrypter.__isInterface__ = !0, awe6_interfaces_IEncrypter.prototype = {
	__class__: awe6_interfaces_IEncrypter
};
var awe6_core_Encrypter = function(e) {
	this._defaultSecret = e
};
$hxClasses["awe6.core.Encrypter"] = awe6_core_Encrypter, awe6_core_Encrypter.__name__ = "awe6.core.Encrypter", awe6_core_Encrypter.__interfaces__ = [awe6_interfaces_IEncrypter], awe6_core_Encrypter.prototype = {
	decrypt: function(e, t) {
		null == t && (t = "");
		var s = "" != t ? t : this._defaultSecret;
		return this._xor(e, s)
	},
	_xor: function(e, t) {
		for (var s = new haxe_io_Bytes(new ArrayBuffer(e.length)), i = 0, r = 0, n = s.length; r < n;) {
			var _ = r++;
			s.b[_] = e.b[_] ^ HxOverrides.cca(t, i), ++i >= t.length && (i = 0)
		}
		return s
	},
	__class__: awe6_core_Encrypter
};
var awe6_core__$Entity__$HelperEntityAgendaPair = function(e, t) {
	this.entity = e, this.agenda = t, this.isAddedToView = !1
};
$hxClasses["awe6.core._Entity._HelperEntityAgendaPair"] = awe6_core__$Entity__$HelperEntityAgendaPair, awe6_core__$Entity__$HelperEntityAgendaPair.__name__ = "awe6.core._Entity._HelperEntityAgendaPair", awe6_core__$Entity__$HelperEntityAgendaPair.prototype = {
	__class__: awe6_core__$Entity__$HelperEntityAgendaPair
};
var awe6_interfaces_IInputJoypad = function() {};
$hxClasses["awe6.interfaces.IInputJoypad"] = awe6_interfaces_IInputJoypad, awe6_interfaces_IInputJoypad.__name__ = "awe6.interfaces.IInputJoypad", awe6_interfaces_IInputJoypad.__isInterface__ = !0, awe6_interfaces_IInputJoypad.prototype = {
	__class__: awe6_interfaces_IInputJoypad
};
var awe6_core_InputJoypad = function(e, t, s, i, r, n, _, a, o, c, h, l, u, d) {
	this._kernel = e, this._keyUp = null != t ? t : awe6_interfaces_EKey.UP, this._keyRight = null != s ? s : awe6_interfaces_EKey.RIGHT, this._keyDown = null != i ? i : awe6_interfaces_EKey.DOWN, this._keyLeft = null != r ? r : awe6_interfaces_EKey.LEFT, this._keyPrimary = null != n ? n : awe6_interfaces_EKey.SPACE, this._keySecondary = null != _ ? _ : awe6_interfaces_EKey.Z, this._keyUpAlt = null != a ? a : awe6_interfaces_EKey.W, this._keyRightAlt = null != o ? o : awe6_interfaces_EKey.D, this._keyDownAlt = null != c ? c : awe6_interfaces_EKey.S, this._keyLeftAlt = null != h ? h : awe6_interfaces_EKey.A, this._keyPrimaryAlt = null != l ? l : awe6_interfaces_EKey.Q, this._keySecondaryAlt = null != u ? u : awe6_interfaces_EKey.E, this._joypadTouchType = null != d ? d : this._kernel.factory.joypadTouchType, this._isTouchEnabled = this._kernel.factory.joypadTouchType != awe6_interfaces_EJoypadTouch.DISABLED, this._joypadStateCache = {
		age: 0,
		isFire: !1,
		isUp: !1,
		isRight: !1,
		isDown: !1,
		isLeft: !1,
		isPrevFire: !1,
		isPrevUp: !1,
		isPrevRight: !1,
		isPrevDown: !1,
		isPrevLeft: !1
	}
};
$hxClasses["awe6.core.InputJoypad"] = awe6_core_InputJoypad, awe6_core_InputJoypad.__name__ = "awe6.core.InputJoypad", awe6_core_InputJoypad.__interfaces__ = [awe6_interfaces_IInputJoypad], awe6_core_InputJoypad.prototype = {
	_checkKeyboard: function(e, t) {
		switch (e._hx_index) {
			case 0:
				return !!this._checkKeyboard(awe6_interfaces_EJoypadButton.PRIMARY, t) || this._checkKeyboard(awe6_interfaces_EJoypadButton.SECONDARY, t);
			case 1:
				return !!t(this._keyUp) || t(this._keyUpAlt);
			case 2:
				return !!t(this._keyRight) || t(this._keyRightAlt);
			case 3:
				return !!t(this._keyDown) || t(this._keyDownAlt);
			case 4:
				return !!t(this._keyLeft) || t(this._keyLeftAlt);
			case 5:
				return !!t(this._keyPrimary) || t(this._keyPrimaryAlt);
			case 6:
				return !!t(this._keySecondary) || t(this._keySecondaryAlt)
		}
	},
	getIsButtonDown: function(e) {
		return !!this._checkKeyboard(e, $bind($_ = this._kernel.inputs.keyboard, $_.getIsKeyDown)) || !!this._isTouchEnabled && this._checkTouchIsDown(e)
	},
	getIsButtonPress: function(e) {
		return !!this._checkKeyboard(e, $bind($_ = this._kernel.inputs.keyboard, $_.getIsKeyPress)) || !!this._isTouchEnabled && this._checkTouchIsPress(e)
	},
	_getTouchButtonPosition: function(e) {
		switch (e._hx_index) {
			case 1:
				return {
					x: .5 * this._kernel.factory.width,
					y: .25 * this._kernel.factory.height
				};
			case 2:
				return {
					x: .75 * this._kernel.factory.width,
					y: .5 * this._kernel.factory.height
				};
			case 3:
				return {
					x: .5 * this._kernel.factory.width,
					y: .75 * this._kernel.factory.height
				};
			case 4:
				return {
					x: .25 * this._kernel.factory.width,
					y: .5 * this._kernel.factory.height
				};
			case 0:
			case 5:
			case 6:
				return {
					x: .5 * this._kernel.factory.width,
					y: .5 * this._kernel.factory.height
				}
		}
	},
	_getClosestTouchButton: function(e, t) {
		null == e && (e = this._mouse.x), null == t && (t = this._mouse.y);
		var s = 99999999,
			i = awe6_interfaces_EJoypadButton.FIRE,
			r = awe6_interfaces_EJoypadButton.FIRE,
			n = this._getTouchButtonPosition(r),
			_ = this._kernel.tools.distance(e, t, n.x, n.y, !0);
		_ < s && (s = _, i = r);
		r = awe6_interfaces_EJoypadButton.UP, n = this._getTouchButtonPosition(r);
		(_ = this._kernel.tools.distance(e, t, n.x, n.y, !0)) < s && (s = _, i = r);
		r = awe6_interfaces_EJoypadButton.RIGHT, n = this._getTouchButtonPosition(r);
		(_ = this._kernel.tools.distance(e, t, n.x, n.y, !0)) < s && (s = _, i = r);
		r = awe6_interfaces_EJoypadButton.DOWN, n = this._getTouchButtonPosition(r);
		(_ = this._kernel.tools.distance(e, t, n.x, n.y, !0)) < s && (s = _, i = r);
		r = awe6_interfaces_EJoypadButton.LEFT, n = this._getTouchButtonPosition(r);
		(_ = this._kernel.tools.distance(e, t, n.x, n.y, !0)) < s && (s = _, i = r);
		r = awe6_interfaces_EJoypadButton.PRIMARY, n = this._getTouchButtonPosition(r);
		return (_ = this._kernel.tools.distance(e, t, n.x, n.y, !0)) < s && (s = _, i = r), i
	},
	_getTouchState: function() {
		var e = null != this._mouse || this._kernel.inputs.mouse instanceof awe6_core_drivers_createjs_InputMouse && (this._mouse = js_Boot.__cast(this._kernel.inputs.mouse, awe6_core_drivers_createjs_InputMouse), !0);
		if (!e || this._mouse.getAge() == this._joypadStateCache.age) return this._joypadStateCache;
		var t = {
				age: this._mouse.getAge(),
				isFire: !1,
				isUp: !1,
				isRight: !1,
				isDown: !1,
				isLeft: !1,
				isPrevFire: this._joypadStateCache.isFire,
				isPrevUp: this._joypadStateCache.isUp,
				isPrevRight: this._joypadStateCache.isRight,
				isPrevDown: this._joypadStateCache.isDown,
				isPrevLeft: this._joypadStateCache.isLeft
			},
			s = this._joypadTouchType;
		switch (s._hx_index) {
			case 1:
				var i = this._getClosestTouchButton();
				t.isFire = i == awe6_interfaces_EJoypadButton.FIRE && this._mouse.getIsButtonRelease() && this._mouse.getButtonDownDuration(null, !0, !0) < 200, this._mouse.getIsButtonDown() && (t.isUp = i == awe6_interfaces_EJoypadButton.UP, t.isRight = i == awe6_interfaces_EJoypadButton.RIGHT, t.isDown = i == awe6_interfaces_EJoypadButton.DOWN, t.isLeft = i == awe6_interfaces_EJoypadButton.LEFT);
				break;
			case 2:
				var r = s.distance;
				null == r && (r = 20), t.isFire = this._mouse.getIsButtonRelease() && this._mouse.getButtonDownDuration(null, !0, !0) < 200, t.isUp = this._mouse.getButtonDragHeight() < -r, t.isRight = this._mouse.getButtonDragWidth() > r, t.isDown = this._mouse.getButtonDragHeight() > r, t.isLeft = this._mouse.getButtonDragWidth() < -r;
				break;
			case 3:
				var n, _, a = s.speed;
				t.isFire = this._mouse.getIsButtonRelease() && this._mouse.getButtonDownDuration(null, !0, !0) < 200, this._kernel.inputs.mouse.getIsButtonDown() && (null == a && (a = 100), n = this._mouse.getDeltaX(), _ = this._mouse.getDeltaY(), t.isUp = _ < -a, t.isRight = a < n, t.isDown = a < _, t.isLeft = n < -a)
		}
		return this._joypadStateCache = t, this._joypadStateCache
	},
	_checkTouchIsDown: function(e) {
		var t = this._getTouchState();
		switch (e._hx_index) {
			case 1:
				return t.isUp;
			case 2:
				return t.isRight;
			case 3:
				return t.isDown;
			case 4:
				return t.isLeft;
			case 0:
			case 5:
			case 6:
				return t.isFire
		}
	},
	_checkTouchIsPress: function(e) {
		var t = this._getTouchState();
		switch (e._hx_index) {
			case 1:
				return !!t.isUp && !t.isPrevUp;
			case 2:
				return !!t.isRight && !t.isPrevRight;
			case 3:
				return !!t.isDown && !t.isPrevDown;
			case 4:
				return !!t.isLeft && !t.isPrevLeft;
			case 0:
			case 5:
			case 6:
				return !!t.isFire && !t.isPrevFire
		}
	},
	__class__: awe6_core_InputJoypad
};
var awe6_interfaces_IResettable = function() {};
$hxClasses["awe6.interfaces.IResettable"] = awe6_interfaces_IResettable, awe6_interfaces_IResettable.__name__ = "awe6.interfaces.IResettable", awe6_interfaces_IResettable.__isInterface__ = !0, awe6_interfaces_IResettable.prototype = {
	__class__: awe6_interfaces_IResettable
};
var awe6_interfaces_IInputManager = function() {};
$hxClasses["awe6.interfaces.IInputManager"] = awe6_interfaces_IInputManager, awe6_interfaces_IInputManager.__name__ = "awe6.interfaces.IInputManager", awe6_interfaces_IInputManager.__isInterface__ = !0, awe6_interfaces_IInputManager.__interfaces__ = [awe6_interfaces_IResettable], awe6_interfaces_IInputManager.prototype = {
	__class__: awe6_interfaces_IInputManager
};
var awe6_core_InputManager = function(e) {
	awe6_core_Process.call(this, e)
};
$hxClasses["awe6.core.InputManager"] = awe6_core_InputManager, awe6_core_InputManager.__name__ = "awe6.core.InputManager", awe6_core_InputManager.__interfaces__ = [awe6_interfaces_IInputManager], awe6_core_InputManager.__super__ = awe6_core_Process, awe6_core_InputManager.prototype = $extend(awe6_core_Process.prototype, {
	_init: function() {
		awe6_core_Process.prototype._init.call(this), this.joypad = this.createJoypad(), this.keyboard = this._inputKeyboard = new awe6_core_drivers_createjs_InputKeyboard(this._kernel), this.mouse = this._inputMouse = new awe6_core_drivers_createjs_InputMouse(this._kernel)
	},
	_updater: function(e) {
		null == e && (e = 0), awe6_core_Process.prototype._updater.call(this, e);
		var t = this._inputKeyboard,
			s = e;
		null == s && (s = 0), t.isActive && !t.isDisposed && (t._age += s, t._updates++, t._updater(s)), null == (s = e) && (s = 0), (t = this._inputMouse).isActive && !t.isDisposed && (t._age += s, t._updates++, t._updater(s))
	},
	_disposer: function() {
		var e = this._inputKeyboard;
		e.isDisposed || (e.isDisposed = !0, e.set_isActive(!1), e._disposer()), (e = this._inputMouse).isDisposed || (e.isDisposed = !0, e.set_isActive(!1), e._disposer()), awe6_core_Process.prototype._disposer.call(this)
	},
	createJoypad: function(e, t, s, i, r, n, _, a, o, c, h, l, u) {
		return new awe6_core_InputJoypad(this._kernel, e, t, s, i, r, n, _, a, o, c, h, l, u)
	},
	reset: function() {
		var e = this._inputKeyboard;
		return e.isDisposed || (e.isDisposed = !0, e.set_isActive(!1), e._disposer()), (e = this._inputMouse).isDisposed || (e.isDisposed = !0, e.set_isActive(!1), e._disposer()), this._init(), !0
	},
	__class__: awe6_core_InputManager
});
var awe6_interfaces_IMessageManager = function() {};
$hxClasses["awe6.interfaces.IMessageManager"] = awe6_interfaces_IMessageManager, awe6_interfaces_IMessageManager.__name__ = "awe6.interfaces.IMessageManager", awe6_interfaces_IMessageManager.__isInterface__ = !0, awe6_interfaces_IMessageManager.__interfaces__ = [awe6_interfaces_IResettable], awe6_interfaces_IMessageManager.prototype = {
	__class__: awe6_interfaces_IMessageManager
};
var awe6_core_MessageManager = function(e) {
	awe6_core_Process.call(this, e)
};
$hxClasses["awe6.core.MessageManager"] = awe6_core_MessageManager, awe6_core_MessageManager.__name__ = "awe6.core.MessageManager", awe6_core_MessageManager.__interfaces__ = [awe6_interfaces_IMessageManager], awe6_core_MessageManager.__super__ = awe6_core_Process, awe6_core_MessageManager.prototype = $extend(awe6_core_Process.prototype, {
	_init: function() {
		awe6_core_Process.prototype._init.call(this), this._isVerbose = !1, this._subscriptions = new haxe_ds_GenericStack, this._messageQueue = new haxe_ds_List
	},
	addSubscriber: function(e, t, s, i, r, n) {
		null == n && (n = !1);
		var _ = new awe6_core__$MessageManager__$HelperSubscription(e, t, s, i, r, n),
			a = this._subscriptions;
		a.head = new haxe_ds_GenericCell(_, a.head)
	},
	removeSubscribers: function(e, t, s, i, r) {
		for (var n = this._getSubscriptions(e, t, s, i, r, !0).iterator(); n.hasNext();) {
			var _ = n.next();
			this._subscriptions.remove(_), this._isVerbose && haxe_Log.trace("Removing " + Std.string(_.sender) + ":" + Std.string(_.message), {
				fileName: "awe6/core/MessageManager.hx",
				lineNumber: 80,
				className: "awe6.core.MessageManager",
				methodName: "removeSubscribers"
			})
		}
	},
	sendMessage: function(e, t, s, i, r) {
		null == r && (r = !1), null == i && (i = !1), null == s && (s = !1), this._sendMessage(e, t, t, s, i, r)
	},
	reset: function() {
		return this.removeSubscribers(), this._messageQueue = new haxe_ds_List, !0
	},
	_updater: function(e) {
		if (null == e && (e = 0), awe6_core_Process.prototype._updater.call(this, e), this._isOkToSendMessage())
			for (var t = this._messageQueue.h; null != t;) {
				var s = t.item,
					t = t.next,
					i = s;
				this._sendMessage(i.message, i.sender, i.target, i.isBubbleDown, i.isBubbleUp, i.isBubbleEverywhere), this._messageQueue.remove(i)
			}
	},
	_isOkToSendMessage: function() {
		return null != this._kernel.scenes.get_scene()
	},
	_sendMessage: function(e, t, s, i, r, n) {
		if (null == n && (n = !1), null == r && (r = !1), null == i && (i = !1), this._isVerbose && haxe_Log.trace("Sending message: " + Std.string(e) + " from " + t.id + "(" + Std.string(js_Boot.getClass(t)) + ") via " + s.id + " (" + Std.string(js_Boot.getClass(s)) + ")", {
				fileName: "awe6/core/MessageManager.hx",
				lineNumber: 119,
				className: "awe6.core.MessageManager",
				methodName: "_sendMessage"
			}), this._isOkToSendMessage()) {
			if (n) {
				var _ = this._kernel.scenes.get_scene().getEntities()[0];
				if (null != _ && null != _.get_parent()) return void this._sendMessage(e, t, this._kernel.scenes.get_scene().getEntities()[0].get_parent(), !0)
			}
			for (var a = this._getSubscriptions(s, e, null, t).iterator(); a.hasNext();) {
				var o = a.next();
				if (!this._send(o, e, t)) return
			}
			if (i)
				for (var c = s.getEntities(), h = 0; h < c.length;) {
					var l = c[h];
					++h, this._sendMessage(e, t, l, !0)
				}
			r && null != s.get_parent() && js_Boot.__implements(s.get_parent(), awe6_interfaces_IEntity) && this._sendMessage(e, t, s.get_parent(), !1, !0)
		} else this._messageQueue.push(new awe6_core__$MessageManager__$HelperMessage(e, t, s, i, r, n))
	},
	_send: function(e, t, s) {
		var i = e.handler.apply(e.subscriber, [t, s]);
		return e.isRemovedAfterFirstSend && this._subscriptions.remove(e), i
	},
	_getSubscriptions: function(e, t, s, i, r, n) {
		null == n && (n = !1);
		for (var _ = new haxe_ds_GenericStack, a = this._subscriptions.iterator(); a.hasNext();) {
			var o = a.next();
			if (null == e || e == o.subscriber || e == o.sender) {
				if (null != t && !js_Boot.__instanceof(t, o.messageClass)) {
					var c = Type.typeof(t);
					if (7 == c._hx_index) {
						var h;
						c.e;
						if (Type.getEnum(t) != Type.getEnum(o.message) || (h = o.message, $hxEnums[t.__enum__].__constructs__[t._hx_index] != $hxEnums[h.__enum__].__constructs__[h._hx_index]) || Type.enumParameters(t).toString() != Type.enumParameters(o.message).toString()) continue
					} else if (t != o.message) continue
				}
				if (null == s || Reflect.compareMethods(o.handler, s)) {
					if (null != i) {
						if (n) {
							if (null != o.senderClassType) continue;
							if (null == o.sender) continue
						}
						if (null != o.senderClassType && !js_Boot.__instanceof(i, o.senderClassType)) continue;
						if (null != o.sender && o.sender != i) continue
					}
					_.head = new haxe_ds_GenericCell(o, _.head)
				}
			}
		}
		return _
	},
	__class__: awe6_core_MessageManager
});
var awe6_core__$MessageManager__$HelperSubscription = function(e, t, s, i, r, n) {
	null == n && (n = !1), this.subscriber = e, this.message = t, this.handler = s, this.sender = i, this.senderClassType = r, this.isRemovedAfterFirstSend = n, this.messageClass = js_Boot.getClass(t)
};
$hxClasses["awe6.core._MessageManager._HelperSubscription"] = awe6_core__$MessageManager__$HelperSubscription, awe6_core__$MessageManager__$HelperSubscription.__name__ = "awe6.core._MessageManager._HelperSubscription", awe6_core__$MessageManager__$HelperSubscription.prototype = {
	__class__: awe6_core__$MessageManager__$HelperSubscription
};
var awe6_core__$MessageManager__$HelperMessage = function(e, t, s, i, r, n) {
	null == n && (n = !1), null == r && (r = !1), null == i && (i = !1), this.message = e, this.sender = t, this.target = s, this.isBubbleDown = i, this.isBubbleUp = r, this.isBubbleEverywhere = n
};
$hxClasses["awe6.core._MessageManager._HelperMessage"] = awe6_core__$MessageManager__$HelperMessage, awe6_core__$MessageManager__$HelperMessage.__name__ = "awe6.core._MessageManager._HelperMessage", awe6_core__$MessageManager__$HelperMessage.prototype = {
	__class__: awe6_core__$MessageManager__$HelperMessage
};
var awe6_interfaces_IScene = function() {};
$hxClasses["awe6.interfaces.IScene"] = awe6_interfaces_IScene, awe6_interfaces_IScene.__name__ = "awe6.interfaces.IScene", awe6_interfaces_IScene.__isInterface__ = !0, awe6_interfaces_IScene.__interfaces__ = [awe6_interfaces_IViewable, awe6_interfaces_IEntityCollection, awe6_interfaces_IProcess], awe6_interfaces_IScene.prototype = {
	__class__: awe6_interfaces_IScene
};
var awe6_core_Scene = function(e, t, s, i, r) {
	null == r && (r = !1), null == i && (i = !0), null == s && (s = !1), this.type = t, this.isPauseable = s, this.isMuteable = i, this.isSessionSavedOnNext = r, awe6_core_Process.call(this, e)
};
$hxClasses["awe6.core.Scene"] = awe6_core_Scene, awe6_core_Scene.__name__ = "awe6.core.Scene", awe6_core_Scene.__interfaces__ = [awe6_interfaces_IScene], awe6_core_Scene.__super__ = awe6_core_Process, awe6_core_Scene.prototype = $extend(awe6_core_Process.prototype, {
	_init: function() {
		awe6_core_Process.prototype._init.call(this), this.isDisposable = !0, this._entity = new awe6_core_Entity(this._kernel), this.view = this._entity.get_view()
	},
	_updater: function(e) {
		null == e && (e = 0), awe6_core_Process.prototype._updater.call(this, e), this._entity.update(e)
	},
	_disposer: function() {
		this._entity.dispose(), this.get_view().dispose(), awe6_core_Process.prototype._disposer.call(this)
	},
	addEntity: function(e, t, s, i) {
		return null == i && (i = 0), null == s && (s = !1), this._entity.addEntity(e, t, s, i)
	},
	removeEntity: function(e, t, s) {
		null == s && (s = !1), this._entity.removeEntity(e, t, s)
	},
	getEntities: function(e) {
		return this._entity.getEntities(e)
	},
	getEntitiesByClass: function(e, t, s, i, r) {
		return null == r && (r = !1), null == i && (i = !1), null == s && (s = !1), this._entity.getEntitiesByClass(e, t, s, i, !1)
	},
	get_view: function() {
		return this.view
	},
	setAgenda: function(e) {
		return this._entity.setAgenda(e)
	},
	__class__: awe6_core_Scene,
	__properties__: $extend(awe6_core_Process.prototype.__properties__, {
		get_view: "get_view"
	})
});
var awe6_interfaces_ISceneManager = function() {};
$hxClasses["awe6.interfaces.ISceneManager"] = awe6_interfaces_ISceneManager, awe6_interfaces_ISceneManager.__name__ = "awe6.interfaces.ISceneManager", awe6_interfaces_ISceneManager.__isInterface__ = !0, awe6_interfaces_ISceneManager.prototype = {
	__class__: awe6_interfaces_ISceneManager,
	__properties__: {
		get_scene: "get_scene"
	}
};
var awe6_core_SceneManager = function(e) {
	awe6_core_Process.call(this, e)
};
$hxClasses["awe6.core.SceneManager"] = awe6_core_SceneManager, awe6_core_SceneManager.__name__ = "awe6.core.SceneManager", awe6_core_SceneManager.__interfaces__ = [awe6_interfaces_ISceneManager], awe6_core_SceneManager.__super__ = awe6_core_Process, awe6_core_SceneManager.prototype = $extend(awe6_core_Process.prototype, {
	_init: function() {
		awe6_core_Process.prototype._init.call(this), this.view = new awe6_core_drivers_createjs_View(this._kernel)
	},
	_updater: function(e) {
		null == e && (e = 0), awe6_core_Process.prototype._updater.call(this, e), null != this.get_scene() && this.get_scene().update(e), null != this._sceneTransition && this._sceneTransition.update(e)
	},
	_disposer: function() {
		null != this.get_scene() && this.get_scene().dispose(), null != this._sceneTransition && this._sceneTransition.dispose(), this.view.dispose(), awe6_core_Process.prototype._disposer.call(this)
	},
	setScene: function(e) {
		var t, s = null;
		null != this.get_scene() && (s = this.get_scene().type, t = this._kernel.factory.createSceneTransition(e, s), null != this._sceneTransition && this._sceneTransition.dispose(), this._sceneTransition = t, this._kernel.inputs.reset(), this.get_scene().isDisposable && (this.get_scene().dispose(), this._kernel.messenger.reset()), this.scene = null), this._kernel.overlay.hideButtons(), this.scene = this._kernel.factory.createScene(e), this._kernel.overlay.showButton(awe6_interfaces_EOverlayButton.BACK, null != this._kernel.factory.getBackSceneType(this.get_scene().type)), this._kernel.overlay.showButton(awe6_interfaces_EOverlayButton.MUTE, this.get_scene().isMuteable && !this._kernel.audio.isMute), this._kernel.overlay.showButton(awe6_interfaces_EOverlayButton.UNMUTE, this.get_scene().isMuteable && this._kernel.audio.isMute), this._kernel.overlay.showButton(awe6_interfaces_EOverlayButton.PAUSE, this.get_scene().isPauseable && this._kernel.isActive), this._kernel.overlay.showButton(awe6_interfaces_EOverlayButton.UNPAUSE, this.get_scene().isPauseable && !this._kernel.isActive), this.view.addChild(this.get_scene().get_view()), null != this._sceneTransition && this.get_scene().get_view().addChild(this._sceneTransition.get_view(), this._tools.BIG_NUMBER + 1)
	},
	back: function() {
		var e = this._kernel.factory.getBackSceneType(this.get_scene().type);
		null != e && this.setScene(e)
	},
	next: function() {
		this.get_scene().isSessionSavedOnNext && null != this._kernel.get_session() && this._kernel.get_session().save();
		var e = this._kernel.factory.getNextSceneType(this.get_scene().type);
		null != e && this.setScene(e)
	},
	get_scene: function() {
		return this.scene
	},
	__class__: awe6_core_SceneManager,
	__properties__: $extend(awe6_core_Process.prototype.__properties__, {
		get_scene: "get_scene"
	})
});
var awe6_interfaces_ITextStyle = function() {};
$hxClasses["awe6.interfaces.ITextStyle"] = awe6_interfaces_ITextStyle, awe6_interfaces_ITextStyle.__name__ = "awe6.interfaces.ITextStyle", awe6_interfaces_ITextStyle.__isInterface__ = !0, awe6_interfaces_ITextStyle.prototype = {
	__class__: awe6_interfaces_ITextStyle
};
var awe6_core_TextStyle = function(e, t, s, i, r, n, _, a, o, c) {
	null == o && (o = 0), null == r && (r = !1), null == i && (i = !1), this.font = null != e ? e : "_sans", this.size = null != t ? t : 12, this.color = null != s ? s : 0, this.isBold = i, this.isItalic = r, this.align = null != n ? n : awe6_interfaces_ETextAlign.LEFT, this.spacingHorizontal = null != _ ? _ : 0, this.spacingVertical = null != a ? a : 0, this.thickness = o, this.filters = c
};
$hxClasses["awe6.core.TextStyle"] = awe6_core_TextStyle, awe6_core_TextStyle.__name__ = "awe6.core.TextStyle", awe6_core_TextStyle.__interfaces__ = [awe6_interfaces_ITextStyle], awe6_core_TextStyle.prototype = {
	toString: function() {
		return Std.string(this.font + "," + this.size + "," + this.color + "," + Std.string(this.isBold) + "," + Std.string(this.isItalic) + "," + Std.string(this.align) + "," + this.spacingHorizontal + "," + this.spacingVertical + "," + this.thickness + "," + Std.string(this.filters))
	},
	clone: function() {
		return new awe6_core_TextStyle(this.font, this.size, this.color, this.isBold, this.isItalic, this.align, this.spacingHorizontal, this.spacingVertical, this.thickness, this.filters)
	},
	__class__: awe6_core_TextStyle
};
var awe6_interfaces_ITools = function() {};
$hxClasses["awe6.interfaces.ITools"] = awe6_interfaces_ITools, awe6_interfaces_ITools.__name__ = "awe6.interfaces.ITools", awe6_interfaces_ITools.__isInterface__ = !0, awe6_interfaces_ITools.__interfaces__ = [awe6_interfaces_IEncrypter], awe6_interfaces_ITools.prototype = {
	__class__: awe6_interfaces_ITools
};
var awe6_core_Tools = function(e) {
	this._kernel = e, this.BIG_NUMBER = 9999998, this._encrypter = this._kernel.factory.createEncrypter()
};
$hxClasses["awe6.core.Tools"] = awe6_core_Tools, awe6_core_Tools.__name__ = "awe6.core.Tools", awe6_core_Tools.__interfaces__ = [awe6_interfaces_ITools], awe6_core_Tools.prototype = {
	createGuid: function(e, t) {
		return null == t && (t = ""), null == e && (e = !1), e ? t + HxOverrides.substr(this._randomCharacter() + this._randomCharacter() + this._randomCharacter(), 0, 10) : t + (this._randomCharacter() + this._randomCharacter() + "-" + this._randomCharacter() + "-" + this._randomCharacter() + "-" + this._randomCharacter() + "-" + this._randomCharacter() + this._randomCharacter() + this._randomCharacter())
	},
	_randomCharacter: function() {
		return HxOverrides.substr(StringTools.hex(65536 * (1 + Math.random()) | 0, 1), 1, null)
	},
	sortByPriority: function(e, t) {
		var s = e.get_priority(),
			i = t.get_priority();
		return s < i ? -1 : i < s ? 1 : 0
	},
	_isCamelCase: function(e) {
		return e.toUpperCase() != e && (!(-1 < e.indexOf(" ")) && !(-1 < e.indexOf("_")))
	},
	_isConstCase: function(e) {
		return e.toUpperCase() == e && !(-1 < e.indexOf(" "))
	},
	fromCamelCase: function(e) {
		if (null == e || "" == e) return "";
		for (var t = "", s = e.split(""), i = "", r = 0; r < s.length;) {
			var n = s[r];
			++r, n.toLowerCase() != n && (t += i), t += n, i = " "
		}
		return t
	},
	toConstCase: function(e) {
		if (null == e || "" == e) return "";
		if (this._isConstCase(e)) return e;
		this._isCamelCase(e) && (e = this.fromCamelCase(e));
		return e = StringTools.replace(e, "     ", " "), e = StringTools.replace(e, "    ", " "), e = StringTools.replace(e, "   ", " "), e = StringTools.replace(e, "  ", " "), (e = StringTools.replace(e, " ", "_")).toUpperCase()
	},
	limit: function(e, t, s) {
		return s < e ? s : e < t ? t : e
	},
	distance: function(e, t, s, i, r) {
		null == r && (r = !1);
		var n = s - e,
			_ = i - t,
			a = n * n + _ * _;
		return r ? a : Math.sqrt(a)
	},
	shuffle: function(e) {
		for (var t = e.slice(), s = t.length; 1 < s;) {
			var i = Std.random(s),
				r = t[--s];
			t[s] = t[i], t[i] = r
		}
		return t
	},
	serialize: function(e) {
		return haxe_Serializer.run(e)
	},
	unserialize: function(e) {
		return haxe_Unserializer.run(e)
	},
	decrypt: function(e, t) {
		return null == t && (t = ""), this._encrypter.decrypt(e, t)
	},
	__class__: awe6_core_Tools
};
var awe6_interfaces_IAssetManager = function() {};
$hxClasses["awe6.interfaces.IAssetManager"] = awe6_interfaces_IAssetManager, awe6_interfaces_IAssetManager.__name__ = "awe6.interfaces.IAssetManager", awe6_interfaces_IAssetManager.__isInterface__ = !0, awe6_interfaces_IAssetManager.prototype = {
	__class__: awe6_interfaces_IAssetManager
};
var awe6_interfaces_IAssetManagerProcess = function() {};
$hxClasses["awe6.interfaces.IAssetManagerProcess"] = awe6_interfaces_IAssetManagerProcess, awe6_interfaces_IAssetManagerProcess.__name__ = "awe6.interfaces.IAssetManagerProcess", awe6_interfaces_IAssetManagerProcess.__isInterface__ = !0, awe6_interfaces_IAssetManagerProcess.__interfaces__ = [awe6_interfaces_IProcess, awe6_interfaces_IAssetManager];
var awe6_core_drivers_AAssetManager = function(e) {
	awe6_core_Process.call(this, e)
};
$hxClasses["awe6.core.drivers.AAssetManager"] = awe6_core_drivers_AAssetManager, awe6_core_drivers_AAssetManager.__name__ = "awe6.core.drivers.AAssetManager", awe6_core_drivers_AAssetManager.__interfaces__ = [awe6_interfaces_IAssetManagerProcess], awe6_core_drivers_AAssetManager.__super__ = awe6_core_Process, awe6_core_drivers_AAssetManager.prototype = $extend(awe6_core_Process.prototype, {
	_init: function() {
		this._packageId = this._kernel.getConfig("settings.assets.packages.default"), null == this._packageId && (this._packageId = "assets"), awe6_core_Process.prototype._init.call(this)
	},
	getAsset: function(e, t, s) {
		return null == t && (t = this._packageId), this._driverGetAsset(e, t, s)
	},
	_driverGetAsset: function(e, t, s) {
		return null
	},
	__class__: awe6_core_drivers_AAssetManager
});
var awe6_interfaces_IAudioManager = function() {};
$hxClasses["awe6.interfaces.IAudioManager"] = awe6_interfaces_IAudioManager, awe6_interfaces_IAudioManager.__name__ = "awe6.interfaces.IAudioManager", awe6_interfaces_IAudioManager.__isInterface__ = !0, awe6_interfaces_IAudioManager.prototype = {
	__class__: awe6_interfaces_IAudioManager,
	__properties__: {
		set_isMute: "set_isMute"
	}
};
var awe6_core_drivers_AAudioManager = function(e) {
	awe6_core_Process.call(this, e)
};
$hxClasses["awe6.core.drivers.AAudioManager"] = awe6_core_drivers_AAudioManager, awe6_core_drivers_AAudioManager.__name__ = "awe6.core.drivers.AAudioManager", awe6_core_drivers_AAudioManager.__interfaces__ = [awe6_interfaces_IAudioManager], awe6_core_drivers_AAudioManager.__super__ = awe6_core_Process, awe6_core_drivers_AAudioManager.prototype = $extend(awe6_core_Process.prototype, {
	_init: function() {
		awe6_core_Process.prototype._init.call(this), this._sounds = [], this._packageId = this._kernel.getConfig("settings.assets.packages.audio"), null == this._packageId && (this._packageId = this._kernel.getConfig("settings.assets.packages.default")), null == this._packageId && (this._packageId = "assets.audio"), this.set_isMute(!1)
	},
	_updater: function(e) {
		null == e && (e = 0), awe6_core_Process.prototype._updater.call(this, e);
		for (var t = 0, s = this._sounds; t < s.length;) {
			var i = s[t];
			++t, i.isDisposed && HxOverrides.remove(this._sounds, i)
		}
	},
	_disposer: function() {
		for (var e = 0, t = this._sounds; e < t.length;) {
			var s = t[e];
			++e, s.dispose()
		}
		this.set_isMute(!1), awe6_core_Process.prototype._disposer.call(this)
	},
	start: function(e, t, s, i, r, n, _, a) {
		if ((null == _ && (_ = !1), null == n && (n = 0), null == r && (r = 1), null == i && (i = 0), null == s && (s = 1), null == t && (t = awe6_interfaces_EAudioChannel.DEFAULT), _) && 0 != this._getSounds(e, t).length) return;
		this._sounds.push(this._driverSoundFactory(e, t, s, i, r, n, a))
	},
	_driverSoundFactory: function(e, t, s, i, r, n, _) {
		return null == n && (n = 0), null == r && (r = 1), null == i && (i = 0), null == s && (s = 1), new awe6_core_drivers__$AHelperSound(this._kernel, e, this._packageId, t, s, i, r, n, _)
	},
	stop: function(e, t) {
		for (var s = this._getSounds(e, t), i = 0; i < s.length;) {
			var r = s[i];
			++i, r.stop()
		}
	},
	transform: function(e, t, s, i, r) {
		null == r && (r = !1), null == i && (i = 0), null == s && (s = 1);
		for (var n = this._getSounds(e, t), _ = 0; _ < n.length;) {
			var a = n[_];
			++_, a.transform(s, i, r)
		}
	},
	set_isMute: function(e) {
		return this.isMute = e, this._driverSetIsMute(e), this.isMute
	},
	_driverSetIsMute: function(e) {},
	_getSounds: function(e, t) {
		var s = [];
		if (null == e && null == t) s = this._sounds.slice();
		else if (null == t)
			for (var i = 0, r = this._sounds; i < r.length;) {
				var n = r[i];
				++i, n.id == e && s.push(n)
			} else if (null == e)
				for (i = 0, r = this._sounds; i < r.length;) {
					n = r[i];
					++i, Type.enumEq(n.audioChannelType, t) && s.push(n)
				} else
					for (i = 0, r = this._sounds; i < r.length;) {
						n = r[i];
						++i, n.id == e && Type.enumEq(n.audioChannelType, t) && s.push(n)
					}
		return s
	},
	__class__: awe6_core_drivers_AAudioManager,
	__properties__: $extend(awe6_core_Process.prototype.__properties__, {
		set_isMute: "set_isMute"
	})
});
var awe6_core_drivers__$AHelperSound = function(e, t, s, i, r, n, _, a, o) {
	null == a && (a = 0), null == _ && (_ = 1), null == n && (n = 0), null == r && (r = 1), this._kernel = e, this.isDisposed = !1, this.id = t, this._packageId = s, this.audioChannelType = null != i ? i : awe6_interfaces_EAudioChannel.DEFAULT, -1 == r && (r = this._kernel.tools.BIG_NUMBER), this._loops = r, this._startTime = n, this._volume = _, this._pan = a, this._onCompleteCallback = o, this._init()
};
$hxClasses["awe6.core.drivers._AHelperSound"] = awe6_core_drivers__$AHelperSound, awe6_core_drivers__$AHelperSound.__name__ = "awe6.core.drivers._AHelperSound", awe6_core_drivers__$AHelperSound.__interfaces__ = [awe6_interfaces_IDisposable], awe6_core_drivers__$AHelperSound.prototype = {
	_init: function() {
		this._driverInit()
	},
	_driverInit: function() {},
	transform: function(e, t, s) {
		null == s && (s = !1), null == t && (t = 0), null == e && (e = 1), this.isDisposed || (s ? (this._volume = e, this._pan = t) : (this._volume = this._kernel.tools.limit(e, 0, 1), this._pan = this._kernel.tools.limit(t, -1, 1)), this._driverTransform(s))
	},
	_driverTransform: function(e) {
		null == e && (e = !1)
	},
	stop: function() {
		this._driverStop(), this.dispose()
	},
	_driverStop: function() {},
	dispose: function() {
		this.isDisposed || (this.isDisposed = !0, this._driverStop())
	},
	__class__: awe6_core_drivers__$AHelperSound
};
var awe6_interfaces_IFactory = function() {};
$hxClasses["awe6.interfaces.IFactory"] = awe6_interfaces_IFactory, awe6_interfaces_IFactory.__name__ = "awe6.interfaces.IFactory", awe6_interfaces_IFactory.__isInterface__ = !0, awe6_interfaces_IFactory.prototype = {
	__class__: awe6_interfaces_IFactory
};
var awe6_core_drivers_AFactory = function(e, t, s) {
	null == t && (t = !1), this._context = e, this.isDebug = t, this._config = s, this.config = new haxe_ds_StringMap;
	var i = !0;
	null == i && (i = !1), i && (this.id = "awe6", this.version = "0.0.1", this.author = "unknown", this.isDecached = !1, this.isEyeCandyOptionEnabled = !0, this.isFullScreenOptionEnabled = !0, this.isResetSessionsOptionEnabled = !0, this.width = 600, this.height = 400, this.bgColor = 16711680, this.fullScreenType = awe6_interfaces_EFullScreen.SCALE_ASPECT_RATIO_PRESERVE, this.joypadTouchType = awe6_interfaces_EJoypadTouch.DISABLED, this.secret = "YouMustOverrideThis", this.targetFramerate = 25, this.isFixedUpdates = !0, this.startingSceneType = awe6_interfaces_EScene.GAME, this.keyPause = awe6_interfaces_EKey.P, this.keyMute = awe6_interfaces_EKey.M, this.keyNext = awe6_interfaces_EKey.SPACE, this.keyBack = awe6_interfaces_EKey.ESCAPE, this.keySpecial = awe6_interfaces_EKey.CONTROL), this._configurer(i), this._driverInit()
};
$hxClasses["awe6.core.drivers.AFactory"] = awe6_core_drivers_AFactory, awe6_core_drivers_AFactory.__name__ = "awe6.core.drivers.AFactory", awe6_core_drivers_AFactory.__interfaces__ = [awe6_interfaces_IDisposable, awe6_interfaces_IFactory], awe6_core_drivers_AFactory.prototype = {
	_driverInit: function() {
		null != this._config && "<?xml" == HxOverrides.substr(this._config, 0, 5) && this._traverseElements(Xml.parse(this._config).firstElement().elements(), ""), this._launchKernel()
	},
	_traverseElements: function(e, t) {
		0 != t.length && (t += ".");
		for (var s = e; s.hasNext();) {
			var i = s.next();
			if (i.nodeType != Xml.Element) throw haxe_Exception.thrown("Bad node type, expected Element but found " + (null == i.nodeType ? "null" : XmlType.toString(i.nodeType)));
			var r, n = t + i.nodeName;
			if (i.elements().hasNext() && this._traverseElements(i.elements(), n), i.nodeType != Xml.Document && i.nodeType != Xml.Element) throw haxe_Exception.thrown("Bad node type, expected Element or Document but found " + (null == i.nodeType ? "null" : XmlType.toString(i.nodeType)));
			if (null != i.children[0]) {
				if (i.nodeType != Xml.Document && i.nodeType != Xml.Element) throw haxe_Exception.thrown("Bad node type, expected Element or Document but found " + (null == i.nodeType ? "null" : XmlType.toString(i.nodeType)));
				r = "<![CDATA[" == HxOverrides.substr(haxe_xml_Printer.print(i.children[0]), 0, 9)
			} else r = !1;
			if (r) {
				if (i.nodeType != Xml.Document && i.nodeType != Xml.Element) throw haxe_Exception.thrown("Bad node type, expected Element or Document but found " + (null == i.nodeType ? "null" : XmlType.toString(i.nodeType)));
				var _ = i.children[0];
				if (i.nodeType != Xml.Document && i.nodeType != Xml.Element) throw haxe_Exception.thrown("Bad node type, expected Element or Document but found " + (null == i.nodeType ? "null" : XmlType.toString(i.nodeType)));
				var a = haxe_xml_Printer.print(i.children[0]).split("<![CDATA[").join("").split("]]>").join("");
				if (_.nodeType == Xml.Document || _.nodeType == Xml.Element) throw haxe_Exception.thrown("Bad node type, unexpected " + (null == _.nodeType ? "null" : XmlType.toString(_.nodeType)));
				_.nodeValue = a
			}
			if (i.nodeType != Xml.Document && i.nodeType != Xml.Element) throw haxe_Exception.thrown("Bad node type, expected Element or Document but found " + (null == i.nodeType ? "null" : XmlType.toString(i.nodeType)));
			if (null == i.children[0]) this.config.h[n] = "";
			else {
				if (i.nodeType != Xml.Document && i.nodeType != Xml.Element) throw haxe_Exception.thrown("Bad node type, expected Element or Document but found " + (null == i.nodeType ? "null" : XmlType.toString(i.nodeType)));
				var o = i.children[0].nodeType;
				if (o != Xml.Element && o != Xml.Document) {
					var c, h = this.config;
					if (i.nodeType != Xml.Document && i.nodeType != Xml.Element) throw haxe_Exception.thrown("Bad node type, expected Element or Document but found " + (null == i.nodeType ? "null" : XmlType.toString(i.nodeType)));
					if (null == i.children[0]) c = "";
					else {
						if (i.nodeType != Xml.Document && i.nodeType != Xml.Element) throw haxe_Exception.thrown("Bad node type, expected Element or Document but found " + (null == i.nodeType ? "null" : XmlType.toString(i.nodeType)));
						var l = i.children[0];
						if (l.nodeType == Xml.Document || l.nodeType == Xml.Element) throw haxe_Exception.thrown("Bad node type, unexpected " + (null == l.nodeType ? "null" : XmlType.toString(l.nodeType)));
						c = l.nodeValue
					}
					h.h[n] = c
				} else this.config.h[n] = ""
			}
			for (var u = i.attributes(); u.hasNext();) {
				var d = u.next(),
					g = n + "." + d,
					p = this.config,
					w = i.get(d);
				p.h[g] = w
			}
		}
	},
	_configurer: function(e) {
		null == e && (e = !1)
	},
	_launchKernel: function() {
		var e;
		null == this._concreteKernel && (null == (e = !1) && (e = !1), e && (this.id = "awe6", this.version = "0.0.1", this.author = "unknown", this.isDecached = !1, this.isEyeCandyOptionEnabled = !0, this.isFullScreenOptionEnabled = !0, this.isResetSessionsOptionEnabled = !0, this.width = 600, this.height = 400, this.bgColor = 16711680, this.fullScreenType = awe6_interfaces_EFullScreen.SCALE_ASPECT_RATIO_PRESERVE, this.joypadTouchType = awe6_interfaces_EJoypadTouch.DISABLED, this.secret = "YouMustOverrideThis", this.targetFramerate = 25, this.isFixedUpdates = !0, this.startingSceneType = awe6_interfaces_EScene.GAME, this.keyPause = awe6_interfaces_EKey.P, this.keyMute = awe6_interfaces_EKey.M, this.keyNext = awe6_interfaces_EKey.SPACE, this.keyBack = awe6_interfaces_EKey.ESCAPE, this.keySpecial = awe6_interfaces_EKey.CONTROL), this._configurer(e), this._concreteKernel = new awe6_core_drivers_createjs_Kernel(this, this._context))
	},
	_getAssetUrls: function() {
		for (var e = [], t = 0; t < 1e3;) {
			var s = "settings.assets.url" + t++;
			Object.prototype.hasOwnProperty.call(this.config.h, s) && e.push(Std.string(this.config.h[s]))
		}
		return e
	},
	onInitComplete: function(e) {
		null == this._kernel && null != e && (this._kernel = e, this._tools = this._kernel.tools, this.id = HxOverrides.substr(this._tools.toConstCase(StringTools.trim(this.id)), 0, 16), this.version = HxOverrides.substr(StringTools.trim(this.version), 0, 16), this.author = HxOverrides.substr(StringTools.trim(this.author), 0, 16))
	},
	createAssetManager: function() {
		return js_Boot.__implements(this._kernel.assets, awe6_interfaces_IAssetManagerProcess) ? js_Boot.__cast(this._kernel.assets, awe6_interfaces_IAssetManagerProcess) : new awe6_core_drivers_createjs_AssetManager(this._kernel)
	},
	createEncrypter: function() {
		return new awe6_core_Encrypter(this.secret)
	},
	createLogger: function() {
		return null
	},
	createOverlay: function() {
		return new awe6_core_drivers_createjs_Overlay(this._kernel)
	},
	createPreloader: function() {
		return new awe6_core_drivers_createjs_Preloader(this._kernel, this._getAssetUrls(), this.isDecached)
	},
	createScene: function(e) {
		return null == e && (e = this.startingSceneType), new awe6_core_Scene(this._kernel, e)
	},
	createSceneTransition: function(e, t) {
		return new awe6_core_drivers_createjs_SceneTransition(this._kernel)
	},
	createSession: function(e) {
		return new awe6_core_drivers_ASession(this._kernel, e)
	},
	createTextStyle: function(e) {
		return new awe6_core_TextStyle
	},
	getBackSceneType: function(e) {
		return null
	},
	getNextSceneType: function(e) {
		return null
	},
	dispose: function() {
		var e;
		this.isDisposed || null == this._concreteKernel || (this.isDisposed = !0, this._driverDisposer(), (e = this._concreteKernel).isDisposed || (e.isDisposed = !0, e.set_isActive(!1), e._disposer()), this._concreteKernel = null, this._kernel = null, this.config = null)
	},
	_driverDisposer: function() {},
	__class__: awe6_core_drivers_AFactory
};
var awe6_interfaces_IInputKeyboard = function() {};
$hxClasses["awe6.interfaces.IInputKeyboard"] = awe6_interfaces_IInputKeyboard, awe6_interfaces_IInputKeyboard.__name__ = "awe6.interfaces.IInputKeyboard", awe6_interfaces_IInputKeyboard.__isInterface__ = !0, awe6_interfaces_IInputKeyboard.prototype = {
	__class__: awe6_interfaces_IInputKeyboard
};
var awe6_core_drivers_AInputKeyboard = function(e) {
	awe6_core_Process.call(this, e)
};
$hxClasses["awe6.core.drivers.AInputKeyboard"] = awe6_core_drivers_AInputKeyboard, awe6_core_drivers_AInputKeyboard.__name__ = "awe6.core.drivers.AInputKeyboard", awe6_core_drivers_AInputKeyboard.__interfaces__ = [awe6_interfaces_IInputKeyboard], awe6_core_drivers_AInputKeyboard.__super__ = awe6_core_Process, awe6_core_drivers_AInputKeyboard.prototype = $extend(awe6_core_Process.prototype, {
	_init: function() {
		awe6_core_Process.prototype._init.call(this), this._driverInit(), this._reset()
	},
	_driverInit: function() {},
	_updater: function(e) {
		null == e && (e = 0), awe6_core_Process.prototype._updater.call(this, e);
		for (var t = Object.create(null), s = [], i = 0, r = this._buffer; i < r.length;) {
			var n = r[i];
			++i;
			var _ = null == n.keyCode ? "null" : "" + n.keyCode;
			Object.prototype.hasOwnProperty.call(t, _) ? s.push(n) : n.isDown ? this._keys[n.keyCode].isDown || (this._onDown(n.keyCode), t[_] = !0) : this._keys[n.keyCode].isDown && (this._onUp(n.keyCode), t[_] = !0)
		}
		this._buffer = s.slice();
		for (i = 0, r = this._keys; i < r.length;) {
			n = r[i];
			++i, n.isDown ? n.updatesDown++ : n.updatesUp++, n.isDown ? n.timeDown += e : n.timeUp += e
		}
	},
	_disposer: function() {
		this._keys = null, awe6_core_Process.prototype._disposer.call(this)
	},
	_addEvent: function(e, t) {
		this._buffer.push(new awe6_core_drivers__$AInputKeyboard__$HelperKeyEvent(e, t))
	},
	_onDown: function(e) {
		var t = this._keys[e];
		t.isUsed = !0, t.isDown = !0, t.timeUpPrevious = t.timeUp, t.updatesUpPrevious = t.updatesUp, t.updatesUp = 0, t.timeUp = 0
	},
	_onUp: function(e) {
		var t = this._keys[e];
		t.isDown = !1, t.timeDownPrevious = t.timeDown, t.updatesDownPrevious = t.updatesDown, t.updatesDown = 0, t.timeDown = 0
	},
	_reset: function(e) {
		this._buffer = [], this._keys = [];
		for (var t = 0; t < 256;) {
			var s = t++;
			this._keys[s] = new awe6_core_drivers__$AInputKeyboard__$HelperKey(this._kernel)
		}
	},
	getIsKeyDown: function(e) {
		if (null == e) return !1;
		var t = this.getKeyCode(e);
		return this._keys[t].isDown
	},
	getIsKeyPress: function(e) {
		if (null == e) return !1;
		var t = this.getKeyCode(e);
		return 1 == this._keys[t].updatesDown
	},
	getIsKeyRelease: function(e) {
		if (null == e) return !1;
		var t = this.getKeyCode(e);
		return !!this._keys[t].isUsed && 1 == this._keys[t].updatesUp
	},
	getKeyCode: function(e) {
		switch (e._hx_index) {
			case 0:
				return 144;
			case 1:
				return 12;
			case 2:
				return 47;
			case 3:
				return 18;
			case 4:
				return 8;
			case 5:
				return 20;
			case 6:
				return 17;
			case 7:
				return 46;
			case 8:
				return 40;
			case 9:
				return 35;
			case 10:
				return 13;
			case 11:
				return 27;
			case 12:
				return 112;
			case 13:
				return 121;
			case 14:
				return 122;
			case 15:
				return 123;
			case 16:
				return 124;
			case 17:
				return 125;
			case 18:
				return 126;
			case 19:
				return 113;
			case 20:
				return 114;
			case 21:
				return 115;
			case 22:
				return 116;
			case 23:
				return 117;
			case 24:
				return 118;
			case 25:
				return 119;
			case 26:
				return 120;
			case 27:
				return 36;
			case 28:
				return 45;
			case 29:
				return 37;
			case 30:
				return 96;
			case 31:
				return 97;
			case 32:
				return 98;
			case 33:
				return 99;
			case 34:
				return 100;
			case 35:
				return 101;
			case 36:
				return 102;
			case 37:
				return 103;
			case 38:
				return 104;
			case 39:
				return 105;
			case 40:
				return 107;
			case 41:
				return 110;
			case 42:
				return 111;
			case 43:
				return 108;
			case 44:
				return 106;
			case 45:
				return 109;
			case 46:
				return 34;
			case 47:
				return 33;
			case 48:
				return 39;
			case 49:
				return 16;
			case 50:
				return 32;
			case 51:
				return 9;
			case 52:
				return 38;
			case 53:
				return 65;
			case 54:
				return 66;
			case 55:
				return 67;
			case 56:
				return 68;
			case 57:
				return 69;
			case 58:
				return 70;
			case 59:
				return 71;
			case 60:
				return 72;
			case 61:
				return 73;
			case 62:
				return 74;
			case 63:
				return 75;
			case 64:
				return 76;
			case 65:
				return 77;
			case 66:
				return 78;
			case 67:
				return 79;
			case 68:
				return 80;
			case 69:
				return 81;
			case 70:
				return 82;
			case 71:
				return 83;
			case 72:
				return 84;
			case 73:
				return 85;
			case 74:
				return 86;
			case 75:
				return 87;
			case 76:
				return 88;
			case 77:
				return 89;
			case 78:
				return 90;
			case 79:
				return 48;
			case 80:
				return 49;
			case 81:
				return 50;
			case 82:
				return 51;
			case 83:
				return 52;
			case 84:
				return 53;
			case 85:
				return 54;
			case 86:
				return 55;
			case 87:
				return 56;
			case 88:
				return 57;
			case 89:
				return 186;
			case 90:
				return 187;
			case 91:
				return 189;
			case 92:
				return 191;
			case 93:
				return 222;
			case 94:
				return 219;
			case 95:
				return 221;
			case 96:
				return 220;
			case 97:
				return 192;
			case 98:
				return 223;
			case 99:
				return 0 | e.value
		}
	},
	getKey: function(e) {
		var t = awe6_interfaces_EKey.__constructs__.slice();
		t.pop();
		for (var s = 0; s < t.length;) {
			var i = t[s];
			++s;
			var r = Type.createEnum(awe6_interfaces_EKey, i);
			if (this.getKeyCode(r) == e) return r
		}
		return awe6_interfaces_EKey.SUB_TYPE(e)
	},
	__class__: awe6_core_drivers_AInputKeyboard
});
var awe6_core_drivers__$AInputKeyboard__$HelperKey = function(e) {
	this.isDown = !1, this.updatesDown = 0, this.updatesUp = e.tools.BIG_NUMBER, this.timeDown = 0, this.timeUp = e.tools.BIG_NUMBER, this.updatesDownPrevious = 0, this.updatesUpPrevious = e.tools.BIG_NUMBER, this.timeDownPrevious = 0, this.timeUpPrevious = e.tools.BIG_NUMBER
};
$hxClasses["awe6.core.drivers._AInputKeyboard._HelperKey"] = awe6_core_drivers__$AInputKeyboard__$HelperKey, awe6_core_drivers__$AInputKeyboard__$HelperKey.__name__ = "awe6.core.drivers._AInputKeyboard._HelperKey", awe6_core_drivers__$AInputKeyboard__$HelperKey.prototype = {
	__class__: awe6_core_drivers__$AInputKeyboard__$HelperKey
};
var awe6_core_drivers__$AInputKeyboard__$HelperKeyEvent = function(e, t) {
	this.keyCode = e, this.isDown = t
};
$hxClasses["awe6.core.drivers._AInputKeyboard._HelperKeyEvent"] = awe6_core_drivers__$AInputKeyboard__$HelperKeyEvent, awe6_core_drivers__$AInputKeyboard__$HelperKeyEvent.__name__ = "awe6.core.drivers._AInputKeyboard._HelperKeyEvent", awe6_core_drivers__$AInputKeyboard__$HelperKeyEvent.prototype = {
	__class__: awe6_core_drivers__$AInputKeyboard__$HelperKeyEvent
};
var awe6_interfaces_IInputMouse = function() {};
$hxClasses["awe6.interfaces.IInputMouse"] = awe6_interfaces_IInputMouse, awe6_interfaces_IInputMouse.__name__ = "awe6.interfaces.IInputMouse", awe6_interfaces_IInputMouse.__isInterface__ = !0, awe6_interfaces_IInputMouse.prototype = {
	__class__: awe6_interfaces_IInputMouse,
	__properties__: {
		set_cursorType: "set_cursorType"
	}
};
var awe6_core_drivers_AInputMouse = function(e) {
	awe6_core_Process.call(this, e)
};
$hxClasses["awe6.core.drivers.AInputMouse"] = awe6_core_drivers_AInputMouse, awe6_core_drivers_AInputMouse.__name__ = "awe6.core.drivers.AInputMouse", awe6_core_drivers_AInputMouse.__interfaces__ = [awe6_interfaces_IInputMouse], awe6_core_drivers_AInputMouse.__super__ = awe6_core_Process, awe6_core_drivers_AInputMouse.prototype = $extend(awe6_core_Process.prototype, {
	_init: function() {
		awe6_core_Process.prototype._init.call(this), this._driverInit(), this.x = this.y = this._xPrev = this._yPrev = this._deltaX = this._deltaY = this.scroll = this._deltaScroll = 0, this.relativeX = this.relativeY = this.relativeCentralisedX = this.relativeCentralisedY = 0, this.isMoving = !1, this._buffer = [], this._getPosition(), this.isMoving = !1, this.set_isVisible(!0), this.scroll = 0, this.set_cursorType(awe6_interfaces_EMouseCursor.AUTO), this._scrollPrev = 0, this._stillUpdates = 0, this._stillDuration = 0, this._reset()
	},
	_driverInit: function() {},
	_updater: function(e) {
		null == e && (e = 0), this._deltaTimePrev = e, awe6_core_Process.prototype._updater.call(this, e), this._xPrev = this.x, this._yPrev = this.y, this._getPosition(), this._handleButton(awe6_interfaces_EMouseButton.LEFT, 0 < this._buffer.length ? this._buffer.shift() : this._buttonLeft.isDown, e), this._handleButton(awe6_interfaces_EMouseButton.MIDDLE, this._isMiddleDown(), e), this._handleButton(awe6_interfaces_EMouseButton.RIGHT, this._isRightDown(), e), this._deltaScroll = this.scroll - this._scrollPrev, this._scrollPrev = this.scroll, this._deltaX = this.x - this._xPrev, this._deltaY = this.y - this._yPrev, this.isMoving = this.x != this._xPrev || this.y != this._yPrev, this.isMoving ? this._stillUpdates = this._stillDuration = 0 : (this._stillUpdates++, this._stillDuration += e), this.relativeX = this.x / this._kernel.factory.width, this.relativeY = this.y / this._kernel.factory.height, this.relativeCentralisedX = 2 * (this.relativeX - .5), this.relativeCentralisedY = 2 * (this.relativeY - .5), this.isWithinBounds = this._isWithinBounds()
	},
	_isMiddleDown: function() {
		return !1
	},
	_isRightDown: function() {
		return !1
	},
	_isWithinBounds: function() {
		return !0
	},
	_getPosition: function() {
		this.x = 0, this.y = 0
	},
	_handleButton: function(e, t, s) {
		null == s && (s = 0);
		var i = this._getButton(e);
		t ? (i.isDown || (i.timeUpPrevious = i.timeUp, i.updatesUpPrevious = i.updatesUp, i.timeUp = i.updatesUp = 0, i.clickX = this.x, i.clickY = this.y), i.timeDown += s, i.updatesDown++, i.isDown = !0) : (i.isDown && (i.timeDownPrevious = i.timeDown, i.updatesDownPrevious = i.updatesDown, i.timeDown = i.updatesDown = 0), i.timeUp += s, i.updatesUp++, i.isDown = !1)
	},
	_disposer: function() {
		awe6_core_Process.prototype._disposer.call(this)
	},
	_reset: function(e) {
		this._buffer = [], this._buttonLeft = new awe6_core_drivers__$AInputMouse__$HelperButton(this._kernel), this._buttonMiddle = new awe6_core_drivers__$AInputMouse__$HelperButton(this._kernel), this._buttonRight = new awe6_core_drivers__$AInputMouse__$HelperButton(this._kernel)
	},
	_getButton: function(e) {
		switch (null == e && (e = awe6_interfaces_EMouseButton.LEFT), e._hx_index) {
			case 0:
				return this._buttonLeft;
			case 1:
				return this._buttonMiddle;
			case 2:
				return this._buttonRight
		}
	},
	getDeltaX: function(e) {
		null == e && (e = !0);
		var t = this._deltaX;
		return e && (t *= 1e3 / this._deltaTimePrev), Math.round(t)
	},
	getDeltaY: function(e) {
		null == e && (e = !0);
		var t = this._deltaY;
		return e && (t *= 1e3 / this._deltaTimePrev), Math.round(t)
	},
	getIsButtonDown: function(e) {
		return this._getButton(e).isDown
	},
	getIsButtonRelease: function(e) {
		return 1 == this._getButton(e).updatesUp
	},
	getButtonDownDuration: function(e, t, s) {
		null == s && (s = !1), null == t && (t = !0);
		var i = this._getButton(e);
		return s ? t ? i.timeDownPrevious : i.updatesDownPrevious : t ? i.timeDown : i.updatesDown
	},
	getButtonUpDuration: function(e, t, s) {
		null == s && (s = !1), null == t && (t = !0);
		var i = this._getButton(e);
		return s ? t ? i.timeUpPrevious : i.updatesUpPrevious : t ? i.timeUp : i.updatesUp
	},
	getButtonDragWidth: function(e) {
		var t = this._getButton(e);
		return t.isDown ? this.x - t.clickX : 0
	},
	getButtonDragHeight: function(e) {
		var t = this._getButton(e);
		return t.isDown ? this.y - t.clickY : 0
	},
	set_isVisible: function(e) {
		return this.isVisible = e, this.isVisible
	},
	set_cursorType: function(e) {
		return this.cursorType = e, this.cursorType
	},
	__class__: awe6_core_drivers_AInputMouse,
	__properties__: $extend(awe6_core_Process.prototype.__properties__, {
		set_cursorType: "set_cursorType",
		set_isVisible: "set_isVisible"
	})
});
var awe6_core_drivers__$AInputMouse__$HelperButton = function(e) {
	this.isDown = !1, this.updatesDown = 0, this.updatesUp = e.tools.BIG_NUMBER, this.timeDown = 0, this.timeUp = e.tools.BIG_NUMBER, this.updatesDownPrevious = 0, this.updatesUpPrevious = e.tools.BIG_NUMBER, this.timeDownPrevious = 0, this.timeUpPrevious = e.tools.BIG_NUMBER
};
$hxClasses["awe6.core.drivers._AInputMouse._HelperButton"] = awe6_core_drivers__$AInputMouse__$HelperButton, awe6_core_drivers__$AInputMouse__$HelperButton.__name__ = "awe6.core.drivers._AInputMouse._HelperButton", awe6_core_drivers__$AInputMouse__$HelperButton.prototype = {
	__class__: awe6_core_drivers__$AInputMouse__$HelperButton
};
var awe6_interfaces_ILogger = function() {};
$hxClasses["awe6.interfaces.ILogger"] = awe6_interfaces_ILogger, awe6_interfaces_ILogger.__name__ = "awe6.interfaces.ILogger", awe6_interfaces_ILogger.__isInterface__ = !0, awe6_interfaces_ILogger.prototype = {
	__class__: awe6_interfaces_ILogger
};
var awe6_interfaces_IKernel = function() {};
$hxClasses["awe6.interfaces.IKernel"] = awe6_interfaces_IKernel, awe6_interfaces_IKernel.__name__ = "awe6.interfaces.IKernel", awe6_interfaces_IKernel.__isInterface__ = !0, awe6_interfaces_IKernel.__interfaces__ = [awe6_interfaces_ILogger, awe6_interfaces_IPauseable], awe6_interfaces_IKernel.prototype = {
	__class__: awe6_interfaces_IKernel,
	__properties__: {
		set_session: "set_session",
		get_session: "get_session",
		set_isFullScreen: "set_isFullScreen",
		set_isEyeCandy: "set_isEyeCandy"
	}
};
var awe6_core_drivers_AKernel = function(e, t) {
	this.factory = e, this._context = t, this.tools = this._tools = new awe6_core_Tools(this), awe6_core_Process.call(this, this)
};
$hxClasses["awe6.core.drivers.AKernel"] = awe6_core_drivers_AKernel, awe6_core_drivers_AKernel.__name__ = "awe6.core.drivers.AKernel", awe6_core_drivers_AKernel.__interfaces__ = [awe6_interfaces_IKernel], awe6_core_drivers_AKernel.__super__ = awe6_core_Process, awe6_core_drivers_AKernel.prototype = $extend(awe6_core_Process.prototype, {
	_init: function() {
		awe6_core_Process.prototype._init.call(this), this._view = new awe6_core_drivers_createjs_View(this, this._context, 0, this), this._processes = new haxe_ds_List, this._helperFramerate = new awe6_core_drivers__$AKernel__$HelperFramerate(this.factory.targetFramerate), this._isPreloaded = !1, this.isDebug = this.factory.isDebug, this.isLocal = this._driverGetIsLocal(), this._driverInit(), this.assets = this._assetManagerProcess = new awe6_core_drivers_createjs_AssetManager(this._kernel), this.audio = this._audioManager = new awe6_core_drivers_createjs_AudioManager(this._kernel), this.inputs = this._inputManager = new awe6_core_InputManager(this._kernel), this.scenes = this._sceneManager = new awe6_core_SceneManager(this._kernel), this.messenger = this._messageManager = new awe6_core_MessageManager(this._kernel), this._view.addChild(this._sceneManager.view, 1), this._addProcess(this._assetManagerProcess), this._addProcess(this._inputManager), this._addProcess(this._sceneManager), this._addProcess(this._messageManager), this._addProcess(this._audioManager), this.set_isEyeCandy(!0), this.set_isFullScreen(!1), this.factory.onInitComplete(this), this.set_session(this.factory.createSession()), this.get_session().reset(), this._preloader = this.factory.createPreloader(), this._addProcess(this._preloader), this._view.addChild(this._preloader.get_view(), 2)
	},
	_driverGetIsLocal: function() {
		return !1
	},
	_driverInit: function() {},
	_driverDisposer: function() {},
	onPreloaderComplete: function(e) {
		this._isPreloaded = !0, this._removeProcess(this._preloader), this._preloader = null, this._logger = this.factory.createLogger();
		var t = this.factory.createAssetManager();
		t != this._assetManagerProcess && (this._removeProcess(this._assetManagerProcess), this.assets = this._assetManagerProcess = t, this._addProcess(this._assetManagerProcess, !1)), this.overlay = this._overlayProcess = this.factory.createOverlay(), this._addProcess(this._overlayProcess, !0), this._view.addChild(this._overlayProcess.get_view(), 3), this.isDebug && (this._addProcess(this._profiler = new awe6_core_drivers_createjs_Profiler(this)), this._view.addChild(this._profiler.get_view(), this._tools.BIG_NUMBER)), this.scenes.setScene(this.factory.startingSceneType), this.overlay.flash()
	},
	_updater: function(e) {
		null == e && (e = 0), this._helperFramerate.update();
		var t = this.factory.isFixedUpdates ? 1e3 / this.factory.targetFramerate | 0 : this._helperFramerate.timeInterval;
		awe6_core_Process.prototype._updater.call(this, t);
		for (var s = this._processes.h; null != s;) {
			var i = s.item,
				s = s.next;
			i.update(t)
		}
		var r = this._view;
		null == (e = t) && (e = 0), r.isActive && !r.isDisposed && (r._age += e, r._updates++, r._updater(e))
	},
	_disposer: function() {
		for (var e = this._processes.h; null != e;) {
			var t = e.item,
				e = e.next;
			this._removeProcess(t)
		}
		js_Boot.__implements(this.factory, awe6_interfaces_IDisposable) && js_Boot.__cast(this.factory, awe6_interfaces_IDisposable).dispose(), this.factory = null;
		var s = this._view;
		s.isDisposed || (s.isDisposed = !0, s.set_isActive(!1), s._disposer()), this._view = null, this._driverDisposer(), this.assets = this._assetManagerProcess = null, this.audio = this._audioManager = null, this.inputs = this._inputManager = null, this.scenes = this._sceneManager = null, this.messenger = this._messageManager = null, this.overlay = this._overlayProcess = null, this.tools = this._tools = null, this._logger = null, this._preloader = null, this.set_session(null), awe6_core_Process.prototype._disposer.call(this)
	},
	getConfig: function(e) {
		return Object.prototype.hasOwnProperty.call(this.factory.config.h, e) ? this.factory.config.h[e] : null
	},
	log: function(e) {
		null != this._logger ? this._logger.log(e) : this.isDebug && haxe_Log.trace("LOG: " + Std.string(e), {
			fileName: "awe6/core/drivers/AKernel.hx",
			lineNumber: 248,
			className: "awe6.core.drivers.AKernel",
			methodName: "log"
		})
	},
	getFramerate: function(e) {
		return null == e && (e = !0), e ? this._helperFramerate.framerate : this.factory.targetFramerate
	},
	_addProcess: function(e, t) {
		null == t && (t = !0), null != e && (t ? this._processes.add(e) : this._processes.push(e))
	},
	_removeProcess: function(e) {
		return null != e && (e.dispose(), this._processes.remove(e))
	},
	set_isEyeCandy: function(e) {
		return this.factory.isEyeCandyOptionEnabled ? (this.isEyeCandy = e, this._driverSetIsEyeCandy(e)) : this.isEyeCandy = !0, this.isEyeCandy
	},
	_driverSetIsEyeCandy: function(e) {},
	set_isFullScreen: function(e) {
		return !this.factory.isFullScreenOptionEnabled || Type.enumEq(this.factory.fullScreenType, awe6_interfaces_EFullScreen.DISABLED) ? this.isFullScreen = !1 : (this.isFullScreen = e, this._driverSetIsFullScreen(e)), this.isFullScreen
	},
	_driverSetIsFullScreen: function(e) {},
	_pauser: function() {
		awe6_core_Process.prototype._pauser.call(this), null != this.scenes.get_scene() && this.scenes.get_scene().pause()
	},
	_resumer: function() {
		awe6_core_Process.prototype._resumer.call(this), null != this.scenes.get_scene() && this.scenes.get_scene().resume()
	},
	get_session: function() {
		return this.session
	},
	set_session: function(e) {
		return this.session = e, this.get_session()
	},
	__class__: awe6_core_drivers_AKernel,
	__properties__: $extend(awe6_core_Process.prototype.__properties__, {
		set_session: "set_session",
		get_session: "get_session",
		set_isFullScreen: "set_isFullScreen",
		set_isEyeCandy: "set_isEyeCandy"
	})
});
var awe6_core_drivers__$AKernel__$HelperFramerate = function(e) {
	this.framerate = e, this._timeAtLastUpdate = HxOverrides.now() / 1e3 * 1e3 | 0
};
$hxClasses["awe6.core.drivers._AKernel._HelperFramerate"] = awe6_core_drivers__$AKernel__$HelperFramerate, awe6_core_drivers__$AKernel__$HelperFramerate.__name__ = "awe6.core.drivers._AKernel._HelperFramerate", awe6_core_drivers__$AKernel__$HelperFramerate.prototype = {
	update: function() {
		this.timeInterval = (HxOverrides.now() / 1e3 * 1e3 | 0) - this._timeAtLastUpdate, this.framerate = 1e3 / this.timeInterval, this._timeAtLastUpdate = HxOverrides.now() / 1e3 * 1e3 | 0
	},
	__class__: awe6_core_drivers__$AKernel__$HelperFramerate
};
var awe6_interfaces_IOverlay = function() {};
$hxClasses["awe6.interfaces.IOverlay"] = awe6_interfaces_IOverlay, awe6_interfaces_IOverlay.__name__ = "awe6.interfaces.IOverlay", awe6_interfaces_IOverlay.__isInterface__ = !0, awe6_interfaces_IOverlay.prototype = {
	__class__: awe6_interfaces_IOverlay,
	__properties__: {
		get_pauseEntity: "get_pauseEntity"
	}
};
var awe6_interfaces_IOverlayProcess = function() {};
$hxClasses["awe6.interfaces.IOverlayProcess"] = awe6_interfaces_IOverlayProcess, awe6_interfaces_IOverlayProcess.__name__ = "awe6.interfaces.IOverlayProcess", awe6_interfaces_IOverlayProcess.__isInterface__ = !0, awe6_interfaces_IOverlayProcess.__interfaces__ = [awe6_interfaces_IViewable, awe6_interfaces_IProcess, awe6_interfaces_IOverlay];
var awe6_core_drivers_AOverlay = function(e, t, s, i, r, n, _, a, o, c, h, l, u, d, g, p, w) {
	null == w && (w = .35), null == p && (p = 0), null == g && (g = 8), null == s && (s = 30), null == t && (t = 30), null == i && (i = new awe6_core_drivers_createjs_View(e)), null == r && (r = new awe6_core_drivers_createjs_View(e)), null == n && (n = new awe6_core_drivers_createjs_View(e)), null == _ && (_ = new awe6_core_drivers_createjs_View(e)), null == a && (a = new awe6_core_drivers_createjs_View(e)), null == o && (o = new awe6_core_drivers_createjs_View(e)), null == c && (c = new awe6_core_drivers_createjs_View(e)), null == h && (h = new awe6_core_drivers_createjs_View(e)), null == l && (l = new awe6_core_drivers_createjs_View(e)), null == u && (u = new awe6_core_drivers_createjs_View(e)), null == d && (d = new awe6_core_drivers_createjs_View(e)), this._borderView = i, this._buttonBack = new awe6_core_BasicButton(e, r, n, t, s), this._buttonMute = new awe6_core_BasicButton(e, _, a, t, s), this._buttonUnmute = new awe6_core_BasicButton(e, o, c, t, s), this._buttonPause = new awe6_core_BasicButton(e, h, l, t, s), this._buttonUnpause = new awe6_core_BasicButton(e, u, d, t, s), this._pauseBlur = g, this._pauseColor = p, this._pauseAlpha = w, this._context = new createjs.Container, awe6_core_Entity.call(this, e, null, this._context)
};
$hxClasses["awe6.core.drivers.AOverlay"] = awe6_core_drivers_AOverlay, awe6_core_drivers_AOverlay.__name__ = "awe6.core.drivers.AOverlay", awe6_core_drivers_AOverlay.__interfaces__ = [awe6_interfaces_IOverlayProcess], awe6_core_drivers_AOverlay.__super__ = awe6_core_Entity, awe6_core_drivers_AOverlay.prototype = $extend(awe6_core_Entity.prototype, {
	_init: function() {
		awe6_core_Entity.prototype._init.call(this), this.get_view().addChild(this._borderView, 4), this._wasMute = this._kernel.audio.isMute, this._driverInit(), this._progressView = new awe6_core_drivers_createjs_View(this._kernel, this._progressContext), this._progressView.set_isVisible(!1), this._pauseView = new awe6_core_drivers_createjs_View(this._kernel, this._pauseContext), this._pauseView.set_isVisible(!1), this._flashView = new awe6_core_drivers_createjs_View(this._kernel, this._flashContext), this._flashView.set_isVisible(!1), this._flashStartingAlpha = 1, this._flashAsTime = !0, this._flashDuration = this._flashStartingDuration = 100;
		var e = $bind(this, this.activateButton),
			t = awe6_interfaces_EOverlayButton.BACK,
			s = function() {
				e(t)
			};
		this._buttonBack.onClickCallback = s;
		var i = $bind(this, this.activateButton),
			r = awe6_interfaces_EOverlayButton.MUTE,
			s = function() {
				i(r)
			};
		this._buttonMute.onClickCallback = s;
		var n = $bind(this, this.activateButton),
			_ = awe6_interfaces_EOverlayButton.PAUSE,
			s = function() {
				n(_)
			};
		this._buttonPause.onClickCallback = s;
		var a = $bind(this, this.activateButton),
			o = awe6_interfaces_EOverlayButton.UNMUTE,
			s = function() {
				a(o)
			};
		this._buttonUnmute.onClickCallback = s;
		var c = $bind(this, this.activateButton),
			h = awe6_interfaces_EOverlayButton.UNPAUSE,
			s = function() {
				c(h)
			};
		this._buttonUnpause.onClickCallback = s, this.get_view().addChild(this._flashView, 1), this.get_view().addChild(this._pauseView, 2), this.get_view().addChild(this._progressView, 3), this.addEntity(this._buttonBack, null, !0, 21), this.addEntity(this._buttonUnmute, null, !0, 22), this.addEntity(this._buttonMute, null, !0, 23), this.addEntity(this._buttonUnpause, null, !0, 24), this.addEntity(this._buttonPause, null, !0, 25);
		var l = this._buttonBack.height,
			u = this._buttonBack.width,
			d = this._kernel.factory.width - 4 * u,
			g = l;
		this.positionButton(awe6_interfaces_EOverlayButton.BACK, d, g), this.positionButton(awe6_interfaces_EOverlayButton.MUTE, d += u, g), this.positionButton(awe6_interfaces_EOverlayButton.UNMUTE, d, g), this.positionButton(awe6_interfaces_EOverlayButton.PAUSE, d += u, g), this.positionButton(awe6_interfaces_EOverlayButton.UNPAUSE, d, g)
	},
	_driverInit: function() {
		this._progressContext = new createjs.Container, this._pauseContext = new createjs.Container, this._flashContext = new createjs.Container
	},
	_updater: function(e) {
		var t;
		null == e && (e = 0), awe6_core_Entity.prototype._updater.call(this, e), 0 < this._flashDuration && (this._flashDuration -= this._flashAsTime ? e : 1, t = this._flashStartingAlpha * (this._flashDuration / this._flashStartingDuration), this._flashAlpha = 1 < t ? 1 : t < 0 ? 0 : t), this._flashView.set_isVisible(0 < this._flashAlpha), null != this._kernel.factory.keyBack && this._kernel.inputs.keyboard.getIsKeyPress(this._kernel.factory.keyBack) && this.activateButton(this._kernel.isActive ? awe6_interfaces_EOverlayButton.BACK : awe6_interfaces_EOverlayButton.UNPAUSE), null != this._kernel.factory.keyPause && this._kernel.inputs.keyboard.getIsKeyPress(this._kernel.factory.keyPause) && this.activateButton(this._kernel.isActive ? awe6_interfaces_EOverlayButton.PAUSE : awe6_interfaces_EOverlayButton.UNPAUSE), null != this._kernel.factory.keyMute && this._kernel.inputs.keyboard.getIsKeyPress(this._kernel.factory.keyMute) && this.activateButton(this._kernel.audio.isMute ? awe6_interfaces_EOverlayButton.UNMUTE : awe6_interfaces_EOverlayButton.MUTE), null == this.get_pauseEntity() || this._kernel.isActive || (this.get_pauseEntity().update(e), this._pauseView.update(e))
	},
	_disposer: function() {
		null != this.get_pauseEntity() && this.get_pauseEntity().dispose(), this.get_view().dispose(), awe6_core_Entity.prototype._disposer.call(this)
	},
	_getButton: function(e) {
		switch (e._hx_index) {
			case 0:
				return this._buttonBack;
			case 1:
				return this._buttonMute;
			case 2:
				return this._buttonUnmute;
			case 3:
				return this._buttonPause;
			case 4:
				return this._buttonUnpause;
			case 5:
				e.value;
				return null
		}
	},
	showButton: function(e, t) {
		null == t && (t = !0);
		var s = this._getButton(e);
		null != s && (t ? this.addEntity(s, null, !0) : this.removeEntity(s, null, !0))
	},
	positionButton: function(e, t, s, i, r) {
		var n = this._getButton(e);
		null != n && (n.set_x(t), n.set_y(s), null != i && n.set_width(i), null != r && n.set_height(r))
	},
	hideButtons: function() {
		this.showButton(awe6_interfaces_EOverlayButton.BACK, !1), this.showButton(awe6_interfaces_EOverlayButton.MUTE, !1), this.showButton(awe6_interfaces_EOverlayButton.UNMUTE, !1), this.showButton(awe6_interfaces_EOverlayButton.PAUSE, !1), this.showButton(awe6_interfaces_EOverlayButton.UNPAUSE, !1)
	},
	flash: function(e, t, s, i) {
		null == i && (i = 16777215), null == s && (s = 1), null == t && (t = !0), null == e && (e = t ? 500 : .5 * this._kernel.factory.targetFramerate), this._flashDuration = this._flashStartingDuration = e, this._flashAsTime = t, this._flashAlpha = this._flashStartingAlpha = 1 < s ? 1 : s < 0 ? 0 : s
	},
	activateButton: function(e) {
		switch (e._hx_index) {
			case 0:
				this._buttonBack.get_view().get_isInViewStack() && (this._kernel.isActive || this.activateButton(awe6_interfaces_EOverlayButton.UNPAUSE), this._drawPause(!1), this._kernel.resume(), this._kernel.scenes.back());
				break;
			case 1:
				this._buttonMute.get_view().get_isInViewStack() && (this.showButton(awe6_interfaces_EOverlayButton.MUTE, !1), this.showButton(awe6_interfaces_EOverlayButton.UNMUTE, !0), this._kernel.audio.set_isMute(!0));
				break;
			case 2:
				this._buttonUnmute.get_view().get_isInViewStack() && !this._buttonUnpause.get_view().get_isInViewStack() && (this.showButton(awe6_interfaces_EOverlayButton.MUTE, !0), this.showButton(awe6_interfaces_EOverlayButton.UNMUTE, !1), this._kernel.audio.set_isMute(!1));
				break;
			case 3:
				this._buttonPause.get_view().get_isInViewStack() && (this._kernel.pause(), this._drawPause(!0), this._wasMute = this._kernel.audio.isMute, this.showButton(awe6_interfaces_EOverlayButton.PAUSE, !1), this.showButton(awe6_interfaces_EOverlayButton.UNPAUSE, !0), this.activateButton(awe6_interfaces_EOverlayButton.MUTE));
				break;
			case 4:
				this._buttonUnpause.get_view().get_isInViewStack() && (this.showButton(awe6_interfaces_EOverlayButton.PAUSE, !0), this.showButton(awe6_interfaces_EOverlayButton.UNPAUSE, !1), this.activateButton(this._wasMute ? awe6_interfaces_EOverlayButton.MUTE : awe6_interfaces_EOverlayButton.UNMUTE), this._kernel.resume(), this._drawPause(!1));
				break;
			case 5:
				e.value
		}
	},
	_drawPause: function(e) {
		null == e && (e = !0), this._pauseView.set_isVisible(e)
	},
	get_pauseEntity: function() {
		return this.pauseEntity
	},
	set_pauseEntity: function(e) {
		return null != this.get_pauseEntity() && this.get_pauseEntity().get_view().remove(), this.pauseEntity = e, this._pauseView.addChild(this.get_pauseEntity().get_view()), this.get_pauseEntity()
	},
	__class__: awe6_core_drivers_AOverlay,
	__properties__: $extend(awe6_core_Entity.prototype.__properties__, {
		set_pauseEntity: "set_pauseEntity",
		get_pauseEntity: "get_pauseEntity"
	})
});
var awe6_interfaces_IProgress = function() {};
$hxClasses["awe6.interfaces.IProgress"] = awe6_interfaces_IProgress, awe6_interfaces_IProgress.__name__ = "awe6.interfaces.IProgress", awe6_interfaces_IProgress.__isInterface__ = !0;
var awe6_interfaces_IPreloader = function() {};
$hxClasses["awe6.interfaces.IPreloader"] = awe6_interfaces_IPreloader, awe6_interfaces_IPreloader.__name__ = "awe6.interfaces.IPreloader", awe6_interfaces_IPreloader.__isInterface__ = !0, awe6_interfaces_IPreloader.__interfaces__ = [awe6_interfaces_IProgress, awe6_interfaces_IViewable, awe6_interfaces_IProcess];
var awe6_core_drivers_APreloader = function(e, t, s) {
	null == s && (s = !1), this._assets = t, this._isDecached = s, awe6_core_Process.call(this, e)
};
$hxClasses["awe6.core.drivers.APreloader"] = awe6_core_drivers_APreloader, awe6_core_drivers_APreloader.__name__ = "awe6.core.drivers.APreloader", awe6_core_drivers_APreloader.__interfaces__ = [awe6_interfaces_IPreloader], awe6_core_drivers_APreloader.__super__ = awe6_core_Process, awe6_core_drivers_APreloader.prototype = $extend(awe6_core_Process.prototype, {
	_init: function() {
		awe6_core_Process.prototype._init.call(this), this.progress = 0, null == this.get_view() && (this.view = new awe6_core_drivers_createjs_View(this._kernel)), this._encrypter = this._tools, this._currentProgress = 0, this._currentAsset = 0, this._isComplete = !1, 0 < this._assets.length && this._next()
	},
	_next: function() {
		if (this._currentAsset++, this._currentAsset > this._assets.length) {
			if (!this._isComplete) {
				try {
					var e = $bind($_ = this._kernel, $_.onPreloaderComplete),
						t = this;
					haxe_Timer.delay(function() {
						e(t)
					}, 100)
				} catch (e) {}
				this._isComplete = !0
			}
		} else this._driverLoad(this._assets[this._currentAsset - 1]), this._currentProgress = 0
	},
	_driverLoad: function(e) {},
	_updater: function(e) {
		null == e && (e = 0), awe6_core_Process.prototype._updater.call(this, e), 0 == this._assets.length && this._kernel.onPreloaderComplete(this), this.get_view().set_isVisible(100 < this._age)
	},
	_disposer: function() {
		this.get_view().dispose(), this._driverDisposer(), awe6_core_Process.prototype._disposer.call(this)
	},
	_driverDisposer: function() {},
	get_view: function() {
		return this.view
	},
	__class__: awe6_core_drivers_APreloader,
	__properties__: $extend(awe6_core_Process.prototype.__properties__, {
		get_view: "get_view"
	})
});
var awe6_core_drivers_AProfiler = function(e) {
	this._context = new createjs.Container, awe6_core_Entity.call(this, e, null, this._context)
};
$hxClasses["awe6.core.drivers.AProfiler"] = awe6_core_drivers_AProfiler, awe6_core_drivers_AProfiler.__name__ = "awe6.core.drivers.AProfiler", awe6_core_drivers_AProfiler.__super__ = awe6_core_Entity, awe6_core_drivers_AProfiler.prototype = $extend(awe6_core_Entity.prototype, {
	_init: function() {
		awe6_core_Entity.prototype._init.call(this), this._marginHeight = 25, this._marginColor = 128, this._backgroundColor = -2147483520, this._fpsColor = 16777215, this._memoryColor = 16744448, this._fpsLabel = "FPS", this._memoryLabel = "MBs", this._width = 60, this._height = 50, this._agePrev = 0
	},
	_updater: function(e) {
		null == e && (e = 0), awe6_core_Entity.prototype._updater.call(this, e), this._age < this._agePrev + 250 || (this._agePrev = this._age, this._driverUpdate())
	},
	_driverUpdate: function() {},
	__class__: awe6_core_drivers_AProfiler
});
var awe6_interfaces_ISceneTransition = function() {};
$hxClasses["awe6.interfaces.ISceneTransition"] = awe6_interfaces_ISceneTransition, awe6_interfaces_ISceneTransition.__name__ = "awe6.interfaces.ISceneTransition", awe6_interfaces_ISceneTransition.__isInterface__ = !0, awe6_interfaces_ISceneTransition.__interfaces__ = [awe6_interfaces_IViewable, awe6_interfaces_IProgress, awe6_interfaces_IProcess];
var awe6_core_drivers_ASceneTransition = function(e, t) {
	null == t && (t = 500), this._duration = t, this._context = new createjs.Container, awe6_core_Entity.call(this, e, null, this._context)
};
$hxClasses["awe6.core.drivers.ASceneTransition"] = awe6_core_drivers_ASceneTransition, awe6_core_drivers_ASceneTransition.__name__ = "awe6.core.drivers.ASceneTransition", awe6_core_drivers_ASceneTransition.__interfaces__ = [awe6_interfaces_ISceneTransition], awe6_core_drivers_ASceneTransition.__super__ = awe6_core_Entity, awe6_core_drivers_ASceneTransition.prototype = $extend(awe6_core_Entity.prototype, {
	_init: function() {
		awe6_core_Entity.prototype._init.call(this)
	},
	_updater: function(e) {
		null == e && (e = 0), awe6_core_Entity.prototype._updater.call(this, e), this._age > this._duration && (this.isDisposed || (this.isDisposed = !0, this.set_isActive(!1), this._disposer()))
	},
	get_progress: function() {
		var e = this._age / this._duration;
		return 1 < e ? 1 : e < 0 ? 0 : e
	},
	__class__: awe6_core_drivers_ASceneTransition,
	__properties__: $extend(awe6_core_Entity.prototype.__properties__, {
		get_progress: "get_progress"
	})
});
var awe6_interfaces_ISession = function() {};
$hxClasses["awe6.interfaces.ISession"] = awe6_interfaces_ISession, awe6_interfaces_ISession.__name__ = "awe6.interfaces.ISession", awe6_interfaces_ISession.__isInterface__ = !0, awe6_interfaces_ISession.prototype = {
	__class__: awe6_interfaces_ISession
};
var awe6_core_drivers_ASession = function(e, t) {
	null == t && (t = ""), this._kernel = e, "" == t && (t = "DEBUG_AWE6"), this.id = t, this._tools = this._kernel.tools, this._version = 1, this._init()
};
$hxClasses["awe6.core.drivers.ASession"] = awe6_core_drivers_ASession, awe6_core_drivers_ASession.__name__ = "awe6.core.drivers.ASession", awe6_core_drivers_ASession.__interfaces__ = [awe6_interfaces_ISession], awe6_core_drivers_ASession.prototype = {
	_init: function() {
		this._driverLoad(), Reflect.field(this._savedData, "_____VERSION") != this._version && this._driverReset();
		var e = null != Reflect.field(this._savedData, this.id);
		this._data = {}, this._resetter(), this._setter(), e && (this._data = Reflect.field(this._savedData, this.id), this._getter(), this.loadCount++)
	},
	_driverLoad: function() {
		this._savedData = {}
	},
	_driverSave: function() {},
	_driverReset: function() {
		this._savedData = {}
	},
	_getter: function() {
		this.loadCount = this._data.loadCount, this.saveCount = this._data.saveCount
	},
	_setter: function() {
		this._data.loadCount = this.loadCount, this._data.saveCount = this.saveCount
	},
	_resetter: function() {
		this.loadCount = 0, this.saveCount = 0
	},
	reset: function(e) {
		null == e && (e = !1), this._data = {}, this._resetter(), this._setter(), e && (this.saveCount++, this._setter(), this._savedData._____VERSION = this._version, this._savedData[this.id] = this._data, this._driverSave())
	},
	save: function() {
		this.saveCount++, this._setter(), this._savedData._____VERSION = this._version, this._savedData[this.id] = this._data, this._driverSave()
	},
	__class__: awe6_core_drivers_ASession
};
var awe6_interfaces_IPriority = function() {};
$hxClasses["awe6.interfaces.IPriority"] = awe6_interfaces_IPriority, awe6_interfaces_IPriority.__name__ = "awe6.interfaces.IPriority", awe6_interfaces_IPriority.__isInterface__ = !0, awe6_interfaces_IPriority.prototype = {
	__class__: awe6_interfaces_IPriority,
	__properties__: {
		set_priority: "set_priority",
		get_priority: "get_priority"
	}
};
var awe6_interfaces_IView = function() {};
$hxClasses["awe6.interfaces.IView"] = awe6_interfaces_IView, awe6_interfaces_IView.__name__ = "awe6.interfaces.IView", awe6_interfaces_IView.__isInterface__ = !0, awe6_interfaces_IView.__interfaces__ = [awe6_interfaces_IUpdateable, awe6_interfaces_IDisposable, awe6_interfaces_IPositionable, awe6_interfaces_IPriority], awe6_interfaces_IView.prototype = {
	__class__: awe6_interfaces_IView,
	__properties__: {
		get_isInViewStack: "get_isInViewStack",
		set_isVisible: "set_isVisible",
		get_parent: "get_parent"
	}
};
var awe6_core_drivers_AView = function(e, t, s, i) {
	null == s && (s = 0), this.context = t, this.set_priority(s), this.owner = i, awe6_core_Process.call(this, e)
};
$hxClasses["awe6.core.drivers.AView"] = awe6_core_drivers_AView, awe6_core_drivers_AView.__name__ = "awe6.core.drivers.AView", awe6_core_drivers_AView.__interfaces__ = [awe6_interfaces_IView], awe6_core_drivers_AView.__super__ = awe6_core_Process, awe6_core_drivers_AView.prototype = $extend(awe6_core_Process.prototype, {
	_init: function() {
		awe6_core_Process.prototype._init.call(this), this.globalX = 0, this.globalY = 0, this.set_x(0), this.set_y(0), this.set_isVisible(!0), this._isDirty = !0, this._children = []
	},
	addChild: function(e, t) {
		return null == t && (t = 0), this.isDisposed || null == e ? null : (e.get_parent() != this && (e.remove(), e instanceof awe6_core_drivers_AView && (s = e, this._children.push(s), s._setParent(this))), 0 != t && e.set_priority(t), this._isDirty = !0, e);
		var s
	},
	removeChild: function(e) {
		if (!this.isDisposed && null != e) {
			if (e instanceof awe6_core_drivers_AView) {
				var t = e;
				if (t.get_parent() != this) return;
				HxOverrides.remove(this._children, t), t._setParent(null)
			}
			this._isDirty = !0
		}
	},
	remove: function() {
		null != this.get_parent() && this.get_parent().removeChild(this)
	},
	clear: function() {
		for (var e = 0, t = this._children; e < t.length;) {
			var s = t[e];
			++e, this.removeChild(s)
		}
	},
	_updater: function(e) {
		null == e && (e = 0), awe6_core_Process.prototype._updater.call(this, e);
		for (var t = 0, s = this._children; t < s.length;) {
			var i = s[t];
			++t;
			var r = e;
			null == r && (r = 0), i.isActive && !i.isDisposed && (i._age += r, i._updates++, i._updater(r))
		}
		this._isDirty && this._draw(), this.globalX = null == this.get_parent() ? this.x : this.x + this.get_parent().globalX, this.globalY = null == this.get_parent() ? this.y : this.y + this.get_parent().globalY
	},
	_disposer: function() {
		this.remove(), this._driverDisposer(), this.clear(), awe6_core_Process.prototype._disposer.call(this)
	},
	_driverDisposer: function() {},
	_draw: function() {
		this.isDisposed || (this._children.sort($bind($_ = this._tools, $_.sortByPriority)), this._driverDraw(), this._isDirty = !1)
	},
	_driverDraw: function() {},
	_setParent: function(e) {
		this.parent = e
	},
	get_priority: function() {
		return this.priority
	},
	set_priority: function(e) {
		return e == this.get_priority() || (this.priority = e, this.get_parent() instanceof awe6_core_drivers_AView && (null != (t = this.get_parent()) && (t._isDirty = !0))), this.get_priority();
		var t
	},
	set_isVisible: function(e) {
		return e == this.isVisible || (this.isVisible = e, this.get_parent() instanceof awe6_core_drivers_AView && (null != (t = this.get_parent()) && t._draw())), this.isVisible;
		var t
	},
	get_parent: function() {
		return this.parent
	},
	get_isInViewStack: function() {
		return !!this.isVisible && (this.owner == this._kernel || null != this.get_parent() && this.get_parent().get_isInViewStack())
	},
	set_x: function(e) {
		return this.x = e, this.globalX = null == this.get_parent() ? this.x : this.x + this.get_parent().globalX, this.x
	},
	set_y: function(e) {
		return this.y = e, this.globalY = null == this.get_parent() ? this.y : this.y + this.get_parent().globalY, this.y
	},
	__class__: awe6_core_drivers_AView,
	__properties__: $extend(awe6_core_Process.prototype.__properties__, {
		get_parent: "get_parent",
		get_isInViewStack: "get_isInViewStack",
		set_isVisible: "set_isVisible",
		set_y: "set_y",
		set_x: "set_x",
		set_priority: "set_priority",
		get_priority: "get_priority"
	})
});
var awe6_core_drivers_createjs_AssetManager = function(e) {
	awe6_core_drivers_AAssetManager.call(this, e)
};
$hxClasses["awe6.core.drivers.createjs.AssetManager"] = awe6_core_drivers_createjs_AssetManager, awe6_core_drivers_createjs_AssetManager.__name__ = "awe6.core.drivers.createjs.AssetManager", awe6_core_drivers_createjs_AssetManager.__super__ = awe6_core_drivers_AAssetManager, awe6_core_drivers_createjs_AssetManager.prototype = $extend(awe6_core_drivers_AAssetManager.prototype, {
	_driverGetAsset: function(e, t, s) {
		var i = null;
		return null != awe6_core_drivers_createjs_AssetManager.loadQueue && (i = awe6_core_drivers_createjs_AssetManager.loadQueue.getResult(e)), i
	},
	__class__: awe6_core_drivers_createjs_AssetManager
});
var awe6_core_drivers_createjs_AudioManager = function(e) {
	awe6_core_drivers_AAudioManager.call(this, e)
};
$hxClasses["awe6.core.drivers.createjs.AudioManager"] = awe6_core_drivers_createjs_AudioManager, awe6_core_drivers_createjs_AudioManager.__name__ = "awe6.core.drivers.createjs.AudioManager", awe6_core_drivers_createjs_AudioManager.__super__ = awe6_core_drivers_AAudioManager, awe6_core_drivers_createjs_AudioManager.prototype = $extend(awe6_core_drivers_AAudioManager.prototype, {
	_init: function() {
		awe6_core_drivers_AAudioManager.prototype._init.call(this), this._visibilityWasMute = this.isMute, window.document.addEventListener("visibilitychange", $bind(this, this._onVisibilityChange))
	},
	_disposer: function() {
		window.document.removeEventListener("visibilitychange", $bind(this, this._onVisibilityChange)), awe6_core_drivers_AAudioManager.prototype._disposer.call(this)
	},
	_driverSoundFactory: function(e, t, s, i, r, n, _) {
		return null == n && (n = 0), null == r && (r = 1), null == i && (i = 0), null == s && (s = 1), new awe6_core_drivers_createjs__$HelperSound(this._kernel, e, this._packageId, t, s, i, r, n, _)
	},
	_driverSetIsMute: function(e) {
		try {
			createjs.Sound.muted = e
		} catch (e) {}
		try {
			createjs.Sound.setMute(e)
		} catch (e) {}
	},
	_onVisibilityChange: function(e) {
		this._getVisibilityPropery() ? (this._visibilityWasMute = this.isMute, this.set_isMute(!0)) : this.set_isMute(this._visibilityWasMute)
	},
	_getVisibilityPropery: function() {
		for (var e = ["hidden", "mozHidden", "msHidden", "oHidden", "webkitHidden"], t = 0; t < e.length;) {
			var s = e[t];
			++t;
			var i = window.document;
			if (Object.prototype.hasOwnProperty.call(i, s)) return Reflect.field(window.document, s)
		}
		return window.document.hidden
	},
	__class__: awe6_core_drivers_createjs_AudioManager
});
var awe6_core_drivers_createjs__$HelperSound = function(e, t, s, i, r, n, _, a, o) {
	null == a && (a = 0), null == _ && (_ = 1), null == n && (n = 0), null == r && (r = 1), awe6_core_drivers__$AHelperSound.call(this, e, t, s, i, 1 == r ? 0 : r, n, _, a, o)
};
$hxClasses["awe6.core.drivers.createjs._HelperSound"] = awe6_core_drivers_createjs__$HelperSound, awe6_core_drivers_createjs__$HelperSound.__name__ = "awe6.core.drivers.createjs._HelperSound", awe6_core_drivers_createjs__$HelperSound.__super__ = awe6_core_drivers__$AHelperSound, awe6_core_drivers_createjs__$HelperSound.prototype = $extend(awe6_core_drivers__$AHelperSound.prototype, {
	_driverInit: function() {
		try {
			this._sound = createjs.Sound.play("assets.audio." + this.id, null, 0, this._startTime, this._loops, this._volume, this._pan), createjs.WebAudioPlugin.context && "suspended" == createjs.WebAudioPlugin.context.state && createjs.WebAudioPlugin.context.resume()
		} catch (e) {}
		null != this._sound ? (this._sound.addEventListener("complete", $bind(this, this._onSoundComplete)), this._driverTransform()) : this.dispose()
	},
	_driverTransform: function(e) {
		null == e && (e = !1), null != this._sound && (e && (this._volume *= this._sound.volume, this._pan *= this._sound.pan), this._sound.volume = this._volume, this._sound.pan = this._pan)
	},
	_driverStop: function() {
		if (null != this._sound) try {
			this._sound.stop()
		} catch (e) {}
	},
	_onSoundComplete: function(e) {
		null != this._onCompleteCallback && this._onCompleteCallback.apply(this, []), this.dispose()
	},
	__class__: awe6_core_drivers_createjs__$HelperSound
});
var awe6_core_drivers_createjs_Factory = function(e, t, s) {
	awe6_core_drivers_AFactory.call(this, e, t, s)
};
$hxClasses["awe6.core.drivers.createjs.Factory"] = awe6_core_drivers_createjs_Factory, awe6_core_drivers_createjs_Factory.__name__ = "awe6.core.drivers.createjs.Factory", awe6_core_drivers_createjs_Factory.__super__ = awe6_core_drivers_AFactory, awe6_core_drivers_createjs_Factory.prototype = $extend(awe6_core_drivers_AFactory.prototype, {
	_driverInit: function() {
		this.isDebug || (haxe_Log.trace = function(e, t) {
			window.console.log(e)
		});
		var e, t, s = new createjs.Container;
		this._context.addChild(s), this._context = s, this._countConfigsLoaded = 0, this._countConfigsToLoad = 0, "" != this._config ? (e = null != this._config ? this._config : "images/__Config.xml", null != (t = this._context.getStage().canvas.getAttribute("config")) && "" != t && (e = t), this._loadConfig(e)) : this._launchKernel()
	},
	_launchKernel: function() {
		this._displayCredits();
		var e = !0;
		Object.prototype.hasOwnProperty.call(this.config.h, "settings.nativeExperience") && (e = "true" == this.config.h["settings.nativeExperience"]);
		var t = this._context.getStage().canvas.getAttribute("nativeExperience");
		null != t && "" != t && (e = "true" == t), this.isNativeExperience = e, awe6_core_drivers_AFactory.prototype._launchKernel.call(this);
		var s = this._concreteKernel.system.isDesktop,
			i = "default";
		Object.prototype.hasOwnProperty.call(this.config.h, "settings.fullScreen") && (i = this.config.h["settings.fullScreen"]);
		var r = this._context.getStage().canvas.getAttribute("fullScreen");
		null != r && "" != r && (i = r), this._kernel.set_isFullScreen(s && ("desktop" == i || "all" == i) || !s && ("mobile" == i || "all" == i || "default" == i)), this._kernel.isFullScreen && this.isNativeExperience && !s && (this._concreteKernel.system.requestFullScreen(), this._concreteKernel.system.requestLockScreen())
	},
	_displayCredits: function() {
		haxe_Log.trace(Object.prototype.hasOwnProperty.call(this.config.h, "settings.asciiArt") ? this.config.h["settings.asciiArt"] : "", {
			fileName: "awe6/core/drivers/createjs/Factory.hx",
			lineNumber: 127,
			className: "awe6.core.drivers.createjs.Factory",
			methodName: "_displayCredits"
		}), haxe_Log.trace(this.id + " v" + this.version + " by " + this.author, {
			fileName: "awe6/core/drivers/createjs/Factory.hx",
			lineNumber: 128,
			className: "awe6.core.drivers.createjs.Factory",
			methodName: "_displayCredits"
		}), haxe_Log.trace("Powered by awe6 (http://awe6.org)", {
			fileName: "awe6/core/drivers/createjs/Factory.hx",
			lineNumber: 129,
			className: "awe6.core.drivers.createjs.Factory",
			methodName: "_displayCredits"
		}), this.isDecached && haxe_Log.trace("Note: decaching is currently enabled", {
			fileName: "awe6/core/drivers/createjs/Factory.hx",
			lineNumber: 132,
			className: "awe6.core.drivers.createjs.Factory",
			methodName: "_displayCredits"
		}), haxe_Log.trace("", {
			fileName: "awe6/core/drivers/createjs/Factory.hx",
			lineNumber: 134,
			className: "awe6.core.drivers.createjs.Factory",
			methodName: "_displayCredits"
		})
	},
	_loadConfig: function(e) {
		if ("<?xml" == HxOverrides.substr(e, 0, 5)) this._parseXml(e);
		else {
			this.isDecached && (e += "?dc=" + Std.random(99999));
			try {
				var t = new haxe_http_HttpJs(e);
				t.onError = $bind(this, this._onIOError), t.onData = $bind(this, this._onComplete), t.request()
			} catch (e) {
				var s = haxe_Exception.caught(e).unwrap();
				return void this._onIOError(Std.string(s))
			}
			this._countConfigsToLoad++
		}
	},
	_parseXml: function(e) {
		if (this._traverseElements(Xml.parse(e).firstElement().elements(), ""), Object.prototype.hasOwnProperty.call(this.config.h, "settings.joinXml") && this._countConfigsLoaded < 100) {
			var t = this.config.h["settings.joinXml"],
				s = this.config;
			Object.prototype.hasOwnProperty.call(s.h, "settings.joinXml") && delete s.h["settings.joinXml"];
			for (var i = t.split(","), r = 0; r < i.length;) {
				var n = i[r];
				++r, this._loadConfig(n)
			}
		}
		this._countConfigsLoaded == this._countConfigsToLoad && this._launchKernel()
	},
	_onIOError: function(e) {
		haxe_Log.trace("IO Errors Occurred During Config Loading:" + e, {
			fileName: "awe6/core/drivers/createjs/Factory.hx",
			lineNumber: 188,
			className: "awe6.core.drivers.createjs.Factory",
			methodName: "_onIOError"
		}), haxe_Log.trace("Double check your Config path.  Cross domain (or local) file loading of Config is a security risk and is, therefore, disabled on this browser.", {
			fileName: "awe6/core/drivers/createjs/Factory.hx",
			lineNumber: 189,
			className: "awe6.core.drivers.createjs.Factory",
			methodName: "_onIOError"
		}), null != this._config && "<?xml" == HxOverrides.substr(this._config, 0, 5) ? (haxe_Log.trace("Embedded Config detected, using that to continue ...", {
			fileName: "awe6/core/drivers/createjs/Factory.hx",
			lineNumber: 192,
			className: "awe6.core.drivers.createjs.Factory",
			methodName: "_onIOError"
		}), this._countConfigsLoaded = this._countConfigsToLoad, this._parseXml(this._config)) : (haxe_Log.trace("Use a web server (or local server) to run over http and serve all files from the same domain.  Or embed the Config directlty in the code (e.g. as a Resource).", {
			fileName: "awe6/core/drivers/createjs/Factory.hx",
			lineNumber: 198,
			className: "awe6.core.drivers.createjs.Factory",
			methodName: "_onIOError"
		}), haxe_Log.trace("Unable to continue without Config.", {
			fileName: "awe6/core/drivers/createjs/Factory.hx",
			lineNumber: 199,
			className: "awe6.core.drivers.createjs.Factory",
			methodName: "_onIOError"
		}))
	},
	_onComplete: function(e) {
		var t;
		this._countConfigsLoaded++, "" != e ? (t = e, "<?xml" != HxOverrides.substr(t, 0, 5) && (t = this.createEncrypter().decrypt(haxe_io_Bytes.ofString(t)).toString()), this._parseXml(t)) : this._onIOError(e)
	},
	_getAssetUrls: function() {
		for (var e = ["bin/audio/Boost1.m4a", "bin/audio/Boost1.ogg", "bin/audio/Boost2.m4a", "bin/audio/Boost2.ogg", "bin/audio/ButtonOver.m4a", "bin/audio/ButtonOver.ogg", "bin/audio/Coin.m4a", "bin/audio/Coin.ogg", "bin/audio/Collision1.m4a", "bin/audio/Collision1.ogg", "bin/audio/Collision2.m4a", "bin/audio/Collision2.ogg", "bin/audio/Driveby1.m4a", "bin/audio/Driveby1.ogg", "bin/audio/Driveby2.m4a", "bin/audio/Driveby2.ogg", "bin/audio/Driveby3.m4a", "bin/audio/Driveby3.ogg", "bin/audio/Driveby4.m4a", "bin/audio/Driveby4.ogg", "bin/audio/Engines.m4a", "bin/audio/Engines.ogg", "bin/audio/MusicGame.m4a", "bin/audio/MusicGame.ogg", "bin/audio/MusicLose.m4a", "bin/audio/MusicLose.ogg", "bin/audio/MusicMenu.m4a", "bin/audio/MusicMenu.ogg", "bin/audio/MusicWin.m4a", "bin/audio/MusicWin.ogg", "bin/audio/Silence.m4a", "bin/audio/Silence.ogg", "bin/audio/Transition.m4a", "bin/audio/Transition.ogg", "bin/audio/Upgrade.m4a", "bin/audio/Upgrade.ogg", "bin/audio/VocalCheckpoint.m4a", "bin/audio/VocalCheckpoint.ogg", "bin/audio/VocalEasyLeft.m4a", "bin/audio/VocalEasyLeft.ogg", "bin/audio/VocalEasyRight.m4a", "bin/audio/VocalEasyRight.ogg", "bin/audio/VocalHardLeft.m4a", "bin/audio/VocalHardLeft.ogg", "bin/audio/VocalHardRight.m4a", "bin/audio/VocalHardRight.ogg", "bin/audio/VocalMediumLeft.m4a", "bin/audio/VocalMediumLeft.ogg", "bin/audio/VocalMediumRight.m4a", "bin/audio/VocalMediumRight.ogg", "bin/audio/VocalRankGood.m4a", "bin/audio/VocalRankGood.ogg", "bin/audio/VocalRankOk.m4a", "bin/audio/VocalRankOk.ogg", "bin/audio/VocalRankPoor.m4a", "bin/audio/VocalRankPoor.ogg", "bin/audio/VocalStart.m4a", "bin/audio/VocalStart.ogg", "bin/audio/VocalStraight.m4a", "bin/audio/VocalStraight.ogg", "bin/images/Blank.png", "bin/fonts/__Roboto-webfont.eot", "bin/fonts/__Roboto-webfont.svg", "bin/fonts/__Roboto-webfont.ttf", "bin/fonts/__Roboto-webfont.woff", "bin/images/Buttons.png", "bin/images/Hud.png", "bin/images/HudProgress.png", "bin/images/InstructionsA.png", "bin/images/InstructionsB.png", "bin/images/LocationPreview.png", "bin/images/LocationPreviewMask.png", "bin/images/Logo.png", "bin/images/LogoShine.png", "bin/images/PauseBg.png", "bin/images/SceneBg.png", "bin/images/SceneBgA.png", "bin/images/SceneBgB.png", "bin/images/SceneBgC.jpg", "bin/images/SceneFgHorizontal.png", "bin/images/SceneFgVertical.png", "bin/images/Title.png", "bin/images/Vignette.png", "bin/images/Cars.png", "bin/images/HorizonA.jpg", "bin/images/HorizonB.jpg", "bin/images/HorizonC.jpg", "bin/images/HorizonD.jpg", "bin/images/LensFlares.jpg", "bin/images/RoadsA.png", "bin/images/RoadsB.png", "bin/images/RoadsC.png", "bin/images/RoadsD.png", "bin/images/SceneryA.png", "bin/images/SceneryB.png", "bin/images/SceneryC.png", "bin/images/SceneryD.png", "bin/images/Streaks.png", "bin/images/Blank.png", "bin/images/__Config.xml",  "bin/images/__PreloaderBg.png", "bin/images/__PreloaderFg.png"], t = [], s = 0, i = e.length; s < i;) {
			e[r = s++] = HxOverrides.substr(e[r], 4, null), ("__" == HxOverrides.substr(e[r], 0, 2) || -1 < e[r].indexOf("/__")) && t.push(e[r])
		}
		for (s = 0; s < t.length;) {
			var r = t[s];
			++s, HxOverrides.remove(e, r)
		}
		return e
	},
	_driverDisposer: function() {
		null != this._context.parent && this._context.parent.removeChild(this._context)
	},
	preventDefaultForKeys: function(e) {
		this._kernel.inputs.keyboard.preventDefaultForKeys(e)
	},
	allowDefaultForKeys: function(e) {
		this._kernel.inputs.keyboard.allowDefaultForKeys(e)
	},
	__class__: awe6_core_drivers_createjs_Factory
});
var awe6_core_drivers_createjs_InputKeyboard = function(e) {
	awe6_core_drivers_AInputKeyboard.call(this, e)
};
$hxClasses["awe6.core.drivers.createjs.InputKeyboard"] = awe6_core_drivers_createjs_InputKeyboard, awe6_core_drivers_createjs_InputKeyboard.__name__ = "awe6.core.drivers.createjs.InputKeyboard", awe6_core_drivers_createjs_InputKeyboard.__super__ = awe6_core_drivers_AInputKeyboard, awe6_core_drivers_createjs_InputKeyboard.prototype = $extend(awe6_core_drivers_AInputKeyboard.prototype, {
	_driverInit: function() {
		this._document = window.document, this._preventDefaultKeyCodes = [], this._document.addEventListener("keydown", $bind(this, this._onKeyDown)), this._document.addEventListener("keyup", $bind(this, this._onKeyUp))
	},
	_disposer: function() {
		this._document.removeEventListener("keydown", $bind(this, this._onKeyDown)), this._document.removeEventListener("keyup", $bind(this, this._onKeyUp)), awe6_core_drivers_AInputKeyboard.prototype._disposer.call(this)
	},
	_onKeyDown: function(e) {
		this.isActive && (-1 != this._preventDefaultKeyCodes.indexOf(e.keyCode) && e.preventDefault(), this._addEvent(e.keyCode, !0))
	},
	_onKeyUp: function(e) {
		this.isActive && (-1 != this._preventDefaultKeyCodes.indexOf(e.keyCode) && e.preventDefault(), this._addEvent(e.keyCode, !1))
	},
	preventDefaultForKeys: function(e) {
		if (null != e)
			for (var t = 0; t < e.length;) {
				var s = e[t];
				++t;
				var i = this.getKeyCode(s);
				Lambda.has(this._preventDefaultKeyCodes, i) || this._preventDefaultKeyCodes.push(i)
			}
	},
	allowDefaultForKeys: function(e) {
		if (null != e)
			for (var t = 0; t < this._preventDefaultKeyCodes.length;) {
				var s = this.getKey(this._preventDefaultKeyCodes[t]);
				Lambda.has(e, s) ? this._preventDefaultKeyCodes.splice(t, 1) : ++t
			}
	},
	__class__: awe6_core_drivers_createjs_InputKeyboard
});
var awe6_core_drivers_createjs_InputMouse = function(e) {
	awe6_core_drivers_AInputMouse.call(this, e)
};
$hxClasses["awe6.core.drivers.createjs.InputMouse"] = awe6_core_drivers_createjs_InputMouse, awe6_core_drivers_createjs_InputMouse.__name__ = "awe6.core.drivers.createjs.InputMouse", awe6_core_drivers_createjs_InputMouse.__super__ = awe6_core_drivers_AInputMouse, awe6_core_drivers_createjs_InputMouse.prototype = $extend(awe6_core_drivers_AInputMouse.prototype, {
	_driverInit: function() {
		this._stage = this._kernel._stage, this._isTouch = createjs.Touch.isSupported() && !this._kernel.system.isDesktop, this._isTouch ? (createjs.Touch.enable(this._stage, !0), this._touchX = this._touchY = 0, this._stage.canvas.addEventListener("touchstart", $bind(this, this._onTouchStart)), this._stage.canvas.addEventListener("touchmove", $bind(this, this._onTouch)), this._stage.canvas.addEventListener("touchend", $bind(this, this._onTouchEnd))) : (this._stage.addEventListener("stagemousedown", $bind(this, this._onMouseDown)), this._stage.addEventListener("stagemouseup", $bind(this, this._onMouseUp))), window.focus()
	},
	_disposer: function() {
		this._isTouch ? (createjs.Touch.disable(this._stage), this._stage.canvas.removeEventListener("touchstart", $bind(this, this._onTouchStart)), this._stage.canvas.removeEventListener("touchmove", $bind(this, this._onTouch)), this._stage.canvas.removeEventListener("touchend", $bind(this, this._onTouchEnd))) : (this._stage.removeEventListener("stagemousedown", $bind(this, this._onMouseDown)), this._stage.removeEventListener("stagemouseup", $bind(this, this._onMouseUp))), awe6_core_drivers_AInputMouse.prototype._disposer.call(this)
	},
	_isWithinBounds: function() {
		return this._stage.mouseInBounds
	},
	_getPosition: function() {
		var e, t;
		this._isTouch ? (this.x = this._touchX, this.y = this._touchY) : (e = this._stage.mouseX / this._stage.scaleX, t = this._kernel.factory.width, this.x = 0 | (t < e ? t : e < 0 ? 0 : e), e = this._stage.mouseY / this._stage.scaleY, t = this._kernel.factory.height, this.y = 0 | (t < e ? t : e < 0 ? 0 : e)), this.x = this.x == this._kernel.factory.width ? this._xPrev : this.x, this.y = this.y == this._kernel.factory.height ? this._yPrev : this.y
	},
	_onTouchStart: function(e) {
		this._onMouseDown(e), this._onTouch(e), this.x = this._touchX, this.y = this._touchY
	},
	_onTouchEnd: function(e) {
		this._onMouseUp(e), this._onTouch(e), awe6_core_drivers_createjs_InputMouse._isSoundTriggered || (this._kernel.audio.start("Silence"), awe6_core_drivers_createjs_InputMouse._isSoundTriggered = !0, this._kernel.isFullScreen && this._kernel.factory.isNativeExperience && (this._kernel.system.requestFullScreen(), this._kernel.system.requestLockScreen()))
	},
	_onTouch: function(e) {
		try {
			var t = (e.targetTouches[0].pageX - (0 | this._stage.canvas.offsetLeft)) / this._kernel._scaleX,
				s = this._kernel.factory.width;
			this._touchX = 0 | (s < t ? s : t < 0 ? 0 : t);
			t = (e.targetTouches[0].pageY - (0 | this._stage.canvas.offsetTop)) / this._kernel._scaleY, s = this._kernel.factory.height;
			this._touchY = 0 | (s < t ? s : t < 0 ? 0 : t)
		} catch (e) {}
		this._stage.mouseInBounds && e.preventDefault()
	},
	_onMouseDown: function(e) {
		window.focus(), this.isActive && (!this._isTouch && 2 == e.nativeEvent.button || this._buffer.push(!0))
	},
	_onMouseUp: function(e) {
		this.isActive && (!this._isTouch && 2 == e.nativeEvent.button || this._buffer.push(!1))
	},
	set_isVisible: function(e) {
		return this._stage.cursor = e ? "none" : "auto", awe6_core_drivers_AInputMouse.prototype.set_isVisible.call(this, e)
	},
	set_cursorType: function(e) {
		switch (e._hx_index) {
			case 0:
				t = "crosshair";
				break;
			case 1:
				t = "auto";
				break;
			case 2:
			case 3:
				t = "pointer";
				break;
			case 4:
				t = "text";
				break;
			case 5:
				var t = e.value
		}
		return this._stage.canvas.style.cursor = t, awe6_core_drivers_AInputMouse.prototype.set_cursorType.call(this, e)
	},
	__class__: awe6_core_drivers_createjs_InputMouse
});
var awe6_core_drivers_createjs_Kernel = function(e, t) {
	awe6_core_drivers_AKernel.call(this, e, t)
};
$hxClasses["awe6.core.drivers.createjs.Kernel"] = awe6_core_drivers_createjs_Kernel, awe6_core_drivers_createjs_Kernel.__name__ = "awe6.core.drivers.createjs.Kernel", awe6_core_drivers_createjs_Kernel.__super__ = awe6_core_drivers_AKernel, awe6_core_drivers_createjs_Kernel.prototype = $extend(awe6_core_drivers_AKernel.prototype, {
	_driverGetIsLocal: function() {
		var e;
		switch (window.location.protocol) {
			case "http:":
			case "https:":
				e = !1;
				break;
			default:
				e = !0
		}
		return e
	},
	_driverInit: function() {
		this.system = new awe6_core_drivers_createjs_System(this), this._scaleX = this._scaleY = 1, this._stage = this._stageDynamic = this._context.getStage(), this._stage.canvas.style.setProperty("-ms-touch-action", "none", ""), this._stage.canvas.style.setProperty("image-rendering", "-o-crisp-edges", ""), this._stage.canvas.style.setProperty("image-rendering", "optimize-contrast", ""), this._stage.canvas.style.setProperty("-ms-interpolation-mode", "nearest-neighbor", ""), this._stage.canvas.style.setProperty("-webkit-tap-highlight-color", "rgba(0,0,0,0)", ""), this._stage.canvas.style.setProperty("-moz-tap-highlight-color", "rgba(0,0,0,0)", ""), this._stage.canvas.style.setProperty("tap-highlight-color", "rgba(0,0,0,0)", ""), this._stage.canvas.style.setProperty("user-select", "none", ""), this._stage.canvas.style.setProperty("-webkit-touch-callout", "none", ""), this._stage.canvas.style.setProperty("-webkit-user-select", "none", ""), this._stage.canvas.style.setProperty("-moz-user-select", "none", ""), this._stage.canvas.style.setProperty("-ms-user-select", "none", ""), this._stage.tickOnUpdate = !1, this._stage.mouseEnabled = !1, this._stage.canvas.width = this.factory.width, this._stage.canvas.height = this.factory.height;
		var e = new createjs.Shape;
		e.graphics.beginFill("#" + HxOverrides.substr(StringTools.hex(this.factory.bgColor, 8), 2, 6)), e.graphics.drawRect(0, 0, this.factory.width, this.factory.height), e.graphics.endFill(), this._stage.addChildAt(e, 0), createjs.Ticker.setFPS(this.factory.targetFramerate), createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED, createjs.Ticker.addEventListener("tick", $bind(this, this._onEnterFrame)), this._stage.canvas.addEventListener("contextmenu", $bind(this, this._onContextMenu), !1), window.addEventListener("unload", $bind(this, this._onUnload))
	},
	_onUnload: function(e) {
		window.removeEventListener("unload", $bind(this, this._onUnload)), this.get_session().save()
	},
	_onContextMenu: function(e) {
		var t, s;
		e.preventDefault(), e.stopImmediatePropagation(), null != this.overlay && (t = $bind($_ = this.overlay, $_.activateButton), s = awe6_interfaces_EOverlayButton.PAUSE, haxe_Timer.delay(function() {
			t(s)
		}, 100))
	},
	_driverDisposer: function() {
		this._stage.canvas.removeEventListener("contextmenu", $bind(this, this._onContextMenu))
	},
	_onEnterFrame: function(e) {
		null != e.paused && 1 == e.paused ? this._stage.tickOnUpdate = !1 : (this._updates++, this._updater(0), this._stage.tickOnUpdate = this.isActive, this._stageDynamic.update(e));
		var t = Std.string(window.innerWidth) + ":" + Std.string(window.innerHeight);
		this._prevWindowSize != t && this._driverSetIsFullScreen(this.isFullScreen)
	},
	_driverSetIsEyeCandy: function(e) {},
	_driverSetIsFullScreen: function(e) {
		this._prevWindowSize = Std.string(window.innerWidth) + ":" + Std.string(window.innerHeight), this._scaleX = this._scaleY = 1;
		var t = this.factory.width,
			s = this.factory.height,
			i = window.innerWidth,
			r = window.innerHeight,
			n = t < s,
			_ = i < r;
		this.system.isRotated = !this.system.isDesktop && n != _;
		var a = 0,
			o = 0;
		if (e) {
			var c = Math.min(i / t, r / s),
				h = this.factory.fullScreenType;
			switch (h._hx_index) {
				case 0:
				case 1:
					break;
				case 2:
					this._scaleX = i / t, this._scaleY = r / s;
					break;
				case 3:
					this._scaleX = this._scaleY = c;
					break;
				case 4:
					c = c < .5 ? .25 : c < 1 ? .5 : Math.floor(c), this._scaleX = this._scaleY = c;
					break;
				case 5:
					var l, u, d, g = h.value;
					null != g.bleedWidth && null != g.bleedHeight && (l = t - 2 * Std.parseInt(Std.string(g.bleedWidth) + ""), u = s - 2 * Std.parseInt(Std.string(g.bleedHeight) + ""), d = Math.min(i / l, r / u), this._scaleX = this._scaleY = d)
			}
			a = Math.round((i - t * this._scaleX) / 2), o = Math.round((r - s * this._scaleY) / 2)
		}
		this._stage.canvas.style.setProperty("width", Math.round(t * this._scaleX) + "px", ""), this._stage.canvas.style.setProperty("height", Math.round(s * this._scaleY) + "px", ""), this._stage.canvas.style.setProperty("margin-left", a + "px", ""), this._stage.canvas.style.setProperty("margin-top", o + "px", "")
	},
	__class__: awe6_core_drivers_createjs_Kernel
});
var awe6_core_drivers_createjs_Overlay = function(e, t, s, i, r, n, _, a, o, c, h, l, u, d, g, p, w) {
	awe6_core_drivers_AOverlay.call(this, e, t, s, i, r, n, _, a, o, c, h, l, u, d, g, p, w)
};
$hxClasses["awe6.core.drivers.createjs.Overlay"] = awe6_core_drivers_createjs_Overlay, awe6_core_drivers_createjs_Overlay.__name__ = "awe6.core.drivers.createjs.Overlay", awe6_core_drivers_createjs_Overlay.__super__ = awe6_core_drivers_AOverlay, awe6_core_drivers_createjs_Overlay.prototype = $extend(awe6_core_drivers_AOverlay.prototype, {
	_driverInit: function() {
		js_Boot.__cast(this._borderView, awe6_core_drivers_createjs_View).context.mouseEnabled = !1, this._context.mouseEnabled = !1, this._pauseContext = new createjs.Container, this._pauseContext.mouseEnabled = !1;
		var e = new createjs.Shape;
		e.graphics.beginFill("#" + StringTools.hex(this._pauseColor, 6)), e.graphics.drawRect(0, 0, this._kernel.factory.width, this._kernel.factory.height), e.alpha = this._pauseAlpha, this._pauseContext.addChild(e), this._flashContext = new createjs.Container, this._flashContext.mouseEnabled = !1
	},
	_updater: function(e) {
		null == e && (e = 0), awe6_core_drivers_AOverlay.prototype._updater.call(this, e), this._flashContext.alpha = this._flashAlpha, this._flashContext.visible = 0 != this._flashAlpha
	},
	flash: function(e, t, s, i) {
		null == i && (i = 16777215), null == s && (s = 1), null == t && (t = !0), this._flashContext.removeAllChildren();
		var r = new createjs.Shape;
		r.graphics.beginFill("#" + StringTools.hex(i, 6)), r.graphics.drawRect(0, 0, this._kernel.factory.width, this._kernel.factory.height), this._flashContext.addChild(r), null == e && (e = t ? 500 : .5 * this._kernel.factory.targetFramerate), this._flashDuration = this._flashStartingDuration = e, this._flashAsTime = t, this._flashAlpha = this._flashStartingAlpha = 1 < s ? 1 : s < 0 ? 0 : s
	},
	__class__: awe6_core_drivers_createjs_Overlay
});
var awe6_core_drivers_createjs_Preloader = function(e, t, s) {
	awe6_core_drivers_APreloader.call(this, e, t, s)
};
$hxClasses["awe6.core.drivers.createjs.Preloader"] = awe6_core_drivers_createjs_Preloader, awe6_core_drivers_createjs_Preloader.__name__ = "awe6.core.drivers.createjs.Preloader", awe6_core_drivers_createjs_Preloader.__super__ = awe6_core_drivers_APreloader, awe6_core_drivers_createjs_Preloader.prototype = $extend(awe6_core_drivers_APreloader.prototype, {
	_init: function() {
		this._context = new createjs.Container, this.view = new awe6_core_drivers_createjs_View(this._kernel, this._context), awe6_core_drivers_APreloader.prototype._init.call(this), this._system = this._kernel.system, this._isDesktop = this._system.isDesktop, this._audioHoldDelay = 0, this._completedDelay = 0;
		var e = this._isDecached ? "?dc=" + Std.random(999999) : "",
			t = ["mp3", "ogg", "mpeg", "wav", "m4a", "mp4", "aiff", "wma", "mid"];
		null != this._proprietaryAudioFormat && "" != this._proprietaryAudioFormat && Lambda.has(t, this._proprietaryAudioFormat) || (this._proprietaryAudioFormat = "mp3");
		var s = [];
		if (this._manifest = [], createjs.Sound.initializeDefaultPlugins()) {
			this._audioHoldDelay = this._getAudioHoldDelay();
			var i = this._isSoundDisabled || this._system.isAndroid && this._getIsStockAndroidBrowser();
			this._validSoundFormat = createjs.Sound.getCapability("ogg") ? "ogg" : createjs.Sound.getCapability(this._proprietaryAudioFormat) ? this._proprietaryAudioFormat : "noValidFormat", this._activePlugin = createjs.Sound.activePlugin;
			for (var r = 0, n = this._assets; r < n.length;) {
				var _ = n[r];
				++r;
				var a, o = HxOverrides.substr(_, -3, null);
				Lambda.has(t, o) && (s.push(_), i || o != this._validSoundFormat || (a = "assets.audio." + HxOverrides.substr(_.split("/").pop(), 0, -4), this._isFastTestMode || this._manifest.push({
					src: _ + e,
					id: a
				})))
			}
		}
		for (r = 0; r < s.length;) {
			_ = s[r];
			++r, HxOverrides.remove(this._assets, _)
		}
		for (r = 0, n = this._assets; r < n.length;) {
			_ = n[r];
			++r, this._manifest.push({
				src: _ + e,
				id: _
			})
		}
		this._loadQueue = new createjs.LoadQueue(!this._kernel.isLocal && !this._isFastTestMode, ""), this._loadQueue.setMaxConnections(10), this._loadQueue.installPlugin(createjs.Sound), this._manifest = this._tools.shuffle(this._manifest), this._loadQueue.addEventListener("complete", $bind(this, this._onComplete)), this._loadQueue.addEventListener("fileerror", $bind(this, this._onError)), this._loadQueue.addEventListener("error", $bind(this, this._onError));
		var r = $bind($_ = this._loadQueue, $_.loadManifest),
			c = this._manifest;
		haxe_Timer.delay(function() {
			r(c)
		}, 200)
	},
	_next: function() {},
	get_progress: function() {
		return this._loadQueue.progress
	},
	_onComplete: function(e) {
		this._isComplete || (this._isComplete = !0, awe6_core_drivers_createjs_AssetManager.loadQueue = this._loadQueue, this._completedDelay = this._audioHoldDelay, this._loadQueue.removeEventListener("complete", $bind(this, this._onComplete)), this._loadQueue.removeEventListener("fileerror", $bind(this, this._onError)), this._loadQueue.removeEventListener("error", $bind(this, this._onError)), 0 != this._audioHoldDelay && this._showAudioHoldMessage())
	},
	_onError: function(e) {
		haxe_Log.trace([e, e.title, e.message, e.data], {
			fileName: "awe6/core/drivers/createjs/Preloader.hx",
			lineNumber: 148,
			className: "awe6.core.drivers.createjs.Preloader",
			methodName: "_onError"
		})
	},
	_showAudioHoldMessage: function() {},
	_updater: function(e) {
		null == e && (e = 0), awe6_core_drivers_APreloader.prototype._updater.call(this, e), this._isComplete && (this._completedDelay -= e, (0 <= this._audioHoldDelay && this._completedDelay <= 0 || this._kernel.inputs.keyboard.getIsKeyRelease(this._kernel.factory.keyNext) || this._kernel.inputs.mouse.getIsButtonRelease()) && (this._assets = []))
	},
	_getIsStockAndroidBrowser: function() {
		var e = -1 < this._system.userAgent.indexOf("Android") && -1 < this._system.userAgent.indexOf("Mozilla/5.0") && -1 < this._system.userAgent.indexOf("AppleWebKit"),
			t = new EReg("AppleWebKit/([\\d.]+)", ""),
			s = t.match(this._system.userAgent),
			i = s ? parseFloat(t.matched(1)) : 0,
			r = new EReg("Chrome/([\\d.]+)", ""),
			n = r.match(this._system.userAgent),
			_ = n ? parseFloat(r.matched(1)) : 0;
		return e && (!!(s && i < 537) || !!n && _ < 37)
	},
	_getAudioHoldDelay: function() {
		if (this._isSoundDisabled) return 0;
		try {
			if ("[WebAudioPlugin]" != createjs.Sound.activePlugin || "suspended" != createjs.Sound.activePlugin.context.state) return 0
		} catch (e) {}
		var e = -1;
		Object.prototype.hasOwnProperty.call(this._kernel.factory.config.h, "settings.audioHoldDelay") && (e = Std.parseInt(this._kernel.factory.config.h["settings.audioHoldDelay"]));
		try {
			var t = this._kernel.factory._context.getStage().canvas.getAttribute("audioHoldDelay");
			null != t && "" != t && (e = Std.parseInt(t))
		} catch (e) {}
		return e
	},
	__class__: awe6_core_drivers_createjs_Preloader
});
var awe6_core_drivers_createjs_Profiler = function(e) {
	awe6_core_drivers_AProfiler.call(this, e)
};
$hxClasses["awe6.core.drivers.createjs.Profiler"] = awe6_core_drivers_createjs_Profiler, awe6_core_drivers_createjs_Profiler.__name__ = "awe6.core.drivers.createjs.Profiler", awe6_core_drivers_createjs_Profiler.__super__ = awe6_core_drivers_AProfiler, awe6_core_drivers_createjs_Profiler.prototype = $extend(awe6_core_drivers_AProfiler.prototype, {
	_init: function() {
		awe6_core_drivers_AProfiler.prototype._init.call(this), this._isMemoryEnabled = null != window.performance && null != window.performance.memory, this._width = 75, this._height = 24, this._marginHeight = 12;
		var e = new createjs.Shape;
		this._context.addChild(e), e.alpha = .25, this._isMemoryEnabled && (e.graphics.beginFill("#" + StringTools.hex(this._backgroundColor, 6)), e.graphics.drawRect(0, 0, this._width, this._height), e.graphics.endFill()), e.graphics.beginFill("#" + StringTools.hex(this._marginColor, 6)), e.graphics.drawRect(0, 0, this._width, this._marginHeight), e.graphics.endFill(), e.cache(0, 0, this._width, this._height), this._fpsTextField = new createjs.Text("", "", "#" + StringTools.hex(this._fpsColor, 6)), this._context.addChild(this._fpsTextField), this._isMemoryEnabled && (this._memoryTextField = new createjs.Text("", "", "#" + StringTools.hex(this._memoryColor, 6)), this._memoryTextField.y = 12, this._context.addChild(this._memoryTextField))
	},
	_driverUpdate: function() {
		var e, t, s = 0 | this._kernel.getFramerate(!0);
		Math.min(this._height, this._height / this._kernel.factory.targetFramerate * s);
		this._fpsTextField.text = this._fpsLabel + ": " + s + " / " + this._kernel.factory.targetFramerate, this._isMemoryEnabled && this._updates % this._kernel.factory.targetFramerate == 0 && (e = Math.round(window.performance.memory.usedJSHeapSize / 1024 / 1024), t = Math.round(window.performance.memory.jsHeapSizeLimit / 1024 / 1024), this._memoryTextField.text = this._memoryLabel + ": " + e + " / " + t)
	},
	__class__: awe6_core_drivers_createjs_Profiler
});
var awe6_core_drivers_createjs_SceneTransition = function(e, t) {
	awe6_core_drivers_ASceneTransition.call(this, e, t)
};
$hxClasses["awe6.core.drivers.createjs.SceneTransition"] = awe6_core_drivers_createjs_SceneTransition, awe6_core_drivers_createjs_SceneTransition.__name__ = "awe6.core.drivers.createjs.SceneTransition", awe6_core_drivers_createjs_SceneTransition.__super__ = awe6_core_drivers_ASceneTransition, awe6_core_drivers_createjs_SceneTransition.prototype = $extend(awe6_core_drivers_ASceneTransition.prototype, {
	_init: function() {
		awe6_core_drivers_ASceneTransition.prototype._init.call(this), this._kernel.scenes.get_scene().get_view().context.cache(0, 0, this._kernel.factory.width, this._kernel.factory.height);
		var e = new createjs.Bitmap(this._kernel.scenes.get_scene().get_view().context.cacheCanvas);
		this._kernel.scenes.get_scene().get_view().context.uncache(), this._context.mouseEnabled = !1, this._context.addChild(e)
	},
	_updater: function(e) {
		var t;
		null == e && (e = 0), awe6_core_drivers_ASceneTransition.prototype._updater.call(this, e), this.isDisposed || (t = this.get_progress(), this._context.alpha = 1 - t)
	},
	__class__: awe6_core_drivers_createjs_SceneTransition
});
var awe6_core_drivers_createjs_Session = function(e, t) {
	awe6_core_drivers_ASession.call(this, e, t)
};
$hxClasses["awe6.core.drivers.createjs.Session"] = awe6_core_drivers_createjs_Session, awe6_core_drivers_createjs_Session.__name__ = "awe6.core.drivers.createjs.Session", awe6_core_drivers_createjs_Session.__super__ = awe6_core_drivers_ASession, awe6_core_drivers_createjs_Session.prototype = $extend(awe6_core_drivers_ASession.prototype, {
	_init: function() {
		var e = !0;
		null != this._kernel.getConfig("settings.sessionSaved") && (e = "false" != this._kernel.getConfig("settings.sessionSaved")), this._storage = e ? js_Browser.getLocalStorage() : js_Browser.getSessionStorage(), awe6_core_drivers_ASession.prototype._init.call(this)
	},
	_driverLoad: function() {
		if (this._savedData = {}, null != window.document.cookie && js_Cookie.exists(this._kernel.factory.id) && (this._savedData = this._tools.unserialize(js_Cookie.get(this._kernel.factory.id)), this._driverSave(), js_Cookie.remove(this._kernel.factory.id)), null != this._storage) try {
			var e = this._storage.getItem(this._kernel.factory.id);
			null != e && (this._savedData = this._tools.unserialize(e))
		} catch (e) {}
	},
	_driverReset: function() {
		if (null != this._storage) try {
			this._storage.removeItem(this._kernel.factory.id)
		} catch (e) {}
		this._savedData = {}
	},
	_driverSave: function() {
		if (null != this._storage) try {
			this._storage.setItem(this._kernel.factory.id, this._tools.serialize(this._savedData))
		} catch (e) {}
	},
	__class__: awe6_core_drivers_createjs_Session
});
var awe6_core_drivers_createjs_System = function(e) {
	this._kernel = e, this.isRotated = !1, this.isAndroid = this.isChromeOs = this.isIos = this.isLinux = this.isMacOs = this.isSilk = this.isWindows = this.isWindowsPhone = this.isDesktop = !1, this.userAgent = window.navigator.userAgent, this.isSilk = new EReg("Silk", "").match(this.userAgent), this.isKaiOs = new EReg("KAIOS", "").match(this.userAgent), this.isCrosswalk = new EReg("Crosswalk", "").match(this.userAgent), this.isCordova = null != window.cordova, new EReg("Android", "").match(this.userAgent) ? this.isAndroid = !0 : new EReg("CrOS", "").match(this.userAgent) ? this.isChromeOs = !0 : new EReg("iP[ao]d|iPhone", "i").match(this.userAgent) ? this.isIos = !0 : new EReg("Linux", "").match(this.userAgent) ? this.isLinux = !0 : new EReg("Mac OS", "").match(this.userAgent) ? this.isMacOs = !0 : new EReg("Windows", "").match(this.userAgent) && (this.isWindows = !0, new EReg("Windows Phone", "i").match(this.userAgent) && (this.isWindowsPhone = !0)), (this.isWindows || this.isMacOs || this.isLinux && !this.isSilk) && (this.isDesktop = !0), this.isWindowsPhone && (this.isDesktop = !1)
};
$hxClasses["awe6.core.drivers.createjs.System"] = awe6_core_drivers_createjs_System, awe6_core_drivers_createjs_System.__name__ = "awe6.core.drivers.createjs.System", awe6_core_drivers_createjs_System.prototype = {
	get_isWebGL: function() {
		return !1
	},
	get_isFullScreenSupported: function() {
		try {
			var e = window.document.documentElement;
			if (null != e.requestFullscreen) return !0;
			if (null != e.msRequestFullscreen) return !0;
			if (null != e.mozRequestFullScreen) return !0;
			if (null != e.webkitRequestFullscreen) return !0
		} catch (e) {}
		return !1
	},
	requestFullScreen: function() {
		/*try {
			var e = window.document.documentElement;
			null != e.requestFullscreen ? e.requestFullscreen() : null != e.msRequestFullscreen ? e.msRequestFullscreen() : null != e.mozRequestFullScreen ? e.mozRequestFullScreen() : null != e.webkitRequestFullscreen && e.webkitRequestFullscreen()
		} catch (e) {}*/
	},
	requestExitFullScreen: function() {
		/*try {
			var e = window.document;
			null != e.exitFullscreen ? e.exitFullscreen() : null != e.msExitFullscreen ? e.msExitFullscreen() : null != e.mozCancelFullScreen ? e.mozCancelFullScreen() : null != e.webkitExitFullscreen && e.webkitExitFullscreen()
		} catch (e) {}*/
	},
	requestLockScreen: function() {
		/*if (!this.isDesktop) try {
			var e = this._kernel.factory.width < this._kernel.factory.height ? "portrait-primary" : "landscape-primary",
				t = window.screen;
			null != t.orientation ? null != t.orientation.lock ? t.orientation.lock(e) : null != t.orientation.lockOrientation && t.orientation.lockOrientation(e) : null != t.mozOrientation ? t.mozLockOrientation(e) : null != t.msOrientation && t.msLockOrientation(e)
		} catch (e) {}*/
	},
	requestDeviceOrientation: function() {
		if (!this.isDesktop) try {
			null != window.DeviceMotionEvent && null != window.DeviceMotionEvent.requestPermission && window.DeviceMotionEvent.requestPermission()
		} catch (e) {}
	},
	__class__: awe6_core_drivers_createjs_System,
	__properties__: {
		get_isFullScreenSupported: "get_isFullScreenSupported",
		get_isWebGL: "get_isWebGL"
	}
};
var awe6_core_drivers_createjs_View = function(e, t, s, i) {
	awe6_core_drivers_AView.call(this, e, t, s, i)
};
$hxClasses["awe6.core.drivers.createjs.View"] = awe6_core_drivers_createjs_View, awe6_core_drivers_createjs_View.__name__ = "awe6.core.drivers.createjs.View", awe6_core_drivers_createjs_View.__super__ = awe6_core_drivers_AView, awe6_core_drivers_createjs_View.prototype = $extend(awe6_core_drivers_AView.prototype, {
	_init: function() {
		null == this.context && (this.context = new createjs.Container), awe6_core_drivers_AView.prototype._init.call(this)
	},
	_driverDisposer: function() {
		if (null != this.context && null != this.context.parent) try {
			this.context.parent.removeChild(this.context)
		} catch (e) {}
	},
	_driverDraw: function() {
		null != this._container && null != this._container.parent && this._container.parent.removeChild(this._container), this._container = new createjs.Container, this._container.mouseEnabled = !1, this.context.addChild(this._container);
		for (var e = this._children, t = 0; t < e.length;) {
			var s = e[t];
			++t, s.isVisible && this._container.addChild(s.context)
		}
	},
	set_x: function(e) {
		return this.context.x = e, awe6_core_drivers_AView.prototype.set_x.call(this, e)
	},
	set_y: function(e) {
		return this.context.y = e, awe6_core_drivers_AView.prototype.set_y.call(this, e)
	},
	__class__: awe6_core_drivers_createjs_View
});
var awe6_core_drivers_createjs_extras_gui_GuiEntity = function(e, t, s, i) {
	var r;
	null == i && (i = !0), null == s && (s = 100), null == t && (t = 100), this.isFlippedX = !1, this.isFlippedY = !1, this.width = t, this.height = s, this._context = new createjs.Container, this.setPosition(0, 0), i && ((r = new createjs.Shape).graphics.beginFill("#FF0000"), r.graphics.drawRect(0, 0, this.width, this.height), r.graphics.endFill(), r.visible = !1, this._context.addChild(r), this._context.mask = r), awe6_core_Entity.call(this, e, null, this._context)
};
$hxClasses["awe6.core.drivers.createjs.extras.gui.GuiEntity"] = awe6_core_drivers_createjs_extras_gui_GuiEntity, awe6_core_drivers_createjs_extras_gui_GuiEntity.__name__ = "awe6.core.drivers.createjs.extras.gui.GuiEntity", awe6_core_drivers_createjs_extras_gui_GuiEntity.__interfaces__ = [awe6_interfaces_IPositionable], awe6_core_drivers_createjs_extras_gui_GuiEntity.__super__ = awe6_core_Entity, awe6_core_drivers_createjs_extras_gui_GuiEntity.prototype = $extend(awe6_core_Entity.prototype, {
	setPosition: function(e, t) {
		this.set_x(e), this.set_y(t)
	},
	set_x: function(e) {
		return this.x = e, this._context.x = this.x, this.x
	},
	set_y: function(e) {
		return this.y = e, this._context.y = this.y, this.y
	},
	__class__: awe6_core_drivers_createjs_extras_gui_GuiEntity,
	__properties__: $extend(awe6_core_Entity.prototype.__properties__, {
		set_y: "set_y",
		set_x: "set_x"
	})
});
var awe6_core_drivers_createjs_extras_gui_Text = function(e, t, s, i, r, n, _) {
	null == _ && (_ = !1), null == n && (n = !1), null == i && (i = ""), this.textStyle = r, this._isMultiline = n, this._isCached = _, awe6_core_drivers_createjs_extras_gui_GuiEntity.call(this, e, t, s, !1), this.set_text(i)
};
$hxClasses["awe6.core.drivers.createjs.extras.gui.Text"] = awe6_core_drivers_createjs_extras_gui_Text, awe6_core_drivers_createjs_extras_gui_Text.__name__ = "awe6.core.drivers.createjs.extras.gui.Text", awe6_core_drivers_createjs_extras_gui_Text.__super__ = awe6_core_drivers_createjs_extras_gui_GuiEntity, awe6_core_drivers_createjs_extras_gui_Text.prototype = $extend(awe6_core_drivers_createjs_extras_gui_GuiEntity.prototype, {
	_init: function() {
		awe6_core_drivers_createjs_extras_gui_GuiEntity.prototype._init.call(this), this._textField = new createjs.Text, this._textField.text = this.text, this._draw(), this._context.addChild(this._textField), this._isDirty = !1, this._prevTextStyle = this.textStyle.toString()
	},
	_updater: function(e) {
		null == e && (e = 0), awe6_core_drivers_createjs_extras_gui_GuiEntity.prototype._updater.call(this, e), this._isDirty = this._isDirty || this._prevTextStyle != this.textStyle.toString(), this._isDirty && this._draw(), this._prevTextStyle = this.textStyle.toString()
	},
	_draw: function() {
		if (this._textField.lineWidth = this.width, this._prevTextStyle != this.textStyle.toString()) {
			switch (this.textStyle.align._hx_index) {
				case 0:
				case 1:
					this._textField.textAlign = "left";
					break;
				case 2:
					this._textField.textAlign = "center", this._textField.x = .5 * this.width;
					break;
				case 3:
					this._textField.textAlign = "right", this._textField.x = this.width
			}
			var e, t, s = StringTools.hex(this.textStyle.color, 6);
			this._textField.color = "#" + s, this._textField.font = (this.textStyle.isBold ? "bold " : "") + (this.textStyle.isItalic ? "italic " : "") + this.textStyle.size + "px '" + this.textStyle.font + "'", this._textField.lineHeight = this.textStyle.spacingVertical, null != this.textStyle.filters && ((e = this._textField).shadow = null, t = this.textStyle.filters.slice(), null != this._textFieldOutline && null != this._textFieldOutline.parent && this._textFieldOutline.parent.removeChild(this._textFieldOutline), this._textFieldOutline = null, 2 != t.length && 6 != t.length || (this._textFieldOutline = this._textField.clone(), s = StringTools.hex(t.shift(), 6), this._textFieldOutline.color = "#" + s, s = t.shift(), this._textFieldOutline.outline = 2 * s, this._context.addChildAt(this._textFieldOutline, 0), e = this._textFieldOutline), 4 == t.length && (e.shadow = new createjs.Shadow("#" + StringTools.hex(t[0], 6), t[1], t[2], t[3])))
		}
		this._isCached && this._context.cache(0, 0, this.width, this.height), this._isDirty = !1
	},
	set_text: function(e) {
		return null == e && (e = ""), this.text == e || (this.text = e, this._textField.text = this.text, null != this._textFieldOutline && (this._textFieldOutline.text = this.text), this._isDirty = !0), this.text
	},
	__class__: awe6_core_drivers_createjs_extras_gui_Text,
	__properties__: $extend(awe6_core_drivers_createjs_extras_gui_GuiEntity.prototype.__properties__, {
		set_text: "set_text"
	})
});
var awe6_core_drivers_flash_View = function(e, t, s, i) {
	awe6_core_drivers_AView.call(this, e, t, s, i)
};
$hxClasses["awe6.core.drivers.flash.View"] = awe6_core_drivers_flash_View, awe6_core_drivers_flash_View.__name__ = "awe6.core.drivers.flash.View", awe6_core_drivers_flash_View.__super__ = awe6_core_drivers_AView, awe6_core_drivers_flash_View.prototype = $extend(awe6_core_drivers_AView.prototype, {
	_init: function() {
		null == this.context && (this.context = new createjs.Container), awe6_core_drivers_AView.prototype._init.call(this)
	},
	_driverDisposer: function() {
		null != this.context.parent && this.context.parent.removeChild(this.context)
	},
	_driverDraw: function() {
		null != this._container && null != this._container.parent && this._container.parent.removeChild(this._container), this._container = new createjs.Container, this._container.mouseEnabled = !1, this.context.addChild(this._container);
		for (var e = this._children, t = 0; t < e.length;) {
			var s = e[t];
			++t, s.isVisible && this._container.addChild(s.context)
		}
	},
	set_x: function(e) {
		return this.context.x = e, awe6_core_drivers_AView.prototype.set_x.call(this, e)
	},
	set_y: function(e) {
		return this.context.y = e, awe6_core_drivers_AView.prototype.set_y.call(this, e)
	},
	__class__: awe6_core_drivers_flash_View
});
var awe6_extras_Delay = function(e, t, s) {
	null == s && (s = 1e3), this._callbackFunction = t, this._duration = s, awe6_core_Entity.call(this, e)
};
$hxClasses["awe6.extras.Delay"] = awe6_extras_Delay, awe6_extras_Delay.__name__ = "awe6.extras.Delay", awe6_extras_Delay.__super__ = awe6_core_Entity, awe6_extras_Delay.prototype = $extend(awe6_core_Entity.prototype, {
	_updater: function(e) {
		null == e && (e = 0), awe6_core_Entity.prototype._updater.call(this, e), this._duration -= e, this._duration <= 0 && (null != this._callbackFunction && this._callbackFunction(), this.isDisposed || (this.isDisposed = !0, this.set_isActive(!1), this._disposer()))
	},
	__class__: awe6_extras_Delay
});
var awe6_extras_Easer = function(e, t, s, i, r, n, _, a, o, c, h) {
	null == c && (c = !1), null == o && (o = !1), null == a && (a = !1), null == s && (s = 1e3), null == t && (t = 0), this._delay = t, this._duration = s, this._object = i, this._field = r, this._originalValue = n, this._newValue = _, this._isRelative = a, this._isEaseIn = o, this._isEaseOut = c, this._callback = h, this._prevProgress = 0, awe6_core_Entity.call(this, e), this._updater()
};
$hxClasses["awe6.extras.Easer"] = awe6_extras_Easer, awe6_extras_Easer.__name__ = "awe6.extras.Easer", awe6_extras_Easer.__super__ = awe6_core_Entity, awe6_extras_Easer.prototype = $extend(awe6_core_Entity.prototype, {
	_updater: function(e) {
		null == e && (e = 0), awe6_core_Entity.prototype._updater.call(this, e);
		var t, s, i, r = (this._age - this._delay) / this._duration,
			n = 1 < r ? 1 : r < 0 ? 0 : r;
		this._isEaseIn && (n = 1 - Math.cos(.5 * n * Math.PI)), this._isEaseOut && (n = Math.sin(.5 * n * Math.PI)), .99999 <= n && (n = 1), this._isRelative ? (t = this._prevProgress, s = this._originalValue * (1 - t) + this._newValue * t, i = this._originalValue * (1 - n) + this._newValue * n - s, Reflect.setProperty(this._object, this._field, Reflect.getProperty(this._object, this._field) + i)) : Reflect.setProperty(this._object, this._field, this._originalValue * (1 - n) + this._newValue * n), 1 == (this._prevProgress = n) && (null != this._callback && this._callback(), this.isDisposed || (this.isDisposed = !0, this.set_isActive(!1), this._disposer()))
	},
	__class__: awe6_extras_Easer
});
var awe6_interfaces_EAgenda = $hxEnums["awe6.interfaces.EAgenda"] = {
		__ename__: "awe6.interfaces.EAgenda",
		__constructs__: ["ALWAYS", "BIRTH", "DEATH", "STANDARD", "ATTACK", "DEFEND", "SUB_TYPE"],
		ALWAYS: {
			_hx_index: 0,
			__enum__: "awe6.interfaces.EAgenda",
			toString: $estr
		},
		BIRTH: {
			_hx_index: 1,
			__enum__: "awe6.interfaces.EAgenda",
			toString: $estr
		},
		DEATH: {
			_hx_index: 2,
			__enum__: "awe6.interfaces.EAgenda",
			toString: $estr
		},
		STANDARD: {
			_hx_index: 3,
			__enum__: "awe6.interfaces.EAgenda",
			toString: $estr
		},
		ATTACK: {
			_hx_index: 4,
			__enum__: "awe6.interfaces.EAgenda",
			toString: $estr
		},
		DEFEND: {
			_hx_index: 5,
			__enum__: "awe6.interfaces.EAgenda",
			toString: $estr
		},
		SUB_TYPE: ($_ = function(e) {
			return {
				_hx_index: 6,
				value: e,
				__enum__: "awe6.interfaces.EAgenda",
				toString: $estr
			}
		}, $_.__params__ = ["value"], $_)
	},
	awe6_interfaces_EAudioChannel = $hxEnums["awe6.interfaces.EAudioChannel"] = {
		__ename__: "awe6.interfaces.EAudioChannel",
		__constructs__: ["DEFAULT", "EFFECTS", "INTERFACE", "MUSIC", "SUB_TYPE"],
		DEFAULT: {
			_hx_index: 0,
			__enum__: "awe6.interfaces.EAudioChannel",
			toString: $estr
		},
		EFFECTS: {
			_hx_index: 1,
			__enum__: "awe6.interfaces.EAudioChannel",
			toString: $estr
		},
		INTERFACE: {
			_hx_index: 2,
			__enum__: "awe6.interfaces.EAudioChannel",
			toString: $estr
		},
		MUSIC: {
			_hx_index: 3,
			__enum__: "awe6.interfaces.EAudioChannel",
			toString: $estr
		},
		SUB_TYPE: ($_ = function(e) {
			return {
				_hx_index: 4,
				value: e,
				__enum__: "awe6.interfaces.EAudioChannel",
				toString: $estr
			}
		}, $_.__params__ = ["value"], $_)
	},
	awe6_interfaces_EFullScreen = $hxEnums["awe6.interfaces.EFullScreen"] = {
		__ename__: "awe6.interfaces.EFullScreen",
		__constructs__: ["DISABLED", "NO_SCALE", "SCALE_ASPECT_RATIO_IGNORE", "SCALE_ASPECT_RATIO_PRESERVE", "SCALE_NEAREST_MULTIPLE", "SUB_TYPE"],
		DISABLED: {
			_hx_index: 0,
			__enum__: "awe6.interfaces.EFullScreen",
			toString: $estr
		},
		NO_SCALE: {
			_hx_index: 1,
			__enum__: "awe6.interfaces.EFullScreen",
			toString: $estr
		},
		SCALE_ASPECT_RATIO_IGNORE: {
			_hx_index: 2,
			__enum__: "awe6.interfaces.EFullScreen",
			toString: $estr
		},
		SCALE_ASPECT_RATIO_PRESERVE: {
			_hx_index: 3,
			__enum__: "awe6.interfaces.EFullScreen",
			toString: $estr
		},
		SCALE_NEAREST_MULTIPLE: {
			_hx_index: 4,
			__enum__: "awe6.interfaces.EFullScreen",
			toString: $estr
		},
		SUB_TYPE: ($_ = function(e) {
			return {
				_hx_index: 5,
				value: e,
				__enum__: "awe6.interfaces.EFullScreen",
				toString: $estr
			}
		}, $_.__params__ = ["value"], $_)
	},
	awe6_interfaces_EJoypadButton = $hxEnums["awe6.interfaces.EJoypadButton"] = {
		__ename__: "awe6.interfaces.EJoypadButton",
		__constructs__: ["FIRE", "UP", "RIGHT", "DOWN", "LEFT", "PRIMARY", "SECONDARY"],
		FIRE: {
			_hx_index: 0,
			__enum__: "awe6.interfaces.EJoypadButton",
			toString: $estr
		},
		UP: {
			_hx_index: 1,
			__enum__: "awe6.interfaces.EJoypadButton",
			toString: $estr
		},
		RIGHT: {
			_hx_index: 2,
			__enum__: "awe6.interfaces.EJoypadButton",
			toString: $estr
		},
		DOWN: {
			_hx_index: 3,
			__enum__: "awe6.interfaces.EJoypadButton",
			toString: $estr
		},
		LEFT: {
			_hx_index: 4,
			__enum__: "awe6.interfaces.EJoypadButton",
			toString: $estr
		},
		PRIMARY: {
			_hx_index: 5,
			__enum__: "awe6.interfaces.EJoypadButton",
			toString: $estr
		},
		SECONDARY: {
			_hx_index: 6,
			__enum__: "awe6.interfaces.EJoypadButton",
			toString: $estr
		}
	},
	awe6_interfaces_EJoypadTouch = $hxEnums["awe6.interfaces.EJoypadTouch"] = {
		__ename__: "awe6.interfaces.EJoypadTouch",
		__constructs__: ["DISABLED", "DPAD", "JOYSTICK", "SWIPE"],
		DISABLED: {
			_hx_index: 0,
			__enum__: "awe6.interfaces.EJoypadTouch",
			toString: $estr
		},
		DPAD: {
			_hx_index: 1,
			__enum__: "awe6.interfaces.EJoypadTouch",
			toString: $estr
		},
		JOYSTICK: ($_ = function(e) {
			return {
				_hx_index: 2,
				distance: e,
				__enum__: "awe6.interfaces.EJoypadTouch",
				toString: $estr
			}
		}, $_.__params__ = ["distance"], $_),
		SWIPE: ($_ = function(e) {
			return {
				_hx_index: 3,
				speed: e,
				__enum__: "awe6.interfaces.EJoypadTouch",
				toString: $estr
			}
		}, $_.__params__ = ["speed"], $_)
	},
	awe6_interfaces_EKey = $hxEnums["awe6.interfaces.EKey"] = {
		__ename__: "awe6.interfaces.EKey",
		__constructs__: ["NUM_LOCK", "CLEAR", "HELP", "ALT", "BACKSPACE", "CAPS_LOCK", "CONTROL", "DELETE", "DOWN", "END", "ENTER", "ESCAPE", "F1", "F10", "F11", "F12", "F13", "F14", "F15", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "HOME", "INSERT", "LEFT", "NUMPAD_0", "NUMPAD_1", "NUMPAD_2", "NUMPAD_3", "NUMPAD_4", "NUMPAD_5", "NUMPAD_6", "NUMPAD_7", "NUMPAD_8", "NUMPAD_9", "NUMPAD_ADD", "NUMPAD_DECIMAL", "NUMPAD_DIVIDE", "NUMPAD_ENTER", "NUMPAD_MULTIPLY", "NUMPAD_SUBTRACT", "PAGE_DOWN", "PAGE_UP", "RIGHT", "SHIFT", "SPACE", "TAB", "UP", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "NUMBER_0", "NUMBER_1", "NUMBER_2", "NUMBER_3", "NUMBER_4", "NUMBER_5", "NUMBER_6", "NUMBER_7", "NUMBER_8", "NUMBER_9", "COLON", "EQUALS", "HYPHEN", "SLASH", "TILDE", "SQUARELEFT", "SQUARERIGHT", "BACKSLASH", "APOSTROPHE", "TOPLEFT", "SUB_TYPE"],
		NUM_LOCK: {
			_hx_index: 0,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		CLEAR: {
			_hx_index: 1,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		HELP: {
			_hx_index: 2,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		ALT: {
			_hx_index: 3,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		BACKSPACE: {
			_hx_index: 4,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		CAPS_LOCK: {
			_hx_index: 5,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		CONTROL: {
			_hx_index: 6,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		DELETE: {
			_hx_index: 7,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		DOWN: {
			_hx_index: 8,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		END: {
			_hx_index: 9,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		ENTER: {
			_hx_index: 10,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		ESCAPE: {
			_hx_index: 11,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		F1: {
			_hx_index: 12,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		F10: {
			_hx_index: 13,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		F11: {
			_hx_index: 14,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		F12: {
			_hx_index: 15,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		F13: {
			_hx_index: 16,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		F14: {
			_hx_index: 17,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		F15: {
			_hx_index: 18,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		F2: {
			_hx_index: 19,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		F3: {
			_hx_index: 20,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		F4: {
			_hx_index: 21,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		F5: {
			_hx_index: 22,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		F6: {
			_hx_index: 23,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		F7: {
			_hx_index: 24,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		F8: {
			_hx_index: 25,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		F9: {
			_hx_index: 26,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		HOME: {
			_hx_index: 27,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		INSERT: {
			_hx_index: 28,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		LEFT: {
			_hx_index: 29,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		NUMPAD_0: {
			_hx_index: 30,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		NUMPAD_1: {
			_hx_index: 31,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		NUMPAD_2: {
			_hx_index: 32,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		NUMPAD_3: {
			_hx_index: 33,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		NUMPAD_4: {
			_hx_index: 34,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		NUMPAD_5: {
			_hx_index: 35,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		NUMPAD_6: {
			_hx_index: 36,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		NUMPAD_7: {
			_hx_index: 37,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		NUMPAD_8: {
			_hx_index: 38,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		NUMPAD_9: {
			_hx_index: 39,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		NUMPAD_ADD: {
			_hx_index: 40,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		NUMPAD_DECIMAL: {
			_hx_index: 41,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		NUMPAD_DIVIDE: {
			_hx_index: 42,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		NUMPAD_ENTER: {
			_hx_index: 43,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		NUMPAD_MULTIPLY: {
			_hx_index: 44,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		NUMPAD_SUBTRACT: {
			_hx_index: 45,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		PAGE_DOWN: {
			_hx_index: 46,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		PAGE_UP: {
			_hx_index: 47,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		RIGHT: {
			_hx_index: 48,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		SHIFT: {
			_hx_index: 49,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		SPACE: {
			_hx_index: 50,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		TAB: {
			_hx_index: 51,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		UP: {
			_hx_index: 52,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		A: {
			_hx_index: 53,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		B: {
			_hx_index: 54,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		C: {
			_hx_index: 55,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		D: {
			_hx_index: 56,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		E: {
			_hx_index: 57,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		F: {
			_hx_index: 58,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		G: {
			_hx_index: 59,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		H: {
			_hx_index: 60,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		I: {
			_hx_index: 61,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		J: {
			_hx_index: 62,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		K: {
			_hx_index: 63,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		L: {
			_hx_index: 64,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		M: {
			_hx_index: 65,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		N: {
			_hx_index: 66,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		O: {
			_hx_index: 67,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		P: {
			_hx_index: 68,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		Q: {
			_hx_index: 69,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		R: {
			_hx_index: 70,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		S: {
			_hx_index: 71,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		T: {
			_hx_index: 72,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		U: {
			_hx_index: 73,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		V: {
			_hx_index: 74,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		W: {
			_hx_index: 75,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		X: {
			_hx_index: 76,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		Y: {
			_hx_index: 77,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		Z: {
			_hx_index: 78,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		NUMBER_0: {
			_hx_index: 79,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		NUMBER_1: {
			_hx_index: 80,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		NUMBER_2: {
			_hx_index: 81,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		NUMBER_3: {
			_hx_index: 82,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		NUMBER_4: {
			_hx_index: 83,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		NUMBER_5: {
			_hx_index: 84,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		NUMBER_6: {
			_hx_index: 85,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		NUMBER_7: {
			_hx_index: 86,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		NUMBER_8: {
			_hx_index: 87,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		NUMBER_9: {
			_hx_index: 88,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		COLON: {
			_hx_index: 89,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		EQUALS: {
			_hx_index: 90,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		HYPHEN: {
			_hx_index: 91,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		SLASH: {
			_hx_index: 92,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		TILDE: {
			_hx_index: 93,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		SQUARELEFT: {
			_hx_index: 94,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		SQUARERIGHT: {
			_hx_index: 95,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		BACKSLASH: {
			_hx_index: 96,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		APOSTROPHE: {
			_hx_index: 97,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		TOPLEFT: {
			_hx_index: 98,
			__enum__: "awe6.interfaces.EKey",
			toString: $estr
		},
		SUB_TYPE: ($_ = function(e) {
			return {
				_hx_index: 99,
				value: e,
				__enum__: "awe6.interfaces.EKey",
				toString: $estr
			}
		}, $_.__params__ = ["value"], $_)
	},
	awe6_interfaces_EMessage = $hxEnums["awe6.interfaces.EMessage"] = {
		__ename__: "awe6.interfaces.EMessage",
		__constructs__: ["DISPOSE", "INIT", "PAUSE", "RESUME", "SUB_TYPE"],
		DISPOSE: {
			_hx_index: 0,
			__enum__: "awe6.interfaces.EMessage",
			toString: $estr
		},
		INIT: {
			_hx_index: 1,
			__enum__: "awe6.interfaces.EMessage",
			toString: $estr
		},
		PAUSE: {
			_hx_index: 2,
			__enum__: "awe6.interfaces.EMessage",
			toString: $estr
		},
		RESUME: {
			_hx_index: 3,
			__enum__: "awe6.interfaces.EMessage",
			toString: $estr
		},
		SUB_TYPE: ($_ = function(e) {
			return {
				_hx_index: 4,
				value: e,
				__enum__: "awe6.interfaces.EMessage",
				toString: $estr
			}
		}, $_.__params__ = ["value"], $_)
	},
	awe6_interfaces_EMouseButton = $hxEnums["awe6.interfaces.EMouseButton"] = {
		__ename__: "awe6.interfaces.EMouseButton",
		__constructs__: ["LEFT", "MIDDLE", "RIGHT"],
		LEFT: {
			_hx_index: 0,
			__enum__: "awe6.interfaces.EMouseButton",
			toString: $estr
		},
		MIDDLE: {
			_hx_index: 1,
			__enum__: "awe6.interfaces.EMouseButton",
			toString: $estr
		},
		RIGHT: {
			_hx_index: 2,
			__enum__: "awe6.interfaces.EMouseButton",
			toString: $estr
		}
	},
	awe6_interfaces_EMouseCursor = $hxEnums["awe6.interfaces.EMouseCursor"] = {
		__ename__: "awe6.interfaces.EMouseCursor",
		__constructs__: ["ARROW", "AUTO", "BUTTON", "HAND", "IBEAM", "SUB_TYPE"],
		ARROW: {
			_hx_index: 0,
			__enum__: "awe6.interfaces.EMouseCursor",
			toString: $estr
		},
		AUTO: {
			_hx_index: 1,
			__enum__: "awe6.interfaces.EMouseCursor",
			toString: $estr
		},
		BUTTON: {
			_hx_index: 2,
			__enum__: "awe6.interfaces.EMouseCursor",
			toString: $estr
		},
		HAND: {
			_hx_index: 3,
			__enum__: "awe6.interfaces.EMouseCursor",
			toString: $estr
		},
		IBEAM: {
			_hx_index: 4,
			__enum__: "awe6.interfaces.EMouseCursor",
			toString: $estr
		},
		SUB_TYPE: ($_ = function(e) {
			return {
				_hx_index: 5,
				value: e,
				__enum__: "awe6.interfaces.EMouseCursor",
				toString: $estr
			}
		}, $_.__params__ = ["value"], $_)
	},
	awe6_interfaces_EOverlayButton = $hxEnums["awe6.interfaces.EOverlayButton"] = {
		__ename__: "awe6.interfaces.EOverlayButton",
		__constructs__: ["BACK", "MUTE", "UNMUTE", "PAUSE", "UNPAUSE", "SUB_TYPE"],
		BACK: {
			_hx_index: 0,
			__enum__: "awe6.interfaces.EOverlayButton",
			toString: $estr
		},
		MUTE: {
			_hx_index: 1,
			__enum__: "awe6.interfaces.EOverlayButton",
			toString: $estr
		},
		UNMUTE: {
			_hx_index: 2,
			__enum__: "awe6.interfaces.EOverlayButton",
			toString: $estr
		},
		PAUSE: {
			_hx_index: 3,
			__enum__: "awe6.interfaces.EOverlayButton",
			toString: $estr
		},
		UNPAUSE: {
			_hx_index: 4,
			__enum__: "awe6.interfaces.EOverlayButton",
			toString: $estr
		},
		SUB_TYPE: ($_ = function(e) {
			return {
				_hx_index: 5,
				value: e,
				__enum__: "awe6.interfaces.EOverlayButton",
				toString: $estr
			}
		}, $_.__params__ = ["value"], $_)
	},
	awe6_interfaces_EScene = $hxEnums["awe6.interfaces.EScene"] = {
		__ename__: "awe6.interfaces.EScene",
		__constructs__: ["SPLASH", "INTRO", "SELECT_SESSION", "SELECT_STORY", "SELECT_LEVEL", "INSTRUCTIONS", "SETTINGS", "MENU", "AVATAR", "SHOP", "REWARDS", "LEADERBOARD", "GAME", "INTERSTITIAL", "CINEMATIC", "RESULTS", "EXIT", "TEST", "SUB_TYPE"],
		SPLASH: {
			_hx_index: 0,
			__enum__: "awe6.interfaces.EScene",
			toString: $estr
		},
		INTRO: {
			_hx_index: 1,
			__enum__: "awe6.interfaces.EScene",
			toString: $estr
		},
		SELECT_SESSION: {
			_hx_index: 2,
			__enum__: "awe6.interfaces.EScene",
			toString: $estr
		},
		SELECT_STORY: {
			_hx_index: 3,
			__enum__: "awe6.interfaces.EScene",
			toString: $estr
		},
		SELECT_LEVEL: {
			_hx_index: 4,
			__enum__: "awe6.interfaces.EScene",
			toString: $estr
		},
		INSTRUCTIONS: {
			_hx_index: 5,
			__enum__: "awe6.interfaces.EScene",
			toString: $estr
		},
		SETTINGS: {
			_hx_index: 6,
			__enum__: "awe6.interfaces.EScene",
			toString: $estr
		},
		MENU: {
			_hx_index: 7,
			__enum__: "awe6.interfaces.EScene",
			toString: $estr
		},
		AVATAR: {
			_hx_index: 8,
			__enum__: "awe6.interfaces.EScene",
			toString: $estr
		},
		SHOP: {
			_hx_index: 9,
			__enum__: "awe6.interfaces.EScene",
			toString: $estr
		},
		REWARDS: {
			_hx_index: 10,
			__enum__: "awe6.interfaces.EScene",
			toString: $estr
		},
		LEADERBOARD: {
			_hx_index: 11,
			__enum__: "awe6.interfaces.EScene",
			toString: $estr
		},
		GAME: {
			_hx_index: 12,
			__enum__: "awe6.interfaces.EScene",
			toString: $estr
		},
		INTERSTITIAL: {
			_hx_index: 13,
			__enum__: "awe6.interfaces.EScene",
			toString: $estr
		},
		CINEMATIC: {
			_hx_index: 14,
			__enum__: "awe6.interfaces.EScene",
			toString: $estr
		},
		RESULTS: {
			_hx_index: 15,
			__enum__: "awe6.interfaces.EScene",
			toString: $estr
		},
		EXIT: {
			_hx_index: 16,
			__enum__: "awe6.interfaces.EScene",
			toString: $estr
		},
		TEST: {
			_hx_index: 17,
			__enum__: "awe6.interfaces.EScene",
			toString: $estr
		},
		SUB_TYPE: ($_ = function(e) {
			return {
				_hx_index: 18,
				value: e,
				__enum__: "awe6.interfaces.EScene",
				toString: $estr
			}
		}, $_.__params__ = ["value"], $_)
	},
	awe6_interfaces_ETextAlign = $hxEnums["awe6.interfaces.ETextAlign"] = {
		__ename__: "awe6.interfaces.ETextAlign",
		__constructs__: ["JUSTIFY", "LEFT", "CENTER", "RIGHT"],
		JUSTIFY: {
			_hx_index: 0,
			__enum__: "awe6.interfaces.ETextAlign",
			toString: $estr
		},
		LEFT: {
			_hx_index: 1,
			__enum__: "awe6.interfaces.ETextAlign",
			toString: $estr
		},
		CENTER: {
			_hx_index: 2,
			__enum__: "awe6.interfaces.ETextAlign",
			toString: $estr
		},
		RIGHT: {
			_hx_index: 3,
			__enum__: "awe6.interfaces.ETextAlign",
			toString: $estr
		}
	},
	awe6_interfaces_ETextStyle = $hxEnums["awe6.interfaces.ETextStyle"] = {
		__ename__: "awe6.interfaces.ETextStyle",
		__constructs__: ["BUTTON", "BODY", "HEADLINE", "SUBHEAD", "SMALLPRINT", "OVERSIZED", "SUB_TYPE"],
		BUTTON: {
			_hx_index: 0,
			__enum__: "awe6.interfaces.ETextStyle",
			toString: $estr
		},
		BODY: {
			_hx_index: 1,
			__enum__: "awe6.interfaces.ETextStyle",
			toString: $estr
		},
		HEADLINE: {
			_hx_index: 2,
			__enum__: "awe6.interfaces.ETextStyle",
			toString: $estr
		},
		SUBHEAD: {
			_hx_index: 3,
			__enum__: "awe6.interfaces.ETextStyle",
			toString: $estr
		},
		SMALLPRINT: {
			_hx_index: 4,
			__enum__: "awe6.interfaces.ETextStyle",
			toString: $estr
		},
		OVERSIZED: {
			_hx_index: 5,
			__enum__: "awe6.interfaces.ETextStyle",
			toString: $estr
		},
		SUB_TYPE: ($_ = function(e) {
			return {
				_hx_index: 6,
				value: e,
				__enum__: "awe6.interfaces.ETextStyle",
				toString: $estr
			}
		}, $_.__params__ = ["value"], $_)
	},
	rch_AEntity = function(e) {
		this._context = new createjs.Container, this._session = e.get_session(), this._assets = e.assets, this._factory = e.factory, this._system = e.system, this._context.mouseChildren = !1, this._context.mouseEnabled = !1, awe6_core_Entity.call(this, e, null, this._context)
	};
$hxClasses["rch.AEntity"] = rch_AEntity, rch_AEntity.__name__ = "rch.AEntity", rch_AEntity.__super__ = awe6_core_Entity, rch_AEntity.prototype = $extend(awe6_core_Entity.prototype, {
	__class__: rch_AEntity
});
var rch_AVo = function(e) {
	this._kernel = e, this._tools = this._kernel.tools, this._session = this._kernel.get_session(), this._assets = this._kernel.assets, this._factory = e.factory
};
$hxClasses["rch.AVo"] = rch_AVo, rch_AVo.__name__ = "rch.AVo", rch_AVo.prototype = {
	__class__: rch_AVo
};
var rch_AssetManager = function(e) {
	awe6_core_drivers_createjs_AssetManager.call(this, e)
};
$hxClasses["rch.AssetManager"] = rch_AssetManager, rch_AssetManager.__name__ = "rch.AssetManager", rch_AssetManager.__super__ = awe6_core_drivers_createjs_AssetManager, rch_AssetManager.prototype = $extend(awe6_core_drivers_createjs_AssetManager.prototype, {
	_init: function() {
		awe6_core_drivers_createjs_AssetManager.prototype._init.call(this), this._factory = this._kernel.factory, this.overlayPauseUp = this._createView(rch_EAsset.OVERLAY_PAUSE_UP), this.overlayPauseOver = this._createView(rch_EAsset.OVERLAY_PAUSE_OVER)
	},
	get_buttonOver: function() {
		return this._createView(rch_EAsset.BUTTON_OVER)
	},
	get_buttonUp: function() {
		return this._createView(rch_EAsset.BUTTON_UP)
	},
	get_buttonTwitterOver: function() {
		return this._createView(rch_EAsset.BUTTON_TWITTER_OVER)
	},
	get_buttonTwitterUp: function() {
		return this._createView(rch_EAsset.BUTTON_TWITTER_UP)
	},
	get_buttonFacebookOver: function() {
		return this._createView(rch_EAsset.BUTTON_FACEBOOK_OVER)
	},
	get_buttonFacebookUp: function() {
		return this._createView(rch_EAsset.BUTTON_FACEBOOK_UP)
	},
	get_buttonSmallOver: function() {
		return this._createView(rch_EAsset.BUTTON_SMALL_OVER)
	},
	get_buttonSmallUp: function() {
		return this._createView(rch_EAsset.BUTTON_SMALL_UP)
	},
	_createView: function(e) {
		var t, s = new createjs.Container,
			i = new createjs.Bitmap(this.getAsset("images/Buttons.png"));
		switch (e._hx_index) {
			case 0:
				t = new createjs.Rectangle(0, 0, 200, 65);
				break;
			case 1:
				t = new createjs.Rectangle(200, 0, 200, 65);
				break;
			case 2:
				t = new createjs.Rectangle(400, 65, 100, 30);
				break;
			case 3:
				t = new createjs.Rectangle(400, 95, 100, 30);
				break;
			case 4:
				t = new createjs.Rectangle(0, 65, 65, 65);
				break;
			case 5:
				t = new createjs.Rectangle(65, 65, 65, 65);
				break;
			case 6:
				t = new createjs.Rectangle(130, 65, 65, 65);
				break;
			case 7:
				t = new createjs.Rectangle(195, 65, 65, 65);
				break;
			case 8:
				t = new createjs.Rectangle(400, 0, 50, 50);
				break;
			case 9:
				t = new createjs.Rectangle(450, 0, 50, 50)
		}
		return i.sourceRect = t, i.cache(0, 0, i.sourceRect.width, i.sourceRect.height), s.addChild(i), new awe6_core_drivers_createjs_View(this._kernel, s)
	},
	__class__: rch_AssetManager,
	__properties__: $extend(awe6_core_drivers_createjs_AssetManager.prototype.__properties__, {
		get_buttonFacebookUp: "get_buttonFacebookUp",
		get_buttonFacebookOver: "get_buttonFacebookOver",
		get_buttonTwitterUp: "get_buttonTwitterUp",
		get_buttonTwitterOver: "get_buttonTwitterOver",
		get_buttonSmallUp: "get_buttonSmallUp",
		get_buttonSmallOver: "get_buttonSmallOver",
		get_buttonUp: "get_buttonUp",
		get_buttonOver: "get_buttonOver"
	})
});
var rch_EAsset = $hxEnums["rch.EAsset"] = {
		__ename__: "rch.EAsset",
		__constructs__: ["BUTTON_UP", "BUTTON_OVER", "BUTTON_SMALL_UP", "BUTTON_SMALL_OVER", "BUTTON_TWITTER_UP", "BUTTON_TWITTER_OVER", "BUTTON_FACEBOOK_UP", "BUTTON_FACEBOOK_OVER", "OVERLAY_PAUSE_UP", "OVERLAY_PAUSE_OVER"],
		BUTTON_UP: {
			_hx_index: 0,
			__enum__: "rch.EAsset",
			toString: $estr
		},
		BUTTON_OVER: {
			_hx_index: 1,
			__enum__: "rch.EAsset",
			toString: $estr
		},
		BUTTON_SMALL_UP: {
			_hx_index: 2,
			__enum__: "rch.EAsset",
			toString: $estr
		},
		BUTTON_SMALL_OVER: {
			_hx_index: 3,
			__enum__: "rch.EAsset",
			toString: $estr
		},
		BUTTON_TWITTER_UP: {
			_hx_index: 4,
			__enum__: "rch.EAsset",
			toString: $estr
		},
		BUTTON_TWITTER_OVER: {
			_hx_index: 5,
			__enum__: "rch.EAsset",
			toString: $estr
		},
		BUTTON_FACEBOOK_UP: {
			_hx_index: 6,
			__enum__: "rch.EAsset",
			toString: $estr
		},
		BUTTON_FACEBOOK_OVER: {
			_hx_index: 7,
			__enum__: "rch.EAsset",
			toString: $estr
		},
		OVERLAY_PAUSE_UP: {
			_hx_index: 8,
			__enum__: "rch.EAsset",
			toString: $estr
		},
		OVERLAY_PAUSE_OVER: {
			_hx_index: 9,
			__enum__: "rch.EAsset",
			toString: $estr
		}
	},
	rch_Factory = function(e, t, s) {
		this.COLOR_GREY = 5789784, this.COLOR_WHITE = 16777215, this.TEXTSTYLE_HUD_COINS = awe6_interfaces_ETextStyle.SUB_TYPE("HUD_COINS"), this.TEXTSTYLE_HUD_SCORE = awe6_interfaces_ETextStyle.SUB_TYPE("HUD_SCORE"), this.TEXTSTYLE_HUD_MESSAGE = awe6_interfaces_ETextStyle.SUB_TYPE("HUD_MESSAGE"), this.MESSAGE_FINISH_LINE = awe6_interfaces_EMessage.SUB_TYPE("FINISH_LINE"), awe6_core_drivers_createjs_Factory.call(this, e, t, s)
	};
$hxClasses["rch.Factory"] = rch_Factory, rch_Factory.__name__ = "rch.Factory", rch_Factory.__super__ = awe6_core_drivers_createjs_Factory, rch_Factory.prototype = $extend(awe6_core_drivers_createjs_Factory.prototype, {
	_configurer: function(p_isPreconfig) {
		null == p_isPreconfig && (p_isPreconfig = !1);
		var _gthis = this, l_SvnRevision, l_revision;
		p_isPreconfig && (l_SvnRevision = "1", l_revision = null, null != l_revision && (l_SvnRevision = haxe_Resource.getString("revision").split("\r\n")[0]), this.version = "1.0." + l_SvnRevision, this.author = "gradlecode", this.isDecached = !1, this.width = 720, this.height = 405, this.joypadTouchType = awe6_interfaces_EJoypadTouch.JOYSTICK(30), this.bgColor = 14955265, this.startingSceneType = awe6_interfaces_EScene.INTRO, this.targetFramerate = 30, this.isFixedUpdates = !0)
	},
	_launchKernel: function() {
		awe6_core_drivers_createjs_Factory.prototype._launchKernel.call(this), this._kernel.set_session(this.createSession("defaultSessionId")), "true" == this._kernel.getConfig("settings.disableEyeCandy") && this._kernel.set_isEyeCandy(!1)
	},
	createAssetManager: function() {
		return null == this._assets && (this._assets = new rch_AssetManager(this._kernel)), this._assets
	},
	createLogger: function() {
		return awe6_core_drivers_createjs_Factory.prototype.createLogger.call(this)
	},
	createOverlay: function() {
		return new rch_gui_Overlay(this._kernel)
	},
	createPreloader: function() {
		return new rch_Preloader(this._kernel, this._getAssetUrls(), this.isDecached)
	},
	createScene: function(e) {
		switch (this._kernel.log("scene: " + Std.string(e)), e._hx_index) {
			case 1:
				return new rch_scenes_Intro(this._kernel, e);
			case 4:
				return new rch_scenes_SelectLevel(this._kernel, e);
			case 5:
				return new rch_scenes_Instructions(this._kernel, e);
			case 7:
				return new rch_scenes_Menu(this._kernel, e);
			case 9:
				return new rch_scenes_Shop(this._kernel, e);
			case 12:
				return new rch_scenes_Game(this._kernel, e);
			case 13:
				return new rch_scenes_Interstitial(this._kernel, e);
			case 15:
				return new rch_scenes_Results(this._kernel, e)
		}
		return awe6_core_drivers_createjs_Factory.prototype.createScene.call(this, e)
	},
	createSceneTransition: function(e, t) {
		return new rch_scenes_SceneTransition(this._kernel)
	},
	createSession: function(e) {
		return new rch_Session(this._kernel, e)
	},
	createTextStyle: function(e) {
		null == e && (e = awe6_interfaces_ETextStyle.BODY);
		var t, s = this._kernel.getConfig("settings.font.name");
		if (null == e) t = new awe6_core_TextStyle(s, 12, 8421504);
		else switch (e._hx_index) {
			case 0:
				t = new awe6_core_TextStyle(s, 20, this.COLOR_WHITE, !1, !0, awe6_interfaces_ETextAlign.CENTER, 100, 0, 0, []);
				break;
			case 1:
				t = new awe6_core_TextStyle(s, 16, this.COLOR_WHITE, !1, !0, awe6_interfaces_ETextAlign.LEFT, 0, 18, 0, []);
				break;
			case 2:
				t = new awe6_core_TextStyle(s, 24, this.COLOR_WHITE, !1, !0, awe6_interfaces_ETextAlign.LEFT, 0, 0, 0, []);
				break;
			case 3:
				t = new awe6_core_TextStyle(s, 18, this.COLOR_WHITE, !1, !0, awe6_interfaces_ETextAlign.LEFT, 0, 20, 0, []);
				break;
			case 4:
				t = new awe6_core_TextStyle(s, 11, this.COLOR_GREY, !1, !0, awe6_interfaces_ETextAlign.LEFT, 0, 0, 0, []);
				break;
			case 5:
				t = new awe6_core_TextStyle(s, 24, this.COLOR_WHITE, !1, !0, awe6_interfaces_ETextAlign.RIGHT, 0, 0, 0, []);
				break;
			case 6:
				switch (e.value) {
					case "HUD_COINS":
						t = new awe6_core_TextStyle(s, 24, this.COLOR_WHITE, !1, !0, awe6_interfaces_ETextAlign.RIGHT, 0, 0, 0, []);
						break;
					case "HUD_MESSAGE":
						t = new awe6_core_TextStyle(s, 30, this.COLOR_WHITE, !1, !0, awe6_interfaces_ETextAlign.CENTER, 0, 0, 0, []);
						break;
					case "HUD_SCORE":
						t = new awe6_core_TextStyle(s, 24, this.COLOR_WHITE, !1, !0, awe6_interfaces_ETextAlign.LEFT, 0, 0, 0, []);
						break;
					case "PRELOADER":
						t = new awe6_core_TextStyle(s, 14, this.COLOR_WHITE, !1, !0, awe6_interfaces_ETextAlign.CENTER, 0, 0, 0, []);
						break;
					default:
						t = null
				}
		}
		return t
	},
	getBackSceneType: function(e) {
		switch (e._hx_index) {
			case 4:
			case 5:
			case 9:
			case 12:
			case 13:
			case 15:
				return awe6_interfaces_EScene.MENU
		}
		return awe6_core_drivers_createjs_Factory.prototype.getBackSceneType.call(this, e)
	},
	getNextSceneType: function(e) {
		switch (e._hx_index) {
			case 1:
				gradle.event('scene_menu');
				return awe6_interfaces_EScene.MENU;
			case 4:
				gradle.event('btn_start_race');
				return awe6_interfaces_EScene.GAME;
			case 5:
			case 7:
			case 9:
				gradle.event('btn_play_now');
				return awe6_interfaces_EScene.SELECT_LEVEL;
			case 12:
				gradle.event('scene_result');
				return awe6_interfaces_EScene.RESULTS;
			case 13:
			case 15:
				gradle.event('scene_shop');
				return awe6_interfaces_EScene.SHOP
		}
		return awe6_core_drivers_createjs_Factory.prototype.getNextSceneType.call(this, e)
	},
	createCanvas: function(e, t) {
		var s = window.document.createElement("canvas");
		return s.width = e, s.height = t, s
	},
	__class__: rch_Factory
});
var rch_Main = function() {};
$hxClasses["rch.Main"] = rch_Main, rch_Main.__name__ = "rch.Main", rch_Main.main = function() {
	var e, t = window.document.getElementById("gameCanvas"),
		s = rch_Main.getParams().h.lang;
	//null != s && (e = "config.xml", t.setAttribute("config", e));
	var i = new createjs.Stage(t),
		r = new createjs.Container;
	
	var xmlHTTP = new XMLHttpRequest();
	xmlHTTP.onreadystatechange = function(){
		if (xmlHTTP.status == "200")
		var config = xmlHTTP.responseText; 
		//console.log(config);
		i.addChild(r), rch_Main.factory = new rch_Factory(r, !1, config);
	}
	xmlHTTP.open("GET", "./config.xml", false);
	xmlHTTP.send(null);

}, rch_Main.getParams = function() {
	for (var e = HxOverrides.substr(window.location.search, 1, null), t = new haxe_ds_StringMap, s = 0, i = new EReg("[&;]", "g").split(e); s < i.length;) {
		var r = i[s];
		++s;
		var n, _, a, o, c = r.split("=");
		c.length < 2 || (n = c.shift(), _ = decodeURIComponent(n.split("+").join(" ")), a = c.join("="), o = decodeURIComponent(a.split("+").join(" ")), t.h[_] = o)
	}
	return t
};
var rch_Preloader = function(e, t, s) {
	awe6_core_drivers_createjs_Preloader.call(this, e, t, s)
};
$hxClasses["rch.Preloader"] = rch_Preloader, rch_Preloader.__name__ = "rch.Preloader", rch_Preloader.__super__ = awe6_core_drivers_createjs_Preloader, rch_Preloader.prototype = $extend(awe6_core_drivers_createjs_Preloader.prototype, {
	_init: function() {
		this._factory = this._kernel.factory, this._proprietaryAudioFormat = "m4a";
		var e = new createjs.Bitmap("images/__PreloaderFg.png"),
			t = new createjs.Bitmap("images/__PreloaderBg.png");
		awe6_core_drivers_createjs_Preloader.prototype._init.call(this);
		var s = this._kernel.factory.width - 40;
		this._bg = new createjs.Shape, this._bg.graphics.beginFill("#ffffff"), this._bg.graphics.drawRoundRect(-2, -2, 2 + s + 2, 14, 4), this._bg.graphics.endFill(), this._fg = new createjs.Shape, this._fg.graphics.beginFill("#e43301"), this._fg.graphics.drawRoundRect(0, 0, s, 10, 4), this._fg.graphics.endFill(), this._bg.x = this._fg.x = .5 * (this._kernel.factory.width - s), this._bg.y = this._fg.y = this._kernel.factory.height - 20 - 10 - 2, this._context.addChild(t), this._context.addChild(e), this._context.addChild(this._bg), this._context.addChild(this._fg)
	},
	_updater: function(e) {
		null == e && (e = 0), awe6_core_drivers_createjs_Preloader.prototype._updater.call(this, e), this._fg.scaleX = this.get_progress()
	},
	_showAudioHoldMessage: function() {
		var e = new rch_gui_Text(this._kernel, this._kernel.factory.width, 20, Std.string(this._kernel.getConfig("gui.audioHoldMessage")).toUpperCase(), this._kernel.factory.createTextStyle(awe6_interfaces_ETextStyle.SUB_TYPE("PRELOADER")));
		e.setPosition(0, this._bg.y - 10), this.get_view().addChild(e.get_view()), this._context.removeChild(this._bg), this._context.removeChild(this._fg)
	},
	__class__: rch_Preloader
});
var rch_Session = function(e, t) {
	awe6_core_drivers_createjs_Session.call(this, e, t)
};
$hxClasses["rch.Session"] = rch_Session, rch_Session.__name__ = "rch.Session", rch_Session.__super__ = awe6_core_drivers_createjs_Session, rch_Session.prototype = $extend(awe6_core_drivers_createjs_Session.prototype, {
	_init: function() {
		this._version = 3, awe6_core_drivers_createjs_Session.prototype._init.call(this)
	},
	_getter: function() {
		awe6_core_drivers_createjs_Session.prototype._getter.call(this), this.series = this._getValidatedInteger(this._data.series), this.level = this._getValidatedInteger(this._data.level), this.upgradeSpeed = this._getValidatedInteger(this._data.upgradeSpeed), this.upgradeSteering = this._getValidatedInteger(this._data.upgradeSteering), this.upgradeAcceleration = this._getValidatedInteger(this._data.upgradeAcceleration), this.upgradeBoost = this._getValidatedInteger(this._data.upgradeBoost), this.scoreLevel0 = this._getValidatedInteger(this._data.scoreLevel0), this.scoreLevel1 = this._getValidatedInteger(this._data.scoreLevel1), this.scoreLevel2 = this._getValidatedInteger(this._data.scoreLevel2), this.scoreLevel3 = this._getValidatedInteger(this._data.scoreLevel3), this.highScore = this._getValidatedInteger(this._data.highScore), this.coins = this._getValidatedInteger(this._data.coins)
	},
	_getValidatedInteger: function(e) {
		return null == e || isNaN(e) ? 0 : e
	},
	_setter: function() {
		awe6_core_drivers_createjs_Session.prototype._setter.call(this), this._data.series = this.series, this._data.level = this.level, this._data.upgradeSpeed = this.upgradeSpeed, this._data.upgradeSteering = this.upgradeSteering, this._data.upgradeAcceleration = this.upgradeAcceleration, this._data.upgradeBoost = this.upgradeBoost, this._data.scoreLevel0 = this.scoreLevel0, this._data.scoreLevel1 = this.scoreLevel1, this._data.scoreLevel2 = this.scoreLevel2, this._data.scoreLevel3 = this.scoreLevel3, this._data.highScore = this.highScore, this._data.coins = this.coins
	},
	_resetter: function() {
		awe6_core_drivers_createjs_Session.prototype._resetter.call(this), this.cache = new rch__$Session__$HelperCache(this._kernel), this.series = 1, this.level = 0 | this._tools.limit(Std.parseInt(this._kernel.getConfig("settings.startingLevel")), 0, 3), this.highScore = 0, this.upgradeSpeed = 0, this.upgradeSteering = 0, this.upgradeAcceleration = 0, this.upgradeBoost = 0, this.coins = 500, this.resetGame()
	},
	resetGame: function() {
		this.scoreLevel0 = 0, this.scoreLevel1 = 0, this.scoreLevel2 = 0, this.scoreLevel3 = 0
	},
	setScore: function(e, t) {
		switch (e) {
			case 0:
				this.scoreLevel0 = t;
				break;
			case 1:
				this.scoreLevel1 = t;
				break;
			case 2:
				this.scoreLevel2 = t;
				break;
			case 3:
				this.scoreLevel3 = t;
				break;
			default:
				this.scoreLevel3 = t
		}
	},
	getScore: function(e) {
		switch (e) {
			case 0:
				return this.scoreLevel0;
			case 1:
				return this.scoreLevel1;
			case 2:
				return this.scoreLevel2;
			case 3:
			default:
				return this.scoreLevel3
		}
	},
	setUpgrade: function(e, t) {
		switch (t < 0 && (t = 0), 4 < t && (t = 4), e._hx_index) {
			case 0:
				this.upgradeSpeed = t;
				break;
			case 1:
				this.upgradeSteering = t;
				break;
			case 2:
				this.upgradeAcceleration = t;
				break;
			case 3:
				this.upgradeBoost = t
		}
	},
	getUpgrade: function(e) {
		switch (e._hx_index) {
			case 0:
				return this.upgradeSpeed;
			case 1:
				return this.upgradeSteering;
			case 2:
				return this.upgradeAcceleration;
			case 3:
				return this.upgradeBoost
		}
	},
	getUpgradeBias: function(e, t, s) {
		var i = s - t;
		return t + this.getUpgrade(e) / 4 * i
	},
	setIsTester: function(e) {
		this._isTester = e
	},
	get_isTester: function() {
		return !!this._kernel.isDebug || this._isTester
	},
	getPercentageComplete: function() {
		return (this.upgradeSpeed + this.upgradeSteering + this.upgradeAcceleration + this.upgradeBoost) / 16
	},
	__class__: rch_Session
});
var rch__$Session__$HelperCache = function(e) {
	this._kernel = e, this.totalPlays = 0, this.benchmark = 0, this.debugMessage = ""
};
$hxClasses["rch._Session._HelperCache"] = rch__$Session__$HelperCache, rch__$Session__$HelperCache.__name__ = "rch._Session._HelperCache", rch__$Session__$HelperCache.prototype = {
	__class__: rch__$Session__$HelperCache
};
var rch_game_Camera = function(e, t) {
	this.shake = {
		value: 0,
		resistance: .9,
		dx: 0,
		dy: 0
	}, this._trackLength = t, rch_AEntity.call(this, e)
};
$hxClasses["rch.game.Camera"] = rch_game_Camera, rch_game_Camera.__name__ = "rch.game.Camera", rch_game_Camera.__super__ = rch_AEntity, rch_game_Camera.prototype = $extend(rch_AEntity.prototype, {
	_init: function() {
		rch_AEntity.prototype._init.call(this), this.drawDistance = 80, this.fieldOfView = 120, this.fogDensity = 5, this.height = 1440, this.depth = 1 / Math.tan(this.fieldOfView / 2 * Math.PI / 180), this.position = 0, this.angle = .135
	},
	_updater: function(e) {
		var t, s;
		null == e && (e = 0), rch_AEntity.prototype._updater.call(this, e), 1 == this._updates && (this.height = 5e3), this.height = .95 * this.height + 72 | 0, 0 < this.shake.value && (this.shake.value *= this.shake.resistance, this.shake.value < .1 ? (this.shake.value = 0, this.shake.dx = 0, this.shake.dy = 0) : (t = Math.random() * this.shake.value * 20, s = Math.random() < .5 ? -1 : 1, this.shake.dx = t * s, t = Math.random() * this.shake.value * 20, s = Math.random() < .5 ? -1 : 1, this.shake.dy = t * s))
	},
	increasePosition: function(e, t) {
		null == t && (t = 0), null == e && (e = 0), this.position += e;
		this._tools;
		var s = this.angle + t,
			i = s - Math.floor(+s);
		this.angle = i
	},
	setShake: function(e) {
		this.shake.value = Math.abs(1 < e ? 1 : e < 0 ? 0 : e)
	},
	__class__: rch_game_Camera
});
var rch_game_Car = function(e, t, s, i) {
	this.type = e, this.offset = t, this.z = s, this.speed = i, this.percent = 0, this.steer = 0
};
$hxClasses["rch.game.Car"] = rch_game_Car, rch_game_Car.__name__ = "rch.game.Car", rch_game_Car.prototype = {
	__class__: rch_game_Car
};
var rch_game_DeviceMotion = function(e) {
	if (this._kernel = e, this.isEnabled = !1, this.motionRelative = 0, this._parentOrientation = "", this._isIos = new EReg("iP[ao]d|iPhone", "i").match(window.navigator.userAgent), this._isWindows = new EReg("Windows", "").match(window.navigator.userAgent), this._isOrientationApproximation = "true" == this._kernel.getConfig("settings.orientationApproximation"), "true" != this._kernel.getConfig("settings.disableDeviceMotion")) try {
		this._orientation = this._getOrientation(), window.MessageEvent && window.addEventListener("message", $bind(this, this._onMessage), !1), window.DeviceMotionEvent && window.addEventListener("devicemotion", $bind(this, this._onDeviceMotion), !1), this.isEnabled = !0
	} catch (e) {
		this.isEnabled = !1
	}
};
$hxClasses["rch.game.DeviceMotion"] = rch_game_DeviceMotion, rch_game_DeviceMotion.__name__ = "rch.game.DeviceMotion", rch_game_DeviceMotion.prototype = {
	dispose: function() {
		this.isEnabled = !1;
		try {
			window.MessageEvent && window.removeEventListener("message", $bind(this, this._onMessage), !1), window.DeviceMotionEvent && window.removeEventListener("devicemotion", $bind(this, this._onDeviceMotion), !1)
		} catch (e) {}
	},
	_onMessage: function(e) {
		null != e.data.orientation && (this._parentOrientation = e.data.orientation)
	},
	_onDeviceMotion: function(e) {
		this._orientation = this._getOrientation(), this.motionRelative = 0, "landscape" == this._orientation || "landscape-primary" == this._orientation || "90" == this._orientation ? (this.motionRelative = e.accelerationIncludingGravity.y, this._isWindows && (this.motionRelative = -e.accelerationIncludingGravity.x)) : "landscape-secondary" == this._orientation || "-90" == this._orientation ? (this.motionRelative = -e.accelerationIncludingGravity.y, this._isWindows && (this.motionRelative = e.accelerationIncludingGravity.x)) : "portrait" == this._orientation || "portrait-primary" == this._orientation || "0" == this._orientation ? (this.motionRelative = -e.accelerationIncludingGravity.x, this._isWindows && (this.motionRelative = -e.accelerationIncludingGravity.y)) : "portrait-secondary" == this._orientation || "180" == this._orientation ? (this.motionRelative = e.accelerationIncludingGravity.x, this._isWindows && (this.motionRelative = e.accelerationIncludingGravity.y)) : this.motionRelative = -e.accelerationIncludingGravity.y, this.motionRelative = Math.max(Math.min(this.motionRelative / 3, 1), -1) * (this._isIos ? -1 : 1)
	},
	_getOrientation: function() {
		var e = "";
		return "" == (e = this._getWindowOrientation(window.top)) && (e = "" != this._parentOrientation ? this._parentOrientation : this._isOrientationApproximation ? window.innerWidth > window.innerHeight ? "90" : "0" : this._getWindowOrientation(window)), e
	},
	_getWindowOrientation: function(e) {
		var t = "";
		try {
			null != e.screen.orientation ? (t = e.screen.orientation, null != e.screen.orientation.type && (t = e.screen.orientation.type)) : null != e.screen.mozOrientation ? t = e.screen.mozOrientation : null != e.screen.msOrientation ? t = e.screen.msOrientation : null != e.orientation && (t = e.orientation)
		} catch (e) {}
		return t
	},
	__class__: rch_game_DeviceMotion
};
var rch_game_ECar = $hxEnums["rch.game.ECar"] = {
		__ename__: "rch.game.ECar",
		__constructs__: ["CAR_A", "CAR_B", "CAR_C", "CAR_D", "CAR_E"],
		CAR_A: {
			_hx_index: 0,
			__enum__: "rch.game.ECar",
			toString: $estr
		},
		CAR_B: {
			_hx_index: 1,
			__enum__: "rch.game.ECar",
			toString: $estr
		},
		CAR_C: {
			_hx_index: 2,
			__enum__: "rch.game.ECar",
			toString: $estr
		},
		CAR_D: {
			_hx_index: 3,
			__enum__: "rch.game.ECar",
			toString: $estr
		},
		CAR_E: {
			_hx_index: 4,
			__enum__: "rch.game.ECar",
			toString: $estr
		}
	},
	rch_game_ELocation = $hxEnums["rch.game.ELocation"] = {
		__ename__: "rch.game.ELocation",
		__constructs__: ["LOCATION_A", "LOCATION_B", "LOCATION_C", "LOCATION_D"],
		LOCATION_A: {
			_hx_index: 0,
			__enum__: "rch.game.ELocation",
			toString: $estr
		},
		LOCATION_B: {
			_hx_index: 1,
			__enum__: "rch.game.ELocation",
			toString: $estr
		},
		LOCATION_C: {
			_hx_index: 2,
			__enum__: "rch.game.ELocation",
			toString: $estr
		},
		LOCATION_D: {
			_hx_index: 3,
			__enum__: "rch.game.ELocation",
			toString: $estr
		}
	},
	rch_game_ERoad = $hxEnums["rch.game.ERoad"] = {
		__ename__: "rch.game.ERoad",
		__constructs__: ["ROAD_NONE", "ROAD_LEFT_SHORT", "ROAD_LEFT_MEDIUM", "ROAD_LEFT_LONG", "ROAD_RIGHT_SHORT", "ROAD_RIGHT_MEDIUM", "ROAD_RIGHT_LONG"],
		ROAD_NONE: {
			_hx_index: 0,
			__enum__: "rch.game.ERoad",
			toString: $estr
		},
		ROAD_LEFT_SHORT: {
			_hx_index: 1,
			__enum__: "rch.game.ERoad",
			toString: $estr
		},
		ROAD_LEFT_MEDIUM: {
			_hx_index: 2,
			__enum__: "rch.game.ERoad",
			toString: $estr
		},
		ROAD_LEFT_LONG: {
			_hx_index: 3,
			__enum__: "rch.game.ERoad",
			toString: $estr
		},
		ROAD_RIGHT_SHORT: {
			_hx_index: 4,
			__enum__: "rch.game.ERoad",
			toString: $estr
		},
		ROAD_RIGHT_MEDIUM: {
			_hx_index: 5,
			__enum__: "rch.game.ERoad",
			toString: $estr
		},
		ROAD_RIGHT_LONG: {
			_hx_index: 6,
			__enum__: "rch.game.ERoad",
			toString: $estr
		}
	},
	rch_game_EScenery = $hxEnums["rch.game.EScenery"] = {
		__ename__: "rch.game.EScenery",
		__constructs__: ["SCENERY_BOOST", "SCENERY_COIN", "SCENERY_AFTERBURNER", "SCENERY_TUNNEL_LEFT", "SCENERY_TUNNEL_RIGHT", "SCENERY_FINISH_LEFT", "SCENERY_FINISH_RIGHT", "SCENERY_TREE_1", "SCENERY_TREE_2", "SCENERY_TREE_3", "SCENERY_BANNER_LEFT", "SCENERY_BANNER_RIGHT", "SCENERY_TIRE", "SCENERY_CONE_1", "SCENERY_CONE_2", "SCENERY_TALL", "SCENERY_SIDING_LEFT", "SCENERY_SIDING_RIGHT", "SCENERY_MOUND_1", "SCENERY_MOUND_2", "SCENERY_WIDE_1", "SCENERY_WIDE_2", "SCENERY_CROWD_LEFT", "SCENERY_CROWD_RIGHT"],
		SCENERY_BOOST: {
			_hx_index: 0,
			__enum__: "rch.game.EScenery",
			toString: $estr
		},
		SCENERY_COIN: {
			_hx_index: 1,
			__enum__: "rch.game.EScenery",
			toString: $estr
		},
		SCENERY_AFTERBURNER: {
			_hx_index: 2,
			__enum__: "rch.game.EScenery",
			toString: $estr
		},
		SCENERY_TUNNEL_LEFT: {
			_hx_index: 3,
			__enum__: "rch.game.EScenery",
			toString: $estr
		},
		SCENERY_TUNNEL_RIGHT: {
			_hx_index: 4,
			__enum__: "rch.game.EScenery",
			toString: $estr
		},
		SCENERY_FINISH_LEFT: {
			_hx_index: 5,
			__enum__: "rch.game.EScenery",
			toString: $estr
		},
		SCENERY_FINISH_RIGHT: {
			_hx_index: 6,
			__enum__: "rch.game.EScenery",
			toString: $estr
		},
		SCENERY_TREE_1: {
			_hx_index: 7,
			__enum__: "rch.game.EScenery",
			toString: $estr
		},
		SCENERY_TREE_2: {
			_hx_index: 8,
			__enum__: "rch.game.EScenery",
			toString: $estr
		},
		SCENERY_TREE_3: {
			_hx_index: 9,
			__enum__: "rch.game.EScenery",
			toString: $estr
		},
		SCENERY_BANNER_LEFT: {
			_hx_index: 10,
			__enum__: "rch.game.EScenery",
			toString: $estr
		},
		SCENERY_BANNER_RIGHT: {
			_hx_index: 11,
			__enum__: "rch.game.EScenery",
			toString: $estr
		},
		SCENERY_TIRE: {
			_hx_index: 12,
			__enum__: "rch.game.EScenery",
			toString: $estr
		},
		SCENERY_CONE_1: {
			_hx_index: 13,
			__enum__: "rch.game.EScenery",
			toString: $estr
		},
		SCENERY_CONE_2: {
			_hx_index: 14,
			__enum__: "rch.game.EScenery",
			toString: $estr
		},
		SCENERY_TALL: {
			_hx_index: 15,
			__enum__: "rch.game.EScenery",
			toString: $estr
		},
		SCENERY_SIDING_LEFT: {
			_hx_index: 16,
			__enum__: "rch.game.EScenery",
			toString: $estr
		},
		SCENERY_SIDING_RIGHT: {
			_hx_index: 17,
			__enum__: "rch.game.EScenery",
			toString: $estr
		},
		SCENERY_MOUND_1: {
			_hx_index: 18,
			__enum__: "rch.game.EScenery",
			toString: $estr
		},
		SCENERY_MOUND_2: {
			_hx_index: 19,
			__enum__: "rch.game.EScenery",
			toString: $estr
		},
		SCENERY_WIDE_1: {
			_hx_index: 20,
			__enum__: "rch.game.EScenery",
			toString: $estr
		},
		SCENERY_WIDE_2: {
			_hx_index: 21,
			__enum__: "rch.game.EScenery",
			toString: $estr
		},
		SCENERY_CROWD_LEFT: {
			_hx_index: 22,
			__enum__: "rch.game.EScenery",
			toString: $estr
		},
		SCENERY_CROWD_RIGHT: {
			_hx_index: 23,
			__enum__: "rch.game.EScenery",
			toString: $estr
		}
	},
	rch_game_EUpgrade = $hxEnums["rch.game.EUpgrade"] = {
		__ename__: "rch.game.EUpgrade",
		__constructs__: ["UPGRADE_SPEED", "UPGRADE_STEERING", "UPGRADE_ACCELERATION", "UPGRADE_BOOST"],
		UPGRADE_SPEED: {
			_hx_index: 0,
			__enum__: "rch.game.EUpgrade",
			toString: $estr
		},
		UPGRADE_STEERING: {
			_hx_index: 1,
			__enum__: "rch.game.EUpgrade",
			toString: $estr
		},
		UPGRADE_ACCELERATION: {
			_hx_index: 2,
			__enum__: "rch.game.EUpgrade",
			toString: $estr
		},
		UPGRADE_BOOST: {
			_hx_index: 3,
			__enum__: "rch.game.EUpgrade",
			toString: $estr
		}
	},
	rch_game_Lensflare = function(e, t, s, i, r) {
		null == r && (r = 1), null == i && (i = 1), this._kernel = e, this._width = t, this._height = s, this._brightness = i, this._exaggerationScale = r, this._x = 0, this._y = 0, this._hyp = 1.75 * Math.sqrt(this._width * this._width + this._height * this._height), this._lenses = [];
		for (var n = [.75, 0, .25, .35, .55, .65, .75, .9, 1], _ = 0, a = n.length; _ < a;) {
			var o = _++,
				c = {
					deviation: n[o],
					sprite: this._getSprite(o)
				};
			this._lenses.push(c)
		}
		this._spriteSource = this._kernel.assets.getAsset("images/LensFlares.jpg")
	};
$hxClasses["rch.game.Lensflare"] = rch_game_Lensflare, rch_game_Lensflare.__name__ = "rch.game.Lensflare", rch_game_Lensflare.prototype = {
	_getSprite: function(e) {
		var t, s = {
			x: 0,
			y: 0,
			w: 256,
			h: 256,
			isFlip: !1,
			isRotated: !1
		};
		switch (e) {
			case 1:
			case 5:
				t = 256;
				break;
			case 2:
			case 6:
				t = 512;
				break;
			case 3:
			case 7:
				t = 768;
				break;
			case 0:
			case 4:
				t = 0;
				break;
			default:
				t = 0
		}
		switch (s.x = t, e) {
			case 4:
			case 5:
			case 6:
			case 7:
				t = 256;
				break;
			default:
				t = 0
		}
		return s.y = t, s
	},
	draw: function(e, t, s) {
		this._x = (t + 512) % 1024, this._y = s;
		var i = 2 * (this._x - .5 * this._width),
			r = 2 * (this._y - .5 * this._height),
			n = Math.sqrt(i * i + r * r) / this._hyp,
			_ = this._brightness - 2.5 * n * this._brightness;
		if (.25 < _ && (_ = .25), _ < 0 && (_ = 0), e.save(), e.globalCompositeOperation = "lighter", 0 < _) {
			e.globalAlpha = _;
			for (var a = 0, o = this._lenses; a < o.length;) {
				var c = o[a];
				++a;
				var h = Math.round(this._x + Math.round(c.deviation * -i * this._exaggerationScale) - 128),
					l = Math.round(this._y + Math.round(.9 * c.deviation * -r) - 128);
				e.drawImage(this._spriteSource, c.sprite.x, c.sprite.y, c.sprite.w, c.sprite.h, h, l, 256, 256)
			}
		}
		e.restore()
	},
	__class__: rch_game_Lensflare
};
var rch_game_Location = function(e, t) {
	this.type = t, rch_AEntity.call(this, e)
};
$hxClasses["rch.game.Location"] = rch_game_Location, rch_game_Location.__name__ = "rch.game.Location", rch_game_Location.__super__ = rch_AEntity, rch_game_Location.prototype = $extend(rch_AEntity.prototype, {
	_init: function() {
		rch_AEntity.prototype._init.call(this), this.vo = new rch_game_LocationVo(this._kernel, this.type), this.addEntity(this._track = new rch_game_Track(this._kernel, this.vo)), this.addEntity(this._camera = new rch_game_Camera(this._kernel, this._track.totalDistance)), this.addEntity(this._player = new rch_game_Player(this._kernel, this._track, this._camera));
		var e = .0013 * (this._session.cache.benchmark - 200) + .6,
			t = 1 < e ? 1 : e < .6 ? .6 : e,
			s = Math.ceil(this._factory.width * t),
			i = Math.ceil(this._factory.height * t);
		this.addEntity(this._renderer = new rch_game_Renderer(this._kernel, this._track, this._camera, this._player, s, i), null, !0), this._renderer._context.scaleX = this._factory.width / s, this._renderer._context.scaleY = this._factory.height / i
	},
	getScore: function() {
		return this._player.score + 1
	},
	getCars: function() {
		for (var e = [], t = 0, s = this._track.cars; t < s.length;) {
			var i = s[t];
			++t, e.push({
				type: i.type,
				position: i.z / (this._track.maxSegments * this._track.segmentDistance),
				offset: i.offset
			})
		}
		return e.push({
			type: rch_game_ECar.CAR_A,
			position: this._camera.position / (this._track.maxSegments * this._track.segmentDistance),
			offset: this._player.x
		}), e
	},
	__class__: rch_game_Location
});
var rch_game_LocationVo = function(e, t) {
	rch_AVo.call(this, e), this.type = t, this.imageHorizon = this._getImageHorizon(), this.imageRoad = this._getImageRoad(), this.imageScenery = this._getImageScenery(), this.bgColor = this._getBgColor(), this.inFieldColor = this._getInFieldColor(), this.trees = this._getTrees(), this.sidingDistance = this._getSidingDistance(), this.isBowl = this._getIsBowl(), this.isHorizonBanked = this._getIsHorizonBanked(), this.leftRatio = this._getLeftRatio(), this.treeDensity = this._getTreeDensity(), this.hillMax = this._getHillMax(), this.title = this._getTitle(), this.altTitle = this._getAltTitle(), this.difficulty = this._getDifficulty()
};
$hxClasses["rch.game.LocationVo"] = rch_game_LocationVo, rch_game_LocationVo.__name__ = "rch.game.LocationVo", rch_game_LocationVo.__super__ = rch_AVo, rch_game_LocationVo.prototype = $extend(rch_AVo.prototype, {
	_getImageHorizon: function() {
		var e;
		switch (this.type._hx_index) {
			case 0:
				e = "images/HorizonA.jpg";
				break;
			case 1:
				e = "images/HorizonB.jpg";
				break;
			case 2:
				e = "images/HorizonC.jpg";
				break;
			case 3:
				e = "images/HorizonD.jpg"
		}
		return this._assets.getAsset(e)
	},
	_getImageRoad: function() {
		var e;
		switch (this.type._hx_index) {
			case 0:
				e = "images/RoadsA.png";
				break;
			case 1:
				e = "images/RoadsB.png";
				break;
			case 2:
				e = "images/RoadsC.png";
				break;
			case 3:
				e = "images/RoadsD.png"
		}
		return this._assets.getAsset(e)
	},
	_getImageScenery: function() {
		var e;
		switch (this.type._hx_index) {
			case 0:
				e = "images/SceneryA.png";
				break;
			case 1:
				e = "images/SceneryB.png";
				break;
			case 2:
				e = "images/SceneryC.png";
				break;
			case 3:
				e = "images/SceneryD.png"
		}
		return this._assets.getAsset(e)
	},
	_getBgColor: function() {
		switch (this.type._hx_index) {
			case 0:
				return "#c3b398";
			case 1:
				return "#384630";
			case 2:
				return "#d5f1f1";
			case 3:
				return "#537341"
		}
	},
	_getInFieldColor: function() {
		switch (this.type._hx_index) {
			case 0:
			case 1:
			case 2:
			case 3:
				return null
		}
	},
	_getTrees: function() {
		return [rch_game_EScenery.SCENERY_TREE_1, rch_game_EScenery.SCENERY_TREE_2, rch_game_EScenery.SCENERY_TREE_3]
	},
	_getSidingDistance: function() {
		switch (this.type._hx_index) {
			case 0:
			case 1:
			case 2:
			case 3:
				return 3
		}
	},
	_getIsBowl: function() {
		switch (this.type._hx_index) {
			case 0:
			case 1:
			case 2:
			case 3:
				return !1
		}
	},
	_getIsHorizonBanked: function() {
		switch (this.type._hx_index) {
			case 0:
				return !0;
			case 1:
				return !1;
			case 2:
				return !0;
			case 3:
				return !1
		}
	},
	_getLeftRatio: function() {
		switch (this.type._hx_index) {
			case 0:
			case 1:
			case 2:
			case 3:
				return .5
		}
	},
	_getTreeDensity: function() {
		switch (this.type._hx_index) {
			case 0:
				return .15;
			case 1:
				return .9;
			case 2:
				return .35;
			case 3:
				return .25
		}
	},
	_getHillMax: function() {
		switch (this.type._hx_index) {
			case 0:
				return 3;
			case 1:
				return 3.35;
			case 2:
				return 3.65;
			case 3:
				return 4
		}
	},
	_getTitle: function() {
		var e;
		switch (this.type._hx_index) {
			case 0:
				e = "gui.locations.a";
				break;
			case 1:
				e = "gui.locations.b";
				break;
			case 2:
				e = "gui.locations.c";
				break;
			case 3:
				e = "gui.locations.d"
		}
		return this._kernel.getConfig(e)
	},
	_getAltTitle: function() {
		var e;
		switch (this.type._hx_index) {
			case 0:
				e = "gui.locations.a.alt";
				break;
			case 1:
				e = "gui.locations.b.alt";
				break;
			case 2:
				e = "gui.locations.c.alt";
				break;
			case 3:
				e = "gui.locations.d.alt"
		}
		return this._kernel.getConfig(e)
	},
	_getDifficulty: function() {
		var e;
		switch (this.type._hx_index) {
			case 0:
				e = "gui.locations.a.difficulty";
				break;
			case 1:
				e = "gui.locations.b.difficulty";
				break;
			case 2:
				e = "gui.locations.c.difficulty";
				break;
			case 3:
				e = "gui.locations.d.difficulty"
		}
		return this._kernel.getConfig(e)
	},
	__class__: rch_game_LocationVo
});
var rch_game_Player = function(e, t, s) {
	this._slipstream = 0, this._isVocalPlaying = !1, this._vocalQueue = [], this._track = t, this._camera = s, rch_AEntity.call(this, e)
};
$hxClasses["rch.game.Player"] = rch_game_Player, rch_game_Player.__name__ = "rch.game.Player", rch_game_Player.__super__ = rch_AEntity, rch_game_Player.prototype = $extend(rch_AEntity.prototype, {
	_init: function() {
		rch_AEntity.prototype._init.call(this), this.x = 0, this.y = 0, this.z = this._camera.height * this._camera.depth, this.speedPerc = 0, this.segment = null, this.percent = 0, this._speed = 0, this._boost = 0, this._impact = 0, this.steer = 0, this._width = .36, this._carsAheadOfPlayer = this._track.cars.length, this._prevQuarter = 0, this._biasSpeed = this._session.getUpgradeBias(rch_game_EUpgrade.UPGRADE_SPEED, .85, 1), this._biasSteering = this._session.getUpgradeBias(rch_game_EUpgrade.UPGRADE_STEERING, .9, 1.1), this._biasAcceleration = this._session.getUpgradeBias(rch_game_EUpgrade.UPGRADE_ACCELERATION, .95, 1.25), this._biasBoost = this._session.getUpgradeBias(rch_game_EUpgrade.UPGRADE_BOOST, .985, 1.02), this._maxSpeed = this._factory.targetFramerate * this._track.segmentDistance * .9 | 0, this._forceAcceleration = this._maxSpeed / 10, this._forceBraking = -this._maxSpeed, this._forceCoasting = -this._maxSpeed / 10, this._forceOffRoadDeceleration = -this._maxSpeed / 1.5, this._forceOffRoadLimit = this._maxSpeed / 2, this._deviceMotion = new rch_game_DeviceMotion(this._kernel), this._deviceMotion.isEnabled = this._deviceMotion.isEnabled && !this._system.isDesktop
	},
	_disposer: function() {
		this._deviceMotion.dispose(), rch_AEntity.prototype._disposer.call(this)
	},
	_updater: function(e) {
		null == e && (e = 0), rch_AEntity.prototype._updater.call(this, e), this._move(e), this._updateCars(e), this._collision(e), this._boost *= .925 * this._biasBoost, this._impact *= .925 * this._biasBoost, this._boost < .05 && (this._boost = 0), this._impact < .05 && (this._impact = 0), this.isRaceComplete || (this._camera.position + this.z < this._track.totalDistance ? this.score = this._carsAheadOfPlayer : (this.isRaceComplete = !0, this._kernel.messenger.sendMessage(this._factory.MESSAGE_FINISH_LINE, this, !1, !1, !0))), this._isVocalPlaying || this._nextVocal()
	},
	_move: function(e) {
		null == e && (e = 0);
		var t = e / 1e3;
		this.speedPerc = this._speed / this._maxSpeed;
		var s = 3.25 * t * this.speedPerc;
		this._kernel.inputs.mouse.getIsButtonDown() ? .05 < this.speedPerc && (r = 2 * this._kernel.inputs.mouse.relativeCentralisedX, this.steer = .5 * this.steer + .5 * (1 < r ? 1 : r < -1 ? -1 : r)) : this._deviceMotion.isEnabled && 0 != this._deviceMotion.motionRelative && !this._kernel.inputs.mouse.getIsButtonDown() && 1e3 < this._kernel.inputs.mouse.getButtonUpDuration() ? .05 < this.speedPerc && (this.steer = .5 * this.steer + .5 * this._deviceMotion.motionRelative) : (this.steer *= .75, this._kernel.inputs.joypad.getIsButtonDown(awe6_interfaces_EJoypadButton.LEFT) ? .05 < this.speedPerc && (this.steer -= .25) : this._kernel.inputs.joypad.getIsButtonDown(awe6_interfaces_EJoypadButton.RIGHT) && .05 < this.speedPerc && (this.steer += .25));
		var i = 1 < (r = Math.pow(this.speedPerc, .5) + .2) ? 1 : r < 0 ? 0 : r,
			r = this.steer,
			n = -i;
		this.steer = i < r ? i : r < n ? n : r, this.x += s * this._biasSteering * this.steer, 500 < this._age || this._kernel.inputs.joypad.getIsButtonDown(awe6_interfaces_EJoypadButton.UP) ? this._speed = rch_game_Util.accelerate(this._speed, this._biasAcceleration * this._forceAcceleration, t) : this._kernel.inputs.joypad.getIsButtonDown(awe6_interfaces_EJoypadButton.DOWN) ? this._speed = rch_game_Util.accelerate(this._speed, this._forceBraking, t) : this._speed = rch_game_Util.accelerate(this._speed, this._forceCoasting, t), this.isOffroad = !1, this._speed = rch_game_Util.accelerate(this._speed, this._biasAcceleration * this._forceAcceleration * this._slipstream, t), (this.x < -1 || 1 < this.x) && (this.isOffroad = !0, this.x < 0 && (this.steer = Math.max(this.steer, .75 * this.steer)), 0 < this.x && (this.steer = Math.min(this.steer, .75 * this.steer)), this._speed > this._forceOffRoadLimit && (this._speed = rch_game_Util.accelerate(this._speed, this._forceOffRoadDeceleration, t), this._camera.setShake(.25 * this.speedPerc)));
		r = this.x -= s * this.speedPerc * this._track.findSegment(this._camera.position).curve * .05;
		this.x = 1.125 < r ? 1.125 : r < -1.125 ? -1.125 : r;
		var r = this._speed,
			_ = this._biasSpeed * this._maxSpeed * (1 + .05 * this._slipstream);
		this._speed = _ < r ? _ : r < 0 ? 0 : r, this._speed += (0 < this._boost ? .1 : 0) * this._maxSpeed;
		var a = this.segment;
		this.segment = this._track.findSegment(this._camera.position + this.z), this.percent = rch_game_Util.percentRemaining(this._camera.position + this.z, this._track.segmentDistance);
		this._tools;
		if (this.y = .4 * rch_game_Util.interpolate(this.segment.position1.worldY, this.segment.position2.worldY, this.percent) + .6 * this.y, this._slipstream *= .9, this._slipstream < .05 && (this._slipstream = 0), this._camera.increasePosition(t * this._speed, -.04 * t * this.segment.curve * .25 * this.speedPerc), !this.isRaceComplete) {
			var o, c = Math.round(3.25 * (this.segment.index + this.percent) / this._track.maxSegments);
			if (c > this._prevQuarter && (this._vocalQueue.push("VocalCheckpoint"), this._prevQuarter = c), this.segment != a && null != this.segment.roadType) {
				switch (this.segment.roadType._hx_index) {
					case 0:
						o = "VocalStraight";
						break;
					case 1:
						o = "VocalEasyLeft";
						break;
					case 2:
						o = "VocalMediumLeft";
						break;
					case 3:
						o = "VocalHardLeft";
						break;
					case 4:
						o = "VocalEasyRight";
						break;
					case 5:
						o = "VocalMediumRight";
						break;
					case 6:
						o = "VocalHardRight"
				}
				this._vocalQueue.push(o)
			}
		}
	},
	_nextVocal: function() {
		var e;
		this._isVocalPlaying = !1, 0 != this._vocalQueue.length && (e = this._vocalQueue.shift(), this._kernel.audio.start(e, awe6_interfaces_EAudioChannel.INTERFACE, 0, 0, .75, 0, !1, $bind(this, this._nextVocal)), this._isVocalPlaying = !0)
	},
	_updateCars: function(e) {
		null == e && (e = 0);
		for (var t = Math.min(this._age / 7e3, 1), s = t * e / 1e3, i = this._carsAheadOfPlayer, r = this._carsAheadOfPlayer = 0, n = this._track.cars; r < n.length;) {
			var _ = n[r];
			++r;
			var a = this._track.findSegment(_.z);
			_.z = Math.round(Math.min(_.z + s * _.speed * this._maxSpeed * .83, this._track.segments.length * this._track.segmentDistance));
			var o = this._track.findSegment(_.z);
			if (a != o && (HxOverrides.remove(a.cars, _), o.cars.push(_)), a.index - this.segment.index <= this._camera.drawDistance && -5 < a.index - this.segment.index) {
				this._tools;
				_.steer = t * (.925 * _.steer + .075 * this._updateCarOffset(_, a));
				var c = _.offset + _.steer;
				if (_.offset = .8 < c ? .8 : c < -.8 ? -.8 : c, _.percent = rch_game_Util.percentRemaining(_.z, this._track.segmentDistance), a != o)
					for (var h = Math.round(2 * (1 - (a.index - this.segment.index) / this._camera.drawDistance)), l = 0, u = h; l < u;) {
						var d, g = l++;
						null != (d = this._track.getNextAfterburner()).owner && HxOverrides.remove(d.owner.scenery, d), d.configure(d.type, _.offset, (1 + g) / h, this._age / 5e3, a), a.scenery.push(d)
					}
			}
			_.z > this._camera.position + this.z && this._carsAheadOfPlayer++
		}
		this._carsAheadOfPlayer != i && this._kernel.audio.start("Driveby" + (Std.random(4) + 1), awe6_interfaces_EAudioChannel.EFFECTS, 0, 0, .5, 0, !1)
	},
	_updateCarOffset: function(e, t) {
		for (var s = this._width, i = 0, r = null, n = 1; n < 10;) {
			var _ = n++;
			if (i += (r = this._track.segments[(t.index + _) % this._track.segments.length]).curve, r == this.segment && e.speed > this.speedPerc && rch_game_Util.overlap(this.x, s, e.offset, s, 1.2)) return (!(.5 < this.x) && (this.x < -.5 || e.offset > this.x) ? 1 : -1) * (1 / _) * (e.speed - this.speedPerc);
			for (var a = 0, o = r.cars; a < o.length;) {
				var c = o[a];
				++a;
				var h = c;
				if (e.speed > h.speed && rch_game_Util.overlap(e.offset, s, h.offset, s, 1.2)) return (!(.5 < h.offset) && (h.offset < -.5 || e.offset > h.offset) ? 1 : -1) * (1 / _) * (e.speed - h.speed)
			}
		}
		return i < 0 ? -.01 : .01
	},
	_collision: function(e) {
		null == e && (e = 0);
		for (var t = this._track.segments[this.segment.index + 1], s = 0, i = t.scenery; s < i.length;) {
			var r, n = i[s];
			++s, n.isBoost && (HxOverrides.remove(t.scenery, n), Math.abs(this.x - n.offset) < .35 && this._activateBoost()), n.isCoin && (HxOverrides.remove(t.scenery, n), Math.abs(this.x - n.offset) < .165 && this._activateCoin()), n.isAfterburner && Math.abs(this.x - n.offset) < .165 && (r = n.life, this._slipstream = 1 < r ? 1 : r < 0 ? 0 : r)
		}
		if (this.segment.index < this._track.segments.length - 3) {
			var _ = this._track.segments,
				a = this.segment.index + 1,
				o = [].concat(this.segment.cars).concat(_[a].cars);
			if (.5 < this.percent)
				for (s = 0, i = this._track.segments[this.segment.index + 2].cars; s < i.length;) {
					n = i[s];
					++s, 1 - this.percent + n.percent < .5 && o.push(n)
				}
			for (s = 0; s < o.length;) {
				n = o[s];
				++s;
				var c = this.x - n.offset;
				Math.abs(c) < .7 * this._width && (this._activateImpact(Math.min(n.speed * this._maxSpeed * .75, .75 * this._speed)), n.offset -= .125 * c, this.x += .125 * c)
			}
		}
	},
	_activateBoost: function() {
		0 < this._boost || (this._kernel.overlay.flash(200, !0, 1, this._factory.COLOR_WHITE), this._boost = 1, this._speed = this._maxSpeed + this._boost * this._maxSpeed * .1, this._kernel.audio.start("Boost" + (Std.random(2) + 1), awe6_interfaces_EAudioChannel.EFFECTS, 0, 0, .5, 0, !1))
	},
	_activateImpact: function(e) {
		null == e && (e = 0), .5 < this._impact || (this._impact = 1, this._speed = e, this._camera.setShake(.75 * this.speedPerc), this._boost = 0, this.steer = 0, this._kernel.audio.start("Collision" + (Std.random(2) + 1), awe6_interfaces_EAudioChannel.EFFECTS, 0, 0, .65 * this.speedPerc, 0, !1))
	},
	_activateCoin: function() {
		this._session.coins += 20
	},
	__class__: rch_game_Player
});
var rch_game_Position = function(e, t) {
	this.worldX = 0, this.worldY = e, this.worldZ = t, this.cameraX = this.cameraY = this.cameraZ = 0, this.screenScale = 1, this.screenX = this.screenY = 0, this.screenWidth = 1
};
$hxClasses["rch.game.Position"] = rch_game_Position, rch_game_Position.__name__ = "rch.game.Position", rch_game_Position.prototype = {
	__class__: rch_game_Position
};
var rch_game_Renderer = function(e, t, s, i, r, n) {
	this._track = t, this._camera = s, this._player = i, this._width = r, this._height = n, rch_AEntity.call(this, e)
};
$hxClasses["rch.game.Renderer"] = rch_game_Renderer, rch_game_Renderer.__name__ = "rch.game.Renderer", rch_game_Renderer.__super__ = rch_AEntity, rch_game_Renderer.prototype = $extend(rch_AEntity.prototype, {
	_init: function() {
		rch_AEntity.prototype._init.call(this), this._context.cache(0, 0, this._width, this._height);
		var e = this._context.cacheCanvas;
		this._canvasBuffer = this._factory.createCanvas(this._width, this._height), this._context2dBuffer = this._canvasBuffer.getContext("2d", null), this._context2d = e.getContext("2d", null);
		var t = this._system.isDesktop && 200 < this._session.cache.benchmark;
		this._context2d.imageSmoothingEnabled = t, this._context2dBuffer.imageSmoothingEnabled = t, this._imageCars = this._assets.getAsset("images/Cars.png"), this._imageScenery = this._track.locationVo.imageScenery, this._imageRoad = this._track.locationVo.imageRoad, this._imageHorizon = this._track.locationVo.imageHorizon, this._isDrawImageUsingCanvas = this._session.cache.isDrawImageUsingCanvas, this._isDrawImageUsingCanvas && (this._canvasCars = this._factory.createCanvas(this._imageCars.width, this._imageCars.height), this._canvasCars.getContext("2d", null).drawImage(this._imageCars, 0, 0), this._imageCars = null, this._canvasScenery = this._factory.createCanvas(this._imageScenery.width, this._imageScenery.height), this._canvasScenery.getContext("2d", null).drawImage(this._imageScenery, 0, 0), this._imageScenery = null, this._canvasRoad = this._factory.createCanvas(this._imageRoad.width, this._imageRoad.height), this._canvasRoad.getContext("2d", null).drawImage(this._imageRoad, 0, 0), this._imageRoad = null, this._canvasHorizon = this._factory.createCanvas(this._imageHorizon.width, this._imageHorizon.height), this._canvasHorizon.getContext("2d", null).drawImage(this._imageHorizon, 0, 0), this._imageHorizon = null), this._framerateBiasTotal = 0, this._roadLanes = 4, this._roadWidth = 2e3, this._resolution = this._height / 405, this._horizonY = 0, this._horizonPattern = this._context2d.createPattern(this._isDrawImageUsingCanvas ? this._canvasHorizon : this._imageHorizon, "repeat");
		var s = 8 * this._session.cache.benchmark / 100;
		this._maxScanlines = Math.round(64 < s ? 64 : s < 6 ? 6 : s), this._cameraRotation = 0, this._lensflare = new rch_game_Lensflare(this._kernel, this._width, this._height), this._streaks = new rch_game_Streaks(this._kernel, this._width, this._height), this._isLensEffectsEnabled = this._kernel.isEyeCandy && 400 < this._session.cache.benchmark, this.c_textureRatio = 128 / this._track.segmentDistance / 16, this._coinSprites = [];
		for (var i = 0; i < 32;) {
			var r = i++;
			this._coinSprites.push({
				x: r % 32 * 32,
				y: 992,
				w: 32,
				h: 32,
				isFlip: !1,
				isRotated: !1
			})
		}
	},
	_updater: function(e) {
		null == e && (e = 0), rch_AEntity.prototype._updater.call(this, e), this._context2d.clearRect(0, 0, this._width, this._height), this._context2dBuffer.translate(this._camera.shake.dx, this._camera.shake.dy), 10 < this._updates && (this._framerateBiasTotal += this._kernel.getFramerate(!0), 1e3 < this._age && (.8 < this._framerateBiasTotal / (this._updates - 10) / this._factory.targetFramerate ? this._maxScanlines++ : this._maxScanlines = Math.round(.8 * this._maxScanlines)));
		var t = this._maxScanlines;
		this._maxScanlines = 0 | (128 < t ? 128 : t < 6 ? 6 : t);
		var s = this._track.findSegment(this._camera.position),
			i = rch_game_Util.percentRemaining(this._camera.position, this._track.segmentDistance),
			r = this._height,
			n = 0,
			_ = -s.curve * i,
			a = s,
			o = this._camera.position,
			c = this._camera.drawDistance,
			h = this._camera.fogDensity,
			l = this._tools,
			u = (t = this._camera.angle - this._player.x / 50) - Math.floor(+t);
		this._track.locationVo.inFieldColor;
		this._context2d.globalAlpha = 1, this._track.locationVo.isHorizonBanked || this._drawHorizon(u, this._horizonY), this._drawGround(this._horizonY);
		for (var d = 0, g = c; d < g;) {
			var p = d++;
			(a = this._track.segments[(s.index + p) % this._track.segments.length]).fog = 1 / Math.pow(Math.exp(1), Math.pow(p / c, 7) * h), a.clip = r;
			var l = a.position1,
				w = this._width,
				f = this._height;
			l.cameraX = l.worldX - (this._player.x * this._roadWidth - n), l.cameraY = l.worldY - (this._player.y + this._camera.height), l.cameraZ = l.worldZ - o, l.screenScale = this._camera.depth / l.cameraZ, l.screenX = Math.round(w / 2 + l.screenScale * l.cameraX * w / 2), l.screenY = Math.round(f / 2 - l.screenScale * l.cameraY * f / 2), l.screenWidth = Math.round(l.screenScale * this._roadWidth * w / 2);
			var y = a.position2,
				x = this._width,
				m = this._height;
			if (y.cameraX = y.worldX - (this._player.x * this._roadWidth - n - _), y.cameraY = y.worldY - (this._player.y + this._camera.height), y.cameraZ = y.worldZ - o, y.screenScale = this._camera.depth / y.cameraZ, y.screenX = Math.round(x / 2 + y.screenScale * y.cameraX * x / 2), y.screenY = Math.round(m / 2 - y.screenScale * y.cameraY * m / 2), y.screenWidth = Math.round(y.screenScale * this._roadWidth * x / 2), n += _, _ += a.curve, !(a.position1.cameraZ <= this._camera.depth || a.position2.screenY >= a.position1.screenY || a.position2.screenY >= r)) {
				r = a.position2.screenY;
				var E = a.position1.worldZ,
					v = (a.position2.worldZ, a.position1.screenWidth),
					b = a.position2.screenY,
					S = a.position2.screenWidth,
					C = a.texture,
					T = a.isFinishLine,
					A = a.isBoost,
					I = a.boostPosition;
				if (null == I && (I = 0), null == A && (A = !1), null == T && (T = !1), b > this._height && (b = this._height), v = 1.3 * v | 0, S = 1.3 * S | 0, this.c_startX = a.position1.screenX - v, this.c_endX = a.position2.screenX - S, this.c_dx = this.c_endX - this.c_startX, this.c_startY = a.position1.screenY, this.c_endY = b, this.c_endY <= this.c_startY) {
					this.c_dy = 0 | Math.abs(this.c_endY - this.c_startY), this.c_startW = 2 * v, this.c_dw = 2 * (S - v), this.c_dz = this._track.segmentDistance, this.c_sourceX = 0, this.c_sourceY = 0, this.c_sourceW = 512, this.c_sourceH = 1, this.c_destX = 0, this.c_destY = this.c_startY, this.c_destW = 1, this.c_destH = 1, this.c_steps = 0 | Math.min(this.c_dy, this._maxScanlines), 32 < this._maxScanlines && this.c_startY > this._height && (this.c_steps = this.c_dy), this.c_perc = 0, this.c_destHF = Math.floor(this.c_dy / this.c_steps), this.c_destHC = Math.ceil(this.c_dy / this.c_steps), this.c_mod = 1, this.c_destHC != this.c_destHF && (this.c_mod = Math.round(1 / (this.c_destHC - this.c_dy / this.c_steps))), this.c_destH = this.c_destHC, this.c_textureOffsetX = C < 7 ? 0 : 512, this.c_textureOffsetY = C < 7 ? 128 * C : 128 * (C - 7), this.c_source = this._isDrawImageUsingCanvas ? this._canvasRoad : this._imageRoad, this._context2d.globalAlpha = a.fog;
					for (var k = 0, B = this.c_steps; k < B;) {
						var P = k++;
						this.c_perc = P / this.c_steps, this.c_sourceY = 127 - Math.floor((E + this.c_perc * this.c_dz) * this.c_textureRatio) % 128, this.c_destX = this.c_startX + this.c_perc * this.c_dx | 0, P == this.c_steps - 1 && (this.c_destH = 0 | Math.max(this.c_destH, this.c_destY - this.c_endY)), this.c_destY -= this.c_destH, this.c_destY < this._height && this.c_destY > -this.c_destH && (this.c_destW = this.c_startW + this.c_perc * this.c_dw | 0, this.c_sourceH = this.c_sourceY > 128 - this.c_destH ? 1 : this.c_destH, 2048 < this.c_destW && (this.c_destX += .5 * (this.c_destW - 2048) | 0, this.c_destW = 2048), this._context2d.drawImage(this.c_source, this.c_sourceX + this.c_textureOffsetX, this.c_sourceY + this.c_textureOffsetY, this.c_sourceW, this.c_sourceH, this.c_destX, this.c_destY, this.c_destW, this.c_destH), T && this._context2d.drawImage(this.c_source, 512, 8 * this.c_sourceY % 128, this.c_sourceW, this.c_sourceH, this.c_destX, this.c_destY, this.c_destW, this.c_destH), A && this._context2d.drawImage(this.c_source, 0, 896 + (4 * this.c_sourceY + 64) % 128, this.c_sourceW, this.c_sourceH, this.c_destX + (this.c_destW * (.5 + .5 * I / 1.3) - .5 * this.c_destW | 0), this.c_destY, this.c_destW, this.c_destH)), this.c_destH = P % this.c_mod == 0 ? this.c_destHF : this.c_destHC
					}
					this._context2d.globalAlpha = 1
				}
			}
		}
		this._horizonY = r;
		for (var M, R, O = 0, $ = 0, D = 0, U = 0, N = null, L = this._isDrawImageUsingCanvas ? this._canvasScenery : this._imageScenery, F = this._isDrawImageUsingCanvas ? this._canvasCars : this._imageCars, z = 1 < (t = 1 - this._player.speedPerc / 2) ? 1 : t < .975 ? .975 : t, d = 0, g = c; d < g;) {
			for (O = c - d++, k = 0, B = (a = this._track.segments[(s.index + O) % this._track.segments.length]).scenery; k < B.length;) {
				p = B[k];
				if (++k, $ = a.position1.screenScale, D = a.position1.screenX + $ * p.offset * this._roadWidth * (.5 * this._width), U = a.position1.screenY, N = p.sprite, R = L, p.isAfterburner) {
					if (!this._isLensEffectsEnabled) continue;
					if (p.life *= z, p.life < .2) {
						HxOverrides.remove(a.scenery, p);
						continue
					}
					M = Math.pow(p.perc, 1.2), D = rch_game_Util.interpolate(D, a.position2.screenX + a.position2.screenScale * p.offset * this._roadWidth * (.5 * this._width), M), U = rch_game_Util.interpolate(a.position1.screenY, a.position2.screenY, M)
				}
				p.isCoin && (R = F, N = this._coinSprites[(this._updates + p.seed) % 32]), this._drawSprite(R, N, $ * p.scale, D, U, -.5, -1, a.clip, a.fog, p.isAdd, p.life, N.isRotated ? this._cameraRotation : 0)
			}
			R = F;
			for (var j = 0, H = a.cars; j < H.length;) {
				P = H[j];
				++j, M = Math.pow(P.percent, .8), $ = rch_game_Util.interpolate(a.position1.screenScale, a.position2.screenScale, M), D = rch_game_Util.interpolate(a.position1.screenX, a.position2.screenX, M) + $ * P.offset * this._roadWidth * (.5 * this._width), U = rch_game_Util.interpolate(a.position1.screenY, a.position2.screenY, M), N = this._getCarSprite(P.type, -(((D - this._width / 2) * $ * 4e3 - 5 * a.curve) / (.125 * this._width))), this._drawSprite(R, N, .8 * $, D, U, -.5, -1, a.clip, a.fog, !1, 1)
			}
			a == this._player.segment && this._drawPlayer(R)
		}
		this._cameraRotation = .925 * this._cameraRotation + .075 * (-.125 * this._player.steer + a.curve * (this._track.locationVo.isBowl ? -.02 : -.01)), Math.abs(this._cameraRotation) < 1e-4 && (this._cameraRotation = 0), this._drawRotation(this._cameraRotation, u), this._isLensEffectsEnabled && (this._streaks.draw(this._context2d, this._player.isRaceComplete ? 0 : Math.min(.35 * Math.pow(this._player.speedPerc - .1, 2), .35), this._horizonY - .5 * this._height), this._lensflare.draw(this._context2d, 1024 * u, this._horizonY - 80)), this._context2dBuffer.translate(-this._camera.shake.dx, -this._camera.shake.dy)
	},
	_drawSprite: function(e, t, s, i, r, n, _, a, o, c, h, l) {
		null == l && (l = 0), null == h && (h = 1), null == c && (c = !1), null == o && (o = 1), null == a && (a = 0), null == _ && (_ = 0), null == n && (n = 0), .0015 < s || (this.c_destW = Math.round(t.w * s * this._width * .5 * (.003 * this._roadWidth)), this.c_destH = Math.round(t.h * s * this._width * .5 * (.003 * this._roadWidth)), 768 < this.c_destW || 768 < this.c_destH || (i = (i + this.c_destW * (n * (t.isFlip ? -1 : 1))) * (t.isFlip ? -1 : 1), r += this.c_destH * _, this.c_clipH = Math.round(Math.max(0, r + this.c_destH - a + 1)), 0 == a && (this.c_clipH = 0), this.c_tx = i + .5 * this.c_destW, this.c_ty = r + .5 * this.c_destH, this.c_clipH < this.c_destH && (this._context2d.globalAlpha = Math.pow(o, .4) * h, c && (this._context2d.globalCompositeOperation = "lighter"), t.isFlip && this._context2d.scale(-1, 1), 0 != l && (this._context2d.translate(this.c_tx, this.c_ty), this._context2d.rotate(t.isFlip ? -l : l), this._context2d.translate(-this.c_tx, -this.c_ty)), this._context2d.drawImage(e, t.x, t.y, t.w, t.h - t.h * this.c_clipH / this.c_destH, i, r, this.c_destW, this.c_destH - this.c_clipH), 0 != l && (this._context2d.translate(this.c_tx, this.c_ty), this._context2d.rotate(t.isFlip ? l : -l), this._context2d.translate(-this.c_tx, -this.c_ty)), t.isFlip && this._context2d.scale(-1, 1), c && (this._context2d.globalCompositeOperation = "source-over"), this._context2d.globalAlpha = 1)))
	},
	_drawGround: function(e) {
		null == e && (e = 0);
		var t = Math.round(Math.min(e, 224));
		this._context2d.fillStyle = this._track.locationVo.bgColor, this._context2d.fillRect(0, t, this._width, this._height - t)
	},
	_drawHorizon: function(e, t) {
		null == t && (t = 0), null == e && (e = 0);
		var s = Math.round(1024 * e),
			i = Math.round(Math.min(t, 224));
		this._context2d.clearRect(0, 0, this._width, this._height), this._context2d.fillStyle = this._horizonPattern, this._context2d.translate(s, i), this._context2d.fillRect(-s, -i, this._width, i), this._context2d.translate(-s, -i), this._context2d.fillStyle = this._track.locationVo.bgColor, this._context2d.fillRect(0, i, this._width, this._height - i)
	},
	_drawRotation: function(e, t, s) {
		null == s && (s = 120), null == e && (e = 0), .35 < e ? e = .35 : e < -.35 && (e = -.35);
		var i = .5 * this._width,
			r = .75 * this._height;
		this._context2dBuffer.clearRect(0, 0, this._width, this._height), this._context2dBuffer.drawImage(this._context.cacheCanvas, 0, 0);
		var n = this._canvasBuffer;
		this._track.locationVo.isHorizonBanked && this._drawHorizon(t, this._horizonY), 0 != e ? (this._context2d.translate(i, r), this._context2d.rotate(-e), this._context2d.translate(-i, -r), this._context2d.drawImage(n, 0, 0, this._width, this._height, 0, 0, this._width, this._height), this._context2d.drawImage(n, 0, 0, this._width, 1, 0, 1 - s, this._width, s), this._context2d.drawImage(n, 0, this._height - 1, this._width, 1, 0, this._height - 1, this._width, s), this._context2d.drawImage(n, 1, 0, 1, this._height, 2 - s, 0, s, this._height), this._context2d.drawImage(n, this._width - 1, 0, 1, this._height, this._width - 1, 0, s, this._height), this._context2d.drawImage(n, 0, 0, 1, 1, -s, -s, s, s), this._context2d.drawImage(n, this._width - 1, 0, 1, 1, this._width, -s, s, s), this._context2d.drawImage(n, 0, this._height - 1, 1, 1, -s, this._height - 1, s, s), this._context2d.drawImage(n, this._width - 1, this._height - 1, 1, 1, this._width, this._height - 1, s, s), this._context2d.translate(i, r), this._context2d.rotate(e), this._context2d.translate(-i, -r)) : this._context2d.drawImage(n, 0, 0, this._width, this._height, 0, 0, this._width, this._height)
	},
	_drawPlayer: function(e) {
		var t = this._camera.depth / this._player.z,
			s = .5 * this._width,
			i = .5 * this._height - t * rch_game_Util.interpolate(this._player.segment.position1.cameraY, this._player.segment.position2.cameraY, this._player.percent) * (.5 * this._height),
			r = this._player.steer,
			n = (this._player.isOffroad ? 4 : 2) * Math.random() * this._player.speedPerc * this._resolution * (Math.random() < .5 ? -1 : 1);
		this._drawSprite(e, this._getCarSprite(rch_game_ECar.CAR_A, r), .8 * t, s, i + n, -.5, -1, 0, 1, !1, 1, -.1 * this._player.steer * this._player.speedPerc)
	},
	_getCarSprite: function(e, t) {
		var s, i = {
			x: 0,
			y: 0,
			w: 200,
			h: 110,
			isFlip: !1,
			isRotated: !1
		};
		switch (t < -.1 && (i.y = 880), t < -.3 && (i.y = 770), t < -.5 && (i.y = 660), t < -.8 && (i.y = 550), .1 < t && (i.y = 110), .3 < t && (i.y = 220), .5 < t && (i.y = 330), .8 < t && (i.y = 440), e._hx_index) {
			case 0:
				s = 0;
				break;
			case 1:
				s = 200;
				break;
			case 2:
				s = 400;
				break;
			case 3:
				s = 600;
				break;
			case 4:
				s = 800
		}
		return i.x = s, i
	},
	__class__: rch_game_Renderer
});
var rch_game_Scenery = function(e, t, s, i, r) {
	null == i && (i = 1), null == s && (s = 0), this.configure(e, t, s, i, r), this.seed = Std.random(32)
};
$hxClasses["rch.game.Scenery"] = rch_game_Scenery, rch_game_Scenery.__name__ = "rch.game.Scenery", rch_game_Scenery.prototype = {
	_getWidth: function() {
		return 0
	},
	_getScale: function() {
		switch (this.type._hx_index) {
			case 1:
				return 2;
			case 2:
				return .9;
			case 3:
			case 4:
			case 5:
			case 6:
				return 2.6;
			case 7:
				return 4 * Math.pow(Math.random(), .1);
			case 8:
			case 9:
				return 4 * Math.pow(Math.random(), .2);
			case 10:
			case 11:
				return 2;
			case 12:
				return 1.5;
			case 15:
				return 3.5;
			case 16:
			case 17:
				return 1.25;
			case 18:
			case 19:
				return 8;
			case 20:
			case 21:
				return 3;
			case 22:
			case 23:
				return 1.4;
			default:
				return 1
		}
	},
	_getSprite: function() {
		var e = Math.random() < .5;
		switch (this.type._hx_index) {
			case 0:
			case 1:
				return {
					x: 0,
					y: 0,
					w: 32,
					h: 42,
					isFlip: !1,
					isRotated: !1
				};
			case 2:
				return {
					x: 705 + 128 * Std.random(2),
					y: 257 + 128 * Std.random(2),
					w: 126,
					h: 126,
					isFlip: !1,
					isRotated: !1
				};
			case 3:
				return {
					x: 512,
					y: 32,
					w: 256,
					h: 224,
					isFlip: !1,
					isRotated: !1
				};
			case 4:
				return {
					x: 768,
					y: 32,
					w: 256,
					h: 224,
					isFlip: !1,
					isRotated: !1
				};
			case 5:
				return {
					x: 0,
					y: 32,
					w: 256,
					h: 224,
					isFlip: !1,
					isRotated: !1
				};
			case 6:
				return {
					x: 256,
					y: 32,
					w: 256,
					h: 224,
					isFlip: !1,
					isRotated: !1
				};
			case 7:
				return {
					x: 1,
					y: 256,
					w: 190,
					h: 256,
					isFlip: e,
					isRotated: !1
				};
			case 8:
				return {
					x: 193,
					y: 256,
					w: 190,
					h: 256,
					isFlip: e,
					isRotated: !1
				};
			case 9:
				return {
					x: 385,
					y: 256,
					w: 190,
					h: 256,
					isFlip: e,
					isRotated: !1
				};
			case 10:
				return {
					x: 577,
					y: 256,
					w: 62,
					h: 256,
					isFlip: !1,
					isRotated: !1
				};
			case 11:
				return {
					x: 641,
					y: 256,
					w: 62,
					h: 256,
					isFlip: !1,
					isRotated: !1
				};
			case 12:
				return {
					x: 960,
					y: 256 + 64 * Std.random(2),
					w: 64,
					h: 64,
					isFlip: !1,
					isRotated: !1
				};
			case 13:
				return {
					x: 960,
					y: 384,
					w: 64,
					h: 64,
					isFlip: !1,
					isRotated: !1
				};
			case 14:
				return {
					x: 960,
					y: 448,
					w: 64,
					h: 64,
					isFlip: !1,
					isRotated: !1
				};
			case 15:
				return {
					x: 1,
					y: 512,
					w: 126,
					h: 512,
					isFlip: e,
					isRotated: !1
				};
			case 16:
				return {
					x: 128,
					y: 512,
					w: 128,
					h: 256,
					isFlip: !1,
					isRotated: !1
				};
			case 17:
				return {
					x: 128,
					y: 768,
					w: 128,
					h: 256,
					isFlip: !1,
					isRotated: !1
				};
			case 18:
				return {
					x: 257,
					y: 512,
					w: 254,
					h: 128,
					isFlip: !1,
					isRotated: !1
				};
			case 19:
				return {
					x: 257,
					y: 640,
					w: 254,
					h: 128,
					isFlip: !1,
					isRotated: !1
				};
			case 20:
				return {
					x: 257,
					y: 768,
					w: 254,
					h: 128,
					isFlip: !1,
					isRotated: !1
				};
			case 21:
				return {
					x: 257,
					y: 896,
					w: 254,
					h: 128,
					isFlip: !1,
					isRotated: !1
				};
			case 22:
				return {
					x: 512 + 128 * Std.random(2),
					y: 512 + 128 * Std.random(4),
					w: 128,
					h: 128,
					isFlip: !1,
					isRotated: !1
				};
			case 23:
				return {
					x: 512 + 128 * Std.random(2),
					y: 512 + 128 * Std.random(4),
					w: 128,
					h: 128,
					isFlip: !0,
					isRotated: !1
				}
		}
	},
	_getIsAdd: function() {
		return !1
	},
	configure: function(e, t, s, i, r) {
		null == i && (i = 1), null == s && (s = 0), this.offset = t, this.life = Math.min(i, 1), this.perc = s, this.owner = r, this.type != e && (this.type = e, this.scale = this._getScale(), this.width = this._getWidth(), this.isBoost = this.type == rch_game_EScenery.SCENERY_BOOST, this.isAfterburner = this.type == rch_game_EScenery.SCENERY_AFTERBURNER, this.isCoin = this.type == rch_game_EScenery.SCENERY_COIN, this.isAdd = this._getIsAdd(), this.sprite = this._getSprite())
	},
	__class__: rch_game_Scenery
};
var rch_game_Segment = function(e, t, s, i, r, n) {
	this.index = e, this.position1 = t, this.position2 = s, this.curve = i, this.texture = r, this.scenery = null != n ? n : [], this.cars = [], this.fog = 0, this.clip = 0, this.isFinishLine = !1, this.isBoost = !1, this.boostPosition = 0
};
$hxClasses["rch.game.Segment"] = rch_game_Segment, rch_game_Segment.__name__ = "rch.game.Segment", rch_game_Segment.prototype = {
	setBoost: function(e) {
		this.isBoost = !0, this.boostPosition = e
	},
	__class__: rch_game_Segment
};
var rch_game_Streaks = function(e, t, s) {
	this._TEXTURE_HEIGHT = 405, this._TEXTURE_WIDTH = 720, this._kernel = e, this._width = t, this._height = s, this._texture = this._kernel.assets.getAsset("images/Streaks.png")
};
$hxClasses["rch.game.Streaks"] = rch_game_Streaks, rch_game_Streaks.__name__ = "rch.game.Streaks", rch_game_Streaks.prototype = {
	draw: function(e, t, s) {
		var i, r, n;
		null == s && (s = 0), null == t && (t = 1), t <= .2 || (i = t * (.5 * Math.random() + .5) * 1.1, e.save(), e.globalAlpha = i, r = s, Math.random() < .5 && (e.translate(this._width, 0), e.scale(-1, 1)), Math.random() < .5 && (e.translate(0, this._height), e.scale(1, -1), r *= -1), e.translate(0, r), e.translate(.5 * this._width, .5 * this._height), n = (.5 * this._height - s) / this._height, e.scale(1, 2 * n), e.translate(.5 * -this._width, .5 * -this._height), e.scale(this._width / this._TEXTURE_WIDTH, this._height / this._TEXTURE_HEIGHT), e.drawImage(this._texture, 0, 0), e.globalAlpha = 1, e.restore())
	},
	__class__: rch_game_Streaks
};
var rch_game_Track = function(e, t) {
	this.locationVo = t, rch_AEntity.call(this, e)
};
$hxClasses["rch.game.Track"] = rch_game_Track, rch_game_Track.__name__ = "rch.game.Track", rch_game_Track.__super__ = rch_AEntity, rch_game_Track.prototype = $extend(rch_AEntity.prototype, {
	_init: function() {
		rch_AEntity.prototype._init.call(this), rch_game_Track._TOTAL_AFTERBURNERS = this._system.isDesktop ? 100 : 75, this.maxSegments = 820, this.maxSegments % 2 == 0 && this.maxSegments++, this._kernel.isDebug && (this.maxSegments = 100), this.segmentDistance = 300, this.segments = [], this._addRoad(0, 50, 0, 0, 0);
		for (var e = [], t = 0; t < 100;) var s = (d = t++) < 100 * this.locationVo.leftRatio,
			e = e.concat(s ? [rch_game_ERoad.ROAD_NONE, rch_game_ERoad.ROAD_LEFT_SHORT, rch_game_ERoad.ROAD_LEFT_MEDIUM, rch_game_ERoad.ROAD_LEFT_LONG] : [rch_game_ERoad.ROAD_NONE, rch_game_ERoad.ROAD_RIGHT_SHORT, rch_game_ERoad.ROAD_RIGHT_MEDIUM, rch_game_ERoad.ROAD_RIGHT_LONG]);
		for (this.locationVo.isBowl && (e = [rch_game_ERoad.ROAD_LEFT_LONG, rch_game_ERoad.ROAD_LEFT_MEDIUM, rch_game_ERoad.ROAD_NONE]); this.segments.length < this.maxSegments;) {
			var i = e[Std.random(e.length)],
				r = this._getRoadLength(i),
				n = this._getRoadCurve(i),
				_ = r * Math.random() * this.locationVo.hillMax;
			this.locationVo.isBowl && (n = Math.round(1.5 * n), _ = .1 * Math.abs(n * r)), this.segments.length + 2 * r < this.maxSegments ? (this.segments[this.segments.length - 10].roadType = i, this._addRoad(r, r, r, n, _)) : this._addRoad(0, this.maxSegments - this.segments.length, 0, 0, 0)
		}
		this.maxSegments = this.segments.length;
		_ = this.locationVo.isBowl ? 0 : 30 * Math.random() * .4;
		this._addRoad(0, 30, 0, 0, _);
		_ = this.locationVo.isBowl ? 0 : 30 * Math.random() * .4;
		this._addRoad(0, 30, 0, 0, _);
		_ = this.locationVo.isBowl ? 0 : 30 * Math.random() * .4;
		this._addRoad(0, 30, 0, 0, _);
		_ = this.locationVo.isBowl ? 0 : 30 * Math.random() * .4;
		this._addRoad(0, 30, 0, 0, _);
		_ = this.locationVo.isBowl ? 0 : 30 * Math.random() * .4;
		this._addRoad(0, 30, 0, 0, _);
		_ = this.locationVo.isBowl ? 0 : 30 * Math.random() * .4;
		this._addRoad(0, 30, 0, 0, _);
		_ = this.locationVo.isBowl ? 0 : 30 * Math.random() * .4;
		this._addRoad(0, 30, 0, 0, _);
		_ = this.locationVo.isBowl ? 0 : 30 * Math.random() * .4;
		this._addRoad(0, 30, 0, 0, _);
		_ = this.locationVo.isBowl ? 0 : 30 * Math.random() * .4;
		this._addRoad(0, 30, 0, 0, _);
		_ = this.locationVo.isBowl ? 0 : 30 * Math.random() * .4;
		this._addRoad(0, 30, 0, 0, _);
		for (var a = 0, o = 0, c = 0, h = 0, l = [0, 1, 2, 8, 9]; h < this.segments.length - 16;) {
			(c = a = 0 == (o = a) ? l[Std.random(l.length)] : Math.random() < .35 ? 0 : o) != o && (1 == a ? c = 4 : 2 == a ? c = 6 : 8 == a ? c = 11 : 9 == a ? c = 13 : 1 == o ? c = 3 : 2 == o ? c = 5 : 8 == o ? c = 10 : 9 == o && (c = 12));
			for (var t = h, u = h + 16; t < u;) {
				var d = t++;
				this.segments[d].texture = c
			}
			h += 16
		}
		for (t = 0, u = this.segments.length; t < u;) {
			var g = t++;
			if (10 < Math.abs(g - this.maxSegments)) {
				if (50 < g && g < this.maxSegments - 32 && g % 128 == 8) {
					var p = Math.random() - .5;
					this._addScenery(g, rch_game_EScenery.SCENERY_BOOST, p);
					for (var w = g - 2, f = 2 + g; w < f;) {
						var y = w++;
						this.segments[y].setBoost(p)
					}
				}
				25 < g && g < this.maxSegments + 120 && Math.random() < (g < this.maxSegments ? .03 : .3) && (1 < this._session.series || g > this.maxSegments) && this._addScenery(g, rch_game_EScenery.SCENERY_COIN, 2 * Math.random() - 1)
			}
			this._createDefaultScenery(this.segments[g])
		}
		this._addScenery(30, rch_game_EScenery.SCENERY_TUNNEL_LEFT, -1), this._addScenery(30, rch_game_EScenery.SCENERY_TUNNEL_RIGHT, 1), this._addScenery(this.maxSegments, rch_game_EScenery.SCENERY_FINISH_LEFT, -1), this._addScenery(this.maxSegments, rch_game_EScenery.SCENERY_FINISH_RIGHT, 1), this.segments[this.maxSegments].isFinishLine = !0, this.segments[this.maxSegments + (this.maxSegments % 2 == 0 ? 1 : -1)].isFinishLine = !0, this.totalDistance = this.maxSegments * this.segmentDistance, this._totalCars = 17, this._createCars(), this._createAfterburners()
	},
	findSegment: function(e) {
		return this.segments[Math.floor(e / this.segmentDistance) % this.segments.length]
	},
	_getRoadLength: function(e) {
		switch (e._hx_index) {
			case 0:
				return 20;
			case 1:
			case 4:
				return 20;
			case 2:
			case 5:
				return 30;
			case 3:
			case 6:
				return 50
		}
	},
	_getRoadCurve: function(e) {
		var t;
		switch (e._hx_index) {
			case 0:
				t = 0;
				break;
			case 1:
				t = -10;
				break;
			case 2:
				t = -15;
				break;
			case 3:
				t = -20;
				break;
			case 4:
				t = 10;
				break;
			case 5:
				t = 15;
				break;
			case 6:
				t = 20
		}
		return Math.round(t * (this._session.level + 3) / 5)
	},
	_addRoad: function(e, t, s, i, r) {
		null == r && (r = 0);
		for (var n = this._getLastY(), _ = n + r * this.segmentDistance, a = e + t + s, o = 0, c = e; o < c;) {
			var h = o++;
			this._addSegment(Math.round(rch_game_Util.easeIn(0, i, h / e)), rch_game_Util.easeInOut(n, _, h / a))
		}
		for (o = 0, c = t; o < c;) {
			h = o++;
			this._addSegment(i, rch_game_Util.easeInOut(n, _, (e + h) / a))
		}
		for (o = 0, c = s; o < c;) {
			h = o++;
			this._addSegment(Math.round(rch_game_Util.easeInOut(i, 0, h / s)), rch_game_Util.easeInOut(n, _, (e + t + h) / a))
		}
	},
	_addSegment: function(e, t, s) {
		null == s && (s = 0);
		var i = this.segments.length;
		this.segments.push(new rch_game_Segment(i, new rch_game_Position(this._getLastY(), i * this.segmentDistance), new rch_game_Position(t, (i + 1) * this.segmentDistance), e, s))
	},
	_getLastY: function() {
		return 0 == this.segments.length ? 0 : this.segments[this.segments.length - 1].position2.worldY
	},
	_createDefaultScenery: function(e) {
		var t, s = e.index;
		s % 2 == 0 && (t = Math.sin(s / 10) * this.locationVo.sidingDistance * .5 + this.locationVo.sidingDistance + .5, (2 < e.curve || s > this.maxSegments || s < 50) && this._addScenery(s, rch_game_EScenery.SCENERY_SIDING_LEFT, -t), (this.locationVo.isBowl || e.curve < -2 || s > this.maxSegments || s < 50) && this._addScenery(s, rch_game_EScenery.SCENERY_SIDING_RIGHT, t)), (i = Math.random()) < .1 && e.curve > (this.locationVo.isBowl ? -2 : 2) && this._addScenery(s, rch_game_EScenery.SCENERY_TIRE, -1.35), (i = Math.random()) < .1 && e.curve < (this.locationVo.isBowl ? 2 : -2) && this._addScenery(s, rch_game_EScenery.SCENERY_TIRE, 1.35);
		var i = Math.random();
		s % 8 == 3 && (s < 50 || i < .2) && ((s < 50 || e.curve < -2) && this._addScenery(s, rch_game_EScenery.SCENERY_BANNER_LEFT, -1.25), (s < 50 || 2 < e.curve) && this._addScenery(s, rch_game_EScenery.SCENERY_BANNER_RIGHT, 1.25));
		var r, i = Math.random();
		50 < s && s % 32 == 0 && i < .4 && (this._addScenery(s, rch_game_EScenery.SCENERY_TUNNEL_LEFT, -1), this._addScenery(s, rch_game_EScenery.SCENERY_TUNNEL_RIGHT, 1)), Math.abs(Math.sin(s / 50)) < this.locationVo.treeDensity && (Math.random() < .0125 && this._addScenery(s, rch_game_EScenery.SCENERY_TALL, 2 * Math.random() + 2), Math.random() < .0125 && this._addScenery(s, rch_game_EScenery.SCENERY_TALL, -(2 * Math.random() + 2)), i = Math.random(), s % 2 == 0 && i < (this._system.isDesktop ? 1 : .5) * (this.locationVo.isBowl ? .5 : 1) && Math.abs(Math.sin(s / 100)) < this.locationVo.treeDensity && (null != (r = this.locationVo.trees[Std.random(this.locationVo.trees.length)]) && (this.locationVo.isBowl ? this._addScenery(s, r, 3 * Math.random() + this.locationVo.sidingDistance + .5) : this._addScenery(s, r, (Math.random() < .5 ? -1 : 1) * (2 * Math.random() + 1.75)))));
		var n, _, i = Math.random();
		s % 2 == 1 && i < (this._system.isDesktop ? .25 : .05) && (n = [rch_game_EScenery.SCENERY_MOUND_1, rch_game_EScenery.SCENERY_MOUND_2, rch_game_EScenery.SCENERY_WIDE_1, rch_game_EScenery.SCENERY_WIDE_2][Std.random(4)], this._addScenery(s, n, (Math.random() < .5 ? -1 : 1) * (5 * Math.random() + 5))), s % 2 == 0 && i < (this._system.isDesktop ? .75 : .35) && (_ = Math.random() < .5, this._addScenery(s, _ ? rch_game_EScenery.SCENERY_CROWD_LEFT : rch_game_EScenery.SCENERY_CROWD_RIGHT, (_ ? -1 : 1) * (.25 * Math.random() + 1.5))), s % 2 == 0 && (s < 50 || i < .2) && this._addScenery(s, Math.random() < .5 ? rch_game_EScenery.SCENERY_CONE_1 : rch_game_EScenery.SCENERY_CONE_2, (Math.random() < .5 ? -1 : 1) * (.25 * Math.random() + 1.2))
	},
	_addScenery: function(e, t, s) {
		this.segments[e].scenery.push(new rch_game_Scenery(t, s))
	},
	_createCars: function() {
		this.cars = [];
		for (var e = Std.random(3) + 2, t = 0, s = this._totalCars; t < s;) {
			var i, r = t++,
				n = 1 - r / this._totalCars,
				_ = Math.ceil(50 * n * 2 * this.segmentDistance);
			switch (r % 3) {
				case 0:
					i = 0;
					break;
				case 2:
					i = .5;
					break;
				default:
					i = -.5
			}
			var a = [rch_game_ECar.CAR_B, rch_game_ECar.CAR_C, rch_game_ECar.CAR_D, rch_game_ECar.CAR_E][Std.random(4)],
				o = .9 * Math.pow(Math.random(), Math.max(.1, n)) + .1,
				c = .9 * Math.pow(Math.pow(Math.random(), .5), Math.max(.1, n)) + .265,
				h = (this._tools, this._session.getPercentageComplete()),
				l = o * (1 - h) + c * h;
			r % e == 0 && (l = .7 * Math.pow(n, Math.max(.3, n)) + .3), 0 == r && (l = 1), 1 == r && (l = .99);
			var u = new rch_game_Car(a, i, _, l);
			this.findSegment(_).cars.push(u), this.cars.push(u)
		}
	},
	_createAfterburners: function() {
		this._afterburners = [];
		for (var e = 0, t = rch_game_Track._TOTAL_AFTERBURNERS; e < t;) {
			e++;
			var s = new rch_game_Scenery(rch_game_EScenery.SCENERY_AFTERBURNER, 0, 0);
			this._afterburners.push(s)
		}
		this._afterburnerIndex = 0
	},
	getNextAfterburner: function() {
		return this._afterburners[this._afterburnerIndex++ % rch_game_Track._TOTAL_AFTERBURNERS]
	},
	__class__: rch_game_Track
});
var rch_game_Util = function() {};
$hxClasses["rch.game.Util"] = rch_game_Util, rch_game_Util.__name__ = "rch.game.Util", rch_game_Util.percentRemaining = function(e, t) {
	return e % t / t
}, rch_game_Util.accelerate = function(e, t, s) {
	return e + t * s
}, rch_game_Util.interpolate = function(e, t, s) {
	return e + (t - e) * s
}, rch_game_Util.easeIn = function(e, t, s) {
	return e + (t - e) * Math.pow(s, 2)
}, rch_game_Util.easeInOut = function(e, t, s) {
	return e + (t - e) * (-Math.cos(s * Math.PI) / 2 + .5)
}, rch_game_Util.overlap = function(e, t, s, i, r) {
	null == r && (r = 1);
	var n = r / 2;
	return !(e + t * n < s - i * n || s + i * n < e - t * n)
};
var rch_gui_AGuiEntity = function(e, t, s, i) {
	null == i && (i = !1), null == s && (s = 100), null == t && (t = 100), this._assets = js_Boot.__cast(e.assets, rch_AssetManager), this._factory = js_Boot.__cast(e.factory, rch_Factory), this._session = js_Boot.__cast(e.get_session(), rch_Session), this._system = e.system, awe6_core_drivers_createjs_extras_gui_GuiEntity.call(this, e, t, s, i)
};
$hxClasses["rch.gui.AGuiEntity"] = rch_gui_AGuiEntity, rch_gui_AGuiEntity.__name__ = "rch.gui.AGuiEntity", rch_gui_AGuiEntity.__super__ = awe6_core_drivers_createjs_extras_gui_GuiEntity, rch_gui_AGuiEntity.prototype = $extend(awe6_core_drivers_createjs_extras_gui_GuiEntity.prototype, {
	__class__: rch_gui_AGuiEntity
});
var rch_gui_Image = function(e, t, s, i) {
	null == i && (i = 1), null == s && (s = !1), this._imageElement = t, this._isAdd = s, rch_gui_AGuiEntity.call(this, e, this._imageElement.width, this._imageElement.height, !1), this.set_alpha(i)
};
$hxClasses["rch.gui.Image"] = rch_gui_Image, rch_gui_Image.__name__ = "rch.gui.Image", rch_gui_Image.__super__ = rch_gui_AGuiEntity, rch_gui_Image.prototype = $extend(rch_gui_AGuiEntity.prototype, {
	_init: function() {
		rch_gui_AGuiEntity.prototype._init.call(this), this._context.mouseEnabled = !1, this._bitmap = new createjs.Bitmap(this._imageElement), this._context.addChild(this._bitmap), this._bitmap.compositeOperation = this._isAdd ? "lighter" : "source-over"
	},
	set_alpha: function(e) {
		return this._bitmap.alpha = e
	},
	__class__: rch_gui_Image,
	__properties__: $extend(rch_gui_AGuiEntity.prototype.__properties__, {
		set_alpha: "set_alpha"
	})
});
var rch_gui_Bg = function(e, t, s) {
	null == s && (s = !1), this._imageData = t, this._isFlare = s, rch_gui_Image.call(this, e, e.assets.getAsset("images/SceneBg.png"), !1)
};
$hxClasses["rch.gui.Bg"] = rch_gui_Bg, rch_gui_Bg.__name__ = "rch.gui.Bg", rch_gui_Bg.__super__ = rch_gui_Image, rch_gui_Bg.prototype = $extend(rch_gui_Image.prototype, {
	_init: function() {
		rch_gui_Image.prototype._init.call(this), this._image = new createjs.Bitmap(this._imageData), this._context.addChild(this._image), this._isFlare && (this.addEntity(this._flare1 = new rch_gui_Flare(this._kernel), null, !0, 10), this.addEntity(this._flare2 = new rch_gui_Flare(this._kernel), null, !0, 10), this._flare2.setPosition(-250, 30)), this.isActive && !this.isDisposed && (this._age += 0, this._updates++, this._updater(0))
	},
	_updater: function(e) {
		null == e && (e = 0), rch_gui_Image.prototype._updater.call(this, e);
		var t = 10 * Math.sin(this._kernel.scenes._age / 1e3) - 10;
		this._image.x = t, this._isFlare && (this._flare1.configure(.15 * t + 870, 150), this._flare2.configure(.1 * t + 874, 150))
	},
	__class__: rch_gui_Bg
});
var rch_gui_BlankButton = function(e, t, s, i, r, n, _, a, o) {
	null == r && (r = 0), null == i && (i = 0);
	var c = new awe6_core_drivers_flash_View(e),
		h = new awe6_core_drivers_flash_View(e);
	awe6_core_BasicButton.call(this, e, c, h, t, s, i, r, n, _, a, o)
};
$hxClasses["rch.gui.BlankButton"] = rch_gui_BlankButton, rch_gui_BlankButton.__name__ = "rch.gui.BlankButton", rch_gui_BlankButton.__super__ = awe6_core_BasicButton, rch_gui_BlankButton.prototype = $extend(awe6_core_BasicButton.prototype, {
	_updater: function(e) {
		null == e && (e = 0);
		var t = this.get_view().context.localToGlobal(0, 0);
		this.get_view().globalX = t.x, this.get_view().globalY = t.y, awe6_core_BasicButton.prototype._updater.call(this, e)
	},
	__class__: rch_gui_BlankButton
});
var rch_gui_Button = function(e, t, s, i, r, n, _, a) {
	null == i && (i = 0), null == s && (s = 0), null == t && (t = ""), this._assets = e.assets, this._factory = e.factory, this._title = t.toUpperCase(), awe6_core_BasicButton.call(this, e, this._assets.get_buttonUp(), this._assets.get_buttonOver(), 200, 65, s, i, r, n, _, a)
};
$hxClasses["rch.gui.Button"] = rch_gui_Button, rch_gui_Button.__name__ = "rch.gui.Button", rch_gui_Button.__super__ = awe6_core_BasicButton, rch_gui_Button.prototype = $extend(awe6_core_BasicButton.prototype, {
	_init: function() {
		awe6_core_BasicButton.prototype._init.call(this);
		var e = this.width - 10,
			t = this.height - 18,
			s = this._kernel.factory.createTextStyle(awe6_interfaces_ETextStyle.BUTTON);
		this._textUp = new rch_gui_Text(this._kernel, e, t, this._title, s);
		s = this._kernel.factory.createTextStyle(awe6_interfaces_ETextStyle.BUTTON);
		this._textOver = new rch_gui_Text(this._kernel, e, t, this._title, s), this._textUp.set_x(this._textOver.set_x(5)), this._textUp.set_y(this._textOver.set_y(18)), this._stateUp.addEntity(this._textUp, null, !0, 2), this._stateOver.addEntity(this._textOver, null, !0, 2)
	},
	setTitle: function(e) {
		this._title != e && (this._title = e.toUpperCase(), this._textUp.set_text(this._textOver.set_text(this._title)))
	},
	onRollOver: function() {
		awe6_core_BasicButton.prototype.onRollOver.call(this), this._kernel.audio.start("ButtonOver", awe6_interfaces_EAudioChannel.INTERFACE, 0, 0, .25)
	},
	__class__: rch_gui_Button
});
var rch_gui_ButtonIcon = function(e, t, s, i, r, n, _, a) {
	null == i && (i = 0), null == s && (s = 0), null == t && (t = !1), this._isFacebook = t, this._assets = e.assets, this._factory = e.factory, awe6_core_BasicButton.call(this, e, this._isFacebook ? this._assets.get_buttonFacebookUp() : this._assets.get_buttonTwitterUp(), this._isFacebook ? this._assets.get_buttonFacebookOver() : this._assets.get_buttonTwitterOver(), 65, 65, s, i, r, n, _, a)
};
$hxClasses["rch.gui.ButtonIcon"] = rch_gui_ButtonIcon, rch_gui_ButtonIcon.__name__ = "rch.gui.ButtonIcon", rch_gui_ButtonIcon.__super__ = awe6_core_BasicButton, rch_gui_ButtonIcon.prototype = $extend(awe6_core_BasicButton.prototype, {
	_init: function() {
		awe6_core_BasicButton.prototype._init.call(this)
	},
	onRollOver: function() {
		awe6_core_BasicButton.prototype.onRollOver.call(this), this._kernel.audio.start("ButtonOver", awe6_interfaces_EAudioChannel.INTERFACE, 0, 0, .25)
	},
	__class__: rch_gui_ButtonIcon
});
var rch_gui_ButtonSmall = function(e, t, s, i, r, n, _, a) {
	null == i && (i = 0), null == s && (s = 0), null == t && (t = ""), this._assets = e.assets, this._factory = e.factory, awe6_core_BasicButton.call(this, e, this._assets.get_buttonSmallUp(), this._assets.get_buttonSmallOver(), 100, 30, s, i, r, n, _, a), this.setTitle(t)
};
$hxClasses["rch.gui.ButtonSmall"] = rch_gui_ButtonSmall, rch_gui_ButtonSmall.__name__ = "rch.gui.ButtonSmall", rch_gui_ButtonSmall.__super__ = awe6_core_BasicButton, rch_gui_ButtonSmall.prototype = $extend(awe6_core_BasicButton.prototype, {
	_init: function() {
		awe6_core_BasicButton.prototype._init.call(this);
		var e = this.width - 10,
			t = this.height - 7,
			s = this._kernel.factory.createTextStyle(awe6_interfaces_ETextStyle.BUTTON);
		s.size = 12, this._textUp = new rch_gui_Text(this._kernel, e, t, this._title, s), (s = this._kernel.factory.createTextStyle(awe6_interfaces_ETextStyle.BUTTON)).size = 12, s.color = this._factory.COLOR_GREY, this._textOver = new rch_gui_Text(this._kernel, e, t, this._title, s), this._textUp.set_x(this._textOver.set_x(5)), this._textUp.set_y(this._textOver.set_y(7)), this._stateUp.addEntity(this._textUp, null, !0, 2), this._stateOver.addEntity(this._textOver, null, !0, 2)
	},
	_updater: function(e) {
		null == e && (e = 0);
		var t = this.get_view().context.localToGlobal(0, 0);
		this.get_view().globalX = t.x, this.get_view().globalY = t.y, awe6_core_BasicButton.prototype._updater.call(this, e)
	},
	setTitle: function(e) {
		this._title = e, this._title = this._title.toUpperCase(), this._textUp.set_text(this._title), this._textOver.set_text(this._title)
	},
	onRollOver: function() {
		awe6_core_BasicButton.prototype.onRollOver.call(this), this._kernel.audio.start("ButtonOver", awe6_interfaces_EAudioChannel.INTERFACE, 0, 0, .25)
	},
	onClick: function() {
		awe6_core_BasicButton.prototype.onClick.call(this), this.isOver = !1
	},
	__class__: rch_gui_ButtonSmall
});
var rch_gui_Coins = function(e, t) {
	null == t && (t = !0), this._isAnimated = t, rch_gui_AGuiEntity.call(this, e, 120, 32, !1)
};
$hxClasses["rch.gui.Coins"] = rch_gui_Coins, rch_gui_Coins.__name__ = "rch.gui.Coins", rch_gui_Coins.__super__ = rch_gui_AGuiEntity, rch_gui_Coins.prototype = $extend(rch_gui_AGuiEntity.prototype, {
	_init: function() {
		var e = this;
		rch_gui_AGuiEntity.prototype._init.call(this), this._displayValue = this._prevCoins = this._session.coins, this._isAnimated ? (this._bitmap = new createjs.Bitmap(this._assets.getAsset("images/Cars.png")), this._bitmap.sourceRect = new createjs.Rectangle(0, 992, 32, 32), this._bitmap.y = 3) : (this._bitmap = new createjs.Bitmap(this._assets.getAsset("images/HudProgress.png")), this._bitmap.sourceRect = new createjs.Rectangle(160, 80, 32, 32), this._bitmap.cache(0, 0, 32, 32)), this._bitmap.x = this.width - 32, this._context.addChild(this._bitmap), this._text = new rch_gui_Text(this._kernel, this.width - 32 - 5, 35, Std.string(this._displayValue), this._factory.createTextStyle(this._factory.TEXTSTYLE_HUD_COINS)), this._text.setPosition(.85 * this._text.width - 10, .5 * this._text.height + 1), this._text._context.regX = .85 * this._text.width, this._text._context.regY = .5 * this._text.height, this._session.get_isTester() && this.addEntity(new rch_gui_BlankButton(this._kernel, 0 | this.width, 0 | this.height, 0, 0, null, function() {
			e._session.coins += 100
		}), null, !0, 10), this.addEntity(this._text, null, !0, 1)
	},
	_updater: function(e) {
		null == e && (e = 0);
		var t, s = this;
		rch_gui_AGuiEntity.prototype._updater.call(this, e), this._isAnimated && (this._bitmap.sourceRect.x = this._updates % 32 * 32), this._age < 3e3 || (this._prevCoins != this._session.coins && (this._kernel.audio.start("Coin", awe6_interfaces_EAudioChannel.INTERFACE, 0, 0, .65, null, !1), null != this._tweezer && ((t = this._tweezer).isDisposed || (t.isDisposed = !0, t.set_isActive(!1), t._disposer())), this.addEntity(this._tweezer = new tweezer_Tweezer(this._kernel, function(e) {
			s._text._context.scaleX = s._text._context.scaleY = e
		}, 1.75, 1, 0, 1e3, null, tweezer_EEase.EASE_OUT, tweezer_ETween.QUARTIC))), this._prevCoins = this._session.coins, this._displayValue != this._session.coins && (this._displayValue = Math.round(.8 * this._displayValue + .2 * this._session.coins), Math.abs(this._displayValue - this._session.coins) < 5 && (this._displayValue = this._session.coins), this._text.set_text(Std.string(this._displayValue))))
	},
	__class__: rch_gui_Coins
});
var rch_gui_Countdown = function(e, t, s, i, r) {
	this._delay = t, this._duration = s, this._text = i, this._callback = r, rch_AEntity.call(this, e)
};
$hxClasses["rch.gui.Countdown"] = rch_gui_Countdown, rch_gui_Countdown.__name__ = "rch.gui.Countdown", rch_gui_Countdown.__super__ = rch_AEntity, rch_gui_Countdown.prototype = $extend(rch_AEntity.prototype, {
	_updater: function(e) {
		null == e && (e = 0), rch_AEntity.prototype._updater.call(this, e);
		var t, s = (this._age - this._delay) / this._duration,
			i = 1 < s ? 1 : s < 0 ? 0 : s;
		0 < i && (t = (t = Std.string(this._kernel.getConfig("gui.buttons.countdown")) + " " + Math.ceil((this._duration - this._age + this._delay) / 1e3)).toUpperCase(), this._text.set_text(t)), 1 == i && (null != this._callback && this._callback(), this.isDisposed || (this.isDisposed = !0, this.set_isActive(!1), this._disposer()))
	},
	__class__: rch_gui_Countdown
});
var rch_gui_Flare = function(e) {
	rch_gui_AGuiEntity.call(this, e, e.factory.width, e.factory.height, !1)
};
$hxClasses["rch.gui.Flare"] = rch_gui_Flare, rch_gui_Flare.__name__ = "rch.gui.Flare", rch_gui_Flare.__super__ = rch_gui_AGuiEntity, rch_gui_Flare.prototype = $extend(rch_gui_AGuiEntity.prototype, {
	_init: function() {
		rch_gui_AGuiEntity.prototype._init.call(this), this._lensflare = new rch_game_Lensflare(this._kernel, 0 | this.width, 0 | this.height, 2, 16), this._context.cache(0, 0, this.width, this.height);
		var e = this._context.cacheCanvas;
		this._context2d = e.getContext("2d", null), this._context.compositeOperation = "lighter"
	},
	configure: function(e, t) {
		var s = e,
			i = t;
		this._context2d.clearRect(0, 0, this.width, this.height), this._lensflare.draw(this._context2d, s, i)
	},
	__class__: rch_gui_Flare
});
var rch_gui_Hud = function(e) {
	rch_gui_AGuiEntity.call(this, e, e.factory.width, e.factory.height, !1)
};
$hxClasses["rch.gui.Hud"] = rch_gui_Hud, rch_gui_Hud.__name__ = "rch.gui.Hud", rch_gui_Hud.__super__ = rch_gui_AGuiEntity, rch_gui_Hud.prototype = $extend(rch_gui_AGuiEntity.prototype, {
	_init: function() {
		var t = this;
		rch_gui_AGuiEntity.prototype._init.call(this);
		var e = new createjs.Bitmap(this._assets.getAsset("images/Hud.png"));
		this._context.addChild(e), this._coins = new rch_gui_Coins(this._kernel, !1), this.addEntity(this._coins, null, !0, 10), this._coins.setPosition(30, 12), this.addEntity(this._score = new rch_gui_Text(this._kernel, 60, 35, "", this._factory.createTextStyle(this._factory.TEXTSTYLE_HUD_SCORE), !1, !1, 1), null, !0, 10), this._score.setPosition(.35 * this._score.width + 570, .5 * this._score.height + 13), this._score._context.regX = .35 * this._score.width, this._score._context.regY = .5 * this._score.height, this.addEntity(this._message = new rch_gui_Text(this._kernel, this.width, 50, "", this._factory.createTextStyle(this._factory.TEXTSTYLE_HUD_MESSAGE), !1, !1, 10), null, !0, 10), this._message.setPosition(0, this._factory.height / 2 - 65), this._message.get_view().set_isVisible(!1), this.addEntity(this._instructions = new rch_gui_Image(this._kernel, this._assets.getAsset(this._system.isDesktop ? "images/InstructionsA.png" : "images/InstructionsB.png"), !1, this._instructionsAlpha), null, this._session.getPercentageComplete() < .1, 9), this._instructions.setPosition((this._factory.width - 300) / 2, this._factory.height - 200), this.addEntity(this._progress = new rch_gui_HudProgress(this._kernel), null, !0, 10), this._progress.setPosition((this._kernel.factory.width - this._progress.width) / 2, 9), this.configureScore(18);

		function s(e) {
			t._instructions.set_y(e)
		}
		this.addEntity(new tweezer_Tweezer(this._kernel, s, this._factory.height, this._instructions.y, 0, 1e3, 1e3, tweezer_EEase.EASE_OUT, tweezer_ETween.QUARTIC, function() {
			t.addEntity(new tweezer_Tweezer(t._kernel, s, t._instructions.y, t._factory.height, 0, 1e3, 0, tweezer_EEase.EASE_IN, tweezer_ETween.BACK(), function() {
				t._instructions.get_view().set_isVisible(!1)
			}))
		})), this.addEntity(new tweezer_Tweezer(this._kernel, function(e) {
			t._progress.set_y(e)
		}, -this._progress.height, this._progress.y, 4e3, 1e3, 0, tweezer_EEase.EASE_OUT, tweezer_ETween.QUARTIC)), this.addEntity(new tweezer_Tweezer(this._kernel, function(e) {
			t._score.set_y(e)
		}, -this._progress.height, this._score.y, 4e3, 1e3, 0, tweezer_EEase.EASE_OUT, tweezer_ETween.QUARTIC)), this.addEntity(new tweezer_Tweezer(this._kernel, function(e) {
			t._coins.set_y(e)
		}, -this._progress.height, this._coins.y, 4e3, 1e3, 0, tweezer_EEase.EASE_OUT, tweezer_ETween.QUARTIC))
	},
	_updater: function(e) {
		null == e && (e = 0), rch_gui_AGuiEntity.prototype._updater.call(this, e)
	},
	configureScore: function(e) {
		var t, s = this;
		if (this._prevScore != e) {
			switch (this._prevScore = e) {
				case 1:
					t = "st";
					break;
				case 2:
					t = "nd";
					break;
				case 3:
					t = "rd";
					break;
				default:
					t = "th"
			}
			var i, r = (r = e + t).toUpperCase();
			this._score.set_text(r), null != this._scoreTweezer && ((i = this._scoreTweezer).isDisposed || (i.isDisposed = !0, i.set_isActive(!1), i._disposer())), this.addEntity(this._scoreTweezer = new tweezer_Tweezer(this._kernel, function(e) {
				s._score._context.scaleX = s._score._context.scaleY = e
			}, 1.75, 1, 0, 1e3, null, tweezer_EEase.EASE_OUT, tweezer_ETween.QUARTIC))
		}
	},
	configureProgress: function(e) {
		this._progress.configure(e)
	},
	configureMessage: function(e) {
		var t = this;
		e = e.toUpperCase(), this.addEntity(new tweezer_Tweezer(this._kernel, function(e) {
			t._message.set_y(e)
		}, this._factory.height, this._message.y, 0, 2e3, 0, tweezer_EEase.EASE_OUT, tweezer_ETween.ELASTIC())), this._message.set_text(e), this._message.get_view().set_isVisible(!0)
	},
	__class__: rch_gui_Hud
});
var rch_gui_HudProgress = function(e) {
	rch_gui_AGuiEntity.call(this, e, 420, 40, !1)
};
$hxClasses["rch.gui.HudProgress"] = rch_gui_HudProgress, rch_gui_HudProgress.__name__ = "rch.gui.HudProgress", rch_gui_HudProgress.__super__ = rch_gui_AGuiEntity, rch_gui_HudProgress.prototype = $extend(rch_gui_AGuiEntity.prototype, {
	_init: function() {
		rch_gui_AGuiEntity.prototype._init.call(this), this._context.cache(0, 0, this.width, this.height);
		var e = this._context.cacheCanvas;
		this._context2d = e.getContext("2d", null), this._source = this._assets.getAsset("images/HudProgress.png")
	},
	_drawNeedle: function(e, t, s) {
		var i;
		switch (e._hx_index) {
			case 0:
				i = 0;
				break;
			case 1:
				i = 32;
				break;
			case 2:
				i = 64;
				break;
			case 3:
				i = 96;
				break;
			case 4:
				i = 128
		}
		this._context2d.drawImage(this._source, i + 8, 88, 16, 16, this._getX(t) + 74 - 8, Math.round(6 * s) + 12, 16, 16)
	},
	_getX: function(e) {
		return Math.round(Math.min(268 * e, 328))
	},
	configure: function(e) {
		this._context2d.clearRect(0, 0, this.width, this.height), this._context2d.fillStyle = "#ffffff", this._context2d.globalAlpha = .75;
		var t = Math.min(268 * e[e.length - 1].position, 268),
			s = this._context2d.createLinearGradient(74 + t, 0, 74 + t + 10, 3);
		s.addColorStop(0, "rgba(255, 255, 255, 1)"), s.addColorStop(1, "rgba(255, 255, 255, 0)"), this._context2d.fillStyle = s, this._context2d.beginPath();
		this._context2d.moveTo(82, 8), this._context2d.lineTo(74 + t + 20, 8), this._context2d.lineTo(74 + t - 5 + 20, 33), this._context2d.lineTo(77, 33), this._context2d.fill(), this._context2d.globalAlpha = 1, this._context2d.drawImage(this._source, 0, 0, 420, 40, 0, 0, 420, 40);
		for (var i = 0; i < e.length;) {
			var r = e[i];
			++i, this._drawNeedle(r.type, r.position, r.offset)
		}
		this._context2d.drawImage(this._source, 0, 40, 420, 40, 0, 0, 420, 40)
	},
	__class__: rch_gui_HudProgress
});
var rch_gui_LocationPreview = function(e, t, s, i) {
	null == i && (i = !1), null == s && (s = 0), this._type = t, this._isSelected = i, rch_gui_AGuiEntity.call(this, e, 200, 405, !1), this.set_x(s)
};
$hxClasses["rch.gui.LocationPreview"] = rch_gui_LocationPreview, rch_gui_LocationPreview.__name__ = "rch.gui.LocationPreview", rch_gui_LocationPreview.__super__ = rch_gui_AGuiEntity, rch_gui_LocationPreview.prototype = $extend(rch_gui_AGuiEntity.prototype, {
	_init: function() {
		rch_gui_AGuiEntity.prototype._init.call(this), this._vo = new rch_game_LocationVo(this._kernel, this._type), this._mask = this._assets.getAsset("images/LocationPreviewMask.png"), this._image = this._assets.getAsset("images/LocationPreview.png"), this._bitmap = new createjs.Bitmap(this._mask), this._bitmap.cache(0, 0, this.width, this.height), this._context.addChild(this._bitmap);
		var e = this._factory.createTextStyle(awe6_interfaces_ETextStyle.SUBHEAD);
		e.align = awe6_interfaces_ETextAlign.CENTER, this._text = new rch_gui_Text(this._kernel, 110, 30, (this._vo.title + "\n" + this._vo.altTitle).toUpperCase(), e), this._text.setPosition(58, 100), this.addEntity(this._text, null, !0, 10);
		var t = e.clone();
		this._textDifficulty = new rch_gui_Text(this._kernel, 110, 30, this._vo.difficulty.toUpperCase(), t), this._textDifficulty.setPosition(26, 280), this.addEntity(this._textDifficulty, null, !0, 10), this._shine = new rch_gui_Shine(this._kernel, this._mask), this._draw()
	},
	_draw: function() {
		var e, t = 0 | this.width;
		switch (this._type._hx_index) {
			case 0:
				e = 0;
				break;
			case 1:
				e = 1;
				break;
			case 2:
				e = 2;
				break;
			case 3:
				e = 3
		}
		var s = t * e,
			i = this._bitmap.cacheCanvas.getContext("2d", null);
		i.clearRect(0, 0, this.width, this.height), i.globalAlpha = 1, i.globalCompositeOperation = "source-out", i.drawImage(this._mask, 0, 0), i.globalCompositeOperation = "source-in", i.drawImage(this._image, s, 0, this.width, this.height, 0, 0, this.width, this.height), i.globalCompositeOperation = "source-atop", i.fillStyle = "#191919", i.globalAlpha = this._isSelected ? 0 : .5, i.fillRect(0, 0, this.width, this.height), this._text.set_alpha(this._isSelected ? 1 : .5), this._textDifficulty.set_alpha(this._isSelected ? 1 : .5), this._shine.remove(!0), this._isSelected && this.addEntity(this._shine, null, !0, 1)
	},
	configure: function(e) {
		this._isSelected != e && (this._isSelected = e, this._draw()), this._isSelected = e
	},
	__class__: rch_gui_LocationPreview
});
var rch_gui_Logo = function(e) {
	rch_gui_AGuiEntity.call(this, e, 320, 220, !1)
};
$hxClasses["rch.gui.Logo"] = rch_gui_Logo, rch_gui_Logo.__name__ = "rch.gui.Logo", rch_gui_Logo.__super__ = rch_gui_AGuiEntity, rch_gui_Logo.prototype = $extend(rch_gui_AGuiEntity.prototype, {
	_init: function() {
		rch_gui_AGuiEntity.prototype._init.call(this), this.addEntity(new rch_gui_Shine(this._kernel, this._assets.getAsset("images/LogoShine.png")), null, !0, 1), this._context.addChild(new createjs.Bitmap(this._assets.getAsset("images/Logo.png")))
	},
	__class__: rch_gui_Logo
});
var rch_gui_Overlay = function(e) {
	this._assetManager = js_Boot.__cast(e.assets, rch_AssetManager), this._buttonSize = 50, awe6_core_drivers_createjs_Overlay.call(this, e, this._buttonSize, this._buttonSize, null, null, null, null, null, null, null, this._assetManager.overlayPauseUp, this._assetManager.overlayPauseOver, null, null, 4, 0, .85)
};
$hxClasses["rch.gui.Overlay"] = rch_gui_Overlay, rch_gui_Overlay.__name__ = "rch.gui.Overlay", rch_gui_Overlay.__super__ = awe6_core_drivers_createjs_Overlay, rch_gui_Overlay.prototype = $extend(awe6_core_drivers_createjs_Overlay.prototype, {
	_init: function() {
		awe6_core_drivers_createjs_Overlay.prototype._init.call(this);
		var e = this._kernel.factory.width - this._buttonSize - 5;
		this.positionButton(awe6_interfaces_EOverlayButton.PAUSE, e, 4), this.positionButton(awe6_interfaces_EOverlayButton.UNPAUSE, -this._buttonSize - 10, 4), this.positionButton(awe6_interfaces_EOverlayButton.BACK, -this._buttonSize - 10, 4), this.positionButton(awe6_interfaces_EOverlayButton.MUTE, -this._buttonSize - 10, 4), this.positionButton(awe6_interfaces_EOverlayButton.UNMUTE, -this._buttonSize - 10, 4), this._flashView.set_isVisible(!0), this._pauseMenu = new rch_gui_PauseMenu(this._kernel), this.set_pauseEntity(this._pauseMenu)
	},
	flash: function(e, t, s, i) {
		null == i && (i = 16777215), null == s && (s = 1), null == t && (t = !0), this._flashContext.compositeOperation = 0 == i ? "source-over" : "lighter", awe6_core_drivers_createjs_Overlay.prototype.flash.call(this, e, t, s, i)
	},
	_drawPause: function(e) {
		null == e && (e = !0), awe6_core_drivers_createjs_Overlay.prototype._drawPause.call(this, e), this._pauseMenu.pauseHandler(e)
	},
	__class__: rch_gui_Overlay
});
var rch_gui_PauseMenu = function(e) {
	rch_AEntity.call(this, e)
};
$hxClasses["rch.gui.PauseMenu"] = rch_gui_PauseMenu, rch_gui_PauseMenu.__name__ = "rch.gui.PauseMenu", rch_gui_PauseMenu.__super__ = rch_AEntity, rch_gui_PauseMenu.prototype = $extend(rch_AEntity.prototype, {
	_init: function() {
		var e = this;
		rch_AEntity.prototype._init.call(this), this.addEntity(this._debugText = new rch_gui_Text(this._kernel, this._factory.width - 20, 20, "", this._factory.createTextStyle(awe6_interfaces_ETextStyle.SMALLPRINT), !0, !1, 1), null, !0, 2), this._debugText.setPosition(10, this._factory.height - this._debugText.height);
		var t = (this._kernel.factory.width - 200) / 2,
			s = (this._kernel.factory.height - 65 * (this._isFullScreenSupported() ? 4 : 3)) / 2;
		this.addEntity(new rch_gui_BlankButton(this._kernel, 460, 50, (this._kernel.factory.width - 400) / 2, 0, null, $bind(this, this._pressAuthor)), awe6_interfaces_EAgenda.ALWAYS, !0, 1), this.addEntity(this._logo = new rch_gui_Image(this._kernel, this._kernel.assets.getAsset("images/PauseBg.png")), null, !0, 0), this.addEntity(new rch_gui_Button(this._kernel, this._kernel.getConfig("gui.buttons.unpause"), t, s, null, function() {
			e._kernel.overlay.activateButton(awe6_interfaces_EOverlayButton.UNPAUSE)
		}), awe6_interfaces_EAgenda.ALWAYS, !0, 1), this.addEntity(this._audioButton = new rch_gui_Button(this._kernel, this._kernel.getConfig("gui.buttons.audioOff"), t, s += 65, null, function() {
			e._kernel.overlay._wasMute = !e._kernel.overlay._wasMute, e._kernel.overlay.activateButton(awe6_interfaces_EOverlayButton.UNPAUSE)
		}), awe6_interfaces_EAgenda.ALWAYS, !0, 1), 
		
		
		this.addEntity(new rch_gui_Button(this._kernel, this._kernel.getConfig("gui.buttons.back"), t, s += 65, null, function() {
			e._kernel.overlay.activateButton(awe6_interfaces_EOverlayButton.UNPAUSE), e._kernel.scenes.back()
		}), awe6_interfaces_EAgenda.DEFEND, !0, 1), this.addEntity(new rch_gui_Button(this._kernel, this._kernel.getConfig("gui.buttons.instructions"), t, s, null, function() {
			e._kernel.overlay.activateButton(awe6_interfaces_EOverlayButton.UNPAUSE), e._pressInstructions()
		}), awe6_interfaces_EAgenda.STANDARD, !0, 1)
	},
	_isFullScreenSupported: function() {
		try {
			var e = window.document.documentElement;
			if (null != e.requestFullscreen) return !0;
			if (null != e.msRequestFullscreen) return !0;
			if (null != e.mozRequestFullScreen) return !0;
			if (null != e.webkitRequestFullscreen) return !0
		} catch (e) {}
		return !1
	},
	_isFullScreenEnabled: function() {
		try {
			var e = window.document;
			return !!e.fullscreenElement || (!!e.mozFullScreenElement || (!!e.webkitFullscreenElement || e.msFullscreenElement))
		} catch (e) {}
		return !1
	},
	_disposer: function() {
		this._kernel._stage.removeEventListener("click", $bind(this, this._stageClick), !0), rch_AEntity.prototype._disposer.call(this)
	},
	_pressInstructions: function() {
		try {
			this._kernel.scenes.get_scene()._pressInstructions()
		} catch (e) {
			this._kernel.scenes.setScene(awe6_interfaces_EScene.INSTRUCTIONS)
		}
	},
	_pressAuthor: function() {
		try {
			this._kernel.scenes.get_scene()._pressAuthor()
		} catch (e) {}
	},
	_updater: function(e) {
		null == e && (e = 0), rch_AEntity.prototype._updater.call(this, e), this._isFullScreenClicked = !1
	},
	pauseHandler: function(e) {
		var t = this;
		e ? (this._audioButton.setTitle(this._kernel.getConfig(this._kernel.audio.isMute ? "gui.buttons.audioOn" : "gui.buttons.audioOff")), null != this._fullScreenButton && this._fullScreenButton.setTitle(this._kernel.getConfig(this._isFullScreenEnabled() ? "gui.buttons.fullScreenOff" : "gui.buttons.fullScreenOn")), this._kernel._stage.addEventListener("click", $bind(this, this._stageClick), !0), 
		
		this.addEntity(new tweezer_Tweezer(this._kernel, function(e) {
			t._context.y = e
		}, this._factory.height, 0, 0, 500, null, tweezer_EEase.EASE_OUT, tweezer_ETween.QUARTIC)), this.addEntity(new tweezer_Tweezer(this._kernel, function(e) {
			t._logo.set_alpha(e)
		}, 0, 1, 2e3, 2e3, null, tweezer_EEase.EASE_OUT, tweezer_ETween.QUARTIC))) : this._kernel._stage.removeEventListener("click", $bind(this, this._stageClick), !0)
	},
	_stageClick: function(e) {
		this._kernel.isActive || null != this._fullScreenButton && (this._isFullScreenClicked || this._fullScreenButton.isOver && (this._isFullScreenEnabled() ? this._kernel.system.requestExitFullScreen() : (this._kernel.system.requestFullScreen(), this._kernel.system.requestLockScreen()), this._isFullScreenClicked = !0, null != e && e.stopPropagation(), this._kernel.overlay.activateButton(awe6_interfaces_EOverlayButton.UNPAUSE)))
	},
	__class__: rch_gui_PauseMenu
});
var rch_gui_Shine = function(e, t, s) {
	null == s && (s = 1), this._context = new createjs.Container, this._alphaMask = t, this._speed = s, awe6_core_Entity.call(this, e, null, this._context)
};
$hxClasses["rch.gui.Shine"] = rch_gui_Shine, rch_gui_Shine.__name__ = "rch.gui.Shine", rch_gui_Shine.__super__ = awe6_core_Entity, rch_gui_Shine.prototype = $extend(awe6_core_Entity.prototype, {
	_init: function() {
		awe6_core_Entity.prototype._init.call(this), this.width = this._alphaMask.width, this.height = this._alphaMask.height, this._context.compositeOperation = "lighter", this._context.cache(0, 0, this.width, this.height), this._canvas = this._context.cacheCanvas, this._context2d = this._canvas.getContext("2d", null), this._context.alpha = .35
	},
	_updater: function(e) {
		null == e && (e = 0), awe6_core_Entity.prototype._updater.call(this, e), this._draw()
	},
	_draw: function() {
		var e, t, s, i;
		this._kernel.isEyeCandy && (this._context2d.clearRect(0, 0, this.width, this.height), this._context2d.globalCompositeOperation = "source-out", this._context2d.drawImage(this._alphaMask, 0, 0), e = this._speed * this._age, t = this._rotatePoint(.5 * this.width * Math.sin(e / 900), .5 * this.height, e / 1e3, .5 * this.width, .5 * this.height), s = this._rotatePoint(this.width, .5 * this.height + .5 * this.height * Math.sin(e / 1300), e / 1e3, .5 * this.width, .5 * this.height), (i = this._context2d.createLinearGradient(t.x, t.y, s.x, s.y)).addColorStop(.15, "#000000"), i.addColorStop(.3, "#FFFFFF"), i.addColorStop(.5, "#333333"), i.addColorStop(.78, "#a6a6a6"), i.addColorStop(.82, "#bfbfbf"), i.addColorStop(.86, "#a6a6a6"), i.addColorStop(.88, "#FFFFFF"), i.addColorStop(.98, "#000000"), this._context2d.fillStyle = i, this._context2d.globalCompositeOperation = "source-in", this._context2d.fillRect(0, 0, this.width, this.height))
	},
	_rotatePoint: function(e, t, s, i, r) {
		var n = Math.sin(s),
			_ = Math.cos(s),
			a = (e -= i) * _ - (t -= r) * n,
			o = e * n + t * _;
		return {
			x: a += i,
			y: o += r
		}
	},
	__class__: rch_gui_Shine
});
var rch_gui_TableRow = function(e, t, s, i, r) {
	null == r && (r = ""), null == i && (i = ""), null == s && (s = ""), null == t && (t = 1), this._bgColor = t, rch_gui_AGuiEntity.call(this, e, 230, 25, !1), this._column1.set_text(s.toUpperCase()), this._column2.set_text(i.toUpperCase()), this._column3.set_text(r.toUpperCase())
};
$hxClasses["rch.gui.TableRow"] = rch_gui_TableRow, rch_gui_TableRow.__name__ = "rch.gui.TableRow", rch_gui_TableRow.__super__ = rch_gui_AGuiEntity, rch_gui_TableRow.prototype = $extend(rch_gui_AGuiEntity.prototype, {
	_init: function() {
		rch_gui_AGuiEntity.prototype._init.call(this);
		var e, t = new createjs.Bitmap(this._assets.getAsset("images/HudProgress.png"));
		switch (this._bgColor) {
			case 1:
				e = 112;
				break;
			case 2:
				e = 137;
				break;
			default:
				e = 162
		}
		t.sourceRect = new createjs.Rectangle(0, e, 230, 25), this._context.addChild(t), this._column1 = new rch_gui_Text(this._kernel, 110, 20, "", this._factory.createTextStyle(awe6_interfaces_ETextStyle.BODY), !1, !1, 1), this._column1.setPosition(7, 2), this.addEntity(this._column1, null, !0, 1);
		var s = this._factory.createTextStyle(awe6_interfaces_ETextStyle.BODY);
		s.align = awe6_interfaces_ETextAlign.CENTER, this._column2 = new rch_gui_Text(this._kernel, 70, 20, "", s, !1, !1, 1), this._column2.setPosition(100, 2), this.addEntity(this._column2, null, !0, 1), (s = this._factory.createTextStyle(awe6_interfaces_ETextStyle.BODY)).align = awe6_interfaces_ETextAlign.RIGHT, this._column3 = new rch_gui_Text(this._kernel, 50, 20, "", s, !1, !1, 1), this._column3.setPosition(173, 2), this.addEntity(this._column3, null, !0, 1)
	},
	__class__: rch_gui_TableRow
});
var rch_gui_Text = function(e, t, s, i, r, n, _, a) {
	null == a && (a = 1), null == _ && (_ = !1), null == n && (n = !1), null == i && (i = ""), i = StringTools.replace(i, "<BR/>", "\n"), i = StringTools.replace(i, "<br/>", "\n"), awe6_core_drivers_createjs_extras_gui_Text.call(this, e, t, s, i, r, n, _), this.set_alpha(a)
};
$hxClasses["rch.gui.Text"] = rch_gui_Text, rch_gui_Text.__name__ = "rch.gui.Text", rch_gui_Text.__super__ = awe6_core_drivers_createjs_extras_gui_Text, rch_gui_Text.prototype = $extend(awe6_core_drivers_createjs_extras_gui_Text.prototype, {
	_init: function() {
		awe6_core_drivers_createjs_extras_gui_Text.prototype._init.call(this), this._textField.textBaseline = "alphabetic", this._textField.y += 1.05 * this.textStyle.size
	},
	set_alpha: function(e) {
		return this._context.alpha = e
	},
	__class__: rch_gui_Text,
	__properties__: $extend(awe6_core_drivers_createjs_extras_gui_Text.prototype.__properties__, {
		set_alpha: "set_alpha"
	})
});
var rch_gui_Title = function(e, t) {
	this._title = t, rch_gui_AGuiEntity.call(this, e, 470, 100, !1)
};
$hxClasses["rch.gui.Title"] = rch_gui_Title, rch_gui_Title.__name__ = "rch.gui.Title", rch_gui_Title.__super__ = rch_gui_AGuiEntity, rch_gui_Title.prototype = $extend(rch_gui_AGuiEntity.prototype, {
	_init: function() {
		rch_gui_AGuiEntity.prototype._init.call(this), this._context.addChild(new createjs.Bitmap(this._assets.getAsset("images/Title.png"))), this._text = new rch_gui_Text(this._kernel, 460, 30, "", this._factory.createTextStyle(awe6_interfaces_ETextStyle.HEADLINE), !1, !1, 1), this._text.setPosition(10, 54), this.addEntity(this._text, null, !0, 1), this.set_x(this._factory.width - this.width), this.configure(this._title)
	},
	configure: function(e) {
		this._title = e, this._title = this._title.toUpperCase(), this._text.set_text(this._title)
	},
	__class__: rch_gui_Title
});
var rch_gui_Upgrade = function(e, t) {
	this._type = t, rch_gui_AGuiEntity.call(this, e, 470, 40, !1)
};
$hxClasses["rch.gui.Upgrade"] = rch_gui_Upgrade, rch_gui_Upgrade.__name__ = "rch.gui.Upgrade", rch_gui_Upgrade.__super__ = rch_gui_AGuiEntity, rch_gui_Upgrade.prototype = $extend(rch_gui_AGuiEntity.prototype, {
	_init: function() {
		rch_gui_AGuiEntity.prototype._init.call(this), this._prevCoins = this._session.coins;
		var e, t = new createjs.Bitmap(this._assets.getAsset("images/HudProgress.png"));
		switch (t.x = 150, t.sourceRect = new createjs.Rectangle(0, 188, 200, 40), t.cache(0, 0, 200, 40), this._context.addChild(t), this._type._hx_index) {
			case 0:
				e = "gui.upgrades.speed";
				break;
			case 1:
				e = "gui.upgrades.steering";
				break;
			case 2:
				e = "gui.upgrades.acceleration";
				break;
			case 3:
				e = "gui.upgrades.boost"
		}
		var s, i = Std.string(this._kernel.getConfig(e)).toUpperCase(),
			r = new createjs.Bitmap(this._assets.getAsset("images/HudProgress.png"));
		switch (r.x = 110, this._type._hx_index) {
			case 0:
				s = 230;
				break;
			case 1:
				s = 270;
				break;
			case 2:
				s = 310;
				break;
			case 3:
				s = 350
		}
		r.sourceRect = new createjs.Rectangle(s, 112, 40, 40), r.cache(0, 0, 40, 40), this._context.addChild(r);
		var n = this._factory.createTextStyle(awe6_interfaces_ETextStyle.BODY);
		n.align = awe6_interfaces_ETextAlign.RIGHT, this._title = new rch_gui_Text(this._kernel, 100, 20, i, n), this._title.setPosition(0, 8), this.addEntity(this._title, null, !0, 1), this._bars = new createjs.Container, this._bars.x = t.x, this._context.addChild(this._bars), this._button = new rch_gui_ButtonSmall(this._kernel, "", 340, 4, null, $bind(this, this.buy)), this._session.get_isTester() && this.addEntity(new rch_gui_BlankButton(this._kernel, 173, 25, this._bars.x + 10, 5, null, $bind(this, this._reduce)), null, !0, 1), (n = this._factory.createTextStyle(awe6_interfaces_ETextStyle.BODY)).align = awe6_interfaces_ETextAlign.CENTER, this._message = new rch_gui_Text(this._kernel, 100, 20, "", n, null, null, .5), this._message.setPosition(340, 8), this.addEntity(this._message, null, !0, 29), this.configure(this._session.getUpgrade(this._type))
	},
	_updater: function(e) {
		null == e && (e = 0), rch_gui_AGuiEntity.prototype._updater.call(this, e), this._prevCoins != this._session.coins && (this._prevCoins = this._session.coins, this.configure(this._session.getUpgrade(this._type)))
	},
	_createBar: function(e, t) {
		var s = new createjs.Bitmap(this._assets.getAsset("images/HudProgress.png"));
		return s.x = t, s.sourceRect = new createjs.Rectangle(230 + 50 * (e - 1), 152, 55, 40), s.cache(0, 0, 55, 40), s
	},
	configure: function(e) {
		this._bars.removeAllChildren();
		var t = this._getPrice(e + 1),
			s = t <= this._session.coins;
		this._button.setTitle(Std.string(this._kernel.getConfig("gui.buttons.buy")) + " " + t), 4 == e ? (this._button.remove(!0), this._message.set_text(Std.string(this._kernel.getConfig("gui.scenes.shop.maxed")).toUpperCase())) : s ? (this._message.set_text(""), this.addEntity(this._button, null, !0, 30)) : (this._button.remove(!0), this._message.set_text(null == t ? "null" : "" + t)), this._bars.addChild(this._createBar(0 < e ? 1 : 0 == e && s ? 2 : 3, 8)), this._bars.addChild(this._createBar(1 < e ? 1 : 1 == e && s ? 2 : 3, 49)), this._bars.addChild(this._createBar(2 < e ? 1 : 2 == e && s ? 2 : 3, 90)), this._bars.addChild(this._createBar(3 < e ? 1 : 3 == e && s ? 2 : 3, 131))
	},
	_getPrice: function(e) {
		e < 0 && (e = 0), 4 < e && (e = 4);
		return [0, 100, 300, 600, 1200][e]
	},
	buy: function() {
		var e = this._session.getUpgrade(this._type),
			t = this._getPrice(e + 1);
		t <= this._session.coins && (this._session.coins -= t, this._session.setUpgrade(this._type, e + 1), this.configure(this._session.getUpgrade(this._type)), this._kernel.audio.start("Upgrade", awe6_interfaces_EAudioChannel.INTERFACE, 0, 0, .5))
	},
	_reduce: function() {
		this._session.setUpgrade(this._type, this._session.getUpgrade(this._type) - 1), this.configure(this._session.getUpgrade(this._type))
	},
	__class__: rch_gui_Upgrade
});
var rch_gui_Vignette = function(e, t) {
	null == t && (t = 1), rch_gui_AGuiEntity.call(this, e, null, null, !1), this.set_alpha(t)
};
$hxClasses["rch.gui.Vignette"] = rch_gui_Vignette, rch_gui_Vignette.__name__ = "rch.gui.Vignette", rch_gui_Vignette.__super__ = rch_gui_AGuiEntity, rch_gui_Vignette.prototype = $extend(rch_gui_AGuiEntity.prototype, {
	_init: function() {
		rch_gui_AGuiEntity.prototype._init.call(this), this._context.mouseEnabled = !1, this._bitmap = new createjs.Bitmap(this._assets.getAsset("images/Vignette.png")), this._context.addChild(this._bitmap)
	},
	set_alpha: function(e) {
		return this._bitmap.alpha = e
	},
	__class__: rch_gui_Vignette,
	__properties__: $extend(rch_gui_AGuiEntity.prototype.__properties__, {
		set_alpha: "set_alpha"
	})
});
var rch_scenes_AScene = function(e, t, s, i, r) {
	null == r && (r = !1), null == i && (i = !0), null == s && (s = !1), this._session = e.get_session(), this._assets = e.assets, this._factory = e.factory, this._system = e.system, s = !0, awe6_core_Scene.call(this, e, t, s, i, r)
};
$hxClasses["rch.scenes.AScene"] = rch_scenes_AScene, rch_scenes_AScene.__name__ = "rch.scenes.AScene", rch_scenes_AScene.__super__ = awe6_core_Scene, rch_scenes_AScene.prototype = $extend(awe6_core_Scene.prototype, {
	_init: function() {
		awe6_core_Scene.prototype._init.call(this), this._easyTweezers = [], this._kernel.overlay.get_pauseEntity().setAgenda(awe6_interfaces_EAgenda.STANDARD), this._factory.preventDefaultForKeys([awe6_interfaces_EKey.SPACE]), this._kernel.audio.start("MusicMenu", awe6_interfaces_EAudioChannel.MUSIC, -1, 0, .5, null, !0)
	},
	_disposer: function() {
		this._factory.allowDefaultForKeys([awe6_interfaces_EKey.SPACE]), awe6_core_Scene.prototype._disposer.call(this)
	},
	_pressContinue: function() {
		this._kernel.log("button: continue: " + Std.string(this.type));
		var e = this._factory.getNextSceneType(this.type);
		this.type == awe6_interfaces_EScene.RESULTS && 4 == this._session.level && (e = awe6_interfaces_EScene.INTERSTITIAL), this._kernel.inputs.keyboard.getIsKeyDown(awe6_interfaces_EKey.SQUARELEFT) && this._kernel.inputs.keyboard.getIsKeyDown(awe6_interfaces_EKey.SQUARERIGHT) && this._session.setIsTester(!this._session.get_isTester());
		var t = $bind($_ = this._kernel.scenes, $_.setScene),
			s = e;
		this._outro(function() {
			t(s)
		});
		//gradle.event('button_continue');
	},
	_pressReset: function() {
		this._kernel.log("button: reset: " + Std.string(this.type));
		var e = this._session.cache,
			t = this._session;
		t._data = {}, t._resetter(), t._setter(), this._session.cache.isDrawImageUsingCanvas = e.isDrawImageUsingCanvas, this._session.cache.benchmark = e.benchmark, this._session.cache.debugMessage = e.debugMessage;
		var s = $bind($_ = this._kernel.scenes, $_.setScene),
			i = awe6_interfaces_EScene.MENU;
		this._outro(function() {
			s(i)
		});
		gradle.event('button_reset');
	},
	_pressInstructions: function() {
		this._kernel.log("button: instructions");
		var e = $bind($_ = this._kernel.scenes, $_.setScene),
			t = awe6_interfaces_EScene.INSTRUCTIONS;
		this._outro(function() {
			e(t)
		});
		gradle.event('button_instructions');
	},
	_pressWebsite: function() {
		var t = this;
		this._kernel.log("url: website"), this._kernel.log("button: website");
		gradle.event('button_more');
	},
	_pressAuthor: function() {
		var t = this;
		this._kernel.log("button: author");
		gradle.event('button_author');
	},
	_pressSocial: function(e) {
		null == e && (e = !1), this._kernel.log("button: social");
		var t = this._session.highScore;
		gradle.event('button_share');
	},
	_outro: function(e) {
		this._isOutroCalled || (this._isOutroCalled = !0, null != e && e())
	},
	_addBg: function(e, t, s) {
		null == s && (s = !1), null == t && (t = !0), null == e && (e = 1), this.addEntity(new rch_gui_Bg(this._kernel, this._assets.getAsset(s ? "images/SceneBgC.jpg" : t ? "images/SceneBgA.png" : "images/SceneBgB.png"), t), null, !0, e), this.addEntity(new rch_gui_Vignette(this._kernel, t || s ? .25 : .75), null, !0, e + 1)
	},
	_addFg: function(e, t) {
		null == t && (t = !0), null == e && (e = 100);
		var s = this;
		this._fgHorizontal = new rch_gui_Image(this._kernel, this._assets.getAsset("images/SceneFgHorizontal.png")), this._fgVertical = new rch_gui_Image(this._kernel, this._assets.getAsset("images/SceneFgVertical.png")), this.addEntity(this._fgVertical, null, !0, e + 1), this.addEntity(new tweezer_Tweezer(this._kernel, function(e) {
			s._fgVertical.set_y(e)
		}, this._factory.height, this._fgVertical.y, 750, 1e3, null, tweezer_EEase.EASE_OUT, tweezer_ETween.EXPONENTIAL)), t && (this.addEntity(this._fgHorizontal, null, !0, e), this.addEntity(new tweezer_Tweezer(this._kernel, function(e) {
			s._fgHorizontal.set_x(e)
		}, -this._factory.width, this._fgHorizontal.x, 500, 1e3, null, tweezer_EEase.EASE_OUT, tweezer_ETween.EXPONENTIAL)))
	},
	_addButtons: function(e, t, s, i, r) {
		null == r && (r = 0), null == i && (i = 0), null == e && (e = 110);
		var n = this;
		this._buttonRight = t, this._buttonLeft = s, this._buttonRight.setPosition(this._factory.width - 200 - 30, this._factory.height - 65 - 18), this.addEntity(this._buttonRight, null, !0, e), this.addEntity(new tweezer_Tweezer(this._kernel, function(e) {
			n._buttonRight.set_y(e)
		}, this._factory.height + 60, this._buttonRight.y, i + 1200, 2e3, null, tweezer_EEase.EASE_OUT, tweezer_ETween.ELASTIC())), null != this._buttonLeft && (this._buttonLeft.setPosition(this._buttonRight.x - 210, this._factory.height - 65 - 18), this.addEntity(this._buttonLeft, null, !0, e + 1), this.addEntity(new tweezer_Tweezer(this._kernel, function(e) {
			n._buttonLeft.set_y(e)
		}, this._factory.height + 60, this._buttonLeft.y, r + 1400, 2e3, null, tweezer_EEase.EASE_OUT, tweezer_ETween.ELASTIC())))
	},
	_defaultOutro: function(e) {
		var t = this;
		if (!this._isOutroCalled) {
			this._isOutroCalled = !0;
			for (var s = 0, i = this.getEntitiesByClass(tweezer_Tweezer); s < i.length;) {
				var r = i[s];
				++s, r.remove()
			}
			this._easyTweez(!1), null != this._buttonLeft && this.addEntity(new tweezer_Tweezer(this._kernel, function(e) {
				t._buttonLeft.set_y(e)
			}, this._buttonLeft.y, this._factory.height, 0, 1e3, null, tweezer_EEase.EASE_IN, tweezer_ETween.BACK())), this.addEntity(new tweezer_Tweezer(this._kernel, function(e) {
				t._buttonRight.set_y(e)
			}, this._buttonRight.y, this._factory.height, 100, 1e3, null, tweezer_EEase.EASE_IN, tweezer_ETween.BACK(), e)), this.addEntity(new tweezer_Tweezer(this._kernel, function(e) {
				t._fgHorizontal.set_x(e)
			}, this._fgHorizontal.x, -this._factory.width, 250, 500, null, tweezer_EEase.EASE_IN, tweezer_ETween.EXPONENTIAL)), this.addEntity(new tweezer_Tweezer(this._kernel, function(e) {
				t._fgVertical.set_y(e)
			}, this._fgVertical.y, this._factory.height, 500, 500, null, tweezer_EEase.EASE_IN, tweezer_ETween.EXPONENTIAL)), this._kernel.audio.start("Transition", awe6_interfaces_EAudioChannel.INTERFACE, 0, 0, .25), this._kernel.isDebug && e()
		}
	},
	_easyTweez: function(e) {
		null == e && (e = !0);
		for (var t = 0, s = this._easyTweezers; t < s.length;) {
			var i = [s[t]];
			++t, e ? i[0].isVerticalIn ? this.addEntity(new tweezer_Tweezer(this._kernel, function(t) {
				return function(e) {
					t[0].guiEntity.set_y(e)
				}
			}(i), -this._factory.height + i[0].guiEntity.y, i[0].guiEntity.y, 500 + 100 * i[0].sequence, 2e3, null, tweezer_EEase.EASE_OUT, tweezer_ETween.QUARTIC)) : this.addEntity(new tweezer_Tweezer(this._kernel, function(t) {
				return function(e) {
					t[0].guiEntity.set_x(e)
				}
			}(i), this._factory.width + i[0].guiEntity.x, i[0].guiEntity.x, 500 + 100 * i[0].sequence, 2e3, null, tweezer_EEase.EASE_OUT, tweezer_ETween.QUARTIC)) : this.addEntity(new tweezer_Tweezer(this._kernel, function(t) {
				return function(e) {
					t[0].guiEntity.set_x(e)
				}
			}(i), i[0].guiEntity.x, -1.5 * this._factory.width + i[0].guiEntity.x, 50 * i[0].sequence, 500, null, tweezer_EEase.EASE_IN, tweezer_ETween.BACK()))
		}
	},
	_addEasyTweez: function(e, t, s) {
		null == s && (s = !0), this._easyTweezers.push({
			guiEntity: e,
			sequence: t,
			isVerticalIn: s
		})
	},
	_getLocationType: function(e) {
		return Type.createEnumIndex(rch_game_ELocation, e % rch_game_ELocation.__constructs__.slice().length)
	},
	_getPoints: function(e) {
		var t = [0, 25, 18, 15, 12, 10, 8, 6, 4, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		return t[e % t.length]
	},
	_getRank: function(e) {
		var t;
		switch (e) {
			case 1:
				t = "st";
				break;
			case 2:
				t = "nd";
				break;
			case 3:
				t = "rd";
				break;
			default:
				t = "th"
		}
		switch (e) {
			case 1:
				return {
					rank: "good",
					message: Std.string(this._kernel.getConfig("gui.rank.good")),
					ending: t
				};
			case 2:
			case 3:
				return {
					rank: "ok",
					message: Std.string(this._kernel.getConfig("gui.rank.ok")),
					ending: t
				};
			default:
				return {
					rank: "poor",
					message: Std.string(this._kernel.getConfig("gui.rank.poor")),
					ending: t
				}
		}
	},
	__class__: rch_scenes_AScene
});
var rch_scenes_Game = function(e, t, s, i, r) {
	null == r && (r = !1), null == i && (i = !0), null == s && (s = !1), rch_scenes_AScene.call(this, e, t, s, i, r)
};
$hxClasses["rch.scenes.Game"] = rch_scenes_Game, rch_scenes_Game.__name__ = "rch.scenes.Game", rch_scenes_Game.__super__ = rch_scenes_AScene, rch_scenes_Game.prototype = $extend(rch_scenes_AScene.prototype, {
	_init: function() {
		var e, t, s, i, r, n = this;
		rch_scenes_AScene.prototype._init.call(this), this.isPauseable = !0, this._kernel.overlay.get_pauseEntity().setAgenda(awe6_interfaces_EAgenda.DEFEND), this._session.cache.totalPlays++, this.addEntity(this._hud = new rch_gui_Hud(this._kernel), null, !0, 100), this.addEntity(this._location = new rch_game_Location(this._kernel, this._getLocationType(this._session.level)), null, !0, 10), this._session.get_isTester() && (e = $bind(this, this._handleFinishLine), s = t = null, i = new rch_gui_Button(this._kernel, this._kernel.getConfig("gui.buttons.testMode.finish"), .15 * (this._kernel.factory.width - 200), this._kernel.factory.height - 80, null, function() {
			return e(t, s)
		}), r = new rch_gui_Button(this._kernel, this._kernel.getConfig("gui.buttons.testMode.skip"), .85 * (this._kernel.factory.width - 200), this._kernel.factory.height - 80, null, $bind(this, this._gameOver)), this._addButtons(null, r, i, 1e3, 1e3)), this._kernel.messenger.addSubscriber(this._entity, this._factory.MESSAGE_FINISH_LINE, $bind(this, this._handleFinishLine), null, null, !0), this._kernel.audio.stop(null, awe6_interfaces_EAudioChannel.MUSIC), this._kernel.audio.start("MusicGame", awe6_interfaces_EAudioChannel.MUSIC, -1, 0, .1, 0), this._kernel.audio.start("Engines", awe6_interfaces_EAudioChannel.EFFECTS, 0, 0, 1, null, !0), this._kernel.audio.start("VocalStart", awe6_interfaces_EAudioChannel.INTERFACE, 0, 0, 1, null, !0, function() {
			n._kernel.audio.start("Driveby1", awe6_interfaces_EAudioChannel.EFFECTS, 0, 0, 1, null, !0)
		}), this.addEntity(new tweezer_Tweezer(this._kernel, function(e) {
			n._kernel.audio.transform("MusicGame", awe6_interfaces_EAudioChannel.MUSIC, e)
		}, .1, .75, 2e3, 8e3)), this._kernel.log((1 < this._session.cache.totalPlays ? "replay" : "play") + ": " + Std.string(this._location.type)), this._factory.preventDefaultForKeys([awe6_interfaces_EKey.UP, awe6_interfaces_EKey.RIGHT, awe6_interfaces_EKey.DOWN, awe6_interfaces_EKey.LEFT, awe6_interfaces_EKey.SPACE])
	},
	_createDelay: function(e, t) {
		null == t && (t = 1e3), null == this._delay && this.addEntity(this._delay = new awe6_extras_Delay(this._kernel, e, t))
	},
	_handleFinishLine: function(e, t) {
		for (var s = this, i = 0, r = this.getEntitiesByClass(rch_gui_Button); i < r.length;) {
			var n = r[i];
			++i, n.isDisposed || (n.isDisposed = !0, n.set_isActive(!1), n._disposer())
		}
		var _ = this._location.getScore();
		this._hud.configureMessage(this._getRank(_).message), this._session.setScore(this._session.level, _), this._session.level++;
		var a = this._getRank(_).rank;
		return this._kernel.log("rank: " + a + ": " + Std.string(this._location.type)), this._createDelay($bind(this, this._gameOver), 5e3), this._kernel.overlay.flash(500, !0, .5, 16777215), this._kernel.audio.stop("MusicGame", awe6_interfaces_EAudioChannel.MUSIC), this._kernel.audio.start("Driveby1", awe6_interfaces_EAudioChannel.MUSIC, 1, 0, .5), this._kernel.audio.start("Engines", awe6_interfaces_EAudioChannel.EFFECTS, 0, 0, .5), this.addEntity(new awe6_extras_Delay(this._kernel, function() {
			s._tools;
			s._kernel.audio.start("VocalRank" + (a.charAt(0).toUpperCase() + HxOverrides.substr(a, 1, null).toLowerCase()), awe6_interfaces_EAudioChannel.INTERFACE, 0, 0, 1, null, !0)
		}, 1e3)), this._kernel.audio.start(_ <= 3 ? "MusicWin" : "MusicLose", awe6_interfaces_EAudioChannel.INTERFACE, 1, 0, .5), this.addEntity(new rch_gui_Vignette(this._kernel, .65), null, !0, 90), !1
	},
	_gameOver: function() {
		this._kernel.scenes.next()
	},
	_updater: function(e) {
		null == e && (e = 0), rch_scenes_AScene.prototype._updater.call(this, e), this._hud.configureScore(this._location.getScore()), this._hud.configureProgress(this._location.getCars())
	},
	_disposer: function() {
		this._factory.allowDefaultForKeys([awe6_interfaces_EKey.UP, awe6_interfaces_EKey.RIGHT, awe6_interfaces_EKey.DOWN, awe6_interfaces_EKey.LEFT, awe6_interfaces_EKey.SPACE]), this._kernel.audio.stop(null, awe6_interfaces_EAudioChannel.MUSIC);
		var e = this._session;
		e.saveCount++, e._setter(), e._savedData._____VERSION = e._version, e._savedData[e.id] = e._data, e._driverSave(), rch_scenes_AScene.prototype._disposer.call(this)
	},
	__class__: rch_scenes_Game
});
var rch_scenes_Instructions = function(e, t, s, i, r) {
	null == r && (r = !1), null == i && (i = !0), null == s && (s = !1), rch_scenes_AScene.call(this, e, t, s, i, r)
};
$hxClasses["rch.scenes.Instructions"] = rch_scenes_Instructions, rch_scenes_Instructions.__name__ = "rch.scenes.Instructions", rch_scenes_Instructions.__super__ = rch_scenes_AScene, rch_scenes_Instructions.prototype = $extend(rch_scenes_AScene.prototype, {
	_init: function() {
		rch_scenes_AScene.prototype._init.call(this), this._kernel.overlay.get_pauseEntity().setAgenda(awe6_interfaces_EAgenda.DEFEND), this._addBg(null, !1), this._addFg();
		var e = new rch_gui_Title(this._kernel, this._kernel.getConfig("gui.scenes.instructions.title"));
		this.addEntity(e, null, !0, 19);
		var t = new rch_gui_Button(this._kernel, this._kernel.getConfig("gui.buttons.play"), 0, 0, this._kernel.factory.keyNext, $bind(this, this._pressContinue));
		this._addButtons(null, t);
		var s = new rch_gui_Image(this._kernel, this._assets.getAsset(this._system.isDesktop ? "images/InstructionsA.png" : "images/InstructionsB.png"));
		this.addEntity(s, null, !0, 20), s.setPosition((this._factory.width - s.width) / 2, (this._factory.height - s.height) / 2);
		var i = new rch_gui_Text(this._kernel, 200, 300, Std.string(this._kernel.getConfig("gui.scenes.instructions.message")), this._factory.createTextStyle(awe6_interfaces_ETextStyle.BODY), !0, !1, .5);
		i.setPosition(this._kernel.factory.width - i.width - 20, 120), this.addEntity(i, null, !0, 21), this._addEasyTweez(e, 0), this._addEasyTweez(s, 1, !1), this._addEasyTweez(i, 2, !1), this._easyTweez(!0)
	},
	_outro: function(e) {
		this._defaultOutro(e)
	},
	__class__: rch_scenes_Instructions
});
var rch_scenes_Interstitial = function(e, t, s, i, r) {
	null == r && (r = !1), null == i && (i = !0), null == s && (s = !1), rch_scenes_AScene.call(this, e, t, s, i, r)
};
$hxClasses["rch.scenes.Interstitial"] = rch_scenes_Interstitial, rch_scenes_Interstitial.__name__ = "rch.scenes.Interstitial", rch_scenes_Interstitial.__super__ = rch_scenes_AScene, rch_scenes_Interstitial.prototype = $extend(rch_scenes_AScene.prototype, {
	_init: function() {
		var t = this;
		rch_scenes_AScene.prototype._init.call(this), this._kernel.audio.stop("MusicMenu", awe6_interfaces_EAudioChannel.MUSIC), this._addBg(null, !1, !0), this._addFg(null, !1), this.addEntity(new awe6_extras_Delay(this._kernel, function() {
			t._kernel.audio.start("Driveby1", awe6_interfaces_EAudioChannel.EFFECTS, 0, 0, 1)
		}, 1e3));
		var e = new rch_gui_Button(this._kernel, this._kernel.getConfig("gui.buttons.replay"), 0, 0, this._kernel.factory.keyNext, $bind(this, this._pressContinue)),
			s = new rch_gui_Button(this._kernel, this._kernel.getConfig("gui.buttons.website"), 0, 0, null, $bind(this, this._pressWebsite));
		this._addButtons(null, e, s, 4e3, 4e3);
		var i = $bind(this, this._pressSocial),
			r = function() {
				i(!1)
			};
		this._buttonTwitter = new rch_gui_ButtonIcon(this._kernel, !1, 555, 155, null, r), this.addEntity(this._buttonTwitter, null, !0, 30);
		var n = $bind(this, this._pressSocial),
			r = function() {
				n(!0)
			};
		this._buttonFacebook = new rch_gui_ButtonIcon(this._kernel, !0, 625, 155, null, r), this.addEntity(this._buttonFacebook, null, !0, 30), this.addEntity(new tweezer_Tweezer(this._kernel, function(e) {
			t._buttonTwitter.set_x(e)
		}, this._factory.width, this._buttonTwitter.x, 3e3, 2e3, null, tweezer_EEase.EASE_OUT, tweezer_ETween.ELASTIC())), this.addEntity(new tweezer_Tweezer(this._kernel, function(e) {
			t._buttonFacebook.set_x(e)
		}, this._factory.width, this._buttonFacebook.x, 3100, 2e3, null, tweezer_EEase.EASE_OUT, tweezer_ETween.ELASTIC()));
		var _ = this._getPoints(this._session.scoreLevel0) + this._getPoints(this._session.scoreLevel1) + this._getPoints(this._session.scoreLevel2) + this._getPoints(this._session.scoreLevel3),
			a = new rch_gui_Text(this._kernel, 270, 300, Std.string(Std.string(this._kernel.getConfig("gui.scenes.interstitial.total")) + " " + _ + " / 100").toUpperCase(), this._factory.createTextStyle(awe6_interfaces_ETextStyle.OVERSIZED), !0, !1, 1);
		a.setPosition(this._kernel.factory.width - a.width - 40, 85), this.addEntity(a, null, !0, 21);
		var o = new rch_gui_Text(this._kernel, 270, 300, Std.string(Std.string(this._kernel.getConfig("gui.scenes.interstitial.personalBest")) + " " + this._session.highScore + " / 100").toUpperCase(), this._factory.createTextStyle(awe6_interfaces_ETextStyle.OVERSIZED), !0, !1, 1);
		o.setPosition(this._kernel.factory.width - o.width - 40, a.y + 25), this.addEntity(o, null, !0, 21), this._addEasyTweez(a, 3, !1), this._addEasyTweez(o, 4, !1), this._easyTweez()
	},
	_outro: function(e) {
		var t = this;
		this._defaultOutro(e), this._kernel.audio.start("Driveby1", awe6_interfaces_EAudioChannel.INTERFACE, 0, 0, .5, 0, !0), this.addEntity(new tweezer_Tweezer(this._kernel, function(e) {
			t._buttonTwitter.set_x(e)
		}, this._buttonTwitter.x, -200, 100, 500, null, tweezer_EEase.EASE_IN, tweezer_ETween.BACK())), this.addEntity(new tweezer_Tweezer(this._kernel, function(e) {
			t._buttonFacebook.set_x(e)
		}, this._buttonFacebook.x, -200, 0, 500, null, tweezer_EEase.EASE_IN, tweezer_ETween.BACK()))
	},
	__class__: rch_scenes_Interstitial
});
var rch_scenes_Intro = function(e, t, s, i, r) {
	null == r && (r = !1), null == i && (i = !0), null == s && (s = !1), rch_scenes_AScene.call(this, e, t, s, i, r)
};
$hxClasses["rch.scenes.Intro"] = rch_scenes_Intro, rch_scenes_Intro.__name__ = "rch.scenes.Intro", rch_scenes_Intro.__super__ = rch_scenes_AScene, rch_scenes_Intro.prototype = $extend(rch_scenes_AScene.prototype, {
	_init: function() {
		rch_scenes_AScene.prototype._init.call(this);
		var e = this._factory.createCanvas(this._factory.width, this._factory.height);
		this._destinationContext2d = e.getContext("2d", null), this._sourceImage = this._assets.getAsset("images/Blank.png"), 
		this._sourceCanvas = this._factory.createCanvas(this._sourceImage.width, this._sourceImage.height), 
		this._sourceCanvas.getContext("2d", null);//.drawImage(this._sourceImage, 0, 0)
		
	},
	_updater: function(e) {
		var t, s, i, r, n, _, a, o;
		null == e && (e = 0), rch_scenes_AScene.prototype._updater.call(this, e), 1 == this._updates && (t = this._stressTest(this._sourceImage), s = this._stressTest(this._sourceCanvas), i = this._stressTest(this._sourceCanvas), r = t + this._stressTest(this._sourceImage), n = s + i, a = (_ = Math.round(100 * r / n) / 100) < 1.7, o = Math.round(100 * (a ? n : r) / 300), this._session.cache.isDrawImageUsingCanvas = a, this._session.cache.benchmark = Math.round(o), this._session.cache.debugMessage = (null == _ ? "null" : "" + _) + " | " + this._session.cache.benchmark), this._kernel.scenes.next()
	},
	_stressTest: function(e) {
		var t = 0,
			s = Math.round(HxOverrides.now() / 1e3 * 1e3);
		this._destinationContext2d.restore(), this._destinationContext2d.clearRect(0, 0, this._factory.width, this._factory.height);
		for (var i = s; i < s + 100;) i = Math.round(HxOverrides.now() / 1e3 * 1e3), this._destinationContext2d.rotate(Math.random() - .5), this._destinationContext2d.drawImage(e, 0, 0, 512, 4, 0, Std.random(256), 2048, 16), this._destinationContext2d.drawImage(e, 0, 0, 512, 4, 0, Std.random(256), 828.416, 6.472), this._destinationContext2d.drawImage(e, 0, 0, 512, 64, 0, Std.random(256), 128, 16), this._destinationContext2d.drawImage(e, 0, 0, 512, 64, 0, Std.random(256), 316.4400494437577, 39.55500618046971), ++t;
		return t
	},
	__class__: rch_scenes_Intro
});
var rch_scenes_Menu = function(e, t, s, i, r) {
	null == r && (r = !1), null == i && (i = !0), null == s && (s = !1), rch_scenes_AScene.call(this, e, t, s, i, r)
};
$hxClasses["rch.scenes.Menu"] = rch_scenes_Menu, rch_scenes_Menu.__name__ = "rch.scenes.Menu", rch_scenes_Menu.__super__ = rch_scenes_AScene, rch_scenes_Menu.prototype = $extend(rch_scenes_AScene.prototype, {
	_init: function() {
		var t = this;
		rch_scenes_AScene.prototype._init.call(this), this._addBg(null, !0), this._addFg(null, !1), this._logo = new rch_gui_Logo(this._kernel), this._logo.setPosition(this._factory.width - this._logo.width, Math.round((this._factory.height - this._logo.height) / 2)), this.addEntity(this._logo, null, !0, 100), this.addEntity(new tweezer_Tweezer(this._kernel, function(e) {
			t._logo.set_x(e)
		}, -this._factory.width, this._logo.x, 2500, 2e3, null, tweezer_EEase.EASE_OUT, tweezer_ETween.ELASTIC())), this.addEntity(new awe6_extras_Delay(this._kernel, function() {
			t._kernel.audio.start("Driveby1", awe6_interfaces_EAudioChannel.EFFECTS, 0, 0, 1)
		}, 2500));
		var e = new rch_gui_Button(this._kernel, this._kernel.getConfig("gui.buttons.play"), 0, 0, this._kernel.factory.keyNext, $bind(this, this._pressContinue)),
			s = new rch_gui_Button(this._kernel, this._kernel.getConfig("gui.buttons.instructions"), 0, 0, null, $bind(this, this._pressInstructions));
		this._addButtons(null, e, s), this._easyTweez()
	},
	_outro: function(e) {
		var t = this;
		this._defaultOutro(e), this._kernel.audio.start("Driveby2", awe6_interfaces_EAudioChannel.INTERFACE, 0, 0, .5, 0, !0), this.addEntity(new tweezer_Tweezer(this._kernel, function(e) {
			t._logo.set_x(e)
		}, this._logo.x, this._factory.width, 0, 1e3, null, tweezer_EEase.EASE_IN, tweezer_ETween.BACK()))
	},
	__class__: rch_scenes_Menu
});
var rch_scenes_Results = function(e, t, s, i, r) {
	null == r && (r = !1), null == i && (i = !0), null == s && (s = !1), rch_scenes_AScene.call(this, e, t, s, i, r)
};
$hxClasses["rch.scenes.Results"] = rch_scenes_Results, rch_scenes_Results.__name__ = "rch.scenes.Results", rch_scenes_Results.__super__ = rch_scenes_AScene, rch_scenes_Results.prototype = $extend(rch_scenes_AScene.prototype, {
	_init: function() {
		rch_scenes_AScene.prototype._init.call(this), this._isFinished = 4 == this._session.level, this._addBg(null, !1), this._addFg();
		var e = new rch_gui_Title(this._kernel, StringTools.replace(Std.string(this._kernel.getConfig("gui.scenes.results.title")), "__X__", Std.string(this._session.level)));
		this.addEntity(e, null, !0, 19);
		var t = new rch_gui_Coins(this._kernel);
		t.setPosition(585, 53), this.addEntity(t, null, !0, 30);
		var s = new rch_gui_Button(this._kernel, this._kernel.getConfig(this._isFinished ? "gui.buttons.finished" : "gui.buttons.continue"), 0, 0, this._kernel.factory.keyNext, $bind(this, this._pressContinue));
		this._addButtons(null, s);
		var i = new rch_gui_TableRow(this._kernel, 1, this._kernel.getConfig("gui.scenes.results.table.location"), this._kernel.getConfig("gui.scenes.results.table.position"), this._kernel.getConfig("gui.scenes.results.table.points"));
		i.setPosition(260, 110), this.addEntity(i, null, !0, 20);
		var r = this._createTableScoreRow(0, 260, 135);
		this.addEntity(r, null, !0, 20);
		var n = this._createTableScoreRow(1, 260, 160);
		this.addEntity(n, null, !0, 20);
		var _ = this._createTableScoreRow(2, 260, 185);
		this.addEntity(_, null, !0, 20);
		var a = this._createTableScoreRow(3, 260, 210);
		this.addEntity(a, null, !0, 20);
		var o = this._getPoints(this._session.scoreLevel0) + this._getPoints(this._session.scoreLevel1) + this._getPoints(this._session.scoreLevel2) + this._getPoints(this._session.scoreLevel3),
			c = new rch_gui_TableRow(this._kernel, 1, this._kernel.getConfig("gui.scenes.results.table.total"), "", null == o ? "null" : "" + o);
		c.setPosition(260, 235), this.addEntity(c, null, !0, 20), 4 <= this._session.level && (this._session.highScore < o && (this._session.highScore = o), this._session.series++), this._session.coins += 10 * (this._getPoints(this._session.getScore(this._session.level - 1)) + 20);
		var h = new rch_gui_TableRow(this._kernel, 3, this._kernel.getConfig("gui.scenes.results.table.personalBest"), "", Std.string(this._session.highScore));
		h.setPosition(260, 260), this.addEntity(h, null, !0, 20);
		var l = this._session.getScore(this._session.level - 1),
			u = this._getRank(l),
			d = this._getPoints(l),
			g = u.message + "<br/><br/>" + StringTools.replace(StringTools.replace(this._kernel.getConfig("gui.scenes.results.message"), "__SCORE__", l + u.ending), "__POINTS__", null == d ? "null" : "" + d),
			p = new rch_gui_Text(this._kernel, 180, 300, g, this._factory.createTextStyle(awe6_interfaces_ETextStyle.BODY), !0, !1, .5);
		p.setPosition(this._kernel.factory.width - p.width - 20, 140), this.addEntity(p, null, !0, 21), this._addEasyTweez(e, 0), this._addEasyTweez(t, 0), this._addEasyTweez(i, 1, !1), this._addEasyTweez(r, 2, !1), this._addEasyTweez(n, 3, !1), this._addEasyTweez(_, 4, !1), this._addEasyTweez(a, 5, !1), this._addEasyTweez(c, 6, !1), this._addEasyTweez(h, 7, !1), this._addEasyTweez(p, 8, !1), this._easyTweez(!0)
	},
	_outro: function(e) {
		this._defaultOutro(e), this._isFinished && (this._kernel.audio.stop(null, awe6_interfaces_EAudioChannel.MUSIC), this._kernel.audio.start("MusicWin", awe6_interfaces_EAudioChannel.MUSIC, 1, 0, .5))
	},
	_createTableScoreRow: function(e, t, s) {
		var i;
		switch (e) {
			case 0:
				i = "gui.locations.a";
				break;
			case 1:
				i = "gui.locations.b";
				break;
			case 2:
				i = "gui.locations.c";
				break;
			default:
				i = "gui.locations.d"
		}
		var r = this._kernel.getConfig(i),
			n = this._session.getScore(e),
			_ = n + this._getRank(n).ending,
			a = Std.string(this._getPoints(n));
		0 == n && (a = _ = "-");
		var o = new rch_gui_TableRow(this._kernel, 2, e + 1 + ". " + r, _, a);
		return o.setPosition(t, s), o
	},
	__class__: rch_scenes_Results
});
var rch_scenes_SceneTransition = function(e) {
	awe6_core_drivers_createjs_SceneTransition.call(this, e, 500)
};
$hxClasses["rch.scenes.SceneTransition"] = rch_scenes_SceneTransition, rch_scenes_SceneTransition.__name__ = "rch.scenes.SceneTransition", rch_scenes_SceneTransition.__super__ = awe6_core_drivers_createjs_SceneTransition, rch_scenes_SceneTransition.prototype = $extend(awe6_core_drivers_createjs_SceneTransition.prototype, {
	_init: function() {
		awe6_core_drivers_createjs_SceneTransition.prototype._init.call(this)
	},
	__class__: rch_scenes_SceneTransition
});
var rch_scenes_SelectLevel = function(e, t, s, i, r) {
	null == r && (r = !1), null == i && (i = !0), null == s && (s = !1), rch_scenes_AScene.call(this, e, t, s, i, r)
};
$hxClasses["rch.scenes.SelectLevel"] = rch_scenes_SelectLevel, rch_scenes_SelectLevel.__name__ = "rch.scenes.SelectLevel", rch_scenes_SelectLevel.__super__ = rch_scenes_AScene, rch_scenes_SelectLevel.prototype = $extend(rch_scenes_AScene.prototype, {
	_init: function() {
		rch_scenes_AScene.prototype._init.call(this), this._addBg(null, !1), this._addFg(), 3 < this._session.level && (this._session.level = 0), 0 == this._session.level && this._session.resetGame(), this._title = new rch_gui_Title(this._kernel, ""), this.addEntity(this._title, null, !0, 19);
		var e = 190;
		this.addEntity(this._locationA = new rch_gui_LocationPreview(this._kernel, rch_game_ELocation.LOCATION_A, e), null, !0, 25), this.addEntity(this._locationB = new rch_gui_LocationPreview(this._kernel, rch_game_ELocation.LOCATION_B, e += 110), null, !0, 25), this.addEntity(this._locationC = new rch_gui_LocationPreview(this._kernel, rch_game_ELocation.LOCATION_C, e += 110), null, !0, 25), this.addEntity(this._locationD = new rch_gui_LocationPreview(this._kernel, rch_game_ELocation.LOCATION_D, e += 110), null, !0, 25), this._configureLevel(this._session.level);
		var t = new rch_gui_Button(this._kernel, this._kernel.getConfig("gui.buttons.selectLevel"), 0, 0, this._kernel.factory.keyNext, $bind(this, this._pressContinue));
		this._addButtons(null, t), this._addEasyTweez(this._title, 0), this._addEasyTweez(this._locationA, 1, !1), this._addEasyTweez(this._locationB, 2, !1), this._addEasyTweez(this._locationC, 3, !1), this._addEasyTweez(this._locationD, 4, !1), this._easyTweez()
	},
	_updater: function(e) {
		null == e && (e = 0), rch_scenes_AScene.prototype._updater.call(this, e), this._session.get_isTester() && (this._kernel.inputs.joypad.getIsButtonPress(awe6_interfaces_EJoypadButton.RIGHT) && this._configureLevel(this._session.level + 1), this._kernel.inputs.joypad.getIsButtonPress(awe6_interfaces_EJoypadButton.LEFT) && this._configureLevel(this._session.level - 1))
	},
	_outro: function(e) {
		this._kernel.audio.stop(null, awe6_interfaces_EAudioChannel.MUSIC), this._kernel.audio.start("Driveby4", awe6_interfaces_EAudioChannel.INTERFACE, 0, 0, .5, 0, !0), this._kernel.audio.start("Engines", awe6_interfaces_EAudioChannel.EFFECTS, 0, 0, 1), this._defaultOutro(e)
	},
	_configureLevel: function(e) {
		if (!this._isOutroCalled) {
			this._tools;
			var t = e - 4 * Math.floor(e / 4);
			this._session.level = 0 | t;
			var s = this._getLocationType(this._session.level),
				i = StringTools.replace(Std.string(this._kernel.getConfig("gui.scenes.selectLevel.title")), "__X__", Std.string(this._session.level + 1));
			switch (1 < this._session.series && (i = StringTools.replace(Std.string(this._kernel.getConfig("gui.scenes.selectLevel.series")), "__X__", Std.string(this._session.series)) + i), this._title.configure(i), this._locationA.configure(!1), this._locationB.configure(!1), this._locationC.configure(!1), this._locationD.configure(!1), s._hx_index) {
				case 0:
					this._locationA.configure(!0);
					break;
				case 1:
					this._locationB.configure(!0);
					break;
				case 2:
					this._locationC.configure(!0);
					break;
				case 3:
					this._locationD.configure(!0)
			}
		}
	},
	_pressLevelPreview: function(e) {
		this._configureLevel(e), this._pressContinue()
	},
	__class__: rch_scenes_SelectLevel
});
var rch_scenes_Shop = function(e, t, s, i, r) {
	null == r && (r = !1), null == i && (i = !0), null == s && (s = !1), rch_scenes_AScene.call(this, e, t, s, i, r)
};
$hxClasses["rch.scenes.Shop"] = rch_scenes_Shop, rch_scenes_Shop.__name__ = "rch.scenes.Shop", rch_scenes_Shop.__super__ = rch_scenes_AScene, rch_scenes_Shop.prototype = $extend(rch_scenes_AScene.prototype, {
	_init: function() {
		rch_scenes_AScene.prototype._init.call(this), this._addBg(null, !1), this._addFg();
		var e = new rch_gui_Title(this._kernel, this._kernel.getConfig("gui.scenes.shop.title"));
		this.addEntity(e, null, !0, 19);
		var t = new rch_gui_Coins(this._kernel);
		t.setPosition(585, 53), this.addEntity(t, null, !0, 30);
		var s = new rch_gui_Button(this._kernel, this._kernel.getConfig("gui.buttons.continue"), 0, 0, this._kernel.factory.keyNext, $bind(this, this._pressContinue)),
			i = new rch_gui_Button(this._kernel, this._kernel.getConfig("gui.buttons.reset"), 0, 0, null, $bind(this, this._pressReset));
		this._addButtons(null, s, 1 == this._session.getPercentageComplete() ? i : null);
		var r = 130,
			n = this._createUpgrade(rch_game_EUpgrade.UPGRADE_SPEED, 250, r);
		this.addEntity(n, null, !0, 22);
		var _ = this._createUpgrade(rch_game_EUpgrade.UPGRADE_STEERING, 250, r += 40);
		this.addEntity(_, null, !0, 22);
		var a = this._createUpgrade(rch_game_EUpgrade.UPGRADE_ACCELERATION, 250, r += 40);
		this.addEntity(a, null, !0, 22);
		var o = this._createUpgrade(rch_game_EUpgrade.UPGRADE_BOOST, 250, r += 40);
		this.addEntity(o, null, !0, 22), this._addEasyTweez(e, 0), this._addEasyTweez(t, 0), this._addEasyTweez(n, 1, !1), this._addEasyTweez(_, 2, !1), this._addEasyTweez(a, 3, !1), this._addEasyTweez(o, 4, !1), this._easyTweez(!0)
	},
	_outro: function(e) {
		this._defaultOutro(e)
	},
	_createUpgrade: function(e, t, s) {
		var i = new rch_gui_Upgrade(this._kernel, e);
		return i.setPosition(t, s), i
	},
	__class__: rch_scenes_Shop
});
var haxe_IMap = function() {};
$hxClasses["haxe.IMap"] = haxe_IMap, haxe_IMap.__name__ = "haxe.IMap", haxe_IMap.__isInterface__ = !0;
var haxe_Exception = function(e, t, s) {
	Error.call(this, e), this.message = e, this.__previousException = t, this.__nativeException = null != s ? s : this
};
$hxClasses["haxe.Exception"] = haxe_Exception, haxe_Exception.__name__ = "haxe.Exception", haxe_Exception.caught = function(e) {
	return e instanceof haxe_Exception ? e : e instanceof Error ? new haxe_Exception(e.message, null, e) : new haxe_ValueException(e, null, e)
}, haxe_Exception.thrown = function(e) {
	return e instanceof haxe_Exception ? e.get_native() : e instanceof Error ? e : new haxe_ValueException(e)
}, haxe_Exception.__super__ = Error, haxe_Exception.prototype = $extend(Error.prototype, {
	unwrap: function() {
		return this.__nativeException
	},
	get_native: function() {
		return this.__nativeException
	},
	__class__: haxe_Exception,
	__properties__: {
		get_native: "get_native"
	}
});
var haxe_Log = function() {};
$hxClasses["haxe.Log"] = haxe_Log, haxe_Log.__name__ = "haxe.Log", haxe_Log.formatOutput = function(e, t) {
	var s = Std.string(e);
	if (null == t) return s;
	var i = t.fileName + ":" + t.lineNumber;
	if (null != t.customParams)
		for (var r = 0, n = t.customParams; r < n.length;) {
			e = n[r];
			++r, s += ", " + Std.string(e)
		}
	return i + ": " + s
}, haxe_Log.trace = function(e, t) {
	var s = haxe_Log.formatOutput(e, t);
	"undefined" != typeof console && null != console.log && console.log(s)
};
var haxe_Resource = function() {};
$hxClasses["haxe.Resource"] = haxe_Resource, haxe_Resource.__name__ = "haxe.Resource", haxe_Resource.getString = function(e) {
	for (var t = 0, s = haxe_Resource.content; t < s.length;) {
		var i = s[t];
		if (++t, i.name == e) return null != i.str ? i.str : haxe_crypto_Base64.decode(i.data).toString()
	}
	return null
};
var haxe_Serializer = function() {
	this.buf = new StringBuf, this.cache = [], this.useCache = haxe_Serializer.USE_CACHE, this.useEnumIndex = haxe_Serializer.USE_ENUM_INDEX, this.shash = new haxe_ds_StringMap, this.scount = 0
};
$hxClasses["haxe.Serializer"] = haxe_Serializer, haxe_Serializer.__name__ = "haxe.Serializer", haxe_Serializer.run = function(e) {
	var t = new haxe_Serializer;
	return t.serialize(e), t.toString()
}, haxe_Serializer.prototype = {
	toString: function() {
		return this.buf.b
	},
	serializeString: function(e) {
		var t = this.shash.h[e];
		if (null != t) return this.buf.b += "R", void(this.buf.b += null == t ? "null" : "" + t);
		this.shash.h[e] = this.scount++, this.buf.b += "y", e = encodeURIComponent(e), this.buf.b += Std.string(e.length), this.buf.b += ":", this.buf.b += null == e ? "null" : "" + e
	},
	serializeRef: function(e) {
		for (var t = typeof e, s = 0, i = this.cache.length; s < i;) {
			var r = s++,
				n = this.cache[r];
			if (typeof n == t && n == e) return this.buf.b += "r", this.buf.b += null == r ? "null" : "" + r, !0
		}
		return this.cache.push(e), !1
	},
	serializeFields: function(e) {
		for (var t = 0, s = Reflect.fields(e); t < s.length;) {
			var i = s[t];
			++t, this.serializeString(i), this.serialize(Reflect.field(e, i))
		}
		this.buf.b += "g"
	},
	serialize: function(e) {
		switch ((v = Type.typeof(e))._hx_index) {
			case 0:
				this.buf.b += "n";
				break;
			case 1:
				if (0 == (t = e)) return void(this.buf.b += "z");
				this.buf.b += "i", this.buf.b += null == t ? "null" : "" + t;
				break;
			case 2:
				var t = e;
				isNaN(t) ? this.buf.b += "k" : isFinite(t) ? (this.buf.b += "d", this.buf.b += null == t ? "null" : "" + t) : this.buf.b += t < 0 ? "m" : "p";
				break;
			case 3:
				this.buf.b += e ? "t" : "f";
				break;
			case 4:
				if (js_Boot.__instanceof(e, Class)) {
					var s = e.__name__;
					this.buf.b += "A", this.serializeString(s)
				} else if (js_Boot.__instanceof(e, Enum)) this.buf.b += "B", this.serializeString(e.__ename__);
				else {
					if (this.useCache && this.serializeRef(e)) return;
					this.buf.b += "o", this.serializeFields(e)
				}
				break;
			case 5:
				throw haxe_Exception.thrown("Cannot serialize function");
			case 6:
				var i = v.c;
				if (i == String) return void this.serializeString(e);
				if (this.useCache && this.serializeRef(e)) return;
				switch (i) {
					case Array:
						var r = 0;
						this.buf.b += "a";
						for (var n = 0, _ = e.length; n < _;) {
							null == e[u = n++] ? ++r : (0 < r && (1 == r ? this.buf.b += "n" : (this.buf.b += "u", this.buf.b += null == r ? "null" : "" + r), r = 0), this.serialize(e[u]))
						}
						0 < r && (1 == r ? this.buf.b += "n" : (this.buf.b += "u", this.buf.b += null == r ? "null" : "" + r)), this.buf.b += "h";
						break;
					case Date:
						var a = e;
						this.buf.b += "v", this.buf.b += Std.string(a.getTime());
						break;
					case haxe_ds_IntMap:
						this.buf.b += "q";
						for (var o = (t = e).keys(); o.hasNext();) {
							var c = o.next();
							this.buf.b += ":", this.buf.b += null == c ? "null" : "" + c, this.serialize(t.h[c])
						}
						this.buf.b += "h";
						break;
					case haxe_ds_List:
						this.buf.b += "l";
						for (var h = (t = e).h; null != h;) {
							var l = h.item,
								h = h.next,
								u = l;
							this.serialize(u)
						}
						this.buf.b += "h";
						break;
					case haxe_ds_ObjectMap:
						this.buf.b += "M";
						for (o = (t = e).keys(); o.hasNext();) {
							var c = o.next(),
								d = Reflect.field(c, "__id__");
							Reflect.deleteField(c, "__id__"), this.serialize(c), c.__id__ = d, this.serialize(t.h[c.__id__])
						}
						this.buf.b += "h";
						break;
					case haxe_ds_StringMap:
						this.buf.b += "b";
						for (t = e, o = haxe_ds_StringMap.keysIterator(t.h); o.hasNext();) {
							c = o.next();
							this.serializeString(c), this.serialize(t.h[c])
						}
						this.buf.b += "h";
						break;
					case haxe_io_Bytes:
						t = e;
						this.buf.b += "s", this.buf.b += Std.string(Math.ceil(8 * t.length / 6)), this.buf.b += ":";
						var u = 0,
							g = t.length - 2;
						if (null == (p = haxe_Serializer.BASE64_CODES)) {
							for (var p = new Array(haxe_Serializer.BASE64.length), n = 0, _ = haxe_Serializer.BASE64.length; n < _;) {
								var w = n++;
								p[w] = HxOverrides.cca(haxe_Serializer.BASE64, w)
							}
							haxe_Serializer.BASE64_CODES = p
						}
						for (; u < g;) {
							var f = t.b[u++],
								y = t.b[u++],
								x = t.b[u++];
							this.buf.b += String.fromCodePoint(p[f >> 2]), this.buf.b += String.fromCodePoint(p[63 & (f << 4 | y >> 4)]), this.buf.b += String.fromCodePoint(p[63 & (y << 2 | x >> 6)]), this.buf.b += String.fromCodePoint(p[63 & x])
						}
						u == g ? (f = t.b[u++], y = t.b[u++], this.buf.b += String.fromCodePoint(p[f >> 2]), this.buf.b += String.fromCodePoint(p[63 & (f << 4 | y >> 4)]), this.buf.b += String.fromCodePoint(p[y << 2 & 63])) : u == 1 + g && (f = t.b[u++], this.buf.b += String.fromCodePoint(p[f >> 2]), this.buf.b += String.fromCodePoint(p[f << 4 & 63]));
						break;
					default:
						this.useCache && this.cache.pop(), null != e.hxSerialize ? (this.buf.b += "C", this.serializeString(i.__name__), this.useCache && this.cache.push(e), e.hxSerialize(this), this.buf.b += "g") : (this.buf.b += "c", this.serializeString(i.__name__), this.useCache && this.cache.push(e), this.serializeFields(e))
				}
				break;
			case 7:
				var m = v.e;
				if (this.useCache) {
					if (this.serializeRef(e)) return;
					this.cache.pop()
				}
				this.buf.b += Std.string(this.useEnumIndex ? "j" : "w"), this.serializeString(m.__ename__), this.useEnumIndex ? (this.buf.b += ":", this.buf.b += Std.string(e._hx_index)) : (m = e, this.serializeString($hxEnums[m.__enum__].__constructs__[m._hx_index])), this.buf.b += ":";
				var E = Type.enumParameters(e);
				this.buf.b += Std.string(E.length);
				for (var v = 0; v < E.length;) {
					var b = E[v];
					++v, this.serialize(b)
				}
				this.useCache && this.cache.push(e);
				break;
			default:
				throw haxe_Exception.thrown("Cannot serialize " + Std.string(e))
		}
	},
	__class__: haxe_Serializer
};
var haxe_Timer = function(e) {
	var t = this;
	this.id = setInterval(function() {
		t.run()
	}, e)
};
$hxClasses["haxe.Timer"] = haxe_Timer, haxe_Timer.__name__ = "haxe.Timer", haxe_Timer.delay = function(e, t) {
	var s = new haxe_Timer(t);
	return s.run = function() {
		s.stop(), e()
	}, s
}, haxe_Timer.prototype = {
	stop: function() {
		null != this.id && (clearInterval(this.id), this.id = null)
	},
	run: function() {},
	__class__: haxe_Timer
};
var haxe__$Unserializer_DefaultResolver = function() {};
$hxClasses["haxe._Unserializer.DefaultResolver"] = haxe__$Unserializer_DefaultResolver, haxe__$Unserializer_DefaultResolver.__name__ = "haxe._Unserializer.DefaultResolver", haxe__$Unserializer_DefaultResolver.prototype = {
	resolveClass: function(e) {
		return $hxClasses[e]
	},
	resolveEnum: function(e) {
		return $hxEnums[e]
	},
	__class__: haxe__$Unserializer_DefaultResolver
};
var haxe_Unserializer = function(e) {
	this.buf = e, this.length = e.length, this.pos = 0, this.scache = [], this.cache = [];
	var t = haxe_Unserializer.DEFAULT_RESOLVER;
	null == t && (t = new haxe__$Unserializer_DefaultResolver, haxe_Unserializer.DEFAULT_RESOLVER = t), this.resolver = t
};
$hxClasses["haxe.Unserializer"] = haxe_Unserializer, haxe_Unserializer.__name__ = "haxe.Unserializer", haxe_Unserializer.initCodes = function() {
	for (var e = [], t = 0, s = haxe_Unserializer.BASE64.length; t < s;) {
		var i = t++;
		e[haxe_Unserializer.BASE64.charCodeAt(i)] = i
	}
	return e
}, haxe_Unserializer.run = function(e) {
	return new haxe_Unserializer(e).unserialize()
}, haxe_Unserializer.prototype = {
	readDigits: function() {
		for (var e = 0, t = !1, s = this.pos;;) {
			var i = this.buf.charCodeAt(this.pos);
			if (i != i) break;
			if (45 != i) {
				if (i < 48 || 57 < i) break;
				e = 10 * e + (i - 48), this.pos++
			} else {
				if (this.pos != s) break;
				t = !0, this.pos++
			}
		}
		return t && (e *= -1), e
	},
	readFloat: function() {
		for (var e = this.pos;;) {
			var t = this.buf.charCodeAt(this.pos);
			if (t != t) break;
			if (!(43 <= t && t < 58 || 101 == t || 69 == t)) break;
			this.pos++
		}
		return parseFloat(HxOverrides.substr(this.buf, e, this.pos - e))
	},
	unserializeObject: function(e) {
		for (;;) {
			if (this.pos >= this.length) throw haxe_Exception.thrown("Invalid object");
			if (103 == this.buf.charCodeAt(this.pos)) break;
			var t = this.unserialize();
			if ("string" != typeof t) throw haxe_Exception.thrown("Invalid object key");
			var s = this.unserialize();
			e[t] = s
		}
		this.pos++
	},
	unserializeEnum: function(e, t) {
		if (58 != this.buf.charCodeAt(this.pos++)) throw haxe_Exception.thrown("Invalid enum format");
		var s = this.readDigits();
		if (0 == s) return Type.createEnum(e, t);
		for (var i = []; 0 < s--;) i.push(this.unserialize());
		return Type.createEnum(e, t, i)
	},
	unserialize: function() {
		switch (this.buf.charCodeAt(this.pos++)) {
			case 65:
				var e = this.unserialize();
				if (null == (a = this.resolver.resolveClass(e))) throw haxe_Exception.thrown("Class not found " + e);
				return a;
			case 66:
				e = this.unserialize();
				if (null == (h = this.resolver.resolveEnum(e))) throw haxe_Exception.thrown("Enum not found " + e);
				return h;
			case 67:
				e = this.unserialize();
				if (null == (a = this.resolver.resolveClass(e))) throw haxe_Exception.thrown("Class not found " + e);
				var t = Object.create(a.prototype);
				if (this.cache.push(t), t.hxUnserialize(this), 103 != this.buf.charCodeAt(this.pos++)) throw haxe_Exception.thrown("Invalid custom data");
				return t;
			case 77:
				var s = new haxe_ds_ObjectMap;
				this.cache.push(s);
				for (var i = this.buf; 104 != this.buf.charCodeAt(this.pos);) {
					var r = this.unserialize();
					s.set(r, this.unserialize())
				}
				return this.pos++, s;
			case 82:
				if ((g = this.readDigits()) < 0 || g >= this.scache.length) throw haxe_Exception.thrown("Invalid string reference");
				return this.scache[g];
			case 97:
				var i = this.buf,
					n = [];
				for (this.cache.push(n);;) {
					if (104 == (u = this.buf.charCodeAt(this.pos))) {
						this.pos++;
						break
					}
					117 == u ? (this.pos++, g = this.readDigits(), n[n.length + g - 1] = null) : n.push(this.unserialize())
				}
				return n;
			case 98:
				s = new haxe_ds_StringMap;
				this.cache.push(s);
				for (i = this.buf; 104 != this.buf.charCodeAt(this.pos);) {
					var r = this.unserialize(),
						_ = this.unserialize();
					s.h[r] = _
				}
				return this.pos++, s;
			case 99:
				var a, e = this.unserialize();
				if (null == (a = this.resolver.resolveClass(e))) throw haxe_Exception.thrown("Class not found " + e);
				t = Object.create(a.prototype);
				return this.cache.push(t), this.unserializeObject(t), t;
			case 100:
				return this.readFloat();
			case 102:
				return !1;
			case 105:
				return this.readDigits();
			case 106:
				e = this.unserialize();
				if (null == (T = this.resolver.resolveEnum(e))) throw haxe_Exception.thrown("Enum not found " + e);
				this.pos++;
				var o = this.readDigits(),
					c = T.__constructs__.slice()[o];
				if (null == c) throw haxe_Exception.thrown("Unknown enum index " + e + "@" + o);
				var h = this.unserializeEnum(T, c);
				return this.cache.push(h), h;
			case 107:
				return NaN;
			case 108:
				var l = new haxe_ds_List;
				this.cache.push(l);
				for (i = this.buf; 104 != this.buf.charCodeAt(this.pos);) l.add(this.unserialize());
				return this.pos++, l;
			case 109:
				return -1 / 0;
			case 110:
				return null;
			case 111:
				t = {};
				return this.cache.push(t), this.unserializeObject(t), t;
			case 112:
				return 1 / 0;
			case 113:
				s = new haxe_ds_IntMap;
				this.cache.push(s);
				for (var i = this.buf, u = this.buf.charCodeAt(this.pos++); 58 == u;) {
					var d = this.readDigits(),
						_ = this.unserialize();
					s.h[d] = _, u = this.buf.charCodeAt(this.pos++)
				}
				if (104 != u) throw haxe_Exception.thrown("Invalid IntMap format");
				return s;
			case 114:
				var g;
				if ((g = this.readDigits()) < 0 || g >= this.cache.length) throw haxe_Exception.thrown("Invalid reference");
				return this.cache[g];
			case 115:
				var p = this.readDigits(),
					i = this.buf;
				if (58 != this.buf.charCodeAt(this.pos++) || this.length - this.pos < p) throw haxe_Exception.thrown("Invalid bytes length");
				var w = haxe_Unserializer.CODES;
				null == w && (w = haxe_Unserializer.initCodes(), haxe_Unserializer.CODES = w);
				for (var f = 3 & p, y = (d = this.pos) + (p - f), x = new haxe_io_Bytes(new ArrayBuffer(3 * (p >> 2) + (2 <= f ? f - 1 : 0))), m = 0; d < y;) {
					var E = w[i.charCodeAt(d++)],
						v = w[i.charCodeAt(d++)];
					x.b[m++] = E << 2 | v >> 4;
					var b = w[i.charCodeAt(d++)];
					x.b[m++] = v << 4 | b >> 2;
					var S = w[i.charCodeAt(d++)];
					x.b[m++] = b << 6 | S
				}
				return 2 <= f && (E = w[i.charCodeAt(d++)], v = w[i.charCodeAt(d++)], x.b[m++] = E << 2 | v >> 4, 3 == f && (b = w[i.charCodeAt(d++)], x.b[m++] = v << 4 | b >> 2)), this.pos += p, this.cache.push(x), x;
			case 116:
				return !0;
			case 118:
				var C;
				return 48 <= this.buf.charCodeAt(this.pos) && this.buf.charCodeAt(this.pos) <= 57 && 48 <= this.buf.charCodeAt(this.pos + 1) && this.buf.charCodeAt(this.pos + 1) <= 57 && 48 <= this.buf.charCodeAt(this.pos + 2) && this.buf.charCodeAt(this.pos + 2) <= 57 && 48 <= this.buf.charCodeAt(this.pos + 3) && this.buf.charCodeAt(this.pos + 3) <= 57 && 45 == this.buf.charCodeAt(this.pos + 4) ? (C = HxOverrides.strDate(HxOverrides.substr(this.buf, this.pos, 19)), this.pos += 19) : C = new Date(this.readFloat()), this.cache.push(C), C;
			case 119:
				var T, e = this.unserialize();
				if (null == (T = this.resolver.resolveEnum(e))) throw haxe_Exception.thrown("Enum not found " + e);
				h = this.unserializeEnum(T, this.unserialize());
				return this.cache.push(h), h;
			case 120:
				throw haxe_Exception.thrown(this.unserialize());
			case 121:
				p = this.readDigits();
				if (58 != this.buf.charCodeAt(this.pos++) || this.length - this.pos < p) throw haxe_Exception.thrown("Invalid string length");
				r = HxOverrides.substr(this.buf, this.pos, p);
				return this.pos += p, r = decodeURIComponent(r.split("+").join(" ")), this.scache.push(r), r;
			case 122:
				return 0
		}
		throw this.pos--, haxe_Exception.thrown("Invalid char " + this.buf.charAt(this.pos) + " at position " + this.pos)
	},
	__class__: haxe_Unserializer
};
var haxe_ValueException = function(e, t, s) {
	haxe_Exception.call(this, String(e), t, s), this.value = e
};
$hxClasses["haxe.ValueException"] = haxe_ValueException, haxe_ValueException.__name__ = "haxe.ValueException", haxe_ValueException.__super__ = haxe_Exception, haxe_ValueException.prototype = $extend(haxe_Exception.prototype, {
	unwrap: function() {
		return this.value
	},
	__class__: haxe_ValueException
});
var haxe_io_Bytes = function(e) {
	this.length = e.byteLength, this.b = new Uint8Array(e), (this.b.bufferValue = e).hxBytes = this, e.bytes = this.b
};
$hxClasses["haxe.io.Bytes"] = haxe_io_Bytes, haxe_io_Bytes.__name__ = "haxe.io.Bytes", haxe_io_Bytes.ofString = function(e, t) {
	if (t == haxe_io_Encoding.RawNative) {
		for (var s = new Uint8Array(e.length << 1), i = 0, r = e.length; i < r;) {
			var n = i++,
				_ = e.charCodeAt(n);
			s[n << 1] = 255 & _, s[n << 1 | 1] = _ >> 8
		}
		return new haxe_io_Bytes(s.buffer)
	}
	for (var a = [], n = 0; n < e.length;) {
		55296 <= (_ = e.charCodeAt(n++)) && _ <= 56319 && (_ = _ - 55232 << 10 | 1023 & e.charCodeAt(n++)), _ <= 127 ? a.push(_) : (_ <= 2047 ? a.push(192 | _ >> 6) : (_ <= 65535 ? a.push(224 | _ >> 12) : (a.push(240 | _ >> 18), a.push(128 | _ >> 12 & 63)), a.push(128 | _ >> 6 & 63)), a.push(128 | 63 & _))
	}
	return new haxe_io_Bytes(new Uint8Array(a).buffer)
}, haxe_io_Bytes.ofData = function(e) {
	var t = e.hxBytes;
	return null != t ? t : new haxe_io_Bytes(e)
}, haxe_io_Bytes.prototype = {
	getString: function(e, t, s) {
		if (e < 0 || t < 0 || e + t > this.length) throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
		null == s && (s = haxe_io_Encoding.UTF8);
		var i = "",
			r = this.b,
			n = e,
			_ = e + t;
		switch (s._hx_index) {
			case 0:
				for (var a, o, c; n < _;) {
					if ((h = r[n++]) < 128) {
						if (0 == h) break;
						i += String.fromCodePoint(h)
					} else {
						h < 224 ? (a = (63 & h) << 6 | 127 & r[n++], i += String.fromCodePoint(a)) : h < 240 ? (o = (31 & h) << 12 | (127 & r[n++]) << 6 | 127 & r[n++], i += String.fromCodePoint(o)) : (c = (15 & h) << 18 | (127 & r[n++]) << 12 | (127 & r[n++]) << 6 | 127 & r[n++], i += String.fromCodePoint(c))
					}
				}
				break;
			case 1:
				for (; n < _;) {
					var h = r[n++] | r[n++] << 8;
					i += String.fromCodePoint(h)
				}
		}
		return i
	},
	toString: function() {
		return this.getString(0, this.length)
	},
	__class__: haxe_io_Bytes
};
var haxe_io_Encoding = $hxEnums["haxe.io.Encoding"] = {
		__ename__: "haxe.io.Encoding",
		__constructs__: ["UTF8", "RawNative"],
		UTF8: {
			_hx_index: 0,
			__enum__: "haxe.io.Encoding",
			toString: $estr
		},
		RawNative: {
			_hx_index: 1,
			__enum__: "haxe.io.Encoding",
			toString: $estr
		}
	},
	haxe_crypto_Base64 = function() {};
$hxClasses["haxe.crypto.Base64"] = haxe_crypto_Base64, haxe_crypto_Base64.__name__ = "haxe.crypto.Base64", haxe_crypto_Base64.decode = function(e, t) {
	if (null == t && (t = !0), t)
		for (; 61 == HxOverrides.cca(e, e.length - 1);) e = HxOverrides.substr(e, 0, -1);
	return new haxe_crypto_BaseCode(haxe_crypto_Base64.BYTES).decodeBytes(haxe_io_Bytes.ofString(e))
};
var haxe_crypto_BaseCode = function(e) {
	for (var t = e.length, s = 1; 1 << s < t;) ++s;
	if (8 < s || t != 1 << s) throw haxe_Exception.thrown("BaseCode : base length must be a power of two.");
	this.base = e, this.nbits = s
};
$hxClasses["haxe.crypto.BaseCode"] = haxe_crypto_BaseCode, haxe_crypto_BaseCode.__name__ = "haxe.crypto.BaseCode", haxe_crypto_BaseCode.prototype = {
	initTable: function() {
		for (var e = [], t = 0; t < 256;) {
			e[i = t++] = -1
		}
		for (var t = 0, s = this.base.length; t < s;) {
			var i = t++;
			e[this.base.b[i]] = i
		}
		this.tbl = e
	},
	decodeBytes: function(e) {
		var t = this.nbits;
		this.base;
		null == this.tbl && this.initTable();
		for (var s = this.tbl, i = e.length * t >> 3, r = new haxe_io_Bytes(new ArrayBuffer(i)), n = 0, _ = 0, a = 0, o = 0; o < i;) {
			for (; _ < 8;) {
				_ += t, n <<= t;
				var c = s[e.b[a++]];
				if (-1 == c) throw haxe_Exception.thrown("BaseCode : invalid encoded char");
				n |= c
			}
			_ -= 8, r.b[o++] = n >> _ & 255
		}
		return r
	},
	__class__: haxe_crypto_BaseCode
};
var haxe_ds_GenericCell = function(e, t) {
	this.elt = e, this.next = t
};
$hxClasses["haxe.ds.GenericCell"] = haxe_ds_GenericCell, haxe_ds_GenericCell.__name__ = "haxe.ds.GenericCell", haxe_ds_GenericCell.prototype = {
	__class__: haxe_ds_GenericCell
};
var haxe_ds_GenericStack = function() {};
$hxClasses["haxe.ds.GenericStack"] = haxe_ds_GenericStack, haxe_ds_GenericStack.__name__ = "haxe.ds.GenericStack", haxe_ds_GenericStack.prototype = {
	remove: function(e) {
		for (var t = null, s = this.head; null != s;) {
			if (s.elt == e) {
				null == t ? this.head = s.next : t.next = s.next;
				break
			}
			s = (t = s).next
		}
		return null != s
	},
	iterator: function() {
		var t = this.head;
		return {
			hasNext: function() {
				return null != t
			},
			next: function() {
				var e = t;
				return t = e.next, e.elt
			}
		}
	},
	__class__: haxe_ds_GenericStack
};
var haxe_ds_IntMap = function() {
	this.h = {}
};
$hxClasses["haxe.ds.IntMap"] = haxe_ds_IntMap, haxe_ds_IntMap.__name__ = "haxe.ds.IntMap", haxe_ds_IntMap.__interfaces__ = [haxe_IMap], haxe_ds_IntMap.prototype = {
	keys: function() {
		var e = [];
		for (var t in this.h) this.h.hasOwnProperty(t) && e.push(0 | t);
		return new haxe_iterators_ArrayIterator(e)
	},
	__class__: haxe_ds_IntMap
};
var haxe_ds_List = function() {
	this.length = 0
};
$hxClasses["haxe.ds.List"] = haxe_ds_List, haxe_ds_List.__name__ = "haxe.ds.List", haxe_ds_List.prototype = {
	add: function(e) {
		var t = new haxe_ds__$List_ListNode(e, null);
		null == this.h ? this.h = t : this.q.next = t, this.q = t, this.length++
	},
	push: function(e) {
		var t = new haxe_ds__$List_ListNode(e, this.h);
		this.h = t, null == this.q && (this.q = t), this.length++
	},
	remove: function(e) {
		for (var t = null, s = this.h; null != s;) {
			if (s.item == e) return null == t ? this.h = s.next : t.next = s.next, this.q == s && (this.q = t), this.length--, !0;
			s = (t = s).next
		}
		return !1
	},
	__class__: haxe_ds_List
};
var haxe_ds__$List_ListNode = function(e, t) {
	this.item = e, this.next = t
};
$hxClasses["haxe.ds._List.ListNode"] = haxe_ds__$List_ListNode, haxe_ds__$List_ListNode.__name__ = "haxe.ds._List.ListNode", haxe_ds__$List_ListNode.prototype = {
	__class__: haxe_ds__$List_ListNode
};
var haxe_ds_ObjectMap = function() {
	this.h = {
		__keys__: {}
	}
};
$hxClasses["haxe.ds.ObjectMap"] = haxe_ds_ObjectMap, haxe_ds_ObjectMap.__name__ = "haxe.ds.ObjectMap", haxe_ds_ObjectMap.__interfaces__ = [haxe_IMap], haxe_ds_ObjectMap.prototype = {
	set: function(e, t) {
		var s = e.__id__;
		null == s && (s = e.__id__ = window.$haxeUID++), this.h[s] = t, this.h.__keys__[s] = e
	},
	keys: function() {
		var e = [];
		for (var t in this.h.__keys__) this.h.hasOwnProperty(t) && e.push(this.h.__keys__[t]);
		return new haxe_iterators_ArrayIterator(e)
	},
	__class__: haxe_ds_ObjectMap
};
var haxe_ds_StringMap = function() {
	this.h = Object.create(null)
};
$hxClasses["haxe.ds.StringMap"] = haxe_ds_StringMap, haxe_ds_StringMap.__name__ = "haxe.ds.StringMap", haxe_ds_StringMap.__interfaces__ = [haxe_IMap], haxe_ds_StringMap.keysIterator = function(e) {
	var t = Object.keys(e),
		s = t.length,
		i = 0;
	return {
		hasNext: function() {
			return i < s
		},
		next: function() {
			return t[(i += 1) - 1]
		}
	}
}, haxe_ds_StringMap.prototype = {
	__class__: haxe_ds_StringMap
};
var haxe_http_HttpBase = function(e) {
	this.url = e, this.headers = [], this.params = [], this.emptyOnData = $bind(this, this.onData)
};
$hxClasses["haxe.http.HttpBase"] = haxe_http_HttpBase, haxe_http_HttpBase.__name__ = "haxe.http.HttpBase", haxe_http_HttpBase.prototype = {
	onData: function(e) {},
	onBytes: function(e) {},
	onError: function(e) {},
	onStatus: function(e) {},
	hasOnData: function() {
		return !Reflect.compareMethods($bind(this, this.onData), this.emptyOnData)
	},
	success: function(e) {
		this.responseBytes = e, this.responseAsString = null, this.hasOnData() && this.onData(this.get_responseData()), this.onBytes(this.responseBytes)
	},
	get_responseData: function() {
		return null == this.responseAsString && null != this.responseBytes && (this.responseAsString = this.responseBytes.getString(0, this.responseBytes.length, haxe_io_Encoding.UTF8)), this.responseAsString
	},
	__class__: haxe_http_HttpBase,
	__properties__: {
		get_responseData: "get_responseData"
	}
};
var haxe_http_HttpJs = function(e) {
	this.async = !0, this.withCredentials = !1, haxe_http_HttpBase.call(this, e)
};
$hxClasses["haxe.http.HttpJs"] = haxe_http_HttpJs, haxe_http_HttpJs.__name__ = "haxe.http.HttpJs", haxe_http_HttpJs.__super__ = haxe_http_HttpBase, haxe_http_HttpJs.prototype = $extend(haxe_http_HttpBase.prototype, {
	request: function(e) {
		var r = this;
		this.responseAsString = null, this.responseBytes = null;

		function t(e) {
			if (4 == n.readyState) {
				var t, s;
				try {
					t = n.status
				} catch (e) {
					t = null
				}
				if (0 == t && "undefined" != typeof window && null != window.location && (s = window.location.protocol.toLowerCase(), new EReg("^(?:about|app|app-storage|.+-extension|file|res|widget):$", "").match(s) && (t = null != n.response ? 200 : 404)), null == t && (t = null), null != t && r.onStatus(t), null != t && 200 <= t && t < 400) r.req = null, r.success(haxe_io_Bytes.ofData(n.response));
				else if (null == t || 0 == t && null == n.response) r.req = null, r.onError("Failed to connect or resolve host");
				else if (null == t) {
					var i = (r.req = null) != n.response ? haxe_io_Bytes.ofData(n.response) : null;
					r.responseBytes = i, r.onError("Http Error #" + n.status)
				} else switch (t) {
					case 12007:
						r.req = null, r.onError("Unknown host");
						break;
					case 12029:
						r.req = null, r.onError("Failed to connect to host");
						break;
					default:
						i = (r.req = null) != n.response ? haxe_io_Bytes.ofData(n.response) : null;
						r.responseBytes = i, r.onError("Http Error #" + n.status)
				}
			}
		}
		var n = this.req = js_Browser.createXMLHttpRequest();
		this.async && (n.onreadystatechange = t);
		var s, i, _ = this.postBytes;
		if (null != (s = null == (a = this.postData) ? null == _ ? null : new Blob([_.b.bufferValue]) : null == _ ? a : null)) e = !0;
		else
			for (var _ = 0, a = this.params; _ < a.length;) {
				var o = a[_];
				++_, s = null == s ? "" : (null == s ? "null" : Std.string(s)) + "&";
				var c = o.name,
					h = (null == s ? "null" : Std.string(s)) + encodeURIComponent(c) + "=",
					l = o.value;
				s = h + encodeURIComponent(l)
			}
		try {
			e ? n.open("POST", this.url, this.async) : null != s ? (i = this.url.split("?").length <= 1, n.open("GET", this.url + (i ? "?" : "&") + (null == s ? "null" : Std.string(s)), this.async), s = null) : n.open("GET", this.url, this.async), n.responseType = "arraybuffer"
		} catch (_) {
			var u = haxe_Exception.caught(_).unwrap();
			return this.req = null, void this.onError(u.toString())
		}
		n.withCredentials = this.withCredentials, !Lambda.exists(this.headers, function(e) {
			return "Content-Type" == e.name
		}) && e && null == this.postData && n.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		for (_ = 0, a = this.headers; _ < a.length;) {
			var d = a[_];
			++_, n.setRequestHeader(d.name, d.value)
		}
		n.send(s), this.async || t()
	},
	__class__: haxe_http_HttpJs
});
var haxe_io_Error = $hxEnums["haxe.io.Error"] = {
		__ename__: "haxe.io.Error",
		__constructs__: ["Blocked", "Overflow", "OutsideBounds", "Custom"],
		Blocked: {
			_hx_index: 0,
			__enum__: "haxe.io.Error",
			toString: $estr
		},
		Overflow: {
			_hx_index: 1,
			__enum__: "haxe.io.Error",
			toString: $estr
		},
		OutsideBounds: {
			_hx_index: 2,
			__enum__: "haxe.io.Error",
			toString: $estr
		},
		Custom: ($_ = function(e) {
			return {
				_hx_index: 3,
				e: e,
				__enum__: "haxe.io.Error",
				toString: $estr
			}
		}, $_.__params__ = ["e"], $_)
	},
	haxe_iterators_ArrayIterator = function(e) {
		this.current = 0, this.array = e
	};
$hxClasses["haxe.iterators.ArrayIterator"] = haxe_iterators_ArrayIterator, haxe_iterators_ArrayIterator.__name__ = "haxe.iterators.ArrayIterator", haxe_iterators_ArrayIterator.prototype = {
	hasNext: function() {
		return this.current < this.array.length
	},
	next: function() {
		return this.array[this.current++]
	},
	__class__: haxe_iterators_ArrayIterator
};
var haxe_xml_XmlParserException = function(e, t, s) {
	this.xml = t, this.message = e, this.position = s, this.lineNumber = 1;
	for (var i = this.positionAtLine = 0, r = s; i < r;) {
		var n = i++,
			_ = t.charCodeAt(n);
		10 == _ ? (this.lineNumber++, this.positionAtLine = 0) : 13 != _ && this.positionAtLine++
	}
};
$hxClasses["haxe.xml.XmlParserException"] = haxe_xml_XmlParserException, haxe_xml_XmlParserException.__name__ = "haxe.xml.XmlParserException", haxe_xml_XmlParserException.prototype = {
	toString: function() {
		return js_Boot.getClass(this).__name__ + ": " + this.message + " at line " + this.lineNumber + " char " + this.positionAtLine
	},
	__class__: haxe_xml_XmlParserException
};
var haxe_xml_Parser = function() {};
$hxClasses["haxe.xml.Parser"] = haxe_xml_Parser, haxe_xml_Parser.__name__ = "haxe.xml.Parser", haxe_xml_Parser.parse = function(e, t) {
	null == t && (t = !1);
	var s = Xml.createDocument();
	return haxe_xml_Parser.doParse(e, t, 0, s), s
}, haxe_xml_Parser.doParse = function(e, t, s, i) {
	null == s && (s = 0);
	for (var r, n, _, a, o, c, h, l, u, d = null, g = 1, p = 1, w = null, f = 0, y = 0, x = 0, m = e.charCodeAt(s), E = new StringBuf, v = 1, b = -1; m == m;) {
		switch (g) {
			case 0:
				switch (m) {
					case 9:
					case 10:
					case 13:
					case 32:
						break;
					default:
						g = p;
						continue
				}
				break;
			case 1:
				if (60 != m) {
					f = s, g = 13;
					continue
				}
				g = 0, p = 2;
				break;
			case 2:
				switch (m) {
					case 33:
						if (91 == e.charCodeAt(s + 1)) {
							if (s += 2, "CDATA[" != HxOverrides.substr(e, s, 6).toUpperCase()) throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Expected <![CDATA[", e, s));
							g = 17, f = (s += 5) + 1
						} else if (68 == e.charCodeAt(s + 1) || 100 == e.charCodeAt(s + 1)) {
							if ("OCTYPE" != HxOverrides.substr(e, s + 2, 6).toUpperCase()) throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Expected <!DOCTYPE", e, s));
							g = 16, f = (s += 8) + 1
						} else {
							if (45 != e.charCodeAt(s + 1) || 45 != e.charCodeAt(s + 2)) throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Expected \x3c!--", e, s));
							g = 15, f = (s += 2) + 1
						}
						break;
					case 47:
						if (null == i) throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Expected node name", e, s));
						f = s + 1, g = 0, p = 10;
						break;
					case 63:
						g = 14, f = s;
						break;
					default:
						g = 3, f = s;
						continue
				}
				break;
			case 3:
				if (97 <= m && m <= 122 || 65 <= m && m <= 90 || 48 <= m && m <= 57 || 58 == m || 46 == m || 95 == m || 45 == m) break;
				if (s == f) throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Expected node name", e, s));
				d = Xml.createElement(HxOverrides.substr(e, f, s - f)), i.addChild(d), ++y, g = 0, p = 4;
				continue;
			case 4:
				switch (m) {
					case 47:
						g = 11;
						break;
					case 62:
						g = 9;
						break;
					default:
						g = 5, f = s;
						continue
				}
				break;
			case 5:
				if (97 <= m && m <= 122 || 65 <= m && m <= 90 || 48 <= m && m <= 57 || 58 == m || 46 == m || 95 == m || 45 == m) break;
				if (f == s) throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Expected attribute name", e, s));
				w = HxOverrides.substr(e, f, s - f);
				if (d.exists(w)) throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Duplicate attribute [" + w + "]", e, s));
				g = 0, p = 6;
				continue;
			case 6:
				if (61 != m) throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Expected =", e, s));
				g = 0, p = 7;
				break;
			case 7:
				switch (m) {
					case 34:
					case 39:
						E = new StringBuf, g = 8, f = s + 1, b = m;
						break;
					default:
						throw haxe_Exception.thrown(new haxe_xml_XmlParserException('Expected "', e, s))
				}
				break;
			case 8:
				switch (m) {
					case 38:
						var S = s - f;
						E.b += null == S ? HxOverrides.substr(e, f, null) : HxOverrides.substr(e, f, S), g = 18, v = 8, f = s + 1;
						break;
					case 60:
					case 62:
						if (t) throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Invalid unescaped " + String.fromCodePoint(m) + " in attribute value", e, s));
						m == b && (r = s - f, E.b += null == r ? HxOverrides.substr(e, f, null) : HxOverrides.substr(e, f, r), n = E.b, E = new StringBuf, d.set(w, n), g = 0, p = 4);
						break;
					default:
						m == b && (_ = s - f, E.b += null == _ ? HxOverrides.substr(e, f, null) : HxOverrides.substr(e, f, _), a = E.b, E = new StringBuf, d.set(w, a), g = 0, p = 4)
				}
				break;
			case 9:
				f = s = haxe_xml_Parser.doParse(e, t, s, d), g = 1;
				break;
			case 10:
				if (97 <= m && m <= 122 || 65 <= m && m <= 90 || 48 <= m && m <= 57 || 58 == m || 46 == m || 95 == m || 45 == m) break;
				if (f == s) throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Expected node name", e, s));
				var C = HxOverrides.substr(e, f, s - f);
				if (null == i || 0 != i.nodeType) throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Unexpected </" + C + ">, tag is not open", e, s));
				if (i.nodeType != Xml.Element) throw haxe_Exception.thrown("Bad node type, expected Element but found " + (null == i.nodeType ? "null" : XmlType.toString(i.nodeType)));
				if (C != i.nodeName) {
					if (i.nodeType != Xml.Element) throw haxe_Exception.thrown("Bad node type, expected Element but found " + (null == i.nodeType ? "null" : XmlType.toString(i.nodeType)));
					throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Expected </" + i.nodeName + ">", e, s))
				}
				g = 0, p = 12;
				continue;
			case 11:
				if (62 != m) throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Expected >", e, s));
				g = 1;
				break;
			case 12:
				if (62 == m) return 0 == y && i.addChild(Xml.createPCData("")), s;
				throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Expected >", e, s));
			case 13:
				60 == m ? (o = s - f, E.b += null == o ? HxOverrides.substr(e, f, null) : HxOverrides.substr(e, f, o), c = Xml.createPCData(E.b), E = new StringBuf, i.addChild(c), ++y, g = 0, p = 2) : 38 == m && (h = s - f, E.b += null == h ? HxOverrides.substr(e, f, null) : HxOverrides.substr(e, f, h), g = 18, v = 13, f = s + 1);
				break;
			case 14:
				63 == m && 62 == e.charCodeAt(s + 1) && (++s, l = HxOverrides.substr(e, f + 1, s - f - 2), i.addChild(Xml.createProcessingInstruction(l)), ++y, g = 1);
				break;
			case 15:
				45 == m && 45 == e.charCodeAt(s + 1) && 62 == e.charCodeAt(s + 2) && (i.addChild(Xml.createComment(HxOverrides.substr(e, f, s - f))), ++y, s += 2, g = 1);
				break;
			case 16:
				91 == m ? ++x : 93 == m ? --x : 62 == m && 0 == x && (i.addChild(Xml.createDocType(HxOverrides.substr(e, f, s - f))), ++y, g = 1);
				break;
			case 17:
				93 == m && 93 == e.charCodeAt(s + 1) && 62 == e.charCodeAt(s + 2) && (u = Xml.createCData(HxOverrides.substr(e, f, s - f)), i.addChild(u), ++y, s += 2, g = 1);
				break;
			case 18:
				if (59 == m) {
					var T = HxOverrides.substr(e, f, s - f);
					if (35 == T.charCodeAt(0)) {
						var A = 120 == T.charCodeAt(1) ? Std.parseInt("0" + HxOverrides.substr(T, 1, T.length - 1)) : Std.parseInt(HxOverrides.substr(T, 1, T.length - 1));
						E.b += String.fromCodePoint(A)
					} else if (Object.prototype.hasOwnProperty.call(haxe_xml_Parser.escapes.h, T)) E.b += Std.string(haxe_xml_Parser.escapes.h[T]);
					else {
						if (t) throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Undefined entity: " + T, e, s));
						E.b += Std.string("&" + T + ";")
					}
					f = s + 1, g = v
				} else if (!(97 <= m && m <= 122 || 65 <= m && m <= 90 || 48 <= m && m <= 57 || 58 == m || 46 == m || 95 == m || 45 == m) && 35 != m) {
					if (t) throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Invalid character in entity: " + String.fromCodePoint(m), e, s));
					E.b += String.fromCodePoint(38);
					var I = s - f;
					E.b += null == I ? HxOverrides.substr(e, f, null) : HxOverrides.substr(e, f, I), f = --s + 1, g = v
				}
		}
		m = e.charCodeAt(++s)
	}
	if (1 == g && (f = s, g = 13), 13 == g) {
		if (0 != i.nodeType) return s == f && 0 != y || (S = s - f, E.b += null == S ? HxOverrides.substr(e, f, null) : HxOverrides.substr(e, f, S), i.addChild(Xml.createPCData(E.b)), ++y), s;
		if (i.nodeType != Xml.Element) throw haxe_Exception.thrown("Bad node type, expected Element but found " + (null == i.nodeType ? "null" : XmlType.toString(i.nodeType)));
		throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Unclosed node <" + i.nodeName + ">", e, s))
	}
	if (t || 18 != g || 13 != v) throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Unexpected end", e, s));
	E.b += String.fromCodePoint(38);
	S = s - f;
	return E.b += null == S ? HxOverrides.substr(e, f, null) : HxOverrides.substr(e, f, S), i.addChild(Xml.createPCData(E.b)), ++y, s
};
var haxe_xml_Printer = function(e) {
	this.output = new StringBuf, this.pretty = e
};
$hxClasses["haxe.xml.Printer"] = haxe_xml_Printer, haxe_xml_Printer.__name__ = "haxe.xml.Printer", haxe_xml_Printer.print = function(e, t) {
	null == t && (t = !1);
	var s = new haxe_xml_Printer(t);
	return s.writeNode(e, ""), s.output.b
}, haxe_xml_Printer.prototype = {
	writeNode: function(e, t) {
		switch (e.nodeType) {
			case 0:
				if (this.output.b += Std.string(t + "<"), e.nodeType != Xml.Element) throw haxe_Exception.thrown("Bad node type, expected Element but found " + (null == e.nodeType ? "null" : XmlType.toString(e.nodeType)));
				this.output.b += Std.string(e.nodeName);
				for (var s = e.attributes(); s.hasNext();) {
					var i = s.next();
					this.output.b += Std.string(" " + i + '="');
					var r = StringTools.htmlEscape(e.get(i), !0);
					this.output.b += Std.string(r), this.output.b += '"'
				}
				if (this.hasChildren(e)) {
					if (this.output.b += ">", this.pretty && (this.output.b += "\n"), e.nodeType != Xml.Document && e.nodeType != Xml.Element) throw haxe_Exception.thrown("Bad node type, expected Element or Document but found " + (null == e.nodeType ? "null" : XmlType.toString(e.nodeType)));
					for (var n = 0, _ = e.children; n < _.length;) {
						var a = _[n++];
						this.writeNode(a, this.pretty ? t + "\t" : t)
					}
					if (this.output.b += Std.string(t + "</"), e.nodeType != Xml.Element) throw haxe_Exception.thrown("Bad node type, expected Element but found " + (null == e.nodeType ? "null" : XmlType.toString(e.nodeType)));
					this.output.b += Std.string(e.nodeName), this.output.b += ">", this.pretty && (this.output.b += "\n")
				} else this.output.b += "/>", this.pretty && (this.output.b += "\n");
				break;
			case 1:
				if (e.nodeType == Xml.Document || e.nodeType == Xml.Element) throw haxe_Exception.thrown("Bad node type, unexpected " + (null == e.nodeType ? "null" : XmlType.toString(e.nodeType)));
				var o = e.nodeValue;
				0 != o.length && (r = t + StringTools.htmlEscape(o), this.output.b += Std.string(r), this.pretty && (this.output.b += "\n"));
				break;
			case 2:
				if (this.output.b += Std.string(t + "<![CDATA["), e.nodeType == Xml.Document || e.nodeType == Xml.Element) throw haxe_Exception.thrown("Bad node type, unexpected " + (null == e.nodeType ? "null" : XmlType.toString(e.nodeType)));
				this.output.b += Std.string(e.nodeValue), this.output.b += "]]>", this.pretty && (this.output.b += "\n");
				break;
			case 3:
				if (e.nodeType == Xml.Document || e.nodeType == Xml.Element) throw haxe_Exception.thrown("Bad node type, unexpected " + (null == e.nodeType ? "null" : XmlType.toString(e.nodeType)));
				var c = e.nodeValue,
					h = new RegExp("[\n\r\t]+", "g".split("u").join(""));
				c = "\x3c!--" + (c = c.replace(h, "")) + "--\x3e", this.output.b += null == t ? "null" : "" + t;
				r = StringTools.trim(c);
				this.output.b += Std.string(r), this.pretty && (this.output.b += "\n");
				break;
			case 4:
				if (e.nodeType == Xml.Document || e.nodeType == Xml.Element) throw haxe_Exception.thrown("Bad node type, unexpected " + (null == e.nodeType ? "null" : XmlType.toString(e.nodeType)));
				this.output.b += Std.string("<!DOCTYPE " + e.nodeValue + ">"), this.pretty && (this.output.b += "\n");
				break;
			case 5:
				if (e.nodeType == Xml.Document || e.nodeType == Xml.Element) throw haxe_Exception.thrown("Bad node type, unexpected " + (null == e.nodeType ? "null" : XmlType.toString(e.nodeType)));
				this.output.b += Std.string("<?" + e.nodeValue + "?>"), this.pretty && (this.output.b += "\n");
				break;
			case 6:
				if (e.nodeType != Xml.Document && e.nodeType != Xml.Element) throw haxe_Exception.thrown("Bad node type, expected Element or Document but found " + (null == e.nodeType ? "null" : XmlType.toString(e.nodeType)));
				for (n = 0, _ = e.children; n < _.length;) {
					a = _[n++];
					this.writeNode(a, t)
				}
		}
	},
	hasChildren: function(e) {
		if (e.nodeType != Xml.Document && e.nodeType != Xml.Element) throw haxe_Exception.thrown("Bad node type, expected Element or Document but found " + (null == e.nodeType ? "null" : XmlType.toString(e.nodeType)));
		for (var t = 0, s = e.children; t < s.length;) {
			var i = s[t++];
			switch (i.nodeType) {
				case 0:
				case 1:
					return !0;
				case 2:
				case 3:
					if (i.nodeType == Xml.Document || i.nodeType == Xml.Element) throw haxe_Exception.thrown("Bad node type, unexpected " + (null == i.nodeType ? "null" : XmlType.toString(i.nodeType)));
					if (0 != StringTools.ltrim(i.nodeValue).length) return !0
			}
		}
		return !1
	},
	__class__: haxe_xml_Printer
};
var js_Boot = function() {};
$hxClasses["js.Boot"] = js_Boot, js_Boot.__name__ = "js.Boot", js_Boot.getClass = function(e) {
	if (null == e) return null;
	if (e instanceof Array) return Array;
	var t = e.__class__;
	if (null != t) return t;
	var s = js_Boot.__nativeClassName(e);
	return null != s ? js_Boot.__resolveNativeClass(s) : null
}, js_Boot.__string_rec = function(r, n) {
	if (null == r) return "null";
	if (5 <= n.length) return "<...>";
	var e, t = typeof r;
	switch ("function" == t && (r.__name__ || r.__ename__) && (t = "object"), t) {
		case "function":
			return "<function>";
		case "object":
			if (r.__enum__) {
				var s = $hxEnums[r.__enum__],
					i = s.__constructs__[r._hx_index],
					_ = s[i];
				return _.__params__ ? (n += "\t", i + "(" + function() {
					for (var e = [], t = 0, s = _.__params__; t < s.length;) {
						var i = s[t];
						t += 1, e.push(js_Boot.__string_rec(r[i], n))
					}
					return e
				}().join(",") + ")") : i
			}
			if (r instanceof Array) {
				var a = "[";
				n += "\t";
				for (var o = 0, c = r.length; o < c;) {
					var h = o++;
					a += (0 < h ? "," : "") + js_Boot.__string_rec(r[h], n)
				}
				return a += "]"
			}
			try {
				e = r.toString
			} catch (o) {
				return "???"
			}
			if (null != e && e != Object.toString && "function" == typeof e) {
				var l = r.toString();
				if ("[object Object]" != l) return l
			}
			a = "{\n";
			n += "\t";
			var u = null != r.hasOwnProperty,
				d = null;
			for (d in r) u && !r.hasOwnProperty(d) || "prototype" != d && "__class__" != d && "__super__" != d && "__interfaces__" != d && "__properties__" != d && (2 != a.length && (a += ", \n"), a += n + d + " : " + js_Boot.__string_rec(r[d], n));
			return a += "\n" + (n = n.substring(1)) + "}";
		case "string":
			return r;
		default:
			return String(r)
	}
}, js_Boot.__interfLoop = function(e, t) {
	if (null == e) return !1;
	if (e == t) return !0;
	var s = e.__interfaces__;
	if (null != s)
		for (var i = 0, r = s.length; i < r;) {
			var n = s[i++];
			if (n == t || js_Boot.__interfLoop(n, t)) return !0
		}
	return js_Boot.__interfLoop(e.__super__, t)
}, js_Boot.__instanceof = function(e, t) {
	if (null == t) return !1;
	switch (t) {
		case Array:
			return e instanceof Array;
		case Bool:
			return "boolean" == typeof e;
		case Dynamic:
			return null != e;
		case Float:
			return "number" == typeof e;
		case Int:
			return "number" == typeof e && (0 | e) === e;
		case String:
			return "string" == typeof e;
		default:
			if (null == e) return !1;
			if ("function" == typeof t) {
				if (js_Boot.__downcastCheck(e, t)) return !0
			} else if ("object" == typeof t && js_Boot.__isNativeObj(t) && e instanceof t) return !0;
			return t == Class && null != e.__name__ ? !0 : t == Enum && null != e.__ename__ || null != e.__enum__ && $hxEnums[e.__enum__] == t
	}
}, js_Boot.__downcastCheck = function(e, t) {
	return e instanceof t || !!t.__isInterface__ && js_Boot.__interfLoop(js_Boot.getClass(e), t)
}, js_Boot.__implements = function(e, t) {
	return js_Boot.__interfLoop(js_Boot.getClass(e), t)
}, js_Boot.__cast = function(e, t) {
	if (null == e || js_Boot.__instanceof(e, t)) return e;
	throw haxe_Exception.thrown("Cannot cast " + Std.string(e) + " to " + Std.string(t))
}, js_Boot.__nativeClassName = function(e) {
	var t = js_Boot.__toStr.call(e).slice(8, -1);
	return "Object" == t || "Function" == t || "Math" == t || "JSON" == t ? null : t
}, js_Boot.__isNativeObj = function(e) {
	return null != js_Boot.__nativeClassName(e)
}, js_Boot.__resolveNativeClass = function(e) {
	return window[e]
};
var js_Browser = function() {};
$hxClasses["js.Browser"] = js_Browser, js_Browser.__name__ = "js.Browser", js_Browser.getLocalStorage = function() {
	try {
		var e, t = window.localStorage;
		return t.getItem(""), 0 == t.length && (e = "_hx_" + Math.random(), t.setItem(e, e), t.removeItem(e)), t
	} catch (e) {
		return null
	}
}, js_Browser.getSessionStorage = function() {
	try {
		var e, t = window.sessionStorage;
		return t.getItem(""), 0 == t.length && (e = "_hx_" + Math.random(), t.setItem(e, e), t.removeItem(e)), t
	} catch (e) {
		return null
	}
}, js_Browser.createXMLHttpRequest = function() {
	if ("undefined" != typeof XMLHttpRequest) return new XMLHttpRequest;
	if ("undefined" != typeof ActiveXObject) return new ActiveXObject("Microsoft.XMLHTTP");
	throw haxe_Exception.thrown("Unable to create XMLHttpRequest object.")
};
var js_Cookie = function() {};
$hxClasses["js.Cookie"] = js_Cookie, js_Cookie.__name__ = "js.Cookie", js_Cookie.set = function(e, t, s, i, r) {
	var n = e + "=" + encodeURIComponent(t);
	null != s && (n += ";expires=" + new Date((new Date).getTime() + 1e3 * s).toGMTString()), null != i && (n += ";path=" + i), null != r && (n += ";domain=" + r), window.document.cookie = n
}, js_Cookie.all = function() {
	for (var e = new haxe_ds_StringMap, t = window.document.cookie.split(";"), s = 0; s < t.length;) {
		var i = t[s];
		++s;
		var r, n = (i = StringTools.ltrim(i)).split("=");
		n.length < 2 || (r = decodeURIComponent(n[1].split("+").join(" ")), e.h[n[0]] = r)
	}
	return e
}, js_Cookie.get = function(e) {
	return js_Cookie.all().h[e]
}, js_Cookie.exists = function(e) {
	var t = js_Cookie.all();
	return Object.prototype.hasOwnProperty.call(t.h, e)
}, js_Cookie.remove = function(e, t, s) {
	js_Cookie.set(e, "", -10, t, s)
};
var tweezer_EEase = $hxEnums["tweezer.EEase"] = {
		__ename__: "tweezer.EEase",
		__constructs__: ["EASE_IN", "EASE_IN_OUT", "EASE_OUT", "EASE_OUT_IN"],
		EASE_IN: {
			_hx_index: 0,
			__enum__: "tweezer.EEase",
			toString: $estr
		},
		EASE_IN_OUT: {
			_hx_index: 1,
			__enum__: "tweezer.EEase",
			toString: $estr
		},
		EASE_OUT: {
			_hx_index: 2,
			__enum__: "tweezer.EEase",
			toString: $estr
		},
		EASE_OUT_IN: {
			_hx_index: 3,
			__enum__: "tweezer.EEase",
			toString: $estr
		}
	},
	tweezer_ETween = $hxEnums["tweezer.ETween"] = {
		__ename__: "tweezer.ETween",
		__constructs__: ["BACK", "BOUNCE", "CIRCULAR", "CUBIC", "ELASTIC", "EXPONENTIAL", "LINEAR", "QUADRATIC", "QUARTIC", "QUINTIC", "SINE"],
		BACK: ($_ = function(e) {
			return {
				_hx_index: 0,
				p_overshoot: e,
				__enum__: "tweezer.ETween",
				toString: $estr
			}
		}, $_.__params__ = ["p_overshoot"], $_),
		BOUNCE: {
			_hx_index: 1,
			__enum__: "tweezer.ETween",
			toString: $estr
		},
		CIRCULAR: {
			_hx_index: 2,
			__enum__: "tweezer.ETween",
			toString: $estr
		},
		CUBIC: {
			_hx_index: 3,
			__enum__: "tweezer.ETween",
			toString: $estr
		},
		ELASTIC: ($_ = function(e, t) {
			return {
				_hx_index: 4,
				p_period: e,
				p_amplitude: t,
				__enum__: "tweezer.ETween",
				toString: $estr
			}
		}, $_.__params__ = ["p_period", "p_amplitude"], $_),
		EXPONENTIAL: {
			_hx_index: 5,
			__enum__: "tweezer.ETween",
			toString: $estr
		},
		LINEAR: {
			_hx_index: 6,
			__enum__: "tweezer.ETween",
			toString: $estr
		},
		QUADRATIC: {
			_hx_index: 7,
			__enum__: "tweezer.ETween",
			toString: $estr
		},
		QUARTIC: {
			_hx_index: 8,
			__enum__: "tweezer.ETween",
			toString: $estr
		},
		QUINTIC: {
			_hx_index: 9,
			__enum__: "tweezer.ETween",
			toString: $estr
		},
		SINE: {
			_hx_index: 10,
			__enum__: "tweezer.ETween",
			toString: $estr
		}
	},
	tweezer_TweenFactory = function() {};
$hxClasses["tweezer.TweenFactory"] = tweezer_TweenFactory, tweezer_TweenFactory.__name__ = "tweezer.TweenFactory", tweezer_TweenFactory.createTweenFunction = function(t, s, i, e, r) {
	switch (null == e && (e = tweezer_EEase.EASE_IN), null == r && (r = tweezer_ETween.LINEAR), r._hx_index) {
		case 0:
			var n = r.p_overshoot;
			switch (null == n && (n = 1.70158), e._hx_index) {
				case 0:
					return function(e) {
						return tweezer_tweens_Back.easeIn(e, t, s, i, n)
					};
				case 1:
					return function(e) {
						return tweezer_tweens_Back.easeInOut(e, t, s, i, n)
					};
				case 2:
					return function(e) {
						return tweezer_tweens_Back.easeOut(e, t, s, i, n)
					};
				case 3:
					return function(e) {
						return tweezer_tweens_Back.easeOutIn(e, t, s, i, n)
					}
			}
			break;
		case 1:
			switch (e._hx_index) {
				case 0:
					return function(e) {
						return tweezer_tweens_Bounce.easeIn(e, t, s, i)
					};
				case 1:
					return function(e) {
						return tweezer_tweens_Bounce.easeInOut(e, t, s, i)
					};
				case 2:
					return function(e) {
						return tweezer_tweens_Bounce.easeOut(e, t, s, i)
					};
				case 3:
					return function(e) {
						return tweezer_tweens_Bounce.easeOutIn(e, t, s, i)
					}
			}
			break;
		case 2:
			switch (e._hx_index) {
				case 0:
					return function(e) {
						return tweezer_tweens_Circular.easeIn(e, t, s, i)
					};
				case 1:
					return function(e) {
						return tweezer_tweens_Circular.easeInOut(e, t, s, i)
					};
				case 2:
					return function(e) {
						return tweezer_tweens_Circular.easeOut(e, t, s, i)
					};
				case 3:
					return function(e) {
						return tweezer_tweens_Circular.easeOutIn(e, t, s, i)
					}
			}
			break;
		case 3:
			switch (e._hx_index) {
				case 0:
					return function(e) {
						return tweezer_tweens_Cubic.easeIn(e, t, s, i)
					};
				case 1:
					return function(e) {
						return tweezer_tweens_Cubic.easeInOut(e, t, s, i)
					};
				case 2:
					return function(e) {
						return tweezer_tweens_Cubic.easeOut(e, t, s, i)
					};
				case 3:
					return function(e) {
						return tweezer_tweens_Cubic.easeOutIn(e, t, s, i)
					}
			}
			break;
		case 4:
			var _ = r.p_amplitude,
				a = r.p_period;
			switch (null == a && (a = .3 * i * (e == tweezer_EEase.EASE_IN_OUT ? 1.5 : 1)), null == _ && (_ = 0), e._hx_index) {
				case 0:
					return function(e) {
						return tweezer_tweens_Elastic.easeIn(e, t, s, i, a, _)
					};
				case 1:
					return function(e) {
						return tweezer_tweens_Elastic.easeInOut(e, t, s, i, a, _)
					};
				case 2:
					return function(e) {
						return tweezer_tweens_Elastic.easeOut(e, t, s, i, a, _)
					};
				case 3:
					return function(e) {
						return tweezer_tweens_Elastic.easeOutIn(e, t, s, i, a, _)
					}
			}
			break;
		case 5:
			switch (e._hx_index) {
				case 0:
					return function(e) {
						return tweezer_tweens_Exponential.easeIn(e, t, s, i)
					};
				case 1:
					return function(e) {
						return tweezer_tweens_Exponential.easeInOut(e, t, s, i)
					};
				case 2:
					return function(e) {
						return tweezer_tweens_Exponential.easeOut(e, t, s, i)
					};
				case 3:
					return function(e) {
						return tweezer_tweens_Exponential.easeOutIn(e, t, s, i)
					}
			}
			break;
		case 6:
			return function(e) {
				return tweezer_tweens_Linear.ease(e, t, s, i)
			};
		case 7:
			switch (e._hx_index) {
				case 0:
					return function(e) {
						return tweezer_tweens_Quadratic.easeIn(e, t, s, i)
					};
				case 1:
					return function(e) {
						return tweezer_tweens_Quadratic.easeInOut(e, t, s, i)
					};
				case 2:
					return function(e) {
						return tweezer_tweens_Quadratic.easeOut(e, t, s, i)
					};
				case 3:
					return function(e) {
						return tweezer_tweens_Quadratic.easeOutIn(e, t, s, i)
					}
			}
			break;
		case 8:
			switch (e._hx_index) {
				case 0:
					return function(e) {
						return tweezer_tweens_Quartic.easeIn(e, t, s, i)
					};
				case 1:
					return function(e) {
						return tweezer_tweens_Quartic.easeInOut(e, t, s, i)
					};
				case 2:
					return function(e) {
						return tweezer_tweens_Quartic.easeOut(e, t, s, i)
					};
				case 3:
					return function(e) {
						return tweezer_tweens_Quartic.easeOutIn(e, t, s, i)
					}
			}
			break;
		case 9:
			switch (e._hx_index) {
				case 0:
					return function(e) {
						return tweezer_tweens_Quintic.easeIn(e, t, s, i)
					};
				case 1:
					return function(e) {
						return tweezer_tweens_Quintic.easeInOut(e, t, s, i)
					};
				case 2:
					return function(e) {
						return tweezer_tweens_Quintic.easeOut(e, t, s, i)
					};
				case 3:
					return function(e) {
						return tweezer_tweens_Quintic.easeOutIn(e, t, s, i)
					}
			}
			break;
		case 10:
			switch (e._hx_index) {
				case 0:
					return function(e) {
						return tweezer_tweens_Sine.easeIn(e, t, s, i)
					};
				case 1:
					return function(e) {
						return tweezer_tweens_Sine.easeInOut(e, t, s, i)
					};
				case 2:
					return function(e) {
						return tweezer_tweens_Sine.easeOut(e, t, s, i)
					};
				case 3:
					return function(e) {
						return tweezer_tweens_Sine.easeOutIn(e, t, s, i)
					}
			}
	}
};
var tweezer_Tweezer = function(e, t, s, i, r, n, _, a, o, c, h) {
	null == _ && (_ = 0), null == n && (n = 1e3), null == r && (r = 0), this._updateCallback = t, this._startValue = s, this._endValue = i, this._startDelay = r, this._duration = n, this._endDelay = _, this._easeType = a, this._tweenType = o, this._completeCallback = c, this._isSnap = h, awe6_core_Entity.call(this, e), this._updater(), this._updates = 0
};
$hxClasses["tweezer.Tweezer"] = tweezer_Tweezer, tweezer_Tweezer.__name__ = "tweezer.Tweezer", tweezer_Tweezer.__super__ = awe6_core_Entity, tweezer_Tweezer.prototype = $extend(awe6_core_Entity.prototype, {
	_init: function() {
		awe6_core_Entity.prototype._init.call(this), this._tweenFunction = tweezer_TweenFactory.createTweenFunction(this._startValue, this._endValue - this._startValue, this._duration, this._easeType, this._tweenType)
	},
	_updater: function(e) {
		var t;
		null == e && (e = 0), awe6_core_Entity.prototype._updater.call(this, e), null != this._updateCallback && (t = this._tweenFunction(Math.min(Math.max(0, this._age - this._startDelay), this._duration)), this._updateCallback(this._isSnap ? Math.round(t) : t)), this._age >= this._startDelay + this._duration + this._endDelay && (null != this._completeCallback && this._completeCallback(), this.isDisposed || (this.isDisposed = !0, this.set_isActive(!1), this._disposer()))
	},
	__class__: tweezer_Tweezer
});
var tweezer_tweens_Back = function() {};
$hxClasses["tweezer.tweens.Back"] = tweezer_tweens_Back, tweezer_tweens_Back.__name__ = "tweezer.tweens.Back", tweezer_tweens_Back.easeIn = function(e, t, s, i, r) {
	return s * (e /= i) * e * ((r + 1) * e - r) + t
}, tweezer_tweens_Back.easeOut = function(e, t, s, i, r) {
	return s * ((e = e / i - 1) * e * ((r + 1) * e + r) + 1) + t
}, tweezer_tweens_Back.easeInOut = function(e, t, s, i, r) {
	return (e /= i / 2) < 1 ? s / 2 * (e * e * ((1 + (r *= 1.525)) * e - r)) + t : s / 2 * ((e -= 2) * e * ((1 + (r *= 1.525)) * e + r) + 2) + t
}, tweezer_tweens_Back.easeOutIn = function(e, t, s, i, r) {
	return e < i / 2 ? tweezer_tweens_Back.easeOut(2 * e, t, s / 2, i, r) : tweezer_tweens_Back.easeIn(2 * e - i, t + s / 2, s / 2, i, r)
};
var tweezer_tweens_Bounce = function() {};
$hxClasses["tweezer.tweens.Bounce"] = tweezer_tweens_Bounce, tweezer_tweens_Bounce.__name__ = "tweezer.tweens.Bounce", tweezer_tweens_Bounce.easeIn = function(e, t, s, i) {
	return s - tweezer_tweens_Bounce.easeOut(i - e, 0, s, i) + t
}, tweezer_tweens_Bounce.easeOut = function(e, t, s, i) {
	return (e /= i) < .36363636363636365 ? s * (7.5625 * e * e) + t : e < .7272727272727273 ? s * (7.5625 * (e -= .5454545454545454) * e + .75) + t : e < .9090909090909091 ? s * (7.5625 * (e -= .8181818181818182) * e + .9375) + t : s * (7.5625 * (e -= .9545454545454546) * e + .984375) + t
}, tweezer_tweens_Bounce.easeInOut = function(e, t, s, i) {
	return e < i / 2 ? .5 * tweezer_tweens_Bounce.easeIn(2 * e, 0, s, i) + t : .5 * tweezer_tweens_Bounce.easeOut(2 * e - i, 0, s, i) + .5 * s + t
}, tweezer_tweens_Bounce.easeOutIn = function(e, t, s, i) {
	return e < i / 2 ? tweezer_tweens_Bounce.easeOut(2 * e, t, s / 2, i) : tweezer_tweens_Bounce.easeIn(2 * e - i, t + s / 2, s / 2, i)
};
var tweezer_tweens_Circular = function() {};
$hxClasses["tweezer.tweens.Circular"] = tweezer_tweens_Circular, tweezer_tweens_Circular.__name__ = "tweezer.tweens.Circular", tweezer_tweens_Circular.easeIn = function(e, t, s, i) {
	return -s * (Math.sqrt(1 - (e /= i) * e) - 1) + t
}, tweezer_tweens_Circular.easeOut = function(e, t, s, i) {
	return e = e / i - 1, s * Math.sqrt(1 - e * e) + t
}, tweezer_tweens_Circular.easeInOut = function(e, t, s, i) {
	return (e /= i / 2) < 1 ? -s / 2 * (Math.sqrt(1 - e * e) - 1) + t : s / 2 * (Math.sqrt(1 - (e -= 2) * e) + 1) + t
}, tweezer_tweens_Circular.easeOutIn = function(e, t, s, i) {
	return e < i / 2 ? tweezer_tweens_Circular.easeOut(2 * e, t, s / 2, i) : tweezer_tweens_Circular.easeIn(2 * e - i, t + s / 2, s / 2, i)
};
var tweezer_tweens_Cubic = function() {};
$hxClasses["tweezer.tweens.Cubic"] = tweezer_tweens_Cubic, tweezer_tweens_Cubic.__name__ = "tweezer.tweens.Cubic", tweezer_tweens_Cubic.easeIn = function(e, t, s, i) {
	return s * (e /= i) * e * e + t
}, tweezer_tweens_Cubic.easeOut = function(e, t, s, i) {
	return s * ((e = e / i - 1) * e * e + 1) + t
}, tweezer_tweens_Cubic.easeInOut = function(e, t, s, i) {
	return (e /= i / 2) < 1 ? s / 2 * e * e * e + t : s / 2 * ((e -= 2) * e * e + 2) + t
}, tweezer_tweens_Cubic.easeOutIn = function(e, t, s, i) {
	return e < i / 2 ? tweezer_tweens_Cubic.easeOut(2 * e, t, s / 2, i) : tweezer_tweens_Cubic.easeIn(2 * e - i, t + s / 2, s / 2, i)
};
var tweezer_tweens_Elastic = function() {};
$hxClasses["tweezer.tweens.Elastic"] = tweezer_tweens_Elastic, tweezer_tweens_Elastic.__name__ = "tweezer.tweens.Elastic", tweezer_tweens_Elastic.easeIn = function(e, t, s, i, r, n) {
	if (0 == e) return t;
	if (1 == (e /= i)) return t + s;
	var _ = 0 == n || n < Math.abs(s) ? (n = s, r / 4) : r / (2 * Math.PI) * Math.asin(s / n);
	return -(n * Math.pow(2, 10 * --e) * Math.sin((e * i - _) * (2 * Math.PI) / r)) + t
}, tweezer_tweens_Elastic.easeOut = function(e, t, s, i, r, n) {
	if (0 == e) return t;
	if (1 == (e /= i)) return t + s;
	var _ = 0 == n || n < Math.abs(s) ? (n = s, r / 4) : r / (2 * Math.PI) * Math.asin(s / n);
	return n * Math.pow(2, -10 * e) * Math.sin((e * i - _) * (2 * Math.PI) / r) + s + t
}, tweezer_tweens_Elastic.easeInOut = function(e, t, s, i, r, n) {
	if (0 == e) return t;
	if (2 == (e /= i / 2)) return t + s;
	var _ = 0 == n || n < Math.abs(s) ? (n = s, r / 4) : r / (2 * Math.PI) * Math.asin(s / n);
	return e < 1 ? n * Math.pow(2, 10 * --e) * Math.sin((e * i - _) * (2 * Math.PI) / r) * -.5 + t : n * Math.pow(2, -10 * --e) * Math.sin((e * i - _) * (2 * Math.PI) / r) * .5 + s + t
}, tweezer_tweens_Elastic.easeOutIn = function(e, t, s, i, r, n) {
	return e < i / 2 ? tweezer_tweens_Elastic.easeOut(2 * e, t, s / 2, i, r, n) : tweezer_tweens_Elastic.easeIn(2 * e - i, t + s / 2, s / 2, i, r, n)
};
var tweezer_tweens_Exponential = function() {};
$hxClasses["tweezer.tweens.Exponential"] = tweezer_tweens_Exponential, tweezer_tweens_Exponential.__name__ = "tweezer.tweens.Exponential", tweezer_tweens_Exponential.easeIn = function(e, t, s, i) {
	return 0 == e ? t : s * Math.pow(2, 10 * (e / i - 1)) + t - .001 * s
}, tweezer_tweens_Exponential.easeOut = function(e, t, s, i) {
	return e == i ? t + s : 1.001 * s * (1 - Math.pow(2, -10 * e / i)) + t
}, tweezer_tweens_Exponential.easeInOut = function(e, t, s, i) {
	return 0 == e ? t : e == i ? t + s : (e /= i / 2) < 1 ? s / 2 * Math.pow(2, 10 * (e - 1)) + t - 5e-4 * s : s / 2 * 1.0005 * (2 - Math.pow(2, -10 * --e)) + t
}, tweezer_tweens_Exponential.easeOutIn = function(e, t, s, i) {
	return e < i / 2 ? tweezer_tweens_Exponential.easeOut(2 * e, t, s / 2, i) : tweezer_tweens_Exponential.easeIn(2 * e - i, t + s / 2, s / 2, i)
};
var tweezer_tweens_Linear = function() {};
$hxClasses["tweezer.tweens.Linear"] = tweezer_tweens_Linear, tweezer_tweens_Linear.__name__ = "tweezer.tweens.Linear", tweezer_tweens_Linear.ease = function(e, t, s, i) {
	return s * e / i + t
};
var tweezer_tweens_Quadratic = function() {};
$hxClasses["tweezer.tweens.Quadratic"] = tweezer_tweens_Quadratic, tweezer_tweens_Quadratic.__name__ = "tweezer.tweens.Quadratic", tweezer_tweens_Quadratic.easeIn = function(e, t, s, i) {
	return s * (e /= i) * e + t
}, tweezer_tweens_Quadratic.easeOut = function(e, t, s, i) {
	return -s * (e /= i) * (e - 2) + t
}, tweezer_tweens_Quadratic.easeInOut = function(e, t, s, i) {
	return (e /= i / 2) < 1 ? s / 2 * e * e + t : -s / 2 * (--e * (e - 2) - 1) + t
}, tweezer_tweens_Quadratic.easeOutIn = function(e, t, s, i) {
	return e < i / 2 ? tweezer_tweens_Quadratic.easeOut(2 * e, t, s / 2, i) : tweezer_tweens_Quadratic.easeIn(2 * e - i, t + s / 2, s / 2, i)
};
var tweezer_tweens_Quartic = function() {};
$hxClasses["tweezer.tweens.Quartic"] = tweezer_tweens_Quartic, tweezer_tweens_Quartic.__name__ = "tweezer.tweens.Quartic", tweezer_tweens_Quartic.easeIn = function(e, t, s, i) {
	return s * (e /= i) * e * e * e + t
}, tweezer_tweens_Quartic.easeOut = function(e, t, s, i) {
	return -s * ((e = e / i - 1) * e * e * e - 1) + t
}, tweezer_tweens_Quartic.easeInOut = function(e, t, s, i) {
	return (e /= i / 2) < 1 ? s / 2 * e * e * e * e + t : -s / 2 * ((e -= 2) * e * e * e - 2) + t
}, tweezer_tweens_Quartic.easeOutIn = function(e, t, s, i) {
	return e < i / 2 ? tweezer_tweens_Quartic.easeOut(2 * e, t, s / 2, i) : tweezer_tweens_Quartic.easeIn(2 * e - i, t + s / 2, s / 2, i)
};
var tweezer_tweens_Quintic = function() {};
$hxClasses["tweezer.tweens.Quintic"] = tweezer_tweens_Quintic, tweezer_tweens_Quintic.__name__ = "tweezer.tweens.Quintic", tweezer_tweens_Quintic.easeIn = function(e, t, s, i) {
	return s * (e /= i) * e * e * e * e + t
}, tweezer_tweens_Quintic.easeOut = function(e, t, s, i) {
	return s * ((e = e / i - 1) * e * e * e * e + 1) + t
}, tweezer_tweens_Quintic.easeInOut = function(e, t, s, i) {
	return (e /= i / 2) < 1 ? s / 2 * e * e * e * e * e + t : s / 2 * ((e -= 2) * e * e * e * e + 2) + t
}, tweezer_tweens_Quintic.easeOutIn = function(e, t, s, i) {
	return e < i / 2 ? tweezer_tweens_Quintic.easeOut(2 * e, t, s / 2, i) : tweezer_tweens_Quintic.easeIn(2 * e - i, t + s / 2, s / 2, i)
};
var tweezer_tweens_Sine = function() {};

function $getIterator(e) {
	return e instanceof Array ? new haxe_iterators_ArrayIterator(e) : e.iterator()
}

function $bind(e, t) {
	return null == t ? null : (null == t.__id__ && (t.__id__ = window.$haxeUID++), null == e.hx__closures__ ? e.hx__closures__ = {} : s = e.hx__closures__[t.__id__], null == s && (s = t.bind(e), e.hx__closures__[t.__id__] = s), s);
	var s
}
$hxClasses["tweezer.tweens.Sine"] = tweezer_tweens_Sine, tweezer_tweens_Sine.__name__ = "tweezer.tweens.Sine", tweezer_tweens_Sine.easeIn = function(e, t, s, i) {
	return -s * Math.cos(e / i * (Math.PI / 2)) + s + t
}, tweezer_tweens_Sine.easeOut = function(e, t, s, i) {
	return s * Math.sin(e / i * (Math.PI / 2)) + t
}, tweezer_tweens_Sine.easeInOut = function(e, t, s, i) {
	return -s / 2 * (Math.cos(Math.PI * e / i) - 1) + t
}, tweezer_tweens_Sine.easeOutIn = function(e, t, s, i) {
	return e < i / 2 ? tweezer_tweens_Sine.easeOut(2 * e, t, s / 2, i) : tweezer_tweens_Sine.easeIn(2 * e - i, t + s / 2, s / 2, i)
}, window.$haxeUID |= 0, "undefined" != typeof performance && "function" == typeof performance.now && (HxOverrides.now = performance.now.bind(performance)), $hxClasses.Math = Math, null == String.fromCodePoint && (String.fromCodePoint = function(e) {
	return e < 65536 ? String.fromCharCode(e) : String.fromCharCode(55232 + (e >> 10)) + String.fromCharCode(56320 + (1023 & e))
}), String.prototype.__class__ = $hxClasses.String = String, String.__name__ = "String", $hxClasses.Array = Array, Array.__name__ = "Array", Date.prototype.__class__ = $hxClasses.Date = Date, Date.__name__ = "Date";
var Int = {},
	Dynamic = {},
	Float = Number,
	Bool = Boolean,
	Class = {},
	Enum = {},
	fT;
haxe_Resource.content = [], haxe_ds_ObjectMap.count = 0, js_Boot.__toStr = {}.toString, Xml.Element = 0, Xml.PCData = 1, Xml.CData = 2, Xml.Comment = 3, Xml.DocType = 4, Xml.ProcessingInstruction = 5, Xml.Document = 6, rch_game_Track._TOTAL_AFTERBURNERS = 100, haxe_Serializer.USE_CACHE = !1, haxe_Serializer.USE_ENUM_INDEX = !1, haxe_Serializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:", haxe_Unserializer.DEFAULT_RESOLVER = new haxe__$Unserializer_DefaultResolver, haxe_Unserializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:", haxe_crypto_Base64.CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", haxe_crypto_Base64.BYTES = haxe_io_Bytes.ofString(haxe_crypto_Base64.CHARS), haxe_xml_Parser.escapes = (fT = new haxe_ds_StringMap, fT.h.lt = "<", fT.h.gt = ">", fT.h.amp = "&", fT.h.quot = '"', fT.h.apos = "'", fT), 
rch_Main.main();