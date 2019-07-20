import React from 'react';
import { Avatar, Fab } from '@material-ui/core';
import './home.css';
import { employees } from '../../mocks/employees';

const getUser = (userName) => {
  return employees.find((employee) => employee.userName === userName);
};

const dummyImage = 'https://gradientjoy.com/300x200';

export function Home({ match = { params: {} } }) {
  const user = getUser(match.params.id || 'PaBu');
  if (user == null) {
    return <p>Unauthorised Access</p>;
  }

  return (
    <div className="home">
      <div className="home-header">
        <div className="home-image">
          <Avatar src={user.image || dummyImage} style={{ height: 150, width: 150 }} />
        </div>
        <div className="home-labels">
          <p className="home-name">{`${user.firstName} ${user.lastName}`}</p>
          <p>{user.title}</p>
          <p className="home-description">{user.description}</p>
        </div>
      </div>
      {user.time == null ? (
        <div className="home-button">
          <Fab color="primary" aria-label="Busy" className="home-busy">
            <span>Go Busy</span>
          </Fab>
        </div>
      ) : null}
    </div>
  );
}
