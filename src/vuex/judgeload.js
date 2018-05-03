const judgeload={
	 state: {
    imgloaded:[]
  },
  mutations: {
    loadedSrc (state, payload) {
    	if(payload.isin=='increase'){
			state.imgloaded.push(payload);
    	}else{
    		for (var i = 0; i < state.imgloaded.length; i++) {
    				if(state.imgloaded[i].Id==payload.isin){
    						state.imgloaded.splice(i,1)
    				}
    		}
    	}
    }
  }
}

export default judgeload;