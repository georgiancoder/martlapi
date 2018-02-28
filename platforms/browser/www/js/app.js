var marxvisDgeebi = [];
            var dgesaswaulebi = [];
            var marxvebi;
            var feasts;
            
            $.ajax({
                    url: 'http://martlapi.testme.ge/api/v1/calendar',
                    success: function(res){
                        marxvebi = res.markhva;
                        feasts = res.feasts;
                        getColors(res.colors);
                         marxvebi.forEach(function(marxva){
                            var dates = getDates(new Date(marxva.start_date), new Date(marxva.end_date), marxva);
                            marxvisDgeebi = marxvisDgeebi.concat(dates);
                        });
                         feasts.forEach(function(feast){
                                    var feastDay = new Date(feast.date);
                                    feast.day = feastDay;
                                    feast['color'] = feast.code;
                                        dgesaswaulebi.push(feast);
                                });
                         calendar();
                        console.log(res);
                    }
                });

            var getDates = function(startDate, endDate, obj) {
              var dates = [],
                  currentDate = startDate,
                  addDays = function(days) {
                    var date = new Date(this.valueOf());
                    date.setDate(date.getDate() + days);
                    return date;
                  };
              while (currentDate <= endDate) {
                var nobj = { day: currentDate, title: obj.title, color: obj.color_code};
                dates.push(nobj);
                currentDate = addDays.call(currentDate, 1);
              }
              return dates;
            };

        

