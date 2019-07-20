import React, { useState, useEffect } from 'react'
import { 
    Container, 
    List
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import SearchBar from 'material-ui-search-bar'
import EmployeeCard from './EmployeeCard'

import { employees } from '../../mocks/employees'

function EmployeeList(props) {
    const [data, setData] = useState()
    const [fetchedData, setFetchedData] = useState([])

    useEffect(() => {
        setFetchedData(employees)
        console.log(employees)
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
            return <EmployeeCard key={item.userName} name={`${item.firstName} ${item.lastName}`} title={item.title} url={item.image}/>
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

export { EmployeeList }
