import React, { PropTypes } from 'react';
import Pickaday from 'pikaday';

let moment;

try{
  moment = require('moment');
}catch( err )  {
  moment = null;
}

const assertMoment = () => {
  if(!moment) {
     throw new Error('moment must be bundled if used.');
  }
  return true;
};

const isMoment = date => moment && moment.isMoment(date); 

const normalizeValue = (dt) => {
  if(dt === null || dt === undefined) {
    return -1;
  }
	if (dt.getTime) {
		return dt.getTime();
	} else if (isMoment(dt)) {
		return dt.unix();
	} else if (typeof dt === 'string') {
		return new Date(dt).getTime();
	}
  
  console.log('date value ',dt,' not supported');
  throw new Error('date value not supported. moment must be bundled if used.');
};

const isDateEq = (a, b) => normalizeValue(a) === normalizeValue(b);

class DatePicker extends React.Component {

	constructor(props) {
		super(props);
		//this.setDate = this.setDate.bind(this);
    this.datePickerListener =this.datePickerListener.bind(this);
    this.fireDateChange  = this.fireDateChange.bind(this);
    this.setDate = this.setDate.bind(this);
	}

  fireDateChange(date) {
    if(this.props.onDateChange) {
      const defaultType = moment ? 'moment': 'date';
      const { dataType = defaultType } = this.props;
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


  datePickerListener(date) {
    if(this.props.onDateChange){
        const propDate = this.props.date;
        if (!isDateEq(date, propDate)) {
          this.fireDateChange(date);

          //revert back to the old date if props did not update
          if(isDateEq(propDate,this.props.date)){
            this.setDate(propDate);
          }
        }
    }
  }

  toDefaultDate(inputDate) {
		let defaultDate;
		let setDefaultDate=false;
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
    return { defaultDate , setDefaultDate };
  }

  


	componentDidMount() {
		const { onDateChange, date: inputDate } = this.props;
    const { defaultDate, setDefaultDate } = this.toDefaultDate(inputDate);
		const config = {
      ...this.props.config,
      field: this.dateInput, 
      onSelect: this.datePickerListener,
      defaultDate,
      setDefaultDate 
    };
		this._picker = new Pickaday(config);
	}


	shouldComponentUpdate({ date: newDate }) {
		const { date } = this.props;
		return !isDateEq(newDate, date);
	}

	componentDidUpdate() {
		this.setDate(this.props.date);
	}

	componentWillUnmount() {
		if (this._picker) {
			this._picker.destroy();
			this._picker = null;
		}
	}

	setDate(date) {
    if (Object.prototype.toString.call(date) === '[object Date]') {
      this._picker.setDate(date,true);
    }
    if (isMoment(date)) {
      this._picker.setMoment(date,true);
    }
    if (typeof date === 'string') {
      this._picker.setDate(date,true);
    }
	}

	render() {
		const {
      className,
      placeholder,
      disabled,
      style,
      hidden,
      onKeyDown,
      onBlur
    } = this.props;

		return (
			<input
				ref={n => this.dateInput = n}
				type="text"
				className = {className}
				placeholder = {placeholder}
				disabled = {disabled}
				hidden = {hidden}
				style = {style}
				onKeyDown = {onKeyDown}
				onBlur = {onBlur}
      />);
	}
}



//object is to describe moment.js objects
const dateType = PropTypes.oneOfType([
	PropTypes.instanceOf(Date),
	React.PropTypes.object,
	React.PropTypes.string
]);

DatePicker.propTypes = {
	className: PropTypes.string,
	placeholder: PropTypes.string,
	disabled: PropTypes.bool,
	style: PropTypes.object,
	date: dateType,
  hidden: PropTypes.bool,
  onKeyDown: PropTypes.func,
  onBlur: PropTypes.func,
	dataType: PropTypes.oneOf(['date', 'moment']),
	onDateChange: PropTypes.func.isRequired,
	config: PropTypes.shape({
		bound: PropTypes.bool,
		position: PropTypes.string,
		reposition: PropTypes.string,
		format: PropTypes.string,
		formatStrict: PropTypes.string,
		defaultDate: dateType,
		setDefaultDate: PropTypes.bool,
		firstDay: PropTypes.number,
		minDate: dateType,
		maxDate: dateType,
		disableWeekends: PropTypes.bool,
		disableDayFn: PropTypes.func,
		yearRange: PropTypes.oneOfType([
			PropTypes.array,
			PropTypes.number
		]),
		showWeekNumber: PropTypes.bool,
		isRTL: PropTypes.bool,
		i18n: PropTypes.shape({
			previousMonth: PropTypes.string,
			nextMonth: PropTypes.string,
			months: PropTypes.array,
			weekdays: PropTypes.array,
			weekdaysShort: PropTypes.array
		}),
		yearSuffix: PropTypes.string,
		showMonthAfterYear: PropTypes.bool,
		showDaysInNextAndPreviousMonths: PropTypes.bool,
		numberOfMonths: PropTypes.number,
		mainCalendar: PropTypes.string,
		theme: PropTypes.string
	})
};
export default DatePicker;
