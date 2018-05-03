import Vue from 'vue'
import Router from 'vue-router'
/*import HomePage from '@/components/HomePage'
import Materialview from '@/components/Materialview'*/

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/HomePage',
      name: 'HomePage',
      component: resolve=> {
    	require(['@/components/HomePage'], resolve)
 	 }
    },{
    	path:'/Materialview',
    	name:'Materialview',
    	component:resolve=> {
    	require(['@/components/Materialview'], resolve)
 	 }
    },{
    	path:'/Guidance',
    	name:'Guidance',
    	component:resolve=> {
    	require(['@/components/Guidance'], resolve)
 	 }
    },{
      path:'/GuidanceHome',
      name:'GuidanceHome',
      component:resolve=> {
      require(['@/components/GuidanceHome'], resolve)
   }
    },{
      path:'/Selectionofclaimtypes',
      name:'Selectionofclaimtypes',
      component:resolve=> {
      require(['@/components/Selectionofclaimtypes'], resolve)
   }
    },{
      path:'/Submitareport',
      name:'Submitareport',
      component:resolve=> {
      require(['@/components/Submitareport'], resolve)
   }
    },{
      path:'/CertificatesUpload',
      name:'CertificatesUpload',
      component:resolve=> {
      require(['@/components/CertificatesUpload'], resolve)
   }
    },{
      path:'/bankPage',
      name:'bankPage',
      component:resolve=> {
      require(['@/components/bankPage'], resolve)
   }
    },{
    	path:"/",
    	redirect:"/HomePage"
    }
  ]
})
