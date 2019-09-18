$(document).ready(function(){

  
 
         $.ajax({
                 type: "GET",
                 url: "http://localhost:3000/employees",
                 dataType: 'json',     
 
                 }).done(function(data){

                        $.map(data, (element, index)=>{

                             if(element["payment-status"] == false){
                                $(".row").append("<div id = \"Peter Davos\" class = \"article\"> " +           
                             "<div class = \"img-div\"><img class=\"img-wrapper\" src=\"../images/man.jpg\" alt=\"\" /></div>" +
                             "<h1 class = \"abs-h\">"+element.name+"</h1>" +
                             "<span class = \"divider\"></span>" +
                            "<p class = \"p-jd\">"+element["job-description"]+"</p> "+
                             "<div class = \"p-lev\"><p> <span class = \"span-a\">Level:</span>"+element.level+"</p></div> "+
                             "<div class = \"p-sal\"><p> <span class = \"span-a\">Salary:</span>"+element.salary+"</p></div> "+
                             "<div class = \"p-sts\"><p> <span class = \"span-a\">Payment Status:</span> <span class = \"pending\">Pending</span> </p></div>"+
                             "<button class=\"edit-btn\"><i class=\"fa fa-folder\"></i></button>"
                             );
                             }
                             if(element["payment-status"] == true){
                                $(".row").append("<div id = \"Peter Davos\" class = \"article\"> " +           
                             "<div class = \"img-div\"><img class=\"img-wrapper\" src=\"../images/man.jpg\" alt=\"\" /></div>" +
                             "<h1 class = \"abs-h\">"+element.name+"</h1>" +
                             "<span class = \"divider\"></span>" +
                            "<p class = \"p-jd\">"+element["job-description"]+"</p> "+
                             "<div class = \"p-lev\"><p> <span class = \"span-a\">Level:</span>"+element.level+"</p></div> "+
                             "<div class = \"p-sal\"><p> <span class = \"span-a\">Salary:</span>"+element.salary+"</p></div> "+
                             "<div class = \"p-sts\"><p> <span class = \"span-a\">Payment Status:</span> <span class = \"succ\">Successful</span> </p></div>"+
                             "<button class=\"edit-btn\"><i class=\"fa fa-folder\"></i></button>"
                             );
                            }
                         });
            });



            // control edit button click to open popup
        
        
});