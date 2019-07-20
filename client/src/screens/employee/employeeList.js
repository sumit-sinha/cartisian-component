import React, { useState, useEffect } from 'react'
import { 
    Container, 
    List,
    ListItem,
    ListItemText,
    Card,
    CardContent,
} from '@material-ui/core'
import SearchBar from 'material-ui-search-bar'
import EmployeeCard from './EmployeeCard'
import AppBar from '../../components/AppBar'

import { employees } from '../../mocks/employees'

function EmployeeList({ history }) {
    const [data, setData] = useState()
    const [fetchedData, setFetchedData] = useState([])

    useEffect(() => {
        setFetchedData(employees)
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

        return (
            <List>
                {
                    items.map((item) => {
                        return (
                            <ListItem>
                                <Card>
                                    <CardContent>
                                        <EmployeeCard key={item.userName} actualUser={"PaBu"} name={`${item.firstName} ${item.lastName}`} title={item.title} url={item.image} queue={item.queue}/>
                                    </CardContent>
                                </Card>
                           </ListItem>
                        )
                })
                }
            </List>
        )
    }

    return (
        <>
            <AppBar history={history} />
            <Container maxWidth="sm">
                <SearchBar
                    placeholder={"Search by name, title or project"}
                    onChange={filterList}
                />
                {getItems()}
            </Container>
        </>
    )
}

export { EmployeeList }
