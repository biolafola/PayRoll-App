// Wait for the DOM to be ready
$(function() {
    // Initialize form validation on the registration form.
    // It has the name attribute "login"
    $("form[name='login']").validate({
      // Specify validation rules
      rules: {
            // The key name on the left side is the name attribute
            // of an input field. Validation rules are defined
            // on the right side
            username: "required",
            password: {
            required: true,
            minlength: 5
            }
      },
      // Specify validation error messages
      messages: {
            username: "Please enter your firstname",
            password: {
            required: "Please provide a password",
            minlength: "Your password must be at least 5 characters long"
            },
        },

      
      submitHandler: function (form, event) {
            event.preventDefault();
            let user = $("#username").val();
            let pw  = $("#password").val();

        $.ajax({
                type: "GET",
                async: false,
                url: "http://localhost:3000/human-resources",
                dataType: 'json',     

            }).done(function(data){
                //foo checks the value of user & pw with database
                let foo = data.filter((element, index)=>{
                return element.username == user && element.password == pw;
                });
                    
                    //do action here if user is authentic
                    if(foo.length > 0){
                        alert("welcome User"); //load the dashboard page
                        //set his login status to true
                        localStorage.setItem("devfactorylogin", "1");
                        window.location = 'dashboard.html';
                           
                    }
                    //do action here if user is not authentic
                    else{
                        alert("Invalid Username or Password");
                    }
               
                        
            });

      }
    });
  
  });