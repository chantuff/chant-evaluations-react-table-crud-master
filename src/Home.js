import { useMutation, useQuery } from '@apollo/react-hooks';
import React, { useState, useEffect } from 'react';
import { gql } from 'apollo-boost';
import { Link } from 'react-router-dom';
import { ALL_USERS_QUERY } from './Queries';
import './App.css';

// delete users by emails 
const DELETE_USERS_MUTATION = gql`
  mutation DeleteUsers($emails: [ID]!) {
    deleteUsers(emails: $emails)
  }
`;

//resetting api data
const RESET_USERS_MUTATION = gql`
  mutation ResetUsers {
    resetUsers
  }
`;

function Home({ users }) {
  const [emails, setEmails] = useState([]);

  const { loading, error, data } = useQuery(ALL_USERS_QUERY);

  const [deleteUsers] = useMutation(DELETE_USERS_MUTATION, {
    refetchQueries: [{ query: ALL_USERS_QUERY }],
  });

  const [resetUsers] = useMutation(RESET_USERS_MUTATION);

  function selectUser(evt, email) {
    if (evt.target.checked) {
      setEmails([...emails, email])
    } else {
      setEmails(emails.filter(e => e !== email))
    }
  }
  /*useEffect(() => {
    resetUsers()
    
  }, [])
  */
  return (
    <div className='App'>
      <main>
        <h1>Users</h1>
        <button className='delete'
          onClick={() => deleteUsers({ variables: { emails } })}
          disabled={!emails.length}
        >Delete</button>

        <section>
          <div className='row'>
            <h3 style={{ width: '50%' }}>Email</h3>
            <h3 style={{ width: '40%' }}>Name</h3>
            <h3 style={{ width: '10%' }}>Role</h3>
          </div>
          {data?.allUsers.map((user) => (

            <div className='data'>
              <p className='email'>
                <input type='checkbox'
                  style={{
                    marginRight: '20px'
                  }}
                  onClick={evt => evt.stopPropagation()}
                  onChange={evt => selectUser(evt, user.email)}
                />

                <Link className='link' to={`edit/${user.email
                  }`}
                  style={{ textDecoration: 'none' }}>
                  {user.email}

                </Link>
              </p>
              <p style={{ width: '20%' }}>
                {user.name}</p>
              <p style={{ width: '10%' }}>{user.role}</p>

            </div>

          ))}

        </section>
      </main>
    </div>

  )
}
export default Home;