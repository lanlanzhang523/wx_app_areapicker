Page({
  data:{
    intro: [],
    show:false
  },
  onLoad:function(options){
    
  },
  open(){
  	this.setData({
  		show:true
  	})
  },
  confirm(data){
  	console.log(data)
    this.setData({
      address:data.detail.viewArea
    })
  }
})