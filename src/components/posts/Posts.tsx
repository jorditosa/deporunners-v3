import { IonCard, IonCardSubtitle } from '@ionic/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import './posts.module.css';
import { Post } from '../../interfaces/posts.interface';
import { BookOpenText } from 'lucide-react';


interface Props {
  posts: Post[]
}

const Posts = ({ posts }: Props) => {
  console.log(posts)
  return (
    <>
      <Swiper
        slidesPerView={1}
        className="mySwiper"
        pagination={true}
        modules={[Pagination]}
      >
        {
          posts.map((post: Post) => (
            <SwiperSlide key={post.id}

            >
              <IonCard key={post.id} className='text-start cursor-grab bg-gradient-to-br from-secondary to-primary text-white mb-10 min-h-[72px] bg-light p-4' color='secondary'>
                <a
                  target='_blank'
                  href={post.link}
                >

                  <div className='flex justify-center items-center gap-2 text-white'>
                    <IonCardSubtitle className='w-10/12 text-white font-sans text-sm font-semibold line-clamp-2'>
                      {post.title.rendered}
                    </IonCardSubtitle>
                    <BookOpenText className='size-6' />
                  </div>
                </a>
              </IonCard>
            </SwiperSlide>
          ))
        }
      </Swiper>
    </>
  );
}

export default Posts;
