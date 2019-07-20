import React, { useState } from 'react'
import {
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Card,
    CardActions,
    Button,
    CardMedia,
    Typography,
    CardContent
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    card: {
        minWidth: 500,
        // margin: 50
    },
    media: {
        paddingTop: '70.00%', // 16:9
    },
    // avatar: {
    //   backgroundColor: red[500],
    // },
}));

function EmployeeListItem({ actualUser, name, title, url, queue = [] }) {
    const classes = useStyles();
    const [q, setQ] = useState(queue)


    function addToQueue() {
        
        // do nothing when user is already in queue
        if (q.find((item) => { return item.userName === actualUser })) { return }

        // TODO: push actualUser to server
        const queue = [...q]
        
        queue.push({ 
            userName: actualUser, 
            firstName: "Patrick", 
            lastName: "Burger",
            image: ""
        })
        setQ(queue)
    }

    function deleteFromQueue() {
        // do nothing when queue is empty or actualUser is not in it
        const filtered = q.filter((item) => {
            return item.userName !== actualUser
        })

        setQ(filtered)
        // TODO: post delete to server with actualUser
    }

    function queueItems() {
        return q.map((item) => {
            return (
                <ListItem>
                    <ListItemAvatar>
                        <Avatar url={item.image} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={`${item.firstName} ${item.lastName}`}
                    />
                    {
                        (actualUser === item.userName) ?
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="Delete" onClick={deleteFromQueue}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction> : null
                    }
                </ListItem>
            )
        })
    }

    return (
        <Card class={classes.card}>
            <CardContent>
                <CardMedia
                    className={classes.media}
                    image={url}
                    title={name}
                />
                <Typography variant="h6" class={classes.name}>
                    {name}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                    {title}
                </Typography>
                {
                    queueItems().length ?
                        <CardContent>
                            <Typography variant="subtitle">
                                waiting list
                    </Typography>
                            <List>
                                {queueItems().length
                                    ? queueItems()
                                    :
                                    (<ListItem>
                                        <ListItemText>Empty</ListItemText>
                                    </ListItem>)
                                }
                            </List>
                        </CardContent> : null
                }
                <CardActions>
                    <Button variant="outlined" size="small" color="primary" onClick={addToQueue}>Add me to queue</Button>
                </CardActions>
            </CardContent>
        </Card>
    )
}

export default EmployeeListItem