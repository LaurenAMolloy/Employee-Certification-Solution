import Nav from '../components/Nav'
import { Outlet } from 'react-router-dom'

export default function Root() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className='grow'>
      <div className='mx-auto max-w-7xl px-4 md:px-6 pb-5'>
        <Nav />
        <Outlet />
      </div>
    </main>
    </div>
  )
}