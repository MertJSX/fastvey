import { useCallback, useState } from "react"
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL;

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (username == "" || password == "") {
      setError("Please, fill all fields!")
      return
    }
    axios.post(`${API_BASE_URL}/api/login`, {
      username: username,
      password: password
    }).then((data) => {
      if (data.data.token) {
        Cookies.set("token", data.data.token)
        navigate("/")
        return
      }
      setError("Unknown error! Bad response from server.")
    }).catch((err) => {
      if (err.response.data.err) {
        setError(err.response.data.err)
        return;
      }
      setError("Server error!")
    })
  }, [username, password])

  return (
    <div className="min-h-screen flex">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 flex flex-col w-100 p-8 m-auto my-auto rounded-xl"
      >
        <h1 className="text-center text-5xl text-pink-400 italic font-extrabold mb-5">Fastvey</h1>
        <p className="m-1">Username</p>
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value)
          }}
          className="bg-gray-700 m-1 p-1 text-lg border-none w-full outline-1 focus:outline-pink-300 outline-gray-500"
          autoFocus
        />
        <p className="m-1">Password</p>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
          className="bg-gray-700 m-1 p-1 text-lg border-none w-full outline-1 focus:outline-pink-300 outline-gray-500"
        />
        <button type="submit" className="bg-pink-500 hover:bg-pink-600 cursor-pointer text-center w-full font-extrabold p-1 m-1">LOGIN</button>
        <p className="text-red-300">{error}</p>
      </form>
    </div>
  )
}

export default Login