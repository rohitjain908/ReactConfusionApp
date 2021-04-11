import React, { Component } from 'react';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent'
import About from './AboutComponent.js'
import Contact from './ContactComponent'
import Header from './HeaderComponent'
import Footer from './FooterComponent'
import Home from './HomeComponent'
import {Switch,Route,Redirect,withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import {addComment} from '../redux/ActionCreaters';

const mapStateToProps=(state)=>{
  return{
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchTOProps=(dispatch)=>({
  addComment:(dishId,rating,author,comment)=>dispatch(addComment(dishId,rating,author,comment))
})


class Main extends Component {

  constructor(props){
    super(props);
  }

  render() {

    const HomePage= () =>{
      return(
        <Home dish={this.props.dishes.filter((dish)=> dish.featured===true)[0]}
        promotion={this.props.promotions.filter((promo)=> promo.featured===true)[0]}
        leader={this.props.leaders.filter((leader)=> leader.featured===true)[0]}
        />
      );
    }
    const DishWithId=({match})=>{
      return(
        <Dishdetail dish={this.props.dishes.filter((dish)=>dish.id===parseInt(match.params.dishId,10))[0]} comments={this.props.comments.filter((comment)=>comment.dishId===parseInt(match.params.dishId,10))}
        addComment={this.props.addComment}/>
      )

    }
    const AboutPage=()=>{
      return(
        <About leaders={this.props.leaders}/>
      )
    }
    return (
      <div>
        <Header/>
        <Switch>
          <Route path="/home" component={HomePage}/>
          <Route exact path="/menu" component={()=><Menu dishes={this.props.dishes}/>}/>
          <Route path="/menu/:dishId" component={DishWithId}/>
          <Route exact path="/contactus" component={Contact} />
          <Route path='/aboutus' component={AboutPage}/>
          <Redirect to="/home"/>
        </Switch>
        <Footer/>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchTOProps)(Main));
