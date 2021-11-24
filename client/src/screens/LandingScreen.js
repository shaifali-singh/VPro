import React,{useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {Row,Col} from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {Link} from 'react-router-dom';
import './LandingScreen.css';

const LandingScreen = () => { 
    const dispatch = useDispatch ();
    const userLogin = useSelector(state=>state.userLogin);
    const {loading,error,userInfo} = userLogin;

    return (
        <>
        <div className="landing">
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader/>}
         {/* { <div className="container">
         <% if(error && error.length >0){%>
        <div class="alert alert-warning alert-dismissible" role="alert">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span
                    aria-hidden="true">&times;</span></button>
            <%= error %>
        </div>
        <% }%>
        <% if(success && success.length >0){%>
        <div class="alert alert-success alert-dismissible " role="alert">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            <%= success %>
        </div>
        <%}%>  */}
    {/* </div> */}
    <div id="landing-header">
         <h1 style={{ fontSize: "50px" }}> <Link style={{color: "white"}} to={`/aboutus`}><b>EducationOP</b></Link></h1>
         <h4 style={{ color: "white" }}>FALL IN LOVE WITH LEARNING</h4>
         {userInfo?
             <Link to={`/home`} style={{ margin:"20px 7px"}} className="btn btn-lg btn-success active">Go to Dashboard
             &#8594;</Link>
             :
          <>   
          <Link to={`/login`} style={{ margin:"20px 7px"}} className="btn btn-lg btn-success active">Login</Link>
          <Link href={`/register`} style={{ margin: "20px 7px"}} className="btn btn-lg btn-success active">Register</Link> 
          </>
        }

        {/* <% if(currentUser && currentUser.isCompany==true){ %>
        <a href="/company/show" style="margin: 20px 5px;" class="btn btn-lg btn-success active">Go to Dashboard
            &#8594;</a>
        <% } else if(currentUser && currentUser.isAdmin){ %>
        <a href="/admin/index" style="margin:20px 5px;" class="btn btn-lg btn-success active">Go to Dashboard
            &#8594;</a>
        <%}else if(currentUser) {%>
        <a href="/seeker/index" style="margin: 20px 5px;" class="btn btn-lg btn-success active">Go to Dashboard
            &#8594;</a>
        <% } else { %> */}
        {/* <a href="/login" style="margin: 20px 5px;" class="btn btn-lg btn-success active">Login</a>
        <a href="/register" style="margin: 20px 5px ;" class="btn btn-lg btn-success active">Register</a>
        <% } %> */}
        <br/>
        <br/>
        <Link  className="btn btn-sm btn-primary" style={{marginRight: "1%" }} to={`/contactus`}><span className="glyphicon glyphicon-earphone"></span></Link>
        <Link  className="btn btn-sm btn-info active" style={{marginRight: "1%"}} to={`#`}><i className="fab fa-facebook"></i></Link>
        <Link className="btn btn-sm btn-warning"  to={`#`}><span className="glyphicon glyphicon-inbox"></span></Link>
    </div>
    <div className="container text-center">
        
    </div>
    
    <ul className="slideshow">
        <li><div className="blur"></div></li>
        <li><div className="blur"></div></li>
        <li><div className="blur"></div></li>
        <li><div className="blur"></div></li>
        <li><div className="blur"></div></li>
    </ul>
    </div>
        </>
    )
}

export default LandingScreen
