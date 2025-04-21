import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

function Result() {
    const { generateImage } = useContext(AppContext)
    const [image, setImage] = useState(assets.sample_img_1)
    const [isImageLoaded, setIsImageLoaded] = useState(false)
    const [loading, setLoading] = useState(false)
    const [input, setInput] = useState('')

    const { user, token } = useContext(AppContext);
    const navigate = useNavigate();

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true)
        if (input) {
            const image = await generateImage(input)
            if (image) {
                setIsImageLoaded(true)
                setImage(image)
            }
        }
        setLoading(false)
    }
    return (
        <motion.form
            initial={{ opacity: 0.2, y: 100 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{}}
            onSubmit={onSubmitHandler} action="" className='mb-8 min-h-[80vh] flex flex-col justify-center items-center'
        >
            <div className=' '>
                <div className='relative'>
                    <img className='max-w-sm rounded  w-64 content-center' src={image} alt="" />

                    <span className={` absolute bottom-0 left-0 h-1 bg-blue-500 ${loading ? 'w-full transition-all duration-[10s]' : 'w-0'}`} />
                </div>

                <p className={!loading ? 'hidden ' : ''}>Loading.......</p>


            </div>
            {
                !isImageLoaded &&


                <div className='flex w-full max-w-xl bg-neutral-500 text-white text-sm p-0.5 mt-10 rounded-full'>
                    <input value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder='Describe what you want to generate'
                        className='flex-1 bg-transparent outline-none ml-8
                 max-sm:w-20 placeholder-color'/>
                    <button type='submit' className='px-10 bg-zinc-900 sm:px-16 py-3 rounded-full'>Generate</button>

                </div>
            }

            <div className='flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full'>
                <p onClick={() => { setIsImageLoaded(false) }} className='bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer'>Generate Another</p>
                <a href={image} download className='bg-zinc-900 px-10 py-3 rounded-full cursor-pointer'>Download</a>
            </div>
        </motion.form>

    )
}

export default Result