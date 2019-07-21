import React, { useState } from 'react';
import {Avatar, Button, Card, CardContent, Container, Fab, Typography} from '@material-ui/core'
import './home.css';
import { getMyInformation, setAvailable, setBusy } from '../../utils/request.manager';
import SecondScreen from "../../components/SecondScreen"
import DoNotDisturbLight from "../../components/DoNotDisturbLight"
import AppBar from '../../components/AppBar'

const dummyImage = 'https://gradientjoy.com/300x200';

const getDateDifference = (date = 0) => {
  const timeSinceStart = new Date(new Date().getTime() - date);
  const remainingTime = new Date(new Date(25 * 60 * 1000).getTime() - timeSinceStart.getTime());

  return remainingTime;
};

const updateTimeDifference = (timeDifference, setTimeDifference) => {
  const interval = setInterval(() => {
    if (timeDifference == null) {
      clearInterval(interval);
      setTimeDifference(null)
      return;
    }
    
    setTimeDifference(getDateDifference(timeDifference));
  }, 1000);
};

const convertNumberToTwoDigit = (value) => {
  if (value < 10) {
    return `0${value}`;
  }

  return value;
};

export function Home({ match = { params: {} }, history }) {
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
  ) : null;

  if (timeDifference && timeDifference.getHours() === 0 && timeDifference.getMinutes() === 0) {
    setUser({
      ...user,
      time: null,
      queue: null,
    });
    setTimeDifference(null);
    setAvailable(user.userName).then();
  }

  return (
    <div className="home">
      <AppBar history={history} />
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
        <Fab
          color="primary"
          aria-label="Busy"
          className={user.time == null ? 'home-busy' : 'home-free'}
          onClick={() => {
            if ((user.time && !timeDifference)) {
              console.log('setAvailable')

              setAvailable(user.userName).then((response) => {
                console.log('response set available', response)
              });
              // setUser({
              //   ...user,a
              //   time: null,
              //   queue: null,
              // });
              // setTimeDifference(null);
            } else {
              console.log('setBusy')
              setBusy(user.userName).then((response) => {
                console.log('response set busy', response)
              });
              // setUser({
              //   ...user,
              //   time: new Date(),
              // });
            }
          }}
        >
          <span>{user.time == null ? 'Go Busy' : 'Break'}</span>
        </Fab>
      </div>

      {timeDifference && user.time ? (
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
        <Button
            onClick={() => history.push('/employees')}
            variant="outlined"
            color="secondary"
        >
          I need to talk...
        </Button>
      </div>

      {user.queue ? (
        <div className="home-queue-card-wrapper">
          {user.queue.map((item, index) => (
            <Card className="home-queue-card" key={`${index}: ${JSON.stringify(user)}`}>
              <CardContent>
                <Typography className="home-queue-card-title" color="textSecondary" gutterBottom>
                  {item.title || 'No Job Title'}
                </Typography>
                <Typography variant="h5" component="h2">
                  {item.firstName}&nbsp;
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
