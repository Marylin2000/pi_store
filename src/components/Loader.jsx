import React from 'react'
import { Sentry, Spinner, Windmill } from 'react-activity'

import { Oval } from 'react-loader-spinner'


function Loader() {
  return (
    <main className="w-[100vw] h-[100vh] flex items-center absolute top-0 justify-center">
      <div>

                <Oval speed={0.5} color="#76348e"  secondaryColor='white' size={30} />

                <p>
                    Loading
                </p>
      </div>
         


    </main>
  )
}

export default Loader
