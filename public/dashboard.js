$(document).ready(function(){

    let tempDelId = 0;
    // WHEN PAGE IS LOADED
    var login = localStorage.getItem("devfactorylogin");
            if(login == null){
                alert("Please login");
                window.location = 'index.html';
            }

    loadDashboard();
 
//EDIT EMPLOYEE FORM
$("body").on("click", ".edit-btn", function(){
        let clickedId = ($(this).attr("id"));
         //when an edit button is clicled .... find its info
            $.ajax({
                type: "GET",
                url: "http://localhost:3000/employees",
                dataType: 'json',     

                }).done(function(data){

                    //filter the data to find the one that matches our clicked button's id
                    let userData = data.filter((element, index)=>{
                            
                    return element.name == clickedId;
                            
                });
                        ////get the modal form and populate it
                        $("#form-head").text(userData[0].name);
                        $("#edit-username").val(userData[0].name);
                        $("#edit-job-description").val(userData[0]["job-description"]);
                        $("#edit-level").val(userData[0].level);
                        $("#edit-salary").val(userData[0].salary);
                        $("#userId").text(userData[0].id);
                        });

});


    //>>>GET UPDATE BUTTON TO SUMBIT EDIT FORM DATA
     $("#update-btn").click(function(){

            //first get changed data from edit form
            let newUser = $("#edit-username").val();
            let newJob = $("#edit-job-description").val();
            let newLevel = $("#edit-level").val();
            let newSalary = $("#edit-salary").val();
            let userId = $("#userId").text();
            console.log("userid: " + userId);

            //create variable for patching
            let patchData = {"name": newUser,
            "job-description": newJob,
            "level": newLevel,
            "salary": newSalary}

            //simplify url
            userId = "http://localhost:3000/employees/" + userId;

            //patch
            $.ajax({

                type: "PATCH",
                url: userId,
                data: JSON.stringify(patchData),
                dataType: "json",
                processData: false,
                contentType: "application/json",
                success: function(data) {
                 
                        setTimeout(function(){// wait for .7 
                             window.location.reload(); // then reload the page
                        }, 700); 
                },
                error : function(){
                    alert("There Was an Error");
                }   

            });
           
     });

    //SET TEMP DEL ID WHEN USER PRESSES DEL BUTTON
     $("body").on("click", ".del-btn", function(){
            tempDelId = ($(this).attr("id"));
     })
    // >>>>GET DELETE BUTTON TO DELETE USER
    $("#modal-del-btn").click(function(){
            let url  = "http://localhost:3000/employees/" + tempDelId;

            $.ajax({
                url: url,
                type: 'DELETE',
                success: function(result) {
                    setTimeout(function(){// wait for .2 
                    window.location.reload(); // then reload the page
                        }, 200); 
                }
            });
            
     })
       


// PAY ALL EMPLOYEES
$("#pay-btn").click(function(){

        //get length of employees
        
         $.ajax({
            type: "GET",
            url: "http://localhost:3000/employees",
            dataType: 'json',     
    
            }).done(function(data){
                    //loop through all data and pay them
                    let patchData = {"payment-status": 1}
                    $.map(data, (element, index)=>{
                    let url = "http://localhost:3000/employees/" + element.id;

                        $.ajax({

                            type: "PATCH",
                            url: url,
                            data: JSON.stringify(patchData),
                            dataType: "json",
                            processData: false,
                            contentType: "application/json",
                            error: function(result) {
                                    alert("Oops! Something must have happened.... This is rather embarassing.");
                                    setTimeout(function(){// wait for .2 
                                    window.location.reload(); // then reload the page
                               }, 200); 
                            } 
                        })
                        
                    });
            });
            alert("Payment was successful... You're a boss!");
                        setTimeout(function(){// wait for .2 secs 
                        window.location.reload(); // then reload the page
                       }, 200); 


        
});

     ///VALIDATE ADD USER FORM and add user
     $("form[name='adduser']").validate({
        // Specify validation rules
        rules: {
          // The key name on the left side is the name attribute
          // of an input field. Validation rules are defined
          // on the right side
          username: "required",
          password: {
            required: true,
            minlength: 5
          },
          jd: "required",
          level: "required",
          salary: {required: true, digits:true}

        },
        // Specify validation error messages
        messages: {
          username: "Please enter your firstname",
          password: {
            required: "Please provide a password",
            minlength: "Your password must be at least 5 characters long"
          },
          jd: "Please specify a Job- Description",
          level: "Please add a job level or qualification",
          salary: {required:"Please provide a salary range", digits:"Your input should consist of only digits(0-9)!"}
        },
        submitHandler: function (form, event) {
            console.log("Submitted!");
            event.preventDefault();
       
            // CREATE NEW EMPLOYEES

        //    Store input as variables first
            let username = $("#add-username").val();
            let pw = $("#add-password").val();
            let jd = $("#add-jd").val();
            let level = $("#add-level").val();
            let salary = $("#add-salary").val();
            let photo = $("#add-photo").val();
            
            postdata = {
                "name": username,
                "password": pw,
                "job-description": jd,
                "level": level,
                "salary": salary,
                "payment-status": 1,
                "photo": "../images/man.jpg"
             
            }
            //send to server
            $.ajax({
                type: "POST",
                url: "http://localhost:3000/employees",
                data: postdata,
                success: function(status){
                        setTimeout(function(){// wait for .2 secs 
                        window.location.reload(); // then reload the page
                   }, 200)},
                dataType: "json",
              });
           
                
             
    
       
      } 

    })
      

// LOGOUT BUTTON
$("#modal-del-btn2").click(function(){
     
   
    setTimeout(function(){// wait for .7 
        localStorage.removeItem("devfactorylogin");
        window.location = 'index.html'
   },1700); ;
    
})


// SEARCH CONTENT
$("#search-form").on("keyup", function() {
    let foo =  $("#search-form-input").val();
    console.log(foo);
    //loop through rows children to hide or delete
    let dat = $(".row").children("div");
    //.find( "p" );
        // if(!$(this).html().is(":contains('"+foo+"')")){
        //     // $(this).hide();
        //     console.log($(this));
        // } 
        // console.log($(this));
    $.each(dat, function(index, value){
        if($(value).text().toLowerCase().indexOf(foo) == -1){
                $(dat[index]).hide();
        }   
        // console.log($(value).text().toLowerCase().indexOf(foo));
        else{
            $(dat[index]).show();
    }
    });

        
    
    
});


// DOCREADY END
});




