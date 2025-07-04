import HomePage from "@/views/HomePage.vue";
import path from "path";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path : '/',
        component : HomePage,
        name : 'HomePage'
    }
]