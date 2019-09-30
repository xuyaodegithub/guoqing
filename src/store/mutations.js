const mutations={
      SET_LOGIN(state,data){
        state.editor.loginMM.code=data.code
      },
      GET_LOGIN(state,res){
        state,page.loginResult=res.data.obj
      }
}

export default mutations
