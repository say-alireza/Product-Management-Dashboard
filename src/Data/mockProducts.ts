import { Product } from '../Types/Product';

// Use public placeholder image
const placeholderImage = '/placeholder.svg';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'گوشی موبایل سامسونگ گلکسی S21',
    description: 'حافظه 128 گیگابایت - رم 8 گیگابایت',
    price: 15990000,
    stock: 15,
    images: [
      'https://dkstatics-public.digikala.com/digikala-products/8b14c33f8d7e8479e5c5be5f6c4ffc2f20a8385f_1654514999.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90',
      'https://dkstatics-public.digikala.com/digikala-products/ec9a962187e1f82cc47e7a148ef99ec1c6fd024d_1654515002.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90'
    ],
    rating: 4.7,
    category: 'موبایل'
  },
  {
    id: '2',
    name: 'هدفون بی سیم سونی WH-1000XM4',
    description: 'فناوری حذف نویز - باتری 30 ساعته',
    price: 8990000,
    stock: 8,
    images: [
      'https://dkstatics-public.digikala.com/digikala-products/787fc23c0428eac174dd3469543c0eaa7f690302_1674304690.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90',
      'https://dkstatics-public.digikala.com/digikala-products/113552293.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90'
    ],
    rating: 4.8,
    category: 'هدفون'
  },
  {
    id: '3',
    name: 'لپ تاپ اپل مک بوک پرو 13 اینچ',
    description: 'پردازنده M1 - حافظه 256 گیگابایت',
    price: 42990000,
    stock: 5,
    images: [
      'https://dkstatics-public.digikala.com/digikala-products/9f5d8f6583a7289a096a9180ac88708856f4bd8f_1653821991.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90',
      'https://dkstatics-public.digikala.com/digikala-products/90fc87b40eb1249673b9d0089aca514443a04edf_1653821994.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90'
    ],
    rating: 4.9,
    category: 'لپ تاپ'
  },
  {
    id: '4',
    name: 'اسمارت واچ اپل سری 7',
    description: 'صفحه نمایش همیشه روشن - مقاوم در برابر آب',
    price: 14990000,
    stock: 12,
    images: [
      'https://dkstatics-public.digikala.com/digikala-products/a5e4f820f56be7881e5a965b5a7ad34f6b6dbd7f_1656426240.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90',
      'https://dkstatics-public.digikala.com/digikala-products/617341e0139acff12d51655af2e451b5a90d39a7_1656426244.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90'
    ],
    rating: 4.6,
    category: 'ساعت هوشمند'
  }
];

//search compatible
export const mockProductsQuery = (params: { search?: string }) => {
  return mockProducts.filter(product => 
    !params.search || 
    product.name.includes(params.search) || 
    product.description.includes(params.search) ||
    product.category.includes(params.search)
  );
};