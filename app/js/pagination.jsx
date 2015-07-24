import React from 'react/addons';

let CX = React.addons.classSet;

let Squire = React.createClass({

	render () {
		let {content, type} = this.props,
			className = CX({
				'pagination-squire': true,
				'normal': true
			}),
			classNameActive = CX({
				'pagination-squire': true,
				'active': true
			}),
			classNameLonger = CX({
				'pagination-squire': true,
				'normal': true,
				'longer': true,
			});;
		switch (type) {
			case 0: 
				return <div className={className}>{this.props.content} </div>;
				break;
			case 1:
				return <div className={className}>{this.props.content}</div>;
				break;
			case 2:
				return <div className={className}>{this.props.content}</div>;
				break;
			case 3:
				return <div className={classNameActive}>{this.props.content}</div>;
				break;
			case 4:
				return <div className={classNameLonger}>{this.props.content}</div>;
				break;
			default:
				return <div></div>;
				break;
		}
	}
});

let Pagination = React.createClass({
	PropTypes: {
		total: React.PropTypes.number,
		curIdx: React.PropTypes.number
	},
	getInitialState () {
		return {
			total: this.props.total,
			curIdx: this.props.curIdx
		}
	},
	getSquires () {
		let {total, curIdx} = this.state,
			squires = [], i;
		if (total < 1 || curIdx > total)	{
			return squires;
		}
		squires.push({content: '<', type: 0});

		if (curIdx >= 5) {
			squires.push({content: '1', type: 1});
			squires.push({content: '...', type: 2});
			squires.push({content: '' + (curIdx-2), type: 1});
			squires.push({content: '' + (curIdx-1), type: 1});
		} else {
			for (i = 1; i < curIdx; i++) {
				squires.push({content: '' + i, type: 1});
			}
		}

		squires.push({content: '' + curIdx, type: 3});

		if (curIdx <= total - 3) {
			squires.push({content: '' + (curIdx+1), type: 1});
			squires.push({content: '...', type : 2});
			squires.push({content: '' + total, type: 1});
		} else {
			for (i = curIdx + 1; i <= total; i++) {
				squires.push({content: '' + i, type: 1});
			}
		}

		squires.push({content: '下一页', type: 4});

		return squires;
	},

	handleClick (event) {
		let textContent = event.target.textContent,
			value = parseInt(textContent),
			{total, curIdx} = this.state;

		if (value !== NaN && value >= 1 && value <= total) {
			this.setState({curIdx: value});
		} else if (textContent === '<' && curIdx > 1) {
			this.setState({curIdx: this.state.curIdx - 1});
		} else if (textContent === '下一页' && curIdx < total) {
			this.setState({curIdx: this.state.curIdx + 1});
		}
	},

	render () {
		let squires = this.getSquires(),
			result,
			self = this;

		result = squires.map((sq) => {
				let {type, content} = sq;
			return <Squire content={content} type={type}/>;
		});

		return (
			<div onClick={this.handleClick}>
				{result}
			</div>
		)
	}
});

React.render(<Pagination total={10} curIdx={10}/>, document.querySelector('#keke'));

export default Pagination;