import React from 'react'
import Layout from '../components/Layout/Layout'

const Policy = () => {
  return (
    <Layout title={'Privacy Policy'}>
      <div className="row contactus">
            <div className="col-md-6">
                <img src="/images/contactus.jpeg" alt="contactus" style={{width:"100%"}}/>
            </div>
            <div className="col-md-4">
                <h1 className='bg-dark p-2 text-white text-center'>PRIVACY POLICY</h1>
                <p className='text-justify mt-2'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reiciendis cum, ducimus quas, ex ipsum sint earum nesciunt deleniti excepturi, laudantium tempora amet. Maxime beatae unde accusamus deleniti nulla qui dolor.lorem </p>
              
            </div>
        </div>
    </Layout>
  )
}

export default Policy
