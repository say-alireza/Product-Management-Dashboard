import { Product } from '../hooks/useProducts';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'لپ تاپ MacBook Pro',
    description: 'لپ تاپ حرفه‌ای اپل با پردازنده M1',
    price: 45000000,
    stock: 10,
    images: ['/images/macbook-pro.jpg'],
    category: 'لپ تاپ'
  },
  {
    id: '2',
    name: 'گوشی iPhone 13',
    description: 'گوشی هوشمند اپل با دوربین دوگانه',
    price: 35000000,
    stock: 15,
    images: ['/images/iphone-13.jpg'],
    category: 'گوشی'
  },
  {
    id: '3',
    name: 'ایرپاد پرو',
    description: 'هدفون بی‌سیم اپل با حذف نویز فعال',
    price: 8500000,
    stock: 20,
    images: ['/images/airpods-pro.jpg'],
    category: 'لوازم جانبی'
  },
  {
    id: '4',
    name: 'اپل واچ سری 7',
    description: 'ساعت هوشمند اپل با نمایشگر همیشه روشن',
    price: 12000000,
    stock: 8,
    images: ['/images/apple-watch.jpg'],
    category: 'ساعت هوشمند'
  },
  {
    id: '5',
    name: 'آیپد پرو',
    description: 'تبلت حرفه‌ای اپل با قلم اپل پنسل',
    price: 28000000,
    stock: 12,
    images: ['/images/ipad-pro.jpg'],
    category: 'تبلت'
  }
]; 