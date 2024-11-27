import React, { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import { FaPlus } from "react-icons/fa"
import { IoTrashBin } from "react-icons/io5"



const Dashboard = () => {

    const [ users, setUsers ] = useState({})

    useEffect(()=>{
        fetch('http:/localhost:4000/api/users')
        .then(res => res.json())
        .then(data => setUsers(data.data))
    }, [])

  return (
    <div>
        <Container>
            <div>
                <Button> إضافة مستخدم <FaPlus /></Button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th> ID </th>
                        <th> User Name </th>
                        <th> User Email </th>
                        <th> User Role </th>
                        <th> Actions </th>
                    </tr>
                </thead>
                <tbody>
                    { users? users.map( (user, i) => (
                        <tr key={user._id}>
                            <td> {i} </td>
                            <td> {user.username} </td>
                            <td> {user.userEmail} </td>
                            <td> {user.isProvider} </td>
                            <td> <IoTrashBin /> </td>
                        </tr>
                    )):
                    <>
                    </>}
                </tbody>
            </table>
        </Container>
    </div>
  )
}

export default Dashboard