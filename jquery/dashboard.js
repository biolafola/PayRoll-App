$(document).ready(function(){
    let tempDelId = 0;
    // WHEN PAGE IS LOADED
    loadDashboard();
 
        



            // // control edit button click to open popup
            // $(".edit-btn").click(function(){
            //     alert("i was clicked");
            //     console.log("clicked");

            // });

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
                        console.log(userData[0]);   ///[0] to return an object not an array of 1 object
                        

                        ////get the modal form and populate it
                        $("#form-head").text(userData[0].name);
                        $("#edit-username").val(userData[0].name);
                        $("#edit-job-description").val(userData[0]["job-description"]);
                        $("#edit-level").val(userData[0].level);
                        $("#edit-salary").val(userData[0].salary);
                        $("#userId").text(userData[0].id);
                        });

             });


        //>>>GET UPDATE BUTTON TO SUMBIT FORM DATA
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
                       $(".row").append("<div id = \"" +element.id+ "\" class = \"article\"> " +           
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
                       $(".row").append("<div id = \"" +element.id+ "\" class = \"article\"> " +           
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