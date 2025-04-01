import { createWebHistory, createRouter } from "vue-router";
import Accueil from "@/components/Page/Accueil.vue"
import PageJeux from "@/components/Page/PageJeux.vue"
import PageVictoire from "@/components/Page/PageVictoire.vue";
import PageAbandon from "@/components/Page/PageAbandon.vue";
import PageFinTemps from "@/components/Page/PageFinTemps.vue";
import PageDefaite from "@/components/Page/PageDefaite.vue";
import PageHistorique from "@/components/Page/PageHistorique.vue";


const routes = [
    {
        path: "/",
        name: "Accueil",
        component: Accueil,
    },
    {
        path: "/PageJeux",
        name: "PageJeux",
        component: PageJeux,
    },
    {
        path: "/PageVictoire",
        name: "Victoire",
        component: PageVictoire,
    },
    {
        path: "/PageAbandon",
        name: "PageAbandon",
        component: PageAbandon,
    },
    {
        path: "/PageFinTemps",
        name: "PageFinTemps",
        component: PageFinTemps,
    },
    {
        path: "/PageDefaite",
        name: "Defaite",
        component: PageDefaite,
    },
    {
        path: "/PageHistorique",
        name: "PageHistorique",
        component: PageHistorique,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
