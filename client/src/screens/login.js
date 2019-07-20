import React, { useState } from 'react'
import { Container, TextField, Grid, Card, CardContent, Button, makeStyles, CardMedia } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(3),
    },
}));

const LoginScreen = () => {
    const [formData, setValues] = useState({
        username: '',
        password: '',
    })

    const handleChange = ({ target }) => {
        setValues({ ...formData, [target.name]: target.value })
    }

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
                            id="standard-name"
                            label="Username"
                            // className={classes.textField}
                            name="username"
                            onChange={handleChange}
                            margin="normal"
                        />
                        <TextField
                            type="password"
                            id="standard-name"
                            label="Password"
                            // className={classes.textField}
                            name="password"
                            onChange={handleChange}
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
                    </Grid>
                </CardContent>
            </Card>
        </Container>
    )
}

export default LoginScreen
