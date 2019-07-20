import React from 'react'
import { Container, TextField, Grid, Card, CardContent, Button, makeStyles } from '@material-ui/core'
import useForm from '../../hooks/useForm'

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(3),
  },
}));

export function Login ({ history }) {
  const { formData, updateField } = useForm({
    username: ''
  })
  const classes = useStyles()

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
                  onClick={() => {
                    if (['PhLe', 'PaBu'].includes(formData.username)) {
                      history.push(`/home/${formData.username}`)
                    } else {
                      alert(`${formData.username} is not registered...`)
                    }
                  }}
                  variant="contained"
                  color="primary"
                  className={classes.button}
              >
                Login
              </Button>
            </Grid>
          </CardContent>
        </Card>
      </Container>
  )
}
