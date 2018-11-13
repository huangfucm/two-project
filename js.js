/**
 * Created by Administrator on 2018/9/5.
 */



var goods=[];
$(function(){
    //我的购物车下面的div显示或隐藏
    $(".header_right a:eq(0)").hover(
        function(){
        $(".hr_hide").show(300);
        },function(){
        $(".hr_hide").hide(300);
    })


//二级三级菜单显示或隐藏
    $(".nav_ul li").hover(
        function(){
            if(this.children[1]){
                $(this.children[1]).fadeIn();
            }
    },
    function(){
        if(this.children[1]){
            $(this.children[1]).fadeOut();
        }
    })
//购物车页面伸缩

    $(".shop_list_item p").hover(function(){
        $(this).css("backgroundColor","#cc0000");
        $(this.children[0]).show();
        $(this).animate({
            width:"130px",
            left:"-130px"
        },1000,function(){
            $(this).siblings().stop();
        });

    },function(){

        $(this).css("backgroundColor","#979797");
        $(this).animate({
            width:"50px",
            left:"-50px"
        },function(){

            $(this).siblings().stop();
            $(this.children[0]).hide();
        });
    },1000)


    //点击购物车显示购物车信息
    var bool=false;
    $(".shop_list_item p:eq(2)").click(function(){

        var shopCar=bool?{right:"-300px"}:{right:"0px"};
        bool=!bool;
        $(".shop").animate(shopCar,500)

    })

//小球飞出
    $(".list_bottom .btn3").click(function (e) {

      var qiu=$(`<div class="qiu"></div>`).appendTo($(this)).css({
          top:e.clientY,
          left:e.clientX
      });
        // var qiu="<div class='qiu'></div>"
        $(this).append(qiu);


        //获取购物车的位置
      var shopCar=$(".shop_list .shop_list_item:eq(2)");

      $(".qiu").animate({
          top:shopCar.offset().top,
          left:shopCar.offset().left
      },1000,function () {
          $(this).remove();
      })
        })



//添加购物车
    var counts=1;
$(".content_list .list_bottom").find("button:eq(2)").click(function(){

//通过点击事件 取到所点击的商品的信息
    var imgS=$(this).parents(".content_list").find("img").attr("src");
    var shopHtml=$(this).parents(".list_bottom").find("a:eq(0)").text();
    var shopMoeny=$(this).parents(".list_bottom").find("span").text();
    var numGoods=$(".shop_list_item .numGoods b").text();
//定义一个对象 将取到的值存储到对象里面
    var pro={"img":imgS,"name":shopHtml,"price":shopMoeny,"counts":counts};
    var bool=true;
    //通过循环判断 每次取到的是不是同一件商品
    for(var i=0;i<goods.length;i++){
        //是一件商品的话商品数量加1
        if(goods[i].img==imgS){
           bool=false;
            goods[i].counts++;
        }
    }
    //不是同一件商品  也就是购物车没有此商品的话   将商品信息插入到数组里面
    if(bool==true){
        goods.push(pro);
    }
    var newHtml="";
    var  goodsMoney=0;
    var goodsNum=0;

//遍历数组
for(var i= 0;i<goods.length;i++){
    newHtml+=`<div class="goods_list">
        <div class="center_left fl">
        <img src="${goods[i].img}" alt="鼠标" width=60 height=60>
        </div>
        <div class="center_right fl">
        <p>${goods[i].name}</p>
        <p class="center_list_p2">￥<span>${goods[i].price}</span>×<i>${goods[i].counts}</i><a href="#" onclick=del($(this))>删除</a></p>
    </div>
    <div class="clearf"></div>
        </div>`;
    //通过循环遍历 算出金额
    goodsMoney+= parseFloat(goods[i].price)* parseInt(goods[i].counts);
    //商品总数量
    goodsNum+=goods[i].counts;
}

    //1.将遍历出来的数组插入页面
    //$(".shop_center").html(newHtml);

    //2.将数组数据遍历出来 插入页面 通过append 需要先清空数组里面的数据
//先清空购物车里面的信息 方便后面遍历数组再次插入
    $(".goods_list").remove();
    $(".shop_center").append(newHtml)

    $(".shop_bottom_left").find("span:eq(0)").text(goodsNum);
    $(".shop_bottom_left").find("span:eq(1)").text(goodsMoney);

    //购物车里面商品总数量
    $(".shop_list_item .numGoods b").text(parseInt(numGoods)+1);
})

$(".shop_top button").click(function(){
    $(".shop").animate({
        right:"-300px"
    },500)
})
})
//点击删除  删除某个商品
 function  del(dele){
     console.log(goods);
     //通过查找当前对象的祖辈 找到对象下标
    var goodIndex=dele.parents(".goods_list").index();
     console.log(goodIndex);
     //通过下标获取对象的数量和单价
     var counts=goods[goodIndex].counts;
     var price=goods[goodIndex].price;
     //移除页面里面的当前对象
     dele.parents(".goods_list").remove();

     $(".shop_bottom_left").find("span:eq(1)").text(parseFloat($(".shop_bottom_left").find("span:eq(1)").text())-(counts*price));
     $(".shop_list_item .numGoods b").text(parseInt($(".shop_list_item .numGoods b").text())-counts);
     $(".shop_bottom_left").find("span:eq(0)").text(parseInt($(".shop_bottom_left").find("span:eq(0)").text())-counts);
//删除数组里面的指定下标的 对象
    goods.splice(goodIndex,1);
     console.log(goods);
     }



