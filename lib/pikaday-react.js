'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _pikaday = require('pikaday');

var _pikaday2 = _interopRequireDefault(_pikaday);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var moment = void 0;

try {
	moment = require('moment');
} catch (err) {
	moment = null;
}

var assertMoment = function assertMoment() {
	if (!moment) {
		throw new Error('moment must be bundled if used.');
	}
	return true;
};

var isMoment = function isMoment(date) {
	return moment && moment.isMoment(date);
};

var normalizeValue = function normalizeValue(dt) {
	if (dt === null || dt === undefined) {
		return -1;
	}
	if (dt.getTime) {
		return dt.getTime();
	} else if (isMoment(dt)) {
		return dt.unix();
	} else if (typeof dt === 'string') {
		return new Date(dt).getTime();
	}

	console.log('date value ', dt, ' not supported');
	throw new Error('date value not supported. moment must be bundled if used.');
};

var isDateEq = function isDateEq(a, b) {
	return normalizeValue(a) === normalizeValue(b);
};

var DatePicker = function (_React$Component) {
	_inherits(DatePicker, _React$Component);

	function DatePicker(props) {
		_classCallCheck(this, DatePicker);

		//this.setDate = this.setDate.bind(this);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DatePicker).call(this, props));

		_this.datePickerListener = _this.datePickerListener.bind(_this);
		_this.fireDateChange = _this.fireDateChange.bind(_this);
		_this.setDate = _this.setDate.bind(_this);
		return _this;
	}

	_createClass(DatePicker, [{
		key: 'fireDateChange',
		value: function fireDateChange(date) {
			if (this.props.onDateChange) {
				var defaultType = moment ? 'moment' : 'date';
				var _props$dataType = this.props.dataType;
				var dataType = _props$dataType === undefined ? defaultType : _props$dataType;

				if (dataType === 'moment') {
					assertMoment();
					if (this._picker) {
						this.props.onDateChange(this._picker.getMoment());
					}
				} else {
					if (this._picker) {
						this.props.onDateChange(this._picker.getDate());
					}
				}
			}
		}
	}, {
		key: 'datePickerListener',
		value: function datePickerListener(date) {
			if (this.props.onDateChange) {
				var propDate = this.props.date;
				if (!isDateEq(date, propDate)) {
					this.fireDateChange(date);

					//revert back to the old date if props did not update
					if (isDateEq(propDate, this.props.date)) {
						this.setDate(propDate);
					}
				}
			}
		}
	}, {
		key: 'toDefaultDate',
		value: function toDefaultDate(inputDate) {
			var defaultDate = void 0;
			var setDefaultDate = false;
			if (inputDate) {
				if (isMoment(inputDate)) {
					defaultDate = inputDate.toDate();
				} else if (typeof inputDate === 'string') {
					defaultDate = new Date(inputDate);
				} else {
					defaultDate = inputDate;
				}
				setDefaultDate = true;
			}
			return { defaultDate: defaultDate, setDefaultDate: setDefaultDate };
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _props = this.props;
			var onDateChange = _props.onDateChange;
			var inputDate = _props.date;

			var _toDefaultDate = this.toDefaultDate(inputDate);

			var defaultDate = _toDefaultDate.defaultDate;
			var setDefaultDate = _toDefaultDate.setDefaultDate;

			var config = _extends({}, this.props.config, {
				field: this.dateInput,
				onSelect: this.datePickerListener,
				defaultDate: defaultDate,
				setDefaultDate: setDefaultDate
			});
			this._picker = new _pikaday2.default(config);
		}
	}, {
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate(_ref) {
			var newDate = _ref.date;
			var date = this.props.date;

			return !isDateEq(newDate, date);
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			this.setDate(this.props.date);
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			if (this._picker) {
				this._picker.destroy();
				this._picker = null;
			}
		}
	}, {
		key: 'setDate',
		value: function setDate(date) {
			if (Object.prototype.toString.call(date) === '[object Date]') {
				this._picker.setDate(date, true);
			}
			if (isMoment(date)) {
				this._picker.setMoment(date, true);
			}
			if (typeof date === 'string') {
				this._picker.setDate(date, true);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props2 = this.props;
			var className = _props2.className;
			var placeholder = _props2.placeholder;
			var disabled = _props2.disabled;
			var style = _props2.style;
			var hidden = _props2.hidden;
			var onKeyDown = _props2.onKeyDown;
			var onBlur = _props2.onBlur;


			return _react2.default.createElement('input', {
				ref: function ref(n) {
					return _this2.dateInput = n;
				},
				type: 'text',
				className: className,
				placeholder: placeholder,
				disabled: disabled,
				hidden: hidden,
				style: style,
				onKeyDown: onKeyDown,
				onBlur: onBlur
			});
		}
	}]);

	return DatePicker;
}(_react2.default.Component);

//object is to describe moment.js objects


var dateType = _react.PropTypes.oneOfType([_react.PropTypes.instanceOf(Date), _react2.default.PropTypes.object, _react2.default.PropTypes.string]);

DatePicker.propTypes = {
	className: _react.PropTypes.string,
	placeholder: _react.PropTypes.string,
	disabled: _react.PropTypes.bool,
	style: _react.PropTypes.object,
	date: dateType,
	hidden: _react.PropTypes.bool,
	onKeyDown: _react.PropTypes.func,
	onBlur: _react.PropTypes.func,
	dataType: _react.PropTypes.oneOf(['date', 'moment']),
	onDateChange: _react.PropTypes.func.isRequired,
	config: _react.PropTypes.shape({
		bound: _react.PropTypes.bool,
		position: _react.PropTypes.string,
		reposition: _react.PropTypes.string,
		format: _react.PropTypes.string,
		formatStrict: _react.PropTypes.string,
		defaultDate: dateType,
		setDefaultDate: _react.PropTypes.bool,
		firstDay: _react.PropTypes.number,
		minDate: dateType,
		maxDate: dateType,
		disableWeekends: _react.PropTypes.bool,
		disableDayFn: _react.PropTypes.func,
		yearRange: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.number]),
		showWeekNumber: _react.PropTypes.bool,
		isRTL: _react.PropTypes.bool,
		i18n: _react.PropTypes.shape({
			previousMonth: _react.PropTypes.string,
			nextMonth: _react.PropTypes.string,
			months: _react.PropTypes.array,
			weekdays: _react.PropTypes.array,
			weekdaysShort: _react.PropTypes.array
		}),
		yearSuffix: _react.PropTypes.string,
		showMonthAfterYear: _react.PropTypes.bool,
		showDaysInNextAndPreviousMonths: _react.PropTypes.bool,
		numberOfMonths: _react.PropTypes.number,
		mainCalendar: _react.PropTypes.string,
		theme: _react.PropTypes.string
	})
};
exports.default = DatePicker;