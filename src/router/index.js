import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '@/views/Auth/Home.vue';
import Register from '@/views/Auth/Register.vue';
import ForgetPassword from '@/views/Auth/ForgetPassword.vue';
import NewPassword from '@/views/Auth/NewPassword.vue';
import SuccessConfirm from '@/views/Auth/SuccessConfirmEmail.vue';
import Users from '@/views/Users/Users.vue';
import User from '@/views/Users/User/User.vue';
import AllProducts from '../views/AllProducts.vue';
import AllSuppliers from '../views/AllSuppliers.vue';
import Color from '../views/Color.vue';
import ExportImport from '../views/ExportImport.vue';
import CategoriesForm from '../views/Categories/CategoryForm.vue';
import Categories from '../views/Categories/Categories.vue';
import ProductFeatures from '../views/ProductFeatures.vue';
import Test from '../views/Test.vue';
import Main from '../views/Main.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      layout: 'default',
      title: () => 'Palermo Админ',
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      layout: 'default',
      title: () => 'Palermo регистриция',
    },
  },
  {
    path: '/forget-password',
    name: 'ForgetPassword',
    component: ForgetPassword,
    meta: {
      layout: 'default',
      title: () => 'Забыл пароль Palermo',
    },
  },
  {
    path: '/new-password',
    name: 'NewPassword',
    component: NewPassword,
    meta: {
      layout: 'default',
      title: () => 'Новый пароль',
    },
  },
  {
    path: '/success-confirm',
    name: 'SuccessConfirm',
    component: SuccessConfirm,
    meta: {
      layout: 'default',
      title: () => 'Успешно',
    },
  },
  {
    path: '/catalog',
    name: 'ProductCategories',
    component: Categories,
    meta: {
      layout: 'default',
      title: () => 'Категории товаров',
    },
  },
  {
    path: '/catalog/add',
    name: 'AddProductCategories',
    component: CategoriesForm,
    meta: {
      layout: 'default',
      title: () => 'Добавить категорию',
    },
  },
  {
    path: '/catalog/edit',
    name: 'edit--category',
    component: CategoriesForm,
    meta: {
      layout: 'default',
      title: () => 'Редактировать категорию',
    },
    props: true
  },
  {
    path: '/product-features',
    name: 'ProductFeatures',
    component: ProductFeatures,
    meta: {
      layout: 'default',
      title: () => 'Характеристики',
    },
  },
  {
    path: '/product-color',
    name: 'Color',
    component: Color,
    meta: {
      layout: 'default',
      title: () => 'Цвет',
    },
  },
  {
    path: '/shops',
    name: 'AllProducts',
    component: AllProducts,
    meta: {
      layout: 'default',
      title: () => 'Товары',
    },
  },
  {
    path: '/products-my',
    name: 'AllProducts',
    component: AllProducts,
    meta: {
      layout: 'default',
      title: () => 'Мои',
    },
  },
  {
    path: '/products-my/add',
    name: 'AllProducts',
    component: AllProducts,
    meta: {
      layout: 'default',
      title: () => '+',
    },
  },
  {
    path: '/operation-export',
    name: 'ExportImport',
    component: ExportImport,
    meta: {
      layout: 'default',
      title: () => 'Экспорт / Импорт',
    },
  },
  {
    path: '/operation-import',
    name: 'ExportImport',
    component: ExportImport,
    meta: {
      layout: 'default',
      title: () => 'Экспорт / Импорт',
    },
  },
  {
    path: '/suppliers',
    name: 'AllSuppliers',
    component: AllSuppliers,
    meta: {
      layout: 'default',
      title: () => 'Все поставщики',
    },
  },
  {
    path: '/suppliers/add',
    name: 'AllSuppliers',
    component: AllSuppliers,
    meta: {
      layout: 'default',
      title: () => '+',
    },
  },
  {
    path: '/suppliers-settings',
    name: 'AllSuppliers',
    component: AllSuppliers,
    meta: {
      layout: 'default',
      title: () => 'Настройки',
    },
  },
  {
    path: '/roles',
    name: 'AllSuppliers',
    component: AllSuppliers,
    meta: {
      layout: 'default',
      title: () => 'Роли',
    },
  },
  {
    path: '/roles/add',
    name: 'AllSuppliers',
    component: AllSuppliers,
    meta: {
      layout: 'default',
      title: () => 'Роли',
    },
  },
  {
    path: '/users',
    name: 'Users',
    component: Users,
    meta: {
      layout: 'default',
      title: () => 'Пользователи Админ',
    },
  },
  {
    path: '/user',
    name: 'User',
    component: User,
    meta: {
      layout: 'default',
      title: () => 'Пользователь',
    },
  },
  {
    path: '/users',
    name: 'Users',
    component: Users,
    meta: {
      layout: 'default',
      title: () => 'Пользователи',
    },
  },
  {
    path: '/roles-users/add',
    name: 'AllSuppliers',
    component: AllSuppliers,
    meta: {
      layout: 'default',
      title: () => 'Роль',
    },
  },
  {
    path: '/roles-root-area',
    name: 'AllSuppliers',
    component: AllSuppliers,
    meta: {
      layout: 'default',
      title: () => 'RootArea',
    },
  },
  {
    path: '/level-1',
    name: 'AllSuppliers',
    component: AllSuppliers,
    meta: {
      layout: 'default',
      title: () => 'Level 1 link',
    },
  },
  {
    path: '/test',
    name: 'Test',
    component: Test,
    meta: {
      layout: 'default',
      title: () => 'Test',
    },
  },
  {
    path: '/main',
    name: 'Main',
    component: Main,
    meta: {
      layout: 'default',
      title: () => '',
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.afterEach((to) => {
  Vue.nextTick(() => {
    document.title = to.meta.title(to);
  });
});

export default router;
