import React from 'react'
import { AppBar, Toolbar, IconButton, Typography, Button, makeStyles } from '@material-ui/core'
import { Highlight } from '@material-ui/icons'
import {getUserId, resetUserId} from "../../utils/user";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    appBar: {
        backgroundColor: '#50C878',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default ({ history }) => {
    const classes = useStyles()
    const username = getUserId()

    return (
        <AppBar className={classes.appBar} position="static">
            <Toolbar>
                <IconButton onClick={() => history.push(`/home/${username}`)} edge="start" className={classes.menuButton} color="inherit" aria-label="Menu">
                    <Highlight />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    Green Light
                </Typography>
                <Button color="inherit" onClick={() => {
                    resetUserId()
                    history.push('/')
                }}>Logout</Button>
            </Toolbar>
        </AppBar>
    )
}
