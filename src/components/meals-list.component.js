import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Meals = props => (
    <tr>
      <td>{props.meal.username}</td>
      <td>{props.meal.mealDescription}</td>
      <td>{props.meal.calories}</td>
      <td>{props.meal.date.substring(0,10)}</td>
      <td>
        { /* eslint-disable-next-line */ }
        <Link to={"/edit/"+props.meal._id}>edit</Link> | <a href="#" onClick={() => { props.deleteMeal(props.meal._id) }}>delete</a>
      </td>
    </tr>
  )

export default class MealsList extends Component {
    constructor(props) {
        super(props);

        this.deleteMeal = this.deleteMeal.bind(this);

        this.state = {meals: []};
    }

    componentDidMount() {
        axios.get('http://localhost:5000/meals/').then(
            response => {
                this.setState({meals: response.data})
            }
        ).catch((error) => {
            console.log(error);
        })
    }

    deleteMeal(id) {
        axios.delete('http://localhost:5000/meals/'+id)
          .then(response => { console.log(response.data)});
    
        this.setState({
          meals: this.state.meals.filter(el => el._id !== id)
        })
      }

    mealsList() {
        return this.state.meals.map(currentMeal => {
            return <Meals meal={currentMeal} deleteMeal={this.deleteMeal} key={currentMeal._id}/>;
        })
    }  


    render() {
        return (
            <div>
            <h3>Logged Meals</h3>
            <table className="table">
                <thead className="thead-light">
                <tr>
                    <th>Username</th>
                    <th>Meal Description</th>
                    <th>Calories</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                { this.mealsList() }
                </tbody>
            </table>
            </div>
        )
    }
}
