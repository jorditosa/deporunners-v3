import { IonCard, IonCardHeader, IonCardSubtitle, IonIcon, IonRow } from '@ionic/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import './posts.module.css';
import { newspaper } from 'ionicons/icons';
import { Post } from '../../interfaces/posts.interface';


interface Props {
  posts: Post[]
  isLoading: boolean
}

const Posts = ({ posts, isLoading }: Props) => {

  return (
    <>
      <Swiper
        slidesPerView={1.2}
        className="mySwiper pb-5"
        pagination={true}
        modules={[Pagination]}
      >
        {
          isLoading
            ? <IonRow className="flex justify-center py-2">
              <span>Carregant...</span>
            </IonRow>
            : (
              <>
                {
                  posts.map((post: Post) => (
                    <SwiperSlide key={post.id}

                    >
                      <IonCard key={post.id} className='shadow-md shadow-primary text-start cursor-grab text-whitew mb-8 rounded-2xl h-[140px]' color='light'>
                        {/* <img src={post.image.url} alt="event picture" className='w-full h-60 object-cover bg-white' /> */}
                        {/* <IonCardTitle color='light' className='flex justify-center text-white text-xl font-semibold pt-4'>{post.date}</IonCardTitle> */}
                        <IonCardHeader className='p-4'>
                          <a
                            target='_blank'
                            className='text-xs'
                            href={post.link}
                          >

                            <div className='flex flex-col justify-center items-start'>
                              <IonIcon
                                src={newspaper}
                                color='primary'
                                size='large'
                              />
                              <IonCardSubtitle className='text-white mt-2 font-sans'>"{post.title.rendered}"</IonCardSubtitle>
                            </div>
                          </a>
                        </IonCardHeader>
                      </IonCard>
                    </SwiperSlide>
                  ))
                }
              </>
            )
        }
      </Swiper>
    </>
  );
}

export default Posts;
