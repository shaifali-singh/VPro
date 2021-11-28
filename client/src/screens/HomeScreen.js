import React,{useEffect, useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {Form, Button, Row, Col, Card} from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { createClass, getAllClassOfUser, joinClass } from '../actions/classAction';
import './HomeScreen.css';

const heading = {
    marginTop :"40px",
    textAlign:"center",
    color : "#8a165f",
    marginBottom : "40px"
}

const HomeScreen = ({location, history}) => { 
   
    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin

    const allClass = useSelector(state=>state.allClass)
    const {loading, error, allClassOfUser} = allClass

    const dispatch = useDispatch();

    const redirect = location.search? location.search.split('=')[1]:'/login';

    useEffect(() => {
        if(!userInfo){
            history.push(redirect)
        }else if(!allClassOfUser){
            dispatch(getAllClassOfUser(userInfo._id))
        }
        console.log(allClassOfUser);
    }, [history,userInfo,redirect, allClassOfUser])

    return (
        // <div >
        //     <h3 my-2 >My Enrolled Classes</h3>
        //     <Row className="justify-content-center">
        //     { allClassOfUser?
        //         allClassOfUser.enrolledClassArray.map(({_id, className, totalScore}) =>{
        //             const url = `/class/${_id}`
        //             return(
        //                 <div key={_id} >
        //                     <Col>
        //                         <h6>Class Name </h6> <Link to={url}>{className}</Link>
        //                     </Col>
        //                     <Col>
        //                         <h6>Class Score</h6> {totalScore}
        //                     </Col>
                        
        //                 </div>
        //             )
        //         })
        //         :<h5>Loading!...</h5>
        //     }
        //     </Row>
        //     <h3>My Created Classes</h3>
        //     <Row className="justify-content-center">
        //     { allClassOfUser?
        //         allClassOfUser.createdClassArray.map(({_id, className, numberOfEnrolledStudents}) =>{
        //             const url = `/class/${_id}`
        //             return(
        //                 <div key={_id} >
                        
        //                     <Col>
        //                         <h6>Class Name</h6> <Link to={url}>{className}</Link>
        //                     </Col>
        //                     <Col>
        //                         <h6>Number of Enrolled Students</h6> {numberOfEnrolledStudents}
        //                     </Col>
                        
        //                 </div>
        //             )
        //         })
        //         :<h5>Loading!...</h5>
        //     }
        //     </Row>
        // </div>

        <div >
        <h1 my-2 style= {heading}>MY Enrolled Classes</h1>
        <Row className="justify-content-center">
        { allClassOfUser ?
            allClassOfUser.enrolledClassArray.map(({_id, className, totalScore,classDescription}) =>{
                const url = `/class/${_id}`
                return(
         
                    <div key={_id} >
                    {/* <Row className="justify-content-center"> */}
                <Col className="order-lg-2" lg="3">
                    
                        {/* <Card className="text-center" style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={club.logo} alt={club.name} />
                            <Card.Body>
                                <Card.Title>{club.name}</Card.Title>
                                <Card.Text>
                                           {club.description.substring(0,20)}....
                                </Card.Text>
                                <Link to={'/clubInfo/'+ club._id}><button>More info</button></Link>
                            </Card.Body>
                            </Card> */}

<Card className="_card">
  {/* <Card.Img className="_card-img" variant="top" src={className}  alt={className} /> */}
  <Card.Body className="_card-body">
    <Card.Title className="_card-title" style={{
        color: '#3C4858',
        margin: '1.75rem 0 0.875rem',
        marginTop: '.625rem',
        fontFamily: '"Roboto Slab", "Times New Roman", serif',
        fontWeight: '900',
        textDecoration: 'none',
        fontSize: '1.5rem',
        lineHeight: '1.5em'
    }}>{className}</Card.Title>
    {classDescription ?
       <Card.Text className="_card-text">
       {classDescription.substring(0,20)}....
       </Card.Text>
       : 
       <Card.Text className="_card-text">
       {className.substring(0,20)}....
       </Card.Text>
}
 

    <Card.Text className="_card-text">
        Total Score: {totalScore}
    </Card.Text>
    <a href={_id} ><Button className="_primary">Visit Profile</Button></a>
  </Card.Body>
</Card>
               
                </Col>
                {/* </Row> */}
                </div>
                )
            })
            :<h2>Loading!...</h2>
        }
        {/* hii */}
        </Row>
        <h1 my-2 style= {heading}>MY Created Classes</h1>
        <Row className="justify-content-center">
        { allClassOfUser ?
            allClassOfUser.createdClassArray.map(({_id, className, numberOfEnrolledStudents,classDescription}) =>{
                const url = `/class/${_id}`
                return(
         
                    <div key={_id} >
                    {/* <Row className="justify-content-center"> */}
                <Col className="order-lg-2" lg="3">
                    
                        {/* <Card className="text-center" style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={club.logo} alt={club.name} />
                            <Card.Body>
                                <Card.Title>{club.name}</Card.Title>
                                <Card.Text>
                                           {club.description.substring(0,20)}....
                                </Card.Text>
                                <Link to={'/clubInfo/'+ club._id}><button>More info</button></Link>
                            </Card.Body>
                            </Card> */}

<Card className="_card">
  {/* <Card.Img className="_card-img" variant="top" src={className}  alt={className} /> */}
  <Card.Body className="_card-body">
    <Card.Title className="_card-title" style={{
        color: '#3C4858',
        margin: '1.75rem 0 0.875rem',
        marginTop: '.625rem',
        fontFamily: '"Roboto Slab", "Times New Roman", serif',
        fontWeight: '900',
        textDecoration: 'none',
        fontSize: '1.5rem',
        lineHeight: '1.5em'
    }}>{className}</Card.Title>
        {classDescription ?
       <Card.Text className="_card-text">
       {classDescription.substring(0,20)}....
       </Card.Text>
       : 
       <Card.Text className="_card-text">
       {className.substring(0,20)}....
       </Card.Text>
}
    <Card.Text className="_card-text">
         Number of Enrolled Students: {numberOfEnrolledStudents}
    </Card.Text>
    <a href={_id} ><Button className="_primary">Visit Profile</Button></a>
  </Card.Body>
</Card>
               
                </Col>
                {/* </Row> */}
                </div>
                )
            })
            :<h2>Loading!...</h2>
        }
        {/* hii */}
        </Row> 
    </div>
    
    )



    // const [className,setClassName] = useState('');
    // const [classCode, setClassCode] = useState('');

    // const userLogin = useSelector(state=>state.userLogin);
    // const {loading,error,userInfo} = userLogin;

    // const dispatch = useDispatch ();
    // const newClass = useSelector(state=>state.newClass);
    // const {error:classError,newClassInfo} = newClass;

    // const joinNewClass = useSelector(state=>state.joinNewClass);
    // const {error:joinClassError, joinClassInfo} = joinNewClass;

    // useEffect(() => {
    //     if(!userInfo){
    //         history.push(redirect)
    //     }
    // }, [history,userInfo,redirect])

    // const submitHandler =(e)=>{
    //         e.preventDefault();
    //         dispatch(createClass(className))
    // }

    // const joinClasssubmitHandler = (e)=>{
    //     e.preventDefault();
    //     dispatch(joinClass(classCode));
    // }


    // return (
    //     <>
    //     {userInfo ?  
    //         <div>
            
    //                 <h1>Home Page</h1>
    //                 {error && <Message variant='danger'>{error}</Message>}
    //                 {classError && <Message variant='danger'>{classError}</Message>}
    //                 {loading && <Loader/>}
    //                 <FormContainer>
    //                     <h4>Create a new Class</h4>
    //                     {error && <Message variant='danger'>{error}</Message>}
    //                     {loading && <Loader/>}
    //                     <Form onSubmit={submitHandler}>
    //                         <Form.Group controlId='className'>
    //                             <Form.Label>
    //                                 Class Name 
    //                             </Form.Label>
    //                             <Form.Control
    //                                 type="className"
    //                                 placeholder="Enter your Class Name"
    //                                 value={className}
    //                                 onChange={e=>setClassName(e.target.value)}
    //                             ></Form.Control>
    //                         </Form.Group>
                            
    //                         <Button type="submit" variant="primary">Create Class</Button>
    //                     </Form>
    //                 </FormContainer>

    //                 {newClassInfo ? 
    //                    <h5>Share this code to your students  <i>{newClassInfo.classCode}</i></h5> 
    //                                               : <p></p>
    //                 }

    //                 <FormContainer>
    //                     <h4>Join a Class</h4>
    //                     {joinClassError && <Message variant='danger'>{joinClassError}</Message>}
    //                     <Form onSubmit={joinClasssubmitHandler}>
    //                         <Form.Group controlId='className'>
    //                             <Form.Label>
    //                                 Class Code
    //                             </Form.Label>
    //                             <Form.Control
    //                                 type="classCode"
    //                                 placeholder="Enter the Class Code"
    //                                 value={classCode}
    //                                 onChange={e=>setClassCode(e.target.value)}
    //                             ></Form.Control>
    //                         </Form.Group>
                            
    //                         <Button type="submit" variant="primary">Join Class</Button>
    //                     </Form>
    //                 </FormContainer>
            
    //         </div> 
        
    //     : <h1>Please log in</h1> }

       
        // </>
    // )
}

export default HomeScreen
