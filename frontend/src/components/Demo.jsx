import React from 'react'

const Demo = () => {
  return (
    <section id='demo' className="w-full py-10 md:py-24 lg:py-24 items-center">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
        <div className="space-y-2">
          <h3 className="">Check our Demo</h3>
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
            User friendly interface and sleek professional design
          </h2>
        </div>
      </div>
      <div className='border-2 border-black w-1/2 h-96 m-auto items-center rounded-lg'>
        Video Demo of the product
      </div>
    </section>
  );
}

export default Demo