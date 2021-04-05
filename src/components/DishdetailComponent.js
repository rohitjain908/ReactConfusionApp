import React from 'react' 
import { Card, CardBody , CardText , CardImg ,CardTitle,Breadcrumb,BreadcrumbItem } from 'reactstrap'
import {Link} from 'react-router-dom';


    function RenderDishItem({dish}){
     if(dish!=null)
     {
        return(
          <div>
            <Card>
              <CardImg src={dish.image} alt={dish.name}/>
              <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
              </CardBody>
            </Card>
          </div>
       );
     }
     else
     {
        return(
          <div></div>
        );
      }
    }


    function RenderDishComments({comments}){
     if(comments!=null)
     {
       //console.log(dish);
        //const arr=dish.comments;
        //console.log(arr);
         const commt=comments.map((cmt)=>{
        //console.log(cmt);
        //const date=cmt.date;
        //const dt=toLocalDateString(date);
           return(
           <div key={cmt.id}>
             <ul className="list-unstyled">
               <p>{cmt.comment}</p>
               <p>-- {cmt.author},{new Intl.DateTimeFormat('en-US',{year:'numeric',month:'short',   day:'2-digit' }).format(new Date(Date.parse(cmt.date)))}</p>
             </ul>
           </div>  
           )
         })

         return(
           <div>
             <h4>Comments</h4>
             <div>
               {commt}
             </div>
           </div>
         )
    
      
      }
      else
      {
        return(
          <div></div>   
        )
      }

    }   

    function Dishdetail(props){

    console.log('DishDetail component render is invoked');
    //const comments=dish.comments;
    //const dish=props.dish;
    return(
      <div className="container">
          <div className="row">
            <Breadcrumb>
              <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
              <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
              <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
              <h3>{props.dish.name}</h3>
              <hr/>
            </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            <RenderDishItem dish={props.dish}/>
          </div>
          <div className="col-12 col-md-5 m-1">
            <RenderDishComments comments={props.comments}/>
          </div>
        </div>
      </div>
    );
  }
  


export default Dishdetail;