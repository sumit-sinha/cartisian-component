import React from 'react'
import { Container, TextField, Grid, Card, CardContent, Button, makeStyles } from '@material-ui/core'
import useForm from '../../hooks/useForm'
import SecondScreen from '../../components/SecondScreen'
import DoNotDisturbLight from '../../components/DoNotDisturbLight'

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(3),
  },
}));

export function Login () {
  const { formData, updateField } = useForm({
    username: ''
  })
  const classes = useStyles()

  const renderSecondScreen = ({ isOpened }) => isOpened ? (
      <Container>
        <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <DoNotDisturbLight isOn={true} />
        </div>
      </Container>
  ) : null

  return (
      <Container maxWidth="sm">
        <Card style={{ minWidth: 350, margin: 50 }}>
          <CardContent>
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
            >
              <h1>Green Light</h1>
              <TextField
                  label="Username"
                  name="username"
                  onChange={updateField}
                  margin="normal"
                  value={formData.username}
              />
              <TextField
                  type="password"
                  label="Password"
                  name="password"
                  onChange={updateField}
                  margin="normal"
              />
              <Button
                  onClick={() => alert(`go to main screen - User: ${formData.username}, Password: ${formData.password}`)}
                  variant="contained"
                  color="primary"
                  className={classes.button}
              >
                Login
              </Button>
              <SecondScreen
                  openedText="Close Second Screen"
                  closedText="Open Second Screen"
                  renderSecondScreen={renderSecondScreen}
              />
            </Grid>
          </CardContent>
        </Card>
      </Container>
  )
}
