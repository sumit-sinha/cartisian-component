import React, { useState, useEffect } from 'react'
import { 
    Container, 
    List,
    ListItem,
    Card,
    CardContent,
} from '@material-ui/core'
import SearchBar from 'material-ui-search-bar'
import EmployeeCard from './EmployeeCard'
import AppBar from '../../components/AppBar'
import { getUserId } from '../../utils/user'
import { getEmployees } from '../../utils/request.manager'

// import { employees } from '../../mocks/employees'

function EmployeeList({ history }) {
    const [data, setData] = useState([])
    const [fetchedData, setFetchedData] = useState([])

    useEffect(() => { 
        async function fetchData() {
            const employees = await getEmployees()
            console.log("useEffect", employees)
            const employeesWithoutMe = employees.filter((item) => { return item.userName !== getUserId() })
            setFetchedData(employeesWithoutMe)
        }
        fetchData()
    }, []);

    const filterList = (str) => {
        var updatedList = fetchedData
        updatedList = updatedList.filter((item) => {
            return (
                item.lastName.toLowerCase().search(str.toLowerCase()) !== -1 ||
                item.firstName.toLowerCase().search(str.toLowerCase()) !== -1 ||
                item.title.toLowerCase().search(str.toLowerCase()) !== -1
            )
        })

        setData(updatedList)
    }

    function getItems() {
        const items = (data.length && data ) || fetchedData
        return (
            <List>
                {
                    items.map((item) => {
                        return (
                            <ListItem>
                                <Card>
                                    <CardContent>
                                        <EmployeeCard key={item.userName} employeeName={item.userName} name={`${item.firstName} ${item.lastName}`} title={item.title} url={item.image} queue={item.queue}/>
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
