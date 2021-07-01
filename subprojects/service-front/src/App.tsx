import ServicesProvider from './store/rootServiceStore'
import ModelsProvider from './store/rootModelStore'
import Navbar from './ui/routes/nav/Navbar'
import Loader from './ui/components/Loader'

import { Suspense } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { routes } from './ui/routes'

const App = () => {
  return (
    <ServicesProvider>
      <ModelsProvider>
        <Router>
          <Suspense fallback={<Loader banner={'Microservice-Feeds'}></Loader>}>
            <Navbar />
            <main>{routes()}</main>
          </Suspense>
        </Router>
      </ModelsProvider>
    </ServicesProvider>
  )
}
export default App
