import React,{useEffect, useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {Form, Button, Row, Col} from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { createClass, getAllClassOfUser, joinClass } from '../actions/classAction';

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

    }, [history,userInfo,redirect, allClassOfUser])

    return (
        <div >
            <h3 my-2 >My Enrolled Classes</h3>
            <Row className="justify-content-center">
            { allClassOfUser?
                allClassOfUser.enrolledClassArray.map(({_id, className, totalScore}) =>{
                    const url = `/class/${_id}`
                    return(
                        <div key={_id} >
                            <Col>
                                <h6>Class Name </h6> <Link to={url}>{className}</Link>
                            </Col>
                            <Col>
                                <h6>Class Score</h6> {totalScore}
                            </Col>
                        
                        </div>
                    )
                })
                :<h5>Loading!...</h5>
            }
            </Row>
            <h3>My Created Classes</h3>
            <Row className="justify-content-center">
            { allClassOfUser?
                allClassOfUser.createdClassArray.map(({_id, className, numberOfEnrolledStudents}) =>{
                    const url = `/class/${_id}`
                    return(
                        <div key={_id} >
                        
                            <Col>
                                <h6>Class Name</h6> <Link to={url}>{className}</Link>
                            </Col>
                            <Col>
                                <h6>Number of Enrolled Students</h6> {numberOfEnrolledStudents}
                            </Col>
                        
                        </div>
                    )
                })
                :<h5>Loading!...</h5>
            }
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
