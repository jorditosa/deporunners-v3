import { IonCard, IonCardHeader, IonCardSubtitle } from '@ionic/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import './posts.module.css';
import { Post } from '../../interfaces/posts.interface';
import { SquareArrowOutUpRight } from 'lucide-react';


interface Props {
  posts: Post[]
}

const Posts = ({ posts }: Props) => {

  return (
    <>
      <Swiper
        slidesPerView={1}
        className="mySwiper"
        pagination={true}
        modules={[Pagination]}
      >

        <>
          {
            posts.map((post: Post) => (
              <SwiperSlide key={post.id}

              >
                <IonCard key={post.id} className='text-start cursor-grab text-whitew mb-8 h-[60px] bg-secondary mx-1' color='light'>
                  <IonCardHeader className='p-4'>
                    <a
                      target='_blank'
                      href={post.link}
                    >

                      <div className='flex justify-center items-center gap-2 text-white'>
                        <IonCardSubtitle className='w-10/12 text-white font-sans text-base truncate'>"{post.title.rendered}"</IonCardSubtitle>
                        <SquareArrowOutUpRight className='size-6 w-2/12' />
                      </div>
                    </a>
                  </IonCardHeader>
                </IonCard>
              </SwiperSlide>
            ))
          }
        </>
      </Swiper>
    </>
  );
}

export default Posts;
