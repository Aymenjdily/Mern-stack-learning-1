import './App.css';
import { useState, useEffect } from 'react';
import Axios from 'axios';

function App() {
  const [name, setName] = useState("")
  const [age, setAge] = useState(0)
  const [friends, setFriends] = useState([])

  const addFriend = () => {
    Axios.post('http://localhost:8000/addfriend', {
      name: name, age: age
    }).then((res) => {
        setFriends([...friends, {_id: res.data.id , name: name, age:age, description: res.data.description}])
    }).catch(() => {
      alert("something wrong ! ")
    })
  }

  const updateFriend = (id) => {
    const newAge = prompt("Enter new age :")
    Axios.put('http://localhost:8000/updatefriend', { newAge: newAge, id: id }).then(() => {
      setFriends(friends.map((item) => {
        return item._id === id ? {_id: id, name: item.name, age: newAge, description: item.description} : item
      }))
    })
  }

  const removeFriend = (id) => {
    Axios.delete(`http://localhost:8000/delete/${id}`).then(() => {
      setFriends(friends.filter((item) => {
        return item._id !== id
      }))
    })
  }

  useEffect(() => {
    Axios.get('http://localhost:8000/getfriend')
    .then((res) => {
      setFriends(res.data)
    })
    .catch((error) => {
      console.log(error)
    })
  }, [])
  

  return (
    <div className="App">
      <header className="App-header">
        <section className="text-gray-600 body-font">
          <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
            <div className="lg:pr-24 md:pr-16 flex flex-col md:items-start items-center text-left mb-16 md:mb-0">
              <h1 className="title-font sm:text-6xl text-3xl mb-4 font-medium text-white">Learning
                <br className="hidden lg:inline-block"/>Insert Your Friend
              </h1>
              <div className="flex gap-5 flex-col justify-start mt-10">
                <label className='text-md text-gray-300'>
                  Name :
                </label>
                <input type="text" name='name' id='name' placeholder='write the name' className='px-4 outline-none bg-transparent text-gray-200 border-2 border-gray-200 py-2 rounded-lg' onChange={(e)=>{setName(e.target.value)}} />
                <label className='text-md text-gray-300'>
                  Age :
                </label>
                <input type="number" name='age' id='age' placeholder='write the age' className='px-4 outline-none bg-transparent text-gray-200 border-2 border-gray-200 py-2 rounded-lg' onChange={(e) => {setAge(e.target.value)}} />
                <button className='bg-blue-500 text-white py-3 uppercase font-bold outline-none' onClick={addFriend}>
                  Insert
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5">
              {
                friends.map((friendCard, index) => (
                  <div key={index} className="bg-white w-[400px] py-8 items-start flex flex-col p-5 rounded-xl">
                    <div className='flex justify-between w-full'>
                      <h1 className='font-extrabold capitalize'>
                        {friendCard.name}
                      </h1>
                      <span>
                        {friendCard.age}
                      </span>
                    </div>
                    <p className='text-left mt-5 text-green-600 font-semibold'>
                      {friendCard.description}
                    </p>
                    <div className='mt-4 flex gap-5 w-full'>
                      <button className='bg-blue-200 outline-none text-md px-5 py-2' onClick={() => updateFriend(friendCard._id)}>
                        Update
                      </button>
                      <button className='bg-red-600 text-white outline-none text-md px-5 py-2' onClick={() => removeFriend(friendCard._id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </section>
      </header>
    </div>
  );
}

export default App;
