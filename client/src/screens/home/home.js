import React, { useState } from 'react';
import { Avatar, Card, CardContent, Fab, Typography } from '@material-ui/core';
import './home.css';
import { employees } from '../../mocks/employees';

const getUser = (userName) => {
  return employees.find((employee) => employee.userName === userName);
};

const dummyImage = 'https://gradientjoy.com/300x200';

const getDateDifference = (date = 0) => {
  return new Date(new Date().getTime() - date);
};

const updateTimeDifference = (timeDifference, setTimeDifference) => {
  setInterval(() => {
    setTimeDifference(getDateDifference(timeDifference));
  }, 1000);
};

const convertNumberToTwoDigit = (value) => {
  if (value < 10) {
    return `0${value}`;
  }

  return value;
}

export function Home({ match = { params: {} } }) {
  const user = getUser(match.params.id || 'PaBu');
  const [timeDifference, setTimeDifference] = useState(null);

  if (user == null) {
    return <p>Unauthorised Access</p>;
  }

  if (user.time) {
    updateTimeDifference(user.time, setTimeDifference);
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
      <div className="home-button">
        <Fab color="primary" aria-label="Busy" className={user.time == null ? 'home-busy' : 'home-free'}>
          <span>{user.time == null ? 'Go Busy' : 'Cancel'}</span>
        </Fab>
      </div>
      {timeDifference ? (
        <div className="home-time">
          <p>{convertNumberToTwoDigit(timeDifference.getMinutes())} : {convertNumberToTwoDigit(timeDifference.getSeconds())}</p>
        </div>
      ) : null}
      {user.queue ? (
        <div className="home-queue-card-wrapper">
          {user.queue.map((item) => (
            <Card className="home-queue-card">
              <CardContent>
                <Typography className="home-queue-card-title" color="textSecondary" gutterBottom>
                  {item.title || 'No Job Title'}
                </Typography>
                <Typography variant="h5" component="h2">
                  {item.firstName}
                  {item.lastName}
                </Typography>
                <Typography className="home-queue-card-pos" color="textSecondary">
                  {item.description || 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.'}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : null}
    </div>
  );
}
