import React from 'react'
import { Sentry, Spinner, Windmill } from 'react-activity'


function Loader() {
  return (
    <main className="w-[100vw] h-[100vh] flex items-center absolute top-0 justify-center">
      <div>

                <Spinner speed={0.5} color="#76348e"  size={50} />

                <p>
                    Loader
                </p>
      </div>
         


    </main>
  )
}

export default Loader
