import React, { useContext } from 'react'
import DashNavbar from '../components/DashNavbar'
import SearchSection from '../components/SearchSection'
import PackageStatusButtons from '../components/PackageStatusButtons'
import PackageList from '../components/PackageList'
import { AppContext } from '../context/AppContext'

const Dashboard = () => {
  const { activeStatus } = useContext(AppContext);

  return (
    <div>
      <DashNavbar />
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="my-8">
          <h1 className="text-3xl font-bold mb-4">Package Dashboard</h1>
          <h3 className="text-gray-500">
            Manage incoming packages and tenant notifications
          </h3>
        </div>
        <SearchSection />
        <PackageStatusButtons />
        <PackageList activeStatus={activeStatus} />
      </div>
    </div>
  )
}

export default Dashboard
