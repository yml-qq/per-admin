import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "home"
  },
  {
    path: "/home",
    name: "Home",
    redirect: "/Worker",
    component: ()=> import("../views/Home/home"),
    children: [{
      path: "/Worker",
      name: "Worker",S
      component: ()=> import("../components/Worker")
    },{
      path: "/Send",
      name: "Send",
      component: ()=> import("../components/Send")
    },{
      path: "/AddOffer",
      name: "AddOffer",
      component: ()=> import("../components/AddOffer")
    }]
  }
];

const router = new VueRouter({
  routes
});

export default router;
