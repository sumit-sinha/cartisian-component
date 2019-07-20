import React, { useState } from 'react';
import { Avatar, Card, CardContent, Container, Fab, Typography } from '@material-ui/core'
import './home.css';
import { getMyInformation } from '../../utils/request.manager';
import SecondScreen from "../../components/SecondScreen"
import DoNotDisturbLight from "../../components/DoNotDisturbLight"

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
};

export function Home({ match = { params: {} } }) {
  const [user, setUser] = useState(null);
  const [timeDifference, setTimeDifference] = useState(null);

  const paramId = match.params.id || 'PaBu';
  if (user == null) {
    getMyInformation(paramId).then((result) => {
      setUser(result);
    });

    return <p>Unauthorised Access</p>;
  }

  const userName = `${user.firstName} ${user.lastName}`;
  const userImage = user.image || dummyImage;
  if (user.time) {
    updateTimeDifference(user.time, setTimeDifference);
  }

  const renderSecondScreen = ({ isOpened }) => isOpened ? (
      <Container>
        <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <DoNotDisturbLight isOn={timeDifference} />
        </div>
      </Container>
  ) : null

  return (
    <div className="home">
      <div className="home-header">
        <div className="home-image">
          <Avatar src={userImage} style={{ height: 150, width: 150 }} />
        </div>
        <div className="home-labels">
          <p className="home-name">{userName}</p>
          <p>{user.title}</p>
          <p className="home-description">{user.description}</p>
        </div>
      </div>
      <div className="home-button">
        <Fab color="primary" aria-label="Busy" className={user.time == null ? 'home-busy' : 'home-free'}>
          <span>{user.time == null ? 'Go Busy' : 'Break'}</span>
        </Fab>
      </div>
      {timeDifference ? (
        <div className="home-time">
          <p>{convertNumberToTwoDigit(timeDifference.getMinutes())} : {convertNumberToTwoDigit(timeDifference.getSeconds())}</p>
        </div>
      ) : null}
      <div className="second-screen-toggler">
        <SecondScreen
            openedText="Close Second Screen"
            closedText="Open Second Screen"
            renderSecondScreen={renderSecondScreen}
        />
      </div>

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