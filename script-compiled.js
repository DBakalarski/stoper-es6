'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Stopwatch = function (_React$Component) {
	_inherits(Stopwatch, _React$Component);

	function Stopwatch(display) {
		_classCallCheck(this, Stopwatch);

		var _this = _possibleConstructorReturn(this, (Stopwatch.__proto__ || Object.getPrototypeOf(Stopwatch)).call(this, display));

		_this.running = false;
		_this.state = {
			times: {
				minutes: 0,
				seconds: 0,
				miliseconds: 0
			}
		};
		_this.display = display;
		_this.reset();
		_this.print(_this.times);

		return _this;
	}

	_createClass(Stopwatch, [{
		key: 'reset',
		value: function reset() {
			this.setState({
				times: {
					minutes: 0,
					seconds: 0,
					miliseconds: 0
				}
			});
		}
	}, {
		key: 'print',
		value: function print() {
			this.display.innerText = this.format(this.times);
		}
	}, {
		key: 'format',
		value: function format(times) {
			return pad0(times.minutes) + ':' + pad0(times.seconds) + ':' + pad0(Math.floor(times.miliseconds));
		}
	}, {
		key: 'start',
		value: function start() {
			var _this2 = this;

			if (!this.running) {
				this.running = true;
				this.watch = setInterval(function () {
					return _this2.step();
				}, 10);
			}
		}
	}, {
		key: 'step',
		value: function step() {
			if (!this.running) return;
			this.calculate();
			this.print();
		}
	}, {
		key: 'calculate',
		value: function calculate() {
			this.times.miliseconds += 1;
			if (this.times.miliseconds >= 100) {
				this.times.seconds += 1;
				this.times.miliseconds = 0;
			}
			if (this.times.seconds >= 60) {
				this.times.minutes += 1;
				this.times.seconds = 0;
			}
		}
	}, {
		key: 'stop',
		value: function stop() {
			this.running = false;
			clearInterval(this.watch);
		}
	}, {
		key: 'resetDisplay',
		value: function resetDisplay() {
			this.reset();
			this.stop();
			this.print();
			result.innerText = '';
		}
	}, {
		key: 'catchTime',
		value: function catchTime() {
			console.log(this.format(this.times));
			var liElement = document.createElement('li');
			liElement.innerText = this.format(this.times);
			result.appendChild(liElement);
		}
	}, {
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				null,
				React.createElement(
					'nav',
					{ className: 'controls' },
					React.createElement(
						'a',
						{ href: '#', className: 'button', onClick: this.start.bind(this) },
						'Start'
					),
					React.createElement(
						'a',
						{ href: '#', className: 'button', onClick: this.stop.bind(this) },
						'Stop'
					),
					React.createElement(
						'a',
						{ href: '#', className: 'button', onClick: this.reset.bind(this) },
						'Reset'
					),
					React.createElement(
						'a',
						{ href: '#', className: 'button', onClick: this.catch.bind(this) },
						'Catch'
					)
				),
				React.createElement('div', { className: 'stopwatch' }),
				React.createElement('ul', { className: 'result' })
			);
		}
	}]);

	return Stopwatch;
}(React.Component);

/*
const stopwatch = new Stopwatch(document.querySelector('.stopwatch'));
const result = document.querySelector('.results');

let startButton = document.getElementById('start');
startButton.addEventListener('click', () => stopwatch.start());

let stopButton = document.getElementById('stop');
stopButton.addEventListener('click',() => stopwatch.stop());

let resetButton = document.getElementById('reset');
resetButton.addEventListener('click',() => stopwatch.resetDisplay());

let catchButton = document.getElementById('catch-time');
catchButton.addEventListener('click',() => stopwatch.catchTime());
*/

function pad0(value) {
	var result = value.toString();
	if (result.length < 2) {
		result = '0' + result;
	}
	return result;
}

ReactDOM.render(React.createElement(Stopwatch, null), document.getElementById('app'));