//////make loading dashboard content a function
function loadDashboard(){
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/employees",
        dataType: 'json',     

        }).done(function(data){

               $.map(data, (element, index)=>{

                    if(element["payment-status"] == false){
                       $(".row").prepend("<div id = \"" +element.id+ "\" class = \"article\"> " +           
                    "<div class = \"img-div\"><img class=\"img-wrapper\" src=\"../images/man.jpg\" alt=\"\" /></div>" +
                    "<h1 class = \"abs-h\">"+element.name+"</h1>" +
                    "<span class = \"divider\"></span>" +
                   "<p class = \"p-jd\">"+element["job-description"]+"</p> "+
                    "<div class = \"p-lev\"><p> <span class = \"span-a\">Level:</span>"+element.level+"</p></div> "+
                    "<div class = \"p-sal\"><p> <span class = \"span-a\">Salary:</span>"+element.salary+"</p></div> "+
                    "<div class = \"p-sts\"><p> <span class = \"span-a\">Payment Status:</span> <span class = \"pending\">Pending</span> </p></div>"+
                    "<button class=\"edit-btn\" id=\"" +element.name+ "\" data-toggle=\"modal\" data-target=\"#modalLoginAvatar\">edit <i class=\"fas fa-edit\"></i></button>"+
                    "<button id = \"" +element.id+ "\"class=\"del-btn\" data-toggle=\"modal\" data-target=\"#centralModalDanger\">delete    <i class=\"fa fa-trash\"></i></button>"
                    ); 
                    }
                    if(element["payment-status"] == true){
                       $(".row").prepend("<div id = \"" +element.id+ "\" class = \"article\"> " +           
                    "<div class = \"img-div\"><img class=\"img-wrapper\" src=\"../images/man.jpg\" alt=\"\" /></div>" +
                    "<h1 class = \"abs-h\">"+element.name+"</h1>" +
                    "<span class = \"divider\"></span>" +
                   "<p class = \"p-jd\">"+element["job-description"]+"</p> "+
                    "<div class = \"p-lev\"><p> <span class = \"span-a\">Level:</span>"+element.level+"</p></div> "+
                    "<div class = \"p-sal\"><p> <span class = \"span-a\">Salary:</span>"+element.salary+"</p></div> "+
                    "<div class = \"p-sts\"><p> <span class = \"span-a\">Payment Status:</span> <span class = \"succ\">Successful</span> </p></div>"+
                    "<button class=\"edit-btn\" id=\"" +element.name+ "\" data-toggle=\"modal\" data-target=\"#modalLoginAvatar\">edit <i class=\"fas fa-edit\"></i></button>"+
                    "<button id = \"" +element.id+ "\"class=\"del-btn\" data-toggle=\"modal\" data-target=\"#centralModalDanger\">delete    <i class=\"fa fa-trash\"></i></button>"
                    );
                   }
                });
   });
}