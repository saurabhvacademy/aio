        
    $(document).ready(function(){
        $(window).scroll(function(){
            var window_top = $(window).scrollTop(); 
            var div_top = $('#leftmenudiv').offset().top;
                if (window_top > div_top) {                
                    var x = $("#leftmenudiv").parent().width();
                    
                    $('#leftmenudiv').addClass('fixedleftmenu');
                    $('#leftmenudiv').addClass('fixedleftmenu');
                
                } else if (window_top === 0){
                    $('#leftmenudiv').removeClass('fixedleftmenu');
                }
        });
		
    });

