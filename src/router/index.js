import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/singleCard:id",
      name: "singleCard",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/singleCardView.vue"),
    },
    {
      path: "/AddBlog",
      name: "addBlog",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/addBlogView.vue"),
      meta: { auth: true },
    },
    {
      path: "/restricted",
      name: "restricted",
      component: () => import("../views/RestrictedView.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.auth) {
    const userToken = localStorage.getItem("authToken");

    if (userToken) {
      // Call next as a function to proceed with the navigation
      next();
    } else {
      // Redirect to the restricted page if not logged in
      next({ name: "restricted" });
    }
  } else {
    // Proceed to the route if it does not require authentication
    next();
  }
});

export default router;
