import React, { useEffect } from 'react'
import { Container, TextField, Grid, Card, CardContent, Button, makeStyles } from '@material-ui/core'
import useForm from '../../hooks/useForm'
import { setUserId, getUserId } from '../../utils/user'

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

    useEffect(() => {
        const id = getUserId()
        if (id) {
            history.push(`/home/${id}`)
        }
    }, [])

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
                      const { username } = formData
                    if (['PhLe', 'PaBu'].includes(username)) {
                        setUserId(username)
                      history.push(`/home/${username}`)
                    } else {
                      alert(`${username} is not registered...`)
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
