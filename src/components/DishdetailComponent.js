import React,{Component} from 'react' 
import { Card, CardBody , CardText , CardImg ,CardTitle,Breadcrumb,BreadcrumbItem,Button,Modal,ModalHeader,ModalBody,Row,Label,Col } from 'reactstrap'
import {Link} from 'react-router-dom';
import {Control,LocalForm,Errors} from 'react-redux-form'
import {Loading} from './LoadingComponent'
import {baseUrl} from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger} from 'react-animation-components'


const required=(val)=>val&&val.length;
const minLength=(len)=>(val)=>val&&(val.length>=len);
const maxLength=(len)=>(val)=>(!val)||(val.length<=len);

class CommentForm extends Component{
  constructor(props){
    super(props);

    this.state={
      isModalOpen:false
    }
    this.toggleModal=this.toggleModal.bind(this);
  }

  toggleModal(){
    this.setState({
      isModalOpen:!this.state.isModalOpen
    });
  }

  handleSubmit(values){
    this.toggleModal();
    this.props.postComment(this.props.dishId,values.rating,values.author,values.comment);
  }

  render(){
    return(
      <React.Fragment>
        <Button outline onClick={this.toggleModal}>Submit Comments</Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values)=>this.handleSubmit(values)}>
              
              <Row className="form-group">
                <Label htmlFor="rating" md={2}>Rating</Label>
                <Col md={{size:12,offset:0}}>
                  <Control.select model=".rating" name="rating" className="form-control">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </Col>
              </Row>
              <Row className="form-group">
                  <Label htmlFor="author" md={4}>Your Name</Label>
                <Col md={12}>
                  <Control.text model=".author" id="author" name="author" placeholder="Your Name"
                  className="form-control"
                  validators={{
                    required,minLength:minLength(3),maxLength:maxLength(15)
                  }}/>

                  <Errors
                    className="text-danger"
                    model=".author"
                    show="touched"
                    messages={{
                      required: 'Required',
                      minLength: 'Must be greater than 2 characters',
                      maxLength: 'Must be 15 characters or less'
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                  <Label htmlFor="comment" md={4}>Comment</Label>
                <Col md={12}>
                  <Control.textarea model=".comment" id="comment" name="comment" 
                  className="form-control" rows="6"/>
                </Col>
              </Row>
              <Row className="form-group">
                <Col md={{size:4,offset:0}}>
                  <Button type="submit" color="primary">
                    Submit
                  </Button>
                </Col>
              </Row>

            </LocalForm>
          </ModalBody>
        </Modal>
      </React.Fragment>
    )
  }
}
    
function RenderDishItem({dish}){

  if(dish!=null)
  {
    return(
      <div>
      <FadeTransform in 
        transformProps={{
          exitTransform:'scale(0.5) translateY(-50%)'
        }}>
        <Card>
          <CardImg src={baseUrl+dish.image} alt={dish.name}/>
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      </FadeTransform>
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


function RenderDishComments({comments,postComment,dishId}){
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
          <Fade in>
          <div key={cmt.id}>
            <ul className="list-unstyled">
              <p>{cmt.comment}</p>
              <p>-- {cmt.author},{new Intl.DateTimeFormat('en-US',{year:'numeric',month:'short',   day:'2-digit' }).format(new Date(Date.parse(cmt.date)))}</p>
            </ul>
          </div>  
        </Fade>
        )
      })

      return(
        <div>
          <h4>Comments</h4>
          <div>
          <Stagger in>
            {commt}
          </Stagger>
            <CommentForm dishId={dishId} postComment={postComment}/>
          </div>
        </div>
      )

  
  }
  else
  {
    return(
      <div>
        <CommentForm/>
      </div>   
    )
  }

}   

  function Dishdetail(props){

  console.log('DishDetail component render is invoked');
  //const comments=dish.comments;
  //const dish=props.dish;
  if(props.isLoading){
    return(
    <div className="container">
      <div clasName="row">
        <Loading/>
      </div>
    </div>
    )
  }
  else if(props.errMess){
    return(
    <div className="container">
      <div clasName="row">
        <h4>{props.errMess}</h4>
      </div>
    </div>
    )
  }
  else{
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
          <RenderDishComments comments={props.comments}
          postComment={props.postComment} dishId={props.dish.id}/><br/>
        </div>
      </div>
    </div>
  );
  }
}
  


export default Dishdetail;