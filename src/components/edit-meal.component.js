import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';


export default class EditMeal extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeMealDescription = this.onChangeMealDescription.bind(this);
        this.onChangeCalories = this.onChangeCalories.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            mealDescription: '',
            calories: 0,
            date: new Date(),
            users: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/meals/'+this.props.match.params.id).then(
            response => {
                this.setState({
                    username: response.data.username,
                    mealDescription: response.data.mealDescription,
                    calories: response.data.calories,
                    date: new Date(response.data.date)
                })
            }
        ).catch(function (error) {
            console.log(error);
        })
 

        axios.get('http://localhost:5000/users').then(
            response => {
                if (response.data.length > 0) {
                    this.setState({
                        users: response.data.map(user => user.username)
                    })
                }
            }
        )

    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }

    onChangeMealDescription(e) {
        this.setState({
            mealDescription: e.target.value
        })
    }

    onChangeCalories(e) {
        this.setState({
            calories: e.target.value
        })
    }

    onChangeDate(date) {
        this.setState({
            date: date
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const meal = {
            username: this.state.username,
            mealDescription: this.state.mealDescription,
            calories: this.state.calories,
            date: this.state.date
        }

        console.log(meal);

        axios.post('http://localhost:5000/meals/update/'+this.props.match.params.id, meal)
        .then(res => console.log(res.data));

        window.location = '/';
    }


    render() {
        return (
        <div>
          <h3>Edit Meal Log</h3>
          <form onSubmit={this.onSubmit}>
            <div className="form-group"> 
              <label>Username: </label>
              <select ref="userInput"
                  required
                  className="form-control"
                  value={this.state.username}
                  onChange={this.onChangeUsername}>
                  {
                    this.state.users.map(function(user) {
                      return <option 
                        key={user}
                        value={user}>{user}
                        </option>;
                    })
                  }
              </select>
            </div>
            <div className="form-group"> 
              <label>Meal Description: </label>
              <input  type="text"
                  required
                  className="form-control"
                  value={this.state.mealDescription}
                  onChange={this.onChangeMealDescription}
                  />
            </div>
            <div className="form-group">
              <label>Calories (Numberical Value): </label>
              <input 
                  type="text" 
                  className="form-control"
                  value={this.state.calories}
                  onChange={this.onChangeCalories}
                  />
            </div>
            <div className="form-group">
              <label>Date: </label>
              <div>
                <DatePicker
                  selected={this.state.date}
                  onChange={this.onChangeDate}
                />
              </div>
            </div>
    
            <div className="form-group">
              <input type="submit" value="Edit Meal Log" className="btn btn-primary" />
            </div>
          </form>
        </div>
        )
      }
}