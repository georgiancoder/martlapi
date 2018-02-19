$.ajax({url: "http://martlapi.testme.ge/api/v1/marxvebi", success: function(result){
            var html = '';
            for(i in result){
                html += '<a href="marxvain.html?id='+result[i].id+'" class="buttons">'+result[i].title+'</a>'
            }
            $("#marxvebi").html(html);
            
          },
          error: function(err){
            $("#error").html(JSON.stringify(err));
          }
});