function calendar(month){
    $( "#cal" ).datepicker({    
                monthNames: [ "იანვარი", "თებერვალი", "მარტი", "აპრილი", "მაისი", "ივნისი", "ივლისი", "აგვისტო", "სექტემბერი", "ოქტომბერი", "ნოემბერი", "დეკემბერი" ],
                dayNamesMin: [ "კვ","ორ", "სამ", "ოთხ", "ხუთ", "პარ", "შაბ" ],
                showOtherMonths: true,
                changeYear: false,
                beforeShowDay: function(d){
                    var clas = '';
                    var obj = JSON.stringify({day: d});
                    marxvisDgeebi.forEach(function(date){
                        if(d.getDate() == date.day.getDate() && d.getMonth() == date.day.getMonth()){
                            clas = 'marxva';
                            obj = JSON.stringify(date);
                        }
                    });
                    dgesaswaulebi.forEach(function(date){
                        if(d.getDate() == date.day.getDate() && d.getMonth() == date.day.getMonth()){
                            clas = 'marxva';
                            obj = JSON.stringify(date);
                        }
                    });
                    return [false,clas,obj];
                  },
                onChangeMonthYear: function(year, month, inst){
                    setTimeout(function(){
                        $("#cal .marxva").each(function(){
                var obj = JSON.parse($(this).attr('title'));
                $(this).find(".tooltip").remove();
                            $(this).find(".before").remove();
                $(this).find('.ui-state-default').css("background-color","#"+obj.color).append('<span class="before" style="border-top-color: #'+obj.color+'"></span>');
                $(this).append("<span class='tooltip' style='background-color: #"+obj.color+"'>"+obj.title+"</span>");
            });
                        $("#cal .marxva").on('touchstart',function(){
                       var tooltipWidth = $(this).find('.tooltip').innerWidth();
                        $(this).find('.tooltip').width($(window).innerWidth() - 100);
                        $(this).find('.tooltip').css('left',-$(this).offset().left + 40)
                    });
                    },10);
              }
            });
                                

            $("#cal").datepicker('option', 'firstDay', 1);
            if(month != undefined) 
            $( "#cal" ).datepicker("setDate",new Date($( "#cal" ).datepicker('getDate').getFullYear(),month,$( "#cal" ).datepicker('getDate').getDate()));
            $("#cal .marxva").each(function(){
                var obj = JSON.parse($(this).attr('title'));
                $(this).find('.ui-state-default').css("background-color","#"+obj.color).append('<span class="before" style="border-top-color: #'+obj.color+'"></span>');
                $(this).append("<span class='tooltip' style='background-color: #"+obj.color+"'>"+obj.title+"</span>");
            });
            $("#cal .marxva").on('touchstart',function(){
                       var tooltipWidth = $(this).find('.tooltip').innerWidth();
                        $(this).find('.tooltip').width($(window).innerWidth() - 100);
                        $(this).find('.tooltip').css('left',-$(this).offset().left + 40)
                    });

            var ham = new Hammer(document.getElementById('cal'), {
                domEvents: true
              } );
            ham.get('pinch').set({ enable: true });

            ham.on( "pinch", function( e ) {
                if(e.scale < 1){
                    $("#afterclickoncalendar").addClass('showall');
                    $( "#cal" ).datepicker( "option", "numberOfMonths", 12 );
                    $("#cal .marxva").each(function(){
                        var obj = JSON.parse($(this).attr('title'));
                        $(this).find('.ui-state-default').css("background-color","#"+obj.color).append('<span class="before" style="border-top-color: #'+obj.color+'"></span>');
                        $(this).append("<span class='tooltip' style='background-color: #"+obj.color+"'>"+obj.title+"</span>");
                    });

                    setTimeout(function(){
                    $(".ui-datepicker-inline > div").on('click', function(){
                        var month = new Date(JSON.parse($(this).find('td:not(".ui-datepicker-other-month")').eq(0).attr('title')).day).getMonth();
                        $( "#cal" ).datepicker( "option", "numberOfMonths", 1 );
                        $( "#cal" ).datepicker("setDate",new Date($( "#cal" ).datepicker('getDate').getFullYear(),month,$( "#cal" ).datepicker('getDate').getDate()));
                        $("#cal .marxva").each(function(){
                            var obj = JSON.parse($(this).attr('title'));
                            $(this).find('.ui-state-default').css("background-color","#"+obj.color).append('<span class="before" style="border-top-color: #'+obj.color+'"></span>');
                            $(this).append("<span class='tooltip' style='background-color: #"+obj.color+"'>"+obj.title+"</span>");
                        });
                        $("#afterclickoncalendar").removeClass('showall');
                    });
                },200);
                }
              } );

            ham.on( "pinchend", function( e ) {
            } );
}



          $("#calendar").on('touchstart',function(){
                $("body").toggleClass('calendar');
                if($("body").hasClass('calendar')){
                    $(".header").addClass('calendar');
                    $(".header #calendar img").attr('src','images/calendarred.png');
                }
                else{
                    $(".header").removeClass('calendar');
                    $(".header #calendar img").attr('src','images/calendar.png');
                }
            });

          function getCalendarByColor(){
                $("#colors li").click(function(){
                    var month = 0;
                    var marxvaStart = $(this).data('marxvastart').length > 0 ? parseInt($(this).data('marxvastart').split('-')[1]) : false;
                    // var marxvaEnd = $(this).data('marxvaend').length > 0 ? parseInt($(this).data('marxvaend').split('-')[1]) : false;
                    var feast = $(this).data('feast').length > 0 ? parseInt($(this).data('feast').split('-')[1]) : false;

                    if(feast){
                        month = feast - 1;
                        calendar(month);
                        console.log(month);
                    }else if(marxvaStart){
                        month = marxvaStart - 1;
                        calendar(month);
                        console.log(month);
                    }
                });
            }

            function getColors(colors){
                var html = '<ul id="colors">';
                colors.forEach(function(color){
                    html+='<li data-marxvastart="'+color.markhva_start+'" data-marxvaend="'+color.markhva_end+'" data-feast="'+color.feast+'"><div class="color" style="background-color: #'+color.code+'"></div> <h4>'+ color.title +'</h4></li>';
                });

                html+='</ul>';
                $("#color").html(html);
                getCalendarByColor();
            }