import React, { useState, useEffect } from 'react';
import './App.css';
import { useParams, useNavigate } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { ALL_USERS_QUERY } from './Queries';

//update users role and email address 
const UPDATE_USER_MUTATION = gql`
mutation UpdateUser($email: ID!, $newAttributes: UserAttributesInput!) {
  updateUser(email: $email, newAttributes: $newAttributes){
    role
    email
  }
}
`
const GET_USER_QUERY = gql`
    query User($email: ID!) {
      user(email: $email) {
        email
        name
        role
      }
    }
  `;

function Edit({ users }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useQuery(GET_USER_QUERY, { variables: { email: id } });
  const selectedUser = users.find(user => user.email === id);
  const [userRole, setUserRole] = useState(selectedUser.role || '');
  const [userName, setUserName] = useState(selectedUser.name || '');

  const [updateUser] = useMutation(UPDATE_USER_MUTATION, {
    refetchQueries: [{ query: ALL_USERS_QUERY }],
  });


  useEffect(() => {
    if (data) {
      setUserName(data.user.name)
      setUserRole(data.user.role)
    }
  }, [data])

  return (
    <div className='App'>
      <main>
        <div className='row'>
          <h1>{id}</h1>
          <button className='save' onClick={() => {
            updateUser({
              variables:
              {
                email: id,
                newAttributes:
                {
                  role: userRole,
                  name: userName,
                }
              }
            })
            navigate('/')
          }}>Save</button>
        </div>

        <div className='row'>
          <div style={{ width: '50%' }}>
            <h4>Name</h4>
            <input type='text'
              style={{ width: '250px' }}
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <span class='vertical-line'></span>

          <div style={{ width: '50%' }}>
            <h4>Role</h4>
            <div>
              <div
                style={{
                  justifyContent: 'flex-start',
                  display: 'flex',
                  alignItems: 'center',
                  color: 'black',
                }}
              >

                <input
                  type='radio'
                  style={{ width: 'auto' }}
                  checked={userRole === 'ADMIN'}
                  value='ADMIN'
                  key={users.role}
                  onChange={(e) => setUserRole(e.target.value)}
                />{''}
                <span>Admin</span>
              </div>

              <div
                style={{
                  justifyContent: 'flex-start',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <input
                  type='radio'
                  style={{ width: 'auto' }}
                  checked={userRole === 'DEVELOPER'}
                  value='DEVELOPER'
                  key={users.role}
                  onChange={(e) => setUserRole(e.target.value)}
                />{''}
                <span>Developer</span>
              </div>

              <div
                style={{
                  justifyContent: 'flex-start',
                  display: 'flex',
                  alignItems: 'center',
                  color: 'black',
                }}
              >
                <input
                  type='radio'
                  style={{ width: 'auto' }}
                  checked={userRole === 'APP_MANAGER'}
                  value='APP_MANAGER'
                  key={users.role}
                  onChange={(e) => setUserRole(e.target.value)}
                />{''}
                <span>App Manager</span>
              </div>

              <div
                style={{
                  justifyContent: 'flex-start',
                  display: 'flex',
                  alignItems: 'center',
                  color: 'black',
                }}
              >
                <input
                  type='radio'
                  style={{ width: 'auto' }}
                  checked={userRole === 'MARKETING'}
                  value='MARKETING'
                  key={users.role}
                  onChange={(e) => setUserRole(e.target.value)}
                />{''}
                <span>Marketing</span>
              </div>

              <div
                style={{
                  justifyContent: 'flex-start',
                  display: 'flex',
                  alignItems: 'center',
                  color: 'black',
                }}
              >
                <input
                  type='radio'
                  style={{ width: 'auto' }}
                  checked={userRole === 'SALES'}
                  value='SALES'
                  key={users.role}
                  onChange={(e) => setUserRole(e.target.value)}
                />{''}
                <span>Sales</span>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}


export default Edit;