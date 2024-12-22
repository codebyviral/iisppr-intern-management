import AbourCard from '@/Components/AbourCard'
import { Navbar, SideNav, Wrapper } from '@/Components/compIndex'
import React from 'react'

const About = () => {
    const personDetails = [
        {
            source: "https://picsum.photos/200",
            name: "Intern Management",
            role: "counsellor and psychotherapist",
            desc: "Experience counsellor and psychotherapist with more than 2 years of experience"
        },
        {
            source: "https://picsum.photos/id/120/200",
            name: "Intern Management",
            role: "counsellor and psychotherapist",
            desc: "Experience counsellor and psychotherapist with more than 2 years of experience"
        },
        {
            source: "https://picsum.photos/id/121/200",
            name: "Intern Management",
            role: "counsellor and psychotherapist",
            desc: "Experience counsellor and psychotherapist with more than 2 years of experience"
        },
        {
            source: "https://picsum.photos/id/154/200",
            name: "Intern Management",
            role: "counsellor and psychotherapist",
            desc: "Experience counsellor and psychotherapist with more than 2 years of experience"
        },
        {
            source: "https://picsum.photos/id/212/200",
            name: "Intern Management",
            role: "counsellor and psychotherapist",
            desc: "Experience counsellor and psychotherapist with more than 2 years of experience"
        },
        {
            source: "https://picsum.photos/id/134/200",
            name: "Intern Management",
            role: "counsellor and psychotherapist",
            desc: "Experience counsellor and psychotherapist with more than 2 years of experience"
        },
    ]
    return (
        <>
            <SideNav />
            <Navbar />
            <Wrapper>
                <div className='text-center space-y-5'>
                    <div>
                        <h1 className='text-2xl mb-5 font-semibold'>IISPR Intern Management</h1>
                        <p className='text-justify'>"Our platform is committed to delivering high-quality, compassionate counseling through live webinars. We connect you with experienced and certified professionals who provide expert advice on a range of topics including mental health, parenting, relationships, and personal growth. ..."</p>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <img className='w-[250px] h-[250px] mt-1.5 rounded-lg' src="https://picsum.photos/id/666/200" alt="head image" />
                        <h3 className='text-2xl font-semibold mb-5'>Intern Management</h3>
                        <p className='mb-5 text-lg'>Founder & CEO</p>
                        <p className='font-thin'>Founder of IISPR Intern Management. Experience counsellor.</p>
                    </div>
                    <div className='my-8'>
                        <h1 className='mb-9 text-3xl font-semibold'>MEET YOUR COUNSELLORS</h1>
                        <div className='flex flex-wrap gap-8 justify-center'>
                            {personDetails.map((personDetail, index) => {
                                return <AbourCard source={personDetail?.source} name={personDetail?.name} role={personDetail?.role} desc={personDetail?.desc} key={personDetail?.name + index} />
                            })}
                        </div>
                    </div>
                    <div>
                        <p className='text-2xl font-thin mt-10'>"We are a dedicated team of experienced doctors committed to providing exceptional care and support to enhance the well-being of our community."</p>
                    </div>
                </div>
            </Wrapper>
        </>
    )
}

export default About