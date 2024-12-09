import { RouterProvider } from 'react-router'
import './App.css'
import Router from './router/Router'
import { Suspense } from 'react'
import { CircularProgress } from '@mui/material'

function App() {

  return (
    <>
      <Suspense fallback={<CircularProgress variant="determinate" color="warning" />}>
        <RouterProvider router={Router} />
      </Suspense>
    </>
  )
}

export default App
