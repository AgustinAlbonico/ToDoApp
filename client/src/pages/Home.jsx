import React from 'react'
import Layout from "../components/Layout"
import NavBar from '../components/nav/NavBar'
import TaskList from '../components/tasks/TaskList'

const Home = () => {
  return (
    <Layout>
      <NavBar/>
      <TaskList/>
    </Layout>
  )
}

export default Home