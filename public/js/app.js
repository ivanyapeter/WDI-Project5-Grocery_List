// var ShoppingList = React.createClass({
// 	editItem: function(event) {
// 		return console.log(this.props.text);
// 	},
// 	render: function() {
// 		var createItem = function(item) {
// 			return (
// 				<li className="item" key={item.id}>{item.text} 
// 					<button onClick={this.editItem}>Edit</button>
// 				</li>
// 			);
// 		};
// 		return (
// 			<div className="item-list">
// 				<ul>{this.props.filteredItems.map(createItem, this)}</ul>
// 			</div>
// 		);
// 	}
// });
var ShoppingList = React.createClass({
	render: function() {
		var createItem = function(item) {
			return (
				<li className="item" key={item.id}>
					{item.text} 
				</li>
			);
		};
		return (
			<div className="item-list">
				<ul>{this.props.filteredItems.map(createItem, this)}</ul>
			</div>
		);
	}
});

var MainApp = React.createClass({
	filterList: function(event) {
		var updatedList = this.state.initialItems;
		var searchedWord = function(searchLetter) {
			return searchLetter.text.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
		};
		updatedList = updatedList.filter(searchedWord);
		this.setState({filteredItems: updatedList});
	},
	getInitialState: function() {
    return {
    	initialItems: [
    		{
    			id: 1,
    			category: "Fruit & Vegetable",
    			text: "Apples",
    			completed: true
    		},{
    			id: 2,
    			category: "Fruit & Vegetable",
    			text: "Banana",
    			completed: true
    		},{
    			id: 3,
    			category: "Meat",
    			text: "Chicken",
    			completed: true
    		},{
					id: 4,
    			category: "Meat",
    			text: "Beef",
    			completed: false
    		},{
    			id: 5,
    			category: "Deli",
    			text: "Fish",
    			completed: true
    		},
    	],
      filteredItems: [],
      text: ''
    }
	},
	componentWillMount: function() {
		this.setState({filteredItems: this.state.initialItems})
	},
	onChange: function(event) {
		this.setState({text: event.target.value});
	},
	handleSubmit: function(event) {
		event.preventDefault();
		var nextItems = this.state.filteredItems.concat([{text: this.state.text, id: Date.now()}]);
		// console.log(typeof(this.state.items));
		// console.log(nextItems);
		var nextText = '';
		this.setState({initialItems: nextItems, text: nextText, filteredItems: nextItems});
	},
	render: function() {
		return (
			<div className="shopping-list">
				<header className="top-bar">
					<div className="container">
						<p className="title">Shopping List</p>
						<input type="text" placeholder="Search" onChange={this.filterList} />
					</div>
				</header>
				<section className="main">
					<div className="container">
						<form className="form" onSubmit={this.handleSubmit}>
							<input onChange={this.onChange} value={this.state.text} type="text" placeholder="Add new item"/>
							<button>Add</button>
						</form>
						<ShoppingList filteredItems={this.state.filteredItems} />
					</div>
				</section>
			</div>
		);
	}
});

ReactDOM.render(
	<MainApp />,
	document.getElementById('grocery')
);