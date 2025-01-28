"use client"
import Carousel from 'react-bootstrap/Carousel';

const styles = {
    filter:"brightness(0.4)",
    height:"90vh"
}

export default function CustomCarousel() {
  return (
    <Carousel controls={true} indicators={false} >
      <Carousel.Item>
        <img src={"/asian-businesswoman-sitting-desk-office-studying-graphs-large-computer-screen_1098-20500.jpg"} 
        alt="alt image" className='object-fit-cover w-100' style={styles}/>
        <Carousel.Caption className='h-50'>
          <p className='h2'>Listare</p>
          <p>Your new personal tasks management app</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src="/colleagues-giving-fist-bump.jpg" className='object-fit-cover w-100 ' alt="image" style={styles}/>
        <Carousel.Caption className='h-50'>
          <p className='h2'>Work alone or with a team</p>
          <p>with listare your have both</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src="/bar-graph-statistics-analysis-business-concept.jpg" alt="image" style={styles} className='object-fit-cover w-100 '/>
        <Carousel.Caption className='h-50'>
          <p className='h2'>Organization and Efficiency</p>
          <p>Listare provides it to you and more!</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
