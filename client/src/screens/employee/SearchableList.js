import React, { useState, useEffect, useRef } from 'react'
import { 
    Container, 
    List, 
    ListItem, 
    ListItemAvatar, 
    Avatar,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import SearchBar from 'material-ui-search-bar'

import { employees } from '../../mocks/employees'

function SearchableList(props) {
    const [data, setData] = useState()
    const [fetchedData, setFetchedData] = useState([])

    useEffect(() => {
        setFetchedData(employeeList)
        
        console.log(employeeList)
        // const fetchData = async () => {
        //     const result = await fetch(
        //       '../../../employeeList.json',
        //     );
        //     console.log(result)
        //     setData(result.data);
        // }
        // fetchData()
    }, []);

    const filterList = (str) => {
        var updatedList = fetchedData
        updatedList = updatedList.filter((item) => {
            console.log(item.userName === str)
            return (
                item.lastName.toLowerCase().search(str.toLowerCase()) !== -1 ||
                item.firstName.toLowerCase().search(str.toLowerCase()) !== -1 ||
                item.title.toLowerCase().search(str.toLowerCase()) !== -1
            )
        })

        console.log(updatedList)
        setData(updatedList)
    }

    function getItems() {
        const items = data || fetchedData
        return items.map((item) => {
            return <EmployeeListItem key={item.userName} name={`${item.firstName} ${item.lastName}`} title={item.title} url={item.image}/>
        })
    }

    return (
        <Container>
            <SearchBar
                placeholder={"Enter name, title or project"}
                onChange={filterList}
            />
            <List aria-label="Main mailbox folders">
                {getItems()}
            </List>
        </Container>
    )
}

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

export default SearchableList