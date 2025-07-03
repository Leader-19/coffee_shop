
import FormCreateProduct from "@/components/FormCreateProduct.vue";
import DashboardPage from "@/views/DashboardPage.vue";
import PaymentPage from "@/views/PaymentPage.vue";
import ProductPage from "@/views/ProductPage.vue";
import ReportPage from "@/views/ReportPage.vue";
import SettingPage from "@/views/SettingPage.vue";
import UserManagement from "@/views/UserManagement.vue";

import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path : '/products',
        component : ProductPage,
        name : 'ProductPage'
    },
    {
        path : '/',
        component : DashboardPage,
        name : 'DashboardPage'
    },
    {
        path : '/users',
        component : UserManagement,
        name : 'UserManagement'
    },

    {
        path : '/create_product',
        component : FormCreateProduct,
        name : 'FormCreateProduct'
    },
    {
        path :'/reports',
        component : ReportPage,
        name : 'ReportPage'
    },

    {
        path :'/payments',
        component : PaymentPage,
        name : 'PaymentPage'
    },

    {
        path :'/settings',
        component : SettingPage,
        name : 'SettingPage'
    },

]

const router = createRouter({
    history : createWebHistory(),
    routes
})

export default router;