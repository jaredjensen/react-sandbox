"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Card = function Card(props) {
    return React.createElement(
        "div",
        { className: "card" },
        React.createElement("img", { width: "75", src: props.avatar_url }),
        React.createElement(
            "div",
            { className: "card-info" },
            React.createElement(
                "div",
                { className: "card-name" },
                props.name
            ),
            React.createElement(
                "div",
                { className: "card-company" },
                props.company
            )
        )
    );
};

var CardList = function CardList(props) {
    return React.createElement(
        "div",
        null,
        props.cards.map(function (card) {
            return React.createElement(Card, _extends({ key: card.id }, card));
        })
    );
};

var Form = function (_React$Component) {
    _inherits(Form, _React$Component);

    function Form() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Form);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Form.__proto__ || Object.getPrototypeOf(Form)).call.apply(_ref, [this].concat(args))), _this), Object.defineProperty(_this, "state", {
            enumerable: true,
            writable: true,
            value: { userName: "" }
        }), Object.defineProperty(_this, "handleSubmit", {
            enumerable: true,
            writable: true,
            value: function value(event) {
                event.preventDefault();
                axios.get("https://api.github.com/users/" + _this.state.userName).then(function (resp) {
                    _this.props.onSubmit(resp.data);
                });
                _this.setState({ userName: "" });
            }
        }), _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Form, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            return React.createElement(
                "form",
                { onSubmit: this.handleSubmit },
                React.createElement("input", { type: "text", placeholder: "Github username", required: true,
                    value: this.state.userName,
                    onChange: function onChange(event) {
                        return _this2.setState({ userName: event.target.value });
                    } }),
                React.createElement(
                    "button",
                    { type: "submit" },
                    "Add Card"
                )
            );
        }
    }]);

    return Form;
}(React.Component);

var App = function (_React$Component2) {
    _inherits(App, _React$Component2);

    function App() {
        var _ref2;

        var _temp2, _this3, _ret2;

        _classCallCheck(this, App);

        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        return _ret2 = (_temp2 = (_this3 = _possibleConstructorReturn(this, (_ref2 = App.__proto__ || Object.getPrototypeOf(App)).call.apply(_ref2, [this].concat(args))), _this3), Object.defineProperty(_this3, "state", {
            enumerable: true,
            writable: true,
            value: {
                cards: [{
                    id: 2508197,
                    name: "Jared Jensen",
                    company: "Avanade",
                    avatar_url: "https://avatars0.githubusercontent.com/u/2508197?v=3"
                }, {
                    id: 8445,
                    name: "Paul O'Shannessy",
                    company: "Facebook",
                    avatar_url: "https://avatars0.githubusercontent.com/u/8445?v=3"
                }]
            }
        }), Object.defineProperty(_this3, "addNewCard", {
            enumerable: true,
            writable: true,
            value: function value(card) {
                _this3.setState(function (prevState) {
                    return {
                        cards: prevState.cards.concat(card)
                    };
                });
            }
        }), _temp2), _possibleConstructorReturn(_this3, _ret2);
    }

    _createClass(App, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(Form, { onSubmit: this.addNewCard }),
                React.createElement(CardList, { cards: this.state.cards })
            );
        }
    }]);

    return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById("app"));