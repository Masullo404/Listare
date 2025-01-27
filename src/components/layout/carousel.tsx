"use client"
import Carousel from 'react-bootstrap/Carousel';

const styles = {
    filter:"brightness(0.4)"
}

export default function CustomCarousel() {
  return (
    <Carousel controls={true} indicators={false} >
      <Carousel.Item>
        <img src={"/close-up-still-life-hard-exams_23-2149314078.jpg"} alt="alt image" className='object-fit-cover w-100 h-25 flex-wrap ' style={styles}/>
        <Carousel.Caption className='h-50'>
          <p className='h2'>Listare</p>
          <p>Your new personal tasks management app</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src="/close-up-still-life-hard-exams_23-2149314078.jpg" className='object-fit-cover w-100 h-25' alt="image" style={styles}/>
        <Carousel.Caption className='h-50'>
          <p className='h2'>Work alone or with a team</p>
          <p>with listare your have both</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src="/close-up-still-life-hard-exams_23-2149314078.jpg" alt="image" style={styles} className='object-fit-cover w-100 h-25'/>
        <Carousel.Caption className='h-50'>
          <p className='h2'>Organization and Efficiency</p>
          <p>Listare provides it to you and more!</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
