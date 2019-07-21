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
    CardContent,
    LinearProgress
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import { makeStyles } from '@material-ui/core/styles';
import { addToUserQueue, deleteFromUserQueue } from '../../utils/request.manager'
import { getUserId } from '../../utils/user'

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

function EmployeeListItem({ employeeName, name, title, url, queue = [] }) {
    const classes = useStyles();
    const [q, setQ] = useState(queue)

    function addToQueue() {
        // do nothing when user is already in queue
        if (q.find((item) => { return item.userName === getUserId() })) { return }

        const queue = [...q]
        
        queue.push({ 
            userName: getUserId(), 
            firstName: "Patrick", 
            lastName: "Burger",
            image: ""
        })
        
        addToUserQueue(employeeName)
        setQ(queue)
    }

    function deleteFromQueue() {
        // do nothing when queue is empty or actualUser is not in it
        const filtered = q.filter((item) => {
            return item.userName !== getUserId()
        })

        deleteFromUserQueue(employeeName)
        setQ(filtered)
    }

    function queueItems() {
        console.log(q)
        return q.map((item) => {
            return (
                <ListItem>
                    <ListItemAvatar>
                        <Avatar url={item.image} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={(getUserId() === item.userName) ? 'You' : `${item.firstName} ${item.lastName}`}
                    />
                    {
                        (getUserId() === item.userName) ?
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
                            <LinearProgress marginBottom={5} variant="determinate" value={30} />
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