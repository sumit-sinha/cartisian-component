import React from 'react'
import { 
    ListItem, 
    ListItemAvatar, 
    Avatar,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
} from '@material-ui/core'

function EmployeeListItem({ name, title, url }) {
    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar url={url}/>
            </ListItemAvatar>
            <ListItemText
                primary={name}
                secondary={title}
            />
            {/* <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="Delete">
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction> */}
        </ListItem>
    )
}

export default EmployeeListItem