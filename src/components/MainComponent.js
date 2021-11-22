import React, {Component} from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import {DISHES} from './shared/dishes';
import { COMMENTS } from './shared/comments';
import { PROMOTIONS } from './shared/promotions';
import { LEADERS } from './shared/leaders';
import { Routes, Route, Navigate} from 'react-router-dom';

class Main extends Component {
  constructor(props){
    super(props);

    this.state={
      dishes: DISHES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS
    };
  }


  render() {

    const Homepage = () => {
      return(
        <Home 
        dish={this.state.dishes.filter((dish) => dish.featured)[0]}
        promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
        leader={this.state.leaders.filter((leader) => leader.featured)[0]}
        />
      );
    }

    const AboutUsPage = () => {
      return(
          <About 
              leaders={this.state.leaders}
          />
      );
  };

    const DishWithId = ({match}) => {
      return(
          <DishDetail dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
            comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} />
      );
    };

    return(
    <div>
      <Header/>
      <Routes>
        <Route path='/home' element={<Homepage/>} />
        <Route exact path='/menu' element={<Menu dishes={this.state.dishes}/>} />  
        <Route path='/menu/:dishId' element={<DishWithId/>} />
        <Route exact path='/contactus' element={<Contact/>} />
        <Route exact path='/aboutus' element={<About leaders={this.state.leaders} />} />         
        <Route path="*" element={<Navigate to="/home" />}/>
      </Routes>   
      <Footer/>
    </div>
  );  
}
}

export default Main;
