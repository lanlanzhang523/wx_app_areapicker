var areaTool = require('../../utils/area.js');
var index = [10,0,5]
var provinces = areaTool.getProvinces();
var citys = areaTool.getCitys(index[0]);
var areas = areaTool.getAreas(index[0],index[1]);
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    areatype:{
      type:String,
      value:"地区"
    },
    show:{//显示组件
      type:Boolean,
      value:false
    },
    aniType:{//动画类型
      type:Boolean,
      value:true
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
     province: '浙江省',
     city: '杭州市',
     area: '拱墅区',
     provinces: provinces,
     citys: areaTool.getCitys(index[0]),
     areas: areaTool.getAreas(index[0], index[1]),
  },

  /**
   * 组件的方法列表
   */
  methods: {
  //地区
    handleNYZAreaChange:function(e){
    var that = this;
    console.log("e:" + JSON.stringify(e));
    var value = e.detail.value;
    /**
     * 滚动的是省
     * 省改变 市、区都不变
     */
    if(index[0] != value[0]){
      index = [value[0],0,0]
      let selectCitys = areaTool.getCitys(index[0]);
      let selectAreas = areaTool.getAreas(index[0], 0);
      that.setData({
        citys: selectCitys,
        areas: selectAreas,
        value: [index[0],0,0],
        province: provinces[index[0]],
        city: selectCitys[0],
        area: selectAreas[0]
      })
    } else if (index[1] != value[1]){
      /**
       * 市改变了 省不变 区变
       */
      index = [value[0], value[1], 0]
      let selectCitys = areaTool.getCitys(index[0]);
      let selectAreas = areaTool.getAreas(index[0], value[1]);
      that.setData({
        citys: selectCitys,
        areas: selectAreas,
        value: [index[0], index[1], 0],
        province: provinces[index[0]],
        city: selectCitys[index[1]],
        area: selectAreas[0]
      })
    } else if (index[2] != value[2]){
      /**
       * 区改变了
       */
      index = [value[0], value[1], value[2]]
      let selectCitys = areaTool.getCitys(index[0]);
      let selectAreas = areaTool.getAreas(index[0], value[1]);
      that.setData({
        citys: selectCitys,
        areas: selectAreas,
        value: [index[0], index[1], index[2]],
        province: provinces[index[0]],
        city: selectCitys[index[1]],
        area: selectAreas[index[2]]
      })
    }
  },
   // 取消地区选择
   cancel(){
       var that=this;
       var index = [10,0,0]
       var provinces = areaTool.getProvinces();
       var citys = areaTool.getCitys(index[0]);
       var areas = areaTool.getAreas(index[0],index[1]);
       that.setData({aniType:false})
       setTimeout(function(){
         that.setData({show:false,provinces:provinces,citys:citys,areas:areas,province: '浙江省',city: '杭州市',area: '拱墅区'})
      },300)
   },
   //确定选择
   confirm(){
        var that=this;
        var index = [10,0,0]
        var provinces = areaTool.getProvinces();
        var citys = areaTool.getCitys(index[0]);
        var areas = areaTool.getAreas(index[0],index[1]);
        that.setData({aniType:false})
        setTimeout(function(){
            that.setData({show:false,provinces:provinces,citys:citys,areas:areas,province: '浙江省',city: '杭州市',area: '拱墅区'})
        },300)
        var viewArea=this.data.province+" "+this.data.city+" "+this.data.area
        var submitArea=this.data.province+","+this.data.city+","+this.data.area
        var data={
          viewArea:viewArea
        }
        this.triggerEvent("confirm",data);
   }
  }
})
