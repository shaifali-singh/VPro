import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getClassProfile } from '../actions/classAction'

const ClassScreen = ({ history }) => {

  const dispatch = useDispatch()

  const {classId} = useParams()

  const classProfile = useSelector((state) => state.classProfile)
  const { loading, error, classInfo } = classProfile

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo) {
        history.push('/login')
    } else if(!classInfo) {
        dispatch(getClassProfile(classId))
    }
  }, [dispatch, history, userInfo, classInfo])

  return (
    <>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
            { classInfo ? classInfo.topics.map(({topicName, topicTheory}, index)=>{

                let quizUrl = `/quiz/${(classInfo.quizzes)[index]}`
                return (
                    <div className="justify-content-center">
                        {index+1}
                        <h3>Chapter : {topicName}</h3>
                        <p> Chapter Notes : {topicTheory}</p>
                        {userInfo._id != classInfo.classTeacher && <Link to={quizUrl}><h6>Take Quiz</h6></Link>}
                        {userInfo._id==classInfo.classTeacher && <Link><h6>Add a new chapter</h6></Link>}
                    </div>
                )
            }) : <h5>Loading...</h5>

        }
          
        </Table>
      )}
    </>
  )
}

export default ClassScreen