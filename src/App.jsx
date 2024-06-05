import { useState, useEffect } from 'react'
import axios from 'axios'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


const Table = ({ data }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th className="header">Task</th>
          <th className="header">Completed</th>
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={item.id}>
            <td className="cell">{item.title}</td>
            <td className="cell">{item.completed.toString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};


const TableFlights = ({ data }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th className="header">airline_name</th>
          <th className="header">destination_country</th>
          <th className="header">origin_country</th>
          <th className="header">Departure time</th>
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={item.id}>
            <td className="cell">{item.airline_name}</td>
            <td className="cell">{item.destination_country}</td>
            <td className="cell">{item.origin_country}</td>           
            <td className="cell">{item.departure_time}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};


function App() {
  const [todos, setTodos] = useState([])
  const [flights, setFlights] = useState([])
  const [count, setCount] = useState(0)
  const [userInput, setUserInput] = useState('')
  const [inputToServer, setInputToServer] = useState('')

  // useEffect(() => {
  //   axios.get('https://jsonplaceholder.typicode.com/todos')
  //     .then(function (response) {
  //       console.log(response);
  //       setTodos(response.data)
  //     })
  //     .catch(function (error) {
  //       // handle error
  //       console.log(error);
  //     })

  // }, [])

    useEffect(() => {
    axios.get('http://localhost:3000/api/flights')
      .then(function (response) {
        console.log(response);
        setFlights(response.data)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })

  }, [])

  useEffect(() => {

    const timerId = setTimeout(() => {
      // send http request (fetch/axios)
      setInputToServer(userInput)
    }, 2000)

    return () => {
      console.log('cleaning up')
      clearTimeout(timerId)
    }
  }, [userInput])


  const onChangeHandler = (e) =>{
    // console.log(e.target.value)
    setUserInput(e.target.value)
  }


  return (
    <>
      <div>
        <h1>Simple Table Example</h1>
        <label htmlFor="search">search</label>
        <input onChange={onChangeHandler} id='search' type='text'></input>
        <p>user input: {userInput}</p>
        {inputToServer && <p>sending data to some wwww.ourserverdomain.com?q={inputToServer}</p>}
        <Table data={todos} />
        <TableFlights data={flights} />
        <button onClick={() => { setCount((prevCount) => prevCount + 1) }}>increment counter</button>
      </div>

    </>
  )
}

export default App
