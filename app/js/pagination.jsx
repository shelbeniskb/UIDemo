import React from 'react/addons';

let CX = React.addons.classSet;

let Squire = React.createClass({
	render () {
		let className = CX({
			'pagination-squire': true
		});
		return (
			<div className={className}>{this.props.index}</div>
		)
	}
});

let Pagination = React.createClass({
	render () {
		return (
			<div>
				<Squire index={1}/>
			</div>
		)
	}
});

React.render(<Pagination/>, document.querySelector('#keke'));

export default Pagination;